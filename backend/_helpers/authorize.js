const jose = require('node-jose');
const fs = require('fs');
const userService = require('../users/user.service');
const crypto = require('crypto');
const {
  expect
} = require('chai');
const {
  Issuer
} = require('openid-client');
const PRIVATE_KEY = process.env.PRIVATE_KEY || fs.readFileSync('./test/private_key.txt');
const REDIRECT_URL = process.env.REDIRECT_URL;
const WELL_KNOWN_URL = process.env.WELL_KNOWN_URL;

module.exports = {
  authorize,
  getAuthorizationUrl,
  postAuthenticationCode,
  refreshTokenForUser
};
var client;

createClient().catch(function (error) {
  console.log('An unexpected error occured while creating client: ', error);
});

async function createClient() {
  Issuer.defaultHttpOptions = { timeout: 120000 };
  const issuer = await Issuer.discover(WELL_KNOWN_URL);
  const keystore = jose.JWK.createKeyStore();

  console.log('Using private key:')
  const beginning = PRIVATE_KEY.substring(0,50);
  const end = PRIVATE_KEY.substr(PRIVATE_KEY.length - 50);
  console.log('"' + beginning + '...\n' + '...' + end + '"');

  const key = await keystore.add(PRIVATE_KEY, 'pem');
  console.log('Generated kid from private key:', key.kid);

  client = new issuer.Client({
    client_id: process.env.CLIENT_ID || 'ftb-demo-app@account-info',
    token_endpoint_auth_method: 'private_key_jwt',
    request_object_signing_alg: 'RS256'
  }, keystore);

  client.CLOCK_TOLERANCE = 10;

  console.log("Client created");
}

async function authorize() {
  const accessTokenWithClientCredentials = await client.grant({
    grant_type: 'client_credentials',
    scope: "accounts"
  });

  return accessTokenWithClientCredentials.access_token;
}

async function getAuthorizationUrl(req, res) {
  const state = crypto.randomBytes(12).toString('hex');
  const nonce = crypto.randomBytes(12).toString('hex');

  await userService.update(req.user.sub, {
    accountRequestId: req.query.AccountRequestId,
    state: state,
    nonce: nonce
  });

  const requestObject = await client.requestObject({
    redirect_uri: REDIRECT_URL,
    claims: {
      userinfo: {
        openbanking_intent_id: {
          value: req.query.AccountRequestId
        }
      },
      id_token: {
        openbanking_intent_id: {
          value: req.query.AccountRequestId
        }
      }
    }
  });

  const url = client.authorizationUrl({
    scope: 'openid accounts',
    redirect_uri: REDIRECT_URL,
    response_type: 'code',
    nonce: nonce,
    state: state,
    request: requestObject
  });
  res.json(url);
}

async function postAuthenticationCode(req, res) {
  const params = req.body;

  const user = await userService.getById(req.user.sub);

  const authorizationTokens = await client.authorizationCallback(REDIRECT_URL, params, {
    state: user.state,
    nonce: user.nonce
  });

  await saveTokensToUser(req.user.sub, authorizationTokens);
  res.send({ user_id: req.user.sub });
}

async function refreshTokenForUser(user) {
  if (user.refreshToken) {
    console.log('Refreshing token for user.');
    const tokenSet = await client.refresh(user.refreshToken);
    const authorizationTokens = {
      refresh_token: tokenSet.refresh_token,
      access_token: tokenSet.access_token
    }

    await saveTokensToUser(user._id, authorizationTokens);
  }
}

async function saveTokensToUser(userId, authorizationTokens) {
  const userParams = {
    refreshToken: authorizationTokens.refresh_token,
    accessToken: authorizationTokens.access_token
  }

  await userService.update(userId, userParams);
}
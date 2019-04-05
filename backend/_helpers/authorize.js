const jose = require('node-jose');
const fs = require('fs');
const userService = require('../users/user.service');
const crypto = require('crypto');
const privateKey = process.env.PRIVATE_KEY || fs.readFileSync('./test/private_key.txt', 'utf-8');
const accountInfoRedirectUri = process.env.REDIRECT_URL;
const API_URL = process.env.API_URL;

/*sdk*/
const OpenBankingAuth = require('./sdk/OpenBankingAuth').OpenBankingAuth;
var tokenEndpointUri = API_URL + '/auth/realms/ftb-sandbox/protocol/openid-connect/token';
var authEndpointUri = API_URL + '/auth/realms/ftb-sandbox/protocol/openid-connect/auth';
var issuer = API_URL + '/auth/realms/ftb-sandbox';
var jwksUri = API_URL + '/auth/realms/ftb-sandbox/protocol/openid-connect/certs';
var accountInfoClientId = 'ftb-demo-app@account-info-1.0';
var accountInfoScope = 'accounts';
var exchangeToken;

initDemoapp(privateKey).catch(function (error) {
  console.log('Demo app error: ', error);
});

module.exports = {
  authorize,
  getAuthorizationUrl,
  postAuthenticationCode,
  refreshTokenForUser,
  createJWSSignatureHeader
};

async function initDemoapp(privateKey) {
  const keyID = await generateKeyId(privateKey);
  accountInfoAuth = new OpenBankingAuth(accountInfoClientId, privateKey, keyID, accountInfoRedirectUri, tokenEndpointUri, authEndpointUri, accountInfoScope, issuer, jwksUri);
}

async function generateKeyId(privateKey) {
  var keystore = jose.JWK.createKeyStore();
  return await keystore.add(privateKey, 'pem');
}

async function authorize() {
  return await accountInfoAuth.getAccessToken();
}

async function getAuthorizationUrl(req, res) {
  const state = crypto.randomBytes(12).toString('hex');
  const nonce = crypto.randomBytes(12).toString('hex');

  await userService.update(req.user.sub, {
    accountAccessConsentId: req.query.ConsentId,
    state: state,
    nonce: nonce
  });

  const consentId = req.query.ConsentId;
  const authUrl = await accountInfoAuth.generateAuthorizationUrl(consentId, consentId, '')
  res.json(authUrl);
}

async function postAuthenticationCode(req, res) {
  const params = req.body;
  const user = await userService.getById(req.user.sub);
  exchangeToken = await accountInfoAuth.exchangeToken(params.code);
  await saveTokensToUser(req.user.sub, exchangeToken);
  res.send({
    user_id: req.user.sub
  });
}

async function refreshTokenForUser(user) {  
  if (user.refreshToken) {
    try {
      const authorizationTokens = await accountInfoAuth.refreshToken(user.refreshToken);
      await saveTokensToUser(user._id, authorizationTokens);
    } catch (error) {
      console.log(`${new Date().toISOString()} | refreshTokenForUser ERROR | user: ${user._id} | error: ${error}`);
      await userService.update(user._id, {
        accountAccessConsentId: null,
        refreshToken: null,
        accessToken: null
      });
    }
  }
}

async function saveTokensToUser(userId, authorizationTokens) {
  const userParams = {
    refreshToken: authorizationTokens.refresh_token,
    accessToken: authorizationTokens.access_token
  }
  await userService.update(userId, userParams);
}

async function createJWSSignatureHeader(body) {
  return await accountInfoAuth.createSignatureHeader(body);
}
const jose = require('node-jose');
const fs = require('fs');
const userService = require('../users/user.service');
const crypto = require('crypto');
const accountInfoRedirectUri = process.env.REDIRECT_URL;
const AUTH_SERVER_BASE_PATH = process.env.AUTH_SERVER_BASE_PATH;
const cert = process.env.HTTPS_CLIENT_CERT;
const key = process.env.HTTPS_CLIENT_KEY;

/*sdk*/
const OpenBankingAuth = require('./sdk/OpenBankingAuth').OpenBankingAuth;
var tokenEndpointUri = `${AUTH_SERVER_BASE_PATH}/protocol/openid-connect/token`;
var authEndpointUri = `${AUTH_SERVER_BASE_PATH}/protocol/openid-connect/auth`;
var issuer = AUTH_SERVER_BASE_PATH;
var jwksUri = `${AUTH_SERVER_BASE_PATH}/protocol/openid-connect/certs`;
var accountInfoClientId = process.env.CLIENT_ID || 'ftb.demo.app@account-info-1.0';
var accountInfoScope = 'accounts';
var exchangeToken;
var accountInfoAuth;

const privateKey = process.env.PRIVATE_KEY || fs.readFileSync('./keys/private_key.txt');
const publicKey = process.env.PUBLIC_KEY || fs.readFileSync('./keys/public_key.txt');

initDemoapp(privateKey, publicKey).catch(function (error) {
  console.log('Initialization error: ', error);
});

module.exports = {
  authorize,
  getAuthorizationUrl,
  postAuthenticationCode,
  refreshTokenForUser,
  createJWSSignatureHeader
};

async function initDemoapp(privateKey, publicKey) {
  console.log('Using public key:')
  console.log(`"${publicKey}"`);
  console.log('Using private key:')
  //console.log(`"${privateKey.substring(0, 50)}...\n...${privateKey.substr(privateKey.length - 50)}"`);
  const keyID = await generateKeyId(publicKey);
  console.log(`Generated key id: ${keyID}`);
  console.log(`Client ID: ${accountInfoClientId}`)
  accountInfoAuth = new OpenBankingAuth(accountInfoClientId, privateKey, keyID, accountInfoRedirectUri, tokenEndpointUri, authEndpointUri, accountInfoScope, issuer, jwksUri, cert, key);
  await accountInfoAuth.createClient();
}

async function generateKeyId(publicKey) {
  const keystore = jose.JWK.createKeyStore();
  const generatedKeystoreKey = await keystore.add(publicKey, 'pem');
  return generatedKeystoreKey.kid;
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
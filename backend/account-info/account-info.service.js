var request = require('request');
const authorizeJs = require('../_helpers/authorize');
const userService = require('../users/user.service')
const ACCOUNT_INFO_API_URL = process.env.ACCOUNT_INFO_API_URL;
const cert = process.env.HTTPS_CLIENT_CERT;
const key = process.env.HTTPS_CLIENT_KEY;

module.exports = {
  createAccountAccessConsent,
  proxyRequestToApi
};

async function createAccountAccessConsent(req, res) {
  const newPosturl = ACCOUNT_INFO_API_URL + req.url;
  var signature = await authorizeJs.createJWSSignatureHeader(req.body);
  console.log(`${new Date().toISOString()} | createAccountAccessConsent | newPosturl: ${newPosturl} | body:`, req.body);
  const accessToken = await authorizeJs.authorize();
  let options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'x-jws-signature': signature
    },
    qs: req.query,
    uri: newPosturl,
    body: req.body,
    method: req.method,
    json: true
  };
  if (cert && key) {
    options.cert = cert;
    options.key = key;
  }
  request(options).pipe(res);
}

async function proxyRequestToApi(req, res) {
  const newGetUrl = ACCOUNT_INFO_API_URL + req.url;
  const user = await userService.getById(req.user.sub);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`${new Date().toISOString()} | proxyRequestToApi | newGetUrl: ${newGetUrl} | accessToken: ${user.accessToken}`);
  let options = {
    headers: {
      'Authorization': `Bearer ${user.accessToken}`,
      'x-fapi-customer-ip-address': ip
    },
    qs: req.query,
    uri: newGetUrl,
    method: req.method,
    json: true
  }
  if (cert && key) {
    options.cert = cert;
    options.key = key;
  }
  request(options).on('response', function (response) {
    console.log(`${new Date().toISOString()} | proxyRequestToApi | statusCode: ${response.statusCode}`);
  }).on('error', function (error) {
    console.log(`${new Date().toISOString()} | proxyRequestToApi | error: ${error}`);
  }).pipe(res);
}
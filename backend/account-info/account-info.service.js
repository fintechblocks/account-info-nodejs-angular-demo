const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var request = require('request');
var querystring = require('querystring');
const authorizeJs = require('../_helpers/authorize');
const userService = require('../users/user.service')
const API_URL = process.env.API_URL;
const fs = require('fs');
const PRIVATE_KEY = process.env.PRIVATE_KEY || fs.readFileSync('./test/private_key.txt');

module.exports = {
  createAccountRequest,
  proxyRequestToApi
};

async function createJWSSignatureHeader(body) {
  var jwt_header = {
    alg: 'RS256',
    kid: '000000000',
    b64: false,
    'http://openbanking.org.uk/iat': new Date().getTime(),
    'http://openbanking.org.uk/iss': 'C=UK, ST=England, L=London, O=Acme Ltd.',
    crit: ['b64', 'http://openbanking.org.uk/iat', 'http://openbanking.org.uk/iss']
  };
  var jws_signature = await jwt.sign(body, PRIVATE_KEY, {
    algorithm: 'RS256',
    header: jwt_header
  });
  return `${jws_signature.split('.')[0]}..${jws_signature.split('.')[2]}`;
}

async function createAccountRequest(req, res) {
  const newPosturl = API_URL + req.url;
  var signature = await createJWSSignatureHeader(req.body);

  const accessToken = await authorizeJs.authorize();
  request({
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'x-jws-signature': signature
    },
    qs: req.query,
    uri: newPosturl,
    body: req.body,
    method: req.method,
    json: true
  }).pipe(res);
}

async function proxyRequestToApi(req, res) {
  const newGetUrl = API_URL + req.url;
  const user = await userService.getById(req.user.sub);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  request({
    headers: {
      'Authorization': `Bearer ${user.accessToken}`,
      'x-fapi-customer-ip-address': ip
    },
    qs: req.query,
    uri: newGetUrl,
    method: req.method,
    json: true
  }).pipe(res);
}
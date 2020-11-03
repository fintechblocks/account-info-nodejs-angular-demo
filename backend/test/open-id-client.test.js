const oidc_server_url = 'https://oidc.sandbox.exampleBank.hu';
const {
  expect
} = require('chai');
const {
  Issuer
} = require('openid-client');
const jose = require('node-jose');
const fs = require('fs');

const PRIVATE_KEY = fs.readFileSync('./test/private_key.txt');
const WELL_KNOWN_URL = 'https://oidc.sandbox.exampleBank.hu/auth/realms/ftb-sandbox/.well-known/openid-configuration';

describe('new Client()', function () {
  it('should return access and refresh token (with client_secret)', async () => {
      const issuer = new Issuer({
        token_endpoint: oidc_server_url + '/auth/realms/ftb-sandbox/protocol/openid-connect/token',
        token_endpoint_auth_signing_alg_values_supported: ['HS256', 'HS384'],
        authorization_endpoint: 'https://oidc.sandbox.exampleBank.hu/auth/realms/ftb-sandbox/protocol/openid-connect/auth',
      });

      const client = new issuer.Client({
        client_id: 'ftb-demo-app@account-info',
        client_secret: 'demo',
        request_object_signing_alg: 'RS256'
      });

      await client.grant({
        grant_type: 'client_credentials'
      }); 
      
      var url = client.authorizationUrl({
        scope: 'openid offline_access',
        redirect_uri: 'http://localhost:4200',
        response_type: 'id_token',
        nonce: 'foobar',
        state: 'foobar'
      });
  });

  var client;
  it('should return access and refresh token (with private_key_jwt)', async () => {
      const issuer = await Issuer.discover(WELL_KNOWN_URL);


      const keystore = jose.JWK.createKeyStore();
      await keystore.add(PRIVATE_KEY, 'pem');

      client = new issuer.Client({
        client_id: 'ftb-demo-app@account-info',
        token_endpoint_auth_method: 'private_key_jwt',
      }, keystore);

      getAuthorizationUrl();
      var res = await client.grant({
        grant_type: 'client_credentials'
      })
  });

  function getAuthorizationUrl(){
    const url = client.authorizationUrl({
      scope: 'openid offline_access',
      redirect_uri: 'http://localhost:4200',
      response_type: 'id_token',
      nonce: 'foobar',
      state: 'foobar'
    });
    return url;
  }
});
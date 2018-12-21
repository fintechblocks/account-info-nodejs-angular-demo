# How to use account-info demo app with MKB sandbox

## Set environment variables

* Open *.env*
* Set the following environment vairables properly based on MKB sandbox properties
  * OIDC_SERVER_URL (e.g. https://oidc-1.0.sandbox.mkb.hu/auth)
  * OIDC_WELL_KNOWN_URL (e.g. https://oidc-1.0.sandbox.mkb.hu/auth/realms/ftb-sandbox/.well-known/openid-configuration)
  * ACCOUNT_INFO_API_URL (e.g. https://api.sandbox.mkb.hu/account-info-1.0)
* Custom properties
  * FRONTEND_HOST (e.g. account-info-frontend.ftb-local, have to set in *hosts* file)
  * BACKEND_HOST (e.g. account-info-back-end.ftb-local, have to set in *hosts* file)
  * REDIRECT_URL (is equal to FRONTEND_HOST)
  * CLIENT_ID must be a registered client identification (e.g. ftb-demo-app@account-info-1.0)

## Build frontend

* Open a terminal
* Navigate to */frontend*
* Command: *ng build*

## Edit host file

Open *hosts* file and add FRONTEND_HOST and BACKEND_HOST.

### Example

```hosts file
127.0.0.1 account-info-frontend.ftb-local
127.0.0.1 account-info-backend.ftb-local
```

## Set backend url for frontend

* Open *frontend-env.json*
* *apiUrl* is equal to BACKEND_HOST

### Example

```frontend environment
"apiUrl": "http://account-info-backend.ftb-local"
```

## Run demo application

* Navigate to root folder
* Command: *docker-compose up -d*

## OIDC error: *Invalid parameter: redirect_uri*

* Open keycloak (e.g. https://oidc-1.0.sandbox.mkb.hu/auth)
* Log in admin console
* Click on *Clients*
* Edit actual client (e.g. ftb-demo-app)
* Add REDIRECT_URL to *Valid Redirect URIs*
const express = require('express');
const router = express.Router();
const accountInfo = require('./account-info.service');
const authorizeJs = require('../_helpers/authorize');

// routes
router.post('/authorization-callback', postAuthenticationCode);
router.post('/open-banking/v3.1/aisp/account-access-consents', createAccountAccessConsent);
router.get('/authorization-url', getAuthorizationUrl);
router.get('/open-banking/v3.1/aisp/*', getController);

module.exports = router;

function createAccountAccessConsent(req, res, next) {
    accountInfo.createAccountAccessConsent(req, res)
        .catch(err => next(err));
}

function getController(req, res, next) {
    accountInfo.proxyRequestToApi(req, res)    
        .catch(err => next(err));
}

function getAuthorizationUrl(req, res, next) {
    authorizeJs.getAuthorizationUrl(req, res)
        .catch(err => next(err));
}

function postAuthenticationCode(req, res, next) {
    authorizeJs.postAuthenticationCode(req, res)
        .catch(err => next(err));
}

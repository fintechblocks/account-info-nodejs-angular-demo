const express = require('express');
const router = express.Router();
const accountInfo = require('./account-info.service');
const authorizeJs = require('../_helpers/authorize');

// routes
router.post('/authorization-callback', postAuthenticationCode);
router.post('/open-banking/v1.1/account-requests', createAccountRequest);
router.get('/authorization-url', getAuthorizationUrl);
router.get('/open-banking/v1.1/*', getController);

module.exports = router;

function createAccountRequest(req, res, next) {
    accountInfo.createAccountRequest(req, res)
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
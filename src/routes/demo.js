const express = require('express');
const router = express.Router();

const demoController = require('../controllers/demo-controller.js');
const authenticationMiddleware = require('../middlewares/authentication').authenticationMiddleware;

router.post('/demo/print-request', authenticationMiddleware, demoController.printRequest);
router.post('/demo/minutes-subscribe', authenticationMiddleware, demoController.subscribeMinutes);
router.post('/demo/minutes-unsubscribe', authenticationMiddleware, demoController.unsubscribeMinutes);
router.post('/demo/scheduled-subscribe', authenticationMiddleware, demoController.subscribeScheduled);
router.post('/demo/scheduled-unsubscribe', authenticationMiddleware, demoController.unsubscribeMinutes);
router.post('/demo/synchronize', authenticationMiddleware, demoController.synchronize);
router.post('/demo/field-defs', authenticationMiddleware, demoController.getDemoFieldDefs);

module.exports = router;

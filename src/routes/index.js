const router = require('express').Router();

const demoRoutes = require('./demo');

router.use(demoRoutes);

module.exports = router;

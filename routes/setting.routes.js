

const express = require('express');
const router = express.Router();

const pages = require('../controller/pages.controller');

const userAuth = require('../middleware/auth.middleware');

const settings=require('../controller/settings.controller')

 

router.route('/settings').get(userAuth,pages.settingsPage).post(userAuth,
  settings.update

)


router.route('/default-settings').post(userAuth,settings.default)


module.exports = router;

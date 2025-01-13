const express = require('express');
const router = express.Router();

const pages = require('../controller/pages.controller');
const authData = require('../controller/auth.controller');
const sessionMangement = require('../middleware/session.middleware')
const userAuth = require('../middleware/auth.middleware');
router.route('/').get(pages.home);


router.route('/register')
  .get(sessionMangement,pages.registerPage)   
  .post(sessionMangement,authData.create);       

router.route('/login')
  .get(sessionMangement,pages.loginPage)      
  .post(sessionMangement,authData.loginData);   


router.route('/dashboard').get(userAuth,pages.dashboardPage);

module.exports = router;

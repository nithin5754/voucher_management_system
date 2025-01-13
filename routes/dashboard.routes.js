

const express = require('express');
const router = express.Router();

const pages = require('../controller/pages.controller');

const userAuth = require('../middleware/auth.middleware');
const dashBoardController=require('../controller/dashboard.controller')
 

router.route('/dashboard').get(userAuth,pages.dashboardPage);
router.route('/generate-voucher').post(userAuth,dashBoardController.generateVoucher)
router.route('/generate-pdf/:voucherId').get(userAuth,dashBoardController.generatePDF)

module.exports = router;

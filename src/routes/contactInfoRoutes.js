const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');

router.route('/')
    .get(contactInfoController.getContactInfo)
    .put(contactInfoController.updateContactInfo);

module.exports = router;
// backend/routes/roleRoutes.js
const express = require('express');
const router = express.Router();

const { getPing } = require('../controllers/pingController');
const { getRoleHierarchy } = require('../controllers/roleController');
const { getRoleHierarchySample } = require('../controllers/sampleController'); 

router.get('/ping', getPing);
router.get('/role-hierarchy', getRoleHierarchy);
router.get('/role-hierarchy-sample', getRoleHierarchySample);


module.exports = router;

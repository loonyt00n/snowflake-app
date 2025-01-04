// backend/controllers/sampleController.js
const sampleData = require('../data/sampleData');

const getRoleHierarchySample = (req, res) => {
  res.json(sampleData);
};

module.exports = { getRoleHierarchySample };

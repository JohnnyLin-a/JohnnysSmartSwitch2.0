var express = require('express');
var router = express.Router();

// paths within /api/v1
var openMyComputer = require('./openMyComputer.js');

// Router use
router.use('/openMyComputer.php', openMyComputer);

module.exports = router;
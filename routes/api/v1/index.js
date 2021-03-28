var express = require('express');
var router = express.Router();

// paths within /api/v1
var openMyComputer = require('./openMyComputer.js');
var controlLights = require('./controlLights.js');

// Router use
router.use('/openMyComputer.php', openMyComputer);
router.use('/controlLights.php', controlLights);

module.exports = router;
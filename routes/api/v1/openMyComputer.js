var express = require('express');
var router = express.Router();
const { execFile, exec } = require("child_process");
const config = require('../../../config');

router.get('/', function (req, res, next) {
    execFile(`/root/wol`, ['wake', config.wolMacAddress, '-b', config.broadcastAddress], null, (error, stdout, stderr) => {
        res.json({ success: (error === null) });
    });
});

module.exports = router;
import express from 'express';
import path from 'path';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('index.html', { root: path.resolve() + '/public' });
});
router.get('/javascripts/ss.js', function (req, res, next) {
    res.sendFile('javascripts/ss.js', { root: path.resolve() + '/public' });
});
router.get('/stylesheets/ss.css', function (req, res, next) {
    res.sendFile('stylesheets/ss.css', { root: path.resolve() + '/public' });
});

export default router;

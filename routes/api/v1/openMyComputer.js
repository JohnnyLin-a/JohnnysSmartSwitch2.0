import { Router } from 'express';
var router = Router();
import { execFile, exec } from "child_process";

router.get('/', function (req, res, next) {
    execFile(`/root/wol`, ['wake', process.env.WOL_MAC_ADDR, '-b', process.env.BROADCAST_ADDR], null, (error, stdout, stderr) => {
        res.json({ success: (error === null) });
    });
});

export default router;
import { Router } from 'express';
var router = Router();
import { Discovery, Control } from 'magic-home';
import tplinkapi from 'tplink-smarthome-api';
const { Client } = tplinkapi;

const controlLights = control => {
    const power = control === 'open';

    // Magic home
    let discovery = new Discovery();
    discovery.scan(500).then(devices => {
        devices.forEach(device => {
            new Control(device.address).setPower(power);
        });
    });

    // TP-Link
    const client = new Client();
    client.startDiscovery().on('device-new', (device) => {
        device.setPowerState(power);
    });
};

router.get('/', (req, res, next) => {
    if (typeof req.query.control === 'undefined') {
        res.json({ success: false });
    }
    const action = req.query.control.toLowerCase();
    switch (action) {
        case 'open':
        case 'close':
            controlLights(action);
            break;
        default:
            res.json({ success: false });
            return;
    }

    res.json({ success: true });
});

export default router;
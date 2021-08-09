import { Router } from 'express';
var router = Router();

// paths within /api/v1
import openMyComputer from './openMyComputer.js';
import controlLights from './controlLights.js';

// Router use
router.use('/openMyComputer.php', openMyComputer);
router.use('/controlLights.php', controlLights);

export default router;
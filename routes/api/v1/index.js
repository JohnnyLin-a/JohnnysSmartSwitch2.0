import { Router } from 'express';
var router = Router();

// paths within /api/v1
import openMyComputer from './openMyComputer.js';
import controlLights from './controlLights.js';

// Check auth cookie

// Router use
router.use('/openMyComputer.php', openMyComputer);
router.use('/controlLights.php', controlLights);

export default router;
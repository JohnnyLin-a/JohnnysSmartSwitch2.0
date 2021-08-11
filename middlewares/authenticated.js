import { Router } from 'express';
const router = Router();

router.use((req, res, next) => {
    console.log("Connection", req.get("X-Real-IP"));
    // res.status(418);
    // res.end();
    next();
})

export default router;
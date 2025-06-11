import express from 'express';
import * as newsletterController from '../controllers/newsletterController';

const router = express.Router();

router.post("/validate", newsletterController.validate)
router.post("/", newsletterController.create)
router.get("/", newsletterController.getAll)

export default router;
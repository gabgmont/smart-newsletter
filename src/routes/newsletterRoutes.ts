import express from 'express';
import * as newsletterController from '../controllers/newsletterController';

const router = express.Router();

router.post("/validate/prompt", newsletterController.validatePrompt)
router.post("/validate/parameters", newsletterController.validateParameters)
router.post("/send/:id", newsletterController.send)
router.post("/", newsletterController.create)
router.get("/", newsletterController.getAll)

export default router;
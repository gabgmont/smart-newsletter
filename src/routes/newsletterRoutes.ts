import express from 'express';
import * as newsletterController from '../controllers/newsletterController';

const router = express.Router();

router.post("/", newsletterController.makeNewsletter)

export default router;
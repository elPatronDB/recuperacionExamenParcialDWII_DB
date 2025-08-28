// routes/mochila.route.js
import express from 'express';
import { getMochilas, postMochilas } from '../controllers/mochila.controller.js';

const router = express.Router();

router.get('/', getMochilas);
router.post('/', postMochilas);

export default router;
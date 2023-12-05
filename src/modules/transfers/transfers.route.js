import express from 'express';
import { doTransfers } from './transfers.controller.js';

export const router = express.Router();
router.post('/', doTransfers);

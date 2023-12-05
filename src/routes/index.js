import express from 'express';
import { router as usersRouter } from '../modules/users/users.routes.js';
import { router as transfersRouter } from '../modules/transfers/transfers.route.js';

export const router = express.Router();

router.use('/users', usersRouter);
router.use('/transfers', transfersRouter);

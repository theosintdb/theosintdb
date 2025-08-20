import { Router } from 'express';
import { router as newsRouter } from './news';
import { router as resourcesRouter } from './resources';
import { router as trainingRouter } from './training';
import { router as contentRouter } from './siteContent';
import { router as settingsRouter } from './settings';
import { router as applicationsRouter } from './applications';
import { router as reportsRouter } from './reports';
import { router as authRouter } from './auth';

export const router = Router();

router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/resources', resourcesRouter);
router.use('/training', trainingRouter);
router.use('/settings', settingsRouter);
router.use('/applications', applicationsRouter);
router.use('/reports', reportsRouter);
router.use('/', contentRouter);


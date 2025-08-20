import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', async (_req, res) => {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  res.json({ maintenanceMode: row?.maintenanceMode ?? false });
});

const SettingsSchema = z.object({ maintenanceMode: z.boolean() });

router.put('/', requireAuth, requireRole(['Owner']), async (req, res) => {
  const parsed = SettingsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: parsed.data, create: { id: 1, ...parsed.data } });
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  res.json({ maintenanceMode: row?.maintenanceMode ?? false });
});
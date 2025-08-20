import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
export const router = Router();

const JsonSchema = z.any();

router.get('/homepage', async (_req, res) => {
  const row = await prisma.homepageContent.findUnique({ where: { id: 1 } });
  const data = row?.data ? JSON.parse(row.data) : { briefings: [], toolOfMonth: { name: '', description: '', link: '' }, calendarEvents: [] };
  res.json(data);
});

router.put('/homepage', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const parsed = JsonSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  const data = JSON.stringify(parsed.data);
  await prisma.homepageContent.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  const row = await prisma.homepageContent.findUnique({ where: { id: 1 } });
  res.json(row?.data ? JSON.parse(row.data) : {});
});

router.get('/core-pages', async (_req, res) => {
  const row = await prisma.corePagesContent.findUnique({ where: { id: 1 } });
  const data = row?.data ? JSON.parse(row.data) : { about: { mission: '', structure: '', principles: [] }, opsec: { intro: '', principles: [] } };
  res.json(data);
});

router.put('/core-pages', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const parsed = JsonSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  const data = JSON.stringify(parsed.data);
  await prisma.corePagesContent.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  const row = await prisma.corePagesContent.findUnique({ where: { id: 1 } });
  res.json(row?.data ? JSON.parse(row.data) : {});
});

router.get('/site-content', async (_req, res) => {
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const data = row?.data ? JSON.parse(row.data) : {};
  res.json(data);
});

router.put('/site-content', requireAuth, requireRole(['Owner']), async (req, res) => {
  const parsed = JsonSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  const data = JSON.stringify(parsed.data);
  await prisma.siteContent.upsert({ where: { id: 1 }, update: { data }, create: { id: 1, data } });
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  res.json(row?.data ? JSON.parse(row.data) : {});
});


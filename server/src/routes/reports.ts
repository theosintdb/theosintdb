import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';
import { publicPostLimiter } from '../middleware/rateLimit';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', requireAuth, requireRole(['Admin', 'Owner']), async (_req, res) => {
  const items = await prisma.intelligenceReport.findMany({ orderBy: { id: 'desc' } });
  res.json(items);
});

const ReportSchema = z.object({
  type: z.string().min(1),
  summary: z.string().min(1),
  links: z.string().optional().default(''),
  contact: z.string().optional().default(''),
});

router.post('/', publicPostLimiter, async (req, res) => {
  const parsed = ReportSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.intelligenceReport.create({ data: { ...parsed.data, status: 'new' } });
  const list = await prisma.intelligenceReport.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.put('/:id/status', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  const status = req.body.status as 'under_review' | 'archived';
  if (!['under_review', 'archived'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  await prisma.intelligenceReport.update({ where: { id }, data: { status } });
  const list = await prisma.intelligenceReport.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});


import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';
import { publicPostLimiter } from '../middleware/rateLimit';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', requireAuth, requireRole(['Admin', 'Owner']), async (_req, res) => {
  const items = await prisma.unitApplication.findMany({ orderBy: { id: 'desc' } });
  res.json(items);
});

const AppSchema = z.object({
  unit: z.enum(['CTU', 'AHTU']).transform(String),
  name: z.string().min(1),
  email: z.string().email(),
  statement: z.string().min(1),
});

router.post('/', publicPostLimiter, async (req, res) => {
  const parsed = AppSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.unitApplication.create({ data: { ...parsed.data, status: 'pending' } });
  const list = await prisma.unitApplication.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.put('/:id/status', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  const status = req.body.status as 'approved' | 'rejected';
  if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  await prisma.unitApplication.update({ where: { id }, data: { status } });
  const list = await prisma.unitApplication.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});


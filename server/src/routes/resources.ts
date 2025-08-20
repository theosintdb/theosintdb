import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';
import { publicPostLimiter } from '../middleware/rateLimit';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', async (_req, res) => {
  const items = await prisma.resource.findMany({ orderBy: { id: 'desc' } });
  res.json(items);
});

const ResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['Tool', 'Database', 'Article', 'Guide']).transform(String),
  link: z.string().url(),
});

router.post('/', publicPostLimiter, async (req, res) => {
  const parsed = ResourceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.resource.create({ data: { ...parsed.data, status: 'pending' } });
  const list = await prisma.resource.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.put('/:id/status', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  const status = req.body.status as string;
  if (status !== 'approved') return res.status(400).json({ error: 'Invalid status' });
  await prisma.resource.update({ where: { id }, data: { status } });
  const list = await prisma.resource.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.delete('/:id', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  await prisma.resource.delete({ where: { id } });
  const list = await prisma.resource.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});


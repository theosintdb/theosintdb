import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', async (_req, res) => {
  const items = await prisma.trainingMaterial.findMany({ orderBy: { id: 'desc' } });
  res.json(items);
});

const TrainingSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Video', 'Guide', 'Tutorial']).transform(String),
  description: z.string().min(1),
  duration: z.string().optional(),
  link: z.string().url(),
});

router.post('/', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const parsed = TrainingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.trainingMaterial.create({ data: parsed.data });
  const list = await prisma.trainingMaterial.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.put('/:id', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  const parsed = TrainingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.trainingMaterial.update({ where: { id }, data: parsed.data });
  const list = await prisma.trainingMaterial.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.delete('/:id', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  await prisma.trainingMaterial.delete({ where: { id } });
  const list = await prisma.trainingMaterial.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});


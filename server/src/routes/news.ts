import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth';

const prisma = new PrismaClient();
export const router = Router();

router.get('/', async (_req, res) => {
  const items = await prisma.newsArticle.findMany({ orderBy: { id: 'desc' } });
  res.json(items);
});

const NewsSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

router.post('/', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const parsed = NewsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.newsArticle.create({ data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null } });
  const list = await prisma.newsArticle.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.put('/:id', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  const parsed = NewsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });
  await prisma.newsArticle.update({ where: { id }, data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null } });
  const list = await prisma.newsArticle.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});

router.delete('/:id', requireAuth, requireRole(['Admin', 'Owner']), async (req, res) => {
  const id = Number(req.params.id);
  await prisma.newsArticle.delete({ where: { id } });
  const list = await prisma.newsArticle.findMany({ orderBy: { id: 'desc' } });
  res.json(list);
});


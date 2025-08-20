import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { initialNews, initialResources, initialTrainingMaterials, initialHomepageContent, initialCorePagesContent, initialSiteSettings, initialSiteContent } from '../src/seedData';

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const ownerPass = await bcrypt.hash('owner123', 10);
  await prisma.user.upsert({ where: { username: 'admin' }, update: {}, create: { username: 'admin', password: adminPass, role: 'Admin' } });
  await prisma.user.upsert({ where: { username: 'owner' }, update: {}, create: { username: 'owner', password: ownerPass, role: 'Owner' } });

  await prisma.newsArticle.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.trainingMaterial.deleteMany();

  await prisma.newsArticle.createMany({ data: initialNews.map(n => ({ title: n.title, date: n.date, summary: n.summary, category: n.category, imageUrl: (n as any).imageUrl ?? null })) });
  await prisma.resource.createMany({ data: initialResources.map(r => ({ title: r.title, description: r.description, type: r.type, link: r.link, status: r.status })) });
  await prisma.trainingMaterial.createMany({ data: initialTrainingMaterials.map(t => ({ title: t.title, type: t.type, description: t.description, duration: (t as any).duration ?? null, link: t.link })) });

  await prisma.homepageContent.upsert({ where: { id: 1 }, update: { data: JSON.stringify(initialHomepageContent) }, create: { id: 1, data: JSON.stringify(initialHomepageContent) } });
  await prisma.corePagesContent.upsert({ where: { id: 1 }, update: { data: JSON.stringify(initialCorePagesContent) }, create: { id: 1, data: JSON.stringify(initialCorePagesContent) } });
  await prisma.siteContent.upsert({ where: { id: 1 }, update: { data: JSON.stringify(initialSiteContent) }, create: { id: 1, data: JSON.stringify(initialSiteContent) } });
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: initialSiteSettings as any, create: { id: 1, ...(initialSiteSettings as any) } });

  console.log('Seeded database successfully.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
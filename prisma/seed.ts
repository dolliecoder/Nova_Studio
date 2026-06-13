import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log('Seeding database...');

  // 1. Seed statistics
  const stats = [
    {
      key: 'projects_completed',
      value: 150,
      label: 'Projects Completed',
      suffix: '+',
    },
    {
      key: 'clients_worldwide',
      value: 50,
      label: 'Clients Worldwide',
      suffix: '+',
    },
    {
      key: 'years_experience',
      value: 5,
      label: 'Years Experience',
      suffix: '',
    },
  ];

  for (const stat of stats) {
    await prisma.stat.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat,
    });
  }
  console.log('Seeded statistics.');

  // 2. Seed projects
  const projects = [
    {
      title: 'Acme E-Commerce Platform',
      category: 'Web Design',
      description: 'A high-performance online storefront with modern checkout pipelines and fully responsive user experiences.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Nova Design System',
      category: 'Front-End Development',
      description: 'A cohesive, accessible component library engineered for rapid and consistent interface development.',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Apex Visual Identity',
      category: 'Branding',
      description: 'Complete brand visual identity strategy, modern logo styles, and collateral guidelines.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Quantum SaaS Dashboard',
      category: 'Web Design',
      description: 'Immersive data analytics dashboard built for tracking complex cloud computing workflows.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Solstice Mobile Portfolio',
      category: 'Front-End Development',
      description: 'Interactive portfolios optimized for mobile layouts using advanced motion mechanics.',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
    },
  ];

  // Clear existing projects to avoid duplicate seeds during development
  await prisma.project.deleteMany({});

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
  console.log('Seeded projects.');

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample clubs
  const clubs = await Promise.all([
    prisma.club.create({
      data: {
        name: 'Padel Club Paris Centre',
        address: '15 Rue de Rivoli, 75001 Paris',
        latitude: 48.8566,
        longitude: 2.3522,
        city: 'Paris',
        phone: '+33 1 42 97 48 16',
      },
    }),
    prisma.club.create({
      data: {
        name: 'Padel Sport Boulogne',
        address: '25 Avenue Edouard Vaillant, 92100 Boulogne-Billancourt',
        latitude: 48.8414,
        longitude: 2.2460,
        city: 'Boulogne-Billancourt',
        phone: '+33 1 46 08 43 43',
      },
    }),
    prisma.club.create({
      data: {
        name: 'Club de Padel Vincennes',
        address: '12 Rue de la Liberté, 94300 Vincennes',
        latitude: 48.8483,
        longitude: 2.4396,
        city: 'Vincennes',
      },
    }),
  ]);

  console.log(`✅ Created ${clubs.length} clubs`);

  // Note: User profiles will be created via Supabase Auth
  // This seed only creates static data like clubs

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
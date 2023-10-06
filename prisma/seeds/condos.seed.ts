import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const fakerCondo = (): any => ({
  name: faker.company.name(),
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding Condos...');
  /// --------- Condos ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.condos.create({ data: fakerCondo() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

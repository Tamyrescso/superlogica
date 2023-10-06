import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const fakerVisitor = (): any => ({
  fullName: faker.person.fullName(),
  rg: faker.string.numeric(9),
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding Visitors...');
  /// --------- Visitors ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.visitors.create({ data: fakerVisitor() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma  = new PrismaClient();

const fakerUnits = (): any => ({
name: faker.string.alphanumeric({ length: 2, casing: 'upper' }),
condos_id: faker.number.int({ min: 1, max: 10 })
});

async function main() {
const fakerRounds = 30;
dotenv.config();
console.log('Seeding Units...');
/// --------- Units ---------------
for (let i = 0; i < fakerRounds; i++) {
await prisma.units.create({ data: fakerUnits() });
}
};

  

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});
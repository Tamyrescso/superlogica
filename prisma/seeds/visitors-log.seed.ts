import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma  = new PrismaClient();

const fakeExit = () => {
    const randomValue = Math.random();
    return randomValue >= 0.5 ? faker.date.past({ years: 2 }) : null;
};

const generateFakeData = () => {
    const exit = fakeExit();
    const entry = exit ? faker.date.between({ from: exit.getFullYear() - 2, to: exit }) : faker.date.past({ years: 2 });  

    return {
        visitors_id: faker.number.int({ min: 1, max: 10 }),
        condos_id: faker.number.int({ min: 1, max: 10 }),
        units_id: faker.number.int({ min: 1, max: 30 }),
        entry: entry,
        exit: exit
    };
};

async function main() {
const fakerRounds = 50;
dotenv.config();
console.log('Seeding Visitors Logs...');
/// --------- Visitors Logs ---------------
for (let i = 0; i < fakerRounds; i++) {
    const fakerUnits = generateFakeData();
    await prisma.visitorsLog.create({ data: fakerUnits });
    }
};

  

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});
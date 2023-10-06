import { execSync } from 'child_process';

const seedsFolder = './prisma/seeds';
const condos = 'condos.seed.ts';
const visitors = 'visitors.seed.ts';
const units = 'units.seed.ts';

execSync(`ts-node ${seedsFolder}/${condos}`, { stdio: 'inherit' });
execSync(`ts-node ${seedsFolder}/${visitors}`, { stdio: 'inherit' });
execSync(`ts-node ${seedsFolder}/${units}`, { stdio: 'inherit' });
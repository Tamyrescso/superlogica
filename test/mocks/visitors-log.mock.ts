import { unitsFindAllMock } from './units.mock';
import { visitorFindAllMock } from './visitors.mock';

export const checkInMock = {
  visitors_id: 3,
  condos_id: 9,
  units_id: 5,
};

export const checkInResponseMock = {
  id: 1,
  visitors_id: 1,
  condos_id: 5,
  units_id: 19,
  entry: new Date('2017-03-16T05:10:33.187Z'),
  exit: null,
};

export const updateResponseMock = {
  id: 1,
  visitors_id: 1,
  condos_id: 5,
  units_id: 19,
  entry: new Date('2017-03-16T05:10:33.187Z'),
  exit: new Date('2022-02-22T10:33:30.292Z'),
};

export const visitorsLogsFindAllMock = [
  {
    id: 1,
    visitors: {
      id: 1,
      fullName: 'Hattie Emard',
      rg: '424629260',
      createdAt: new Date('2023-10-05T20:17:40.734Z'),
      updatedAt: new Date('2023-10-05T20:17:40.734Z'),
    },
    condos: {
      id: 5,
      name: 'Ratke, Lueilwitz and Weissnat',
    },
    units: {
      id: 19,
      name: 'KX',
      condos_id: 5,
    },
    entry: new Date('2017-03-16T05:10:33.187Z'),
    exit: null,
  },
  {
    id: 2,
    visitors: {
      id: 6,
      fullName: 'Mr. Jeffrey Mayert',
      rg: '428669275',
      createdAt: new Date('2023-10-05T20:17:40.745Z'),
      updatedAt: new Date('2023-10-05T20:17:40.745Z'),
    },
    condos: {
      id: 10,
      name: 'Collins, Bashirian and Mraz',
    },
    units: {
      id: 3,
      name: 'X2',
      condos_id: 10,
    },
    entry: new Date('2022-09-15T21:12:54.365Z'),
    exit: new Date('2023-03-24T06:47:01.368Z'),
  },
  {
    id: 3,
    visitors: {
      id: 6,
      fullName: 'Mr. Jeffrey Mayert',
      rg: '428669275',
      createdAt: new Date('2023-10-05T20:17:40.745Z'),
      updatedAt: null,
    },
    condos: {
      id: 5,
      name: 'Ratke, Lueilwitz and Weissnat',
    },
    units: {
      id: 19,
      name: 'KX',
      condos_id: 5,
    },
    entry: new Date('2022-01-28T02:56:23.907Z'),
    exit: null,
  },
  {
    id: 4,
    visitors: {
      id: 5,
      fullName: 'Penny Labadie',
      rg: '482777047',
      createdAt: new Date('2023-10-05T20:17:40.744Z'),
      updatedAt: new Date('2023-10-05T20:17:40.744Z'),
    },
    condos: {
      id: 5,
      name: 'Ratke, Lueilwitz and Weissnat',
    },
    units: {
      id: 19,
      name: 'KX',
      condos_id: 5,
    },
    entry: new Date('1985-03-07T23:16:44.578Z'),
    exit: new Date('2023-08-05T08:13:25.392Z'),
  },
  {
    id: 5,
    visitors: {
      id: 4,
      fullName: 'Dennis Gibson',
      rg: '719826753',
      createdAt: new Date('2023-10-05T20:17:40.743Z'),
      updatedAt: new Date('2023-10-05T20:17:40.743Z'),
    },
    condos: {
      id: 3,
      name: 'Hoppe - Heathcote',
    },
    units: {
      id: 7,
      name: 'DM',
      condos_id: 3,
    },
    entry: new Date('1971-11-14T07:54:17.627Z'),
    exit: new Date('2023-07-11T03:48:39.123Z'),
  },
];

export const checkOutResponseMock = {
  id: 1,
  visitors_id: 1,
  condos_id: 5,
  units_id: 19,
  entry: new Date('2017-03-16T05:10:33.187Z'),
  exit: new Date('2022-02-22T10:33:30.292Z'),
};

export const visitorsLogsPrismaMock = {
  visitorsLog: {
    create: jest.fn().mockReturnValue(checkInResponseMock),
    findMany: jest.fn().mockResolvedValue(visitorsLogsFindAllMock),
    findUnique: jest.fn().mockResolvedValue(visitorsLogsFindAllMock[1]),
    update: jest.fn().mockResolvedValue(updateResponseMock),
  },
  visitors: {
    findUnique: jest.fn().mockResolvedValue(visitorFindAllMock[5]),
  },
  units: {
    findMany: jest.fn().mockResolvedValue(unitsFindAllMock),
    findUnique: jest.fn().mockResolvedValue(unitsFindAllMock.items[2]),
  },
  condos: {
    findUnique: jest.fn().mockReturnThis(),
  },
};

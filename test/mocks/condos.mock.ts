export const condoFindAllMock = {
  info: {
    name: 'Sistema de controle de acesso',
    description: 'Lista de condomínios',
  },
  items: [
    {
      id: 1,
      name: 'Dach and Sons',
    },
    {
      id: 2,
      name: 'Kuhlman Group',
    },
    {
      id: 3,
      name: 'Hoppe - Heathcote',
    },
    {
      id: 4,
      name: 'Windler, Schowalter and Anderson',
    },
    {
      id: 5,
      name: 'Ratke, Lueilwitz and Weissnat',
    },
    {
      id: 6,
      name: 'Schamberger, Powlowski and Boehm',
    },
    {
      id: 7,
      name: 'Will, Mueller and Cremin',
    },
    {
      id: 8,
      name: 'Denesik, Hintz and Altenwerth',
    },
    {
      id: 9,
      name: 'Roob - Wunsch',
    },
    {
      id: 10,
      name: 'Collins, Bashirian and Mraz',
    },
  ],
};

export const condoFindOneMock = {
  id: 2,
  name: 'Kuhlman Group',
};

export const condoPrismaMock = {
  condos: {
    findMany: jest.fn().mockResolvedValue(condoFindAllMock.items),
    findUnique: jest.fn().mockResolvedValue(condoFindOneMock),
  },
};

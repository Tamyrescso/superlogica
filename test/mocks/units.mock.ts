export const unitsFindAllMock = {
  "info": {
    "name": "Sistema de controle de acesso",
    "description": "Lista de unidades"
  },
  "items": [
    {
      "id": 1,
      "name": "CC",
      "condos_id": 10
    },
    {
      "id": 2,
      "name": "AI",
      "condos_id": 8
    },
    {
      "id": 3,
      "name": "X2",
      "condos_id": 10
    },
    {
      "id": 4,
      "name": "3M",
      "condos_id": 3
    },
    {
      "id": 5,
      "name": "MM",
      "condos_id": 9
    },
    {
      "id": 6,
      "name": "JX",
      "condos_id": 7
    },
    {
      "id": 7,
      "name": "DM",
      "condos_id": 3
    },
    {
      "id": 8,
      "name": "8G",
      "condos_id": 1
    },
    {
      "id": 9,
      "name": "O1",
      "condos_id": 2
    },
    {
      "id": 10,
      "name": "ZM",
      "condos_id": 4
    },
    {
      "id": 11,
      "name": "8H",
      "condos_id": 6
    },
    {
      "id": 12,
      "name": "W4",
      "condos_id": 2
    },
    {
      "id": 13,
      "name": "2N",
      "condos_id": 8
    },
    {
      "id": 14,
      "name": "9K",
      "condos_id": 6
    },
    {
      "id": 15,
      "name": "MX",
      "condos_id": 10
    },
    {
      "id": 16,
      "name": "IM",
      "condos_id": 3
    },
    {
      "id": 17,
      "name": "UG",
      "condos_id": 2
    },
    {
      "id": 18,
      "name": "E9",
      "condos_id": 3
    },
    {
      "id": 19,
      "name": "KX",
      "condos_id": 5
    },
    {
      "id": 20,
      "name": "AJ",
      "condos_id": 6
    },
    {
      "id": 21,
      "name": "6V",
      "condos_id": 6
    },
    {
      "id": 22,
      "name": "MI",
      "condos_id": 8
    },
    {
      "id": 23,
      "name": "V1",
      "condos_id": 9
    },
    {
      "id": 24,
      "name": "KJ",
      "condos_id": 5
    },
    {
      "id": 25,
      "name": "18",
      "condos_id": 3
    },
    {
      "id": 26,
      "name": "ZC",
      "condos_id": 4
    },
    {
      "id": 27,
      "name": "VK",
      "condos_id": 9
    },
    {
      "id": 28,
      "name": "UE",
      "condos_id": 3
    },
    {
      "id": 29,
      "name": "4H",
      "condos_id": 4
    },
    {
      "id": 30,
      "name": "EN",
      "condos_id": 6
    }
  ]
};

export const unitsFindOneMock = {
  "id": 1,
  "name": "CC",
  "condos_id": 10
};

export const unitsPrismaMock = {
  units: {
    findMany: jest.fn().mockResolvedValue(unitsFindAllMock.items),
    findUnique: jest.fn().mockResolvedValue(unitsFindOneMock),
  },
};
export const visitorCreateMock = {
  "fullName": "Roberto Silva Santos",
  "rg": "123456789"
};

export const visitorCreateResponseMock = {
  "id": 1,
  "fullName": "Roberto Silva Santos",
  "rg": "123456789",
  "createdAt": new Date("2023-10-05T22:10:57.039Z"),
  "updatedAt": new Date("2023-10-05T22:10:57.039Z")
};

export const visitorFindAllMock = [
  {
    "id": 1,
    "fullName": "Hattie Emard",
    "rg": "424629260",
    "createdAt": new Date("2023-10-05T20:17:40.734Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.734Z")
  },
  {
    "id": 2,
    "fullName": "Josh Mann",
    "rg": "214077923",
    "createdAt": new Date("2023-10-05T20:17:40.740Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.740Z")
  },
  {
    "id": 3,
    "fullName": "Mandy Abernathy",
    "rg": "555829944",
    "createdAt": new Date("2023-10-05T20:17:40.742Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.742Z")
  },
  {
    "id": 4,
    "fullName": "Dennis Gibson",
    "rg": "719826753",
    "createdAt": new Date("2023-10-05T20:17:40.743Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.743Z")
  },
  {
    "id": 5,
    "fullName": "Penny Labadie",
    "rg": "482777047",
    "createdAt": new Date("2023-10-05T20:17:40.744Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.744Z")
  },
  {
    "id": 6,
    "fullName": "Mr. Jeffrey Mayert",
    "rg": "428669275",
    "createdAt": new Date("2023-10-05T20:17:40.745Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.745Z")
  },
  {
    "id": 7,
    "fullName": "Juanita Schuster III",
    "rg": "994707728",
    "createdAt": new Date("2023-10-05T20:17:40.746Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.746Z")
  },
  {
    "id": 8,
    "fullName": "Taylor Kshlerin",
    "rg": "159149974",
    "createdAt": new Date("2023-10-05T20:17:40.747Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.747Z")
  },
  {
    "id": 9,
    "fullName": "Emma Zboncak",
    "rg": "614792655",
    "createdAt": new Date("2023-10-05T20:17:40.749Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.749Z")
  },
  {
    "id": 10,
    "fullName": "Peter Osinski",
    "rg": "081631758",
    "createdAt": new Date("2023-10-05T20:17:40.750Z"),
    "updatedAt": new Date("2023-10-05T20:17:40.750Z")
  }
];

export const visitorUpdateMock = {
  "rg": "111111111"
};

export const visitorUpdateResponseMock = {
  "id": 10,
  "fullName": "Peter Osinski",
  "rg": "111111111",
  "createdAt": new Date("2023-10-05T20:17:40.750Z"),
  "updatedAt": new Date("2023-10-05T20:17:40.750Z")
};
export const visitorIdUpdateMock = 10;

export const visitorPrismaMock = {
  visitors: {
    create: jest.fn().mockReturnValue(visitorCreateResponseMock),
    findMany: jest.fn().mockResolvedValue(visitorFindAllMock),
    findUnique: jest.fn().mockResolvedValue(visitorFindAllMock[0]),
    update: jest.fn().mockResolvedValue(visitorUpdateResponseMock),
    delete: jest.fn(),
  },
};

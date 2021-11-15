const jwt = require("jsonwebtoken");
const config = require("../config/config");
const validation = require("../middlewares/validation");
const UserService = require("../services/user.service");

jest.mock("jsonwebtoken", () => ({
  jwt: jest.fn(),
}));

jest.mock("../config/config", () => ({
  config: jest.fn(),
}));

jest.mock("../middlewares/validation", () => ({
  validation: jest.fn(),
}));

jest.mock("../services/user.service", () => ({
  UserService: jest.fn(),
}));

const jwt_token = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGMwNzdiOTMwZjUxM2I0YmZmY2Q2ZCIsImVtYWlsIjoiY3NzYW0xQGhvdG1haWwuY29tIiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2MzY1NjY5MDgsImV4cCI6MTYzNjczOTcwOH0.VP5YoQvvfzfFrIMqqlfLU309Dn3vn4su3MvlKJY7_qE",
};

const testUser = {
  username: "testUser",
  email: "testUser@irdetoi.com",
  password: "testPass2IR#",
};

const mockUserReturned = {
  id: "618c077b930f513b4bffcd6d",
  verified: false,
  verificationToken: "1477a4b7dcbf8fa88f709706544dfab036be03cd",
  oauthprofiles: [],
  email: "cssam1@hotmail.com",
  password: "$2a$12$nHDLpjxzI.VloJJs36ZhGOuO8Uapz93UC/Jp8a.3K3SX335yVZh66",
  username: "Chandima",
};

// const mockconfig = jest.fn();

// jest.mock("config", () => () => mockconfig);

// jest.unmock("config");
//expect(mockjwt).toBeCalledTimes(1);

describe("login", () => {
  let auth_controller;
  const mockjwt = jest.fn().mockResolvedValue(jwt_token);
  const mockUser = jest.fn().mockResolvedValue(testUser);
  // const mockvalidation = jest
  //   .fn()
  //   .mockResolvedValue("{ formatter: [Function: formatter], errors: [] }");

  beforeAll(() => {
    //jest.mock("validation", () => () => ({ validationResult: mockvalidation }));
    jest.mock("jsonwebtoken", () => () => ({ sign: mockjwt }));
    jest.mock("../../services/user.service", () => () => ({
      findByEmail: mockUserReturned,
    }));
    auth_controller = require("../../controllers/auth.controller");
  });

  afterAll(() => {
    jest.unmock("jsonwebtoken");
    jest.unmock("../../services/user.service");
    //jest.unmock("validation");
  });

  it("should resolve with the jwt upon success", async () => {
    const response = await auth_controller.login(testUser).expect(200);
    // await expect(actual).toEqual(jwt_token);
    expect("../../services/user.service").toHaveBeenCalledTimes(1);
    //expect(mockvalidation).toBeCalledWith(value);
  });
});

const request = require("supertest");
const express = require("express");
const authRoute = require("./auth.route");

const passport = require("passport");
const auth_controller = require("../controllers/auth.controller");

const loginRes = {
  id: "618c077b930f513b4bffcd6d",
  status: "You are logged in now!",
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MThjMDc3YjkzMGY1MTNiNGJmZmNkNmQiLCJpYXQiOjE2MzY3MDA1NDcsImV4cCI6MTYzNjc4Njk0N30.pAszWUBzj9YCFL_AlOJ_bC4Wp2UyxQMR8ciFqiCuRsY",
};

const jwt_token = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGMwNzdiOTMwZjUxM2I0YmZmY2Q2ZCIsImVtYWlsIjoiY3NzYW0xQGhvdG1haWwuY29tIiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2MzY1NjY5MDgsImV4cCI6MTYzNjczOTcwOH0.VP5YoQvvfzfFrIMqqlfLU309Dn3vn4su3MvlKJY7_qE",
};
const testUser = {
  username: "Chandima",
  email: "cssam1@hotmail.com",
  password: "mypass2I#",
};

const mockResponse = () => {
  const res = {};
  (res.headers = jest
    .fn()
    .mockReturnValue({ "Content-Type": "application/json" })),
    (res.status = jest.fn().mockReturnValue(200));
  res.json = jest.fn().mockReturnValue(loginRes);
  return res;
};

const mockMorgan = jest.fn((req, res, next) => next());

const app = express();
app.use("/auth", authRoute);

beforeAll(() => {
  jest.mock("morgan", () => () => mockMorgan);
  jest.mock("../controllers/auth.controller", () => ({
    register: jest.fn(),
    login: mockResponse,
    currentUser: jest.fn(),
    logout: jest.fn(),
  }));
  jest.mock("passport", () => ({
    authenticate: jest.fn(),
  }));
});

afterAll(() => {
  jest.unmock("morgan");
  jest.unmock("../controllers/auth.controller");
  jest.unmock("passport");
});

describe("POST", () => {
  it("should return the jwt form", async () => {
    const response = await request(app).post("/login").send(testUser);
    expect(response.json).toContain(loginRes);
    expect(response.status).toBe(200);
  });
});

// describe("POST", () => {
//   it("should return the jwt form", async () => {
//     const response = await server
//       .post("/register")
//       .type("json")
//       .send(testUser)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.json).toContain(jwt_token);
//   });
// });

// describe("GET", () => {
//   it("should return the jwt form", async () => {
//     const response = await server
//       .get("/currentUser")
//       .type("json")
//       .send(testUser)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.json).toContain(jwt_token);
//   });
// });

// describe("GET", () => {
//   it("should return the jwt form", async () => {
//     const response = await server
//       .get("/logout")
//       .type("json")
//       .send(testUser)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.json).toContain(jwt_token);
//   });
// });

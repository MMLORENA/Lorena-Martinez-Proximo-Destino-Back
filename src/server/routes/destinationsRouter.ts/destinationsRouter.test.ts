import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Destination from "../../../database/models/Destination";
import app from "../..";
import connectDB from "../../../database";
import User from "../../../database/models/User";
import { createToken } from "../../../utils/auth/auth";

let mongoServer: MongoMemoryServer;
let mockToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  await connectDB(mongoURL);
});

beforeEach(async () => {
  const mockUser = await User.create({
    name: "Admin",
    firstName: "Admin",
    userName: "Admin",
    password: "123",
  });

  const mockPayload = {
    id: mockUser.id,
    userName: "Admin",
  };

  mockToken = await createToken(mockPayload);

  const mockDestination = await Destination.create({
    destination: "Nepal",
    image: "A",
    latitude: 200,
    longitud: 1000,
    cateogry: "adventure",
    firstPlan: "Himalaya",
    descriptionFirstPlan: "trekking",
    owner: mockUser.id,
  });

  mockUser.destinations.push(mockDestination.id);
  mockUser.save();
});

afterEach(async () => {
  await User.deleteMany();
  await Destination.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the endpoint GET /destinations/", () => {
  const destinations = "/destinations";

  describe("When it receives a request with method get and a valid user token", () => {
    test("Then it should response with status 200 and an object with a property 'destinations'", async () => {
      const expectedStatus = 200;

      const { body } = await request(app)
        .get(destinations)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(expectedStatus);

      expect(body).toHaveProperty("destinations");
    });
  });

  describe("When it receives a request with method get and an ivalid user token", () => {
    test("Then it should response with status 404 and an object with a property 'destinations'", async () => {
      const expectedStatus = 500;
      const message = "General error";

      const { body } = await request(app)
        .get(destinations)
        .set("Authorization", `Bearer #`)
        .expect(expectedStatus);

      expect(body).toHaveProperty("error", message);
    });
  });
});

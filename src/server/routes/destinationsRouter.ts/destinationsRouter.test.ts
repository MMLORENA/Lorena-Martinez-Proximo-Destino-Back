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
let destinationsDelete: string;

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockReturnValue({
          error: false,
        }),
        getPublicUrl: () => ({
          publicURL: "Image url",
        }),
      }),
    },
  }),
}));

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
    backupImage: "A",
    latitude: 200,
    longitude: 1000,
    category: "adventure",
    firstPlan: "Himalaya",
    descriptionFirstPlan: "trekking",
    owner: mockUser.id,
  });

  mockUser.destinations.push(mockDestination.id);
  mockUser.save();

  destinationsDelete = `/destinations/delete/${mockDestination.id}`;
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

describe("Given the endpoint DELETE /destinations/:idDestination", () => {
  describe("When it receives a request with method delete and a valid user token", () => {
    test("Then it should response with status 200 and an object with a property message 'Destination has been deleted'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Destination has been deleted";

      const { body } = await request(app)
        .delete(destinationsDelete)
        .set("Authorization", `Bearer ${mockToken}`)
        .expect(expectedStatus);

      expect(body).toHaveProperty("message", expectedMessage);
    });
  });

  describe("When it receives a request with method get and an ivalid user token", () => {
    test("Then it should response with status 404 and an object with a property 'destinations'", async () => {
      const expectedStatus = 500;
      const message = "General error";

      const { body } = await request(app)
        .delete(destinationsDelete)
        .set("Authorization", `Bearer #`)
        .expect(expectedStatus);

      expect(body).toHaveProperty("error", message);
    });
  });
});

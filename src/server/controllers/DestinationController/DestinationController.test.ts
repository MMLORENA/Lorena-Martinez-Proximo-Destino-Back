import { NextFunction, Response } from "express";
import Destination from "../../../database/models/Destination";
import User from "../../../database/models/User";
import {
  CustomJwtPayload,
  CustomRequest,
} from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import {
  createDestination,
  deleteDestination,
  getUserDestinations,
} from "./DestinationController";

const mockPayloadUser: CustomJwtPayload = {
  id: "63175d13ef184c29a92d2e67",
  userName: "Admin",
};

describe("Given a getUserDestination", () => {
  afterEach(() => jest.clearAllMocks());

  describe("When it's called with a request, response and a next function", () => {
    const req = {
      payload: mockPayloadUser,
    } as Partial<CustomRequest>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    describe("And the user is on DB and has destinations", () => {
      const mockUserPopulate = {
        name: "Admin",
        firstName: "Admin",
        userName: "Admin",
        password:
          "$2a$10$daP7dm2Ec4RoPvkmfIwLuOYOp1.tjAM99OQvYFkShXKRqF/7ogg9W",
        destinations: [
          {
            destination: "Nepal",
            image: "A",
            latitude: 200,
            longitud: 1000,
            cateogry: "adventure",
            firstPlan: "Himalaya",
            descriptionFirstPlan: "trekking",
            owner: "63175d13ef184c29a92d2e67",
            id: "63175bcd3349cd8da4ca9dbd",
          },
        ],
      };

      test("Then it should response with a status 200", async () => {
        const expectedStatus = 200;

        User.findOne = jest.fn().mockReturnThis();
        User.populate = jest.fn().mockReturnValue(mockUserPopulate);

        await getUserDestinations(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });

      test("Then it should invoke the response method json with the owner destinations ", async () => {
        const expectedDestinations = {
          destinations: [
            {
              destination: "Nepal",
              image: "A",
              latitude: 200,
              longitud: 1000,
              cateogry: "adventure",
              firstPlan: "Himalaya",
              descriptionFirstPlan: "trekking",
              owner: "63175d13ef184c29a92d2e67",
              id: "63175bcd3349cd8da4ca9dbd",
            },
          ],
        };

        User.findOne = jest.fn().mockReturnThis();
        User.populate = jest.fn().mockReturnValue(mockUserPopulate);

        await getUserDestinations(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenLastCalledWith(expectedDestinations);
      });
    });

    describe("And the user isn't on DB", () => {
      test("Then it should invoke next methode", async () => {
        const mockUserNotFound: null = null;
        const mockUserNoDestinations = {
          name: "Admin",
          firstName: "Admin",
          userName: "Admin",
          password:
            "$2a$10$daP7dm2Ec4RoPvkmfIwLuOYOp1.tjAM99OQvYFkShXKRqF/7ogg9W",
          destinations: [{}],
        };

        User.findOne = jest.fn().mockResolvedValue(mockUserNotFound);
        User.populate = jest.fn().mockReturnValue(mockUserNoDestinations);

        await getUserDestinations(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});

describe("Given a deleteDestination", () => {
  describe("When it's called with a request a next function", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    describe("And a response with correct id", () => {
      const req: Partial<CustomRequest> = {
        params: { idDestination: "1" },
        payload: mockPayloadUser,
      };

      test("Then it should call the response method status with 200", async () => {
        const status = 200;

        Destination.findByIdAndDelete = jest.fn();
        User.findOneAndUpdate = jest.fn();

        await deleteDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
      });

      test("Then it should call the response method json with message", async () => {
        const expectedJson = { message: "Destination has been deleted" };

        Destination.findByIdAndDelete = jest.fn();
        User.findOneAndUpdate = jest.fn();

        await deleteDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith(expectedJson);
      });
    });

    describe("And it receives a response with an id Destination doesn't exist", () => {
      test("Then it should call next function with an error", async () => {
        const req: Partial<CustomRequest> = {
          params: { idDestination: "" },
          payload: mockPayloadUser,
        };
        const mockErrorCustom = new Error();

        Destination.findByIdAndDelete = jest
          .fn()
          .mockRejectedValue(new Error());
        User.findOneAndUpdate = jest.fn();

        await deleteDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(mockErrorCustom);
      });
    });
  });
});

describe("Given a createDestination", () => {
  describe("When it's called with a request a next function", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    describe("And a response with correct id", () => {
      const bodyDestination = {
        destination: "Nepal",
        image: "A",
        backupImage: "A",
        latitude: 200,
        longitude: 1000,
        category: "adventure",
        firstPlan: "Himalaya",
        descriptionFirstPlan: "trekking",
        id: "a",
      };

      const req: Partial<CustomRequest> = {
        body: bodyDestination,
        payload: mockPayloadUser,
      };

      test("Then it should call the response method status with 200", async () => {
        const status = 201;

        Destination.create = jest.fn().mockResolvedValue({ id: "1234" });
        User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);

        await createDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
      });

      test("Then it should call the response method json with message", async () => {
        const expectedJson = { message: "New Destination created succesfully" };

        Destination.create = jest.fn().mockResolvedValue({ id: "1234" });
        User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);

        await createDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith(expectedJson);
      });
    });

    describe("When it's invoke with an empty idDestination", () => {
      test("Then it should call next function with an error", async () => {
        const bodyDestination = {};

        const req: Partial<CustomRequest> = {
          body: bodyDestination,
          payload: mockPayloadUser,
        };
        const ErrorCustomTest = new ErrorCustom(
          400,
          "",
          "Error creating new destination"
        );

        Destination.findByIdAndDelete = jest
          .fn()
          .mockRejectedValue(new Error());
        User.findOneAndUpdate = jest.fn().mockRejectedValue(new Error());

        await createDestination(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(ErrorCustomTest);
      });
    });
  });
});

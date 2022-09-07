import { NextFunction, Response } from "express";
import User from "../../../database/models/User";
import { Destinations } from "../../../interfaces/interfacesDestinations/interfacesDestination";
import {
  CustomJwtPayload,
  CustomRequest,
} from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import getUserDestinations from "./DestinationController";

describe("Given a getUserDestination", () => {
  afterEach(() => jest.clearAllMocks());

  describe("When it's called with a request, response and a next function", () => {
    const mockPayloadUser: CustomJwtPayload = {
      id: "63175d13ef184c29a92d2e67",
      userName: "Admin",
    };

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

    describe("And the user is on DB but hasn't destinations", () => {
      test("Then it should invoke next methode with Error and status '404'", async () => {
        const mockUserPopulate = {
          name: "Admin",
          firstName: "Admin",
          userName: "Admin",
          password:
            "$2a$10$daP7dm2Ec4RoPvkmfIwLuOYOp1.tjAM99OQvYFkShXKRqF/7ogg9W",
          destinations: [] as Destinations,
        };

        const mockError = new ErrorCustom(
          401,
          "There isn't destinations availability",
          "Destinations not found"
        );

        User.findOne = jest.fn().mockReturnThis();
        User.populate = jest.fn().mockReturnValue(mockUserPopulate);

        await getUserDestinations(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(mockError);
      });
    });
  });
});

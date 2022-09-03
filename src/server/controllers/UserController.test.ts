import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import { UserDB, UserLogin } from "../../interfaces/interfaces";
import ErrorCustom from "../../utils/Error/ErrorCustom";
import { getRegister, userLogin } from "./UserController";

const mockUser = {
  name: "Maria",
  firstName: "",
  userName: "Mari",
  password: "",
};

describe("Given a getRegister", () => {
  describe("When it receives a response object", () => {
    describe("And a user with the requires properties", () => {
      const req = {
        body: mockUser,
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      User.create = jest.fn().mockResolvedValue(mockUser);

      test("Then it should invoke the response method status with 201", async () => {
        const status = 201;
        const next = () => {};

        await getRegister(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
      });

      test("Then it should invoke the response method json with message 'User Created' ", async () => {
        const expectedMessage = "User Created";
        const next = () => {};

        await getRegister(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
      });
    });

    describe("And a user with the wrong properties", () => {
      const req = {
        body: mockUser,
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      test("Then it should invoke the next method'", async () => {
        const testError = new ErrorCustom(400, "", "error");

        User.create = jest.fn().mockRejectedValue(testError);
        const next = jest.fn();

        await getRegister(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(testError);
      });
    });
  });
});

describe("Given a userLogin", () => {
  describe("When it receives a response object", () => {
    const mockUserLogin: UserLogin = {
      userName: "Admin",
      password: "Admin",
    };

    const mockUserFound: UserDB = {
      userName: "Admin",
      id: "",
      password: "#",
    };

    const req: Partial<Request> = {
      body: mockUserLogin,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: Partial<NextFunction> = jest.fn();

    describe("And receives user data correctly", () => {
      const bcryptResolve = true;
      const jwtReturn = "#";

      User.findOne = jest.fn().mockResolvedValue(mockUserFound);
      bcrypt.compare = jest.fn().mockResolvedValue(bcryptResolve);
      jwt.sign = jest.fn().mockReturnValue(jwtReturn);

      test("Then it should invoke the response method status with 200", async () => {
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      test("Then call the response method json with a token '#'", async () => {
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(res.json).toHaveBeenCalledWith({
          user: { token: jwtReturn },
        });
      });
    });

    describe("And it's receieve a correct user data but isn't found in DataBase", () => {
      test("Then it should invoke the method next with an error", async () => {
        const mockUserNotFound: null = null;
        const mockError = new ErrorCustom(
          403,
          "User not found",
          "User or password not valid"
        );

        User.findOne = jest.fn().mockResolvedValue(mockUserNotFound);
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(mockError);
      });
    });

    describe("And it's receives correctly the user data but there is a Database error during the search", () => {
      test("Then call the response method next with an error", async () => {
        const mockMongooseReject = new Error();
        const mockUserError = new ErrorCustom(403, "", "");

        User.findOne = jest.fn().mockRejectedValue(mockMongooseReject);
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(mockUserError);
      });
    });

    describe("And it's receives correctly the user data but the password comparer fails", () => {
      test("Then it should invoke next method with an error", async () => {
        const mockPasswordError = new ErrorCustom(403, "", "");
        const bcryptResolve = false;

        User.findOne = jest.fn().mockResolvedValue(mockUserFound);
        bcrypt.compare = jest.fn().mockResolvedValue(bcryptResolve);
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(mockPasswordError);
      });
    });

    describe("But password comparer throw an error", () => {
      test("Then call the response method next with an error", async () => {
        const hashError = new ErrorCustom(403, "", "");
        const bcryptError = new Error();

        User.findOne = jest.fn().mockResolvedValue(mockUserFound);
        bcrypt.compare = jest.fn().mockRejectedValue(bcryptError);
        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(hashError);
      });
    });
  });
});

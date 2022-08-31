import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import ErrorCustom from "../../utils/ErrorCustom";
import getRegister from "./UserController";

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

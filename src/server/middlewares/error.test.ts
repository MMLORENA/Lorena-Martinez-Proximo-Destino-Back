import { NextFunction, Request, Response } from "express";
import ErrorCustom from "../../utils/ErrorCustom";
import generalError from "./error";

describe("Given a generalError middleware", () => {
  const req = {} as Partial<Request>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const error = new Error() as ErrorCustom;

  describe("When it receives a response object", () => {
    test("Then it should invoke without status, the method status should response with a 500", () => {
      const expectedStatus = 500;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should he response method json with a 'General Error' as public message", () => {
      const expectPublicError = "General error";

      error.publicMessage = "General Error";

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectPublicError });
    });
  });
});

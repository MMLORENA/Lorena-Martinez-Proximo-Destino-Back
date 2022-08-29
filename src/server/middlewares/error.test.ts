import { NextFunction, Request, Response } from "express";
import ErrorCustom from "../../utils/ErrorCustom";
import { generalError, notFoundEndpoint } from "./error";

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

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response object", () => {
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    test("Then it should invoke the response method status with 404", () => {
      const status = 404;

      notFoundEndpoint(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("And then it should invoke the response method json with a 'Endpoint not Found'", () => {
      const errorResponse = {
        error: "Endpoint not found",
      };

      notFoundEndpoint(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});

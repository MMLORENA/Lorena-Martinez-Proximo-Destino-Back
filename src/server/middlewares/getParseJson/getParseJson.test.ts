import { NextFunction, Response } from "express";
import { CustomRequest } from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import getParseJson from "./getParseJson";

describe("Given a getParseJson middleware", () => {
  jest.useFakeTimers();

  describe("When it receive a request, a response and a next function", () => {
    const mockDestination = {
      destination: "Nepal",
      image: "A",
      latitude: 200,
      longitud: 1000,
      cateogry: "adventure",
      firstPlan: "Himalaya",
      descriptionFirstPlan: "trekking",
    };

    const destinationJson = JSON.stringify(mockDestination);

    const req = {
      body: { destination: destinationJson },
    } as Partial<CustomRequest>;

    const res = {} as Partial<Response>;

    const next = jest.fn() as NextFunction;

    test("Then it should asign the data as req body", async () => {
      await getParseJson(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });

    test("If it get an error it must call the next function with the error created", async () => {
      const reqNotBody = {
        body: {},
      } as Partial<CustomRequest>;

      const newError = new ErrorCustom(
        400,
        "Unexpected token u in JSON at position 0",
        "Something failed while parsing the received data"
      );
      await getParseJson(reqNotBody as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});

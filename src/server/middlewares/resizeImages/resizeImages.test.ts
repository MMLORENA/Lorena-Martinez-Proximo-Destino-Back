import { NextFunction, Response } from "express";
import fs from "fs/promises";
import { CustomRequest } from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import resizeImage from "./resizeImages";

let mockToFile = jest.fn();

jest.mock("sharp", () => () => ({
  resize: jest.fn().mockReturnValue({
    webp: jest.fn().mockReturnValue({
      toFile: mockToFile,
    }),
  }),
}));

const fileRequest = {
  filename: "test",
  originalname: "testjpg",
} as Partial<Express.Multer.File>;

const req = {
  file: fileRequest,
} as Partial<CustomRequest>;

const res = {} as Partial<Response>;
const next = jest.fn() as NextFunction;

beforeAll(async () => {
  await fs.writeFile("uploads/juegorandom", "juegorandom");
});

afterAll(async () => {
  await fs.unlink("uploads/juegorandom");
});

describe("Given the resizeImages", () => {
  describe("When it's instantiated with a correct image", () => {
    test("Then should call next", async () => {
      await resizeImage(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's instantiated with a incorrect image", () => {
    test("Then should return", async () => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
      const errorSharp = new ErrorCustom(
        400,
        "Could not process image",
        "Could not process image"
      );

      mockToFile = jest.fn().mockRejectedValue(new Error());

      await resizeImage(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(errorSharp);
    });
  });
});

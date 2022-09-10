import { NextFunction, Response } from "express";
import fs from "fs/promises";
import { CustomRequest } from "../../../interfaces/interfaces";
import storageImages from "./storageImages";

let mockUpload = jest.fn().mockReturnValue({
  error: false,
});

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: jest.fn().mockResolvedValue(mockUpload),
        getPublicUrl: () => ({
          publicURL: "Public Url",
        }),
      }),
    },
  }),
}));

beforeEach(async () => {
  await fs.writeFile("uploads/test", "testName.jpg");
});

afterAll(async () => {
  await fs.unlink("uploads/1000-testName.jpg");
  jest.clearAllMocks();
});

describe("Given the storageImages middleware", () => {
  const bodyRequest = {
    destination: "Nepal",
    image: "test",
    latitude: 200,
    longitud: 1000,
    cateogry: "adventure",
    firstPlan: "Himalaya",
    descriptionFirstPlan: "trekking",
  };

  const fileRequest = {
    filename: "test",
    originalname: "testName.jpg",
  } as Partial<Express.Multer.File>;

  const req = {
    body: bodyRequest,
    file: fileRequest,
  } as Partial<CustomRequest>;
  const res = {} as Partial<Response>;
  const next = jest.fn() as NextFunction;

  describe("When it's called with correct request with image destination file", () => {
    describe("And image is uploaded to supabase", () => {
      test("Then next then should be called", async () => {
        jest.spyOn(Date, "now").mockReturnValueOnce(1000);

        await storageImages(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });

      test("If the upload fails, it should call next with an error", async () => {
        mockUpload = jest.fn().mockReturnValue({
          error: "Error uploading images",
        });

        await storageImages(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});

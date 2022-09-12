import { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { CustomRequest } from "../../../interfaces/interfaces";
import storageSupabase from "./storageSupabase";

const mockUpload = jest.fn().mockReturnValue({
  error: false,
});

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: mockUpload,
        getPublicUrl: () => ({
          publicURL: "Image url",
        }),
      }),
    },
  }),
}));

const fileRequest = {
  filename: "test",
  originalname: "test2.jpg",
} as Partial<Express.Multer.File>;

jest.useFakeTimers();

beforeAll(async () => {
  await fs.writeFile(path.join("uploads", "test"), "content");
});

afterAll(async () => {
  // await fs.unlink("uploads/image.png");
  jest.clearAllMocks();
});
describe("Given a storageSupabase function", () => {
  const res = {} as Partial<Response>;
  const next = jest.fn() as NextFunction;

  describe("When it's called with correct request with image destination", () => {
    describe("And image is uploaded to supabase", () => {
      const req = {
        body: {
          image: "test2.jpg",
        },
        file: fileRequest,
      } as Partial<CustomRequest>;
      test("Then next then should be called", async () => {
        await storageSupabase(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});

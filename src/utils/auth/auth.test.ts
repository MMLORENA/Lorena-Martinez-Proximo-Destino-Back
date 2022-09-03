import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../../interfaces/interfaces";
import { createHash, createToken, hashCompare } from "./auth";

describe("Given the createHash function", () => {
  describe("When it's called with '123' ", () => {
    test("Then it should return '#", async () => {
      bcrypt.hash = jest.fn().mockResolvedValue("#");
      const expectedTextHashed = "#";

      const textHashed = await createHash("123");

      expect(textHashed).toBe(expectedTextHashed);
    });
  });
});

describe("Given the hashCompare function", () => {
  describe("When it's invoke", () => {
    const password = "123456";

    describe("And it's called with '123456' and 'abH5esefterg", () => {
      test("Then it should return 'true'", async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        const hashedBPassword = "abH5esefterg";
        const expectedResult = true;

        const isSamePassword = await hashCompare(password, hashedBPassword);

        expect(isSamePassword).toBe(expectedResult);
      });
    });

    describe("And it's called with '123456' and '3t4yhrbf'", () => {
      test("Then it should return 'true'", async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(false);
        const hashedBPassword = "3t4yhrbf";
        const expectedResult = false;

        const isSamePassword = await hashCompare(password, hashedBPassword);

        expect(isSamePassword).toBe(expectedResult);
      });
    });
  });
});

describe("Given the createToken function", () => {
  describe("When it's invoke with a user info", () => {
    test("Then it should return 'true'", () => {
      const mockUser: CustomJwtPayload = { userName: "Ataulfo", id: "01" };
      const mockedToken = "#";
      jwt.sign = jest.fn().mockReturnValue(mockedToken);

      const resultToken = createToken(mockUser);

      expect(resultToken).toBe(mockedToken);
    });
  });
});

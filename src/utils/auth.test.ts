import bcrypt from "bcryptjs";

import hashCreator from "./auth";

describe("Given the createHash function", () => {
  describe("When it's called with '123' ", () => {
    test("Then it should return '#", async () => {
      bcrypt.hash = jest.fn().mockResolvedValue("#");
      const expectedTextHashed = "#";

      const textHashed = await hashCreator("123");

      expect(textHashed).toBe(expectedTextHashed);
    });
  });
});

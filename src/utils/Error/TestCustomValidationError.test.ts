import TestCustomValidationError from "./TestCustomValidationError";

describe("Given the TestCustomValidationError class", () => {
  describe("When is invocate with 400 code, private and public message", () => {
    test("Then should return an object with code 400, 'Private message' & 'wrong data'", () => {
      const expectedStatus = 400;
      const expectedPrivateMessage = "private message";
      const expectedPublicMessage = "Wrong Data";

      const resultError = new TestCustomValidationError(
        expectedStatus,
        expectedPrivateMessage,
        expectedPublicMessage
      );

      expect(resultError.statusCode).toBe(expectedStatus);
      expect(resultError.privateMessage).toBe(expectedPrivateMessage);
      expect(resultError.publicMessage).toBe(expectedPublicMessage);
    });
  });
});

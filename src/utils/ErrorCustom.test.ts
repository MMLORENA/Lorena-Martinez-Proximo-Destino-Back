import CustomError from "./ErrorCustom";

describe("Given the ErrorCustom class", () => {
  describe("When is invocate with 400 code, private and public message", () => {
    test("Then should return an object with code 400, 'Private message' & 'Public message'", () => {
      const expectedStatus = 400;
      const expectedPrivateMessage = "Private message";
      const expectedPublicMessage = "Public message";

      const resultError = new CustomError(
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

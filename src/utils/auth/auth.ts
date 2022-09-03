import bcrypt from "bcryptjs";

export const createHash = (paswordText: string) => {
  const salt = 10;
  return bcrypt.hash(paswordText, salt);
};

export const hashCompare = (passwordText: string, hash: string) =>
  bcrypt.compare(passwordText, hash);

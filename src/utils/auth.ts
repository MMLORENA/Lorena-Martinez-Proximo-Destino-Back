import bcrypt from "bcryptjs";

const createHash = (paswordText: string) => {
  const salt = 10;
  return bcrypt.hash(paswordText, salt);
};

export default createHash;

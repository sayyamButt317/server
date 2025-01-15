import bcrypt from "bcrypt";

const encryptedPassword = async (plainPassword) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashedPassword;
};
const matchPassword = async (plainPassword, dbStoredPassword) => {
  return await bcrypt.compare(plainPassword, dbStoredPassword);
};

export { encryptedPassword, matchPassword };

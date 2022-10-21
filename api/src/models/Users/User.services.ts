import bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
};

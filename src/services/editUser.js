import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const editUser = async (
  id,
  username,
  password,
  name,
  email,
  phonenumber,
  pictureURL
) => {
  const prisma = new PrismaClient();
  const editUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phonenumber,
      pictureURL,
    },
  });
  if (!editUser) {
    throw new NotFoundError("User", "id", id);
  }
  return {
    message: "User edited successfully",
  };
};

export default editUser;

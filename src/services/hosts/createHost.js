import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phonenumber,
  pictureURL,
  aboutMe
) => {
  const prisma = new PrismaClient();

  return prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phonenumber,
      pictureURL,
      aboutMe,
    },
  });
};

export default createHost;

import express from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phonenumber,
  pictureURL
) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phonenumber,
      pictureURL,
    },
  });
};
export default createUser;

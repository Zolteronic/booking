import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundError("User", "id", userId);
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", "id", propertyId);
  }

  const newReview = await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return newReview;
};

export default createReview;

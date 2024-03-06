import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateBooking = async (id, fields) => {
  const prisma = new PrismaClient();
  const { userId, propertyId } = fields;

  if (userId && !(await prisma.user.findUnique({ where: { id: userId } }))) {
    throw new NotFoundError("User", "id", userId);
  }

  if (
    propertyId &&
    !(await prisma.property.findUnique({ where: { id: propertyId } }))
  ) {
    throw new NotFoundError("Property", "id", propertyId);
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: fields,
  });

  if (!booking) {
    throw new NotFoundError("Booking", "id", id);
  }

  return booking;
};

export default updateBooking;

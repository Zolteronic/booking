import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateProperties = async (id, data) => {
  const prisma = new PrismaClient();
  const {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathroomCount,
    maxQuestCount,
    rating,
    amenities,
  } = data;

  if (hostId) {
    const host = await prisma.host.findUnique({
      where: {
        id: hostId,
      },
    });

    if (!host) {
      throw new NotFoundError("Host", "id", hostId);
    }
  }

  await prisma.property.update({
    where: { id: id },
    data: {
      amenities: {
        disconnect: [],
      },
    },
  });

  // Connect new amenities
  await prisma.property.update({
    where: { id: id },
    data: {
      amenities: {
        connect: amenities.map((Id) => ({ id: Id })),
      },
    },
  });
  const updateData = {};
  if (hostId !== undefined) updateData.hostId = hostId;
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (location !== undefined) updateData.location = location;
  if (pricePerNight !== undefined) updateData.pricePerNight = pricePerNight;
  if (bedroomCount !== undefined) updateData.bedroomCount = bedroomCount;
  if (bathroomCount !== undefined) updateData.bathroomCount = bathroomCount;
  if (maxQuestCount !== undefined) updateData.maxQuestCount = maxQuestCount;
  if (rating !== undefined) updateData.rating = rating;

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", "id", id);
  }

  const updatedProperty = await prisma.property.update({
    where: { id: id },
    data: updateData,
    include: {
      amenities: true,
    },
  });

  return updatedProperty;
};
export default updateProperties;

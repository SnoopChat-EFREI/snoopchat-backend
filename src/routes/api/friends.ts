import { Router } from "express";
import { generateAccessToken } from "../../middlewares/auth";

const api = Router();

api.get("/", async ({ prisma }, response) => {
  try {
    const friends = await prisma.friend.findMany({
      include: {
        user: true,
      },
    });

    response.status(200).json({
      data: { friends },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.get("/:id", async ({ prisma, params }, response) => {
  try {
    const friend = await prisma.friend.findUnique({
      where: { id: Number(params.id) },
      include: {
        user: true,
      },
    });
    if (!friend) {
      return response.status(400).json({
        error: `Unknown resource`,
      });
    }

    response.status(200).json({
      data: { friend },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.delete("/:id", async ({ prisma, params }, response) => {
  try {
    const friend = await prisma.friend.findUnique({
      where: { id: Number(params.id) },
    });

    if (!friend) {
      return response.status(400).json({
        error: `Unknown friend with ID: ${params.id}`,
      });
    }

    await prisma.friend.delete({ where: { id: Number(params.id) } });

    response.status(204).end();
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.post("/", async ({ prisma, body }, response) => {
  // Checking mandatory fields
  const missingFields = Object.keys(body).filter(
    (field) => !["user"].includes(field)
  );

  if (missingFields.length > 0) {
    return response.status(400).json({
      error: `Missing fields: ${missingFields.join()}`,
    });
  }

  try {
    const { user } = body;

    const friend = await prisma.friend.create({
      data: {
        user: {
          connect: user,
        },
      },
    });

    response.status(200).json({
      data: { friend },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.put("/:id", async ({ prisma, params, body }, response) => {
  const friend = await prisma.friend.findUnique({
    where: { id: Number(params.id) },
  });

  if (!friend) {
    return response.status(400).json({
      error: `Unknown friend with ID: ${params.id}`,
    });
  }

  try {
    const { user } = body;

    const friend = await prisma.friend.update({
      where: { id: Number(params.id) },
      data: {
        user: {
          connect: user,
        },
      },
    });

    response.status(201).json({
      data: { friend },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.get("/addfriend/:pseudo", async ({ prisma, params, user }, response) => {
  try {    
    const client = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        friendId: true,
      },
    });

    const friend = await prisma.user.findUnique({
      where: {
        pseudo: params.pseudo,
      },
      select: {
        id: true,
        friendId: true,
      },
    });

    
    //:: ---------- friends relations updating
    await prisma.friend.update({
      where: { id: client.friendId },
      data: {
        user: {
          connect: {
              id: friend.id
          },
        },
      },
    });

    await prisma.friend.update({
      where: { id: friend.friendId },
      data: {
        user: {
          connect: {
              id: user.id
          },
        },
      },
    });

    const friendTest = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        friend: {
          include: {
            user: true
          },
        },
      },
    });
    console.log("friendTest----------->", friendTest);
  
    response.status(201).end();

  } catch (error) {
    console.log(error);
    
    response.status(400).json({
      error: error.message,
    });
  }
  
});

export default api;

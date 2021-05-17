import { Router } from "express";

const api = Router();

// Get One chat by ID :: [GET] > /api/chats/:id
api.get("/:id", async ({ prisma, params }, response) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: Number(params.id) },
    });
    if (!chat) {
      return response.status(400).json({
        error: `Unknown resource with id:${params.id}`,
      });
    }

    response.status(200).json({
      data: { chat },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Create One chat :: [POST] > /api/chats
api.post("/", async ({ prisma, body }, response) => {
  try {
    const { members } = body;

    const chat = await prisma.chat.create({
      data: {
        user: {
          connect: members,
        },
      },
    });

    response.status(200).json({
      data: { chat },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

export default api;

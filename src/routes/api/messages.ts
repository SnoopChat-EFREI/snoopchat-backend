import { Router } from "express";

const api = Router();

api.get("/", async ({ prisma }, response) => {
  try {
    const messages = await prisma.message.findMany();

    response.status(200).json({
      data: { messages },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.get("/:id", async ({ prisma, params }, response) => {
  try {
    const message = await prisma.message.findMany({
      where: {
        chatId: Number(params.id),
      },
      include: {
        user: true,
      },
    });

    response.status(200).json({
      data: { message },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Create One File :: [POST] > /api/files
api.post('/', async (req, response) => {
    // Checking mandatory fields
    const missingFields = Object.keys(req.body).filter(
      field =>
        ![
          'body',
          'chatId',
        ].includes(field),
    )
  
    if (missingFields.length > 0) {
      return response.status(400).json({
        error: `Missing fields: ${missingFields.join()}`,
      })
    }
  
    try {
      const { body,  chatId } = req.body
  
      const message = await req.prisma.message.create({
        data: { body, userId: req.user.id, isRead: true, chatId },
      })
  
      response.status(200).json({
        data: { message },
      })
    } catch (error) {
      response.status(400).json({
        error: error.message,
      })
    }
  })

export default api;

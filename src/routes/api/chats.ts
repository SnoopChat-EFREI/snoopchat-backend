import { Router } from "express";

const api = Router();

api.get("/", async ({ prisma }, response) => {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        user: true,
      },
    });

    response.status(200).json({
      data: { chats },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.get("/one/", async ({ prisma, user }, response) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        user: {
          every: { id: user.id },
        },
      },
      include: {
        user: true,
      },
    });
    console.log("CHAT",chats);
    
    response.status(200).json({
      data: { chats },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// api.get("/users/", async ({ prisma, query }, response) => {
//   try {
//     const chats = await prisma.chat.findMany({
//       where: {
//         user: {
//           every: { id: { in: ["SALUT", "SALUT"] } },
//         },
//       },
//       include: {
//         user: true,
//       },
//     });

//     response.status(200).json({
//       data: { chats },
//     });
//   } catch (error) {
//     response.status(400).json({
//       error: error.message,
//     });
//   }
// });

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
api.post("/", async ({ prisma, body, user }, response) => {
  try {
    const members = [{ id: body.members }, { id: user.id }];
    console.log(members);
    

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

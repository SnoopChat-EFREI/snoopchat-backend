import { Router } from "express";
import { generateAccessToken } from "../../middlewares/auth";

const api = Router();

// Get All Users :: [GET] > /api/users
api.get("/", async ({ prisma }, response) => {
  try {
    const users = await prisma.user.findMany();

    response.status(200).json({
      data: { users },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Get One user by ID :: [GET] > /api/users/:id
api.get("/:id", async ({ prisma, params }, response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    if (!user) {
      return response.status(400).json({
        error: `Unknown resource with id:${params.id}`,
      });
    }

    response.status(200).json({
      data: { user },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Delete One user by ID :: [DELETE] > /api/users/:id
api.delete("/:id", async ({ prisma, params }, response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return response.status(400).json({
        error: `Unknown user with ID: ${params.id}`,
      });
    }

    await prisma.user.delete({ where: { id: params.id } });

    response.status(204).end();
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Update One user :: [PUT] > /api/users/:id
api.put("/:id", async ({ prisma, params, body }, response) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return response.status(400).json({
      error: `Unknown user with ID: ${params.id}`,
    });
  }

  try {
    const {
      eMail,
      firstName,
      lastName,
      pseudo,
      password,
      picture,
      geolocalisationId,
    } = body;

    const updateduser = await prisma.user.update({
      where: { id: user.id },
      data: {
        eMail: eMail || user.eMail,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        pseudo: pseudo || user.pseudo,
        password: password || user.password,
        picture: picture || user.picture,
        geolocalisationId: geolocalisationId || user.geolocalisationId,
      },
    });

    response.status(201).json({
      data: { user: updateduser },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

api.get("/me/chats", async (req, response) => {
  try {
    const { chat } = await req.prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        chat: true,
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

//POST:: add friend
api.post("/add/friend", async ({ prisma, user, body }, res) => {
  try {
    if (!body.pseudos) {
      return res.status(400).end();
    }
    await prisma.friend.create({
      data: {
        user: { connect: body.pseudos },
        isAccepted: true,
      },
    });
  } catch (error) {}
});

api.get("/validate-token", (_, res) => {
  res.status(201);
});

export default api;

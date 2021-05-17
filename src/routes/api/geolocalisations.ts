import { Router } from "express";

const api = Router();

// Get One geolocalisation by ID :: [GET] > /api/geolocalisations/:id
api.get("/", async ({ prisma, user }, response) => {
  try {
    const geolocalisation = await prisma.geolocalisation.findUnique({
      where: { id: user.locId },
    });
    if (!geolocalisation) {
      return response.status(400).json({
        error: `Unknown resource`,
      });
    }

    const { coordonate } = geolocalisation;
    response.status(200).json({
      data: { coordonate },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Update One geolocalisation :: [PUT] > /api/geolocalisations/:id
api.put("/", async ({ prisma, user, body }, response) => {
  console.log(body);

  const geolocalisation = await prisma.geolocalisation.findUnique({
    where: { id: user.locId },
  });

  if (!geolocalisation) {
    return response.status(400).json({
      error: `Unknown geolocalisation with this ID`,
    });
  }

  try {
    const { coordonate } = body;

    const updatedGeolocalisation = await prisma.geolocalisation.update({
      where: { id: geolocalisation.id },
      data: {
        coordonate: coordonate || geolocalisation.coordonate,
        display: true,
      },
    });

    response.status(201).json({
      data: { geolocalisation: updatedGeolocalisation },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

export default api;

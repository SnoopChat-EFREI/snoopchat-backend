import { Router } from "express";

const api = Router();

// Get All geolocalisations :: [GET] > /api/geolocalisations
api.get("/", async ({ prisma }, response) => {
  try {
    const geolocalisations = await prisma.geolocalisation.findMany();

    response.status(200).json({
      data: { geolocalisations },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Get One geolocalisation by ID :: [GET] > /api/geolocalisations/:id
api.get("/:id", async ({ prisma, params }, response) => {
  try {
    const geolocalisation = await prisma.geolocalisation.findUnique({
      where: { id: Number(params.id) },
    });
    if (!geolocalisation) {
      return response.status(400).json({
        error: `Unknown resource with id:${params.id}`,
      });
    }

    response.status(200).json({
      data: { geolocalisation },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Delete One geolocalisation by ID :: [DELETE] > /api/geolocalisations/:id
api.delete("/:id", async ({ prisma, params }, response) => {
  try {
    const geolocalisation = await prisma.geolocalisation.findUnique({
      where: { id: Number(params.id) },
    });

    if (!geolocalisation) {
      return response.status(400).json({
        error: `Unknown geolocalisation with ID: ${params.id}`,
      });
    }

    await prisma.geolocalisation.delete({ where: { id: Number(params.id) } });

    response.status(204).end();
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Create One geolocalisation :: [POST] > /api/geolocalisations
api.post("/", async ({ prisma, body }, response) => {
  // Checking mandatory fields
  const missingFields = Object.keys(body).filter(
    (field) => !["coordonate", "display"].includes(field)
  );

  if (missingFields.length > 0) {
    return response.status(400).json({
      error: `Missing fields: ${missingFields.join()}`,
    });
  }

  try {
    const { coordonate, display } = body;

    const geolocalisation = await prisma.geolocalisation.create({
      data: {
        coordonate,
        display,
      },
    });

    response.status(200).json({
      data: { geolocalisation },
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

// Update One geolocalisation :: [PUT] > /api/geolocalisations/:id
api.put("/:id", async ({ prisma, params, body }, response) => {
  const geolocalisation = await prisma.geolocalisation.findUnique({
    where: { id: Number(params.id) },
  });

  if (!geolocalisation) {
    return response.status(400).json({
      error: `Unknown geolocalisation with ID: ${params.id}`,
    });
  }

  try {
    const { coordonate, display } = body;

    const updatedGeolocalisation = await prisma.geolocalisation.update({
      where: { id: geolocalisation.id },
      data: {
        coordonate: coordonate || geolocalisation.coordonate,
        display: display || geolocalisation.display,
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

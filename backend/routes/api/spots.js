const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { Spot, Image, Review } = db;
const router = express.Router();
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { response } = require("express");

//validation for spot creation
const validateSpot = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your new spot."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your new spot."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city name. "),
  handleValidationErrors,
];

//spot not found
const spotNotFound = () => {
  return new Error('Spot does not exist')
}

//get all spots
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const spots = await Spot.findAll({
      include: Image,
      order: [["createdAt", "DESC"]],
    });

    return res?.json(spots);
  })
);
//get one spot
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, { include: [Image, Review] });
    console.log(spot);
    return res.json({ spot });
  })
);

//create spot
router.post(
  "/",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res) => {
    const { name, userId, address, city, state, country, lng, lat, price, url } =
      req.body;
    const spot = await Spot.create({
      name,
      userId,
      address,
      city,
      state,
      country,
      lng,
      lat,
      price,
    });

    const image = await Image.create({ spotId: spot.id, url });

    return res.json({
      spot,
      image,
    });
  })
);

//edit spot
router.put(
  "/:id(\\d+)",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res, next) => {
    const spotId = req.params.id;
    const userId = req.user.id;

    const { name, address, city, state, country, price, url } = req.body;

    const spot = await Spot.findByPk(spotId);
    const image = await Image.findOne({
      where: {
        spotId: {
          [Op.eq]: spot.id,
        },
      },
    });
    if (spot && spot.userId === userId) {
      spot.name = req.body.name || spot.name;
      spot.address = req.body.address || spot.address;
      spot.city = req.body.city || spot.city;
      spot.state = req.body.state || spot.state;
      spot.country = req.body.country || state.country;
      spot.price = req.body.price || spot.price;
      image.url = req.body.url || image.url;
      await spot.save();
    }

    if (image && image.spotId === spot.id) {
      image.url = url;
      await image.save();
    }
    return res.json({ spot, image});
  })
);

//delete spot
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.id;

    const spot = await Spot.findByPk(spotId);
    if (spot && spot.userId === userId) {
      await spot.destroy();
      return res.json({ message: `Spot ${spotId} deleted.` });
    } else {
      const error = spotNotFound();
      next(error);
    }
  })
);

module.exports = router;

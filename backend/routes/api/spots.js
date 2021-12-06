const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Spot, Image} = require('../../db/models');
const {requireAuth} = require("../../utils/auth");

//get all spots
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const spots = await Spot.findAll({
      include: Image,
      order: [["createdAt", "DESC"]],
    });

    return res.json(spots);
  })
);
//get one spot
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, { include: Image });
    console.log(spot);
    return res.json({ spot });
  })
);
//delete spot
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.id;

    const spot = await Spot.findByPk(spotId);

    if(spot && spot.userId===userId) {
      await spot.destroy();
      return res.json({message: `Spot ${spotId} deleted.`})
    }else {
      next(error);
    }
  })
)

module.exports = router;

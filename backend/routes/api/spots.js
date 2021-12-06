const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Spot, Image} = require('../../db/models');

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
module.exports = router;

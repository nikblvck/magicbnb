const express = require('express');
const asyncHandler = require("express-async-handler");
const router = express.Router();
const db = require("../../db/models")
const {Review} = db
const { check } = require("express-validator");
const {requireAuth} = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');
const { user } = require('pg/lib/defaults');


const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a review for this spot."),
  handleValidationErrors,
];



//create a new review
router.post('/',
requireAuth,
validateReview,
asyncHandler(async(req, res) => {
  const userId = req.user.id;
  const { spotId } = req.body;
  const review = await Review.create({
    userId,
    spotId,
    review
  });
  return res.json({review})
}));

//edit existing review
router.put(
  "/:id(\\d+)",
  requireAuth,
  validateReview,
  asyncHandler(async(req, res, next) => {
    const reviewId = req.params.id
    const userId = req.user.id
    const {spotId, review} = req.body;

    const editedReview = await Review.findByPk(reviwId)
    if(review.userId === userId) {
      review.review = review;
      await review.save();
      return res.json({editedReview})
    }
  })
)



module.exports = router

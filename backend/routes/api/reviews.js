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
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a review for this spot."),
  handleValidationErrors,
];


//review not found
const reviewNotFound = () => {
  return new Error('Review does not exist')
}
//create a new review
router.post('/',
requireAuth,
validateReview,
asyncHandler(async(req, res) => {
  const userId = req.user.id;
  const { content, spotId } = req.body;
  const review = await Review.create({
    userId,
    spotId,
    content
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
    const {spotId, content} = req.body;

    const editedReview = await Review.findByPk(reviewId)
    if(review.userId === userId) {
      review.content = content;
      await review.save();
      return res.json({editedReview})
    }
  })
)

//delete review
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async(req, res, next)=> {
    const userId = req.user.id;
    const reviewId = req.params.id;

    const review = await Review.findByPk(reviewId);
    if (review && review.userId === userId) {
      await review.destroy();
      return res.json({
        message: `Review ${reviewId} deleted.`
      })
    } else {
      const error = reviewNotFound();
      next(error)
    }
  })

)



module.exports = router

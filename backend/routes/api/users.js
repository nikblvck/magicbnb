const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name"),
  check("houseAllegiance")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your House Allegiance. Rep your set!"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];


// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const { firstName, lastName, houseAllegiance, email, password, username } =
      req.body;
    const user = await User.signup({
      firstName,
      lastName,
      houseAllegiance,
      email,
      username,
      password,
    });
=======
    const { firstName, lastName, houseAllegiance, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, houseAllegiance, email, username, password });
>>>>>>> database

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);


module.exports = router;

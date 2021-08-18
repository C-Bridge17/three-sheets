const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, User, Drink } = require('../../db/models')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { userId, drinkId, comment } = req.body
  await Checkin.create({
    userId,
    drinkId,
    comment
  });
  return res.redirect(`${req.baseUrl}`);
}))



module.exports = router;

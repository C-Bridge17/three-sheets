const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, User, Drink } = require('../../db/models')

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  await Checkin.create(req.body);
  return res.redirect(`/`);
}))



module.exports = router;

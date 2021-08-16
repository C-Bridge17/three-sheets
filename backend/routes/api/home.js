const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, User, Drink } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const checkin = await Checkin.findAll({
    include: User,
    order: [["createdAt"]]
  })
  console.log(checkin)
}))


module.exports = router;

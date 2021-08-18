const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, User, Drink } = require('../../db/models')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { userId, drinkId, comment } = req.body
  const checkin = await Checkin.create(req.body);
  const found = await Checkin.findByPk(checkin.id, { include: [{ all: true, nested: true }] })
  return res.json(found)
}))



module.exports = router;

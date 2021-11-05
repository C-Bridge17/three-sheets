const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin } = require('../../db/models')


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const checkin = await Checkin.create(req.body);
  const found = await Checkin.findByPk(checkin.id, { include: [{ all: true, nested: true }] })
  return res.json(found)
}))

router.delete(`/:id(\\d+)`, asyncHandler(async (req, res) => {
  console.log(req.params.id)
  let checkin = await Checkin.findByPk(req.params.id)
  let deleted = await checkin.destroy()
  return res.json(deleted)
}))

router.put(`/:id(\\d+)`, asyncHandler(async (req, res) => {

  const checkin = await Checkin.findByPk(req.params.id)
  const update = await checkin.update(req.body)
  const found = await Checkin.findByPk(checkin.id, { include: [{ all: true, nested: true }] })
  return res.json(found)
}))

module.exports = router;

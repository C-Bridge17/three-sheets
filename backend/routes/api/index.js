const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { Checkin, User, Drink, Store, Tag } = require('../../db/models')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const checkinRouter = require('./checkin.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/checkin', checkinRouter)



router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    },
  })
  setTokenCookie(res, user);
  return res.json({ user });
}));

router.get('/', asyncHandler(async (req, res) => {
  const checkin = await Checkin.findAll({
    include: [{ all: true, nested: true }],
    order: [["id", 'desc']]
  })
  return res.json(checkin)
}))

router.get('/store', asyncHandler(async (req, res) => {
  const store = await Store.findAll()
  return res.json(store)
}))
router.get('/tags', asyncHandler(async (req, res) => {
  const tag = await Tag.findAll()
  return res.json(tag)
}))


router.get('/drinks', asyncHandler(async (req, res) => {
  const drinks = await Drink.findAll({
    include: Store
  })
  return res.json(drinks)
}))

router.post('/drinks', asyncHandler(async (req, res) => {
  const drink = await Drink.create(req.body);
  const found = await Drink.findByPk(drink.id, { include: Store })
  return res.json(found)
}))
router.put(`/drinks/:id(\\d+)`, asyncHandler(async (req, res) => {
  const {
    storeId,
    name,
    imageUrl,
    description,
    tagId
  } = req.body
  const drink = await Drink.findByPk(req.params.id)
  const update = await drink.update({
    storeId,
    name,
    description,
    tagId
  })
  const found = await Drink.findByPk(update.id, { include: [{ all: true, nested: true }] })
  return res.json(found)
}))



router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;

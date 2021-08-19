const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { Checkin, User, Drink, Store } = require('../../db/models')
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
    limit: 25,
    include: [{ all: true, nested: true }],
    order: [["id", 'desc']]
  })
  return res.json(checkin)
}))

router.get('/drinks', asyncHandler(async (req, res) => {
  const drinks = await Drink.findAll({
    include: Store
  })
  return res.json(drinks)
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

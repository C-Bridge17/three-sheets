const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { Checkin, User, Drink } = require('../../db/models')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const homeRouter = require('./home.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/home', homeRouter)

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
    order: [["createdAt"]]
  })
  return res.json(checkin)
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

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');
const { urlPattern } = require('../utils/constants');

// обработка роутов на регистрацию, вход и выход
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlPattern),
    }),
  }),
  createUser,
);
router.post('/signout', logout);

module.exports = router; // экспортировали роутер

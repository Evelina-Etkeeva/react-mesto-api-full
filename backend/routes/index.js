const router = require('express').Router();
const checkAuth = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');
const auth = require('./auth');
const NotFoundError = require('../errors/NotFoundErr');

// проверка сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// теперь обработка роутов
router.use('/', auth);
router.use(checkAuth);
router.use('/', users);
router.use('/', cards);
router.use((req, res, next) => {
  next(new NotFoundError('Указанный путь не найден'));
});

module.exports = router; // экспортировали роутер

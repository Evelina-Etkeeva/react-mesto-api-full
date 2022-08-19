require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const handleErrors = require('./middlewares/errs');
const router = require('./routes');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

// разрешаем кросс-доменные запросы
app.use(cors);
// подключаем логгер запросов
app.use(requestLogger);
// защищаемся от атак
app.use(limiter);
app.use(helmet());
// для обработки JSON-запросов
app.use(bodyParser.json());
// для обработки кук
app.use(cookieParser());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});
// обрабатываем все роуты
app.use(router);
// логгер ошибок
app.use(errorLogger);
// обработка ошибок celebrate
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

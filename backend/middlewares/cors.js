const cors = require("cors");

const allowedCors = [
  "https://myproject.nomoredomains.sbs",
  "http://myproject.nomoredomains.sbs",
  "localhost:3000",
];

const corsOptions = {
  origin: allowedCors,
  credentials: true,
};

module.exports = cors(corsOptions);

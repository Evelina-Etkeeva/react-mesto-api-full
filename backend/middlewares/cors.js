const cors = require("cors");

const allowedCors = [
  "https://myproject.nomoredomains.sbs",
  "http://myproject.nomoredomains.sbs",
  "http://localhost:3001",
];

const corsOptions = {
  origin: allowedCors,
  credentials: true,
};

module.exports = cors(corsOptions);

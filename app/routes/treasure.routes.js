const router = require("express").Router();

module.exports = app => {
  const treasures = require('../controllers/treasure.controller');

  router.get("/", treasures.findByParam);
  router.get("/near", treasures.findNearest);

  app.use('/api/treasures', router);
};

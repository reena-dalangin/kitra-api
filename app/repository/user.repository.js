const db = require("../models");
const User = db.users;

module.exports = {
  bulkInsert: async function (params) {
    return await User.bulkCreate(params);
  }
};

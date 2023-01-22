const db = require("../models");
const MoneyValue = db.money_values;

module.exports = {
  bulkInsert: async function (params) {
    return await MoneyValue.bulkCreate(params);
  }
};

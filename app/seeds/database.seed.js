const TreasureSeeder = require("./treasure.seed");
const MoneyValueSeeder = require("./money_value.seed");
const UserSeeder = require("./user.seed");

module.exports = {
  run: () => {
    UserSeeder.seed();
    TreasureSeeder.seed()
    .then(data => {
      MoneyValueSeeder.seed();
    });    
  }
};

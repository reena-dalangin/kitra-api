const db = require('../app/models');
const seeder = require('../app/seeds/database.seed');

module.exports = {
  reset: async () => {
    await db.sequelize.sync({ force:true })
    .then(() => {
      console.log("Database reset.");
    });

    seeder.run();
  }
};

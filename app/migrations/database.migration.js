const db = require("../models");

module.exports = {
  up: () => {
    db.sequelize.sync()
      .then(() => {
        console.log("Database synced.");
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
  },

  reset: () => {
    db.sequelize.sync({ force:true })
    .then(() => {
      console.log("Database reset.");
    })
    .catch((err) => {
      console.log("Failed to sync database: " + err.message);
    });
    // const queryInterface = db.sequelize.getQueryInterface();

    // queryInterface.dropTable('users');
    // queryInterface.removeConstraint('money_values', 'money_values_ibfk_1');

    // queryInterface.dropTable('treasures')
    //   .then(() => {
    //     queryInterface.dropTable('money_values');
    //   })
    //   .catch((err) => {
    //     console.log("Failed to drop db: " + err.message);
    //   });
  }
};

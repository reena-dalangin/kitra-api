module.exports = (sequelize, Sequelize) => {
  return sequelize.define('treasure', {
    latitude: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });
};

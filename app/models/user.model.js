module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });
};

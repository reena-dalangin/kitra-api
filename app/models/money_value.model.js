module.exports = (sequelize, Sequelize) => {
  const MoneyValue = sequelize.define('money_value', {
    treasure_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'treasures',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    amt: {
      type: Sequelize.INTEGER
    }
  });

  return MoneyValue;
};

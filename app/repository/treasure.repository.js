const db = require('../models');
const sequelize = db.sequelize;
const Treasure = db.treasures;
const { QueryTypes } = require('sequelize');

module.exports = {
  bulkInsert: async function (params) {
    return await Treasure.bulkCreate(params);
  },

  findByDistance: async function (latitude, longitude, distance) {
    return await sequelize.query(`
      SELECT 
        t.*,
        JSON_ARRAYAGG(mv.amt) AS prize_value,
        (6371 * acos( 
          cos( radians(t.latitude) ) 
          * cos( radians( ${latitude} ) ) 
          * cos( radians( ${longitude} ) - radians(t.longitude) ) 
          + sin( radians(t.latitude) ) 
          * sin( radians( ${latitude} ) )
        ) ) as distance 
      FROM treasures t
      JOIN money_values mv ON t.id = mv.treasure_id
      GROUP BY t.id
      HAVING distance <= ${distance}
      ORDER BY distance asc
    `, { type: QueryTypes.SELECT });
  },

  findByValue: async function (latitude, longitude, distance, priceValue) {
    return await sequelize.query(`
      SELECT 
        t.*,
        mv.amt,
        (6371 * acos( 
          cos( radians(t.latitude) ) 
          * cos( radians( ${latitude} ) ) 
          * cos( radians( ${longitude} ) - radians(t.longitude) ) 
          + sin( radians(t.latitude) ) 
          * sin( radians( ${latitude} ) )
        ) ) as distance
      FROM treasures t
      INNER JOIN
      (
        SELECT treasure_id, MIN(amt) amt
        FROM money_values
        GROUP BY treasure_id
      ) mv
      ON t.id = mv.treasure_id
      WHERE mv.amt >= ${priceValue}
      HAVING distance <= ${distance}
      ORDER BY mv.amt asc
    `, { type: QueryTypes.SELECT });
  },

  findNearest: async function (latitude, longitude) {
    return await sequelize.query(`
      SELECT 
      t.*,
      JSON_ARRAYAGG(mv.amt) AS prize_value,
      (6371 * acos( 
        cos( radians(t.latitude) ) 
        * cos( radians( ${latitude} ) ) 
        * cos( radians( ${longitude} ) - radians(t.longitude) ) 
        + sin( radians(t.latitude) ) 
        * sin( radians( ${latitude} ) )
      ) ) as distance
      FROM treasures t
      JOIN money_values mv ON t.id = mv.treasure_id
      GROUP BY t.id
      ORDER BY distance ASC LIMIT 1
    `, { type: QueryTypes.SELECT });
  }
};

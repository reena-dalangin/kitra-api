const Helper = require('./utils');
const MoneyValueRepository = require('../app/repository/money_value.repository');
const UserRepository = require('../app/repository/user.repository');
const TreasureRepository = require('../app/repository/treasure.repository');

describe('Repository Test', () => {
  beforeAll(async () => {
    await Helper.reset();
  });

  describe('User Repository Test', () => {
    test('bulkInsert: it return users when successfully created', async () => {
      const result = await UserRepository.bulkInsert([
        {
          name: 'Reena',
          age: 26,
          password: 234234,
          email: 'u2@kitra.abc'
        }, {
          name: 'Reena',
          age: 25,
          password: 234234,
          email: 'u3@kitra.abc'
        }
      ]);
  
      expect(result).not.toBe(null);
      expect(result.length).toBe(2);
    });
  });

  describe('Treasure Repository Test', () => {
    test('bulkInsert: it return treasures when successfully created', async () => {
      const result = await TreasureRepository.bulkInsert([
        {
          latitude: 14.49111434,
          longitude: 121.0437482,
          name: 'treasure1'
        }
      ]);
  
      expect(result).not.toBe(null);
      expect(result.length).toBe(1);
    });

    test('findByDistance: it return treasures when fetching by distance within range', async () => {
      const result = await TreasureRepository.findByDistance(14.49111434, 121.0437482, 1);

      expect(result).not.toBe(null);
      expect(result.length).toBe(1);
    });

    test('findByValue: it return treasures when fetching by price value wiithin range', async () => {
      const result = await TreasureRepository.findByValue(14.49111434, 121.0437482, 1, 10);
  
      expect(result).not.toBe(null);
      expect(result.length).toBe(1);
    });


    test('findNearest: it return the nearest treasure', async () => {
      const result = await TreasureRepository.findNearest(14.49111434, 121.0437482);

      expect(result).not.toBe(null);
      expect(result.length).toBe(1);
    });
  });

  describe('Money Value Repository Test', () => {
    test('bulkInsert: it return money values when successfully created', async () => {
      const treasure = await TreasureRepository.bulkInsert([
        {
          latitude: 14.49111434,
          longitude: 121.0437482,
          name: 'treasure1'
        }
      ]);

      const result = await MoneyValueRepository.bulkInsert([
        {
          treasure_id: treasure[0].dataValues.id,
          amt: 50
        }
      ]);
  
      expect(result).not.toBe(null);
      expect(result.length).toBe(1);
    });
  });
});

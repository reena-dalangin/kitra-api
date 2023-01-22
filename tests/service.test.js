const Helper = require('./utils');
const TreasureService = require('../app/services/treasure.service');

describe('Service Test', () => {
  beforeAll(async () => {
    await Helper.reset();
  });

  describe('findByParam(): Treasure Service Test', () => {

    test('findByParam(): it returns all treasure by distance within 1 km', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 121.0437482,
        distance: 1
      });

      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findByParam(): it returns all treasure by distance within 10 km', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 121.0437482,
        distance: 10
      });

      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findByParam(): it returns all treasure by distance within 10 km but empty', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 131.0437482,
        distance: 10
      });

      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
      expect(result.data.attributes).toEqual([]);
    });

    test('findByParam(): it throws an error when fetching all treasure by distance beyond 10 km', async () => {
      try {
        const result = await TreasureService.findByParam({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 11
        });        
      } catch (error) {
        expect(error).not.toBe(null);
        expect(typeof error).toBe('object');
        expect(error).toHaveProperty('message', 'Invalid distance: Value should be 1 or 10');
        expect(error).toHaveProperty('status', 422);
      }
    });

    test('findByParam(): it throws an error when fetching all treasure by distance but some parameters are missing', async () => {
      try {
        const result = await TreasureService.findByParam({
          longitude: 121.0437482,
          distance: 11
        });
      } catch (error) {
        expect(error).not.toBe(null);
        expect(typeof error).toBe('object');
        expect(error).toHaveProperty('message', 'Missing parameters. The following fields are required: distance, latitude, longitude');
        expect(error).toHaveProperty('status', 422);
      }
    });

    test('findByParam(): it returns all treasures by price value of $10', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 121.0437482,
        distance: 1,
        prize_value: 10
      });
  
      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findByParam(): it returns all treasures by price value of $20', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 121.0437482,
        distance: 1,
        prize_value: 20
      });
  
      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findByParam(): it returns all treasures by price value of $30', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 121.0437482,
        distance: 1,
        prize_value: 30
      });
  
      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findByParam(): it returns all treasures by price value of $20 but empty', async () => {
      const result = await TreasureService.findByParam({
        latitude: 14.49111434,
        longitude: 131.0437482,
        distance: 10,
        prize_value: 20
      });
  
      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
      expect(result.data.attributes).toEqual([]);
    });

    test('findByParam(): it returns all treasures by price value but beyond $30', async () => {
      try {
        const result = await TreasureService.findByParam({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 30
        });
      } catch (error) {
        expect(error).not.toBe(null);
        expect(typeof error).toBe('object');
        expect(error).toHaveProperty('message', 'Invalid price: Value should be whole numbers between 10 to 30');
        expect(error).toHaveProperty('status', 422);
      }
    });

    test('findByParam(): it returns all treasures by price value but not a whole number', async () => {
      try {
        const result = await TreasureService.findByParam({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 10.2
        });
      } catch (error) {
        expect(error).not.toBe(null);
        expect(typeof error).toBe('object');
        expect(error).toHaveProperty('message', 'Invalid price: Value should be whole numbers between 10 to 30');
        expect(error).toHaveProperty('status', 422);
      }
    });
  });

  describe('findNearest(): Treasure Service Test', () => {
    test('findNearest(): it returns the nearest treasure', async () => {
      const result = await TreasureService.findNearest({
        latitude: 14.49111434,
        longitude: 121.0437482
      });

      expect(result).not.toBe(null);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('type', 'treasures');
      expect(result.data).toHaveProperty('attributes');
    });

    test('findNearest(): it returns the nearest treasure but with missing parameters', async () => {
      try {
        const result = await TreasureService.findNearest({
          latitude: 14.49111434
        });
      } catch (error) {
        expect(error).not.toBe(null);
        expect(typeof error).toBe('object');
        expect(error).toHaveProperty('message', 'Missing parameters. The following fields are required: latitude, longitude');
        expect(error).toHaveProperty('status', 422);
      }
    });
  });
});

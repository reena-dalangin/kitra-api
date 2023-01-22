const app = require('../server');
const Helper = require('./utils');
const HttpStatus = require('http-status');
const request = require('supertest');

describe('Treasures API', () => {
  beforeAll(async () => {
    await Helper.reset();
  });

  describe('findByParam(): Treasures API Test', () => {
    test('findByParam(): it should return 200: OK response when finding all treasures by distance within 1 km', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by distance within 10 km', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 10
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by distance within 1 km but empty', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 131.0437482,
          distance: 1
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('type', 'treasures');
      expect(res.body.data).toHaveProperty('attributes');
      expect(res.body.data.attributes).toEqual([]);
    });
  
    test('findByParam(): it should return 422: UNPROCESSABILITY_ENTITY error when finding all treasures by distance but beyond 10 km', async () => {
      try {
        const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 20
        });
      } catch (error) {
        expect(error).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error).toHaveProperty('body');
        expect(error.body).toHaveProperty('code', 'UNPROCESSABLE_ENTITY');
        expect(error.body).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error.body).toHaveProperty('error');
        expect(error.body.error).toHaveProperty('title', HttpStatus[error.status]);
        expect(error.body.error).toHaveProperty('detail', 'Invalid distance: Value should be 1 or 10');
      }
    });
  
    test('findByParam(): it should return 422: UNPROCESSABILITY_ENTITY error when finding all treasures by distance but with missing parameters', async () => {
      try {
        const res = await request(app).get('/api/treasures')
        .query({
          longitude: 121.0437482,
          distance: 20
        });
      } catch (error) {
        expect(error).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error).toHaveProperty('body');
        expect(error.body).toHaveProperty('code', 'UNPROCESSABLE_ENTITY');
        expect(error.body).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error.body).toHaveProperty('error');
        expect(error.body.error).toHaveProperty('title', HttpStatus[error.status]);
        expect(error.body.error).toHaveProperty('detail', 'Invalid distance: Value should be 1 or 10');
      }
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by price value of $10', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 10
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by price value of $20', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 20
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by price value of $30', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 30
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });
  
    test('findByParam(): it should return 200: OK response when finding all treasures by price value of $20 but empty', async () => {
      const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 10,
          prize_value: 20
        });
  
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
      expect(res.body.data.attributes).toEqual([])
    });
  
    test('findByParam(): it should return 422: UNPROCESSABILITY_ENTITY error when finding all treasures by price value but beyond $30', async () => {
      try {
        const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 33
        });
      } catch (error) {
        expect(error).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error).toHaveProperty('body');
        expect(error.body).toHaveProperty('code', 'UNPROCESSABLE_ENTITY');
        expect(error.body).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error.body).toHaveProperty('error');
        expect(error.body.error).toHaveProperty('title', HttpStatus[error.status]);
        expect(error.body.error).toHaveProperty('detail', 'Invalid price: Value should be whole numbers between 10 to 30');
      }
    });
  
    test('findByParam(): it should return 422: UNPROCESSABILITY_ENTITY error when finding all treasures by price value but not a whole number', async () => {
      try {
        const res = await request(app).get('/api/treasures')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482,
          distance: 1,
          prize_value: 20.3
        });
      } catch (error) {
        expect(error).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error).toHaveProperty('body');
        expect(error.body).toHaveProperty('code', 'UNPROCESSABLE_ENTITY');
        expect(error.body).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error.body).toHaveProperty('error');
        expect(error.body.error).toHaveProperty('title', HttpStatus[error.status]);
        expect(error.body.error).toHaveProperty('detail', 'Invalid price: Value should be whole numbers between 10 to 30');
      }
    });
  });

  describe('findNearest(): Treasures API Test', () => {
    test('findNearest(): it should return 200: OK response when finding one treasure nearest you', async () => {
      const res = await request(app).get('/api/treasures/near')
        .query({
          latitude: 14.49111434,
          longitude: 121.0437482
        });

      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(res.body).toHaveProperty('data')
      expect(res.body.data).toHaveProperty('type', 'treasures')
      expect(res.body.data).toHaveProperty('attributes')
    });

    test('findNearest(): it should return 422: UNPROCESSABILITY_ENTITY error when finding nearest treasure but with missing parameters', async () => {
      try {
        const res = await request(app).get('/api/treasures/near')
        .query({
          data: {
            attributes: {
              latitude: 14.49111434
            }
          }
        });
      } catch (error) {
        expect(error).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error).toHaveProperty('body');
        expect(error.body).toHaveProperty('code', 'UNPROCESSABLE_ENTITY');
        expect(error.body).toHaveProperty('status', HttpStatus.UNPROCESSABLE_ENTITY);
        expect(error.body).toHaveProperty('error');
        expect(error.body.error).toHaveProperty('title', HttpStatus[error.status]);
        expect(error.body.error).toHaveProperty('detail', 'Missing parameters. The following fields are required: latitude, longitude');
      }
    });
  });
});

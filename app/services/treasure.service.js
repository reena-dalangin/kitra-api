const HttpStatus = require('http-status');
const ServiceResponse = require('../responses/service.response');
const TreasureRepository = require('../repository/treasure.repository');

module.exports = {
  findByParam: async function (payload) {
    await _validate(payload);

    let treasures = await TreasureRepository.findByDistance(payload.latitude, payload.longitude, payload.distance);
    
    if (payload.prize_value) {
      treasures = await TreasureRepository.findByValue(payload.latitude, payload.longitude, payload.distance, payload.prize_value);
    }

    return ServiceResponse.transform('treasures', treasures);
  },

  findNearest: async function (payload) {
    if (payload.latitude && payload.longitude) {
      let treasure = await TreasureRepository.findNearest(payload.latitude, payload.longitude);
      return ServiceResponse.transform('treasures', treasure);
    }

    throw {
      message: 'Missing parameters. The following fields are required: latitude, longitude',
      status: HttpStatus.UNPROCESSABLE_ENTITY
    };
  }
};

const _validate = function (payload) {
  if (payload.prize_value) {
    _validatePriceValue(Number(payload.prize_value));
  }

  if (payload.distance && payload.latitude && payload.longitude) {
    _validateDistance(Number(payload.distance));
    return payload;
  }

  throw {
    message: 'Missing parameters. The following fields are required: distance, latitude, longitude',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  };
};

const _validateDistance = function (distance) {
  if (distance === 1 || distance === 10) {
    return distance;
  }

  throw {
    message: 'Invalid distance: Value should be 1 or 10',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  };
};

const _validatePriceValue = function (priceValue) {
  if (priceValue >= 10 && priceValue <= 30  && (priceValue % 1) === 0) {
    return priceValue;
  }

  throw {
    message: 'Invalid price: Value should be whole numbers between 10 to 30',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  };
};

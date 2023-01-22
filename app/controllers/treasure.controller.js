const ApiResponse= require('../responses/api.response');
const TreasureService= require('../services/treasure.service');

module.exports = {
  findByParam: async function (req, res) {
    try {
      const treasures = await TreasureService.findByParam(req.query);

      return ApiResponse.success(res, treasures);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  },

  findNearest: async function (req, res) {
    try {
      const treasure = await TreasureService.findNearest(req.query);

      return ApiResponse.success(res, treasure);
    } catch (error) {
      return ApiResponse.error(res, error);
    }
  }
};

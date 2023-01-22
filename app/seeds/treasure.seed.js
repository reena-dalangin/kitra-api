const Helper = require('../seeds/helper.seed');
const TreasureRepository = require('../repository/treasure.repository');

module.exports = {
  seed: async function () {
    const excelData = await Helper.handleExcelData([{
      name: 'treasures',
      header: {
        rows: 2
      },
      columnToKey: {
        '*': '{{columnHeader}}',
        'D': 'longitude',
        'E': 'name'
      }
    }]);

    return TreasureRepository.bulkInsert(excelData.treasures);
  }
};

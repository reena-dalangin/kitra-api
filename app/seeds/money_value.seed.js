const Helper = require('../seeds/helper.seed');
const MoneyValueRepository = require('../repository/money_value.repository');

module.exports = {
  seed: async function () {
    const excelData = await Helper.handleExcelData([{
      name: 'money_values',
      header: {
        rows: 2
      },
      columnToKey: {
        '*': '{{columnHeader}}'
      }
    }]);

    return await MoneyValueRepository.bulkInsert(excelData.money_values);
  }
};

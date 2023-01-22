const UserRepository = require('../repository/user.repository');
const Helper = require('../seeds/helper.seed');

module.exports = {
  seed: async function () {
    const excelData = await Helper.handleExcelData([{
      name: 'users',
      header: {
        rows: 2
      },
      columnToKey: {
        '*': '{{columnHeader}}'
      }
    }]);

    return UserRepository.bulkInsert(excelData.users);
  }
};

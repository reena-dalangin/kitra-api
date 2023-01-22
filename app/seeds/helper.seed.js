const excelToJson = require('convert-excel-to-json');
 
module.exports = {
  handleExcelData: async function (options) {
    return excelToJson({
      sourceFile: __dirname + '/data/Serino-Mini-Project-Data.xlsx',
      sheets: options
    });
  }
};

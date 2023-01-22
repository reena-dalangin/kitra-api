const HttpStatus = require('http-status');

module.exports = {
  success: (res, data) => {
    res.status(HttpStatus.OK).send(data);
  },

  error: (res, data) => {
    res.status(data.status).send({
      status: data.status,
      body: {
        "status": data.status,
        "code": HttpStatus[`${data.status}_NAME`],
        "error": {
          "title": HttpStatus[data.status],
          "detail": data.message
        }
      }
    });
  }
};

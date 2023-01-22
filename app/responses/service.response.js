module.exports = {
  transform: (model, data) => {
    return {
      data: {
        type: model,
        attributes: data
      }
    }
  }
};

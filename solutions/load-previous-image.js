const { LoadPreviousImageUseCase } = require('grav.client');

module.exports = async function (client) {
  var useCase = new LoadPreviousImageUseCase();
  useCase.client = client;
  return {
    previousImageName: await useCase.execute()
  };
}

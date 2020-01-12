const { LoadNextImageUseCase } = require('grav.client');

module.exports = async function (client) {
  var useCase = new LoadNextImageUseCase();
  useCase.client = client;
  return {
    nextImageName: await useCase.execute()
  };
}

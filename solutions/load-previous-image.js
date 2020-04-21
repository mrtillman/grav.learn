const { LoadPreviousImageUseCase } = require('grav.client');

module.exports = async function (client) {
  const useCase = new LoadPreviousImageUseCase();
  useCase.client = client;
  const previousImage = await useCase.execute();
  return {
    previousImageName: previousImage.name
  };
}

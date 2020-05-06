const { LoadPreviousImageUseCase } = require('grav.client');
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const useCase = new LoadPreviousImageUseCase();
  useCase.client = client;
  const previousImage = await useCase.execute();
  return {
    previousImageName: previousImage.name
  };
}

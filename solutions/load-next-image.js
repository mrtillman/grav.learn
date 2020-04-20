const { LoadNextImageUseCase } = require('grav.client');

module.exports = async function (client) {
  const useCase = new LoadNextImageUseCase();
  useCase.client = client;
  const nextImage = await useCase.execute();
  return {
    nextImageName: nextImage.name
  };
}

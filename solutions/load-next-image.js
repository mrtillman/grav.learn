const { 
  GravatarClient, LoadNextImageUseCase
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const useCase = new LoadNextImageUseCase();
  useCase.client = client;
  const nextImage = await useCase.execute();
  return {
    nextImageName: nextImage.name
  };
}

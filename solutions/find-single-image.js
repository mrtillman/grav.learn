const { FindImageUseCase } = require('grav.client');
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const useCase = new FindImageUseCase();
  useCase.client = client;
  useCase.imageName = "bravo";
  return {
    image: await useCase.execute()
  };
}

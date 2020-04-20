const { FindImageUseCase } = require('grav.client');

module.exports = async function (client) {
  const useCase = new FindImageUseCase();
  useCase.client = client;
  useCase.imageName = "bravo";
  return {
    image: await useCase.execute()
  };
}

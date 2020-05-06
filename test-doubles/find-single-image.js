const sinon = require('sinon');
const { ImageRating } = require('grav.client');
const { userImagesResponse } = require('./response-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const userImagesMethod = sinon.stub();
  const response = await userImagesResponse();
  const userImagesProperty = sinon.spy(response, "userImages", ["get"]);

  userImagesMethod.returns(Promise.resolve(response));
  client.userImages = userImagesMethod;

  client.didFindBravoImage = (answer) => (
    answer && 
    client.userImages.called &&
    userImagesProperty.get.called &&
    answer.image.name == "bravo" &&
    answer.image.rating == ImageRating.G &&
    answer.image.url == "https://images.example.com/bravo"
  );
  
  return client;
}

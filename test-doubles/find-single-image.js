const sinon = require('sinon');
const { ImageRating } = require('grav.client');
const { userImagesResult } = require('./result-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const userImagesMethod = sinon.stub();
  const result = await userImagesResult();
  const userImagesProperty = sinon.spy(result.Value, "userImages", ["get"]);

  userImagesMethod.returns(Promise.resolve(result));
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

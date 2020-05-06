const sinon = require('sinon');
const { ImageRating } = require('grav.client');
const { userImagesResponse, userImages } = require('./response-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const userImagesMethod = sinon.stub();
  const response = await userImagesResponse();
  const userImagesProperty = sinon.spy(response, "userImages", ["get"]);

  userImagesMethod.returns(Promise.resolve(response));
  client.userImages = userImagesMethod;

  client.didCountImages = (answer) => (
    answer && 
    client.userImages.called &&
    userImagesProperty.get.called &&
    (answer.numberOfImages == userImages.length)
  );

  client.didCountPgImages = (answer) => (
    answer && 
    answer.numberOfPgRatedImages == userImages.filter(
      image => image.rating == ImageRating.PG
    ).length
  );
  
  return client;
}

const sinon = require('sinon');
const { ImageRating } = require('grav.client');
const { userImagesResult, userImages } = require('./result-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const userImagesMethod = sinon.stub();
  const result = await userImagesResult();
  const userImagesProperty = sinon.spy(result.Value, "userImages", ["get"]);

  userImagesMethod.returns(Promise.resolve(result));
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

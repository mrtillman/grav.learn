const sinon = require('sinon');
const { GravatarClient, ImageRating } = require('grav.client');
const { userImagesResult, userImages } = require('./result-stubs');

module.exports.client = async () => {
  const client = new GravatarClient();
  const userImagesMethod = sinon.stub();
  const result = await userImagesResult();
  const userImagesProperty = sinon.spy(result.Value, "userImages", ["get"]);

  userImagesMethod.returns(Promise.resolve(result));
  client.userImages = userImagesMethod;

  client.didCountImages = (answer) => (
    client.userImages.called &&
    userImagesProperty.get.called &&
    (answer.numberOfImages == userImages.length)
  );

  client.didCountPgImages = (answer) => (
    answer.numberOfPgRatedImages == userImages.filter(
      image => image.rating == ImageRating.PG
    ).length
  );
  
  return client;
}

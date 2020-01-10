const sinon = require('sinon');
const { GravatarClient } = require('grav.client');
const {
  addressesResult,
  userAddresses,
  userImages,
  userImagesResult,
  useUserImageResult  
} = require('./result-stubs');

module.exports.client = async () => {
  const client = new GravatarClient();
  const addressesMethod = sinon.stub();
  const userImagesMethod = sinon.stub();
  const useUserImageMethod = sinon.stub();

  client.email = userAddresses[0].email;

  addressesMethod.returns(addressesResult());
  useUserImageMethod.returns(useUserImageResult());

  const result = await userImagesResult();
  const userImagesProperty = sinon.spy(result.Value, "userImages", ["get"]);
  userImagesMethod.returns(Promise.resolve(result));
  
  client.addresses = addressesMethod;
  client.userImages = userImagesMethod;
  client.useUserImage = useUserImageMethod;

  client.didGetPrimaryImage = () => (
    client.addresses.called
  );
  client.didCollectUserImages = () => (
    client.userImages.called &&
    userImagesProperty.get.called
  );
  client.didSetNextImage = (answer) => (
    client.useUserImage.called
  );

  return client;
};

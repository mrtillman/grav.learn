const sinon = require('sinon');
const {
  addressesResponse,
  userAddresses,
  userImagesResponse,
  useUserImageResponse  
} = require('./response-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const addressesMethod = sinon.stub();
  const userImagesMethod = sinon.stub();
  const useUserImageMethod = sinon.stub();

  client.email = userAddresses[0].email;

  addressesMethod.returns(addressesResponse());
  useUserImageMethod.returns(useUserImageResponse());

  const response = await userImagesResponse();
  const userImagesProperty = sinon.spy(response, "userImages", ["get"]);
  userImagesMethod.returns(Promise.resolve(response));
  
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
    answer && 
    client.useUserImage.called && typeof answer.nextImageName == "string"
  );

  return client;
};

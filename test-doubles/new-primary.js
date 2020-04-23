const sinon = require('sinon');
const { imageName } = require('grav.client/Release/Common/TestDoubles/primitive-stubs');
const { 
  saveImageUrlResult,
  useUserImageResult,
  addressesResult, userAddresses
} = require('./result-stubs');
const { email } = userAddresses[0];
const client = require('./mock-client');
client.email = email;

module.exports.client = async () => {

  const addressesMethod = sinon.stub();
  const saveImageUrlMethod = sinon.stub();
  const useUserImageMethod = sinon.stub();
  
  addressesMethod.returns(addressesResult());
  saveImageUrlMethod.returns(saveImageUrlResult());
  useUserImageMethod.returns(useUserImageResult());

  client.addresses = addressesMethod;
  client.saveImage = saveImageUrlMethod;
  client.saveEncodedImage = saveImageUrlMethod;
  client.saveImageUrl = saveImageUrlMethod;
  client.useUserImage = useUserImageMethod;

  client.didSaveImage = () => (
    client.saveImage.called ||
    client.saveImageUrl.called ||
    client.saveEncodedImage.called
  );

  client.didSetPrimary = () => (
    client.useUserImage.calledWith(imageName)
  );

  client.didGetPrimaryImageUrl = (answer) => (
    addressesMethod.calledAfter(client.useUserImage)
    && answer.primaryImageUrl == userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  );

  return client;
}

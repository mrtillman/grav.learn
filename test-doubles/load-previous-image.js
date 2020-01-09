const sinon = require('sinon');
const { GravatarClient } = require('grav.client');

module.exports.client = async () => {
  const client = new GravatarClient();
  const addressesMethod = sinon.stub();
  const userImagesMethod = sinon.stub();
  const useUserImageMethod = sinon.stub();
  client.addresses = addressesMethod;
  client.userImages = userImagesMethod;
  client.useUserImage = useUserImageMethod;
  client.didGetPrimaryImage = () => true
  client.didY = () => true
  client.didZ = () => true
  client.didW = () => true

  return this.client;
};

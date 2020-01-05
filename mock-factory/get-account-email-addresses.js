const sinon = require('sinon');
const { GravatarClient } = require('grav.client');
const { Result } = require('grav.client/Release/Common/result');
const { addressesResult, userAddresses } = require('./result-stubs');

module.exports.client = async () => {
  const client = new GravatarClient();
  const addressesMethod = sinon.stub();

  addressesMethod.returns(addressesResult());
  client.addresses = addressesMethod;

  client.didCountEmails = (answer) => (
    client.addresses.called &&
    (answer.addressCount == userAddresses.length)
  );
  client.didFindMissingPrimary = (answer) => (
    userAddresses.find(
      address => !address.imageName
    ).email == answer.addressMissingPrimaryImage
  );
  return client;
}

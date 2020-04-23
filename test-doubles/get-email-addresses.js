const sinon = require('sinon');
const { addressesResult, userAddresses } = require('./result-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const addressesMethod = sinon.stub();

  addressesMethod.returns(addressesResult());
  client.addresses = addressesMethod;

  client.didCountEmails = (answer) => (
    answer && 
    client.addresses.called && answer && 
    (answer.addressCount == userAddresses.length)
  );
  client.didFindMissingPrimary = (answer) => (
    answer &&
    userAddresses.find(
      address => !address.imageName
    ).email == answer.addressMissingPrimaryImage
  );
  return client;
}

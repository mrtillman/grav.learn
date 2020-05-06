const sinon = require('sinon');
const { addressesResponse, userAddresses } = require('./response-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const addressesMethod = sinon.stub();

  addressesMethod.returns(addressesResponse());
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

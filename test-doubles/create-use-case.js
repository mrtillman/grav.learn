const sinon = require('sinon');
const { 
  addressesResponse, userAddresses
} = require('./response-stubs');
const client = require('./mock-client');
const address = userAddresses[2];
client.email = address.email;

module.exports.client = async () => {

  const addressesMethod = sinon.stub();
  const response = await addressesResponse();
  const userAddressesProperty = sinon.spy(response, "userAddresses", ["get"]);
  
  addressesMethod.returns(Promise.resolve(response));
  client.addresses = addressesMethod;

  client.didFindUserAddress = (answer) => (
    client.addresses.called && userAddressesProperty.get.called && answer == address
  );

  return client;
}

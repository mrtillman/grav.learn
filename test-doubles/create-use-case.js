const sinon = require('sinon');
const { GravatarClient } = require('grav.client');
const { password } = require('grav.client/Release/Common/TestDoubles/primitive-stubs');
const { 
  addressesResult, userAddresses
} = require('./result-stubs');
const client = require('./mock-client');
const address = userAddresses[2];
client.email = address.email;

module.exports.client = async () => {

  const addressesMethod = sinon.stub();
  const result = await addressesResult();
  const userAddressesProperty = sinon.spy(result.Value, "userAddresses", ["get"]);
  
  addressesMethod.returns(Promise.resolve(result));
  client.addresses = addressesMethod;

  client.didFindUserAddress = (answer) => (
    client.addresses.called && userAddressesProperty.get.called && answer == address
  );

  return client;
}

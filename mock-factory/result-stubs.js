const { Result } = require('grav.client/Release/Common/result');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

const { 
  AddressesMethodResponse, ExistsMethodResponse, 
  RemoveImageMethodResponse 
} = require('grav.client/Release/Domain/method-responses');

module.exports.existsResult = (useSuccess) => {
  const response = new ExistsMethodResponse("");
  response.json = stub.existsJsonResponse;
  response.parseMembers();
  response.exists = useSuccess;
  return Promise.resolve(Result.Ok(response));
}

module.exports.removeImageResult = () => {
  const response = new RemoveImageMethodResponse("");
  response.json = stub.removeImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

const userAddresses = [
  { imageRating:0, email: "scato@example.com", imageName: "4ddf23534256fb555cfbf10acd7728b2", imageUrl: "http://en.gravatar.com/userimage/000000/4ddf23534256fb555cfbf10acd7728b2" },
  { imageRating:0, email: "penna@example.com", imageName: null, imageUrl: null },
  { imageRating:0, email: "muzzy@example.com", imageName: "0fa6e24a27f544abb2536746b5b9d5f0", imageUrl: "http://en.gravatar.com/userimage/000000/0fa6e24a27f544abb2536746b5b9d5f0" },
];

module.exports.addressesResult = () => {
  const response = new AddressesMethodResponse("");
  response.userAddresses = userAddresses;
  return Promise.resolve(Result.Ok(response));
}

module.exports.userAddresses = userAddresses;

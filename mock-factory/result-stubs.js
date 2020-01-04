const { ExistsMethodResponse, RemoveImageMethodResponse } = require('grav.client/Release/Domain/method-responses');
const { Result } = require('grav.client/Release/Common/result');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

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

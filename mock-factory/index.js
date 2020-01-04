const sinon = require('sinon');
const { GravatarClient } = require('grav.client');
const { ExistsMethodResponse, RemoveImageMethodResponse } = require('grav.client/Release/Domain/method-responses');
const { Result } = require('grav.client/Release/Common/result');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

const problemTypes = {
  CheckPrimaryImage: 0,
  GetAccountEmailAddresses: 1,
  SetDefaultIcon: 2
};

module.exports.ProblemType = problemTypes;

const newClient = () => new GravatarClient();

const existsResult = (useSuccess) => {
  const response = new ExistsMethodResponse("");
  response.json = stub.existsJsonResponse;
  response.parseMembers();
  response.exists = useSuccess;
  return Promise.resolve(Result.Ok(response));
}

const removeImageResult = () => {
  const response = new RemoveImageMethodResponse("");
  response.json = stub.removeImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(Result.Ok(response));
}

module.exports.mockClient = async (problemType) => {
  switch (problemType) {
    case problemTypes.CheckPrimaryImage:
      const client = newClient();
      const existsMethod = sinon.stub();
      const existsResponse = await existsResult(true);
      const existsProperty = sinon.spy(existsResponse.Value, "exists", ["get"]);
      const removeImageMethod = sinon.stub();
      existsMethod.onFirstCall().returns(Promise.resolve(existsResponse));
      existsMethod.onSecondCall().returns(existsResult(false));
      removeImageMethod.onFirstCall().returns(removeImageResult());
      client.exists = existsMethod;
      client.removeImage = removeImageMethod;
      return { client, spies: { existsProperty, existsMethod, removeImageMethod }};
    case problemTypes.GetAccountEmailAddresses:
    
      break;
    case problemTypes.SetDefaultIcon:
    
      break;
    default:
      break;
  }
}

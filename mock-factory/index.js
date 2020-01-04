const sinon = require('sinon');
const ProblemTypes = require('../problems/problem-types');
const { GravatarClient } = require('grav.client');
const { existsResult, removeImageResult } = require('./results');

const newClient = () => new GravatarClient();

module.exports.mockClient = async (problemType) => {
  const client = newClient();
  switch (problemType) {
    case ProblemTypes.CheckPrimaryImage:
      const existsMethod = sinon.stub();
      const existsResponse = await existsResult(true);
      const existsProperty = sinon.spy(existsResponse.Value, "exists", ["get"]);
      const removeImageMethod = sinon.stub();
      existsMethod.onFirstCall().returns(Promise.resolve(existsResponse));
      existsMethod.onSecondCall().returns(existsResult(false));
      removeImageMethod.onFirstCall().returns(removeImageResult());
      client.exists = existsMethod;
      client.removeImage = removeImageMethod;
      client.didCheckPrimaryImage = () => (
        client.exists.calledBefore(client.removeImage)
        && existsProperty.get.calledBefore(client.removeImage)
      );
      client.didRemovePrimaryImage = () => (
        client.removeImage.calledAfter(client.exists)
      );
      client.didCheckPrimaryImageAgain = () => (
        client.exists.calledAfter(client.removeImage)
      );
      return { client };
    case ProblemTypes.GetAccountEmailAddresses:
    
      break;
    case ProblemTypes.SetDefaultIcon:
    
      break;
    default:
      break;
  }
}

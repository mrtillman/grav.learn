const sinon = require('sinon');
const { GravatarClient } = require('grav.client');
const { existsResult, removeImageResult } = require('./result-stubs');

module.exports.client = async () => {
  const client = new GravatarClient();
  const existsMethod = sinon.stub();
  const result = await existsResult(true);
  const existsProperty = sinon.spy(result.Value, "success", ["get"]);
  const removeImageMethod = sinon.stub();
  
  existsMethod.onFirstCall().returns(Promise.resolve(result));
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
  return client;
};
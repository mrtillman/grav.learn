const sinon = require('sinon');
const { existsResponse, removeImageResponse } = require('./response-stubs');
const client = require("./mock-client");

module.exports.client = async () => {  
  const existsMethod = sinon.stub();
  const result = await existsResponse(true);
  const existsProperty = sinon.spy(result, "success", ["get"]);
  const removeImageMethod = sinon.stub();
  
  existsMethod.onFirstCall().returns(Promise.resolve(result));
  existsMethod.onSecondCall().returns(existsResponse(false));
  removeImageMethod.onFirstCall().returns(removeImageResponse());
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
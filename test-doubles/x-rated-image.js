const sinon = require('sinon');
const { ImageRating } = require('grav.client');
const { imageName } = require('grav.client/Release/Common/TestDoubles/primitive-stubs');
const { 
  saveImageUrlResult, 
  deleteUserImageResult
} = require('./result-stubs');
const client = require("./mock-client");

module.exports.client = async () => {
  const saveImageUrlMethod = sinon.stub();
  const deleteUserImageMethod = sinon.stub();

  saveImageUrlMethod.returns(saveImageUrlResult());
  deleteUserImageMethod.returns(deleteUserImageResult());

  client.saveImage = saveImageUrlMethod;
  client.saveEncodedImage = saveImageUrlMethod;
  client.saveImageUrl = saveImageUrlMethod;
  client.deleteUserImage = deleteUserImageMethod;

  client.didSaveImage = () => (
    (client.saveImage.called ||
     client.saveImageUrl.called ||
     client.saveEncodedImage.called) && 
    ((saveImageUrlMethod.firstCall.args[1] == ImageRating.X))
  );

  client.didDeleteImage = () => (
    client.deleteUserImage.calledWith(imageName)
  );
  
  return client;
}

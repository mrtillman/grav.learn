const sinon = require('sinon');
const stub = require("../node_modules/grav.client/Release/Common/TestDoubles/response-stubs");
const client = {};

const existsMethod = sinon.stub();
const addressesMethod = sinon.stub();
const userImagesMethod = sinon.stub();
const saveImageMethod = sinon.stub();
const useUserImageMethod = sinon.stub();
const removeImageMethod = sinon.stub();
const deleteUserImageMethod = sinon.stub();
const testMethod = sinon.stub();

existsMethod.returns({success: false});
addressesMethod.returns(stub.AddressesResponse());
userImagesMethod.returns(stub.UserImagesResponse());
saveImageMethod.returns(stub.SaveImageResponse());
useUserImageMethod.returns(stub.UseUserImageResponse());
removeImageMethod.returns(false);
deleteUserImageMethod.returns(false);
testMethod.returns(stub.TestResponse());

client.exists = existsMethod;
client.addresses = addressesMethod;
client.userImages = userImagesMethod;
client.saveImage = saveImageMethod;
client.saveEncodedImage = saveImageMethod;
client.saveImageUrl = saveImageMethod;
client.useUserImage = useUserImageMethod;
client.removeImage = removeImageMethod;
client.deleteUserImage = deleteUserImageMethod;
client.test = testMethod;

module.exports = client;

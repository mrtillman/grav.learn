const sinon = require('sinon');
const stub = require("../node_modules/grav.client/Release/Common/TestDoubles/result-stubs");
const { Result } = require("../node_modules/grav.client/Release/Common/result");
const client = {};

const existsMethod = sinon.stub();
const addressesMethod = sinon.stub();
const userImagesMethod = sinon.stub();
const saveImageUrlMethod = sinon.stub();
const useUserImageMethod = sinon.stub();
const removeImageMethod = sinon.stub();
const deleteUserImageMethod = sinon.stub();
const testMethod = sinon.stub();

existsMethod.returns(Result.Ok({success: false}));
addressesMethod.returns(stub.AddressesResult());
userImagesMethod.returns(stub.UserImagesResult());
saveImageUrlMethod.returns(stub.SaveImageUrlResult());
useUserImageMethod.returns(stub.UseUserImageResult());
removeImageMethod.returns(Result.Ok(false));
deleteUserImageMethod.returns(Result.Ok(false));
testMethod.returns(stub.TestResult());

client.exists = existsMethod;
client.addresses = addressesMethod;
client.userImages = userImagesMethod;
client.saveImage = saveImageUrlMethod;
client.saveEncodedImage = saveImageUrlMethod;
client.saveImageUrl = saveImageUrlMethod;
client.useUserImage = useUserImageMethod;
client.removeImage = removeImageMethod;
client.deleteUserImage = deleteUserImageMethod;
client.test = testMethod;

module.exports = client;

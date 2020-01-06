const { Result } = require('grav.client/Release/Common/result');
const { ImageRating } = require('grav.client/Release/Domain/image-rating');
const { imageName } = require('grav.client/Release/Common/TestDoubles/primitive-stubs');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

const { 
  AddressesMethodResponse, ExistsMethodResponse, 
  RemoveImageMethodResponse, UserImagesMethodResponse,
  SaveImageUrlMethodResponse, DeleteUserImageMethodResponse,
  UseUserImageMethodResponse
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
  { imageRating:0, email: "blossom@example.com", imageName: "4ddf23534256fb555cfbf10acd7728b2", imageUrl: "http://en.gravatar.com/userimage/000000/4ddf23534256fb555cfbf10acd7728b2" },
  { imageRating:0, email: "bubbles@example.com", imageName: null, imageUrl: null },
  { imageRating:0, email: "buttercup@example.com", imageName: "0fa6e24a27f544abb2536746b5b9d5f0", imageUrl: "http://en.gravatar.com/userimage/000000/0fa6e24a27f544abb2536746b5b9d5f0" },
];

module.exports.addressesResult = () => {
  const response = new AddressesMethodResponse("");
  response.userAddresses = userAddresses;
  return Promise.resolve(Result.Ok(response));
}

module.exports.userAddresses = userAddresses;

const userImages = [
  { name:'alpha', rating: ImageRating.PG, url: 'https://images.example.com/alpha' },
  { name:'bravo', rating: ImageRating.G, url: 'https://images.example.com/bravo' },
  { name:'charlie', rating: ImageRating.G, url: 'https://images.example.com/charlie' },
  { name:'echo', rating: ImageRating.PG, url: 'https://images.example.com/echo' },
  { name:'delta', rating: ImageRating.G, url: 'https://images.example.com/delta' }
];

module.exports.userImagesResult = () => {
  const response = new UserImagesMethodResponse("");
  response.userImages = userImages;
  return Promise.resolve(Result.Ok(response));
}

module.exports.userImages = userImages;

module.exports.saveImageUrlResult = () => {
  const response = new SaveImageUrlMethodResponse("");
  response.imageName = imageName;
  return Promise.resolve(Result.Ok(response));
}

module.exports.deleteUserImageResult = () => {
  const response = new DeleteUserImageMethodResponse("");
  response.success = true;
  return Promise.resolve(Result.Ok(response));
}

module.exports.useUserImageResult = () => {
  const response = new UseUserImageMethodResponse("")
  response.success = true;
  return Promise.resolve(Result.Ok(response));
}

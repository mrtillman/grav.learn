const { ImageRating } = require('grav.client/Release/Domain/image-rating');
const { imageName } = require('grav.client/Release/Common/TestDoubles/primitive-stubs');
const stub = require('grav.client/Release/Common/TestDoubles/json-response-stubs');

const { 
  AddressesMethodResponse, ExistsMethodResponse, 
  RemoveImageMethodResponse, UserImagesMethodResponse,
  SaveImageMethodResponse, DeleteUserImageMethodResponse,
  UseUserImageMethodResponse
} = require('grav.client/Release/Domain/method-responses');

module.exports.existsResponse = (useSuccess) => {
  const response = new ExistsMethodResponse("");
  response.json = stub.existsJsonResponse;
  response.parseMembers();
  response.success = useSuccess;
  return Promise.resolve(response);
}

module.exports.removeImageResponse = () => {
  const response = new RemoveImageMethodResponse("");
  response.json = stub.removeImageJsonResponse;
  response.parseMembers();
  return Promise.resolve(response);
}

const userAddresses = [
  { imageRating:0, email: "blossom@example.com", imageName: "4ddf23534256fb555cfbf10acd7728b2", imageUrl: "http://en.gravatar.com/userimage/000000/4ddf23534256fb555cfbf10acd7728b2" },
  { imageRating:0, email: "bubbles@example.com", imageName: null, imageUrl: null },
  { imageRating:0, email: "buttercup@example.com", imageName: "0fa6e24a27f544abb2536746b5b9d5f0", imageUrl: "http://en.gravatar.com/userimage/000000/0fa6e24a27f544abb2536746b5b9d5f0" },
];

module.exports.addressesResponse = () => {
  const response = new AddressesMethodResponse("");
  response.userAddresses = userAddresses;
  return Promise.resolve(response);
}

module.exports.userAddresses = userAddresses;

const userImages = [
  { name:'alpha', rating: ImageRating.PG, url: 'https://images.example.com/alpha' },
  { name:'bravo', rating: ImageRating.G, url: 'https://images.example.com/bravo' },
  { name:'charlie', rating: ImageRating.G, url: 'https://images.example.com/charlie' },
  { name:'delta', rating: ImageRating.G, url: 'https://images.example.com/delta' },
  { name:'echo', rating: ImageRating.PG, url: 'https://images.example.com/echo' }
];

module.exports.userImagesResponse = () => {
  const response = new UserImagesMethodResponse("");
  response.userImages = userImages;
  return Promise.resolve(response);
}

module.exports.userImages = userImages;

module.exports.saveImageUrlResponse = () => {
  const response = new SaveImageMethodResponse("");
  response.imageName = imageName;
  return Promise.resolve(response);
}

module.exports.deleteUserImageResponse = () => {
  const response = new DeleteUserImageMethodResponse("");
  response.success = true;
  return Promise.resolve(response);
}

module.exports.useUserImageResponse = () => {
  const response = new UseUserImageMethodResponse("")
  response.success = true;
  return Promise.resolve(response);
}

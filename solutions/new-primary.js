const { 
  GravatarClient, SetNewImageUseCase
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const setNewImage = new SetNewImageUseCase();
  setNewImage.client = client;
  setNewImage.imageUrl = "https://via.placeholder.com/150";
  await setNewImage.execute();
  const { userAddresses } = await client.addresses();
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
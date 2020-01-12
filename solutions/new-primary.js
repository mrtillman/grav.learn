module.exports = async function (client) {
  const imageUrl = "https://via.placeholder.com/150";
  const saveImageResult = await client.saveImageUrl(imageUrl);
  await client.useUserImage(saveImageResult.Value.imageName);
  const addressesResult = await client.addresses();
  const { userAddresses } = addressesResult.Value;
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
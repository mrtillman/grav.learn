Here is the reference solution, if you're curious:

```js
module.exports = async function (client) {
  const imageUrl = "https://via.placeholder.com/150";
  const saveImageResponse = await client.saveImageUrl(imageUrl);
  await client.useUserImage(saveImageResponse.Value.imageName);
  const addressesResponse = await client.addresses();
  const { userAddresses } = addressesResponse.Value;
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
```

Alternatively:

```js
const { SetNewImageUseCase } = require('grav.client');

module.exports = async function (client) {
  const setNewImage = new SetNewImageUseCase();
  setNewImage.client = client;
  setNewImage.imageUrl = "https://via.placeholder.com/150";
  await setNewImage.execute();
  const addressesResponse = await client.addresses();
  const { userAddresses } = addressesResponse.Value;
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
```

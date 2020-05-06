Here is the reference solution, if you're curious:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const imageUrl = "https://via.placeholder.com/150";
  const saveImageResponse = await client.saveImageUrl(imageUrl);
  await client.useUserImage(saveImageResponse.imageName);
  const addressesResponse = await client.addresses();
  const { userAddresses } = addressesResponse;
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
```

Alternatively:

```js
const { 
  GravatarClient, SetNewImageUseCase
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const setNewImage = new SetNewImageUseCase();
  setNewImage.client = client;
  setNewImage.imageUrl = "https://via.placeholder.com/150";
  await setNewImage.execute();
  const addressesResponse = await client.addresses();
  const { userAddresses } = addressesResponse;
  return {
    primaryImageUrl: userAddresses.find(
      address => address.email == client.email
    ).imageUrl
  }
}
```

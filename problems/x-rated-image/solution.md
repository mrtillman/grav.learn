Here is the reference solution, if you're curious:

```js
const { 
  GravatarClient, ImageRating
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const response = await client.saveImageUrl("https://via.placeholder.com/150", ImageRating.X);
  await client.deleteUserImage(response.imageName);
}
```
Here is the reference solution, if you're curious:

```js
const { ImageRating } = require('grav.client');

module.exports = async function (client) {
  const result = await client.saveImageUrl("https://via.placeholder.com/150", ImageRating.X);
  await client.deleteUserImage(result.Value.imageName);
}
```
Here is the reference solution, if you're curious:

```js
const { ImageRating } = require('grav.client');

module.exports = async function (client) {
  const response = await client.userImages();
  const { userImages } = response;
  return {
    numberOfImages: userImages.length,
    numberOfPgRatedImages: userImages.filter(
      image => image.rating == ImageRating.PG
    ).length
  };
}
```

Here is the reference solution, if you're curious:

```js
const { 
  GravatarClient, ImageRating 
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
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

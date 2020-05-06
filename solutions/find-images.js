const { ImageRating } = require('grav.client');
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const result = await client.userImages();
  const { userImages } = result.Value;
  return {
    numberOfImages: userImages.length,
    numberOfPgRatedImages: userImages.filter(
      image => image.rating == ImageRating.PG
    ).length
  };
}

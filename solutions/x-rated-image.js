const { ImageRating } = require('grav.client');
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const result = await client.saveImageUrl("https://via.placeholder.com/150", ImageRating.X);
  await client.deleteUserImage(result.Value.imageName);
}

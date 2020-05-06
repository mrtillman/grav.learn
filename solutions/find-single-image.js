const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const { userImages } = await client.userImages();
  return {
    image: userImages.find(image => image.name == "bravo")
  };
}
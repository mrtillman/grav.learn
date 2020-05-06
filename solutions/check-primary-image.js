const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  let response = await client.exists();
  let { success } = response;
  while(success) {
    await client.removeImage();
    response = await client.exists();
    success = response.success;
  }
}
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  let result = await client.exists();
  let { success } = result.Value;
  while(success){
    await client.removeImage();
    result = await client.exists();
    success = result.Value.success;
  }
}
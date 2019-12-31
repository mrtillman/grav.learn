const { GravatarClient } = require('grav.client');

module.exports = async function (client) {
  const result = await client.exists();
  let exists = result.Value.exists[client.emailHash];
  if(exists){
    await client.removeImage();
    exists = await client.exists();
  }
}
const { GravatarClient } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const imageName = "b13ef59e996c16dcc127df002dd4578b";
  const client = new GravatarClient(creds.email, creds.password);
  
  return client.deleteUserImage(imageName);
}
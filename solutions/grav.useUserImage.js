const { GravatarClient } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const imageName = "a68c2b2e469676717d9894c80ca16e82";
  const client = new GravatarClient(creds.email, creds.password);
  
  return client.useUserImage(imageName);
}
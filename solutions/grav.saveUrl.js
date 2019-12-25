const { GravatarClient } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const client = new GravatarClient(creds.email, creds.password);
  
  const imageUrl = "https://via.placeholder.com/150";
  return client.saveUrl(imageUrl);
}
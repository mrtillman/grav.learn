const { GravatarClient } = require('grav.client');
const creds = require('../creds');
const path = require('path');

module.exports = function () {
  const image = path.join(__dirname, '/../assets/avatar.jpg');
  const client = new GravatarClient(creds.email, creds.password);
  
  return client.saveImage(image);
}
const { GravatarClient } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const client = new GravatarClient(creds.email, creds.password);
  return client.exists();
}
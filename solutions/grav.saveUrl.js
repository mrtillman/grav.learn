const { Grav } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const grav = Grav.login(creds.email, creds.password);
  grav.autoParse = true;
  const imageUrl = "https://via.placeholder.com/150";
  return grav.saveUrl(imageUrl);
}
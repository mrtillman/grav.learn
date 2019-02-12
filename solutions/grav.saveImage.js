const { Grav } = require('grav.client');
const creds = require('../creds');
const path = require('path');

module.exports = function () {
  const image = path.join(__dirname, '/../assets/avatar.jpg');
  const grav = Grav.login(creds.email, creds.password);
  grav.autoParse = true;
  return grav.saveImage(image);
}
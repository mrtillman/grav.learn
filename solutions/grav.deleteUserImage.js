const { Grav } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const imageName = "b13ef59e996c16dcc127df002dd4578b";
  const grav = Grav.login(creds.email, creds.password);
  grav.autoParse = true;
  return grav.deleteUserImage(imageName);
}
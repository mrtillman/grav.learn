const { Grav } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const imageName = "a68c2b2e469676717d9894c80ca16e82";
  const grav = Grav.login(creds.email, creds.password);
  grav.autoParse = true;
  return grav.useUserImage(imageName);
}
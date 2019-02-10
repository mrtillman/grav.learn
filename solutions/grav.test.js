const { Grav } = require('grav.client');
const creds = require('../creds');

module.exports = function () {
  const grav = Grav.login(creds.email, creds.password);
  //grav.autoParse = true;
  return grav.test();
}
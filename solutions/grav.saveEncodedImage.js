const { Grav } = require('grav.client');
const creds = require('../creds');
const path = require('path');
const fs = require('fs');

module.exports = function () {
  const image = path.join(__dirname, '/../assets/avatar.jpg');
  const bitmap = fs.readFileSync(image);
  const imageData = new Buffer(bitmap).toString('base64');
  
  const grav = Grav.login(creds.email, creds.password);
  grav.autoParse = true;
  return grav.saveEncodedImage(imageData, 'jpeg', 0);
}
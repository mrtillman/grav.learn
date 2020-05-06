Here is the reference solution, if you're curious:
  
```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  await client.removeImage();
}
```
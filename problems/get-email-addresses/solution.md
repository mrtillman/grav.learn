Here is the reference solution, if you're curious:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const response = await client.addresses();
  const { userAddresses } = response;
  return {
    addressCount: userAddresses.length,
    addressMissingPrimaryImage: userAddresses.find(
      address => !address.imageName
    ).email
  };
}
```

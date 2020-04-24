Here is the reference solution, if you're curious:

```js
module.exports = async function (client) {
  const result = await client.addresses();
  const { userAddresses } = result.Value;
  return {
    addressCount: userAddresses.length,
    addressMissingPrimaryImage: userAddresses.find(
      address => !address.imageName
    ).email
  };
}
```

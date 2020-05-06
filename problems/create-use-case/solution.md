Here is the reference solution, if you're curious:

```js
module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = null;
  }
  async execute(){
    const addressesResult = await this.client.addresses();
    const { userAddresses } = addressesResult.Value;
    return userAddresses.find(
      address => address.email == this.client.email
    );
  }
}
```
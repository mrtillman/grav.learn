Here is the reference solution, if you're curious:

```js
module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = null;
  }
  async execute(){
    const addressesResponse = await this.client.addresses();
    const { userAddresses } = addressesResponse.Value;
    return userAddresses.find(
      address => address.email == this.client.email
    );
  }
}
```

const { GravatarClient } = require('grav.client');

module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = new GravatarClient();
  }
  async execute(){
    const addressesResult = await this.client.addresses();
    const { userAddresses } = addressesResult.Value;
    return userAddresses.find(
      address => address.email == this.client.email
    );
  }
}

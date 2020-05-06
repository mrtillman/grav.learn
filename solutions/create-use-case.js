const { GravatarClient } = require('grav.client');

module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = new GravatarClient();
  }
  async execute(){
    const addressesResponse = await this.client.addresses();
    const { userAddresses } = addressesResponse.Value;
    return userAddresses.find(
      address => address.email == this.client.email
    );
  }
}

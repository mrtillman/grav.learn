const { GravatarClient } = require('grav.client');

module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = new GravatarClient();
  }
  async execute(){
    const { userAddresses } = await this.client.addresses();
    return userAddresses.find(
      address => address.email == this.client.email
    );
  }
}

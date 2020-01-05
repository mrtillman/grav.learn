const ProblemTypes = require('../problems/problem-types');
const x = require('./check-primary-image');

module.exports.mockClient = async (problemType) => {
  switch (problemType) {
    case ProblemTypes.CheckPrimaryImage:
      return await require('./check-primary-image').client();
    case ProblemTypes.GetAccountEmailAddresses:
      return await require('./get-account-email-addresses').client();
    case ProblemTypes.SetDefaultIcon:
    
      break;
    default:
      break;
  }
}

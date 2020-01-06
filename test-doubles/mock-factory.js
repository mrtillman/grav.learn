const ProblemTypes = require('../problems/problem-types');

module.exports.mockClient = async (problemType) => {
  switch (problemType) {
    case ProblemTypes.CheckPrimaryImage:
      return await require('./check-primary-image').client();
    case ProblemTypes.GetEmailAddresses:
      return await require('./get-email-addresses').client();
    case ProblemTypes.FindImages:
      return await require('./find-images').client();
    case ProblemTypes.XRatedImage:
      return await require('./x-rated-image').client();
    default:
      break;
  }
}

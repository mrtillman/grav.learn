const ProblemTypes = require('../problems/problem-types');

module.exports.mockClient = async (problemType) => {
  switch (problemType) {
    case ProblemTypes.CheckPrimaryImage:
      return await require('./check-primary-image').client();
    case ProblemTypes.GetEmailAddresses:
      return await require('./get-email-addresses').client();
    case ProblemTypes.FindImages:
      return await require('./find-images').client();
    case ProblemTypes.FindSingleImage:
      return await require('./find-single-image').client();
    case ProblemTypes.XRatedImage:
      return await require('./x-rated-image').client();
    case ProblemTypes.NewPrimary:
      return await require('./new-primary').client();
    case ProblemTypes.PreviousImage:
      return await require('./load-previous-image').client();
    case ProblemTypes.NextImage:
      return await require('./load-next-image').client();
    case ProblemTypes.CreateUseCase:
      return await require('./create-use-case').client();
    default:
      break;
  }
}

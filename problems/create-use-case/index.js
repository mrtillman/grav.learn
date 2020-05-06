const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../test-doubles/mock-factory');
const ProblemTypes =require('../problem-types');
const marked = require('../../theme');

exports.problem = marked(fs.readFileSync(__dirname + '/problem.md').toString());
exports.solution = marked(fs.readFileSync(__dirname + '/solution.md').toString());

function isConstructor(f) {
    try {
      new f();
    } catch (err) {
      // verify err is the expected error and then
      return false;
    }
    return true;
  }

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const didReturnClass = isConstructor(solution);
    let useCase;

    const didImplementUseCase = function(){
        if(!didReturnClass) { return false }
        useCase = new solution();
        return !!useCase.execute;
    }

    const didFindUserAddress = async function(){
        if(!didReturnClass || !useCase.execute) { return false }
        const client = await mockClient(ProblemTypes.CreateUseCase);
        useCase.client = client;
        const response = await useCase.execute();
        return client.didFindUserAddress(response)
    }

    test.equal(didReturnClass, true, 'you returned a class');
    test.equal(didImplementUseCase(), true, 'you implemented a use case');
    test.equal(await didFindUserAddress(), true, "your use case found the user address");
    test.end();
});

const fs = require('fs');
const path = require('path');
const verify = require('adventure-verify');
const { mockClient } = require('../../test-doubles/mock-factory');
const ProblemTypes =require('../problem-types');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, async function (args, test) {
    const solutionFilePath = args[0];
    const solution = require(path.resolve(solutionFilePath));
    const useCase = new solution();
    
    const didImplementUseCase = (
        typeof useCase == 'object' && !!useCase.execute
    );
    
    test.equal(didImplementUseCase, true, 'you implemented a use case');

    const client = await mockClient(ProblemTypes.CreateUseCase);
    useCase.client = client;
    const result = await useCase.execute();
    
    test.equal(client.didFindUserAddress(result), true, "your use case found the user address");
    test.end();
});

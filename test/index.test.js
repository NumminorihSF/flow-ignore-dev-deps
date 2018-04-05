const fs = require('fs');
const path = require('path');

const { expect } = require('chai');

const { addDevDependenciesIntoIgnoreSection } = require('../addDevDependenciesIntoIgnoreSection');

const REGULAR_CASES = [
  'add-eol',
  'empty-config',
  'ignore-last',
  'ignore-user-defined-content',
  'merge-user-with-auto',
  'no-dev-deps',
  'remove-missed-dev-deps',
];


describe('addDevDependenciesIntoIgnoreSection', function () {
  describe('with missed .flowconfig', function () {
    const testCase = 'no-flowconfig';
    const run = () => addDevDependenciesIntoIgnoreSection({
      flowconfigPath: path.join(__dirname, 'cases', testCase, '.flowconfig'),
      packageLockPath: path.join(__dirname, 'cases', testCase, 'package-lock.json')
    });

    it('throws with error with text "Please check if it\'s a flow-typed project."', function() {
      expect(run).to.throw(Error, 'Please check if it\'s a flow-typed project.');
    });
  });

  describe('with missed package-lock.config', function () {
    const testCase = 'no-packagelock';
    const run = () => addDevDependenciesIntoIgnoreSection({
      flowconfigPath: path.join(__dirname, 'cases', testCase, '.flowconfig'),
      packageLockPath: path.join(__dirname, 'cases', testCase, 'package-lock.json')
    });

    const beforePath = path.join(__dirname, 'cases', testCase, '.flowconfig.before');
    const flowconfigPath = path.join(__dirname, 'cases', testCase, '.flowconfig');

    before(function () {
      fs.writeFileSync(flowconfigPath, fs.readFileSync(beforePath, 'utf8'));
    });

    after(function () {
      fs.unlinkSync(flowconfigPath);
    });

    it('throws with error with text "Please check if it\'s a npm project. Check if your npm is v5+ and try to run `npm install` inside project"', function() {
      expect(run).to.throw(Error, 'Please check if it\'s a npm project. Check if your npm is v5+ and try to run `npm install` inside project');
    });
  });

  REGULAR_CASES.forEach(function(regularCase) {
    describe(`in case "${regularCase}"`, function () {
      const beforePath = path.join(__dirname, 'cases', regularCase, '.flowconfig.before');
      const flowconfigPath = path.join(__dirname, 'cases', regularCase, '.flowconfig');
      const expectedPath = path.join(__dirname, 'cases', regularCase, '.flowconfig.expected');

      before(function () {
	fs.writeFileSync(flowconfigPath, fs.readFileSync(beforePath, 'utf8'));
      });

      after(function () {
        fs.unlinkSync(flowconfigPath);
      });

      it('generates expected .flowconfig', function () {
        addDevDependenciesIntoIgnoreSection({
          flowconfigPath,
          packageLockPath: path.join(__dirname, 'cases', regularCase, 'package-lock.json'),
        });

        const result = fs.readFileSync(flowconfigPath, 'utf8');
        const expectedResult = fs.readFileSync(flowconfigPath, 'utf8');

        expect(result).to.be.equal(expectedResult);
      });
    });
  });
});


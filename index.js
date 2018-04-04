const path = require('path');

const { addDevDependenciesIntoIgnoreSection } = require('./addDevDependenciesIntoIgnoreSection');

const CWD = process.cwd();
const CONFIG_PATH = path.join(CWD, '.flowconfig');
const PACKAGE_LOCK_PATH = path.join(CWD, 'package-lock.json');

addDevDependenciesIntoIgnoreSection({
  flowconfigPath: CONFIG_PATH,
  packageLockPath: PACKAGE_LOCK_PATH,
});
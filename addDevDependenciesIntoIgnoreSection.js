const flowconfig = require('./flowconfig');
const lock = require('./lock');
const { generateIgnoreSectionLines } = require('./generateIgnoreSectionLines');

function getFlowconfigSections(flowconfigPath) {
  try {
    const config = flowconfig.read(flowconfigPath);
    return flowconfig.separate(config);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`${error.message}\n\tPlease check if it's a flow-typed project.`);
    }
    throw error;
  }
}

function getDevDependencies(packageLockPath) {
  try {
    return lock.getDevDependenciesPaths(lock.read(packageLockPath));
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`${error.message}\n\tPlease check if it's a npm project. Check if your npm is v5+ and try to run \`npm install\` inside project.`);
    }
    throw error;
  }
}
function addDevDependenciesIntoIgnoreSection({ flowconfigPath, packageLockPath }) {
  const sections = getFlowconfigSections(flowconfigPath);
  const devDependencies = getDevDependencies(packageLockPath);
  const nextIgnoreSection = generateIgnoreSectionLines(devDependencies, sections.ignore);

  const nextSections = Object.assign({}, sections, { ignore: nextIgnoreSection });

  flowconfig.save(flowconfigPath, flowconfig.join(nextSections));
}

module.exports.addDevDependenciesIntoIgnoreSection = addDevDependenciesIntoIgnoreSection;
const fs = require('fs');

require('./object-entries-polyfill.js');

function getDevDependenciesPaths({ dependencies }, { devDependencies = new Set(), dependencyPath = [] } = {}) {
  if (!dependencies) return;

  Object.entries(dependencies).forEach(([name, { dependencies, dev }]) => {
    if (dev) devDependencies.add([...dependencyPath, name]);
    else getDevDependenciesPaths({ dependencies }, { devDependencies, dependencyPath: [...dependencyPath, name] });
  });

  return [...devDependencies];
}

module.exports.read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
module.exports.getDevDependenciesPaths = getDevDependenciesPaths;

const fs = require('fs');
const os = require('os');

const BEFORE_IGNORE = 0;
const IN_IGNORE = 1;
const AFTER_IGNORE = 2;

function separate(config) {
  let currentState = BEFORE_IGNORE;
  const result = { before: [], ignore: ['[ignore]'], after: [] };
  const lines = config.split(os.EOL);

  lines.forEach(line => {
    const trimmedLine = line.trim();

    switch (currentState){
      case BEFORE_IGNORE:
        if (trimmedLine === '[ignore]') {
          currentState = IN_IGNORE;
        } else {
          result.before.push(line);
        }
        break;
      case IN_IGNORE:
        if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
          currentState = AFTER_IGNORE;
          result.after.push(line);
        } else {
          result.ignore.push(line);
        }
        break;

      case AFTER_IGNORE:
        result.after.push(line);
    }
  });

  return result;
}

function appendEolIfNeed(string) {
  if (string.endsWith(os.EOL)) return string;

  return `${string}${os.EOL}`;
}

function join({ before, ignore, after }) {
  return appendEolIfNeed([...before, ...ignore, ...after].join(os.EOL).trimLeft());
}

module.exports.read = (path) => fs.readFileSync(path, 'utf8');
module.exports.separate = separate;
module.exports.join = join;
module.exports.save = (path, content) => fs.writeFileSync(path, content);
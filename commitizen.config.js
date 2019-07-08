const types = {
  build: '📦 Changes that affect the build system or external dependencies',
  chore: "🔖 Other changes that don't modify src or test files",
  ci: '🤖 Changes to our CI configuration files and scripts',
  docs: '📚 Documentation only changes',
  feat: '✨ A new feature',
  fix: '🐞 A bug fix',
  perf: '🚀 A code change that improves performance',
  refactor: '🔨 A code change that neither fixes a bug nor adds a feature',
  revert: '⏪ Reverts a previous commit',
  style: '🎨 Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
  test: '✅ Adding missing tests or correcting existing tests',
};

const wrap = require('word-wrap');
const longest = require('longest');
const chalk = require('chalk');

const wrapOptions = {
  trim: true,
  newline: '\n',
  indent: '',
  width: 100,
};

const length = longest(Object.keys(types)).length + 1;
const choices = Object.entries(types).map(([type, description]) => ({
  name: `${`${type}:`.padEnd(length)} ${description}`,
  value: type,
}));

const skip = chalk.grey('(press enter to skip)');
const questions = [
  {
    type: 'list',
    name: 'type',
    message: "Select the type of change that you're committing:\n",
    choices,
  },
  {
    type: 'input',
    name: 'subject',
    message: 'Write a short, imperative tense description of the change:\n',
    required: true,
  },
  {
    type: 'input',
    name: 'body',
    message: `Provide a longer description of the change: ${skip}\n`,
  },
  {
    type: 'input',
    name: 'breaking',
    message: `List any ${chalk.red('BREAKING CHANGES')}: ${skip}\n`,
  },
  {
    type: 'input',
    name: 'issues',
    message: `List the issues, this commit affects: ${skip}\n`,
  },
];

module.exports = {
  prompter: (cz, commit) => {
    cz.prompt(questions).then(answers => {
      const { type, subject, body, breaking, issues } = Object.assign(
        {},
        ...Object.entries(answers).map(([key, value]) => ({ [key]: value.trim() }))
      );

      const message = [`${type}: ${issues} ${subject}`, body, breaking && `BREAKING CHANGE: ${issues} ${breaking}`]
        .filter(Boolean)
        .map(line => wrap(line, wrapOptions))
        .join('\n\n')
        .trim();

      commit(message);
    });
  },
};

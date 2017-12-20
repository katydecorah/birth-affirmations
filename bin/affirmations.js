#!/usr/bin/env node

const generate = require('../index.js');
const argv = require('minimist')(process.argv.slice(2));

if (!argv.channel) {
  console.log('Usage:   birth-affirmation --channel=<channel>');
  console.log('Example: birth-affirmation --channel=@katydecorah');
  process.exit(1);
}

process.env.SlackChannel = argv.channel;

generate.affirmations({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});

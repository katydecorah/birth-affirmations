'use strict';

const request = require('request');
const Base64 = require('js-base64').Base64;
const YAML = require('yamljs');

const affirmations = (event, context, callback) => {
  module.exports
    .getYaml(
      'https://api.github.com/repos/katydecorah/birth-affirmations/contents/library.yaml'
    )
    .then(post)
    .then(res => callback(res))
    .catch(err => callback(err));
};

const post = data => {
  const json = {
    channel: process.env.SlackChannel,
    username: 'AffirmationBot',
    icon_emoji: ':baby:',
    parse: 'full',
    text: data[Math.floor(Math.random() * data.length)],
    markdown: true
  };
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: process.env.SlackHookURL,
        json: json
      },
      (err, res) => {
        if (err) reject(err);
        if (res.statusCode !== 200)
          reject(`Got HTTP status ${res.statusCode} from Slack`);
        resolve('Posted to Slack.');
      }
    );
  });
};

const getYaml = url => {
  const opts = {
    url: url,
    headers: {
      'User-Agent': 'katydecorah',
      Authorization: 'token ' + process.env.GithubAccessToken
    }
  };
  return new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      if (err) reject(err);
      if (res.statusCode !== 200) reject(`HTTP ${res.statusCode} for ${url}`);
      const data = YAML.parse(Base64.decode(JSON.parse(body).content))
        .affirmations;
      resolve(data);
    });
  });
};

module.exports = {
  affirmations,
  post,
  getYaml
};

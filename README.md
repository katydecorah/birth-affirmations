# Birth affirmations

A Slack bot that will post a birth affirmation daily.

Affirmations are stored in `library.yaml` and can be updated at anytime without needing to redeploy the code.

## Set up

```
npm install
npm link
```

Set the following environment variables:

```
echo "export SlackHookURL="0000ffff0000ffff0000ffff0000ffff0000ffff" >> ~/.bash_profile
echo "export GithubAccessToken="0000ffff0000ffff0000ffff0000ffff0000ffff" >> ~/.bash_profile
```

## Run it

```
birth-affirmation --channel=<channel>
```

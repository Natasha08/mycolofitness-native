# react-native-app

# Getting Started

  ## clone the app
  `git clone git@github.com:Natasha08/react-native-app.git`

  ## install global packages

  [install yarn](https://yarnpkg.com/lang/en/docs/install/)

  `yarn global add react-native-cli`

  `yarn` to install node modules

# Running the project
  - Make sure your testing device is connected `adb devices`
  - In one terminal tab enter `yarn start` (should be running the entire time)
  - In another tab, run `react-native run-android`

# Testing

### Running JS tests:
  `yarn test`

### Running flow tests:

#### Note: Make sure to run `yarn run prepublish` before running flow tests.
`yarn run flow`


# Debugging

`react-native log-ios`
`react-native log-android`

# Errors

#### if after yarn start, there are collision/duplication errors:
  run `yarn start --reset-cache`
#### SyntaxError: Strict mode does not allow function declarations in a lexically nested statement on a newly created app

https://github.com/facebook/react-native/issues/11389

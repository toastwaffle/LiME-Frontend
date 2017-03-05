// Config values for the app.

var Config = {};

/* global process */
/* eslint no-process-env: "off" */
/* This is the one place where we use process.env */
if (process.env.NODE_ENV === 'production') {
  Config = Object.assign({}, Config, {
    apiHost: 'https://api.fivebit.co.uk/'
  });
} else {
  Config = Object.assign({}, Config, {
    apiHost: 'http://localhost:5000/'
  });
}

export default Config;

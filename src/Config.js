// Config values for the app.

var Config = {
  messageTimeout: 5000,
  dragExpandChildrenTimeout: 1000,
};

/* global process */
/* eslint no-process-env: "off" */
/* This is the one place where we use process.env */
if (process.env.NODE_ENV === 'production') {
  Config = Object.assign({}, Config, {
    apiHost: 'https://limeapi.fivebit.co.uk/'
  });
} else {
  Config = Object.assign({}, Config, {
    apiHost: 'http://localhost:5000/'
  });
}

export default Config;

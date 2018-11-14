'use strict';

module.exports = ctl => ({
  post: {
    '/signup': ctl.user.signUp,
    '/signin': ctl.user.signIn,
  },
});

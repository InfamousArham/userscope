const tracker = require('./tracker');

module.exports = function userScope(config = {}) {
  return function (req, res, next) {
    const data = tracker(req, config);
    req.userscope = data;
    next();
  };
};

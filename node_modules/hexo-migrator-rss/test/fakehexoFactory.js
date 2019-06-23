// Return mock hexo for unit testing.
exports.create = function () {
  var mock = {};
  mock.setValues =
  {
    registeredType: null,
    receivedPosts: [],
    registeredFunction: null,
    calledType: null
  };
  mock.extend = {};
  mock.extend.migrator = {};
  mock.extend.migrator.register = function (type, f) {
    mock.setValues.registeredType = type;
    mock.setValues.registeredFunction = f;
  };
  mock.call = function (type, args, callback) {
    mock.setValues.calledType = args._.shift();
    mock.setValues.registeredFunction(args, callback);    
  };
  mock.log = {
    i: function () { },
    w: function () { }
  };
  mock.post = {
    create: function (newPost, next) {
      mock.setValues.receivedPosts.push(newPost);
      next();
    }
  };
  return mock;
};
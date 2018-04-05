// very simple polyfill
if (!Object.entries) {
  Object.entries = function(obj) {
    return Object.keys(obj).map(function (key) {
      return [key, obj[key]];
    });
  }
}

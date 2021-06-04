var mongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
const mongoose = require("mongoose");

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

console.log(Boolean())

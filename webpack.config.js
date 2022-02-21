const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "grapheditor/www/index.js"),
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: [/\.txt/, /\.xml/],
        type: "asset/source",
      },
    ],
  },
};

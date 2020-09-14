const { resolve } = require("path");
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.128.115/",
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.resolve.alias.set("@", resolve(__dirname, "./src"));
  //   //set第一个参数：设置的别名，第二个参数：设置的路径
  // },
};

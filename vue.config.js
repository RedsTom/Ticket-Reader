module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/colors";
        `,
      },
    },
  },
};

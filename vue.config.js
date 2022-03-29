module.exports = {
  devServer: {
    disableHostCheck: true,
    public: '8080-gravendev-ticketreader-3bbcylpvozv.ws-eu38.gitpod.io',
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

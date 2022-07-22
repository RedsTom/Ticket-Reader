const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'redstom.freeboxos.fr:8080',
      'redstom.freeboxos.fr'
    ]
  },
  publicPath: '/GravenDev-TicketReader/'
})

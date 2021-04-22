const { nuxifyStorybook } = require('../.nuxt-storybook/storybook/main.js')

module.exports = nuxifyStorybook({
  webpackFinal (config, options) {

    // extend config here

    return config
  },
  stories: [
    "../../www/components/**/*.stories.mdx",
    "../../www/components/**/*.stories.@(js|jsx|ts|tsx|vue)"
  ],
  addons: []
})


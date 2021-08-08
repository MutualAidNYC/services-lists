const keysTransformer = require('ts-transformer-keys/transformer').default

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {
        getCustomTransformers: program => ({
          before: [
              keysTransformer(program)
          ]
        })
      }
    })

    return config
  },
}

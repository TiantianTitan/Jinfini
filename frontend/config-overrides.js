const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'media',
        },
      },
    ],
  })
);

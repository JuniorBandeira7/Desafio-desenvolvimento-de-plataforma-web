const path = require('path');

module.exports = {
  entry: './app.js', // Arquivo de entrada
  output: {
    filename: 'bundle.js', // Arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Processa arquivos CSS
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Processa arquivos JS
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'development',
};

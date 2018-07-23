module.exports = {
  entry: './public/javascripts/script.js',
  output: { path: __dirname+'/public/javascripts', filename: 'bundle.js' },
  module: {
    rules: [
      {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: [
         {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
         ]
      },
      {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
     }
    ]
  }
};

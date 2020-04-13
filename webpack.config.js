const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
return {
    entry: {
        app: ['./src/index.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: env.NODE_ENV === 'production' ? path.resolve(__dirname, 'public') : path.resolve(__dirname, 'development'),
        filename: env.NODE_ENV === 'production' ? './js/[name].[chunkhash].js' : './js/[name].js'
    },
    devtool:  env.NODE_ENV !== 'production' ? 'none':'source-map-loader',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss', '.css'],
        alias: {
            'Components': path.resolve(__dirname, 'src/components/'),
        },
    },
    module: {
        rules: [
            {
                exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
                test: /\.js(x)?$/,
                use: [{ loader: 'babel-loader' }],
              },
              {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
           // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) })
    ],
    devServer: { historyApiFallback: true, contentBase: path.join(__dirname, './') },
}
}


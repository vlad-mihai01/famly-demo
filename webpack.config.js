const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/index.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
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
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        ]
    },
    devServer: { historyApiFallback: true, contentBase: './' },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
        //new webpack.HotModuleReplacementPlugin()
    ]
}


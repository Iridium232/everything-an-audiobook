var webpack = require('webpack');

module.exports = {
    context: __dirname,

    // Where the app starts - all other dependencies are bundled from this point.
    entry: [
      './App.js'
    ],

    output: {
        filename: 'bundle.js',
        path: __dirname
    },

    module: {
        loaders: [
            {
                test:/\.js.?/,
                loaders: [
                // Converts jsx, and handles ES6 features
                    'jsx-loader?insertPragma=React.DOM&harmony'
                ]
            }
        ]
    },

    resolve: {
        // so you don't have to put "require('../../../../utility/Component')"
        modulesDirectories: ['components','utility','../node_modules']
    },

    // Use this if you're tired of slow compile times from webpack.
    // devtool: 'cheap-source-map'

    // Allows you to debug your original files rather than bundle.js
    devtool: 'source-map'
}
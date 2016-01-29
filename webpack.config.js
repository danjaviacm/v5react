const path = require( 'path' );
const node_modules = path.resolve( __dirname, 'node_modules' );
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require( "webpack" );
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	app: path.resolve(__dirname, 'src/main.js' ),
	build: path.resolve(__dirname, 'build' ),
	fonts: path.resolve(__dirname, 'src/fonts')
};

module.exports = {

	entry: [ 'webpack/hot/dev-server', PATHS.app ],

	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},

	// For joi libs
	node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },

	module: {
		loaders: [
			{
				test: /\.(jsx|es6|js)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: [ 'react', 'es2015' ]
				}
			},

			// BOOTSTRAP && OUR FONTS
			{ test: /\.(ttf|eot|svg|woff|woff2?)(\?[a-z0-9]+)?$/, loader : 'file-loader?name=[name]-[hash].[ext]' },

			{ test: /\.eot(\?-[a-z0-9]+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" }, 

			// FONT AWESOME FONTS
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }, 

			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }, 

			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" }, 

			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=100000" }, 

			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

			// IMAGES
			{ test: /\.(png|jpg)$/, loader: 'url?limit=25000' },

			// LESS
            // { test: /\.less$/, loader: "style!css!less" },

            { test: /\.less$/, loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader!less-loader")},

			// SASS
			{ test: /\.scss$/, loader: 'style!css!sass'	}
		]
	},

	plugins: [

        new CopyWebpackPlugin([
        	
            { from: PATHS.fonts, to: 'fonts' }

        ], {
            ignore: [
                // Doesn't copy any files with a txt extension     
                '*.txt'
            ]
        }),

		new OpenBrowserPlugin({ url: 'http://localhost:5000' }),
		new ExtractTextPlugin( "./[name].css" )

	]
	
};
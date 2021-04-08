const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

const devNeedCdn = false
const isProduction = process.env.NODE_ENV !== 'development';
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const cdn = {
	// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
	externals: {
		// vue: 'Vue',
		// vuex: 'Vuex',
		// 'vue-router': 'VueRouter',
		'axios': 'axios'
	},
	// cdn的js链接
	js: [
		// 'https://cdn.bootcss.com/vue/2.6.12/vue.min.js',
		// 'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
		// 'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
		'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
	]
}

module.exports = {
	assetsDir: 'newmusic_static',
	indexPath: 'newmusic.html',
	productionSourceMap: false,
	css: {
		sourceMap: false
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			// 生产环境或本地需要cdn时，才注入cdn
			if (isProduction || devNeedCdn) args[0].cdn = cdn
			return args
		})
		const oneOfsMap = config.module.rule('sass').oneOfs.store
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.end()
		})
	},
	configureWebpack: config => {
		// 用cdn方式引入，则构建时要忽略相关资源
		if (isProduction || devNeedCdn) config.externals = cdn.externals;

		if (isProduction) {
			const productionGzipExtensions = ['html', 'js', 'css']
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path][base].gz',
					algorithm: 'gzip',
					test: new RegExp(
						'\\.(' + productionGzipExtensions.join('|') + ')$'
					),
					threshold: 10240, // 只有大小大于该值的资源会被处理 10240
					minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
					deleteOriginalAssets: false // 删除原文件
				})
			)
		}
	}
}
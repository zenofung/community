module.exports = {
	devServer:{
		// port:'8080',
		disableHostCheck:true,
		proxy:{
			'/api':{
				// target:'http://www.homiesocial.cn/wine',
				target:'http://localhost:8080/wine',
				changeOrigin:true,
				pathRewrite:{
					'^/api': ''
				}
			}
		}
	}
}
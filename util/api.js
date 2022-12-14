const BASE_URL = 'http://localhost:8081/api'
// const BASE_URL = 'http://192.168.1.11:8080/wine'
// const BASE_URL = 'https://www.homiesocial.cn/wine'
// 通过export向外暴露一个方法，方法名叫myRequest,调用myRequest方法时会向方法中传递一个对象options
export const myRequest = (options) => {
	return new Promise((resolve, reject) => { // 异步处理的封装通过promise比较好，并且要return出去，
		let token = uni.getStorageSync('authorization')
		uni.request({ // 在回调函数中处理异步请求
			url: BASE_URL + options.url, // 将接口地址分为两部分，这样如果域名改变了好维护，接口地址从options中获取
			method: options.method || 'GET', // 方法从options中获取，如果没有传入method，则默认为GET，
			data: options.data || {}, // data从options中获取，如果没有传入data， 则默认一个空对象
			header: options.header || {
				// 根据实际接口设计 key 取 token 或者 authorization
				authorization: token,
			},
			success: (res) => { // 用箭头函数，res是返回来的数据
				if (res.data.code !== 0) { // 如果请求失败，则给一个提示
					console.log(res)
					if(res.data.path=="/wine/login"){
						return uni.showToast({
							title: res.data.message,
							icon: 'error',
							duration: 1050
						})
					}
					return uni.showToast({
						title: '获取数据失败！',
						icon: 'error',
						duration: 850
					})
				}
				resolve(res) //如果请求成功，调用resolve返回数据
			},
			fail: (err) => { // err 是返回来的错误信息
				uni.showToast({ // 给一个消息提示
					title: '请求接口失败！'
				})
				reject(err) // 调用reject方法把错误消息返回出去
			}

		})
	})
}

export const fileRequest = (options) => {
	return new Promise((resolve, reject) => { // 异步处理的封装通过promise比较好，并且要return出去，
		uni.uploadFile({ // 在回调函数中处理异步请求
			url: BASE_URL + options.url, // 将接口地址分为两部分，这样如果域名改变了好维护，接口地址从options中获取
			method: options.method || 'GET', // 方法从options中获取，如果没有传入method，则默认为GET，
			filePath: options.filePath,
			name: "file",
			data: options.data || {}, // data从options中获取，如果没有传入data， 则默认一个空对象
			success: (res) => { // 用箭头函数，res是返回来的数据
				let data = JSON.parse(res.data);
				if (data.code !== 0) { // 如果请求失败，则给一个提示
					return uni.showToast({
						title: '获取数据失败！'
					})
				}
				resolve(data) //如果请求成功，调用resolve返回数据
			},
			fail: (err) => { // err 是返回来的错误信息
				uni.showToast({ // 给一个消息提示
					title: '请求接口失败！'
				})
				reject(err) // 调用reject方法把错误消息返回出去
			}

		})
	})
}

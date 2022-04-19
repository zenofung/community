const id = '1503003230302347265';
const age = 24;
const address = "未授权位置";
const formData = {
	getAddress: "切换位置",
	signAddress: '', // 签到地址
	longitude: '', // 经度
	latitude: '' // 维度
};
const location = {
	loading: true,
	error: false,
	errorInfo: '定位失败',
	curLocation: null // 当前位置信息
};
export const user = {
	id,
	age,
	address,
	formData,
	location
}

wx.login({
	success: function(res) {
		console.log(res); //这里的返回值里面便包含code
	},
	fail: function(res) {
		console.log('登陆失败');
	},

})

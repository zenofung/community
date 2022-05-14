const id = '1506193249650958337';


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


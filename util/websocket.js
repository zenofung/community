var timer=null;
function login(userid) {
	var user = {
		status: 1,
		content: {
			id: userid,
			// 连接成功将，用户ID传给服务端
			content: "login"
		}
	}
	var ping = {
		status: "0"
	}

	uni.connectSocket({
		url: 'wss://www.homiesocial.cn/webSocket'
	});
	//登录 +心跳
	uni.onSocketOpen(function(res) {

		timer = setInterval(() => {
			sendSocketMessage(ping)
		}, 6000) // 1000毫秒
		sendSocketMessage(user)
	});
	return Promise.resolve("ok")
}

function onSocketMessage(){
	uni.onSocketMessage(function(res) {
		return JSON.parse(res.data);
	});
}
function quit(){
	uni.onSocketClose(function(res) {
		clearInterval(timer);
		timer = null;
		console.log('WebSocket 已关闭！');
	});
}

function sendSocketMessage(data){
	return uni.sendSocketMessage({
		data: JSON.stringify(data)
	})
}


export {
	login,
	quit,
	onSocketMessage,
	sendSocketMessage
}

<template>

	<view class="page">
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="top-background-raduis"> </view>
		<view class="login-box">
			<view class="login-card-title">
				<uni-icons  custom-prefix="custom-icon" type="checkbox" size="20" v-if="!status"></uni-icons>
				<view class="login-card-title-content" style="margin-right: 80rpx; "
					:style="{color:(status == true ? '':'#ff0000')}" @click="updateStatus(0)">
					
					 登录 </view>
			    <uni-icons  custom-prefix="custom-icon" type="checkbox" size="20" v-if="status"></uni-icons>
				<view class="login-card-title-content" :style="{color:(status == false ? '':'#ff0000')}"
					@click="updateStatus(1)"> 注册 </view>
			</view>

			<view class="login-card-input">
				<!-- 输入框头部图标 -->
				<uni-easyinput class="hj-input" v-model="userName" focus maxlength="30" :trim="true"
					@focus="UserNamePassWrodFocusBorderStyle" :styles="inputColorConfigToUserName"
					@blur="UserNamePassWrodBlurBorderStyle" placeholder="请输入邮箱或手机号"></uni-easyinput>
				<!-- 输入框头部图标 -->
				<uni-easyinput class="hj-input" v-model="password" type="password" @focus="PassWordFocusBorderStyle"
					@blur="PassWordBlurBorderStyle" :styles="inputColorConfigToPassWord" placeholder="请输入密码">
				</uni-easyinput>
			</view>

			<view class="login-card-loginIn">
				<view class="login-card-loginIn-btn" @click="login()">
					登 录
				</view>
			</view>
			<view class="login-bottom-info">
				忘记密码
			</view>
		</view>
		<view class="bottom-message">
			登录/注册代表你已同意《xxx使用协议》
		</view>
	</view>
</template>


<script>
	//import {  } from "@/common/api/{$}.js";
	export default {
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '',
				value: '',
				// 输入框边框颜色默认值
				colorDefault: '#b4b4b4',
				// 输入框边框聚焦值
				colorFocusColor: '#3cb79a',
				// 输入框颜色配置
				inputColorConfigToUserName: {
					color: "#000000",
					disableColor: "#eee",
					borderColor: "#b4b4b4",
				},
				// 输入框颜色配置
				inputColorConfigToPassWord: {
					color: "#000000",
					disableColor: "#eee",
					borderColor: "#b4b4b4",
				},
				userName: "",
				password: "",
				status: false,
			};
		},
		//监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
		onInit() {},
		//监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
		onLoad() {},
		//监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		beforeDestroy() {},
		//页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		onReachBottom() {},
		onShareAppMessage() {},
		created() {},
		methods: {
			// 输入框聚焦变换边框样式
			UserNamePassWrodFocusBorderStyle() {
				this.inputColorConfigToUserName.borderColor = this.colorFocusColor;
			},
			PassWordFocusBorderStyle() {
				this.inputColorConfigToPassWord.borderColor = this.colorFocusColor;
			},
			// 输入框失去焦点变换边框样式
			UserNamePassWrodBlurBorderStyle() {
				this.inputColorConfigToUserName.borderColor = this.colorDefault;
			},
			PassWordBlurBorderStyle() {
				this.inputColorConfigToPassWord.borderColor = this.colorDefault;
			},
			login() {
				var TOKEN_KEY = 'authorization'
				var regPhone = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/; //不带区号校验
				var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				console.log(this.userName)
				if (
					this.userName != "" &&
				 !regEmail.test(this.userName)&& !regPhone.test(this.userName)
				) {
					uni.showToast({
						title: "请输入手机号 或 电子邮箱",
						icon: 'error',
						duration: 850
					});
					return
				}

				if (this.status) {
					this.$myRequest({
						url: '/user/save',
						method: 'post',
						data: {
							"openId": this.password,
							"tourist": 0,
							"userPhone": this.userName,
							"userName": this.userName,
						}
					}).then(res => {
						console.log("用户创建成功", res)
						if (res.data.code == 0) {
							if (res.data.status == 0) {
								uni.showToast({
									title: "已注册",
									icon: 'error',
									duration: 850
								});
								return
							}

							//直接登录
							this.$myRequest({
								url: '/login',
								method: 'post',
								data: {
									"userPhone": this.userName,
									"openId": this.password
								}
							}).then(res => {
								console.log("登录成功", res)
								if (res.data.code == 0) {
									uni.setStorageSync(TOKEN_KEY, res.data.token)

									this.$myRequest({
										url: '/getInfo',
										methed: 'get'
									}).then(res => {
										this.$user.id = res.data.user.id;
										this.$user.avatar = res.data.user.userProtrait;
										this.$user.userNikename = res.data.user.userNikename;
										uni.setStorageSync("userId", res.data.user.id)

										uni.showToast({
											title: "登录成功",
											icon: 'success',
											duration: 850
										});
										uni.switchTab({
											url: '/pages/disconver/disconver',
											complete(e) {
												console.log(e)
											}
										})
									})


									console.log(res)

								}
							})

						}
					})

				} else {
					//直接登录
					this.$myRequest({
						url: '/login',
						method: 'post',
						data: {
							"userPhone": this.userName,
							"openId": this.password
						}
					}).then(res => {
						console.log("登录成功", res)
						if (res.data.code == 0) {
							uni.setStorageSync(TOKEN_KEY, res.data.token)

							this.$myRequest({
								url: '/getInfo',
								methed: 'get'
							}).then(res => {
								this.$user.id = res.data.user.id;
								this.$user.avatar = res.data.user.userProtrait;
								this.$user.userNikename = res.data.user.userNikename;
								uni.setStorageSync("userId", res.data.user.id)
								uni.showToast({
									title: "登录成功",
									icon: 'success',
									duration: 850
								});
								uni.switchTab({
									url: '/pages/disconver/disconver',
									complete(e) {
										console.log(e)
									}
								})
							})


							console.log(res)

						}
					})

				}

			},
			updateStatus(e) {
				console.log(e)
				if (e == 0) {
					this.status = false;
				} else {
					this.status = true;
				}
			},

		},
	};
</script>
<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}

	.page {
		position: relative;
		height: 100vh;
	}

	.top-background-raduis {
		height: 30%;
		background-color: #d8d8d8;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
	}

	/deep/ .is-input-border {
		border-radius: 7px !important;
	}

	/deep/ .uni-easyinput__content {
		min-height: 39px !important;
	}

	.hj-input {
		margin-top: 15rpx;
	}

	.hj-input:nth-child(2) {
		margin-top: 35rpx;
	}

	.login-box {
		top: 20%;
		position: absolute;
		width: 80%;
		left: 10%;
		right: 10%;
		height: 550rpx;
		padding: 30rpx;
		background-color: white;
		border-radius: 40rpx;
		box-shadow: 9px 9px 6px #e3e3e3;

		.login-card-input {
			// background-color: violet;
			height: 50%;
			padding: 5rpx;
		}

		.login-card-title {
			height: 20%;
			// background-color: black;
			padding: 10rpx;
			display: flex;
			justify-content: center;

			.login-card-title-content {
				font-size: 1.2em;
				color: #3cb79a;
				border-bottom: 3px solid #3cb79a;
			}
		}

		.login-card-loginIn {
			height: 25%;
			display: flex;
			justify-content: center;
			padding: 10rpx;
			align-items: center;

			.login-card-loginIn-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #3cb79a;
				width: 100%;
				font-size: 1.2em;
				height: 80%;
				border-radius: 40rpx;
				color: white;
			}
		}

		.login-bottom-info {
			height: 5%;
			display: flex;
			font-size: 0.7em;
			color: #3cb79a;
			justify-content: end;

		}
	}

	.bottom-message {
		position: absolute;
		height: 70rpx;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		font-size: 0.9em;
		overflow: hidden;
		color: #969898;
		bottom: 40rpx;
	}
</style>

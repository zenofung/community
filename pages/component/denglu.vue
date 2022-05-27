<template>
	<view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view style="justify-content:flex-end;">
				<view style="justify-content:flex-end; text-align:right; padding:20upx;" @tap="closeBanner">
					<text class="uni-icon uni-icon-close"></text>
				</view>
			</view>
			<view>
				<image src="https://www.homiesocial.cn/static/miniImage/14a05903-3a4d-4dd0-9cda-5e3f1d9b50f5.jpg"
					style="width:100%;" mode="widthFix"></image>
			</view>
			<view style="padding:30upx 0; padding-bottom:68upx;">
				<button type='warn' open-type="getUserInfo" @getuserinfo="mpGetUserInfo" @click="userLogin()"
					style="background:#F6644D; margin:0 80upx;">登录</button>
				<view @click="tourist()" style="margin: 0 auto; text-align: center;color: #303133;"><text>游客登录>></text>
				</view>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>
<script>
	//保存登陆态
	var TOKEN_KEY = 'authorization'
	export default {
		data() {
			return {
				imgageUrl: '',
				nickname: '',
				bannerShow: true
			}
		},
		created() {
			var session = uni.getStorageSync(TOKEN_KEY)
			console.log("token", session)
			// 如果存在session，已经登陆
			if (session) {
				//检测当前用户登录态是否有效
				this.bannerShow = false;
			} else {
				this.bannerShow = true;
			}
		},
		onBackPress() { //app,h5 按返回键触发
			if (this.bannerShow) {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		},

		methods: {
			tourist: function() {
				let that = this
				console.log("游客登录")
				let rundom = that.rund()
				this.$myRequest({
					url: '/user/save',
					method: 'post',
					data: {
						"openId": rundom,
						"tourist": 1,
						"userPhone": rundom,
						"userName": rundom,
					}
				}).then(res => {
					console.log("创建游客成功", res)
					this.$user.id = res.data.user.id;
					uni.setStorageSync("userId", res.data.user.id)

					if (res.data.code == 0) {
						//直接登录
						this.$myRequest({
							url: '/login',
							method: 'post',
							data: {
								"userPhone": res.data.user.userName,
								"openId": res.data.user.openId
							}
						}).then(res => {
							console.log("登录成功", res)
							if (res.data.code == 0) {
								uni.setStorageSync(TOKEN_KEY, res.data.token)
								console.log(this.$user.id)
								that.bannerShow = false;
							}
						})

					}
				})
			},
			userLogin() {
				console.log("登录")
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			// closeBanner: function() {
			// 	uni.reLaunch({
			// 		url: '/pages/index/index'
			// 	});
			// },
			rund() {
				var code = '';
				//设置长度，这里看需求，我这里设置了4
				var codeLength = 6;

				//设置随机字符
				var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

				//循环codeLength 我设置的4就是循环4次
				for (var i = 0; i < codeLength; i++) {
					//设置随机数范围,这设置为0 ~ 36
					var index = Math.floor(Math.random() * 9);

					//字符串拼接 将每次随机的字符 进行拼接
					code += random[index];
				}
				return code;
			},
			mpGetUserInfo(result) {
				var that = this
				if (result.detail.errMsg === 'getUserInfo:ok') {
					//小程序返回登陆态，code等，后续需要调用自己的api处理
					uni.setStorageSync(SESSION_KEY, result.authResult)
					that.bannerShow = false;
				} else {
					uni.showModal({
						title: '请授权后查看'
					});
				}
			}
		}
	}
</script>

<style>
	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	/* 弹出层形式的广告 */
	.uni-banner {
		width: 80%;
		position: fixed;
		left: 50%;
		top: 50%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 9999;
		transform: translate(-50%, -50%);
	}
</style>

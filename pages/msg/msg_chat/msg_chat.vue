<template>
	<view>
		<scroll-view class="cu-chat contentbottoms">
			<view v-for="(item) in message" :key="item.magId">
				<view class="cu-item self" v-if="item.messageUser==0? true:false ">
					<view class="main">
						<view class="content bg-green shadow">
							<!-- 							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius"
								mode="widthFix"></image> -->
							<text>{{item.magContent}}</text>
						</view>
					</view>
					<view class="cu-avatar radius" :style="{'background-image': `url(${item.userVo.userProtrait})`}">
					</view>
					<view class="date">{{timestampFormat(item.createTime)}}</view>
				</view>
				<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
				<view class="cu-item" v-if="item.messageUser==0? false:true ">
					<view class="cu-avatar radius" :style="{'background-image': `url(${item.userVo.userProtrait})`}">
					</view>
					<view class="main">
						<view class="content shadow">
							<text>{{item.magContent}}</text>
						</view>
					</view>
					<view class="date "> {{timestampFormat(item.createTime)}}</view>
				</view>
			</view>
			<!-- 			<view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view> -->
			<!-- 			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			<!-- 			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			<!-- 			<view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 			<view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view> -->
		</scroll-view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @input='textChange' @blur="InputBlur" :value="context"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" v-on:click="sendMessage()">发送</button>
		</view>

	</view>
</template>

<script>
	import {
		articleUtil
	} from "../../../util/articleUtil.js";
	import {
		login,
		quit,
		onSocketMessage,
		sendSocketMessage
	} from "../../../util/websocket.js";
	export default {
		data() {
			return {
				listFlag: false,
				page: 1,
				totalPage: 0,
				hei: 0,
				InputBottom: 0,
				message: [],
				scrollH: 0,
				context: "",
				imMagListId: "",
				user: {
					status: 2,
					content: {
						userId: '',
						targetId: "login",
						magContent: "",
						imMagListId: "",
						messageUser: 0
					}
				}
			};
		},
		// onShow: function() {
		// 	this.scrollToBottom()
		// },
		mounted() {
			this.scrollToBottom();
		},
		//每次页面渲染完之后滚动条在最底部
		// updated: function() {
		// 	this.scrollToBottom();
		// },
		methods: {
			//滚动条自动定位到最低端
			scrollToBottom() {
				let that = this
				this.$nextTick(() => {
					uni.createSelectorQuery().select(".cu-chat").boundingClientRect((res) => {
						that.scrollH = res.height;
						console.log(that.scrollH)
						uni.pageScrollTo({
							duration: 100, // 过渡时间
							scrollTop: that.scrollH, // 滚动的实际距离
						})
					}).exec()
				})
			},

			sendMessage() {
				console.log("发送消息", this.$data.user)
				let contexts = {
					userId: this.$data.user.content.userId,
					targetId: this.$data.user.content.targetId,
					magContent: this.$data.context,
					imMagListId: this.$data.user.content.imMagListId,
					userVo: this.$data.user.content.userVo,
					messageUser: 0
				}
				this.$data.user.content.magContent = this.$data.context
				console.log("push内容", contexts)
				this.$data.message.push(contexts)
				console.log("发送内容", this.$data.user)
				sendSocketMessage(this.$data.user);
				this.context = ""
				this.scrollToBottom();

			},
			textChange: function(e) {
				var len = e.detail.value;
				if (len == null || len == '' || len == undefined) {
					this.sendState = true
				} else {
					this.sendState = false
				}
				this.context = e.detail.value;
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			timestampFormat(e) {
				return articleUtil.timestampFormat(e);
			},
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('message');
		},
		//下拉刷新
		onPullDownRefresh: function() {
			//模拟加载完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 200);
			

			console.log("上拉刷新")
			if (this.totalPage < this.page + 1) {
				uni.showToast({
					title: "暂无更多",
					icon: 'none',
					duration: 850
				})
				return
			}
			this.page = this.page + 1;
			this.$myRequest({
				url: '/immessage/list/',
				methed: 'get',
				data: {
					limit: 20,
					page: this.page,
					imList: this.imMagListId,
					userId: this.$user.id
				}
			}).then(res => {

				if (res.data.page.list.length < 20) {
					this.listFlag = true
				}
				let msg = res.data.page.list.reverse();
				console.log(msg)
				this.message.unshift(...msg)
				// this.message = [...msg,...this.message]
				if (res.data.page.list.length < 20) {
					this.listFlag = true
					let size=res.data.page.list.length
					console.log(size*100)
					this.$nextTick(() => {
						uni.createSelectorQuery().select(".cu-chat").boundingClientRect((res) => {
				
							uni.pageScrollTo({
								duration: 0, // 过渡时间
								scrollTop: size, // 滚动的实际距离
							})
							// this.scrollH = res.height;
						}).exec()
					})
				}else{
					this.$nextTick(() => {
						uni.createSelectorQuery().select(".cu-chat").boundingClientRect((res) => {
							console.log(res.height)
							uni.pageScrollTo({
								duration: 0, // 过渡时间
								scrollTop: this.scrollH, // 滚动的实际距离
							})
							this.scrollH = res.height;
								
						}).exec()
					})
				}
	
				
			})


		},
		// 页面滚动
		onLoad: function(e) {
			var that = this;
			that.$data.user.content.userId = this.$user.userId
			uni.$on('message', (res) => {
				console.log("监听函数接收", res)
				if (res.imMagListId == this.imMagListId) {
					that.$data.message.push(res)
					// this.scrollToBottom();
					this.scrollToBottom();
				}

			})
			if (e != null) {
				console.log(e.data)
				this.imMagListId = e.data
				this.$myRequest({
					url: '/immessage/list/',
					methed: 'get',
					data: {
						limit: 20,
						page: 1,
						imList: e.data,
						userId: this.$user.id
					}
				}).then(res => {
					this.message = res.data.page.list.reverse();
					console.log(this.message)
					this.totalPage = res.data.page.totalPage;
					this.scrollToBottom();
					// this.$set(this.$data.list,"list",res.data.page.list)
				})
				this.$myRequest({
					url: '/immessagelist/info/' + e.data,
					methed: 'get',
					data: {
						userId: this.$user.id
					}
				}).then(res => {
					this.$data.user.content.userId = this.$user.id
					if (this.$user.id == res.data.imMessageList.userId) {
						this.$data.user.content.targetId = res.data.imMessageList.friendId
					} else {
						this.$data.user.content.targetId = res.data.imMessageList.userId
					}
					this.$data.user.content.imMagListId = res.data.imMessageList.id
					this.$data.user.content.userVo = res.data.imMessageList.userVo

					console.log("通道信息", this.$data.user.content)
					// this.$set(this.$data.list,"list",res.data.page.list)
				})

			}

		},
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}

	.contentbottoms {
		padding-bottom: calc(var(--window-bottom) + 20px);
	}
</style>

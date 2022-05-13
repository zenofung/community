<template>
	<view>
		<view class="cu-chat">
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
		</view>

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
				InputBottom: 0,
				message: [],
				context: "",
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
		methods: {
			sendMessage() {
				this.$data.user.content.magContent = this.$data.context
				console.log("发送消息", this.$data.user)
				sendSocketMessage(this.$data.user);
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
		onLoad: function(e) {
			var that = this;
			var that=this;
			that.$data.user.content.userId= this.$user.userId
			uni.onSocketMessage(function(res) {
				var data = JSON.parse(res.data);
				console.log("聊天界面接收", data)
				if (data.msg == "2") {
					that.$data.message.push(data.content)
				}
			});
			if (e != null) {
				console.log(e.data)
				this.$myRequest({
					url: '/immessage/list/',
					methed: 'get',
					data: {
						limit: 5,
						page: 1,
						imList: e.data,
						userId: this.$user.id
					}
				}).then(res => {
					this.message = res.data.page.list.reverse();
					console.log(this.message)
					// this.$set(this.$data.list,"list",res.data.page.list)
				})
				this.$myRequest({
					url: '/immessagelist/info/' + e.data,
					methed: 'get',
				}).then(res => {
					this.$data.user.content.userId=this.$user.id
					if(this.$user.id==res.data.imMessageList.userId){
						this.$data.user.content.targetId=res.data.imMessageList.friendId
					}else{
						this.$data.user.content.targetId=res.data.imMessageList.userId
					}
					this.$data.user.content.imMagListId = res.data.imMessageList.id
					this.$data.user.content.targetVo = res.data.imMessageList.targetVo
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
</style>

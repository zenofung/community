<template>
	<view>

		<!-- 自定义导航栏 -->
		<!-- <cu-custom   bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom> -->
		<!-- end -->

		<!-- 头部消息 
		<view class='bc ' >
		    <text class='txt_1'></text>
		    <view class='kuai'>
		      <view class='interactive' >
		        <image class='imgs' src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image>
		        <text>互动消息</text>
		      </view>
		      <view class='notice' @tap='notice' >
		        <image class='imgs' src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image>
		        <text>通知消息</text>
		      </view>
		      <view class='logistics' @tap='toLogistics'>
		        <image class='imgs' src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image>
		        <text>交易物流</text>
		      </view>
		    </view>
		  </view>
		头部消息end -->


		<!-- 聊天消息 -->
		<view class="contentbottom cu-list menu-avatar  card-menu martop content">

			<!-- <view class="cu-item">
				<view class="cu-avatar round lg"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
					<view class="cu-tag badge">99+</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<text class="text-cut">松合时代商城</text>
						<view class="cu-tag round bg-orange sm">6人</view>
					</view>
					<view class="text-gray text-sm flex">
						<text
							class="text-cut">塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。</text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view> -->
					<!-- <view class="cuIcon-notice_forbid_fill text-gray"></view> -->
	<!-- 			</view>
			</view>
 -->
			<view class="cu-item " v-for="(itme) in imMessageList" :key="itme.id"
				v-bind:class="{'grayscale': itme.onLine==0}" @tap="toMsgChat(itme.id)">
				<view class="cu-avatar round lg" :style="{'background-image': `url(${itme.userVo.userProtrait})`}"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);">
					
				</view>
				<view class="content">
					<view class="text-grey">{{itme.userVo.userNikename}}</view>
					<view class="cu-tag round bg-orange sm" :style="{display:(itme.onLine==0?'':'none')}">断开连接...</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							{{itme.imMessageEntityLast.magContent?itme.imMessageEntityLast.magContent:''}}
						</text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{ timestampFormat(itme.imMessageEntityLast.createTime) }}</view>
					<view class="cu-tag round bg-red sm" :style="{display:(itme.unread==0?'none':'')}">{{ itme.unread }}</view>
				</view>
			</view>


			<!-- 		    <view class="cu-item ">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
		      <view class="content">
		        <view class="text-pink">
		          <text class="text-cut">莫甘娜</text>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut">凯尔，你被自己的光芒变的盲目！</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cu-tag round bg-red sm">5</view>
		      </view>
		    </view>
		
		    <view class="cu-item grayscale">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></view>
		      <view class="content">
		        <view>
		          <text class="text-cut">伊泽瑞尔</text>
		          <view class="cu-tag round bg-orange sm">断开连接...</view>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut"> 等我回来一个打十个</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cu-tag round bg-red sm">5</view>
		      </view>
		    </view>
		    <view class="cu-item cur">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
		        <view class="cu-tag badge"></view>
		      </view>
		      <view class="content">
		        <view>
		          <text class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</text>
		          <view class="cu-tag round bg-orange sm">6人</view>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cuIcon-notice_forbid_fill text-gray"></view>
		      </view>
		    </view> -->
		</view>
		<!-- 聊天消息end -->


	</view>
</template>

<script>
	import {
		articleUtil
	} from "../../util/articleUtil.js";
	import {
		login,
		quit,
		onSocketMessage,
		sendSocketMessage
	} from "../../util/websocket.js";
	export default {
		data() {
			return {
				listFlag: false,
				page: 1,
				totalPage: 0,
				imMessageList: [],
				timer: null // 定时器名称  
			}
		},
		onShow() {
			this.listFlag= false;
			this.page= 1,
			this.totalPage= 0,
			this.$myRequest({
				url: '/immessagelist/list',
				methed: 'get',
				data: {
					limit: 5,
					page: 1,
					userId: this.$user.id
				}
			}).then(res => {
				console.log("列表数据",res)
				this.$data.imMessageList = res.data.page.list
				this.totalPage = res.data.page.totalPage;
				
			})
		},
		//上拉刷新
		onReachBottom: function() {
			console.log("上拉",this.totalPage)
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
				url: '/immessagelist/list',
				methed: 'get',
				data: {
					limit: 5,
					page: this.page,
					userId: this.$user.id
				}
			}).then(res => {
				console.log("下拉返回数据",res)
				if (res.data.page.list.length < 5) {
					this.listFlag = true
				}
				this.imMessageList = [...this.imMessageList, ...res.data.page.list]
		
		
				// this.$data.list.add(res.data.page.list)
				// console.log(this.$data.list)
				// this.$set(this.$data.list,"list",res.data.page.list)
		
			})
		
		
		},
		onLoad: function() {
			var that = this;
			//登录
			login(this.$user.id)
			//接收消息
			uni.onSocketMessage(function(res) {
				const e = JSON.parse(res.data)
				console.log("主界面接收", e)
				if (e.msg == "1" || e.msg == "0") {
					that.logins(e)
				} else if (e.msg == "2") {
					uni.$emit('message',e.content);
					console.log(e.content.imMagListId)
					that.imMessageList.forEach(function(item,index){
						if(item.id==e.content.imMagListId){
							item.unread=item.unread+1
							console.log(item,index)
							item.imMessageEntityLast=e.content
						}
					})
					
					// that.$myRequest({
					// 	url: '/immessagelist/info/'+e.content.imMagListId,
					// 	methed: 'get',
					// }).then(res => {
					// 	console.log("返回通道", res.data.imMessageList)
					// 	that.$data.imMessageList.push(res.data.imMessageList)
					// })
					
				}

			});

		},

		destroyed: function() {
			quit();
		},

		methods: {
			//好友登录
			logins(e) {
				console.log("好友登录", e)
				for (let [index, meg] of this.$data.imMessageList.entries()) {
					if (e.loginUser.id == meg.userVo.id) {
						this.$set(this.$data.imMessageList[index], "onLine", e.loginUser.loginStatus)
						console.log(this.$data.imMessageList[index])
					}
				}

			},

			// 跳转到聊天界面
			toMsgChat: function(e) {
				console.log(e)
				uni.navigateTo({
					url: "/pages/msg/msg_chat/msg_chat?data=" + e
				})
			},
			timestampFormat(e) {
				return articleUtil.timestampFormat(e);
			},
			// 通知消息点击
			notice: function() {
				uni.navigateTo({
					url: "/pages/msg/msg_inform/msg_inform"
				})
			},
			// 跳转交易物流详细页面
			toLogistics: function() {
				uni.navigateTo({
					url: "/pages/msg/msg_logistics_all/msg_logistics_all"
				})
			}
		}
	}
</script>

<style>
	/* pages/message/message.wxss */
	/* <!-- 头部消息 --> */
	.bc {
		width: 100%;
		height: 200rpx;
		background: linear-gradient(10deg, #ffe1ff, #1cbbb4);
	}

	.txt_1 {
		margin-left: 30rpx;
		color: white;
	}

	.kuai {
		width: 700rpx;
		height: 200rpx;
		background-color: white;
		margin-top: 50rpx;
		margin-left: 25rpx;
		border-radius: 50rpx;
		box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(128, 128, 128, 0.384);
		display: flex;
		flex-direction: row;
	}

	.interactive {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 100rpx;
	}

	.imgs {
		margin-left: 10rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.notice {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 100rpx;
	}

	.logistics {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: black;
		width: 130rpx;
		height: 150rpx;
		margin-top: 60rpx;
		margin-left: 80rpx;
	}

	/* <!-- 头部消息end --> */


	/* 聊天消息 */
	.martop {
		margin-top: 115rpx;
	}

	/* 聊天消息end */
</style>

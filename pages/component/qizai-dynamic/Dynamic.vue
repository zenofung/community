<template>
	<view class="dynamic" @click="clickDynamic()">
		<view class="user__container">
			
			<view class="user__header-warp">
				<!-- 头像组 -->
				<view class="user__header" @click.stop="clickUser()">
					<image class="user__header-image" :src="avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user__content">
				<view class="user__content-main">
					<text class="user__content-title uni-ellipsis" @click.stop="clickUser()">{{ name }}</text>
					<text class="user__content-note uni-ellipsis">{{ timestampFormat(publishTime) }}</text>
				</view>
				<view class="user__content-extra" @click.stop="clickFocus()">
					<slot>
						<text :class="isFocusOn?'user__focus-on':'user__focus-off'">{{isFocusOn?'已关注':'关注' }}</text>
					</slot>
				</view>
			</view>
		</view>


		<view class="text">{{content}}</view>
		<view class="allImage">
			<!-- style 三目运算 -->
			<!-- {{imgList.length}} :style="{'desplay': (imgList.length == 0 ? 'none':'block')}" -->
			<view class="imgList">
				<view class="images" @tap="previewImg" :data-index="index" v-for="(item,index) in imgList" :key="index">
					<image class="oneimg" :src="item" mode="aspectFill"
						:style="{width:imgWidth+'px','max-height':imgHeight+'px'}"></image>
				</view>
			</view>
		</view>
		<view class="operate" :style="'width: 100%;display:'+operateDisplay">
			<uni-grid :column="4" :showBorder="false" :square="false">
				<uni-grid-item>
			  <span style="color:gray" @click.stop="clickThumbsup()">

						<uni-icons type="hand-up" size="18" style="margin-right: 2px;" v-if="!isLike"></uni-icons>
						<uni-icons type="hand-up-filled" size="18" style=" color: #FF0000 ; margin-right: 2px;"
							v-if="isLike"></uni-icons>
						{{likeNumber?likeNumber:''}}
					</span>
				</uni-grid-item>
				<uni-grid-item>
					<span style="color:gray" @click.stop="clickChat()">
						<uni-icons type="chat" size="18" style="margin-right: 2px;color:gray"></uni-icons>
						{{chatNumber.length?chatNumber.length:''}}
					</span>
				</uni-grid-item>
				<uni-grid-item v-if="userId==userIds? false:true">
					<span style="color:gray" @click.stop="clickGiveReward()">
						<uni-icons type="weixin" size="18" style="margin-right: 2px;"></uni-icons>
						{{"私信"}}
					</span>
				</uni-grid-item>
				<uni-grid-item>
					<!-- 分享 -->
					<span style="color:gray" @click.stop="fenxiang()">
						<uni-icons type="redo" size="18" style="margin-right: 2px;"></uni-icons>
						{{"分享"}}
					</span>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="bottom-line"></view>
		
	</view>
</template>

<script>
	export default {
		props: {
			userId: {
				type: String
			},
			avatar: {
				type: String
			},
			name: {
				type: String
			},
			publishTime: {
				type: String
			},
			isFocusOn: {
				type: Boolean
			},
			content: {
				type: String
			},
			imgList: {
				type: Array
			},
			isLike: {
				type: Boolean
			},
			isGiveReward: {
				type: Boolean
			},
			likeNumber: {
				type: Number
			},
			giveRewardNumber: {
				type: Number
			},
			chatNumber: {
				type: Array
			},
			userNoShow: {
				type: Boolean
			},
			operateNoShow: {
				type: Boolean
			}
		},
		data() {
			return {
				userIds: this.$user.id,
				windowWidth: 0, //屏幕可用宽度
				windowHeight: 0, //屏幕可用高度
				imgWidth: 0, //图片宽度
				imgHeight: 0, //图片高度
				heartColor: 'gray',
				userDisplay: 'block',
				operateDisplay: 'block',
			}
		},
		mounted() {
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight;
			this.windowWidth = res.windowWidth;

			if (this.userNoShow) {
				this.userDisplay = 'none';
			}
			if (this.operateNoShow) {
				this.operateDisplay = 'none';
			}

			this.judgeImg();
			this.initOperate();
		},

		methods: {
			// 预览图片
			previewImg(e) {
				var index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.imgList[index], //当前图片地址
					urls: this.imgList, //所有要预览的图片的地址集合 数组形式
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			initOperate() {
				if (this.isLike) this.thumbsupColor = '#fb5f5f';
				if (this.isGiveReward) this.heartColor = '#fb5f5f';
			},
			// 自适应判断
			judgeImg() {
				if (this.imgList.length == 1) {
					this.imgWidth = this.windowWidth * 2 / 3;
					this.imgHeight = this.windowHeight * 3 / 5;
				} else if (this.imgList.length == 4) {
					this.imgWidth = this.windowWidth / 3.3;
					this.imgHeight = this.imgWidth;
				} else {
					this.imgWidth = this.windowWidth / 3.4;
					this.imgHeight = this.imgWidth;
				}
			},
			timestampFormat(timestamp) {

				var timestamp = new Date(timestamp).getTime() / 1000
				if (!timestamp) return '';

				function zeroize(num) {
					return (String(num).length == 1 ? '0' : '') + num;
				}

				var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
				var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

				var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
				var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

			 var Y = tmDate.getFullYear(),
					m = tmDate.getMonth() + 1,
					d = tmDate.getDate();
				var H = tmDate.getHours(),
					i = tmDate.getMinutes(),
					s = tmDate.getSeconds();

				if (timestampDiff < 60) { // 一分钟以内
					return "刚刚";
				} else if (timestampDiff < 3600) { // 一小时前之内
					return Math.floor(timestampDiff / 60) + "分钟前";
				} else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
					return '今天' + zeroize(H) + ':' + zeroize(i);
				} else {
					var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
			 	if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
						return '昨天' + zeroize(H) + ':' + zeroize(i);
					} else if (curDate.getFullYear() == Y) {
						return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
					} else {
						return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
					}
				}
			},

			/** 触发父级事件 */
			// 点击动态
			clickDynamic() {
				this.$emit('clickDynamic');
			},
			// 点击用户信息
			clickUser() {
				this.$emit('clickUser');
			},
			// 点击关注
			clickFocus() {
				this.$emit('clickFocus');
			},
			// 点赞
			clickThumbsup() {
				this.$emit('clickThumbsup');
			},
			//  点击聊天
			clickGiveReward() {
				this.$emit('clickGiveReward');
			},
			// 
			clickChat() {
				this.$emit('clickChat');
			}
		}
	}
</script>

<style>
	/* 想法图片排列样式 */
	.uni-list-chat__content-extra-text {
		color: #007AFF;
	}

	.dynamic {
		width: 100%;
	}

	.allImage {
		display: flex;
		margin-top: 10rpx;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.imgList {
		margin: 0 3%;
	}

	.images:not(:nth-child(3n)) {
		/* margin-right: 10rpx; */
	}

	.text {
		margin: 1% 3% 2%;
	}

	.images {
		margin-right: 10rpx;
		display: inline-block;
	}

	.operate {
		width: 94%;
		padding: 3%;
		font-size: 14px;
	}

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}

	.bottom-line {
		border-bottom: 10px solid #efefef;
	}


	.user__container {
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		/* -webkit-flex-direction: row; */
		flex-direction: row;
		-webkit-box-flex: 1;
		/* -webkit-flex: 1; */
		flex: 1;
		padding: 10px 15px;
		position: relative;
		overflow: hidden;
	}

	.user__header {
		display: flex;
		width: 45px;
		height: 45px;
		-webkit-border-radius: 5px;
		border-color: #eee;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		border-radius: 50px;
	}

	.user__header-image {
		display: flex;
		align-content: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		width: 45px;
		height: 45px;
		border-radius: 5px;
		border-color: #eee;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
	}

	.user__content {
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-box-flex: 1;
		flex: 1;
		overflow: hidden;
		padding: 2px 0;
	}

	.user__content-main {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding-left: 10px;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		overflow: hidden;
	}

	.user__content-note {
		margin-top: 3px;
		color: #999;
		font-size: 12px;
		font-weight: normal;
		overflow: hidden;
	}

	.user__focus-on {
		padding: 3px 10px;
		border: 1px solid #fb5f5f;
		color: #fb5f5f;
		display: flex;
		font-size: 14px;
		border-radius: 3px;
	}

	.user__focus-off {
		padding: 3px;
		color: gray;
		font-size: 14px;
	}
</style>

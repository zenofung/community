<template>
	<view>
		<!-- 头部 -->

		<view class='pg'>
			<!-- 评论内容 -->
			<view class='padding shadow-warp  bg-white comment-content'>
				<view class='comment-content-1'>
					<view class='comment-content-1_image'>
						<image :src="comment.userVo.userProtrait"></image>
					</view>
					<view class='comment-content-1_2'>
						<text class='text-black'>{{comment.userVo.userNikename}}</text>
					</view>
					<view>
						<span @click.stop="clickThumbsup2(comment.id)">
							<uni-icons type="hand-up" size="18" style="margin-right: 2px;" v-if="!comment.praiseStatus">
							</uni-icons>
							<uni-icons type="hand-up-filled" size="18" style=" color: #FF0000 ; margin-right: 2px;"
								v-if="comment.praiseStatus"></uni-icons>
							{{comment.praises?comment.praises:""}}
						</span>
					</view>
				</view>

				<view class='comment-content-2'>
					<view class='comment-content-2_1'>
						<image class='comment-content-2_1_img' src='../../../static/img/hot_evaluate1.png'></image>
						<text class='text-black text-df text-weight'> {{comment.content}}</text>
					</view>
					<view class='comment-content-2_2 margin-top-sm'>
						<text class='text-xs text-grey'>{{ timestampFormat(comment.createTime) }}</text>
					</view>
				</view>
			</view>

			<!-- 评论标题 -->
			<view class='comment  padding-sm bg-white'>
				<text>全部评论 * {{comment.comComEntityList.length}}</text>
			</view>
			<!-- end -->

			<!-- 评论内容 -->
			<view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in comment.comComEntityList"
				:key="index">
				<view class='comment-content-1'>
					<view class='comment-content-1_image'>
						<image :src="item.twoUserVo.userProtrait"></image>
					</view>
					<view class='comment-content-1_2'>
						<text class='text-black'>{{item.twoUserVo.userNikename}}</text>
					</view>
					<view>
						<span @click.stop="clickThumbsup(item.id,index)">
							<uni-icons type="hand-up" size="18" style="margin-right: 2px;" v-if="!item.praiseStatus">
							</uni-icons>
							<uni-icons type="hand-up-filled" size="18" style=" color: #FF0000 ; margin-right: 2px;"
								v-if="item.praiseStatus"></uni-icons>
							{{item.praises?item.praises:""}}
						</span>
					</view>
				</view>

				<view class='comment-content-2'>
					<view class='comment-content-2_1'>
						<text class='text-black text-df text-weight'>{{item.comContext}}</text>
					</view>
					<view class='comment-content-2_2 margin-top-sm'>
						<text class='text-sm'>{{ timestampFormat(comment.createTime) }}</text>
					</view>

				</view>
			</view>
			<!--评论内容 end -->


		</view>
		<!-- end -->

		<!--  -->
		<view class='lines'></view>
		<!--  -->

		<!-- 底部操作卡 -->
		<view class=' bg-white'>

			<view class='msg_bottom bg-white'>
				<view class='msg_bottom-1'>
					<input @input='textChange' name='msg' placeholder='觉得不错说两句~~' cursor-spacing="10"
						:value="content"></input>
				</view>

				<view class='msg_bottom-2'>
					<button class="cu-btn round  bg-green" role="button" aria-disabled="false" :disabled='sendState'
						@click="comcomSave">发送</button>
				</view>

			</view>
		</view>
		<!-- 底部操作卡end -->



	</view>
</template>

<script>
	import {
		articleUtil
	} from "../../../util/articleUtil.js";
	export default {
		data() {
			return {
				comment: {
					comComEntityList: {},
					userVo: {}
				},
				content: "",
				// 发送按钮状态
				sendState: true, //默认不能点击
			}
		},
		methods: {
			// 监听文字改变 发送按钮样式
			textChange: function(e) {
				var len = e.detail.value;
				if (len == null || len == '' || len == undefined) {
					this.sendState = true
				} else {
					this.sendState = false
				}
				this.content = e.detail.value;
			},
			timestampFormat(e) {
				return articleUtil.timestampFormat(e);
			},

			//二级评论
			comcomSave(e) {
				this.$myRequest({
					url: '/comcom/save',
					method: 'post',
					data: {
						"comId": this.comment.id,
						"comIdTwo": 0,
						"userId": this.$user.id,
						"userIdTwo": this.comment.userId,
						"userName": this.comment.userVo.userNikename,
						"comContext": this.content
					}
				}).then(res => {

					uni.showToast({
						title: "评论成功",
						icon: 'exception',
						duration: 850
					})
					this.$myRequest({
						url: '/article/infoCom/' + this.comment.id + '/' + this.$user.id,
						methed: 'get'
					}).then(res => {
						this.$data.comment = res.data.comment
						console.log(this.$data.comment)
						this.content=""
						// this.$set(this.$data.list,"list",res.data.page.list)

					})

				})



			},

			clickThumbsup2(e) {
				console.log(this.$data.comment.praiseStatus)
				this.$set(this.$data.comment, "praiseStatus", !this.$data.comment
					.praiseStatus);
				if (this.$data.comment.praiseStatus) {
					this.$myRequest({
						url: '/commentpraise/save',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"commentId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.comment, "praises", this.$data.comment.praises + 1);

						}

					})

				}
				if (!this.$data.comment.praiseStatus) {
					this.$myRequest({
						url: '/commentpraise/delete',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"commentId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.comment, "praises", this.$data.comment.praises - 1);
						}

					})

				}

			},
			clickThumbsup(e, index) {
				console.log(this.$data.comment.comComEntityList[index]);
				console.log(index);

				this.$set(this.$data.comment.comComEntityList[index], "praiseStatus", !this.$data.comment.comComEntityList[
						index]
					.praiseStatus);
				if (this.$data.comment.comComEntityList[index].praiseStatus) {
					this.$myRequest({
						url: '/comcompraise/save',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"comComId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.comment.comComEntityList[index], "praises", this.$data.comment
								.comComEntityList[index].praises + 1);

						}

					})

				}
				if (!this.$data.comment.comComEntityList[index].praiseStatus) {
					this.$myRequest({
						url: '/comcompraise/delete',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"comComId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.comment.comComEntityList[index], "praises", this.$data.comment
								.comComEntityList[index].praises - 1);
						}

					})

				}

				console.log(this.$data.comment.comComEntityList[index].praiseStatus);
				console.log('childThumbsup');
			},


			onLoad: function(e) {
				if (e != null) {
					this.$myRequest({
						url: '/article/infoCom/' + e.data + '/' + this.$user.id,
						methed: 'get'
					}).then(res => {
						this.$data.comment = res.data.comment
						console.log(this.$data.comment)

						// this.$set(this.$data.list,"list",res.data.page.list)

					})

				}

			},
		}
	}
</script>

<style>
	.pg {
		padding: 20rpx 20rpx 20rpx 20rpx;
	}

	.radius-sm {
		border-radius: 20rpx;
	}


	/* 评论 */
	.comment {
		margin-top: 20rpx;
		width: 100%;
		height: 100rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.comment {
		color: black;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}

	/* end */


	/* 评论内容 */
	.comment-content {
		width: 100%;
		height: auto;
		/* margin-top: 20rpx; */

	}

	.comment-content-2_1_img {
		height: 36rpx;
		width: 65rpx;
		line-height: 40rpx;
	}

	.comment-content-1 {
		display: flex;
		align-items: center;
	}

	.comment-content-1_image image {
		height: 50rpx;
		width: 50rpx;
		border-radius: 100%;
	}

	.comment-content-1_2 {
		margin-left: 20rpx;
		width: 80%;
	}

	.comment-content-2 {
		margin-left: 10%;
	}

	/* end */




	/* line */
	.line {
		width: 100%;
		height: 0.5rpx;
		background: gainsboro;
		margin-top: 20rpx;
	}

	/* end */


	/* 底部选项卡 */
	.msg_bottom {
		padding: 20rpx;
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}

	.lines_msg {
		display: flex;
		height: 10rpx;
	}

	.msg_bottom-1 {
		width: 80%;
		background: #f1f1f1;
		border-radius: 40rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
		display: flex;
		align-items: center;
	}

	.msg_bottom-1 input {
		width: 100%;
	}

	.msg_bottom-2 {
		width: 20%;
		margin-left: 20rpx;
	}

	.text-icon {
		font-size: 45rpx;
	}

	.text-char {
		font-size: 35rpx;
	}

	/* end */

	.lines {
		display: flex;
		height: 150rpx;
	}
</style>

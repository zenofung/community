<template>
	<view>
		<!-- 头部 -->
		<view class='pg'>

			<view class='user-top  padding-sm bg-white '>

				<view class='user-top-1'>
					<image :src="article.userVo.userProtrait"></image>
				</view>
				<view class='user-top-2'>
					<view class='user-top-2_1'>
						<text class='text-df text-black text-weight'>{{article.userVo.userNikename}}</text>
					</view>
					<view>
						<text class='text-xs text-grey'>{{ timestampFormat(article.createTime) }}</text>
					</view>
				</view>
				<view class='user-top-3'>
					<button bindtap='attention' @click="clickFocus(article.attentionStatus,article.userVo.id)"
						class="cu-btn round line-black" role="button"
						aria-disabled="false">{{article.attentionStatus?"已关注":"+关注"}}</button>
				</view>
			</view>

			<!-- 文字内容 -->
			<view class='character  padding-sm bg-white'>
				<text>{{article.content}}</text>
			</view>
			<!-- end -->

			<!-- 九宫图 -->
			<view class='container-grid padding-sm bg-white'>
				<view @tap='previewImg' :data-index="index"
					:class=" index == 2 || index == 5 || index == 8  ? '' : imgArr.length == 4 ?'' : imgArr.length == 1 ? 'container-grid_image-1':'container-grid_image' "
					:style="imgArr.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(item,index) in imgArr"
					:key="index">
					<image :src='item' :style=" imgArr.length == 1 ? 'width:100%;' :'' "
						:class=" imgArr.length == 1 ? 'container-grid_img' : 'container-grid__image' "></image>
					<!-- style=width:32% container-grid_image-->
				</view>
			</view>
			<!-- end -->

			<!-- 流量数量 -->
			<!-- 		  <view class='browse shadow-warp  padding-sm bg-white'>
		    <view class="cu-avatar-group">
		      <view class="cu-avatar img-size round lg" v-for="(item,index) in 3" :key="item" :style=" 'background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big1000' + [index+1] +'.jpg);' "></view>
		    </view>
		    <view class='browse-2'>
		      <text>2人赞过</text>
		    </view>
		
		    <view>
		      <text>15天前发布*浏览12</text>
		    </view>
		  </view> -->

			<!-- 评论标题 -->
			<!-- 		    <view class='comment  padding-sm bg-white'>
		      <text>热门评论 * 16</text>
		    </view> -->
			<!-- end -->


			<!-- 仅在小程序上面出现 -->
			<!-- #ifdef MP  -->
			<!-- 热门评论内容 -->
			<!--  <view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in discuss" :key="index">
		      <view class='comment-content-1'>
		        <view class='comment-content-1_image'>
		          <image :src='item.image'></image>
		        </view>
		        <view class='comment-content-1_2'>
		          <text class='text-black'>{{item.name}}</text>
		        </view>
		        <view>
		          <text class='cuIcon-appreciate lg text-gray'></text>{{item.cook}}</view>
		      </view>
		  
		      <view class='comment-content-2'>
		        <view class='comment-content-2_1'>
		          <image class='comment-content-2_1_img' :src='item.hotImg'></image>
		          <text class='text-black text-df text-weight'> {{item.center}}</text>
		        </view>
		        <view class='comment-content-2_2 margin-top-sm'>
		          <text class='text-sm'>{{item.time}}</text>
		        </view>
		  
		        <view class='leave '>
		          <view class='leave-item' v-for="(item,index) in 2" :key="index">
		            <text>黑色天空中的月亮：1231231231212312312312123123123121231231231212312312312</text>
		          </view>
		          <view class='margin-top-sm' @tap='toDiscover_desc'>
		            <text class='text-blue'>查看186条回复 ></text>
		          </view>
		        </view>
		  
		      </view>
		  
		  <!-- 热门评论end -->

			<!-- </view> -->

			<!-- #endif -->


			<!-- h5 原生Android上面显示 -->
			<!-- #ifndef APP-PLUS  -->
			<!-- 热门评论内容 -->
			<!-- 		     <view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in discuss" :key=" 'idA' + index">
		       <view class='comment-content-1'>
		         <view class='comment-content-1_image'>
		           <image :src='item.image'></image>
		         </view>
		         <view class='comment-content-1_2'>
		           <text class='text-black'>{{item.name}}</text>
		         </view>
		         <view>
		           <text class='cuIcon-appreciate lg text-gray'></text>{{item.cook}}</view>
		       </view>
		   
		       <view class='comment-content-2'>
		         <view class='comment-content-2_1'>
		           <image class='comment-content-2_1_img' :src='item.hotImg'></image>
		           <text class='text-black text-df text-weight'> {{item.center}}</text>
		         </view>
		         <view class='comment-content-2_2 margin-top-sm'>
		           <text class='text-sm'>{{item.time}}</text>
		         </view>
		   
		         <view class='leave '>
		           <view class='leave-item' v-for="(item,index) in 2" :key=" 'idB' + index">
		             <text>黑色天空中的月亮：1231231231212312312312123123123121231231231212312312312</text>
		           </view>
		           <view class='margin-top-sm' @tap='toDiscover_desc'>
		             <text class='text-blue'>查看186条回复 ></text>
		           </view>
		         </view>
		   
		       </view>
		   -->
			<!-- 热门评论end -->
			<!-- </view> -->
			<!-- #endif -->


			<!-- 评论标题 -->
			<view class='comment  padding-sm bg-white'>
				<text>全部评论 * {{article.commentEntitySize}}</text>
			</view>
			<!-- end -->


			<!-- 评论内容 -->
			<view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in article.commentEntity"
				:key="index">
				<view class='comment-content-1'>
					<view class='comment-content-1_image'>
						<image :src="item.userVo.userProtrait"></image>
					</view>
					<view class='comment-content-1_2'>
						<text class='text-black'>{{item.userVo.userNikename}}</text>
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
						<text class='text-black text-df text-weight'>{{item.content}}</text>
					</view>
					<view class='comment-content-2_2 margin-top-sm'>
						<text class='text-sm'>{{ timestampFormat(item.createTime) }}</text>
					</view>

					<view class='leave'>
						<view class='leave-item' v-for="(item2,index) in item.comComEntityList.slice(-3)" :key="index">
							<text>{{item2.userVo.userNikename}} : {{item2.comContext}}</text>
						</view>
						<view class='margin-top-sm' @tap='toDiscover_desc(item.id)'>
							<text class='text-blue'>查看底部{{item.comComEntityList.length}}消息 ></text>
						</view>
					</view>
				</view>
			</view>
			<!-- end -->


			<!-- padding30 margin30 end -->
		</view>

		<!--  -->
		<view class='lines'></view>
		<!--  -->
		<!-- 底部操作卡 -->
		<view class=' bg-white'>

			<view class='msg_bottom bg-white'>
				<view class='msg_bottom-1'>
					<input name='msg' placeholder='觉得不错说两句~~' cursor-spacing='10' @input="textareaAInput" :value="content" ></input>
				</view>
				<view class='msg_bottom-2'>
					<button class="cu-btn round  bg-green" role="button" aria-disabled="false" :disabled='sendState'
						@click="commentSave()">发送</button>
				</view>
				<view class='msg_bottom-2'>
					<text class='cuIcon-message text-icon  lg text-black'></text>
					<text class='text-char'>{{article.commentEntitySize}} </text>
				</view>
				<view class='msg_bottom-3'>
					<text class='cuIcon-appreciate text-icon lg text-black'></text>
					<text class='text-char'> {{article.praises}}</text>
				</view>
			</view>


		</view>




	</view> 
</template>
<script>
	import {
		articleUtil
	} from "../../../util/articleUtil.js"; 
	export default {
		data() {
			return {
				article: {
					userVo: {},
					attentionStatus: '',
					commentEntitySize: {}

				},
				artId: "",
				commentSize: 17,
				//图片
				imgArr: [],
				content: "",
				sendState: true, //默认不能点击
				// end
				// 评论内容
				// discuss: [{
				// 		id: 1,
				// 		image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				// 		name: "Amibition",
				// 		cook: "1008",
				// 		hotImg: "../../../static/img/hot_evaluate1.png",
				// 		center: " gadsgdfgsdf",
				// 		time: "1分钟前"
				// 	},
				// 	{
				// 		id: 2,
				// 		image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				// 		name: "Amibition",
				// 		cook: "1008",
				// 		hotImg: "../../../static/img/hot_evaluate1.png",
				// 		center: " 阿斯顿发顺丰撒阿斯顿发顺丰撒阿斯顿发顺丰撒阿斯顿发顺丰撒阿斯顿发顺丰撒",
				// 		time: "1分钟前"
				// 	}
				// ]
			}
		},
		methods: {
			onLoad: function(e) {
				console.log("userId",this.$user.id)
				

				if (e != null) {
					this.$myRequest({
						url: '/article/info/' + e.data + '/' + this.$user.id,
						methed: 'get'
					}).then(res => {
						this.$data.article = res.data.article
						this.$data.imgArr = res.data.article.images==""?"":res.data.article.images.split(",")
						this.$data.article.commentEntitySize = res.data.article.commentEntity.length
						console.log(this.$data.article.commentEntity)

						// this.$set(this.$data.list,"list",res.data.page.list)

					})
					this.artId = e.data

				}



			},
			textareaAInput: function(e) {
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
			//文章评论
			commentSave(e) {
				this.$myRequest({
					url: '/comment/save',
					method: 'post',
					data: {
						"userId": this.$user.id,
						"artId": this.artId,
						"content": this.content
					}
				}).then(res => {
					
					uni.showToast({
						title:"评论成功",
						icon:'exception',
						duration:850
					})
					
					if (res.data.code == 0) {
						
						this.$myRequest({
							url: '/article/info/' + this.artId + '/' + this.$user.id,
							methed: 'get'
						}).then(res => {
							this.$data.article = res.data.article
							this.$data.imgArr = res.data.article.images.split(",")
							this.$data.article.commentEntitySize = res.data.article.commentEntity.length
							// this.$set(this.$data.list,"list",res.data.page.list)
							this.content=""
						})


					}

				})



			},

			clickThumbsup(e, index) {
				this.$set(this.$data.article.commentEntity[index], "praiseStatus", !this.$data.article.commentEntity[index]
					.praiseStatus);
				if (this.$data.article.commentEntity[index].praiseStatus) {
					this.$myRequest({
						url: '/commentpraise/save',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"commentId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.article.commentEntity[index], "praises", this.$data.article
								.commentEntity[index].praises + 1);

						}

					})

				}
				if (!this.$data.article.commentEntity[index].praiseStatus) {
					this.$myRequest({
						url: '/commentpraise/delete',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"commentId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.$data.article.commentEntity[index], "praises", this.$data.article
								.commentEntity[index].praises - 1);
						}

					})

				}
			},

			// 点击图片打开详细
			previewImg: function(e) {
				// console.log(e.currentTarget.dataset.index);
				var index = e.currentTarget.dataset.index;
				var imgArr = this.$data.imgArr;

				uni.previewImage({
					current: imgArr[index], //当前图片地址
					urls: imgArr, //所有要预览的图片的地址集合 数组形式
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},

			// 点击关注
			clickFocus(attentionStatus, follower) {
				if (attentionStatus) {
					this.$myRequest({
						url: '/attention/delete',
						method: 'post',
						data: {
							"meId": this.$user.id,
							"followerId": follower
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.article, "attentionStatus", !attentionStatus);
						}

					})
					console.log("取消关注");
				}
				if (!attentionStatus) {
					this.$myRequest({
						url: '/attention/save',
						method: 'post',
						data: {
							"meId": this.$user.id,
							"followerId": follower
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.article, "attentionStatus", !attentionStatus);
						}

					})
				}


			},

			// 跳转回复留言详细
			toDiscover_desc: function(e) {
				uni.navigateTo({
					url: "/pages/disconver/discover_desc_more/discover_desc_more?data=" + e
				})
			}

		}
	}
</script>

<style>
	.pg {
		padding: 5rpx 20rpx 20rpx 20rpx;
	}

	.radius-sm {
		border-radius: 20rpx;
	}

	/* 头部 */
	.user-top {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		margin-top: 20rpx;

	}

	.user-top-1 image {
		height: 80rpx;
		width: 80rpx;
		border-radius: 100%;
	}

	.user-top-2 {
		margin-left: 20rpx;
		width: 65%;
	}

	/* end */

	/* 文字 */
	.character {
		width: 100%;
		height: auto;
		padding-top: 20rpx;
		display: flex;
	}

	.character text {
		font-weight: 550;
		font-size: 30rpx;
		width: 100%;
		word-wrap: break-word;
		word-break: normal;
		line-height: 40rpx;
	}

	/* end */


	/* 九宫图 */
	.container-grid {
		display: flex;
		flex-wrap: wrap;
		width: 100%;

	}

	.container-grid__image {
		height: 210rpx;
		width: 220rpx;
		border-radius: 10rpx;
	}

	.container-grid_img {
		width: 223rpx;
		border-radius: 10rpx;
	}

	.container-grid_image {
		margin-right: 10rpx;
		width: 32%;
	}

	.container-grid_image-1 {
		margin-right: 10rpx;
		width: 100%;
	}

	/* end */

	/* 底部浏览量 */
	.browse {
		width: 100%;
		height: 100rpx;
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		mask-border: 20rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.browse text {
		font-size: 25rpx;
	}

	.img-size {
		height: 80rpx;
		width: 80rpx;
	}

	.cu-avatar.lg {
		width: 60rpx;
		height: 60rpx;
	}

	.browse-2 {
		width: 46%;
	}

	/* end */

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

	/* 评论留言 */
	.leave {
		padding: 20rpx;
		height: auto;
		width: 100%;
		background: #f1f1f1;
		margin-top: 20rpx;
		border-radius: 20rpx;
		word-wrap: break-word;
		word-break: normal;
		line-height: 40rpx;
	}

	.leave-item {
		margin-top: 20rpx;
		color: black;
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
	}

	.lines_msg {
		display: flex;
		height: 10rpx;
	}

	.msg_bottom-1 {
		width: 55%;
		background: #f1f1f1;
		border-radius: 40rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
		display: flex;
		align-items: center;
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

<template>


	<!-- <bar></bar> -->

	<view class="">
		
		<!-- 搜索 -->
		<view class="cu-bar search bg-white" id="TabCurTab">
			<view class="action text-cut locaWidth" @click="handleSelect()" >
				<view v-if="formData.signAddress"
				  class="location">
				  {{ formData.signAddress }}
				</view>
				<view v-if="location.error"
				  class="error">
				  {{ location.errorInfo }}
				</view>
			</view>
			<view class="search-form round" >
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
			</view>
			<!-- <view class="cu-avatar round search_img" :style="item.userVo.userProtrait"></view> -->
		</view>
		<!-- 搜索end -->

		<!-- 导航条 -->
		<TopBar @click="tabSelect" :TabCur="TabCur" :dataList="tablist"></TopBar>
		<!-- 导航条 -->

		<!-- 轮播图 -->
		<min-swiper></min-swiper>
		<!-- end -->
		<Dynamic v-for="(item,index) in list" :key="item.id" :imgList="item.images.split(',')"
			:avatar="item.userVo.userProtrait" :name="item.userVo.userNikename" :publishTime="item.createTime"
			:content="item.content" :isFocusOn="item.attentionStatus" :isLike="item.praiseStatus"
			:isGiveReward="item.isGiveReward" :likeNumber="item.praises" :giveRewardNumber="item.giveRewardNumber"
			:chatNumber="item.commentEntity" @clickDynamic="clickDynamic(index)" @clickUser="clickUser(item.id)"
			@clickFocus="clickFocus(index,item.userId)" @clickThumbsup="clickThumbsup(item.id,index)"
			@clickGiveReward="clickGiveReward(item.id)" @clickChat="clickChat(item.id)">
		</Dynamic>

	</view>



</template>

<script>
	import bar from "../component/bar.vue";
	import TopBar from "../component/topTab.vue";
	import minSwiper from "../component/minSwiper.vue";
	import Dynamic from '../component/qizai-dynamic/Dynamic.vue';
	import { mapGetters, mapMutations } from 'vuex'
	import {
		formatDate,
		reverseGeocoder,
		getLocation
	} from '@/util/index.js'

	export default {
		data() {
			return {
				//图片
				imgArr: [
					'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				],
				// end 
				addr: "授权位置",

				// 导航条
				TabCur: '0',
				scrollLeft: 0,
				// 导航条end

				//导航条
				tablist: [{
						id: 1,
						name: '你的小区'
					},
					{
						id: 2,
						name: '关注'
					},
					{
						id: 3,
						name: '附近'
					},
					{
						id: 4,
						name: '城市'
					},
					{
						id: 5,
						name: '热门'
					},

				],
				list: [],
				formData: {
					signAddress: '', // 签到地址
					longitude: '', // 经度
					latitude: '' // 维度
				},
				location: {
					loading: true,
					error: false,
					errorInfo: '定位失败',
					curLocation: null // 当前位置信息
				}

			}
		},

		components: {
			bar,
			TopBar,
			minSwiper,
			Dynamic
		},
		onLoad: function() {
			this.getLocation()
		},
		onShow: function() {

			this.$myRequest({
				url: '/article/list',
				methed: 'get',
				data: {
					limit: 5,
					page: 1,
					user_id: '1505839386443997186'
				}
			}).then(res => {

				this.$data.list = res.data.page.list
				console.log(this.$data.list)
				// this.$set(this.$data.list,"list",res.data.page.list)

			})
			//导航条的高度
			// this.SelectorQuery()

		},
		//上拉刷新
		onPullDownRefresh: function() {
			this.$myRequest({
				url: '/article/list',
				methed: 'get',
				data: {
					limit: 5,
					page: 1,
					user_id: '1505839386443997186'
				}
			}).then(res => {

				this.$data.list = res.data.page.list
				console.log(this.$data.list)
				// this.$set(this.$data.list,"list",res.data.page.list)

			})

			//模拟加载完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);

		},
		//上拉刷新
		onReachBottom: function() {

		},
		watch: {
		  selectedLocation (newData) {
			console.log("newData"+newData)
		    if (newData) {
		      const { title, location } = newData
		      this.formData.signAddress = title
		      this.formData.longitude = location.lng
		      this.formData.latitude = location.lat
		      this.location.curLocation = newData
		    }
		  }
		},
		methods: { 

			// // 位置微调
			handleSelect() {
				if (this.location.curLocation) {
					const {
						lng,
						lat
					} = this.location.curLocation.location
					if (this.selectedSearch && (this.selectedSearch.location.lng !== lng || this.selectedSearch.location
							.lat !== lat)) {
						this.SET_SELECTED_SEARCH(null)
					}
					uni.navigateTo({
						url: `/pages/select/select?longitude=${lng}&latitude=${lat}`
					})
				} else {
					this.getLocation()
				}
			},
			// 获取位置信息
			getLocationInfo (location) {
			  reverseGeocoder(location)
			    .then(res => {
			      console.log('当前位置信息：', res)
			      const address = res.result.pois[0].title
							this.formData.signAddress = address
							this.location.curLocation = res.result
			      this.location.error = false
			      this.location.loading = false
			    })
			    .catch(err => {
			      this.location.loading = false
			      this.location.error = true
			    })
			},
			// 获取当前定位
			getLocation() {
				this.location.loading = true
				this.location.error = false
				getLocation()
					.then(res => {
						const {
							longitude,
							latitude
						} = res
						this.getLocationInfo({
							longitude,
							latitude
						})
					})
					.catch(() => {
						this.location.loading = false
						this.location.error = true
					})
			},
			clickDynamic(e) {
				console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e) {
				console.log(e);
				console.log('childUser');
			},
			// 点击关注
			clickFocus(e, follower) {
				if (this.list[e].attentionStatus) {
					this.$myRequest({
						url: '/attention/delete',
						method: 'post',
						data: {
							"meId": this.$user.id,
							"followerId": follower
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.list[e], "attentionStatus", !this.list[e].attentionStatus);
						}

					})
					console.log("取消关注");
				}
				if (!this.list[e].attentionStatus) {
					this.$myRequest({
						url: '/attention/save',
						method: 'post',
						data: {
							"meId": this.$user.id,
							"followerId": follower
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.list[e], "attentionStatus", !this.list[e].attentionStatus);
						}

					})
				}


			},
			// 点赞
			clickThumbsup(e, index) {
				// console.log(this.list.get());
				this.$set(this.list[index], "praiseStatus", !this.list[index].praiseStatus);
				if (this.list[index].praiseStatus) {
					this.$myRequest({
						url: '/articlepraise/save',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"articleId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.list[index], "praises", this.list[index].praises + 1);

						}

					})

				}
				if (!this.list[index].praiseStatus) {
					this.$myRequest({
						url: '/articlepraise/delete',
						method: 'post',
						data: {
							"userId": this.$user.id,
							"articleId": e
						}
					}).then(res => {
						if (res.data.code == 0) {
							this.$set(this.list[index], "praises", this.list[index].praises - 1);
						}

					})

				}

				console.log(this.list[index].praiseStatus);
				console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e) {

				console.log(e);
				console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e) {
				uni.navigateTo({
					url: "/pages/disconver/discover_desc/discover_desc?data=" + e
				})
			},


			toDiscover_desc: function(e) {
				uni.navigateTo({
					url: "/pages/disconver/discover_desc/discover_desc"
				})
			},
			// 导航条点击
			tabSelect(e) {
				// console.log(e) ;

				this.TabCur = e.currentTarget.dataset.id

			},
		}

	}
</script>

<style>
	/* 导航栏 */
	.nav-item {
		position: fixed;
		width: 100%;
		/* height: 200rpx; */
		top: 1;
		z-index: 2;
	}

	/* end */

	/* 内容 */
	.contianer {
		height: auto;
		width: 100%;
		padding: 20rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.contianer-title {
		display: flex;
		align-items: center;
	}

	.contianer-title_image image {
		height: 50rpx;
		width: 50rpx;
		border-radius: 100%;
	}

	.contianer-name {
		margin-left: 20rpx;
		font-size: 25rpx;
		color: black;
	}

	.contianer-content {
		margin-top: 10rpx;
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
	}

	.contianer-content text {
		font-size: 30rpx;
		color: black;
	}

	.container-grid {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		width: 100%;
	}

	.container-grid__image {
		height: 210rpx;
		width: 215rpx;
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

	.container-evaluate {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.container-evaluate-top_1 image {
		width: 75rpx;
		height: 40rpx;
	}

	.container-evaluate-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.container-evaluate-desc {
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	.container-comment {
		margin-top: 20rpx;
	}

	.container-comment {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	/* end */




	/* 线 */
	.line {
		display: flex;
		height: 90rpx;
	}

	/* end */


	/* 轮播图 */
	.place {
		width: 100%;
		height: auto;
		padding-top: 0rpx;
		margin-bottom: 20rpx;
	}

	.swiper {
		width: 100%;
		margin-top: 10rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	.swiper .swiper-box {
		width: 95%;
		height: 30.7vw;
		overflow: hidden;
		-webkit-border-radius: 15rpx;
		border-radius: 15rpx;
		-webkit-box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
		box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}

	.swiper .swiper-box swiper {
		width: 100%;
		height: 30.7vw;
	}

	.swiper .swiper-box swiper swiper-item image {
		width: 100%;
		height: 30.7vw;
	}

	.swiper .swiper-box .indicator {

		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		background-color: rgba(255, 255, 255, 0.4);
		width: 150rpx;
		height: 5rpx;
		-webkit-border-radius: 3rpx;
		border-radius: 3rpx;
		overflow: hidden;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}

	.swiper .swiper-box .indicator .dots {
		width: 100%;
	}

	.swiper .swiper-box .indicator .dots.on {
		background-color: white;
	}

	/* 轮播图 */

	/* 线条 */
	.line {
		display: flex;
		height: 40rpx;
		width: 100%;
		/* border: 1rpx solid black; */
	}

	/* 线条end */

	/* 发帖 */
	.postMsg image {
		height: 100rpx;
		width: 100rpx;
		border-radius: 100%;
		position: fixed;
		bottom: 150rpx;
		right: 60rpx;
		z-index: 999;
	}

	/* end */

	/* 发布贴{添加居中线} */
	.drawerLine {
		display: flex;
		height: 310rpx;
	}

	.cu-form-group textarea {
		margin: 32rpx 0 30rpx;
		height: 10.6em;
		width: 100%;
		line-height: 1.2em;
		flex: 1;
		font-size: 28rpx;
		padding: 0;
	}

	.confirm-bottom {
		width: 100%;
		height: 90rpx;
	}

	.NumChange {
		padding-top: 50rpx;
	}

	.text-more text {
		/* direction: rtl; */
		text-align: right;
		width: 95%;
		font-size: 25rpx;
	}

	/* end */


	/* 页脚 */
	.foot {
		display: flex;
		padding: 10rpx;
		align-items: center;
		justify-content: space-between;
	}

	.foot-1 {
		width: 35%;
		height: 1rpx;
		background: gainsboro;
	}

	/* end */
</style>

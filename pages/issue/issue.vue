<template>
	<view>
		<form @submit="formSubmit" @reset="">
			<!-- 标题 -->
			<!-- 				<view class="cu-form-group margin-top">
					<view class="title">标题</view>
					<input bindinput="getTitleValue" name="title"  placeholder="品类品牌型号都是买家喜欢搜索的"></input>
				</view> -->
			<!-- end -->

			<!-- 内容 -->
			<view class="cu-form-group margin-top">
				<textarea style="height: 250rpx;" name="content" maxlength="10000" @input="textareaAInput"  v-model="content"
					placeholder="做一个爱分享的人,在这个圈子你就是主角."></textarea>
			</view>
			<!-- end -->

			<!-- 图片 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					{{imgList.length}}/5
				</view>
				<view class="action">
					图片上传
				</view>
			</view>

			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length < 1">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>

			<!-- end -->

			<!-- 地址选择 -->
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<!-- <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex"
					:range="multiArray"> -->
				<view class="picker" @click="handleSelect()">
					{{address}}
					<uni-icons type="location-filled" style="margin-left: 6rpx;" size="18"></uni-icons>
				</view>

				<!-- </picker> -->
			</view>
			<!-- end -->

			<!-- 价钱 -->
			<!-- 						<view class="cu-form-group margin-top">
							<view class="title">出售价:</view>
							<input type="digit" @input="moneyInput" :value="money" placeholder="请输入价钱"  maxlength='7' name="newPrice"></input>
					
							<view class="title">原价:</view>
							<input type="digit" @input="newInput" :value="newMoney" placeholder="请输入原价"  maxlength='7' name="oriPrice"></input>
					
						</view> -->
			<!-- end -->

			<!-- 选择分类  -->
			<!-- 						<view class="cu-form-group">
							<view class="title">分类:</view>
							<input disabled="true"  name="classify" :value='classify'></input>
							<button class="cu-btn  bg-green" role="button" aria-disabled="false" @tap="showModal" data-target="DrawerModalL">选择</button>
						</view> -->
			<!-- end -->

			<!-- 新旧 -->
			<!-- 						<view class="cu-form-group">
							<view class="title">新旧:</view>
								<input disabled="true"  name="itemLists" :value='itemLists[itemListsIndex]'></input>
							<button class="cu-btn  bg-green" role="button" aria-disabled="false" @tap="newState">选择</button>
						</view> -->
			<!-- end -->

			<!-- 交易方式 -->
			<!-- 					  <view class="cu-form-group">
							<view class="title">交易方式</view>
					<checkbox-group name="means" @change="checkboxChange">
					    <checkbox  :class="checkboxs[0].checked?'checked':'' " :checked="checkboxs[0].checked?true:false"  value="自提"  ></checkbox> 自提
					    <checkbox  :class="checkboxs[1].checked?'checked':'' " :checked="checkboxs[1].checked?true:false" 	value='同城面交'></checkbox> 同城面交
					    <checkbox  :class="checkboxs[2].checked?'checked':'' " :checked="checkboxs[2].checked?true:false"  value='邮寄'></checkbox> 邮寄
					</checkbox-group>
					
						</view> -->
			<!-- end -->

			<!-- 确定发布 -->
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" form-type="submit">确定发布</button>
			</view>
			<!-- end -->
		</form>

		<!-- 模态框 -->
		<view @touchmove.stop="modeMove" class=" cu-modal drawer-modal justify-start "
			:class=" modalName == 'DrawerModalL'?'show':'' " @tap="hideModal">
			<scroll-view scroll-with-animation='true' scroll-y='true' class="cu-dialog basis-lg">
				<view class="cu-list menu text-left">
					<view class="cu-item " v-for=" (item,index) in  picker" :key="index" @tap="getClassify"
						:data-name="item.classify_name" :data-value="item.classify_id">
						<view class="content">
							<view>{{item.classify_name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import allSchool from "../../common/allSchool.js";
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		formatDate,
		reverseGeocoder,
		getLocation
	} from '@/util/index.js'

	export default {
		data() {
			return {
				modalName: '', //模态框开关
				content:"",
				picker: [{
					classify_id: 1,
					classify_name: '手机'
				}, ],
				itemListsIndex: 0, //几层新下标（默认全新）
				classify: '其他闲置', //分类选择默认
				money: '', //出售价
				address: '',
				newMoney: '', //原价
				imgList: [], //图片上传
				imgLists: "",
				multiIndex: [0, 0, 0], //地址选择下标

				formData: {
					getAddress: "切换位置",
					signAddress: '', // 签到地址
					longitude: '', // 经度
					latitude: '' // 维度
				},
				location: {
					loading: true,
					error: false,
					errorInfo: '定位失败',
					curLocation: null // 当前位置信息
				},

			}
		},
		computed: {
			...mapGetters(['selectedLocation', 'selectedSearch'])
		},
		methods: {
			...mapMutations(['SET_SELECTED_LOCATION', 'SET_SELECTED_SEARCH']),
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
			formSubmit: function(e) {
				// console.log(e.detail.value.content)
				// console.log('form发生了submit事件，携带数据为：' + this.imgList)
				// console.log('form发生了submit事件，携带数据为：' + this.address)
				if(e.detail.value.content==""){
					uni.showToast({
						title: "内容不能为空",
						icon: 'none',
						duration: 850
					})
					return
				}
				this.$myRequest({
					url: '/article/save',
					method: 'post',
					data: {
						content: e.detail.value.content,
						images: this.imgLists,
						articleAddress: this.address,
						userId: this.$user.id
					}
				}).then(res => {
					
					if (res.data.code == 0) {
						uni.showToast({
							title: "发表成功",
							icon: 'exception',
							duration: 850
						})
						this.imgList=[]
						this.imgLists=""
						this.content=""
					
						uni.switchTab({
							url: `../disconver/disconver`
						})

					}
					console.log(res)
					// uni.navigateTo({
					// 	url: `pages/disconver/disconver`
					// })
					// this.$data.list = res.data.page.list
					// console.log(this.$data.list)
					// this.$set(this.$data.list,"list",res.data.page.list)

				})

			},
			// 获取位置信息
			getLocationInfo(location) {
				reverseGeocoder(location)
					.then(res => {
						console.log('当前位置信息：', res)
						const address = res.result.pois[0].title
						this.formData.signAddress = address
						this.$set(this, "address", address)
						this.$user.address = this.formData.signAddress
						this.location.curLocation = res.result
						this.location.error = false
						this.location.loading = false
						this.handleSelect()
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
			// 选择地址
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				var that = this;
				allSchool.all(e, that);
			},

			// end
			textareaAInput(e) {
				console.log(e)
			},
			// 图片上传
			ChooseImage() {
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList.concat(res.tempFilePaths)
						} else {
							for (let i in res.tempFilePaths) {
								this.$fileRequest({
									url: '/image/saveImage',
									methed: 'post',
									filePath: res.tempFilePaths[i],
								}).then(res => {
									this.imgList.push(res.msg)
									if (this.imgLists=="") {
										this.imgLists = res.msg;
									}else{
										this.imgLists = this.imgLists + "," + res.msg;
									}
									console.log(this.imgLists)
									// this.$set(this.$data.list,"list",res.data.page.list)

								})
							}
						}

					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url,
				});
				console.log(e)
			},
			// 删除照片
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这个照片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
							this.imgList = this.imgList
						}
					}
				})
			},

			//限制只能到小数点2位
			moneyInput: function(e) {
				var money;
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
					money = e.detail.value;
				} else {
					money = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				this.money = money;
			},

			//原价验证
			newInput: function(e) {
				var money;
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
					money = e.detail.value;
				} else {
					money = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				this.newMoney = money;
			},


			// 选择交易方式
			checkboxChange: function(e) {
				console.log(e);
				//获取选择状态
				var item = this.checkboxs,
					values = e.detail.value;
				for (var i = 0; i < item.length; i++) {
					item[i].checked = false; //初始化选择状态
					for (var j = 0; j < values.length; j++) {
						if (item[i].value == values[j]) {
							item[i].checked = true;
							break;
						}
					}
				}


			},

			// 新旧程度
			newState: function(e) {
				var that = this;
				uni.showActionSheet({
					itemList: that.itemLists,
					success(e) {
						that.itemListsIndex = e.tapIndex
					}
				})
			},
			// 拦截模态框滚动事件
			modeMove: function() {

			},

			// 显示分类模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 隐藏分类模态框
			hideModal(e) {
				this.modalName = null
			},
			// 得到分类的值
			getClassify: function(e) {
				this.classify = e.currentTarget.dataset.name,
					this.classify_id = e.currentTarget.dataset.value
				this.hideModal();
			},
		},
		watch: {
			selectedLocation(newData) {
				if (newData) {
					const {
						title,
						location
					} = newData
					this.$user.address = title
					this.address = title
					this.formData.signAddress = title
					this.formData.longitude = location.lng
					this.formData.latitude = location.lat
					this.location.curLocation = newData

					this.$user.formData.signAddress = title
					this.$user.formData.longitude = location.lng
					this.$user.formData.latitude = location.lat
					this.$user.location.curLocation = newData
				}
			}
		},
		onLoad(options) {
			this.address = this.$user.address
			this.formData = this.$user.formData
			this.location = this.$user.location
		},
		onShow() {

		},
		onHide() {

		},
		// 出发下拉刷新
		onPullDownRefresh() {
			// 模拟刷新完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		}
	}
</script>

<style>
	.rule {
		display: flex;
		justify-content: space-between;
	}

	.margin-top-xl-170 {
		margin-top: 170rpx;
	}
</style>

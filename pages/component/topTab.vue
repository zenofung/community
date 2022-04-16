<template>
	
	<scroll-view scroll-x  class="bg-white nav "  id="navTab"  >
	  <view class="flex text-center">
		<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':'' " v-for="(item,index) in tablist" :key ="index" @click="tabSelect"  :data-id="index">
		  {{item.name=="我的小区"?address:item.name}}
		</view>
	  </view>
	</scroll-view>
	
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default{
		data(){
			return{
				
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
				},
				
				//导航条
				tablist:this.dataList,
				//end
			}
		},
		props:{
			address: {
				type: String
			},
			TabCur:{//初始选择位置 0
				type:String,
				default:'0'
			},
			dataList:{//数据
			}
		},
		created() {
		},		
		computed: {
			...mapGetters(['selectedLocation', 'selectedSearch'])
		},
		methods:{
		// 导航条点击
		  tabSelect(e) {
		   console.log(e)
		   this.$emit('click',e);//让父类使用改方法
		    
		  }
		},
		watch: {
			selectedLocation(newData) {
				if (newData) {
					const {
						title,
						location
					} = newData
					this.$set(this.tablist[2],"name",title)
					this.$user.address=title
					this.formData.signAddress = title
					this.formData.longitude = location.lng
					this.formData.latitude = location.lat
					this.location.curLocation = newData
				}
			}
		}
	}
</script>

<style>
</style>

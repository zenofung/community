<template>
	<view class="">
		<!-- 搜索 -->
		  <view class="cu-bar search bg-white">
		    <view class="search-form round">
		      <text class="cuIcon-search"></text>
		      <input type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
		    </view>
		    <view class="action">
		      <button class="cu-btn bg-green shadow-blur round">搜索</button>
		    </view>
		  </view>
		<!-- 搜索end -->
		
		<!-- 轮播图 -->
		<fold-swiper :swiperlist="swiperList" @tap ="toDescPage"></fold-swiper>
		<!-- end -->
		
		<!-- 宫格列表 -->
		 <view class="cu-list no-border grid  card-menu margin-bottom"  :class="['col-' + gridCol]" >
		    <view class="cu-item" v-for="(item,index) in iconList" :key="index" v-if="index<gridCol*2">
		    <navigator :url="item.name == '全部分类' ? '/pages/classify/classify_index/classify_index' : '/pages/home/home_grid/home_grid'"  :data-value='item.name' hover-class='none'>
		      <!-- <view class="cuIcon-{{item.icon}} text-{{item.color}}"> -->
			   <view :class=" ['cuIcon-' + item.icon,'text-'+item.color] " >
		        <view class="cu-tag badge" v-if="item.badge!=0">
		          <block v-if="item.badge!=1"> {{item.badge>99?"99+":item.badge}}</block>
		        </view>
		      </view>
		      <text>{{item.name}}</text>
		      </navigator>
		    </view>
		  </view>
		<!-- 宫格列表end -->
		
		<!-- 导航条 -->
		<TopBar :TabCur ="TabCur" :dataList="tablist" @tap="tabSelect"></TopBar>
		<!-- end -->
		
		<!-- 内容 -->
		<view class='card-menu container margin-top' v-for="(item,index) in 10" :key="index">
		    <navigator url='/pages/home/home_detail/home_detail' hover-class='none'>
		  <view class='container_img'><image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image></view>
		  <view class='container_text'><text class=''>Huawei/华为Mate 20 Pro运气真好双卡双待全网通</text></view>
		  <view class='container_price'>
		  <text class='container_price_text_0'>￥980</text>
		  <!-- <text class='container_price_text_1'>11人想要</text> -->
		  <view class="cu-tag line-orange">全新</view>
		  </view>
		  <view class='container_line'></view>
		  <view class='container_user'>
		  <image src='http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg'></image>
		  <text>Amibition</text>
		  </view>
		  </navigator>
		</view>
		<!-- 内容end -->
		
	</view>
</template>

<script>
	import foldSwiper from "../../component/foldSwiper.vue";
	import TopBar from "../../component/topTab.vue";
	export default{
		data(){
			return{
				TabCur:'0',//导航条初始位置0
				// 轮播图
				swiperList: [{
				  id: 0,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
				  id: 1,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
				}, {
				  id: 2,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
				  id: 3,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
				  id: 4,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
				  id: 5,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
				  id: 6,
				  type: 'image',
				  url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				// end
				
				// 九宫格
				// 宫格列表
				    iconList: [{
				      icon: 'cardboardfill',
				      color: 'red',
				      badge: 120,
				      name: '手机'
				    }, {
				      icon: 'recordfill',
				      color: 'orange',
				      badge: 1,
				      name: '图书'
				    }, {
				      icon: 'picfill',
				      color: 'yellow',
				      badge: 0,
				      name: '游戏交易'
				    }, {
				      icon: 'noticefill',
				      color: 'olive',
				      badge: 22,
				      name: '服装鞋帽'
				    }, {
				      icon: 'upstagefill',
				      color: 'cyan',
				      badge: 0,
				      name: '数码'
				    }, {
				      icon: 'clothesfill',
				      color: 'blue',
				      badge: 0,
				      name: '二手车'
				    }, {
				      icon: 'discoverfill',
				      color: 'purple',
				      badge: 0,
				      name: '电脑'
				    }, {
				      icon: 'questionfill',
				      color: 'mauve',
				      badge: 0,
				      name: '毕业季'
				    }, {
				      icon: 'commandfill',
				      color: 'purple',
				      badge: 0,
				      name: '寝室用品'
				    }, {
				      icon: 'brandfill',
				      color: '美妆捡漏',
				      badge: 0,
				      name: '全部分类'
				    }],
				    gridCol: 5,
				    // 宫格列表end
				// end
				
				//导航条
				tablist:[
				{id:1,name:'导航条888'},
				{id:2,name:'导航条2'},
				{id:3,name:'导航条3'},
				{id:4,name:'导航条4'}, 
				{id:5,name:'导航条5'},
				{id:6,name:'导航条6'},
					],
				//end
				
				
			}
		},
		methods:{
			//点击轮播图调转到详细页面
			toDescPage:function(e){
				console.log(e)
			},
			
			// 导航条点击
			tabSelect:function(e){
				this.TabCur = e.currentTarget.dataset.id
			}
		},
		components:{
			foldSwiper,
			TopBar
		},
		onLoad:function(){
			
		},
		onShow:function(){
			
		}
	}
</script>

<style>
	

	
	
	/* 内容 */
	.container{
	  margin-left: 29rpx;
	  margin-right: 20rpx;
	  float: left;
	  height: 530rpx;
	  width: 43%;
	  background: white;
	  margin-bottom: 20rpx;
	}
	.container_img image{
	  height: 300rpx;
	  width: 100%;
	}
	.container_text{
	  color: black;
	  padding: 10rpx;
	  font-size: 23rpx;
	}
	.container_price{
	  display: flex;
	  justify-content: space-between;
	  padding-left: 8rpx;
	  padding-right: 8rpx;
	}
	.container_price_text_0{
	  color: red;
	  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
	.container_price_text_1{
	  font-size: 22rpx;
	}
	.container_line{
	  width: 100%;
	  background: gainsboro;
	  height: 1rpx;
	  margin-top: 10rpx;
	}
	.container_user{
	  margin-top: 20rpx;
	  display: flex;
	  line-height:50rpx;
	}
	.container_user image{
	  margin-left: 10rpx;
	  margin-right: 50rpx;
	  height: 50rpx;
	  width: 50rpx;
	}
	/* end */
	
	/* 吸附置顶 */
	.navTab{
	  position: fixed;
	  z-index: 9999;
	  top: 0;
	}
	/* end */
	
</style>

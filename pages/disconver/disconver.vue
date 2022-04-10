<template>
	<!-- <bar></bar> -->
<view class="">
	
	<!-- 导航条 -->
	<TopBar @click="tabSelect" :TabCur="TabCur" :dataList ="tablist"></TopBar>
	<!-- 导航条 -->

	<!-- 轮播图 -->
	<min-swiper></min-swiper>
	<!-- end -->
  <Dynamic v-for="(item,index) in list" :key="item.id" 
      :imgList="item.imgList" 
      :avatar="item.avatar"
      :name="item.name"
      :publishTime="item.publishTime"
      :content="item.content"
	  :isFocusOn="item.isFocusOn"
      :isLike="item.isLike"
      :isGiveReward="item.isGiveReward"
      :likeNumber="item.likeNumber"
      :giveRewardNumber="item.giveRewardNumber"
      :chatNumber="item.chatNumber"
      @clickDynamic="clickDynamic(index)"
      @clickUser="clickUser(item.id)"
      @clickFocus="clickFocus(index)"
      @clickThumbsup="clickThumbsup(item.id)"
      @clickGiveReward="clickGiveReward(item.id)"
      @clickChat="clickChat(item.id)">
  </Dynamic>
 

</view>



</template>

<script>
	import bar from "../component/bar.vue";
	import TopBar from "../component/topTab.vue";
	import minSwiper from "../component/minSwiper.vue";
	import Dynamic from '../component/qizai-dynamic/Dynamic.vue';
	export default {
		data() {
			return {
				//图片
				     imgArr: [
				    'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				  ],
				  // end 
				  
				  // 导航条
				    TabCur: '0',
				    scrollLeft: 0,
				  // 导航条end
				  
				  //导航条
				  tablist:[
				  {id:1,name:'导航条888'},
				  {id:2,name:'导航条2'},
				  {id:3,name:'导航条3'},
				  {id:4,name:'导航条4'}, 
				  {id:5,name:'导航条5'},
				  {id:6,name:'导航条6'},
				  	],
		
				 list:[
				         {
				             id:1,
				             avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
				             name:'小新',
				             publishTime:1617086756,
				             content:'中国外交官这样讽加拿大总理，算不算骂？该不该骂？',
				             imgList:[
				                 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
				                 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
				             ],
				             isLike:true,
				             isGiveReward:true,
				             likeNumber:2,
				             giveRewardNumber:2,
				             chatNumber:2,
				             isFocusOn:true,
				         },
				         
				         {
				             id:2,
				             avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2291332875,175289127&fm=26&gp=0.jpg',
				             name:'小白',
				             publishTime:1617036656,
				             content:'  足不出户享国内核医学领域顶级专家云诊断，“中山-联影”分子影像远程互联融合创新中心揭牌 ',
				             imgList:[
				                 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
				             ],
				             isLike:false,
				             isGiveReward:false,
				             likeNumber:0,
				             giveRewardNumber:0,
				             chatNumber:2,
				             isFocusOn:false,
				         }
				 ]
				  //end
			}
		},
		components:{ 
			bar,
			TopBar,
			minSwiper,
			Dynamic
		},
		onLoad:function(){
		

		},
		onShow:function(){
			
			//导航条的高度
			// this.SelectorQuery()
			
		},
		//上拉刷新
		onPullDownRefresh:function() {
			//模拟加载完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		//上拉刷新
		onReachBottom:function(){
			console.log("出发上拉刷新事件");
			
		},
		methods: {
			clickDynamic(e){
			    console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e){
			    console.log(e);
			    console.log('childUser');
			},
			// 点击关注
			clickFocus(e){
				this.$set(this.list[e], "isFocusOn",!this.list[e].isFocusOn);
			    console.log(e);
			    console.log('childUser');
			},
			// 点赞
			clickThumbsup(e){
		
			   this.$set(this.list[e-1], "isLike",!this.list[e-1].isLike);
			   if(!this.list[e-1].isLike){
				this.$set(this.list[e-1], "likeNumber",this.list[e-1].likeNumber+1);
			   }
			   if(this.list[e-1].isLike){
				   this.$set(this.list[e-1], "likeNumber",this.list[e-1].likeNumber-1);
			   }
			   
			    console.log(this.list[e].isLike);
			    console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e){
				
			    console.log(e);
			    console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e){
				uni.navigateTo({
					url:"/pages/disconver/discover_desc/discover_desc"
				})
			    console.log(e);
			    console.log('clickChat');
			},
			

			  toDiscover_desc:function(e){
				  uni.navigateTo({
				  	url:"/pages/disconver/discover_desc/discover_desc"
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
	.nav-item{
	  position: fixed;
	  width: 100%;
	  /* height: 200rpx; */
	  top: 1;
	  z-index: 2;
	}
	/* end */
	
	/* 内容 */
	.contianer{
	  height: auto;
	  width: 100%;
	  padding: 20rpx;
	  border-radius: 20rpx;
	  margin-bottom: 20rpx;
	  margin-top: 20rpx;
	}
	.contianer-title{
	  display: flex;
	  align-items: center;
	}
	.contianer-title_image image{
	  height: 50rpx;
	  width: 50rpx;
	  border-radius: 100%;
	}
	.contianer-name{
	  margin-left: 20rpx;
	  font-size: 25rpx;
	  color: black;
	}
	.contianer-content{
	  margin-top: 10rpx;
	  width: 100%;
	  display: -webkit-box;
	  overflow: hidden;
	  -webkit-line-clamp: 6;
	  -webkit-box-orient: vertical;
	}
	.contianer-content text{
	  font-size: 30rpx;
	  color: black;
	}
	.container-grid{
	  display: flex;
	  flex-wrap: wrap;
	  margin-top: 20rpx;
	  width: 100%;
	}
	.container-grid__image{
	  height: 210rpx;
	  width: 215rpx;
	  border-radius: 10rpx;
	}
	.container-grid_img{
	  width: 223rpx;
	  border-radius: 10rpx; 
	}
	.container-grid_image{
	  margin-right: 10rpx;
	  width: 32%;
	}
	.container-grid_image-1{
	   margin-right: 10rpx;
	  width: 100%;
	}
	.container-evaluate{
	  margin-top: 20rpx;
	  width: 100%;
	  height: auto;
	  border-radius: 20rpx;
	  padding: 20rpx;
	}
	.container-evaluate-top_1 image{
	  width: 75rpx;
	  height: 40rpx;
	}
	.container-evaluate-top{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.container-evaluate-desc{
	  width: 100%;
	  display: -webkit-box;
	  overflow: hidden;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	
	}
	.container-comment{
	  margin-top: 20rpx;
	}
	.container-comment{
	  padding: 20rpx;
	  display: flex;
	  justify-content: space-between;
	}
	/* end */
	
	
	
	
	/* 线 */
	.line{
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
	.line{
	  display:flex;
	  height: 40rpx;
	  width: 100%;
	  /* border: 1rpx solid black; */
	}
	
	/* 线条end */
	
	/* 发帖 */
	.postMsg image{
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
	.drawerLine{
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
	.confirm-bottom{
	  width: 100%;
	  height: 90rpx;
	}
	.NumChange{
	  padding-top: 50rpx;
	}
	.text-more text{
	  /* direction: rtl; */
	  text-align: right;
	  width: 95%;
	  font-size: 25rpx;
	}
	/* end */
	
	
	/* 页脚 */
	.foot{
	  display: flex;
	  padding: 10rpx;
	  align-items: center;
	  justify-content:space-between;
	}
	.foot-1{
	  width: 35%;
	  height: 1rpx;
	  background: gainsboro;
	}
	/* end */

</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
		var TOKEN_KEY = 'authorization'
		var session = uni.getStorageSync(TOKEN_KEY)
		if (session) {
			this.$myRequest({
				url: '/getInfo',
				methed: 'get'
			}).then(res => {
				console.log(res.data.user)
				if(res.data.user==null){
					uni.setStorageSync(TOKEN_KEY, "")
				}else{
					this.$user.id=res.data.user.id;
					this.$user.avatar=res.data.user.userProtrait;
					this.$user.userNikename=res.data.user.userNikename;
					// this.$set(this.$data.list,"list",res.data.page.list)
				}
			
			})
			
		} else {
			//弹出登录
		
		}
		
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";

</style>

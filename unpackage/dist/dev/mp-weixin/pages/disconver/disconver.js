(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/disconver/disconver"],{22:function(t,e,n){"use strict";(function(t){n(5);o(n(3));var e=o(n(23));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},23:function(t,e,n){"use strict";n.r(e);var o=n(24),i=n(26);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n(32);var s,a=n(11),c=Object(a["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);c.options.__file="pages/disconver/disconver.vue",e["default"]=c.exports},24:function(t,e,n){"use strict";n.r(e);var o=n(25);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},25:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return o}));try{o={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,200))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list,(function(e,n){var o=t.__get_orig(e),i=e.images.split(",");return{$orig:o,g0:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},r=!1,s=[];i._withStripped=!0},26:function(t,e,n){"use strict";n.r(e);var o=n(27),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},27:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(15),i=n(28);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(){n.e("pages/component/bar").then(function(){return resolve(n(176))}.bind(null,n)).catch(n.oe)},l=function(){n.e("pages/component/topTab").then(function(){return resolve(n(181))}.bind(null,n)).catch(n.oe)},u=function(){n.e("pages/component/minSwiper").then(function(){return resolve(n(186))}.bind(null,n)).catch(n.oe)},d=function(){n.e("pages/component/qizai-dynamic/Dynamic").then(function(){return resolve(n(193))}.bind(null,n)).catch(n.oe)},f={data:function(){return{imgArr:["http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg"],addr:"授权位置",address:"未授权位置",TabCur:"0",scrollLeft:0,tablist:[{id:1,name:"附近"},{id:2,name:"关注"},{id:3,name:"我的小区"},{id:4,name:"城市"},{id:5,name:"热门"}],list:[],formData:{getAddress:"切换位置",signAddress:"",longitude:"",latitude:""},location:{loading:!0,error:!1,errorInfo:"定位失败",curLocation:null}}},computed:s({},(0,o.mapGetters)(["selectedLocation","selectedSearch"])),components:{bar:c,TopBar:l,minSwiper:u,Dynamic:d},onLoad:function(){this.getLocation(),this.formData=this.$user.formData,this.location=this.$user.location},onShow:function(){var t=this;this.$myRequest({url:"/article/list",methed:"get",data:{limit:5,page:1,user_id:this.$user.id}}).then((function(e){t.$data.list=e.data.page.list,console.log(t.$data.list)}))},onPullDownRefresh:function(){var e=this;this.$myRequest({url:"/article/list",methed:"get",data:{limit:5,page:1,user_id:this.$user.id}}).then((function(t){e.$data.list=t.data.page.list,console.log(e.$data.list)})),setTimeout((function(){t.stopPullDownRefresh()}),2e3)},onReachBottom:function(){},methods:{handleSelect:function(){if(this.location.curLocation){var e=this.location.curLocation.location,n=e.lng,o=e.lat;!this.selectedSearch||this.selectedSearch.location.lng===n&&this.selectedSearch.location.lat===o||this.SET_SELECTED_SEARCH(null),t.navigateTo({url:"/pages/select/select?longitude=".concat(n,"&latitude=").concat(o)})}else this.getLocation()},getLocationInfo:function(t){var e=this;(0,i.reverseGeocoder)(t).then((function(t){var n=t.result.pois[0].title;e.$set(e,"address",n),e.$user.address=n,console.log(e.$user.address),e.formData.signAddress=n,e.location.curLocation=t.result,e.location.error=!1,e.location.loading=!1,e.$user.formData.signAddress=n,e.$user.location.curLocation=t.result,e.$user.location.error=!1,e.$user.location.loading=!1})).catch((function(t){e.$user.location.loading=!1,e.$user.location.error=!0}))},getLocation:function(){var t=this;this.location.loading=!0,this.location.error=!1,(0,i.getLocation)().then((function(e){var n=e.longitude,o=e.latitude;t.getLocationInfo({longitude:n,latitude:o})})).catch((function(){t.location.loading=!1,t.location.error=!0}))},clickDynamic:function(t){console.log("childDynamic")},clickUser:function(t){console.log(t),console.log("childUser")},clickFocus:function(t,e){var n=this;this.list[t].attentionStatus&&(this.$myRequest({url:"/attention/delete",method:"post",data:{meId:this.$user.id,followerId:e}}).then((function(e){0==e.data.code&&n.$set(n.list[t],"attentionStatus",!n.list[t].attentionStatus)})),console.log("取消关注")),this.list[t].attentionStatus||this.$myRequest({url:"/attention/save",method:"post",data:{meId:this.$user.id,followerId:e}}).then((function(e){0==e.data.code&&n.$set(n.list[t],"attentionStatus",!n.list[t].attentionStatus)}))},clickThumbsup:function(t,e){var n=this;this.$set(this.list[e],"praiseStatus",!this.list[e].praiseStatus),this.list[e].praiseStatus&&this.$myRequest({url:"/articlepraise/save",method:"post",data:{userId:this.$user.id,articleId:t}}).then((function(t){0==t.data.code&&n.$set(n.list[e],"praises",n.list[e].praises+1)})),this.list[e].praiseStatus||this.$myRequest({url:"/articlepraise/delete",method:"post",data:{userId:this.$user.id,articleId:t}}).then((function(t){0==t.data.code&&n.$set(n.list[e],"praises",n.list[e].praises-1)})),console.log(this.list[e].praiseStatus),console.log("childThumbsup")},clickGiveReward:function(t){console.log(t),console.log("clickGiveReward")},clickChat:function(e){t.navigateTo({url:"/pages/disconver/discover_desc/discover_desc?data="+e})},toDiscover_desc:function(e){t.navigateTo({url:"/pages/disconver/discover_desc/discover_desc"})},tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id}},watch:{selectedLocation:function(t){if(console.log("aaa"),t){var e=t.title,n=t.location;this.$set(this.tablist[3],"name",e),this.$user.address=e,this.formData.signAddress=e,this.formData.longitude=n.lng,this.formData.latitude=n.lat,this.location.curLocation=t,this.$user.formData.signAddress=e,this.$user.formData.longitude=n.lng,this.$user.formData.latitude=n.lat,this.$user.location.curLocation=t}}}};e.default=f}).call(this,n(1)["default"])},32:function(t,e,n){"use strict";n.r(e);var o=n(33),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},33:function(t,e,n){}},[[22,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/disconver/disconver.js.map
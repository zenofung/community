(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-disconver-discover_desc-discover_desc"],{"514f":function(t,e,i){"use strict";i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("aded"),n={data:function(){return{article:{userVo:{},attentionStatus:"",commentEntitySize:{}},artId:"",commentSize:17,imgArr:[],content:"",sendState:!0}},methods:{onLoad:function(t){var e=this;console.log("userId",this.$user.id),null!=t&&(this.$myRequest({url:"/article/info/"+t.data+"/"+this.$user.id,methed:"get"}).then((function(t){e.$data.article=t.data.article,e.$data.imgArr=""==t.data.article.images?"":t.data.article.images.split(","),e.$data.article.commentEntitySize=t.data.article.commentEntity.length,console.log(e.$data.article.commentEntity)})),this.artId=t.data)},textareaAInput:function(t){var e=t.detail.value;this.sendState=null==e||""==e||void 0==e,this.content=t.detail.value},timestampFormat:function(t){return a.articleUtil.timestampFormat(t)},commentSave:function(t){var e=this;this.$myRequest({url:"/comment/save",method:"post",data:{userId:this.$user.id,artId:this.artId,content:this.content}}).then((function(t){uni.showToast({title:"评论成功",icon:"exception",duration:850}),0==t.data.code&&e.$myRequest({url:"/article/info/"+e.artId+"/"+e.$user.id,methed:"get"}).then((function(t){e.$data.article=t.data.article,e.$data.imgArr=t.data.article.images.split(","),e.$data.article.commentEntitySize=t.data.article.commentEntity.length,e.content=""}))}))},clickThumbsup:function(t,e){var i=this;this.$set(this.$data.article.commentEntity[e],"praiseStatus",!this.$data.article.commentEntity[e].praiseStatus),this.$data.article.commentEntity[e].praiseStatus&&this.$myRequest({url:"/commentpraise/save",method:"post",data:{userId:this.$user.id,commentId:t}}).then((function(t){0==t.data.code&&i.$set(i.$data.article.commentEntity[e],"praises",i.$data.article.commentEntity[e].praises+1)})),this.$data.article.commentEntity[e].praiseStatus||this.$myRequest({url:"/commentpraise/delete",method:"post",data:{userId:this.$user.id,commentId:t}}).then((function(t){0==t.data.code&&i.$set(i.$data.article.commentEntity[e],"praises",i.$data.article.commentEntity[e].praises-1)}))},previewImg:function(t){var e=t.currentTarget.dataset.index,i=this.$data.imgArr;uni.previewImage({current:i[e],urls:i,success:function(t){},fail:function(t){},complete:function(t){}})},clickFocus:function(t,e){var i=this;t&&(this.$myRequest({url:"/attention/delete",method:"post",data:{meId:this.$user.id,followerId:e}}).then((function(e){0==e.data.code&&i.$set(i.article,"attentionStatus",!t)})),console.log("取消关注")),t||this.$myRequest({url:"/attention/save",method:"post",data:{meId:this.$user.id,followerId:e}}).then((function(e){0==e.data.code&&i.$set(i.article,"attentionStatus",!t)}))},toDiscover_desc:function(t){uni.navigateTo({url:"/pages/disconver/discover_desc_more/discover_desc_more?data="+t})}}};e.default=n},"59dc":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".pg[data-v-60677edf]{padding:%?5?% %?20?% %?20?% %?20?%}.radius-sm[data-v-60677edf]{border-radius:%?20?%}\n\n/* 头部 */.user-top[data-v-60677edf]{width:100%;height:%?100?%;display:flex;align-items:center;border-top-left-radius:%?20?%;border-top-right-radius:%?20?%;margin-top:%?20?%}.user-top-1 uni-image[data-v-60677edf]{height:%?80?%;width:%?80?%;border-radius:100%}.user-top-2[data-v-60677edf]{margin-left:%?20?%;width:65%}\n\n/* end */\n\n/* 文字 */.character[data-v-60677edf]{width:100%;height:auto;padding-top:%?20?%;display:flex}.character uni-text[data-v-60677edf]{font-weight:550;font-size:%?30?%;width:100%;word-wrap:break-word;word-break:normal;line-height:%?40?%}\n\n/* end */\n\n/* 九宫图 */.container-grid[data-v-60677edf]{display:flex;flex-wrap:wrap;width:100%}.container-grid__image[data-v-60677edf]{height:%?210?%;width:%?220?%;border-radius:%?10?%}.container-grid_img[data-v-60677edf]{width:%?223?%;border-radius:%?10?%}.container-grid_image[data-v-60677edf]{margin-right:%?10?%;width:32%}.container-grid_image-1[data-v-60677edf]{margin-right:%?10?%;width:100%}\n\n/* end */\n\n/* 底部浏览量 */.browse[data-v-60677edf]{width:100%;height:%?100?%;padding-top:%?20?%;display:flex;align-items:center;-webkit-mask-box-image:%?20?%;mask-border:%?20?%;border-bottom-left-radius:%?20?%;border-bottom-right-radius:%?20?%}.browse uni-text[data-v-60677edf]{font-size:%?25?%}.img-size[data-v-60677edf]{height:%?80?%;width:%?80?%}.cu-avatar.lg[data-v-60677edf]{width:%?60?%;height:%?60?%}.browse-2[data-v-60677edf]{width:46%}\n\n/* end */\n\n/* 评论 */.comment[data-v-60677edf]{margin-top:%?20?%;width:100%;height:%?100?%;border-top-left-radius:%?20?%;border-top-right-radius:%?20?%}.comment[data-v-60677edf]{color:#000;font-size:%?32?%;display:flex;align-items:center\n\t/* justify-content: center; */}\n\n/* end */\n\n/* 评论内容 */.comment-content[data-v-60677edf]{width:100%;height:auto}.comment-content-2_1_img[data-v-60677edf]{height:%?36?%;width:%?65?%;line-height:%?40?%}.comment-content-1[data-v-60677edf]{display:flex;align-items:center}.comment-content-1_image uni-image[data-v-60677edf]{height:%?50?%;width:%?50?%;border-radius:100%}.comment-content-1_2[data-v-60677edf]{margin-left:%?20?%;width:80%}.comment-content-2[data-v-60677edf]{margin-left:10%}\n\n/* end */\n\n/* 评论留言 */.leave[data-v-60677edf]{padding:%?20?%;height:auto;width:100%;background:#f1f1f1;margin-top:%?20?%;border-radius:%?20?%;word-wrap:break-word;word-break:normal;line-height:%?40?%}.leave-item[data-v-60677edf]{margin-top:%?20?%;color:#000}\n\n/* end */\n\n/* line */.line[data-v-60677edf]{width:100%;height:%?0.5?%;background:#dcdcdc;margin-top:%?20?%}\n\n/* end */\n\n/* 底部选项卡 */.msg_bottom[data-v-60677edf]{padding:%?20?%;width:100%;height:%?100?%;position:fixed;bottom:0;z-index:99;display:flex;align-items:center}.lines_msg[data-v-60677edf]{display:flex;height:%?10?%}.msg_bottom-1[data-v-60677edf]{width:55%;background:#f1f1f1;border-radius:%?40?%;padding:%?10?% %?20?% %?10?% %?20?%;display:flex;align-items:center}.msg_bottom-2[data-v-60677edf]{width:20%;margin-left:%?20?%}.text-icon[data-v-60677edf]{font-size:%?45?%}.text-char[data-v-60677edf]{font-size:%?35?%}\n\n/* end */.lines[data-v-60677edf]{display:flex;height:%?150?%}",""]),t.exports=e},"8f26":function(t,e,i){var a=i("59dc");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("d2b38100",a,!0,{sourceMap:!1,shadowMode:!1})},"99d3":function(t,e,i){"use strict";i.r(e);var a=i("c7f4"),n=i("f2fd");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("9c4a");var r,d=i("f0c5"),o=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"60677edf",null,!1,a["a"],r);e["default"]=o.exports},"9c4a":function(t,e,i){"use strict";var a=i("8f26"),n=i.n(a);n.a},aded:function(t,e,i){"use strict";i("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.articleUtil=void 0;var a={timestampFormat:function(t){if(!t)return"";t=new Date(t).getTime()/1e3;function e(t){return(1==String(t).length?"0":"")+t}var i=parseInt((new Date).getTime()/1e3),a=i-t,n=new Date(1e3*i),s=new Date(1e3*t),r=s.getFullYear(),d=s.getMonth()+1,o=s.getDate(),c=s.getHours(),u=s.getMinutes();s.getSeconds();if(a<60)return"刚刚";if(a<3600)return Math.floor(a/60)+"分钟前";if(n.getFullYear()==r&&n.getMonth()+1==d&&n.getDate()==o)return"今天"+e(c)+":"+e(u);var l=new Date(1e3*(i-86400));return l.getFullYear()==r&&l.getMonth()+1==d&&l.getDate()==o?"昨天"+e(c)+":"+e(u):n.getFullYear()==r?e(d)+"月"+e(o)+"日 "+e(c)+":"+e(u):r+"年"+e(d)+"月"+e(o)+"日 "+e(c)+":"+e(u)},clickThumbsup:function(t,e){var i=this;this.$set(this.$data.article.commentEntity[e],"praiseStatus",!this.$data.article.commentEntity[e].praiseStatus),this.$data.article.commentEntity[e].praiseStatus&&this.$myRequest({url:"/commentpraise/save",method:"post",data:{userId:this.$user.id,commentId:t}}).then((function(t){0==t.data.code&&i.$set(i.$data.article.commentEntity[e],"praises",i.$data.article.commentEntity[e].praises+1)})),this.$data.article.commentEntity[e].praiseStatus||this.$myRequest({url:"/commentpraise/delete",method:"post",data:{userId:this.$user.id,commentId:t}}).then((function(t){0==t.data.code&&i.$set(i.$data.article.commentEntity[e],"praises",i.$data.article.commentEntity[e].praises-1)})),console.log(this.$data.article.commentEntity[e].praiseStatus),console.log("childThumbsup")}};e.articleUtil=a},c7f4:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={uniIcons:i("cbd3").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"pg"},[i("v-uni-view",{staticClass:"user-top  padding-sm bg-white "},[i("v-uni-view",{staticClass:"user-top-1"},[i("v-uni-image",{attrs:{src:t.article.userVo.userProtrait}})],1),i("v-uni-view",{staticClass:"user-top-2"},[i("v-uni-view",{staticClass:"user-top-2_1"},[i("v-uni-text",{staticClass:"text-df text-black text-weight"},[t._v(t._s(t.article.userVo.userNikename))])],1),i("v-uni-view",[i("v-uni-text",{staticClass:"text-xs text-grey"},[t._v(t._s(t.timestampFormat(t.article.createTime)))])],1)],1),i("v-uni-view",{staticClass:"user-top-3"},[i("v-uni-button",{staticClass:"cu-btn round line-black",attrs:{bindtap:"attention",role:"button","aria-disabled":"false"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickFocus(t.article.attentionStatus,t.article.userVo.id)}}},[t._v(t._s(t.article.attentionStatus?"已关注":"+关注"))])],1)],1),i("v-uni-view",{staticClass:"character  padding-sm bg-white"},[i("v-uni-text",[t._v(t._s(t.article.content))])],1),i("v-uni-view",{staticClass:"container-grid padding-sm bg-white"},t._l(t.imgArr,(function(e,a){return i("v-uni-view",{key:a,class:2==a||5==a||8==a||4==t.imgArr.length?"":1==t.imgArr.length?"container-grid_image-1":"container-grid_image",style:4==t.imgArr.length?"width:32%;margin-right: 15rpx;":"",attrs:{"data-index":a},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.previewImg.apply(void 0,arguments)}}},[i("v-uni-image",{class:1==t.imgArr.length?"container-grid_img":"container-grid__image",style:1==t.imgArr.length?"width:100%;":"",attrs:{src:e}})],1)})),1),i("v-uni-view",{staticClass:"comment  padding-sm bg-white"},[i("v-uni-text",[t._v("全部评论 * "+t._s(t.article.commentEntitySize))])],1),t._l(t.article.commentEntity,(function(e,a){return i("v-uni-view",{key:a,staticClass:"padding shadow-warp  bg-white comment-content"},[i("v-uni-view",{staticClass:"comment-content-1"},[i("v-uni-view",{staticClass:"comment-content-1_image"},[i("v-uni-image",{attrs:{src:e.userVo.userProtrait}})],1),i("v-uni-view",{staticClass:"comment-content-1_2"},[i("v-uni-text",{staticClass:"text-black"},[t._v(t._s(e.userVo.userNikename))])],1),i("v-uni-view",[i("span",{on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.clickThumbsup(e.id,a)}}},[e.praiseStatus?t._e():i("uni-icons",{staticStyle:{"margin-right":"2px"},attrs:{type:"hand-up",size:"18"}}),e.praiseStatus?i("uni-icons",{staticStyle:{color:"#FF0000","margin-right":"2px"},attrs:{type:"hand-up-filled",size:"18"}}):t._e(),t._v(t._s(e.praises?e.praises:""))],1)])],1),i("v-uni-view",{staticClass:"comment-content-2"},[i("v-uni-view",{staticClass:"comment-content-2_1"},[i("v-uni-text",{staticClass:"text-black text-df text-weight"},[t._v(t._s(e.content))])],1),i("v-uni-view",{staticClass:"comment-content-2_2 margin-top-sm"},[i("v-uni-text",{staticClass:"text-sm"},[t._v(t._s(t.timestampFormat(e.createTime)))])],1),i("v-uni-view",{staticClass:"leave"},[t._l(e.comComEntityList.slice(-3),(function(e,a){return i("v-uni-view",{key:a,staticClass:"leave-item"},[i("v-uni-text",[t._v(t._s(e.userVo.userNikename)+" : "+t._s(e.comContext))])],1)})),i("v-uni-view",{staticClass:"margin-top-sm",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDiscover_desc(e.id)}}},[i("v-uni-text",{staticClass:"text-blue"},[t._v("查看底部"+t._s(e.comComEntityList.length)+"消息 >")])],1)],2)],1)],1)}))],2),i("v-uni-view",{staticClass:"lines"}),i("v-uni-view",{staticClass:" bg-white"},[i("v-uni-view",{staticClass:"msg_bottom bg-white"},[i("v-uni-view",{staticClass:"msg_bottom-1"},[i("v-uni-input",{attrs:{name:"msg",placeholder:"觉得不错说两句~~","cursor-spacing":"10",value:t.content},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.textareaAInput.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"msg_bottom-2"},[i("v-uni-button",{staticClass:"cu-btn round  bg-green",attrs:{role:"button","aria-disabled":"false",disabled:t.sendState},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.commentSave()}}},[t._v("发送")])],1),i("v-uni-view",{staticClass:"msg_bottom-2"},[i("v-uni-text",{staticClass:"cuIcon-message text-icon  lg text-black"}),i("v-uni-text",{staticClass:"text-char"},[t._v(t._s(t.article.commentEntitySize))])],1),i("v-uni-view",{staticClass:"msg_bottom-3"},[i("v-uni-text",{staticClass:"cuIcon-appreciate text-icon lg text-black"}),i("v-uni-text",{staticClass:"text-char"},[t._v(t._s(t.article.praises))])],1)],1)],1)],1)},s=[]},f2fd:function(t,e,i){"use strict";i.r(e);var a=i("514f"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a}}]);
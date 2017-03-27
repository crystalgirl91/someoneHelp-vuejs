<template>
	<div class="ls-tuiguang">
	<div class="tuiguang-top">
		<m-header :left-ops="{showBack: true}" :bg-style="{backgroundColor:'transparent'}"><a slot="right"><i class="icon-share"></i></a></m-header>
		<div class="ID-panel">
			<a class="ID-panel-favicon" v-link="{ path: '/teacher_detail' }" :style="'background-image:url('+ data.HeadPortraits + ')'"></a>
			<ul class="ID-panel-list">
				<li class="ID-panel-item">
					<span class="ID-panel-per ID-panel-per-big">{{data.UName}}</span>
					<span class="icon pictureicon" style="margin-right:0px"></span>
				</li>
				<li class="ID-panel-item">
					<span class="ID-panel-per">关注</span>
					<span class="ID-panel-per">|</span>
					<span class="ID-panel-per" style="margin-right:0px">粉丝数（{{data.FansCount}}）</span>
				</li>
				<li class="ID-panel-item">
					<span class="ID-panel-per" style="margin-right:5px" v-for="item in data.Field">{{ item }}</span>
				</li>
				<li class="ID-panel-item">
					<p class="ID-panel-per ID-panel-per-ellipsis" style="margin-right:0px">{{data.Present}}</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="tuiguang-body">
		<tab active-color="#ff9100">
			<tab-item :selected="idx === 1" @click="idx = 1">个人简介</tab-item>
			<tab-item :selected="idx === 2" @click="idx = 2">精品课</tab-item>
		</tab>
		<div class="tuiguang-artical" v-show="idx === 1">
			<p>{{{data.Details}}}</p>
		</div>
		<div class="tuiguang-artical tuiguang-artical-bg" v-show="idx === 2">
			<ul class="card-course">
				<li class="card-course-item" v-on:click="tolink()" v-for="item in data.TeamList">
					<a class="card-course-a" :style="'background-image:url('+ item.CoverUrl + ');background-size: cover;'" >
						<h3 class="card-course-title text-ellipsis">{{ item.TName }}</h3>
						<span  class="card-course-bottom"><i class="icon icon-zanshang-xuefen"></i>学币:{{item.Fee}}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<dialog  :show.sync="isshow" :hide-on-blur="true">
		<div class="m_dialog_content">
			<h3 class="m-dialog-title">
				提示
				<i class="m-dialog-close icon-close" v-on:click="isshow = false"></i>
			</h3>
			<div class="m-dialog-body">
				<div class="m-form-group">
					<label class="m-control-label">会员价格：</label>
					<span>{{price}}学币</span>
				</div>
				<div class="m-form-group">
					<label class="m-control-label">有效期限：</label>
					<span>{{validity}}天</span>
				</div>
				<x-button class="weui_btn_normal" type="normal" text="提交"></x-button>
			</div>
		</div>
	</dialog>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
  import MHeader from '../../components/header.vue';
  import Badge from "vux/src/components/badge";
  import Dialog from "vux/src/components/dialog";
  import { Tab,TabItem } from 'vux/src/components/tab';
  import XButton from 'vux/src/components/x-button';
  import Loading from "vux/src/components/loading"
  export default {
  data(){
  return {
  loading:true,
  idx:1,
  isshow:false,
  price:0,
  validity:"",
  data:{"PK_UID":"","PK_PID":null,"UName":"","Nickname":"","HeadPortraits":"","FansCount":0,"LevelImg":null,"Level":null,"Present":"","Details":"","Field":[],"TeamList":[]}
  }
  },
  components:{
  MHeader,
  Tab,
  TabItem,
  Badge,
  Dialog,
  XButton,
  Loading
  },
  ready:function(){

  //初始化微信的插件
  var _this=this;
  this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
  wx.config(res.body.Data);
  wx.ready(function () {
  _this.Isinitialize=true;
  });
  wx.error(function (res) {
  _this.Isinitialize=false;
  });
  this.getData();
  });
  },
  methods:{
  getData:function(){
  var posturl="/api/NoPermissions/GetTeacherShare";
  if(this.$route.params.PK_UID==undefined||this.$route.params.PK_UID==null){
  posturl="/api/Teacher/GetTeacherShare";
  }
  this.$http.post(posturl,{"PK_UID":this.$route.params.PK_UID}).then(res => {
  this.$set('data' , res.body.Data);
  //分享到朋友圈
  wx.onMenuShareTimeline({
  title: res.body.Data.UName+"专家", // 分享标题
  link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+res.body.Data.PK_UID, // 分享链接
  imgUrl: res.body.Data.HeadPortraits, // 分享图标
  success: function () {
  // 用户确认分享后执行的回调函数
  },
  cancel: function () {
  // 用户取消分享后执行的回调函数
  }
  });
  //分享到好有
  wx.onMenuShareAppMessage({
  title:  res.body.Data.UName+"专家", // 分享标题
  desc:  res.body.Data.Present, // 分享描述
  link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+res.body.Data.PK_UID, // 分享链接
  imgUrl: res.body.Data.HeadPortraits, // 分享图标
  type: 'link', // 分享类型,music、video或link，不填默认为link
  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  success: function () {
  // 用户确认分享后执行的回调函数
  },
  cancel: function () {
  // 用户取消分享后执行的回调函数
  }
  });

  });
  },
  tolink:function(){
  window.location="http://www.365yrb.cn/Share/Index?PK_UID="+this.data.PK_UID;
  }
  ,
  openDialog:function(e,item){
  e.preventDefault();
  if(item.CostType == 0){
  this.isshow = true;
  this.price=item.Fee;
  this.validity=item.DayLength+"天";
  }
  if(item.CostType == 1){
  //不需要收费
  this.$route.router.go("tuiguang_recharge");
  }
  }
  }
  }
</script>
<style>
	.tuiguang-top {
		background: url(../../assets/images/banner.jpg) no-repeat center top/ 100% 100%;
		background-size: 100% 100%;
	}
	
	.ID-panel {
		text-align: center;
		color: #fff;
	}
	
	.ID-panel .ID-panel-favicon {
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		background-position: center;
		background-size: 100%;
		width: 1.48rem;
		height: 1.48rem;
		margin: 0 auto;
		display: block;
	}
	
	.ID-panel-list {
		padding: .1rem;
		list-style: none;
	}
	
	.ID-panel-list .ID-panel-item {
		margin-bottom: .1rem;
		color: #fff;
		font-size: .24rem;
		text-align: center;
		max-width: 100%;
	}
	.ID-panel-list .ID-panel-item .pictureicon{
		width: .6rem;
		height: .3rem;
		display: inline-block;
		background-image: url(../../assets/images/rate1.png);
		background-position: center;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.ID-panel-list .ID-panel-item .ID-panel-per {
		display: inline-block;
		margin-right: .2rem;
		vertical-align: middle;
	}
	
	.ID-panel-item .ID-panel-per.ID-panel-per-ellipsis {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 0px;
	}
	
	.ID-panel-list .ID-panel-item .ID-panel-per.ID-panel-per-big {
		font-size: .32rem;
		vertical-align: middle;
	}
	
	.ID-panel-list .ID-panel-item .ID-panel-per.ID-panel-per-big~.icon {
		font-size: .32rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.icon-share {
		font-size: 18px;
		color: #ff9000;
		display:none;
	}
	
	.tuiguang-artical {
		padding: .22rem;
	}
	.tuiguang-artical.tuiguang-artical-bg{
		background-color: #f0f4f3;
	}
	
	.tuiguang-artical p {
		font-size: .28rem;
		line-height: 2;
		text-indent: .20rem;
		color:#666;
	}
	
	.card-course {
		background-position: center;
		background-size: 100%;
	}
	
	.card-course .card-course-item {
		margin-bottom: .5rem;
		height: 3.12rem;
		background-color: #ddd;
		position: relative;
	}
	
	.card-course .card-course-a {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	
	.card-course .card-course-title {
		background-color: rgba(124, 124, 124, 0.5);
		color: #fff;
		font-size: .36rem;
		text-align: center;
		width: 100%;
		line-height: .76rem;
		position: absolute;
		width: 100%;
		bottom: .6rem;
		z-index: 2;
		padding: 0px .2rem;
		box-sizing: border-box;
	}
	
	.card-course-bottom {
		font-size: .14rem;
		color: #fff;
		position: absolute;
		bottom: .1rem;
		right: .1rem;
		z-index: 1;
		line-height: .2rem;
	}
	
	.card-course-bottom .icon {
		color: #eb4f38;
		font-size: .40rem;
		vertical-align: middle;
		margin-right: .1rem;
		display: inline-block;
	}
	
	.card-course-badge {
		position: absolute;
		z-index: 1;
		right: .1rem;
		bottom: .1rem;
	}	

	.ls-tuiguang{
		width: 100%;
	}
	
	.ls-tuiguang .m-label {
		font-size: .3rem;
	}
	
	.ls-tuiguang .m-dialog-body {
		font-size: .14rem;
		color: #666;
	}
	
	.ls-tuiguang .m-dialog-title {
		position: relative;
		color: #666;
		font-size: .34rem;
		margin-bottom: 0;
		font-weight: normal;
	}
	
	.ls-tuiguang .m-dialog-body .m-form-group {
		margin-bottom: .3rem;
		font-size: .3rem;
	}
	
	.ls-tuiguang .m-dialog-body .m-form-group .m-control-label {
		font-size: .3rem;
		display: inline-block;
		width: 50%;
		color: #333;
	}
	.ls-tuiguang .m-dialog-body .m-form-group .m-control-label~span{
		display: inline-block;
		width:40%;
		text-align: left;
	}
	
	.ls-tuiguang .m-dialog-title .m-dialog-close {
		position: absolute;
		right: .42rem;
		top: .2rem;
	}
</style>
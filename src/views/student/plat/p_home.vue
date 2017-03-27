<template>
	<div class="plat_home">
		<div class="question-tab  vux-1px-b">
			<span class="toolbtn toolbtn-spe menu-btn" style="display: none;" v-link="{'path':'/discover_message'}"><i class="icon icon-xiaoxi"></i></span>
			<!-- <span class="toolbtn search-btn"  v-link="{'path':'/search'}"><i class="icon icon-search2"></i></span> -->
			<span v-on:click="GetScan()" class="toolbtn toolbtn-spe  comment-btn"><i class="icon icon-scanning"></i></span>
		</div>
		<section :style="{'background-image':'url('+ flash.FVImage +')'}" class="banner vux-1px-b"></section>
		<section class="menu">
			<ul class="menu-list clearfix">
				<li class="menu-item" v-link="{'path':'/plat_class'}">
					<div class="icon font-active icon-class2"></div>
					<div class="menu-title">班级</div>
				</li>
				<li class="menu-item" v-link="{'path':'/plat_exam'}">
					<div class="icon font-active icon-exam"></div>
					<div class="menu-title">考试</div>
				</li>
				<li class="menu-item" v-link="{'path':'/plat_activity'}">
					<div class="icon font-active icon-activity"></div>
					<div class="menu-title">活动</div>
				</li>
				<li class="menu-item" v-link="{'path':'/plat_knowledge'}">
					<div class="icon font-active icon-knowledge-base"></div>
					<div class="menu-title">知识库</div>
				</li>
				<li class="menu-item" v-link="{'path':'/plat_ask'}">
					<div class="icon font-active icon-my-ques-and-ans"></div>
					<div class="menu-title">问答</div>
				</li>
				<li class="menu-item" v-link="{'path':'/plat_mark'}">
					<div class="icon font-active icon-integral-mall"></div>
					<div class="menu-title">积分商城</div>
				</li>
			</ul>
		</section>
		<section class="card-list card-list-spand clearfix" :class="{'show':expand}">
			<h3 class="title-witharrow">
				<i class="icon icon-sign font-active"></i>
				<span class="title-word">内训师</span>
				<a @click.prevent @click="expand = !expand" class="pull-right"><i class="icon icon-pull-down"></i></a>
			</h3>
			<div class="card-vertical" v-for="teach in teachers" v-link="{name:'plat_question',params:{id:teach.PK_UID}}">
				<div class="card-pic"><img :src="teach.HeadPortraits"></div>
				<div class="card-word">
					<p class="name">{{teach.UName}}</p>
					<p class="name">擅长：<span class="good" v-for="good in teach.GoodAT">{{good}}</span></p>
				</div>
			</div>
		</section>
		<section class="card-list clearfix">
			<h3 class="title-witharrow">
				<i class="icon icon-sign font-active"></i>
				<span class="title-word">推荐知识</span>
				<a  class="pull-right" v-on:click="changeKType(1)"  :class="{'font-active':ktype===1}">热度</a>
				<a  class="pull-right" v-on:click="changeKType(0)" :class="{'font-active':ktype===0}">最新</a>
			</h3>
			<div class="card-news" v-for="item in knowledges" v-link="{'name':'plat_course_detail',params:{'PK_CID':item.PK_CID}}">
				<div class="card-pic"><img :src="item.CoverImage"></div>
				<div class="card-body">
					<h4 class="card-title">{{item.CName}}</h4>
					<p class="card-desc">{{item.Introduction}}</p>
					<div class="card-tool clearfix">
						<span class="card-tool-left"><span class="color-red" v-for="n in item.KName">{{n}}</span></span>
						<span class="card-tool-right">
							<span class="t color-blue"><i class="icon icon-comments "></i>{{item.ReplyCount}}</span>
							<span class="t color-red"><i class="icon icon-score-empty"></i>{{item.Score}}</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	</div>
	<!-- <loading :show.sync="loading" text="加载中"></loading> -->
</template>
<script>
	import Badge from "vux/src/components/badge"
	import MHeader from "../../../components/header.vue"
	export default {
		data(){
			return {
				ktype:1,
				loading:false,
				flash:{},
				Isinitialize:false,
				knowledges:[],
				teachers:[],
				expand:false
			}
		},
		components:{
			MHeader,
			Badge
		},
		ready:function(){
			this.getData().then(this.getTeacher).then(this.getFlash);
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
			});
		},
		methods:{
			getData:function(){
				var postData = {
					"GetType":this.ktype,
					"PK_KCID":"",
					"PageIndex":1,
					"PageSize":100
				};
				return this.$http.post("/API/Student/GetKnowledge",postData).then(res =>{
					this.knowledges = res.body.Data;
				});
			},
			getTeacher:function(){
				var postData = {
					"PageIndex":1,
					"PageSize":100
				};
				return this.$http.post("/API/Student/GetDivision",postData).then(res =>{
					this.teachers = res.body.Data;
				});
			},
			changeKType:function(type){
				this.ktype = type;
				this.getData();
			},
			getFlash:function(){
				return this.$http.post("/API/Student/GetFlashView",{
					"FVType":0
				}).then(res => {
					this.flash = res.body.Data[0];
				})
			},
			GetScan:function(){
				var _this=this;
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function (res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						_this.$route.router.go({'name':'plat_course_detail',params:{'PK_CID':result}});
					}
				});
			}
		}
	}
</script>
<style>
	.card-list.card-list-spand{
		height: 3.4rem;
    	overflow: hidden;
	}
	.card-list.card-list-spand.show{
		height: auto;
	}
	.plat_home .question-tab .toolbtn.toolbtn-spe{
		top: .2rem;
	}
	.plat_home .question-tab .toolbtn.toolbtn-spe .icon:before{
		vertical-align: top;
	}
	.plat_home .card-word .name{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.plat_home {
		min-height: 100%;
		background: #f0f4f3;
		box-sizing: border-box;
		padding-bottom: 1.3rem;
	}
	.plat_home .banner{
		height: 2.5rem;
		width: 100%;
		background-color:#dfdfdf;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center;
		margin-bottom: .1rem;
		background-image: none;
	}
	.plat_home .menu{
		margin-bottom: .1rem;
	}
	.plat_home .menu .menu-list{
		text-align: center;
		background-color: #fff;
	}
	.plat_home .menu .menu-item{
		width: 25%;
		float: left;
		padding: .3rem  0 .2rem 0; 
		box-sizing: border-box;
	}
	.plat_home .menu-item .icon{
		font-size: .6rem;
		margin-bottom: .12rem;
	}
	.plat_home .menu-item .menu-title{
		font-size: .24rem;
		color: #666;
	}
	.plat_home .card-list{
		background-color: #fff;
		padding: 0rem .3rem 0rem .3rem;
		border-bottom: 1px solid #dfdfdf;
	}

	.plat_home  .card-news:last-child{
		border-bottom: 0px;
	}
	.plat_home .card-vertical{
		padding: 0 .27rem;
		float: left;
		width: 33.3%;
		box-sizing: border-box;
	}
	.plat_home  .card-list .pull-right{
		float: right;
		margin-left: .2rem;
	}
	.plat_home  .card-list .pull-right .icon{
		vertical-align: middle;
	}
	.plat_home .question-tab{
		background-color: #fff;
    	padding: .2rem 0px;
    	min-height: .52rem;
	}
	.plat_home .card-desc{
		height: .76rem;
		overflow: hidden;
	}
	
</style>
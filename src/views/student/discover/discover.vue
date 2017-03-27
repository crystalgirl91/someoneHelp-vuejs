<template>
	<div class="discover">
		<div class="question-tab vux-1px-b">
			<span class="toolbtn menu-btn" v-link="{'path':'/sidepull'}"><i class="icon icon-fenlei"></i></span>
			<tab :animate='false' :line-width='0' :active-color='"#fff"' :default-color='"#ff9100"'>
			  <tab-item :selected="block === 1" @click="block = 1">专家</tab-item>
			  <tab-item :selected="block === 2" @click="block = 2">问答</tab-item>
			</tab>
			<span class="toolbtn search-btn" v-link="{'path':'/search_ask'}"><i class="icon icon-search2"></i></span>
			<span class="toolbtn comment-btn" v-link="{'path':'/discover_message'}"><i class="icon icon-xiaoxi"></i><badge v-show="messNum - 0 > 0" :text="messNum"></badge></span>
		</div>
		<ul class="s-cardlist" v-show="block === 1">
			<li class="s-card" v-for="item in list">
				<!-- v-link="{name:'discover_expert',params:{'id':item.PK_UID}}" -->
				<a class="s-card-fav clearfix" @click.prevent @click="got_detail(item)">
					<div class="fav border-light"><img :src="item.HeadPortraits"></div>
					<div class="message">
						<h3 class="name">{{item.UName}} <span :style="{'background-image':'url('+ item.LevelImage+')'}" class="level-icon"></span></h3>
						<p class="tags"><span class="tag border-light" v-for="d in item.Domains">{{d}}</span></p>
						<p class="word font-base">{{item.Present}}</p>
						<span class="status color-green">{{item.OnLineStateName}}</span>
					</div>
				</a>
				<a class="dis-block" v-link="{name:'discover_course',params: {id:course.PK_MID }}" v-for="course in item.Microlectures">
					<div class="dis-icon-group">
						<span class="word">微&nbsp;&nbsp;&nbsp;课</span><br>
						<span style="display:none;" class="icon icon-voice color-red"></span>
						<span style="display:none;" class="icon icon-picture2 color-green"></span>
						<span style="display:none;" class="icon icon-video2 color-purple"></span>
					</div>
					<div class="dis-desc">
						<p class="p">{{course.MTextContent}}</p>
						<div class="toolbar">
							<span class="toolbar-span">{{course.TimeStr}}</span>
							<span class="toolbar-span color-blue"><i class="icon icon-comments"></i> {{course.ReplyCount}}</span>
							<span class="toolbar-span color-red"><i class="icon icon-zan"></i> {{course.PraiseCount}}</span>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<question v-if="block === 2"></question>
		<div class="addtool-fix" >
			<i class="icon icon-add-professor" v-on:click="istool = !istool"></i>
			<ul class="addtool-list" v-if="istool">
				<li class="addtool-item" v-show="IsAdd" v-on:click="ToLinkAdd()">找专家</li>
				<li class="addtool-item" v-link="{'path':'/discover_add_speek'}">约通话</li>
				<li class="addtool-item" v-link="{'path':'/discover_add_meet'}">约见面</li>
				<li class="addtool-item" v-link="{'path':'/discover_add_teach'}">约授课</li>
				<li class="addtool-item" v-link="{'path':'/discover_add_consult'}">约咨询</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	import {Tab,TabItem} from "vux/src/components/tab"
	import Badge from "vux/src/components/badge"
	import Question from "./question.vue"
	export default {
		data(){
			return {
				istool:false,
				block:1,
				list:[],
				IsAdd:true,
				messNum:"0"
			}
		},
		components:{
			MHeader,
			Tab,
			TabItem,
			Badge,
			Question
		},
		ready:function(){
			var _this=this;
				_this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
					wx.ready(function () {
						wx.hideOptionMenu();
						});
				});
			this.getData().then(this.getMessNumber().then(this.checkAdd()));
		},
		methods:{
			getData: function(){
				return this.$http.post("/API/Student/GetMyTeacher",{ "PageIndex":1, "PageSize":100 }).then(res => {
					this.list = res.body.Data;
				})
			},
			getMessNumber:function(){
				return this.$http.post("/API/Student/GetMessageNotificationList",{
					"PageIndex":1, "PageSize":1
				}).then(res => {
					this.messNum = String(res.body.Data.UnreadTotalMessagesCount);
				})
			},
			got_detail:function(param){
				this.$router.go({name:"discover_expert",params:{"id":param.PK_UID}})
			},
			checkAdd:function(){
				return this.$http.post("/API/Student/GetStateAttentionTeacher").then(res => {
					this.IsAdd=res.body.Data;
				});
				
			},
			ToLinkAdd:function(){
				return this.$http.post("/API/Student/GetStateAttentionTeacher").then(res => {
					if(res.body.Data){
						this.$router.go({name:"discover_add_expert"});
					}else{
						alert("不可添加");
					}
				});
				
			}
		}
	}
</script>
<style>
	.s-card{
		padding: .2rem .3rem 0 .3rem;
		background-color: #fff;
		margin-bottom: .1rem;
	}
	.s-card .s-card-fav{
		display: block;		
	}
	.s-card-fav .fav{
		width: 1.8rem;
		height: 1.8rem;
		border-width: 1px;
		border-style: solid;
		border-radius: .06rem;
		float: left;
		overflow: hidden;
	}
	.s-card-fav .fav>img{
		width: 100%;
		height: 100%;
	}
	.s-card .message{
		padding-left:2rem;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		min-height: 2rem;
	}
	.message .name{
		font-size: .34rem;
		font-weight: normal;
		line-height: .5rem;
	}
	.message .name .level-icon{
		width: .6rem;
		vertical-align: baseline;
		height: .3rem;
		background-position: center;
		background-size: 100% auto;
		background-repeat: no-repeat;
		display: inline-block;
	}
	.message .status{
		position: absolute;
		right: .3rem;
		top: 0px;
	}
	.message .tags{
		font-size: .22rem;
	}
	.message .tags .tag{
		display: inline-block;
		border-width: 1px;
		border-style: solid;
		margin-right: .15rem;
		padding: 0px 3px;
		margin-bottom: .15rem;
	}
	.message .word{
		font-size: .26rem;
		line-height: .45rem;
	}
	.message .word .icon{
		font-size: .24rem;
	}
	.message .note{
		font-size: .22rem;
		line-height: .35rem;
	}
	.dis-block{
		border-bottom: 1px solid #eaeaea;
		display: block;
		padding: .2rem 0rem;
	}
	.dis-block:last-child{
		border-bottom: 0px;
	}
	.dis-block .dis-desc{
		padding-left: 2rem;
	}
	
	.dis-icon-group{
		float: left;
		width: 1.8rem;
		text-align: right;
		margin-right: .15rem;
	}
	.dis-icon-group .word{
		display: inline-block;
		border-width: 1px;
		border-style: solid;
		font-size: .24rem;
		padding: 0 .08rem;
		margin-bottom: .06rem;
		border-color: #eaeaea;
	}
	.dis-icon-group .dis-desc .p{
		font-size: .24rem;
		line-height: .4rem;
		color: #666;
	}
	.dis-desc .p{
		max-height: .9rem;
		overflow: hidden;
		line-height: .45rem;
		font-size: .24rem;
	}
	.dis-desc .toolbar{
		text-align: right;
		line-height: .4rem;
		padding: .15rem;
	}
	.dis-desc .toolbar .toolbar-span{
		margin-right: .1rem;
		font-size: .22rem;
	}
	.toolbar-span .icon{
		font-size: .22rem;
		vertical-align: middle;
	}
	.discover{
		min-height: 100%;
		box-sizing: border-box;
		padding-bottom: 1.3rem;
		background-color: #f0f4f3;
	}
	.discover .note .font-active{
		margin-right: .15rem;
		display: inline-block;
	}
	
		.question-tab{
		background-color: #fff;
		padding: .2rem 0px;
		position: relative;
		margin-bottom: .1rem;
	}
	.question-tab .toolbtn{
		color: #ff9100;
		position: absolute;
		top: .25rem;
		display: block;
		font-size: .5rem;
	}
	.question-tab .toolbtn.menu-btn{
		left: .3rem;
	}
	.question-tab .toolbtn>.icon{
		display: block;
	}

	.question-tab .toolbtn.search-btn{
		right: 1rem;
	}
	.question-tab .toolbtn.comment-btn{
		right: 0.3rem;
	}
	.question-tab .toolbtn .vux-badge{
		position: absolute;
		right: -2px;
		top:-2px;
		text-align: center;
	}
	.question-tab .vux-tab{
		width: 3.3rem;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		border:2px solid #ff9100;
		height: auto;
	}
	.question-tab .vux-tab .vux-tab-item{
		font-size: .34rem;
		height: .52rem;
		background: 0,0;
		line-height: inherit;
	}
	.question-tab .vux-tab .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
	}
	.question-tab .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
	}
</style>

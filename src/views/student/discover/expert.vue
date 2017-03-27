	<template>
		<div class="ls-expert">
		<div class="tuiguang-top">
			<m-header :left-ops="{showBack:false}" :bg-style="{backgroundColor:'transparent'}">
				<a slot="left" class="m-header-back" v-link="{'path':'/home/discover'}"></a>
				<a style="display:none;" slot="right"><i class="icon-share2"></i></a></m-header>
			<div class="ID-panel">
				<a class="ID-panel-favicon" :style="'background-image:url('+ data.HeadPortraits + ')'"></a>
				<ul class="ID-panel-list">
					<li class="ID-panel-item">
						<span class="ID-panel-per ID-panel-per-big">{{data.UName}}</span>
						<span class="icon level-icon" :style="{'background-image':'url('+ data.LevelImage +')'}"></span>
					</li>
					<li class="ID-panel-item">
						<span class="ID-panel-per" @click="attention()" v-show="data.IsAttention">已关注</span>
						<span class="ID-panel-per" @click="attention()" v-show="!data.IsAttention">关注</span>
						<span class="ID-panel-per" v-show="data.IsAttention">|</span>
						<span class="ID-panel-per">粉丝数（{{data.FansCount}}）</span>
					</li>
					<li class="ID-panel-item">
						<span class="ID-panel-per" v-for="d in data.Domains">{{d}}</span>
					</li>
					<li class="ID-panel-item">
						<p class="ID-panel-per ID-panel-per-ellipsis">{{data.Present}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="tuiguang-body">
			<tab active-color="#ff9100">
				<tab-item :selected="idx === 1" @click="idx = 1">今日分享</tab-item>
				<tab-item :selected="idx === 2" @click="idx = 2">精品班</tab-item>
				<tab-item :selected="idx === 3" @click="idx = 3">互动问答</tab-item>
			</tab>
			<div class="bg-bar-gray"></div>
			<expert-share v-show="idx === 1"></expert-share>
			<div class="tuiguang-artical" v-show="idx === 2">
				<ul class="card-course">
					<li class="card-course-item" v-for="item in courses">
						<a @click.prevent v-on:click="openDialog(item)" class="card-course-a" :style="'background-image:url('+ item.CoverUrl + ');background-size: cover;background-position: center;'">
							<h3 class="card-course-title text-ellipsis">{{ item.TName }}</h3>
							<span v-show="item.IsPay == false" class="card-course-bottom"><i class="icon icon-zanshangxuebi"></i>学币:{{item.Fee}}</span>
							<badge v-show="item.IsPay == true"  text="会员" class="card-course-badge"></badge>
						</a>
					</li>
				</ul>
			</div>
			<expert-hudong v-show="idx === 3"></expert-hudong>
			<section class="fixed-tele">
				<a :href="'tel:'+ telephone" >
					<i class="icon icon-assistant"></i>助理
				</a>
			</section>
			<section class="footer-btn">
				<button class="button green" v-link="{'name':'discover_question','params':{'id':id}}">提问</button>
				<button class="button gray" @click="showTool = !showTool">更多</button>
				<div class="addtool-fix" v-show="showTool">
					<ul class="addtool-list">
						<li class="addtool-item" v-link="{'path':'/discover_add_speek'}">约通话</li>
						<li class="addtool-item" v-link="{'path':'/discover_add_meet'}">约见面</li>
						<li class="addtool-item" v-link="{'path':'/discover_add_teach'}">约授课</li>
						<li class="addtool-item" v-link="{'path':'/discover_add_consult'}">约咨询</li>
					</ul>
				</div>
			</section>
		</div>
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title">
					提示
				</h3>
				<div class="m-dialog-body">
					<div class="m-form-group">
						<label class="m-control-label">会员价格：</label>
						<span>{{dialogData.Fee}}学币</span>
					</div>
					<div class="m-form-group">
						<label class="m-control-label">有效期限：</label>
						<span>{{dialogData.DayLength}}天</span>
					</div>
				</div>
				<flexbox :gutter="0" class="m-dialog-footer">
					<flexbox-item ><button @click="goClassDetail()" class="m-dialog-button">确定</button></flexbox-item>
					<flexbox-item><button class="m-dialog-button" v-link="{'path':'/mycenter/recharge'}">充值</button></flexbox-item>
				</flexbox>
			</div>
		</dialog>
		</div>
	</template>
	<script>
		import MHeader from '../../../components/header.vue';
		import ExpertShare from './expert_share.vue';
		import ExpertHudong from './expert_hudong.vue';
		import Badge from "vux/src/components/badge";
		import Dialog from "vux/src/components/dialog";
		import { Tab,TabItem } from 'vux/src/components/tab';
		import XButton from 'vux/src/components/x-button';
		import {Flexbox,FlexboxItem} from "vux/src/components/flexbox"
		export default {
			data(){
				return {
					id:this.$route.params.id,
					idx:2,
					isshow:false,
					data:{},
					courses:[],
					telephone:"",
					showTool:false,
					dialogData:{}
				}
			},
			ready:function(){
				var _this=this;
				_this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					_this.getData().then(_this.getCourses).then(_this.getTel);
					wx.config(res.body.Data);
					wx.ready(function () {});
				});
				
			},
			components:{
				MHeader,
				Tab,
				TabItem,
				Badge,
				Dialog,
				XButton,
				ExpertShare,
				ExpertHudong,
				Flexbox,
				FlexboxItem
			},
			methods:{
				openDialog:function(item){
					this.$http.post("/API/Student/CheckUserInTeam",{
						 "PK_TID":item.PK_TID
					}).then(res => {
						var isFee = res.body.Data.State;
						if(isFee){
							this.isshow = true;
							this.dialogData = item;
						}else{
							this.$router.go({"name":"discover_class_detail",params:{'PK_TID':item.PK_TID}})
						}
					})
				},
				Forward:function(){
					this.$http.post("/API/Student/Forward");
				}
				,
				getData: function(){
					return this.$http.post("/API/Student/GetTeacherIndex",{"PK_UID":this.id}).then(res =>{
						this.data = res.body.Data;
						//初始化微信分享
						var _this=this;
						wx.showOptionMenu();
						_this.$http.post("/api/NoPermissions/GetTeacherShare",{"PK_UID":_this.data.PK_UID}).then(res => {
									//分享到朋友圈
							wx.onMenuShareTimeline({
								title: res.body.Data.UName+"专家", // 分享标题
								link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+_this.data.PK_UID, // 分享链接
								imgUrl: res.body.Data.HeadPortraits, // 分享图标
								success: function () { 
									// 用户确认分享后执行的回调函数
									_this.Forward();
								},
								cancel: function () { 
									// 用户取消分享后执行的回调函数
								}
							});
							//分享到好有
							wx.onMenuShareAppMessage({
								title:  res.body.Data.UName+"专家", // 分享标题
								desc:  res.body.Data.Present, // 分享描述
								link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+_this.data.PK_UID, // 分享链接
								imgUrl: res.body.Data.HeadPortraits, // 分享图标
								type: 'link', // 分享类型,music、video或link，不填默认为link
								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
								success: function () { 
									// 用户确认分享后执行的回调函数
									_this.Forward();
								},
								cancel: function () { 
									// 用户取消分享后执行的回调函数
								}
							});
						});
					});
				},
				getCourses: function(){
					return this.$http.post("/API/Student/GetTeacherTeamList",{
						"PK_UID":this.id,
						"PageIndex":1,
						"PageSize":100
					}).then(res => {
						this.courses = res.body.Data;
					})
				},
				getTel:function(){
					return this.$http.post("/API/Student/GetAssistant",{
						"PK_UID":this.id
					}).then(res => {
						if(res.body.Data.length>0){
							this.telephone = res.body.Data[0].Telephone;
						}
						
					})
				},
				goClassDetail:function(){
					this.$http.post("/API/Student/UserJoinTeam",{
						"PK_TID":this.dialogData.PK_TID
					}).then(res => {
						this.$router.go({"name":"discover_class_detail",params:{'PK_TID':this.dialogData.PK_TID}})
					})
				},
				attention:function(type){
					if(this.data.IsAttention){
						this.$http.post("/API/Student/SetCancelAttentionTeacher",{
							 "PK_UID":this.id
						}).then(res => {
							this.data.IsAttention = !this.data.IsAttention;
							this.getData();
						});
					}else{
						this.$http.post("/API/Student/SetAttentionTeacher",{
							 "PK_UID":this.id
						}).then(res => {
							this.data.IsAttention = !this.data.IsAttention;
							this.getData();
						});
					}
				}
			}
		}
	</script>
	<style>
		.tuiguang-top{
			background:url(../../../assets/images/banner.jpg) no-repeat center top/ 100% 100%;
		}
		.tuiguang-body .addtool-fix {
		    position: fixed;
		    z-index: 10;
		    bottom: 5px;
		    right: 1rem;
		}
		.ID-panel{
			text-align: center;
			color: #fff;
		}
		.ID-panel .ID-panel-favicon{
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
		.ID-panel-list{
			padding: .1rem;
			list-style: none;
		}
		.ID-panel-list .ID-panel-item{
			margin-bottom: .1rem;
			color: #fff;
			font-size: .24rem;
			text-align: center;
			max-width: 100%;
		}
		.ID-panel-list .ID-panel-item .level-icon{
			width: .6rem;
			height: .4rem;
			background-position: center;
			background-size: 100% auto;
			background-repeat: no-repeat;
		}
		.ID-panel-list .ID-panel-item .ID-panel-per{
			display: inline-block;
			margin-right: .2rem;
			vertical-align: middle;
			
		}
		.ID-panel-list .ID-panel-item .ID-panel-per:last-child{
			margin-right: 0px;
		}
		.ID-panel-item .ID-panel-per.ID-panel-per-ellipsis{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0px;
		}
		.ID-panel-list .ID-panel-item .ID-panel-per.ID-panel-per-big{
			font-size: .32rem;
			vertical-align: middle;
		}
		.ID-panel-list .ID-panel-item .ID-panel-per.ID-panel-per-big~.icon{
			font-size: .32rem;
			display: inline-block;
			vertical-align: middle;
		}
		.icon-share{
			font-size: 18px;
			color: #ff9000;
		}
		.tuiguang-artical {
			padding: .22rem;
		}
		.tuiguang-artical p{
			font-size: .28rem;
			line-height: 2;
			text-indent: .20rem
		}

		.card-course{
			background-position: center;
			background-size: 100%;
		}
		.card-course .card-course-item{
			margin-bottom: .5rem;
			height: 3.12rem;
			background-color: #ddd;
			position: relative;
		}
		.card-course .card-course-item:last-child{
			margin-bottom: 0px;
		}
		.card-course .card-course-a{
			display: inline-block;
			width: 100%;
			height: 100%;
		}
		.card-course .card-course-title{
			background-color: rgba(124,124,124,0.5);
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
		.card-course-bottom{
			font-size: .14rem;
			color: #fff;
			position: absolute;
			bottom: .1rem;
			right: .1rem;
			z-index: 1;
			line-height: .2rem;

		}
		.card-course-bottom .icon{
			color: #eb4f38;
			font-size: .40rem;
			vertical-align: middle;
			margin-right: .1rem;
			display: inline-block;
		}
		.card-course-badge{
			position: absolute;
			z-index: 1;
			right: .1rem;
			bottom: .1rem;
		}
		.ls-expert{
			/*background-color: #f0f4f3;*/
		}
		.ls-expert .m-label{
			font-size: .3rem;
		}
		.ls-expert .m-dialog-body{
			/*font-size: .14rem;*/
			color: #666;
		}
		.ls-expert .m-dialog-title{
			position: relative;
			color: #666;
			font-size: 15px;
			/*margin-bottom: .2rem;*/
			font-weight: normal;
		}
		.ls-expert .m-dialog-body .m-form-group{
			margin-bottom: .3rem;
			text-align: left;
		}
		.ls-expert .m-dialog-body .m-form-group .m-control-label{
			    display: inline-block;
			    width: 50%;
			    text-align: right;
		}
		.ls-expert .m-dialog-title .m-dialog-close{
			position: absolute;
			right: .42rem;
			top:.2rem;
		}
		.tuiguang-body .footer-btn{
			position: fixed;
			bottom: 0px;
			left: 0px;
			width: 100%;
			z-index: 200;
		}
		.tuiguang-body .footer-btn .button{
			border:0px;
			width: 100%;
			border-radius:0px;
			outline: none;
			line-height: 1rem;
			text-align: center;
			display: block;
			float: left;
			font-size: .3rem;

		}
		.tuiguang-body .footer-btn .green{
			background-color: #83d360;
			width: 70%;
			color: #fff;
		}
		.tuiguang-body .footer-btn .gray{
			background-color: #e9eceb;
			width: 30%;
			color: #333;
		}
		.tuiguang-body .fixed-tele{
			padding-right: 1.8rem;
			text-align: right;
			padding-top: .4rem;
			padding-bottom: 1.3rem;
			display: block;
		}
		.tuiguang-body .fixed-tele .icon{
			font-size: .60rem;
			vertical-align: middle;
			margin-right: .1rem;
		}
	</style>


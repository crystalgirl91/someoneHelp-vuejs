<template>
	<m-header :title="data.TName"></m-header>
	<div class="bg-bar-gray"></div>
	<div class="plat_class_detail">
		<table class="class_detail_tabel">
			<thead>
				<tr>
					<td colspan="2" class="title">{{data.GroupName}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-link="{'name':'plat_student',params:{'PK_TID':PK_TID}}">
					<td class="td"><i class="icon icon-Num-of-participants color-blue"></i><span class="label">同班同学</span>{{data.UserNumber}}人</td>
					<td class="td" v-link="{name:'class_buy',params:{PK_UID:data.PK_UID}}"><i class="icon icon-zanshangxuebi font-active" ></i><span class="label">赞赏</span></td>
				</tr>
			</tbody>
		</table>
		<div class="bg-bar-gray"></div>
		<section class="plat_course">
			<div class="course-intro">
				<div class="title"><h3 class="title-border-l">课程介绍</h3></div>
				<div class="page" v-html="data.Introduction"></div>
			</div>
			<div class="course-list">
				<div class="title"><h3 class="title-border-l">课程列表</h3></div>
				<ul class="m-cell-list">
					<li class="m-cell" v-for="course in data.CurriculumList" v-link="{name:'plat_course_detail',params:{'PK_CID':course.PK_CID}}"><i class="left icon icon-sign"></i><span class="word">{{course.CName}} </span><span class="right"><i class="icon icon-enter2 font-active"></i></span></li>
				</ul>
			</div>
		</section>
		<div class="bg-bar-gray"></div>
		<section class="plat_tab">
			<ul class="plat_tab-title clearfix">
				<li class="plat_tab_item vux-1px-r" :class="{'font-active': selected===1}" v-on:click="selected=1">老师说</li>
				<li class="plat_tab_item" :class="{'font-active': selected===2}" v-on:click="selected=2">大家说</li>
			</ul>
			<section class="plat_teacher">
				<div class="m-card-tips" v-for="item in comments">
					<flexbox align="flex-start">
						<flexbox-item :style="_style" class="m-card-portrait"><img :src="item.HeadPortraits "></flexbox-item>
						<flexbox-item>
							<div class="m-tip-wrap">
								<span class="icon-arrow"></span>
								<div class="m-tip-head clearfix">
									<span class="m-tip-title">{{item.UName}}</span>
									<span class="m-tip-time">{{item.TimeStr}}</span>
								</div>
								<p class="m-tip-text">{{item.Content}}</p>
								<div class="m-tip-audio" v-show="item.Media.length">
									<div class="m-tip-piclist clearfix">
										<img v-for="m in item.Media" v-show="m.MType==0" :src="m.MUrl" alt="" v-on:click="previewImage(m.MUrl,item.Media)" class="m-tip-pic">
									</div>
									<div v-for="m in item.Media" v-show="m.MType==1">
										<m-audio :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
									</div>
								</div>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</section>
			<section class="comment-bar clearfix">
				<form @submit.prevent @submit="submit()">
					<div class="input-wrap"><input v-model="content" placeholder="我有话说：" type="text" class="comment-input" required></div>
					<div class="btn-wrap"><button type="submit" class="comment-btn">发送</button></div>
				</form>
			</section>
		</section>
	</div>
</template>
<style>
	.plat_class_detail{
		color: #666;
		margin-bottom: 1rem;
		background-color: #fff;
	}
	.plat_class_detail .m-card-tips .m-card-portrait{
		-webkit-flex: none;
		-moz-flex: none;
		-ms-flex: none;
		-o-flex: none;
		flex: none;
	}
	.plat_class_detail .title{
		padding-top:.25rem; 
	}
	.plat_class_detail .page{
		text-indent: .4rem;
		line-height: 2;
		font-size: .28rem;
		padding: .1rem 0;
	}
	.plat_class_detail .plat_course{
		background-color: #fff;
		padding: 0px .3rem;
	}
	.plat_class_detail .plat_course .course-intro{
		border-bottom: 1px solid #dfdfdf;
	}
	.plat_class_detail .plat_course .course-list{
		
	}
	.plat_class_detail .plat_course .m-cell-list{
		padding: .12rem 0;
	}
	.plat_class_detail .class_detail_tabel{
		width: 100%;
		background-color: #fff;
		padding: 0 .28rem;
	}
	.plat_class_detail .plat_teacher{
		padding-bottom: 1rem;
	}
	.class_detail_tabel .td{
		line-height: 2;
	}
	.class_detail_tabel .td>.icon{
		margin-right: .1rem;
		vertical-align: middle;
	}
	.class_detail_tabel .td>.label{
		margin-right: .1rem;vertical-align: middle;
	}
	.plat_tab{
		background-color: #fff;
	}
	.plat_tab-title{
		padding: .2rem 0;
	}
	.plat_tab-title .plat_tab_item{
		font-size: .3rem;
		float: left;
		padding: 0 .3rem;
	}
	.comment-bar{
		position: fixed;
	    width: 100%;
	    padding-right: .3rem;
	    padding-bottom: .3rem;
	    z-index: 100;
	    bottom: 0px;
	    left: 0px;
	    box-sizing: border-box;
	    background-color: #fff;
	}
	.comment-bar .comment-input{
		display: block;
		height: .56rem;
		border:1px solid #ff9100;
		box-sizing: border-box;
		padding: .08rem .2rem;
		width: 100%;
		outline: none;
	}
	.comment-bar .comment-btn{
		border:1px solid #ff9100;
		color: #ff9100;
		padding: .05rem .15rem;
		vertical-align: middle;
		background-color: #fff;
		display: inline-block;
		height: 100%;
		width: 100%;
	}
	.comment-bar .input-wrap{
		width: 80%;
		float: left;
		padding-left: .3rem;
		box-sizing: border-box;
	}
	.comment-bar .btn-wrap{
		width: 20%;
		float: right;
		padding:.04rem 0  .04rem .3rem; 
		box-sizing: border-box;
		height: .56rem;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "../../../components/audio_default.vue"
	export default{
		data(){
			return {
				selected:1,
				comments:[],
				data:{},
				PK_TID:this.$route.params.PK_TID
			}
		},
		ready:function(){
			this.getComment().then(this.getData);
			this.$watch("selected",function(){
				this.getComment();
			});
			this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
                    wx.ready(function () {
					
                    });
					wx.error(function (res) {

                    });
			});
		},
		methods:{
			previewImage:function(imageurl,arryobj){
				var urlarry=[];
				for(var i=0;i<arryobj.length;i++){
					if(arryobj[i].MType==0){
						urlarry[urlarry.length]=arryobj[i].MUrl;
					}
				}
				wx.previewImage({
					current: imageurl, // 当前显示图片的http链接
					urls: urlarry // 需要预览的图片http链接列表
				});
			},
			getComment:function(){
				return this.$http.post("/API/Student/GetTeamComment",{
					 "PK_TID":this.PK_TID,
					 "TCType":this.selected - 1,
					 "PageIndex":1,
					 "PageSize":100
				}).then(res =>{
					this.comments = res.body.Data;
				})
			},
			getData:function(){
				return this.$http.post("/API/Student/GetTeamParticulars",{
					"PK_TID":this.PK_TID
				}).then(res => {
					this.data = res.body.Data;
				})
			},
			submit:function(){
				return this.$http.post("/API/Student/SetTeamComment",{
					 "PK_TID":this.PK_TID,
					 "MediaContent":{ 
					 	"Content":this.content,
					 	"Media":[]
					 }
				}).then(function(){
					this.content = "";
					this.getComment();
				});
			}
		},
		components:{
			MHeader,
			Flexbox,
			FlexboxItem,
			MAudio
		}
	}
</script>
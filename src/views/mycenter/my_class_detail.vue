<template>
	<div class="p_exam plat_class_detail my_class_detail">
		<m-header title="班级评论" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
		<div class="sm-class">
			<tab active-color="#ff9100">
				<tab-item :selected="idx === 0" @click="idx = 0">老师说</tab-item>
				<tab-item :selected="idx === 1" @click="idx = 1">大家说</tab-item>
				<tab-item :selected="idx === 2" @click="idx = 2">班级学员</tab-item>
			</tab>
			<div class="plat_teacher">
				<section class="plat_teacher-c" v-show="idx ===0">
					<div class="m-card-tips" v-for="item in rows">
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
											<img  v-for="m in item.Media" v-show="m.MType==0" :src="m.MUrl" v-on:click="previewImage(m.MUrl,item.Media)" alt="" class="m-tip-pic">
										</div>
										<div v-for="m in item.Media" v-show="m.MType==1">
											<m-audio :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
										</div>
									</div>
								</div>
							</flexbox-item>
						</flexbox>
					</div>
					<p class="m-btn-wrap"><button v-link="{'name':'myclass_detail_comment',params:{'id':this.$route.params.id}}" class="weui_btn weui_btn_normal">评 论</button></p>
				</section>
				<section class="plat_teacher-c" v-show="idx ===1">
					<div class="m-card-tips" v-for="item in rows">
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
											<img v-for="m in item.Media" v-show="m.MType==0" :src="m.MUrl"  v-on:click="previewImage(m.MUrl,item.Media)" alt="" class="m-tip-pic">
										</div>
										<div v-for="m in item.Media" v-show="m.MType==1">
											<m-audio  :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
										</div>
									</div>
								</div>
							</flexbox-item>
						</flexbox>
					</div>
				</section>
				<my-student v-show="idx === 2"></my-student>
			</div>
		</div>
	</div>
</template>
<style>
	.p_exam .sm-class{
		padding: 0px;
	}
</style>
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
	.my_class_detail.plat_class_detail .plat_teacher-c{
		padding-top: .4rem;
	}
	.my_class_detail.plat_class_detail .m-btn-wrap{
		padding: 1rem .3rem 0;
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
	import MHeader from "../../components/header.vue"
	import { Tab,TabItem } from 'vux/src/components/tab'
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "../../components/audio_default.vue"
	import MyStudent from "./my_student.vue"
	export default {
		components:{
			MHeader,
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem,
			MAudio,
			MyStudent
		},
		data(){
			return {
				idx:0,
				rows:[]
			}
		},
		ready:function(){
			var _this=this;
			this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
                    wx.ready(function () {
					
                    });
					wx.error(function (res) {

                    });
			});
			this.getCommList(0);
			this.$watch("idx",function(){
				if(this.idx==0){
					//老师说
					this.getCommList(0);
				}else if(this.idx==1){
					//大家说
					this.getCommList(1);
				}
			});
		},
		methods:{
			getCommList:function(TCType){
				this.$http.post("/API/Teacher/GetTeamComment",{
					"PK_TID":this.$route.params.id,
					"TCType":TCType,
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			},
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
			}
		}

	}
</script>
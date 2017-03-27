<template>
<div class="padding-b-1">
	<div class="p_course_detail">
		<m-header title="课程">
			<span slot="right" class="p_course_detail_head"><i @click="collect()" class="icon" :class="{'icon-collection-shixin':data.IsCollect,'icon-collection':!data.IsCollect}"></i><i style="display:none;" class="icon icon-share2"></i></span>
		</m-header>
		<section class="section vux-1px-b">
			<div class="title">
				<h3 class="title-border-l">{{data.CName}}<span class="title-right font-active">{{data.Grade}}分</span></h3>
			</div>
			<flexbox :gutter='0' v-for="item in data.SectionList"  @click="Details(item.SType,item.PK_CSID,item.Content)">
				<flexbox-item :span="9">
					<h4 class="title-witharrow title-witharrow-ellipsis">
						<i class="icon icon-sign font-active"></i>
						<span class="title-word">{{item.SName}}</span>
					</h4>
				</flexbox-item>
				<flexbox-item :span="2" style="text-align:center">
					<i class="icon color-purple vertical-middle-icon" style="font-size: 0.4rem;" v-if="item.SType == 4" :class="{'icon-PPT':item.SType == 4}"> </i>
					<i class="icon color-purple vertical-middle-icon" style="font-size: 0.3rem;" v-if="item.SType == 1" :class="{'icon-video2':item.SType == 1}"> </i>
					<i class="icon color-green vertical-middle-icon"  style="font-size: 0.2rem;" v-if="item.SType == 2" :class="{'icon-zaixianrenshu':item.SType == 2}"></i>
					<i class="icon color-green vertical-middle-icon"  style="font-size: 0.3rem;" v-if="item.SType == 3" :class="{'icon-Word':item.SType == 3}"></i>
				</flexbox-item>
				<flexbox-item :span="1">{{item.IsLearnt ? "已学" : "未学"}}</flexbox-item>
			</flexbox>
		</section>
		<section class="section">
			<div class="title" v-for="item in data.ExaminationList">
				<h3 class="title-border-l">考试 <span class="title-small">{{item.EName}}</span><span class="title-right">{{item.IsHaveTest ? "已考" : "未考"}}</span></h3>
			</div>
		</section>
		<section class="section">
			<div class="rater color-blue">
				<rater :value.sync='data.Grade' @click="openGradeDialog()" disabled active-color="#ff9100"></rater>
				<span class="rater-word" @click="openGradeDialog()">评分 </span>
			</div>
		</section>
		<section class="section">
			<div class="title">
				<h3 class="title-border-l">课程详情 <span class="title-small">{{data.Credit}}学分</span></h3>
			</div>
			<div v-html="data.Introduction"></div>
		</section>
		<form @submit.prevent @submit="submit()" class="comment-form">
			<input type="text" v-on:focus="isfocus = true" v-model="content" class="comment-form-input" required>
			<button class="comment-form-button" v-show="isfocus" type="submit"><i class="icon icon-comments"></i>发送</button>
			<button class="comment-form-button" v-link="{'name':'plat_course_comment',params:{'PK_CID':PK_CID}}" v-show="!isfocus"  type="button"><i class="icon icon-comments"></i>{{data.ReviewCount}}</button>
		</form>
		<dialog  :show.sync="isshow" :hide-on-blur="true">
			<form @submit.prevent @submit="setGrade()">
				<div class="m_dialog_content">
					<h3 class="m-dialog-title">
						评分
						<i class="m-dialog-close icon-close2" v-on:click="isshow = false"></i>
					</h3>
					<div class="m-dialog-body">
						<div class="rater-wrap"><rater :value.sync='Grade' active-color="#ff9100"></rater></div>
						<x-button class="weui_btn_normal" type="normal" text="提交"></x-button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
	<div class="paly">
		<audio autoplay :src="audioUrl"></audio>
		<video autoplay :src="videoUrl"></video>
	</div>
</div>
</template>
<style>
	.vertical-middle-icon:before{
		/*vertical-align: middle;*/
	}
	.p_course_detail .title-witharrow.title-witharrow-ellipsis .title-word{
		font-size: .28rem;
	}
	.paly{
		display:none;
	}
	.p_course_detail .m_dialog_content .rater-wrap{
		padding-bottom: .42rem;
	}
	.p_course_detail .m-dialog-title .m-dialog-close {
		position: absolute;
		right: .42rem;
		top: .2rem;
	}
	.p_course_detail{
		min-height: 100%;
		background-color: #f0f4f3;
		box-sizing: border-box;
	}
	.p_course_detail_head .icon{
		color: #ff9100;
		font-size: .5rem;
		margin-left: .2rem;
	}
	.p_course_detail .section{
		background-color: #fff;
		margin-top: .1rem;
		padding: 0 .3rem;
		color: #666;
	}
	.p_course_detail .section .title .title-right{
		position: absolute;
		right: 0px;
		font-weight: normal;
		font-size: .28rem;
		color: #666;
	}.p_course_detail .section .title .title-small{
		font-size: .28rem;
		color: #666;
	}
	.p_course_detail .section .title{
		padding: .2rem 0px;
		position: relative;
		color: #333;
	}
	.p_course_detail .section .title .title-border-l{
		font-weight: normal;
		font-size: .34rem;
	}
	.p_course_detail .rater{
		padding: .1rem 0;
		text-align: center;
	}
	.p_course_detail .rater-word{
		font-size: .32rem;
	}
	.p_course_detail .comment-form{
		display: flex;
		align-items: stretch;
		padding: .1rem .3rem;
		background-color: #fff;
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		box-sizing: border-box;
	}
	.p_course_detail .comment-form .comment-form-input{
		-webkit-flex: 1;
		-moz-flex: 1;
		-ms-flex: 1;
		-o-flex: 1;
		flex: 1;
		border:0px;
		border-bottom:1px solid #dfdfdf;
		outline: none;
		padding: .05rem .1rem;
	}
	.p_course_detail .comment-form .comment-form-button{
		width: 25%;
	    color: #56abe4;
	    padding: .05rem .15rem;
	    background-color: #fff;
	    height: 100%;
	    border: 0px;
    	outline: none;
    	font-size: .38rem;
    	text-align: left;
	}
	.p_course_detail .comment-form .comment-form-button .icon{
		font-size: .36rem;
		vertical-align: middle;
		margin-right: .2rem;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import CardTips from "../../../components/card-tips.vue"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox"
	import Rater from "vux/src/components/rater"
	import Dialog from "vux/src/components/dialog";
	import XButton from 'vux/src/components/x-button';
	export default{
		data(){
			return {
				audioUrl:"",
				videoUrl:"",
				StudyPK_CSID:"",
				videoTime:0,
				PK_CID:this.$route.params.PK_CID,
				data:{},
				content:"",
				isfocus:false,
				Grade:0,
				isshow:false,
			}
		},
		components:{
			MHeader,
			CardTips,
			Flexbox,
			FlexboxItem,
			Rater,
			Dialog,
			XButton
		},
		ready:function(){
			this.getData();
			var _this=this;
			
			//控制播放器
			document.getElementsByTagName("video")[0].ontimeupdate=function(){
				var c=(parseInt(document.getElementsByTagName("video")[0].currentTime) - _this.videoTime)-1;
				if (c > 0) {
					//前进了
					//设置到没有前进的时候
					document.getElementsByTagName("video")[0].currentTime = _this.videoTime;
				} else {
					_this.videoTime = parseInt(document.getElementsByTagName("video")[0].currentTime);
					if(_this.videoTime>=parseInt(document.getElementsByTagName("video")[0].duration)){
						//播放完毕
						_this.$http.post("/API/Student/ChangeStudyStatus",{"PK_CSID":_this.StudyPK_CSID}).then(function(){});
					}
				}
			}
			
		},
		methods:{
			getData:function(){
				return this.$http.post("/API/Student/GetCurriculumModel",{
					 "PK_CID":this.PK_CID
				}).then(res => {
					this.data = res.body.Data;
					var _this=this;
					//初始化分享信息
					//微信SDK的初始化
					_this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
							wx.config(res.body.Data);
							wx.ready(function () {
								//分享
								if(_this.data.PK_UID==null||_this.data.PK_UID=="null"){
									wx.hideOptionMenu();
								}else{
									wx.showOptionMenu();
									_this.$http.post("/api/NoPermissions/GetTeacherShare",{"PK_UID":_this.data.PK_UID}).then(res => {
									//分享到朋友圈
									wx.onMenuShareTimeline({
										title: res.body.Data.UName+"专家", // 分享标题
										link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+_this.data.PK_UID, // 分享链接
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
										link: "http://www.365yrb.cn/frontPage/dist/index.html#!/tuiguang/"+_this.data.PK_UID, // 分享链接
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
								}
					
								//分享
							});
							wx.error(function (res) {

							});
					});
					//分享信息

				})
			},
			collect:function(){
				if(this.data.IsCollect){
					return this.$http.post("/API/Student/CancelCollectCurriculum",{
						 "PK_CID":this.PK_CID
					}).then(res => {
						this.data.IsCollect = !this.data.IsCollect;
					})
				}else{
					return this.$http.post("/API/Student/CollectCurriculum",{
						 "PK_CID":this.PK_CID
					}).then(res => {
						this.data.IsCollect = !this.data.IsCollect;
					})
				}
				
			},
			openGradeDialog:function(){
				this.isshow = true;
				this.Grade = this.data.Grade;
			},
			submit:function(){
				this.$http.post("/API/Student/SetCurriculumComment",{
					"PK_CID":this.PK_CID,
        			"Content":this.content
				}).then(function(){
					this.content = "";
					this.isfocus = false;
				})
			},
			setGrade:function(){
				this.isshow = false;
				this.$http.post("/API/Student/GradeInCurriculum",{
					"PK_CID":this.PK_CID,
					"Fraction":this.Grade
				}).then(res => {
					this.data.Grade = this.Grade;
					this.$set(data,this.data);
				})
			},
			Details:function(stype,PK_CSID,url){
				    switch(stype){
						case 1:
							//视频 = 1
							//播放器
							this.videoUrl=url;
							document.getElementsByTagName("video")[0].play();
							document.getElementsByTagName("audio")[0].pause();
							this.StudyPK_CSID=PK_CSID;
							break;
						case 2:
							// 语音 = 2
							//语音播放器
							//判断是否在播放
							if(document.getElementsByTagName("audio")[0].paused||document.getElementsByTagName("audio")[0].ended){
								this.audioUrl=url;
								document.getElementsByTagName("audio")[0].currentTime=0;
								document.getElementsByTagName("audio")[0].play();
								document.getElementsByTagName("video")[0].pause();
							}else{
								document.getElementsByTagName("audio")[0].pause();
							}	
							this.$http.post("/API/Student/ChangeStudyStatus",{"PK_CSID":PK_CSID}).then(function(){});				
							break;
						case 3:
							this.$http.post("/API/Student/ChangeStudyStatus",{"PK_CSID":PK_CSID}).then(function(){});
							//Word = 3
							url=url+"?yifangyun_preview/v2/ext=doc/action=get_preview";
							//判断是不是安卓手机
							var ua = navigator.userAgent.toLowerCase();	
							if (/iphone|ipad|ipod/.test(ua)) {
								window.open(url);
							} else if (/android/.test(ua)) {
								window.open("/PDFView/Index?url="+url);
							}
							break;
						case 4:
							this.$http.post("/API/Student/ChangeStudyStatus",{"PK_CSID":PK_CSID}).then(function(){});
							//PPT = 4
							url=url+"?yifangyun_preview/v2/ext=ppt/action=get_preview";
							//判断是不是安卓手机
							var ua = navigator.userAgent.toLowerCase();	
							if (/iphone|ipad|ipod/.test(ua)) {
								window.open(url);
							} else if (/android/.test(ua)) {
								window.open("/PDFView/Index?url="+url);
							}
							break;
					}
			}
		}
	}
</script>
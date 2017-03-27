<!-- 学生端微课详情 -->
<template>
<div class="padding-b-1 c-question-detail">
	<div class="course_detail">
		<m-header class="course_detail_header" title="问答详情"></m-header>
		<div class="padding-t-2 bg-white margin-b-1">
			<div class="m-card-tips">
				<flexbox align="flex-start">
					<flexbox-item :style="_style" class="m-card-portrait"><img :src="data.HeadPortraits"></flexbox-item>
					<flexbox-item>
						<div class="m-tip-wrap">
							<span class="icon-arrow"></span>
							<div class="m-tip-head clearfix">
								<span class="m-tip-title">{{data.UName}}</span>
								<span class="m-tip-time">{{data.TimeStr}}</span>
							</div>
							<p class="m-tip-text">{{data.Content}}</p>
							
						</div>
					</flexbox-item>
				</flexbox>
			</div>
		</div>
		<div class="m-card-tips" v-for="cmt in comments">
			<flexbox align="flex-start">
				<flexbox-item :style="_style" class="m-card-portrait"><img :src="cmt.HeadPortraits"></flexbox-item>
				<flexbox-item>
					<div class="m-tip-wrap">
						<span class="icon-arrow"></span>
						<div class="m-tip-head clearfix">
							<span class="m-tip-title">{{cmt.UName}}</span>
							<span class="m-tip-time">{{cmt.TimeStr}}</span>
						</div>
						<p class="m-tip-text">{{cmt.Content}}</p>
						<div class="m-tip-audio" v-show="cmt.Media.length">
							<div class="m-tip-piclist clearfix">
								<img v-for="m in cmt.Media" v-show="m.MType==0" :src="m.MUrl" alt="" v-on:click="previewImage(m.MUrl,data.Media)"  class="m-tip-pic">
							</div>
							<div v-for="m in cmt.Media" v-show="m.MType==1">
								<m-audio  :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
							</div>
						</div>
					</div>
				</flexbox-item>
			</flexbox>
		</div>
		<div class="m-panel">
			<p class="m-btn-wrap text-center" v-if="data.IsAnswer==3"><button class="weui_btn weui_btn_mini weui_btn_normal weui_btn_plain_normal">回答已终止</button></p>
			<p class="m-btn-wrap text-center" v-if="data.IsAnswer!=3"><button v-on:click="stopAsk()" class="weui_btn weui_btn_mini weui_btn_normal weui_btn_plain_normal">终止回答</button></p>
			<p class="m-btn-wrap" v-if="data.IsAnswer!=3"><button v-on:click="this.$router.go({name  : 'c_question_answer',params: {'PK_AEID': data.PK_AEID}});" class="weui_btn weui_btn_normal">回复</button></p>
		</div>
	</div>
</template>
<style>
	.c-question-detail{
		height: 100%;
		box-sizing: border-box;
		height: 100%;
		background-color: #f0f4f3;
	}
	.margin-b-1{
		margin-bottom: .1rem;
	}
	.m-card-tips{
		padding: 0 .3rem;
		color: #666;
		background-color: #fff;
	}
	.m-card-tips .m-tip-audio{
		padding: .1rem .35rem;
	}
	.m-card-tips .m-card-portrait{
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: .24rem;
	}
	.m-card-tips .m-card-portrait>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.m-card-tips .m-tip-wrap{
		border:1px solid #d2d2d2;
		padding: .1rem .18rem;
		background-color: #fff;
		position: relative;
		line-height: .36rem;
		margin-bottom: .2rem;
		min-height: .6rem;

	}
	/*.m-tip-wrap .icon-arrow{
		border-right: 10px solid #d2d2d2;
		border-left: 10px solid transparent;
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		position: absolute;
		top:.2rem;
		left: -20px;
	}*/
	/*.m-tip-wrap .icon-arrow:before{
		content: "";
		border-right: 8px solid #fff;
		border-left: 8px solid transparent;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		position: absolute;
		left: -6px;
		top: -6px;
	}*/
	.m-card-tips .m-tip-head{
		line-height: .46rem;
	}
	.m-tip-head .m-tip-title{
		display: block;
		width: 40%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		float: left;
		font-size: .26rem;
		
	}
	.m-tip-head .m-tip-time{
		float: right;
		font-size: .2rem;
	}
	.m-card-tips .m-tip-text{
		font-size: .24rem;
		line-height: .46rem;
	}
	.m-tip-piclist .m-tip-pic{
		width: 1rem;height: 1rem;
		display: block;
		float: left;
		margin-right: .2rem;
		margin-bottom: .1rem;
	}
	.padding-t-2{
		padding-top: .2rem;
	}
	.bg-white{
		background-color: #fff;
	}
	.course_detail{
		background-color: #f0f4f3;
	}
	.course_detail .course_detail_header{
		margin-bottom: .1rem;
	}
	.course_detail .course_detail_header .icon{
		color: #ff9100;
	    font-size: .5rem;
	    margin-left: .2rem;
	}
	.course_detail .course_detail_card{
		margin-bottom: .1rem;
	}
	.course_detail .course_detail_title{
		border-bottom: 1px solid #d2d2d2;
		background-color: #fff;
		padding: 0;
		line-height: .9rem;
		color: #666;
	}
	.course_detail .course_detail_title_wrap{
		background-color: #fff;
		padding:0 .3rem;
	}
	.course_detail_title .left{
		float: left;
		font-size: .3rem;
	}
	.course_detail_title .right{
		float: right;
		font-size: .24rem;
	}
	.course_detail .list{
		background-color: #fff;
		padding-top: .2rem;
	}
	.m-panel .m-panel-pic{
		display: inline-block;
		width: .98rem;
		height: .98rem;
		margin-right: .2rem;
		display: inline-block;
		margin:.3rem 0;
	}
	.m-panel .m-btn-wrap{
		margin:.5rem;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "../../../components/audio_default.vue"
	export default{
		data(){
			return {
				data:{},
				content:"",
				PK_AEID:this.$route.params.PK_AEID,
				pageIndex:1,
				pageSize:1000,
				comments:[]
			}
		},
		components:{
			MHeader,
			Flexbox,
			FlexboxItem,
			MAudio
		},
		ready:function(){
			this.getDetail();
			this.getList();
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/NX_GetAnswerList",{
					 "PK_AEID":this.PK_AEID,
					 "PageIndex":this.pageIndex,
					 "PageSize":this.pageSize
				}).then(res =>{
					this.comments = res.body.Data;
				})
			},
			getDetail:function(){
				return this.$http.post("/API/Student/NX_GetAskTheExpertsInfo",{
					"PK_AEID":this.PK_AEID
				}).then(res =>{
					this.data = res.body.Data;
				})
			},
			stopAsk:function(){
				this.$http.post('/api/Student/NX_TerminationAskTheExperts',{"PK_AEID":this.PK_AEID}).then(res => {
					if(res.body.Data){
						this.getDetail();
						this.getList();
					}
				});
			}
		},
		computed:{
			_style(){
				return {
					width:".8rem",
					height:".8rem",
					"-webkit-box-flex": "inherit",
					flex: "inherit"
				}
			}
		}
	}
</script>
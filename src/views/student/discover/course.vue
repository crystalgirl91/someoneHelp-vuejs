<!-- 学生端微课详情 -->
<template>
<div class="padding-b-1">
	<div class="course_detail">
		<m-header class="course_detail_header" title="微课详情">
			<span slot="right"><i class="icon" :class="{'icon-collection':!data.IsCollect,'icon-collection-shixin':data.IsCollect}" @click="collect()"></i><i style="display:none;" class="icon icon-share2"></i></span>
		</m-header>
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
						<p class="m-tip-text">{{data.MTextContent}}</p>
						<div class="m-tip-audio" v-show="data.Media.length">
							<div class="m-tip-piclist clearfix">
								<img v-for="m in data.Media" v-show="m.MType==0" :src="m.MUrl" alt="" v-on:click="previewImage(m.MUrl,data.Media)"  class="m-tip-pic">
							</div>
							<div v-for="m in data.Media" v-show="m.MType==1">
								<m-audio  :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
							</div>
						</div>
					</div>
				</flexbox-item>
			</flexbox>
		</div>
		</div>
		<div class="course_detail_title_wrap">
			<div class="course_detail_title clearfix">
			<span class="left"><i :style="{color:'#ea8010'}" class="icon-sign"></i>&nbsp;&nbsp;评论{{data.ReplyCount}}</span>
			<span class="right" @click="praise()"><i :style="{color:'#eb4f38'}" class="icon-zan"></i>&nbsp;&nbsp;{{data.PraiseCount}}</span>
			</div>
		</div>
		<div class="list">
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
						</div>
					</flexbox-item>
				</flexbox>
			</div>
		</div>
		<section class="comment-bar clearfix">
			<form @submit.prevent @submit="comment()">
				<div class="input-wrap">
					<input v-model="content" maxlength="1000" placeholder="我有话说：" type="text" class="comment-input" required>
				</div>
				<div class="btn-wrap" ><button type="submit" class="comment-btn">发送</button></div>
			</form>
		</section>
	</div>
</template>
<style>
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

</style>
<script>
	import MHeader from "../../../components/header.vue"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "../../../components/audio_default.vue"
	export default{
		data(){
			return {
				id:this.$route.params.id,
				data:{
					Media:[]
				},
				content:"",
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
			this.getData().then(() => {
				this.getComments();
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
			getData:function(){
				return this.$http.post("/API/Student/GetMicrolectureInfo",{
					"PK_MID":this.id
				}).then(res => {
					if(res.body.ErrCode==403){
						history.go(-1);
					}else{
						this.data = res.body.Data;
					}
				})
			},
			getComments:function(){
				this.$http.post("/API/Student/GetReplyMicrolectureList",{
					"PK_MID":this.id,
					"PageIndex":1,
					"PageSize":100
				}).then(res =>{
					this.comments = res.body.Data;
					console.log(this.comments);
				})
			},
			collect:function(){
				if(this.data.IsCollect){
					this.$http.post("/API/Student/CancelCollectMicrolecture",{
						 "PK_MID":this.id
					}).then(()=>{
						this.data.IsCollect = false;
					})
				}else{
					this.$http.post("/API/Student/CollectMicrolecture",{
						 "PK_MID":this.id
					}).then(()=>{
						this.data.IsCollect = true;
					})
				}
			},
			praise:function(){
				this.$http.post("/API/Student/PraiseMicrolecture",{
					"PK_MID":this.id
				}).then(() =>{

				})
			},
			comment:function(){
				this.$http.post("/API/Student/CommentMicrolecture",{
					 "PK_MID":this.id,
					 "Content":this.content 
				}).then(function(){
					this.getComments();
					this.content = "";
				})
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
<template>
	<div class="padding-b-1">
		<div class="course_detail ls_course_detail">
			<m-header class="course_detail_header" title="微课详情"></m-header>
			<card-tou-tips :item="data" class="course_detail_card" :show_audio="true"></card-tou-tips>
			<div class="course_detail_title clearfix">
				<span class="left"><i :style="{color:'#ea8010'}" class="icon-sign"></i>&nbsp;&nbsp;评论{{data.ReplyCount}}</span>
				<span class="right"><i :style="{color:'#eb4f38'}" class="icon-zan"></i>&nbsp;&nbsp;{{data.PraiseCount}}</span>
			</div>
			<div class="list">
				<card-tips v-for="item in list" :item="item" class="course_detail_card" :show_audio="false"></card-tips>
				<section class="comment-bar clearfix">
					<div class="input-wrap"><input placeholder="我有话说：" v-model="reply" type="text" class="comment-input"></div>
					<div class="btn-wrap"><button class="comment-btn" v-on:click="submit()">发送</button></div>
				</section>
			</div>
		</div>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from "../components/header.vue"
	import CardTips from "../components/card-tips.vue"
	import CardTouTips from "../components/card-toutips.vue"
	import Loading from "vux/src/components/loading"
	export default{
		data(){
			return {
				reply:"",
				data:{
					"PK_MID": "",
					"PK_UID": "",
					"HeadPortraits": "",
					"UName": "",
					"Nickname": "",
					"ReplyCount": 0,
					"PraiseCount": 0,
					"MTextContent": "",
					"Media": [],
					"TimeStr": ""
					},
				list:[],
				loading:true
			}
		},
		ready:function(){
			this.getData();
		},
		methods:{
			getData: function(){
				var PK_MID=this.$route.query.PK_MID
				this.$http.post('/api/Teacher/GetMicrolectureInfo',{"PK_MID":PK_MID}).then(res => {
					this.$set('data' , res.body.Data);
					this.getCommentList(PK_MID);
				});
			},
			getCommentList:function(PK_MID){
				this.$http.post('/api/Teacher/GetReplyMicrolectureList',{"PK_MID":PK_MID}).then(res => {
					this.$set('list' , res.body.Data);
				});
			},
			submit:function(){
				//提交回复
				var PK_MID=this.$route.query.PK_MID;
				if(this.reply.length<1){
					alert("请填写回复");
					return;
				}
				this.$http.post('/api/Teacher/SendMicroReply',{"PK_MID":PK_MID,"Content":this.reply}).then(res => {
					if(res.body.Data){
						this.getCommentList(PK_MID);
						this.reply="";
						//alert("回复成功！");
					}
				});
			}
		},
		components:{
			MHeader,
			CardTips,
			CardTouTips,
			Loading
		}
	}
</script>
<style>
	.ls_course_detail .m-card-tips{
		padding-top: .2rem;
	}
	.course_detail {
		background-color: #f0f4f3;
	}
	
	.course_detail .course_detail_header {
		margin-bottom: .1rem;
	}
	
	.course_detail .course_detail_card {
		margin-bottom: .1rem;
	}
	
	.course_detail .course_detail_title {
		border-bottom: 1px solid #d2d2d2;
		background-color: #fff;
		padding: 0 .3rem;
		line-height: .9rem;
		color: #666;
	}
	.course_detail .course_detail_title_wrap{
		background-color: #fff;
		padding:0 .3rem;
	}
	.course_detail_title .left {
		float: left;
		font-size: .3rem;
	}
	
	.course_detail_title .right {
		float: right;
		font-size: .24rem;
	}
	
	.course_detail .list {
		background-color: #fff;
		padding-top: .2rem;
		padding-bottom: 1rem;
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
	}
	.comment-bar .comment-input{
		display: block;
		height: .56rem;
		border:1px solid #ff9100;
		box-sizing: border-box;
		padding: .08rem;
		width: 100%;
		outline: none;
		background: #fff;
    	box-shadow: none;
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
		float: left;
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
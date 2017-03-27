<template>
<div class="padding-b-1">
	<div class="course_detail">
		<m-header class="course_detail_header" title="评论"></m-header>
		<div class="course_detail_title clearfix">
			<span class="left"><i :style="{color:'#ea8010'}" class="icon-sign"></i>&nbsp;&nbsp;评论{{data.Count}}</span>
		</div>
		<div class="list">
			<div class="m-card-tips" v-for="item in list">
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
						</div>
					</flexbox-item>
				</flexbox>
			</div>
		</div>
		<form @submit.prevent @submit="comment()" class="comment-bar clearfix">
			<div class="input-wrap"><input v-model="content" placeholder="我有话说：" type="text" class="comment-input"></div>
			<div class="btn-wrap"><button type="submit" class="comment-btn">发送</button></div>
		</form>
	</div>
</div>
</template>
<style>
	.course_detail{
		background-color: #f0f4f3;
	}
	.course_detail .course_detail_header{
		margin-bottom: .1rem;
	}
	.course_detail .course_detail_card{
		margin-bottom: .1rem;
	}
	.course_detail .course_detail_title{
		border-bottom: 1px solid #d2d2d2;
		background-color: #fff;
		padding: .3rem;padding: 0 .3rem;
		line-height: .9rem;
		color: #666;
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
	export default{
		components:{
			MHeader,
			Flexbox,
			FlexboxItem
		},
		data(){
			return {
				id:this.$route.params.id,
				data:{},
				list:[],
				content:""
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetAskCommentList",{
					"PK_AEID":this.id,
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.list = res.body.Data.List;
					this.data = res.body.Data;
					this.content = "";
				})
			},
			comment:function(){
				return this.$http.post("/API/Student/SetAskComment",{
					 "PK_AEID":this.id,
					 "Content":this.content
				}).then(this.getList)
			}
		}
	}
</script>
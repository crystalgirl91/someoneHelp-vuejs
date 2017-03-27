<template>
	<m-header title="我的问答" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="sm-question">
		<ul class="news-vertical">
			<li class="news-item" v-for="item in rows" v-link="{name:'mycenter_question_detail',params:{'PK_AEID':item.PK_AEID}}">
				<h3 class="title">{{item.AskContent}}</h3>
				<div class="tool clearfix">
					<span class="left">{{item.AnswerInformation}}</span>
					<span class="right">{{item.TimeStr}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<style>
	.sm-question{
		background: #fff;
	}
	.news-vertical .news-item{
		padding: .3rem;
		border-bottom: 1px solid #dfdfdf;
	}
	.news-vertical .news-item .title{
		font-size: .3rem;
		color: #333;
		height:1rem;
		line-height: 1.5;
		font-weight: normal;
	}
	.news-vertical .news-item .tool{
		font-size: .28rem;
		color: #666;
	}
	.news-vertical .news-item .left{
		display: block;
		width: 70%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		float: left;
	}
	.news-vertical .news-item .right{
		display:block;
		width: 30%;
		text-align: right;
		float: right;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default {
		components:{
			MHeader
		},
		data(){
			return {
				rows:[]
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				this.$http.post("/API/Student/GetMyAskTheExperts",{
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		}

	}
</script>
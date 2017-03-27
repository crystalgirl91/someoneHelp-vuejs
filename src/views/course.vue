<template>
	<div class="ls-course">
		<header class="course-header vux-1px-b"> 微课 <button class="btn-normal" v-on:click="this.$router.go('/answer_sub')">发表</button> </header>
		<ul class="course-list">
			<li v-for="item in data" class="course-item vux-1px-b" v-on:click="this.$router.go('/course_detail?PK_MID='+item.PK_MID)">
				<p class="course-desc">
					{{item.MTextContent}}
				</p>
				<div class="course-toobar">
					<span class="icon icon-comments" style="color: #eb4f38">&nbsp;{{item.ReplyCount}}</span>
					<span class="icon icon-zan" style="color: #5fafe5">&nbsp;{{item.PraiseCount}}</span>&nbsp;
					<span class="time">{{item.TimeStr}}</span>
				</div>
			</li>
		</ul>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import Loading from "vux/src/components/loading"
	export default {
		data(){
			return {
				data:[],
				loading:true
			}
		},
		ready:function(){
			this.getData();
		},
		methods:{
			getData: function(){
				console.log(222,this.loading)
				this.$http.post('/api/Teacher/GetMicrolectureList').then(res => {
					this.$set('data' , res.body.Data);
				});
			}
		},
		watch:{
			loading:function(nval){
				console.log(1212,nval)
			}
		},
		components:{
			Loading
		}
	}
</script>
<style>
	.ls-course{
		min-height: 100%;
		background-color: #f0f4f3;
		padding-bottom: 1.3rem;
		box-sizing: border-box; 
	}
	.course-header{
		background-color: #fff;
		font-size: .36rem;
		line-height: .4rem;
		padding: .3rem;
		text-align: center;
		position: relative;
		margin-bottom: .1rem;
	}
	.course-header .btn-normal{
		background-color: #ec8f2d;
		border:0px;
		position: absolute;
		right: .3rem;
		color: #fff;
		font-size: .3rem;
		line-height: .32rem;
		border-radius: 3px;
		display: inline-block;
		padding: .12rem .2rem;
		top: 50%;
		margin-top: -0.29rem;
	}
	.course-list{
		padding: 0 .3rem ;
		list-style: none;
		line-height: 2;
		font-size: .24rem;
		background-color: #fff;
		padding-bottom: 1.2rem;
	}
	.course-list .course-item{
		padding: .1rem 0;
	}
	.course-list .course-desc{
		font-size: .28rem;
		color: #666;
		line-height: .45rem;
		max-height: .9rem;
    	overflow: hidden;
	}
	.course-toobar{
		text-align: right;
		line-height: 2;
		font-size: .24rem;
	}
	.course-toobar .icon{
		font-size: .24rem;
		margin-right: .08rem;
	}
	.course-toobar .icon:before{
		vertical-align: text-bottom;
	}

	.course-toobar .time{
		color: #666;
	}
</style>
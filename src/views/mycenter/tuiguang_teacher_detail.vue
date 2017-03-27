<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="老师详情"></m-header>
	<div class="teacher-detail-wrap">
		<m-tip title="详情介绍"></m-tip>
		<div class="page">
			<p>{{data.Details}}</p>
		</div>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from '../../components/header.vue';
	import MTip from '../../components/tip.vue';
	import Loading from "vux/src/components/loading"
	export default {
		data(){
				return {
					loading:true,
					data:{"PK_UID":"","PK_PID":null,"UName":"","Nickname":"","HeadPortraits":"","FansCount":0,"LevelImg":null,"Level":null,"Present":"","Details":"","Field":[],"TeamList":[]}
				}
			},
		components:{
			MHeader,
			MTip,
			Loading
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				 this.$http.post('/api/Teacher/GetTeacherShare').then(res => {
					this.$set('data' , res.body.Data);
				});
		}}	
	}
</script>
<style>
	.teacher-detail-wrap{
		padding: .2rem .3rem;
		background-color: #fff;
		margin-top: .1rem;
		font-size: .28rem;
	}
	.page{
		margin-top: .1rem;
		line-height: .32rem;
	}
</style>
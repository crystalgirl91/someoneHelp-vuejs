<template>
	<m-header title="同班同学" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<ul class="p_student clearfix">
		<li class="student-item" v-for="item in rows">
			<div class="img-wrap"><img alt="" :src="item.HeadPortraits"></div>
			<h3 class="name">{{item.UName}}</h3>
		</li>
	</ul>
</template>
<style>
	.p_student{
		background-color: #fff;
		padding: 0 .2rem;
		margin-top: .1rem;
	}
	.p_student .student-item{
		width: 25%;
		float: left;
		padding: .2rem .2rem 0 .2rem;
		box-sizing: border-box;
		text-align: center;
	}
	.p_student .img-wrap{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;;
		overflow: hidden;
		display: inline-block;

	}
	.p_student .img-wrap>img{
		width: 100%;
		height: 100%;
	}
	.p_student .student-item .name{
		font-size: .28rem;
	    line-height: .4rem;
	    font-weight: normal;
	    height: .4rem;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default{
		components:{
			MHeader
		},
		data(){
			return {
				rows:[],
				PK_TID:this.$route.params.PK_TID
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetTeamUserList",{
					 "PK_TID":this.PK_TID,
					 "PageIndex":1,
					 "PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		}
	}
</script>
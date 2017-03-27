<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="活动详情"></m-header>
	<div class="p_activity_detail">
		<ul class="activity-list">
			<li class="list-item">
				<dl class="sub-list">
					<dt class="sub-item-title">{{data.Title}}</dt>
					<dd class="sub-item"><i class="icon-time2" :style="{'color':'#7fbfea'}"></i>时间：{{data.TimeStr}}</dd>
					<dd class="sub-item"><i class="icon-place2" :style="{'color':'#eb4f39'}"></i>地点：{{data.Place}}</dd>
					<dd class="sub-item"><i class="icon-Num-of-participants" :style="{'color':'#ffa32a'}" ></i>报名人数：{{data.Number}}人</dd>
				</dl>
			</li>
		</ul>
		<div class="p_activity_detail_page">
			<div class="title"><h3 class="title-border-l">活动详情</h3></div>
			<div class="page">{{data.Details}}</div>
		</div>
		<button class="btn" @click="submit()">我要报名</button>
	</div>
</template>
<style>
	/*body{
		 background-color: #f0f4f3;
	}*/
	.p_activity_detail .activity-list{
		padding: .2rem .3rem;
		background-color: #fff;
		margin-bottom: .1rem;
		border-bottom: 1px solid #dfdfdf;
		margin-top: .1rem;
	}
	.p_activity_detail .activity-list .list-item{
		background: #fff;
		font-size: .34rem;
		line-height: .54rem;
		color: #333;
		border:0px;

	}
	.p_activity_detail .activity-list .sub-list {
		padding: 0rem;
	}
	.activity-list .sub-list .sub-item-title{
		line-height: .54rem;
		margin-bottom: .16rem;
	}
	.activity-list .sub-list .sub-item{
		font-size: .3rem;
		color: #666;
	}
	.activity-list .sub-list .sub-item>i{
		margin-right: 5px;
		vertical-align: middle;
		font-size: .36rem;
	}
	.activity-list .item-link{
		border-top: 1px solid #d9d9d9;
		line-height: .8rem;
		text-align: center;
		display: block;
		color: #666;
	}
	.p_activity_detail_page{
		background-color: #fff;
		padding:0 .3rem;
	}
	.p_activity_detail_page .title{
		padding: .2rem 0;
	}
	.p_activity_detail_page .page{
		font-size: .30rem;
		color: #666;
	}
	.p_activity_detail .btn{
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		color: #fff;
		background-color: #83d360;
		line-height: .94rem;
		text-align: center;
		border: 0px;
		outline: none;
		font-size: .34rem;
	}
</style>
<script>
	import MHeader from '../../../components/header.vue'
	export default {
		data(){
			return {
				data:[]
			}
		},
		ready:function(){
			 this.getData();
		},
		methods:{
			getData:function(){
				this.$http.post("/API/Student/GetPlatformActivityInfo",{
					"PK_AID":this.$route.params.PK_AID
				}).then(res => {
					this.data = res.body.Data;
				})
			},
			submit: function(){
				this.$http.post("/API/Student/SetPlatformActivity",{
					"PK_AID":this.$route.params.PK_AID,
					"Rise":"",
					"Telephone":"",
					"ApplyNumber":1,
					"Email":"",
					"MailingAddress":""
				}).then(res => {
					if(res.body.ErrCode==200){
						alert("报名成功");
					}
					
				})
			}
		},
		components:{
			MHeader
		}
	}
</script>
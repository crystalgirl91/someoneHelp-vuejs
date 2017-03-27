<template>
<div class="s_p_activity">
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="活动"></m-header>
	<ul class="activity-list">
		<li class="list-item" v-for="item in rows" v-link="{'name':'plat_activity_detail',params:{'PK_AID':item.PK_AID}}">
			<dl class="sub-list">
				<dt class="sub-item-title">{{item.Title}}</dt>
				<dd class="sub-item"><i class="icon-time2" :style="{'color':'#7fbfea'}"></i>时间：{{item.TimeStr}}</dd>
				<dd class="sub-item"><i class="icon-place2" :style="{'color':'#eb4f39'}"></i>地点：{{item.Place}}</dd>
				<dd class="sub-item"><i class="icon-Num-of-participants" :style="{'color':'#ffa32a'}" ></i>报名人数：{{item.Number}}人</dd>
			</dl>
		</li>
	</ul>
</div>
</template>
<style>
	/*body{
		 background-color: #f0f4f3;
	}*/
	.s_p_activity{
		min-height: 100%;
		background-color: #f0f4f3;
	}
	.activity-list{
		padding: .2rem .3rem;
	}
	.activity-list .list-item{
		border:1px solid #d9d9d9;
		border-radius: 3px;
		overflow: hidden;
		background: #fff;
		margin-bottom: .2rem;
		font-size: .34rem;
		line-height: .54rem;
		color: #333;
	}
	.activity-list .sub-list {
		padding: .2rem;
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
</style>
<script>
	import MHeader from '../../../components/header.vue'
	export default {
		data(){
			return {
				rows:[]
			}
		},
		ready:function(){
			 this.getData();
		},
		methods:{
			getData:function(){
				this.$http.post("/API/Student/GetPlatformActivityList",{
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		},
		components:{
			MHeader
		}
	}
</script>
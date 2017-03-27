<template>
	<div class="ls-activity-list">
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="已发布"></m-header>
	<ul class="activity-list">
		<li class="list-item" v-for="item in data" >
			<dl class="sub-list">
				<dt class="sub-item-title">{{item.Title}}</dt>
				<dd class="sub-item"><i class="icon-time" :style="{'color':'#7fbfea'}"></i>时间：{{item.TimeStr}}</dd>
				<dd class="sub-item"><i class="icon-place" :style="{'color':'#eb4f39'}"></i>地点：{{item.Place}}</dd>
				<dd class="sub-item"><i class="icon-cost" :style="{'color':'#00bb9c'}"></i>费用：{{item.Free}}元</dd>
				<dd class="sub-item"><i class="icon-baomingrenshu" :style="{'color':'#ffa32a'}" ></i>报名人数：{{item.Number}}人</dd>
			</dl>
			<a class="item-link" href="#!/my_activity_applys?PK_AID={{item.PK_AID}}" >查看报名详情 ></a>
		</li>
		
	</ul>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>

</template>
<style>
	/*body{
		 background-color: #f0f4f3;
	}*/
	.ls-activity-list{
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
	import MHeader from '../../components/header.vue'
	import XButton from 'vux/src/components/x-button'
	import XInput from 'vux/src/components/x-input'
	import Group from 'vux/src/components/group'
	import XTextarea from 'vux/src/components/x-textarea'
	import Loading from "vux/src/components/loading"

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
				this.$http.post('/api/Teacher/GetActivityList').then(res => {
					this.$set('data' , res.body.Data);	
				});
			}
		},
		components:{
			MHeader,
			XButton,
			XInput,
			Group,
			XTextarea,
			Loading
		}
	}
</script>
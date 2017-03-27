<template>
	<m-header title="我的班级" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="vux-1px-b"></div>
	<table class="mystudent-table" cellpadding="0" cellspacing="0">
		<thead>
			<th class="vux-1px-b">班级名称</th>
			<th class="text-center vux-1px-b">班级人数</th>
		</thead>
		<tbody>
			<tr v-on:click="changeView(item)" v-for="item in data">
				<td class="vux-1px-b">{{item.TName}}</td>
				<td class="text-center vux-1px-b">{{item.Number}}</td>
			</tr>
		</tbody>
	</table>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from '../components/header.vue'
	import Loading from "vux/src/components/loading"

	export default {
		data(){
			return {
				isshow:true,
				data:[],
				loading:true
			}
		},
		components:{
			MHeader,
			Loading
		},
		ready:function(){
		      this.getData();
		    },
		methods:{
			getData:function(){						
				    this.$http.post('/api/Teacher/GetTeamList').then(res => {
						this.$set('data' , res.body.Data);
					});
				},
			changeView:function(d){
				this.$route.router.go("/myclassinfo?PK_TID="+d.PK_TID);
			}
		}
	}
</script>
<style>
	.mystudent-table {
		width: 100%;
		padding: 0px .3rem;
		padding-top: .2rem;
	}
	
	.mystudent-table th {
		font-size: .3rem;
		color: #333;
		text-align: left;
		font-weight: normal;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table td {
		font-size: .28rem;
		color: #666;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table .icon-dashang {
		color: #ff9100;
		font-size: .5rem;
		vertical-align: middle;
	}
</style>
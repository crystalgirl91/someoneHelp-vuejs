<template>
	<m-header title="积分获得记录" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="m-point-record">
		<table class="m-point-table" cellspacing="0" cellspacing="0">
			<thead class="thead">
				<tr>
					<th class="th th-first"><i class="icon"></i>积分数</th>
					<th class="th">获取方式</th>
					<th class="th">时间</th>
				</tr>
			</thead>
			<tbody class="body">
				<tr v-for="item in rows">
					<td class="td  text-center td-first"><i class="icon"></i>{{item.Figure}}分</td>
					<td class="td text-center ">{{item.Describe}}</td>
					<td class="td text-center ">{{item.CTime}}</td>
				</tr>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style>
	.m-point-table{
		width: 100%;
		background-color: #fff;
		padding: 0 .3rem 0 .7rem;padding-top: .54rem;
	}
	.m-point-table .thead .th.th-first{
		border-left: 1px solid  #ff9100;
	}
	.m-point-table .thead .th{
		font-size: .30rem;
		color: #333;
		position: relative;
		line-height: .4rem;
		padding-bottom: .27rem;
	}
	.m-point-table .body .td.td-first{
		border-left: 1px solid  #ff9100;
		position: relative;
	}
	.m-point-table .thead .th.th-first .icon:before{
		content: "";
		display: inline-block;
		position: absolute;
		left: -6px;
		border-top: 6px solid transparent;
		border-bottom: 6px solid #ff9100;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		top: -6px;
	}
	.m-point-table .body .td.td-first .icon:before{
		content: "";
		width: 6px;
		height: 6px;
		display: inline-block;
		position: absolute;
		left: -5px;
		background: #ff9100;
		border-radius: 50%;
		overflow: hidden;
		border:2px solid #fff;
		top: 50%;
		margin-top: -6px;
	}
	.m-point-table .body .td{
		font-size: .28rem;
		color: #666;
		line-height: .4rem;
		padding: .27rem 0;
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
				this.$http.post("/API/Student/GetUserHomeCreditsLog",{
					 "PageIndex":1, "PageSize":100
				}).then(res => {
					this.rows = res.body.Data.ExpenseList;
				})
			}
		}

	}
</script>
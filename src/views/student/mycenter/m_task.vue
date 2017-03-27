<template>
	<m-header title="今日任务" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="sm_task">
		<div class="progress-block">
			<div class="progress-truck">
				<div class="progress-bar" :style="{'width':rate * 10 + '%'}"></div>
			</div>
			<div class="progress-scale">
				<div class="progress-scale-s"><span>0分</span><span>5分</span><span>10分</span></div>
				<span class="icon" :style="{'left':rate * 10 + '%'}"></span>
			</div>
		</div>
		<table class="sm_task_table" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th class="th">名称</th>
					<th class="th">内容</th>
					<th class="th">最高分</th>
					<th class="th">状态</th>
				</tr>
				<tbody>
					<tr v-for="item in rows">
						<td class="td">{{item.TaskName}}</td>
						<td class="td">{{item.TaskContent}}</td>
						<td class="td">{{item.Scores}}分</td>
						<td class="td">{{item.IsComplete ? "完成" : "未完"}}</td>
					</tr>
				</tbody>
			</thead>
		</table>
	</div>
</template>
<style>
	.sm_task{
		background: #fff;
	}
	.sm_task .sm_task_table{
		width: 100%;
		font-size: .28rem;
		line-height: .82rem;
	}
	.sm_task .sm_task_table .th{
		text-align: left;
		border-bottom: 1px solid #dfdfdf;
		border-top: 1px solid #dfdfdf;
		font-weight: normal;
		font-size: .28rem;
		line-height: .82rem;
	}
	.sm_task .sm_task_table .td{
		border-bottom: 1px solid #dfdfdf;
		text-align: left;
		line-height: .82rem;
	}
	.sm_task .sm_task_table .th:first-child{
		text-align: left;
		padding-left: 16px;
	}
	.sm_task .sm_task_table tr .td:first-child{
		padding-left: 16px;
		text-align: left;
	}
	.sm_task .progress-block{
		padding: .9rem 1rem;
	}
	.progress-block .progress-truck{
		width: 100%;
		border-radius: 10%;
		background: #e5e5e5;
		position: relative;
		height: .2rem;
		border-radius: 10px;
		overflow: hidden;
	}
	.progress-block .progress-truck .progress-bar{
		background-color: #ff9100;
		height: .18rem;
		border-radius: 10px;
	}
	.progress-block .progress-scale{
		position: relative;
	}
	.progress-block .progress-scale .icon{
		content: "";
		display: inline-block;
		position: absolute;
		border-top: 6px solid transparent;
		border-bottom: 6px solid #ff9100;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		margin-left: -6px;
		top: -0px;
	}
	.progress-block .progress-scale-s{
		display: flex;
		justify-content: space-between;
		padding-top: 12px;
	}
	.progress-block .progress-scale-s>span{

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
				rate:0,
				rows:[],
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				this.$http.post("/API/Student/GetTaskList").then(res => {
					this.rows = res.body.Data;
					this.rate = res.body.Data.reduce((num,b) => {
						if(b.IsComplete){
							return num + b.Scores;
						}else{
							return num;
						}
					},this.rate)
				});
			}
		}

	}
</script>
<template>
	<div class="p_exam">
		<m-header title="考试" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
		<div class="sm-class">
			<tab active-color="#ff9100" default-color="#333">
				<tab-item :selected="idx === 1" @click="idx = 1">已完成</tab-item>
				<tab-item :selected="idx === 0" @click="idx = 0">未完成</tab-item>
			</tab>
			<div class="bg-bar-gray"></div>
			<table class="table" cellpadding="0" cellspacing="0" border="0">
				<thead class="thead">
					<tr>
						<td width="50%">试卷名称</td>
						<td width="25%" class="text-center">学分</td>
						<td width="25%" class="text-center">考试时间</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in rows" v-show="idx === 0" v-link="{'name':'plat_exam_now',params:{'PK_EID':item.PK_EID}}">
						<td>{{item.EName}}</td>
						<td class="text-center">{{item.Credit}}学分</td>
						<td class="text-center">{{item.AnswerTime}}分钟</td>
					</tr>
					<tr v-for="item in rows" v-show="idx === 1" >
						<td>{{item.EName}}</td>
						<td class="text-center">{{item.Credit}}学分</td>
						<td class="text-center">{{item.AnswerTime}}分钟</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style>

	.p_exam .sm-class{
		padding: 0px;
	}
	.p_exam .sm-class .table{
		padding: 0 .3rem;
	}
	.p_exam .sm-class .table .thead td{
		white-space: nowrap;
	}
	.p_exam .vux-tab .vux-tab-item{
		font-size: .32rem;
		color: #333;
	}
	.sm-class .table{
		width: 100%;
		background-color: #fff;
	}
	.sm-class .table>thead>tr>td{
		color: #333;
		font-size: .3rem;
		line-height: .7rem;
		padding-top: .2rem;
		border-bottom: 1px solid #dfdfdf;
	}
	.sm-class .table>tbody>tr>td{
		color: #666;
		font-size: .28rem;
		line-height: .7rem;
		padding-top: .2rem;
		border-bottom: 1px solid #dfdfdf;


	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import { Tab,TabItem } from 'vux/src/components/tab'

	export default {
		components:{
			MHeader,
			Tab,
			TabItem
		},
		data(){
			return {
				idx:1,
				rows:[]
			}
		},
		ready:function(){
			this.getList();
			this.$watch("idx",function(){
				this.getList();
			});
		},
		methods:{
			getList:function(){
				this.$http.post("/API/Student/GetExamination",{
					"GetType":this.idx,
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		}

	}
</script>
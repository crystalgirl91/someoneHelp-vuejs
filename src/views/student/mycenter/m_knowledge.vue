<template>
	<m-header title="我的课程" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="sm-class m_knowledge">
		<tab active-color="#ff9100" default-color="#333">
			<tab-item :selected="idx === 1" @click="idx = 1">已完成</tab-item>
			<tab-item :selected="idx === 0" @click="idx = 0">未完成</tab-item>
		</tab>
		<table class="table" cellpadding="0" cellspacing="0" border="0">
			<thead>
				<tr>
					<td>课程题目</td>
					<td class="text-center">学分</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in rows" v-link="{'name':'plat_course_detail',params:{'PK_CID':item.PK_CID}}">
					<td>{{item.CName}}</td>
					<td class="text-center">{{item.Credit}}</td>
				</tr>
			</tbody>
		</table>
		<!-- <table v-if="idx==0" class="table" cellpadding="0" cellspacing="0" border="0">
			<thead>
				<tr>
					<td>课程题目2</td>
					<td class="text-center">积分</td>
					<td class="text-center">开始时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-link="{'path':'/plat_course_detail'}">
					<td>门店销售技巧</td>
					<td class="text-center">3</td>
					<td class="text-center">2016/06/20 09:32:12</td>
				</tr>
				<tr v-link="{'path':'/plat_course_detail'}">
					<td>门店销售技巧</td>
					<td class="text-center">3</td>
					<td class="text-center">2016/06/20 09:32:12</td>
				</tr>
			</tbody>
		</table> -->
	</div>
</template>
<style>
	.sm-class{
		padding: 0 .3rem;
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
	.m_knowledge .vux-tab .vux-tab-item{
		font-size: .32rem;
		color: #333;
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
			this.$watch("idx",function(newval){
				this.getList();
			})
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetMyCurriculumList",{
					"GetType":this.idx, "PageIndex":1, "PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		}

	}
</script>
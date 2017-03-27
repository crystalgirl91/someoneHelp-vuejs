<template>
	<m-header title="我的收藏" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
	<div class="sm-class m_follow">
		<tab active-color="#ff9100" default-color="#333">
			<tab-item :selected="idx === 1" @click="idx = 1">课程</tab-item>
			<tab-item :selected="idx === 2" @click="idx = 2">微课</tab-item>
		</tab>
		<div v-if="idx==1">
			<cell v-for="item in courses" :is-link="true" v-link="{'name':'plat_course_detail',params:{'PK_CID':item.PK_CID}}" :title="item.CName"></cell>
		</div>
		<div v-if="idx==2">
			<ul class="news-vertical">
				<li class="news-item" v-for="item in mCourses" v-link="{'name':'discover_course',params:{id:item.PK_MID}}">
					<h3 class="title">{{item.MTextContent}}</h3>
					<div class="tool clearfix">
						<span class="right">{{item.TimeStr}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<style>
	.m_follow{
		background: #fff;
	}
	.m_follow .weui_cell:before{
		left: 0px;

	}
	.m_follow .weui_cell_ft{
		padding-right: 6px;
	}
	.m_follow .weui_cell_ft.with_arrow:after{
		border-color: #ff9100;
	}
	.m_follow .vux-tab .vux-tab-item{
		font-size: .32rem;
		color: #333;
	}
	.m_follow .weui_cell{
		padding-left: 0px;
		padding-right: 0px;
		border-bottom: 1px solid #dfdfdf;
	}
	.m_follow .weui_cell_bd > p{
		font-size: .30rem;
		color: #666;
	}
	.m_follow .news-vertical .news-item{
		padding-left: 0px;
		padding-right: 0px;
	}
	.m_follow .news-vertical .news-item .title{
		color: #666;
		line-height: .45rem;
		max-height: .9rem;
		overflow: hidden;
	}
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
	.sm-class .news-vertical .news-item .right{
		width: 100%;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import { Tab,TabItem } from 'vux/src/components/tab'
	import Cell from 'vux/src/components/cell'

	export default {
		components:{
			MHeader,
			Tab,
			TabItem,
			Cell
		},
		data(){
			return {
				idx:1,
				mCourses:[],
				courses:[]
			}
		},
		ready:function(){
			this.getMCourse().then(this.getCourse)
		},
		methods:{
			getMCourse:function(){
				return this.$http.post("/API/Student/GetMyCollectMicroCourseList",{
					 "PageIndex":1,
					 "PageSize":100
				}).then(res => {
					this.mCourses = res.body.Data;
				})
			},
			getCourse:function(){
				return this.$http.post("/API/Student/GetMyCollectCurriculumList",{
					 "PageIndex":1,
					 "PageSize":100
				}).then(res => {
					this.courses = res.body.Data;
				})
			}
		}

	}
</script>
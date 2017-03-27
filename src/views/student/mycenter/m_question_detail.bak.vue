<template>
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="问答详情"></m-header>
	<div class="m-panel">
		<div class="m-panel-wrap vux-1px-r vux-1px-t vux-1px-l vux-1px-b">
			<a v-link="{'path':'/answer?PK_AEID=data.PK_AEID'}" class="m-panel-box">
				<div class="m-panel-card">
					<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + data.HeadPortraits + ')'}"></div>
					<div class="m-panel-flex">
						<p class="title">{{data.UName}}</p>
						<p class="time">{{data.TimeStr}}</p>
					</div>
				</div>
				<div class="m-panel-p">{{data.Content}}</div>
			</a>
		</div>
	</div>
	<card-pic :list="list"></card-pic>
</template>
<script>
	import Tab from 'vux/src/components/tab/tab'
	import TabItem from 'vux/src/components/tab/tab-item'
	import CardPic from '../../../components/student/card_pic.vue'
	import MHeader from '../../../components/header.vue'
	export default {
		data(){
			return {
				data:[],
				list:[],
				PK_AEID:this.$route.params.PK_AEID
			}
		},
		methods:{
			getData:function(){
				this.$http.post("/API/Student/GetAskTheExpertsInfo",{
					"PK_AEID":this.PK_AEID
				}).then(res => {
					this.data = res.body.Data;
				})
			},
			getList:function(){
				this.$http.post("/API/Student/GetAskCommentList",{
					"PK_AEID":this.PK_AEID,
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.list = res.body.Data;
				})
			}
		},
		components:{
			Tab,
			TabItem,
			CardPic,
			MHeader
		}
	}

</script>
<style>
	.question-tab{
		background-color: #fff;
		padding: .2rem 0px;
	}
	.question-tab .vux-tab{
		width: 3.3rem;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		border:2px solid #ff9100;
		height: auto;
	}
	.question-tab .vux-tab .vux-tab-item{
		font-size: .34rem;
		height: .52rem;
		background: 0,0;
		line-height: inherit;
	}
	.question-tab .vux-tab .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
	}
	.question-tab .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
	}
	.question-list{
		margin: .12rem;
	}
	.question-list .weui_panel{
		background-color: transparent;
	}
	.question-list .weui_media_box.weui_media_appmsg .weui_media_hd{
		border-radius: 50%;
		overflow: hidden;
		margin-right: .14rem;
	}
	.question-list .weui_media_box{
		margin-bottom: .12rem;
		background-color:#fff;
	}
</style>
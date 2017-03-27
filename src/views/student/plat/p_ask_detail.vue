<template>
	<div class="ls-answer">
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="问答详情"></m-header>
	<div class="m-panel">
		<div class="m-panel-wrap vux-1px-r vux-1px-t vux-1px-l vux-1px-b">
			<a class="m-panel-box">
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
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import Tab from 'vux/src/components/tab/tab'
	import TabItem from 'vux/src/components/tab/tab-item'
	import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
	import CardPic from '../../../components/student/card_pic_plat'
	import MHeader from '../../../components/header.vue'
	import Loading from "vux/src/components/loading"
	export default {
		data(){
			return {
				isshow:false,
				ischecked_a:1,
				ischecked_b:0,
				ischecked_c:0,
				dasMal:0,
				day:0,
				pageIndex:1,
				pageSize:100,
				PK_AEID:this.$route.params.PK_AEID,
				uuid:null,
				data:{},
				list:[]
			}
		},
		ready:function(){
			this.getList().then(this.getDetail);
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetAnswerList",{
					 "PK_AEID":this.PK_AEID,
					 "PageIndex":this.pageIndex,
					 "PageSize":this.pageSize
				}).then(res =>{
					this.list = res.body.Data;
				})
			},
			getDetail:function(){
				return this.$http.post("/API/Student/GetAskTheExpertsInfo",{
					"PK_AEID":this.PK_AEID
				}).then(res =>{
					this.data = res.body.Data;
				})
			}
		},
		components:{
			Tab,
			TabItem,
			CardPic,
			MHeader,
			Flexbox,
			FlexboxItem,
			Loading
		}
	}
</script>
<style>
	.ls-answer{
		min-height: 100%;
		background-color: #f0f4f3;
		padding-bottom: .4rem;
	}
	.question-tab {
		background-color: #fff;
		padding: .2rem 0px;
	}
	
	.question-tab .vux-tab {
		width: 3.3rem;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		border: 2px solid #ff9100;
		height: auto;
	}
	
	.question-tab .vux-tab .vux-tab-item {
		font-size: .34rem;
		height: .52rem;
		background: 0, 0;
		line-height: inherit;
	}
	
	.question-tab .vux-tab .vux-tab-item.vux-tab-selected {
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
	}
	
	.question-tab .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {
		background-color: #ff9100;
		color: #fff;
	}
	
	.question-list {
		margin: .12rem;
	}
	
	.question-list .weui_panel {
		background-color: transparent;
	}
	
	.question-list .weui_media_box.weui_media_appmsg .weui_media_hd {
		border-radius: 50%;
		overflow: hidden;
		margin-right: .14rem;
	}
	
	.question-list .weui_media_box {
		margin-bottom: .12rem;
		background-color: #fff;
	}
	.ls-answer .m-dialog-body{
		padding: .25rem 0 .25rem .8rem;
	}
	.ls-answer .radio-inline {
		display:block;
	}
	.ls-answer .radio-inline .radio-input{
		font-size: .3rem;
		line-height: .3rem;width: .8rem;
		border-bottom:1px solid #dfdfdf;
		margin:0 .04rem;
		outline: 0px;
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		border-radius: 0px;
	}
	.ls-answer .m-dialog-title.m-dialog-title-border{
		font-size: .34rem;
	}
</style>
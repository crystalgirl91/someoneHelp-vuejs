<template>
	<div class="ls-question">
		<div class="question-tab vux-1px-b">
			<tab :animate='false' :line-width='0' :active-color='"#fff"' :default-color='"#ff9100"'>
			  <tab-item :selected="block === 1" @click="getData(0)">未答</tab-item>
			  <tab-item :selected="block === 2" @click="getData(1)">已答</tab-item>
			</tab>
		</div>
		<card :list="data" v-if="block ===1 "></card>
		<card-nobtn :list="data" v-if="block ===2 "></card-nobtn>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import Tab from 'vux/src/components/tab/tab'
	import TabItem from 'vux/src/components/tab/tab-item'
	import Card from '../components/card'
	import CardNobtn from '../components/card_nobtn'
	import Loading from "vux/src/components/loading"
	export default {
		data(){
			return {
				isshow:true,
				block:1,
				data:[],
				loading:true
			}
		},
		components:{
			Tab,
			TabItem,
			Card,
			CardNobtn,
			Loading
			
		},
		ready:function(){
			this.getData(0);
		},
		methods:{
			getData: function(IsAnswer){
				if(IsAnswer==0){
					this.block = 1;
				}
				if(IsAnswer==1){
					this.block = 2;
				}
				this.$http.post('/api/Teacher/GetAskTheExpertsList',{"IsAnswer":IsAnswer}).then(res => {
					this.$set('data' , res.body.Data);
				}).catch(err => {
					this.$set('data',{})
				});
			}
		}
	}
</script>
<style>
	.ls-question{
		background-color: #f0f4f3;
		padding-bottom: 1.2rem;
		min-height: 100%;
		box-sizing: border-box;
	}
	.ls-question .question-tab{
		background-color: #fff;
		padding: .2rem 0px;
	}
	.ls-question .question-tab .vux-tab{
		width: 3.3rem;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		border:2px solid #ff9100;
		height: auto;
		display: block;
	}
	.ls-question .question-tab .vux-tab:before{
		content: "";
		display: block;
		overflow: hidden;
		clear: both;
	}
	.ls-question .question-tab .vux-tab .vux-tab-item{
		font-size: .34rem;
		height: 100%;
		background: 0,0;
		line-height: inherit;
		float: left;
		width: 50%;
	}
	.ls-question .question-tab .vux-tab .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
	}
	.ls-question .question-tab .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected{
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
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
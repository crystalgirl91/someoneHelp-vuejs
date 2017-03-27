<template>
	<div class="ls-question">
		<div class="question-tab c_question vux-1px-b">
			<span class="toolbtn menu-btn" v-on:click="goBack()"><i class="icon icon-back2"></i></span>
			<tab :animate='false' :line-width='0' :active-color='"#fff"' :default-color='"#ff9100"'>
			  <tab-item :selected="block === 1" @click="getData(0)">未答</tab-item>
			  <tab-item :selected="block === 2" @click="getData(1)">已答</tab-item>
			</tab>
		</div>
		<div class="m-panel">
			<div class="m-panel-wrap"  v-for="item in list">
				<a v-on:click="tolink(item.PK_AEID)" class="m-panel-box">
					<div class="m-panel-card">
						<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + item.HeadPortraits + ')'}"></div>
						<div class="m-panel-flex">
							<p class="title">{{item.UName}}</p>
							<p class="time">{{item.TimeStr}}</p>
						</div>
					</div>
					<div class="m-panel-p">{{item.Content}}</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import Tab from 'vux/src/components/tab/tab'
	import TabItem from 'vux/src/components/tab/tab-item'
	export default {
		data(){
			return {
				isshow:true,
				block:1,
				list:[],
			}
		},
		components:{
			Tab,
			TabItem
		},
		ready:function(){
			this.getData(0);
		},
		methods:{
			tolink:function(PK_AEID){
				this.$router.go({name  : 'c_question_detaill',params: {'PK_AEID': PK_AEID}});
			},
			getData: function(IsAnswer){
				 if(IsAnswer==0){
				 	this.block = 1;
				 }
				 if(IsAnswer==1){
				 	this.block = 2;
				 }
				 this.$http.post('/api/Student/NX_GetAskTheExpertsList',{"IsAnswer":IsAnswer}).then(res => {
				 	this.$set('list' , res.body.Data);
				 }).catch(err => {
				 	this.$set('list',{})
				 });
			},
			goBack:function(){
				location.href="index_student.html#!/home/mycenter";
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
	.m-panel .m-dialog-body.m-dialog-body-nogutter{
		font-size: .3rem;
	}
	.m-panel .m-dialog-title{
		font-size: .34rem;
	}
	.c_question.question-tab .toolbtn{
		color: #ff9100;
		position: absolute;
		top: .25rem;
		display: block;
	}
	.c_question.question-tab .toolbtn .icon.icon-back2{
		padding-left: 14px;
		font-size: 20px;
	}
	.c_question.question-tab .toolbtn .icon:before{
		vertical-align: middle;
	}
</style>
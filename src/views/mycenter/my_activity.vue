<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="发布活动"></m-header>
	<div class="ls-activity">
		<group class="my-active-group">
			<x-input :value.sync="Title" title="名 称："></x-input>
			<x-input :value.sync="StartTime" title="时 间："></x-input>
			<x-input :value.sync="Place" title="地 点："></x-input>
			<x-input :value.sync="Free" title="费 用："></x-input>
			<x-input :value.sync="Number" title="报名人数："></x-input>
			
		</group>
		<group class="my-active-group my-active-group-border" title="活动介绍：">
			<x-textarea  :value.sync="Details"></x-textarea>
		</group>
		<group class="padding-5">
			<x-button type="normal" v-on:click="SendActivity()" text="发布"></x-button>
			<a class="my-active-group-a" v-on:click="this.$route.router.go('my_active_list');">查看已发布活动 > </a>
		</group>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<style>
	/*body{
		background: #fff;
	}*/
	.my-active-group{
		padding:0px .3rem;
	}
	.my-active-group .weui_cells{
		margin-top: 0px;
	}
	.my-active-group .weui_cells:before{
		border-top: 0px;
	}
	.my-active-group-border .weui_cells:before{
		border-top: 1px solid #D9D9D9;
	}
	.my-active-group .weui_cell:before{
		left: 0px;
	}
	.my-active-group .weui_label{
		color: #666;
		word-spacing: .5rem;

	}
	/*.my-active-group-border .weui_cells_title{
	    padding: 10px 15px;
	    font-size: 17px;
	    margin: 0px;
	    color: #666;
	}*/
	.my-active-group-border .weui_cell{
		border-left: 1px solid #D9D9D9;
		border-right: 1px solid #D9D9D9;
	}
	.padding-5{
		padding: .5rem;
	}
	.padding-5 .weui_cells:after{
		border-bottom: 0px;
	}
	.weui_cells > a.my-active-group-a{
		color: #333;
		font-size: .3rem;
		display:block;
		text-align: center;
		margin-top: .4rem;
	}
</style>
<script>
	import MHeader from '../../components/header.vue'
	import XButton from 'vux/src/components/x-button'
	import XInput from 'vux/src/components/x-input'
	import Group from 'vux/src/components/group'
	import XTextarea from 'vux/src/components/x-textarea'
	import Loading from "vux/src/components/loading"

	export default {
		data(){
			return {
				Title:'',
				StartTime:'',
				Place:'',
				Free:'',
				Number:'',
				Details:''
			}
		},
		methods:{
			SendActivity:function(){
				if(this.Title.length==0||this.StartTime.length==0||this.Place.length==0||this.Free.length==0||this.Number.length==0){
					alert("请填写完成的活动信息");
					return;
				}
				this.$http.post('/api/Teacher/SetActivity',{Title:this.Title,StartTime:this.StartTime,Place:this.Place,Free:this.Free,Number:this.Number,Details:this.Details}).then(res => {
					if(res.body.Data){
						alert("提交成功");
					}else{
						alert("提交失败");
					}
				});
			}
		},
		components:{
			MHeader,
			XButton,
			XInput,
			Group,
			XTextarea,
			Loading
		}
	}
</script>
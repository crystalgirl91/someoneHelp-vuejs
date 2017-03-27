<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="提款申请"></m-header>
	<group class="my-active-group">
		<x-input :value.sync="Money" title="提款金额："></x-input>
		<x-input :value.sync="WName" title="开户名："></x-input>
		<x-input :value.sync="WBank" title="开户银行:"></x-input>
		<x-input :value.sync="WAccounts" title="开户账号:"></x-input>
	</group>
	<group class="padding-5">
		<x-button type="normal" v-on:click="SendActivity()" text="提交申请"></x-button>
	</group>
	<loading :show.sync="loading" text="加载中"></loading>
	
</template>
<style>
	.my-active-group {
		padding: 0px .3rem;
	}
	
	.my-active-group .weui_cells {
		margin-top: 0px;
	}
	
	.my-active-group .weui_cells:before {
		border-top: 0px;
	}
	
	.my-active-group-border .weui_cells:before {
		border-top: 1px solid #D9D9D9;
	}
	
	.my-active-group .weui_cell:before {
		left: 0px;
	}
	
	.my-active-group .weui_label {
		color: #666;
	}
	
	/*.my-active-group-border .weui_cells_title {
		padding: 10px 15px;
		font-size: 17px;
		margin: 0px;
		color: #666;
	}*/
	
	.my-active-group-border .weui_cell {
		border-left: 1px solid #D9D9D9;
		border-right: 1px solid #D9D9D9;
	}
	
	.padding-5 {
		padding: .5rem;
	}
	
	.padding-5 .weui_cells:after,
	.padding-5 .weui_cells:before {
		border-bottom: 0px;
		border-top: 0px;
	}
	
	.weui_cells > a.my-active-group-a {
		color: #333;
		font-size: .3rem;
		display: block;
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
		components:{
			MHeader,
			XButton,
			XInput,
			Group,
			XTextarea,
			Loading
		},
		data(){
			return {
				Money:"",
				WName:"",
				WBank:"",
				WAccounts:""
			}
		},
		methods:{
			SendActivity:function(){
				this.$http.post('/api/Teacher/SponsorWithdraw',this.$data).then(res => {
					if(res.body.Data){
						alert("提交成功");
					}else{
						alert("提交失败");
					}
				});
			}
		}
	}
</script>
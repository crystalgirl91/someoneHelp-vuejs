<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="充值"></m-header>
		<div class="recharge_group">
			<div class="recharge_title">微信直充</div>
			<div class="margin-b-1">
				<input class="recharge_input" type="text" placeholder="输入充值金额"/>
				<div class="vux-1px-b"></div>
			</div>
			<x-button text="充值" type="normal"></x-button>
		</div>
		<div class="recharge_group">
			<div class="recharge_title">向上级申请</div>
			<input class="recharge_input" placeholder="输入申请金额"/>
			<div class="vux-1px-b"></div>
			<div class="recharge_left-title">备注：</div>
			<div class="margin-b-1 vux-1px-l vux-1px-r vux-1px-t vux-1px-b">
				<textarea rows="5" cols="30" class="recharge_textarea" placeholder="输入申请原因..."></textarea></div>
				<x-button text="申请" type="normal"></x-button>
		</div>
		<loading :show.sync="loading" text="加载中"></loading>

</template>
<script>
	import MHeader from '../../components/header.vue'
	import XButton from 'vux/src/components/x-button'
	import Loading from "vux/src/components/loading"
	export default {
		components:{
			MHeader,
			XButton,
			Loading
		}
	}
</script>
<style>
	.recharge_group{
		font-size: .15rem;
		background-color: #fff;
		padding: 0px .3rem;
		margin-top: .1rem;
		padding-bottom: 1rem;
	}
	.recharge_group .recharge_title{
		border-bottom: 0px;
		font-size: .3rem;
		color: #333;
		text-align: center;
		line-height: .8rem;
	}
	.recharge_group .margin-b-1{
		margin-bottom: 1rem;
	}
	.recharge_group .recharge_input, .recharge_group .recharge_textarea{
		font-size: .3rem;
		padding: .1rem;
		display: block;
		width: 100%;
		border:0px;
		outline: none;
	}
	.recharge_left-title{
		text-align: left;
		margin: .2rem 0;
		font-size: .3rem;
		color: #666;
	}

</style>
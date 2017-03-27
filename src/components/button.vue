<template>
	<x-button type="type">{{text}}</x-button>
</template>
<script>
	import XButton from "vux/src/components/x-button"
	export default{
		props:{
			type:String,
			text:String
		},
		components:{
			XButton
		}
	}
</script>
<style>
	.weui_btn_normal{
		background-color: #ff9100;
	}
</style>
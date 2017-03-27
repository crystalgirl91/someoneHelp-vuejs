<template>
	<h3 class="m-tip" v-bind:class="tipClass">{{title}}</h3>
</template>
<script>
	export default{
		props:{
			title:String,
			tipClass:{
				type:String,
				default(){
					return "m-tip-normal"
				}
			}
		}
	}
</script>
<style>
	.m-tip{
		font-size: .3rem;
		line-height: .5rem;
		border-left-style: solid;
		border-left-width: 3px; 
		text-align: left;
		padding: 0rem .2rem;
		font-weight: normal;
	}
	.m-tip.m-tip-normal{
		border-left-color:#ea8010; 
	}
</style>
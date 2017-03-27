<template>
	<div class="discover p_ask">
		<m-header title="问答"></m-header>
		<div class="bg-bar-gray"></div>
		<question></question>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	import {Tab,TabItem} from "vux/src/components/tab"
	import Badge from "vux/src/components/badge"
	import Question from "./temp_question.vue"
	export default {
		data(){
			return {
				istool:false,
			}
		},
		components:{
			MHeader,
			Tab,
			TabItem,
			Badge,
			Question
		}
	}
</script>
<style>
	
</style>

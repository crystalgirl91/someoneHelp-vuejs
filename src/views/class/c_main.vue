<template>
	<div class="wrap">
		<router-view></router-view>
		<loading :show.sync="loading" text="加载中"></loading>
	</div>
</template>
<script>
	import Loading from "vux/src/components/loading"
	export default{
		data(){
			return {
				loading:this.$root.loading
			}
		},
		components:{
			Loading
		}
	}
</script>
<style>
	html{
		height: 100%;
	}
	body,.wrap{
		height: 100%;
	}
</style>
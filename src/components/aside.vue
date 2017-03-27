<template>
	<ul class="aside" v-bind:class="'aside-' + style" v-bind:sync="value">
		<li v-on:click="checkOne(item)" v-bind:class="{'selected':value === item}" v-for="item in list" class="aside-item">
			<span class="aside-span">{{item.title}}</span><i class="icon" v-bind:class="{'icon-enter2':value!==item,'icon-pull-down':value===item}"></i>
		</li>
	</ul>
</template>
<script>
	export default {
		data(){
			return {
				value :{}
			}
		},
		props:{
			list:Array,
			style:{
				type:String,
				default:'default'
			}
		},
		methods:{
			checkOne:function(it){
				this.value = it;
				this.$dispatch("changeAside",it);
			}
		}
	}
</script>

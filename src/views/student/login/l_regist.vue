<template>
	<div class="l_regist">
		<m-header title="注册"  :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
		<div class="l_btn-group">
			<button class="btn-sky" :class="{'btn-active':type === 1}" v-on:click="type = 1">个人学习</button>
			<button class="btn-sky" :class="{'btn-active':type === 2}" v-on:click="type = 2">公司学习</button>
		</div>
		<div class="go-btn font-active" v-on:click="next()">下一步</div>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	export default {
		data(){
			return {
				type:1
			}
		},
		methods:{
			next:function(){
				switch(this.type){
					case 1:{
						this.$router.go("/login_regist_person");
						break;
					};
					case 2:{
						this.$router.go("/login_regist_company");
						break;
					};
					default:{
						this.$router.go("/login_regist_person");
						break;
					}
				}
				
			}
		},
		components:{
			MHeader
		}
	}
</script>
<style>
	.l_regist  .l_btn-group{
		padding: 1.14rem .46rem 0 .46rem;
	}
	.l_regist  .l_btn-group .btn-sky{
		line-height: .56rem;
		border:1px solid #ff9100;
		background-color: #fff;
		font-size: .36rem;
		width: 100%;
		display: block;
		border-radius: .4rem;
		margin-bottom: .8rem;
		outline: none;
		color: #ff9100;
	}
	.l_regist  .l_btn-group .btn-sky.btn-active{
		background: #ff9100;
		color: #fff;
	}
	.l_regist  .go-btn{
		margin-bottom: 3.9rem;
		color: #ff9100;
		font-size: .36rem;
		text-align: center;
		margin-top: 3.8rem;
	}
</style>
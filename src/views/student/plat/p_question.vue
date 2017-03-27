<template>
	<div class="p_question">
		<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="向老师提问"></m-header>
		<form @submit.prevent @submit="submit()">
			<div class="bg-bar-gray"></div>
			<div class="p_wrap">
			<div class="text-center">
				<textarea required v-model="content" placeholder="说明：请务必描述清楚你的问题，将细节陈述清楚，不要问过于宽泛的问题，比如“我怎么成为亿万富翁”之类的问题就不要麻烦专家们了！" class="p_question_textarea" cols="30" rows="6"></textarea>
			</div>
			<div  class="text-center">
				<button class="p_question_btn" type="submit">提交</button>
			</div>
		</form>
	</div>
	
</template>
<style>
	.p_question{
		min-height: 100%;
		box-sizing: border-box;
	}
	.p_question .p_wrap{
		padding: .3rem;
	}
	.p_question .p_question_textarea{
		border-radius: 5px;
		overflow: hidden;
		padding: 5px;
		margin-bottom: 1.1rem;
		outline: none;
	    border: 1px solid #dfdfdf;
	    width: 100%;
	    display: inline-block;
	    line-height: 1.8;
	    font-size: .28rem;
	}
	.p_question .p_question_btn{
		width: 1.5rem;
		height: .6rem;
		line-height: .6rem;
		text-align: center;
		font-size: .34rem;
		background-color: #83d360;
		border:0px;
		color: #fff;
		outline: none;
	}
</style>
<script>
	import MHeader from '../../../components/header.vue'
	export default {
		data(){
			return {
			    id:this.$route.params.id,
			    content:"" 
			}
		},
		ready:function(){
		},
		methods:{
			submit:function(){
				if(this.content.length<1){
					alert("请输入你要提的问题内容");
					return;
				}
				this.$http.post("/API/Student/SetEnterpriseAskQuestions",{
					"PK_UID":this.id,
					"AskContent":this.content
				}).then(res => {
					if(res.body.Data){
						alert("提问成功！");
						this.content="";
					}
				});
			}
		},
		components:{
			MHeader,
		}
	}
</script>
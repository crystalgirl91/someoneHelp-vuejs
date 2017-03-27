<template>
<div class="p_question d_question">
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="向老师提问"></m-header>
	<div class="bg-bar-gray"></div>
	<div class="p_wrap">
		<form @submit.prevent @submit="submit()">
			<div class="text-center">
				<textarea v-model="content" placeholder="说明：请务必描述清楚你的问题，将细节陈述清楚，不要问过于宽泛的问题，比如“我怎么成为亿万富翁”之类的问题就不要麻烦专家们了！" class="p_question_textarea" cols="30" rows="6" required></textarea>
			</div>
			<label class="checkbox-inline">
				<input v-model="isopen" type="checkbox" class="checkbox">
				<span>公开提问，每被查看一次，你从中分成0.5学币</span>
			</label>
			<p class="word">{{price}}学币</p>
			<div  class="text-center">
				<button type="submit" class="p_question_btn">提交</button>
			</div>
		</form>
	</div>
	<dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title">
					提示
				</h3>
				<div class="m-dialog-body">
					<div class="m-form-group">
						<label class="m-control-label">应付学币：</label>
						<span>{{price}}学币</span>
					</div>
					<div class="m-form-group">
						<label class="m-control-label">当前余额：</label>
						<span>{{myBalance}}学币</span>
					</div>
				</div>
				<flexbox :gutter="0" class="m-dialog-footer">
					<flexbox-item ><button @click="goCharge()" class="m-dialog-button">确定</button></flexbox-item>
					<flexbox-item><button class="m-dialog-button" v-link="{'path':'/mycenter/recharge'}">充值</button></flexbox-item>
				</flexbox>
			</div>
		</dialog>
</div>
</template>
<style>
	.d_question .m-control-label{
		display: inline-block;
		width: 50%;
		text-align: right;
	}
	.d_question .m-form-group{
		text-align: left;
		font-size: .28rem;
	}
	.d_question .checkbox-inline{

	}
	.d_question .p_wrap .p_question_textarea{
		margin-bottom: .2rem;
		font-size: .28rem;
	}
	.d_question .word{
		text-align: center;
		font-size: .34rem;
		color:#83d360;
		line-height: 2;
	}
	.checkbox-inline{
		margin-bottom: .6rem;
		display: block;
	}
	.checkbox-inline input{
		vertical-align: middle;
	}
	
</style>
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
	import {Flexbox,FlexboxItem} from "vux/src/components/flexbox"
	import Dialog from "vux/src/components/dialog";
	export default {
		data(){
			return {
			     id:this.$route.params.id,
			     price:0,
			     content:"",
			     isopen:true,
			     isshow:false,
			     myBalance:0
			}
		},
		ready:function(){
			 this.getPrice().then(this.getBalance);
		},
		methods:{
			getPrice:function(){
				return this.$http.post('/API/Student/GetAskQuestionsPrice',{
					"PK_UID":this.id
				}).then(res =>{
					this.price = res.body.Data;
				})
			},
			submit:function(){
				this.isshow = true;
			},
			goCharge:function(){
				this.$http.post("/API/Student/SetAskQuestions",{
					 "PK_UID":this.id,
					 "AskContent":this.content,
					 "IsOpen":this.isopen ? 1 : 0
				}).then(()=>{
					this.content = "";
					this.isopen = true;
					this.isshow = false;
				})
			},
			getBalance:function(){
				this.$http.post("/API/Student/GetBalance").then(res => {
					this.$set("myBalance",res.body.Data);
				})
			},
		},
		components:{
			MHeader,
			Flexbox,
			FlexboxItem,
			Dialog
		}
	}
</script>
<template>
	<div class="l_regist_person">
		<m-header title="找回密码"></m-header>
		<group class="l_regist_company">
			<x-input title="项目ID：" :value.sync="data.PCode" type="text"></x-input>
			<x-input title="账号：" :value.sync="data.LoginName" type="text"></x-input>
			<!-- <x-input title="验证码：" :value.sync="data.Code"  type="text"></x-input> -->
			<div class="weui_cell weui_cell_warn p_form_group">
				<label class="weui_label" style="width:4em" for="password">验证码：</label>
				<input type="text" class="input" v-model="data.Code" id="password">
				<button class="p_button" :class="{'p_button_gray':waitTime>0}" @click.prevent @click="sendCode()">获取验证码<span v-if="waitTime>0">({{waitTime}})</span></button>
			</div>
			<x-input title="新密码：" :value.sync="data.NewPwd"  type="text"></x-input>
		</group>
		<div class="btn-go"><x-button  @click="submit()" type="normal">提交申请</x-button></div>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	import Group from "vux/src/components/group"
	import XInput from "vux/src/components/x-input"
	import XButton from "vux/src/components/x-button"
	export default {
		data(){
			return {
				data:{
					"PCode":"",
					"LoginName":"",
					"NewPwd":"",
					"Code":"",
					
				},
				"waitTime":0,
			}
		},
		ready:function(){

		},
		methods:{
			submit:function(){
				if(this.data.NewPwd>5){
					this.$http.post("/API/NoPermissions/ResetUserPwd",this.data).then(res => {
						if(res.body.ErrCode==200){
							alert("修改成功！");
							history.go(-1);
						}
					});
				}else{
					alert("新的密码必须大于或等于6位");
				}
				
			},
			sendCode:function(){
				this.$http.post("/API/NoPermissions/SendVerificationCode",{
					"PCode":this.data.PCode, "LoginName":this.data.LoginName
				}).then(res => {
					this.waitTime = 60;
					var timer = setInterval(() => {
						if(this.waitTime > 0){
							this.$set("waitTime",this.waitTime - 1);
						}else{
							clearInterval(timer);
						}
					},1000)
				})
			}
		},
		components:{
			MHeader,
			XInput,
			Group,
			XButton
		}
	}
</script>
<style>
	.l_regist_company{
		margin-bottom: 3.9rem;
	}
	.l_regist_person .p_button{
	    background-color: #ff9100;
	    font-size: .328rem;
	    border-radius: 3px;
	    text-align: center;
	    text-decoration: none;
	    color: #FFFFFF;
	    border:0px;
	    padding: 5px;
	    font-size: .3rem;
	    outline: none;
	}
	.l_regist_person .p_button.p_button_gray{
		background-color: #ddd;
		color: #fff;
	    pointer-events: none;
	}
	.l_regist_person .p_form_group{
		justify-content: space-between;
	}
	.l_regist_person .p_form_group .input,.l_regist_person .p_form_group .weui_label,.l_regist_person .p_form_group .p_button{
		flex:none;
	}
	.l_regist_person .p_form_group{
		padding-top: 6px;
		padding-bottom: 6px;
	}
	.l_regist_person .p_form_group .input{
		width: 3rem;
		outline: none;
		border:0px;
	}
</style>
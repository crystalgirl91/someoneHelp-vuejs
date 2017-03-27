<template>
	<div class="login">
		<h2 class="login-title">有人帮</h2>
			<group class="input-group">
				<x-input :value.sync="loginName" title="登录名："></x-input>
				<x-input :value.sync="loginPwd" title="密 码："></x-input>
				<x-input :value.sync="code" title="ID 号："></x-input>
			</group>
			<x-button v-on:click="submit()" type="normal" text="登录"></x-button>
			<!-- <x-button v-on:click="WXLogin()" type="normal" text="微信登录"></x-button> -->
			<div class="regist-bar clearfix">
				<span class="regist-bar-item regist text-left" v-link="{'path':'/login_regist'}">注册账号</span>
				<span class="regist-bar-item regetpwd text-right" v-show="false" v-link="{'path':'/login_password'}">找回密码</span>
			</div>
			<divider>第三方登录</divider>
			<div class="weixin-box" v-on:click="WXLogin()">
				微信登录
			</div>
	</div>
</template>
<script>
	import XButton from 'vux/src/components/x-button'
	import Group from 'vux/src/components/group'
	import XInput from 'vux/src/components/x-input'
	import divider from 'vux/src/components/divider'
	export default {
		data(){
			return {
				loginName:"",//lan
				loginPwd:"",//lan
				code:""//888
			}
		},
		components:{
			XButton,
			XInput,
			Group,
			divider
		},
		methods:{
			submit:function(){
				var json={
					abid:window.localStorage.ABID,
					loginName:this.loginName,
					loginPwd:this.loginPwd,
					code:this.code
				};
				this.$http.post('/api/NoPermissions/StudentLogin', json).then(response => {
					// 响应成功回调
					if(response.body.ErrCode==200){
					window.localStorage.PlatformUser=response.body.Data;
					this.$router.go("/home/mycenter");
					}else{
						alert(response.body.ErrMsg);
					}
				});
			},
			WXLogin:function(){
				window.location = "/WeChat/WxStudentLogin";
			}
		}
	}
</script>
<style>
	@import '~vux/dist/vux.css';
	@import '~vux/dist/styles/1px.css';
	@import '../../../fonts/student/style.css';
	@import '../../assets/css/common.css';
	.login{
		font-size: .36rem;
		padding: 0px .48rem;
	}
	.login .login-title{
		    font-size: .8rem;
	    color: #ea8010;
	    text-align: center;
	    padding: 1.7rem 0px 1.2rem 0;
	    line-height: 1;
	}
	.login .input-group{
		margin-bottom: 1rem;
	}
	.login  .weui_label{
		color: #b2b2b2;
		font-size: .36rem;
		word-wrap: pre-wrap;
		word-spacing: .2rem;
	}
	.login .weui_cells{margin-top: 0px;}
	.login .weui_cells:before{
		border:0px;
	}
	.login .weui_cell:before{
		left: 0px;
	}
	.login .regist-bar{
		font-size: .36rem;
		color: #807e7e;
		line-height: 2;
		margin-top: .3rem;
	}
	.login .regist-bar .regist-bar-item{
		width: 50%;
		display: inline-block;
		float: left;
	}
	.login .vux-divider{
		font-size: .3rem;
		color: #807e7e;
		margin-top: .2rem;
	}
	.weixin-box{
		font-size: .3rem;
		padding-top: 1.2rem;
		background-position: center top;
		background-size: 1rem;
		width: 2rem;
		margin:0 auto;
		background-image: url(../../assets/images/weixin.png);
		text-align: center;
		background-repeat: no-repeat;
		color: #807e7e;
	}
</style>

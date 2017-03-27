<template>
	<m-header  :left-ops="{showBack:false}" :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="充值">
		<a slot="left" class="m-header-back" v-link="{'path':'/home/mycenter'}"></a>
	</m-header>
	<div class="m-recharge">
		<div class="recharge_group">
			<div class="recharge_title">微信直充</div>
			<div class="margin-b-1">
				<input class="recharge_input" type="text" v-model="RechargeMoney" placeholder="输入充值金额"/>
				<div class="vux-1px-b"></div>
			</div>
			<x-button text="充值" v-on:click="Recharge()" type="normal"></x-button>
		</div>
		<div class="recharge_group">
			<div class="recharge_title">向上级申请</div>
			<input class="recharge_input" v-model="applyMoney" placeholder="输入申请金额"/>
			<div class="vux-1px-b"></div>
			<div class="recharge_left-title">备注：</div>
			<div class="margin-b-1 vux-1px-l vux-1px-r vux-1px-t vux-1px-b">
				<textarea rows="5" cols="30" class="recharge_textarea" v-model="applyReason" placeholder="输入申请原因..."></textarea></div>
				<x-button text="申请" type="normal" v-on:click="apply()"></x-button>
		</div>
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title m-dialog-title-border">
					提示
					<span class="m-dialog-close-r" @click="isshow=false"><i class="icon icon-close2"></i></span>
				</h3>
				<div class="m-dialog-body m-dialog-body-nogutter">
					对不起，您所在公司未在平台开通账户。您可将课程页面微信转发给您的公司领导，让他们知道有人帮的优质课程！
				</div>
			</div>
		</dialog>
	</div>
</template>
<script>
	import MHeader from '../../../components/header.vue'
	import XButton from 'vux/src/components/x-button'
	import Dialog from 'vux/src/components/dialog'
	export default {
		data(){
			return {
				isshow:false,
				RechargeMoney:"",
				applyMoney:"",
				applyReason:""
			}
		},
		ready:function(){
			if("?ok"!=window.location.toString().substr(window.location.toString().indexOf("?")))
			{
				window.location="tolink.html";
			}else{
				this.$http.post("/API/Student/GetWeChatPaySDK",{"Fee":0.01,"OpenId":jsonmodel.openid}).then(res => {
						
				});
			}			
		},
		methods:{
			check:function(){
				return this.$http.post("/API/Student/CheckUserType").then(res => {
			       this.isshow = res.body.Data;
			       return res.body.Data;
			    });
			},
			apply:function(){
				this.check().then((type) => {
					if(!type){
						this.$http.post("/API/Student/ApplicationLearn",{
							"LearnSum":this.applyMoney,
							"Remark":this.applyReason
						})
					}
				})
			},
			Recharge:function(){
				try{
					var fee=parseFloat(this.RechargeMoney);
					if(isNaN(fee)){
						alert("请输入正确的充值金额");
						return;
					}
					if(this.RechargeMoney)
					var jsonmodel=eval("("+window.localStorage.WeChatUser+")");
					this.$http.post("/API/Student/GetWeChatPaySDK",{"Fee":fee,"OpenId":jsonmodel.openid}).then(res => {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest',res.body.Data.WXPayConfig,
							function(res){    
								if(res.err_msg == "get_brand_wcpay_request:ok" ) {
									alert("充值成功！");

								}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
							}
						); 
					});
				}catch (e) {
				}
				
			}
		},
		components:{
			MHeader,
			XButton,
			Dialog
		}
	}
</script>
<style>
	.recharge_group{
		font-size: .15rem;
		background-color: #fff;
		padding: 0px .3rem;
		margin-top: .1rem;
		padding-bottom: 1rem;
	}
	.recharge_group .recharge_title{
		border-bottom: 0px;
		font-size: .3rem;
		color: #333;
		text-align: center;
		line-height: .8rem;
	}
	.recharge_group .margin-b-1{
		margin-bottom: 1rem;
	}
	.recharge_group .recharge_input, .recharge_group .recharge_textarea{
		font-size: .3rem;
		padding: .1rem;
		display: block;
		width: 100%;
		border:0px;
		outline: none;
	}
	.recharge_left-title{
		text-align: left;
		margin: .2rem 0;
		font-size: .3rem;
		color: #666;
	}

</style>
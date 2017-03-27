<template>
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="我的二维码"></m-header>
	<div class="portrait">
		<div class="img-wrap img-wrap-border img-wrap-radius"><img v-bind:src="data.HeadPortraits" alt=""></div>
		<h5 class="portrait-name">{{data.UName}}</h5>
	</div>
	<div class="portrait-qrcode-wrap"><qrcode v-bind:value="data.QRCode" :size="qr_size"></qrcode></div>
</template>
<style>
	.portrait .img-wrap{
		width: 1.8rem;
		height: 1.8rem;
		margin:.88rem auto .38rem auto;
	}
	.portrait .portrait-name{
		font-size: .34rem;
		color: #333;
		text-align: center;
		font-weight: normal;
		margin-bottom: .7rem;
		color: #333;
	}
	.portrait-qrcode-wrap{
		margin: 0 auto;
		width:4.3rem;
		height: 4.3rem;
		text-align: center;
		padding: 10px;
		border:1px solid #ddd;
		vertical-align: middle;
	}
	.portrait-qrcode-wrap>canvas{
		height: 100%;

	}
	.qrcode-canvas{
		width: 100%;
		height: 100%;
	}
</style>
<script>
	import Qrcode from "vux/src/components/qrcode"
	import MHeader from '../../../components/header.vue'
	export default {
		components:{
			Qrcode,
			MHeader
		},
		data(){
			return {
				data:{
					Nickname:"",
                    QRCode:"",
                    UName:""
				}
			}
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				this.$http.post('/API/Student/GetUserQRCode').then(res => {
					this.$set('data' , res.body.Data);
				});
			}
		}
	}
</script>
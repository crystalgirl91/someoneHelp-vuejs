<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="商品详情"></m-header>
	<div class="p_mark">
		<swiper  dots-class="swiper-dot" dots-position="center" :list="list" auto></swiper>
		<div class="desc">
			<h4 class="name">{{data.SName}} <span class="font-active name-xs">库存{{data.Stock}}</span><!-- <span class="font-active name-xs">京东配送</span> --></h4>
			<!-- <p class="name-sm">专业护眼可充电KM-6658C多色</p> -->
			<p class="name-xs word-wrap">{{data.Introduction}}</p>
			<p class="name-sm">兑换积分：<span class="font-active">{{data.Credits}}积分</span></p>
		</div>
		<button class="m-btn m-btn-normal m-btn-full" v-on:click="isshow=true">立即兑换</button>
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<form @submit.prevent @submit="submit()">
				<div class="m_dialog_content">
					<h3 class="m-dialog-title">
						兑换
					</h3>
					<div class="m-dialog-body">
						<div class="form-group"><label class="label" for="">当前积分</label>{{credits}}</div>
						<div class="form-group"><label class="label" for="">兑换数量</label><input class="form-control" type="number" required v-model="number"></div>
						<div class="form-group"><label class="label" for="">收货人</label><input class="form-control" type="text" required v-model="ContactName"></div>
						<div class="form-group"><label class="label" for="">联系电话</label><input class="form-control" type="text" required v-model="ContactPhone"></div>
						<div class="form-group"><label class="label" for="">收货地址</label><input class="form-control" type="text" required v-model="CAddress"></div>
					</div>
					<div class="btn-group">
						<button class="btn" type="submit">确定</button>
						<button class="btn" type="button" v-on:click="isshow=false">取消</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
</template>
<style>
	.p_mark .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .p_mark .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
		color: #ff9100;
		background-color: #ff9100;
	}
	.p_mark .desc{
		padding: .3rem;
	}
	.p_mark .desc .name{
		font-size: .34rem;
		color: #333;
		font-weight: normal;

	}
	.p_mark .desc .name-sm{
		font-size: .28rem;
		font-weight: normal;
		color: #333;
	}
	.p_mark .desc .name-xs{
		font-size: .24rem;
		color: #666;
		line-height: 1.5;
	}
	.p_mark .word-wrap{
		white-space: pre-wrap;
	}
	.p_mark .m_dialog_content{
		border-radius: 0px;
		color: 
	}
	.p_mark .m-dialog-title{
		color: #000;
		font-size: .34rem;
		padding: .24rem;
		text-align: center;
		line-height: 1;
		margin-bottom: 0px;
	}
	.p_mark .m-dialog-body{
		padding: .3rem 0;
	}
	.p_mark .m-dialog-body .form-group{
		border-bottom: 1px solid #dfdfdf;
		text-align: left;
		line-height: .7rem;
	}
	.p_mark .m-dialog-body .form-group .label{
		display: inline-block;
		width: 30%;
		text-align: right;
		margin-right: .2rem;
		font-size: .28rem;
	}
	.p_mark .m-dialog-body .form-group .form-control{
		width: 60%;
		padding: .05rem;
		border:0px;
		outline: none;
	}
	
	.p_mark .m-dialog-body .btn-group{
		text-align: center;
	}

	.p_mark .m_dialog_content .btn-group .btn{
		line-height: .88rem;
		display: inline-block;
		padding: 0 .4rem;
		border:0px;
		background-color: #fff;
		outline: none;
	}
	
</style>
<script>
	import MHeader from '../../../components/header.vue'
	import Swiper from 'vux/src/components/swiper'
	import Dialog from 'vux/src/components/dialog'
	export default {
		data(){
			return {
				  isshow:false,
				  PK_ISID:this.$route.params.PK_ISID,
			      data: {},
			      list:[],
			      credits:'',
			      number:1,
				  CAddress:'',
				  ContactName:'',
				  ContactPhone:'',
				  Remark:'',
			     
			}
		},
		ready:function(){
			 this.getData().then(this.getCredits);
		},
		methods:{
			getData:function(){
				return this.$http.post("/API/Student/GetIntegralStoreModel",{
					"PK_ISID":this.PK_ISID
				}).then(res => {
					this.data = res.body.Data;
					this.list = res.body.Data.SPhotoAlbum.map(i => {
						return {
							url:"",
							img:i,
							title:""
						}
					});
				})
			},
			getCredits:function(){
				this.$http.post("/API/Student/GetUserIntegral").then(res => {
					this.credits = res.body.Data;
				})
			},
			submit:function(){
				this.$http.post("/API/Student/ExchangeMerchandise",{
					"PK_ISID":this.PK_ISID,
					"Number":this.number,
					"CAddress":this.CAddress,
					"ContactName":this.ContactName,
					"ContactPhone":this.ContactPhone,
					"Remark":this.Remark
				}).then(res => {
					this.getCredits();
					alert('兑换成功');
					this.isshow = false;
				})
			}
		},
		components:{
			MHeader,
			Swiper,
			Dialog
		}
	}
</script>
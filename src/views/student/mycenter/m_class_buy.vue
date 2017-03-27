<template>
	<div class="sm-question-buy ls-student">
		<h3 class="title">赞赏<i v-on:click="back()" class="icon icon-close2"></i></h3>
		<div class="headpic">
			<img class="pic" :src="data.HeadPortraits">
			<p class="name">{{data.UName}}</p>
		</div>
		<ul class="check-list clearfix">
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="2" name="radio_money"><span class="big">2</span>元</label>
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="17" name="radio_money"><span class="big">17</span>元</label>
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="52" name="radio_money"><span class="big">52</span>元</label>
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="87" name="radio_money"><span class="big">87</span>元</label>
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="123" name="radio_money"><span class="big">123</span>元</label>
			<label class="check-item" v-on:click="isshow=true"><input type="radio" v-model="money" hidden value="166" name="radio_money"><span class="big">166</span>元</label>
		</ul>
		<p class="gray" v-on:click="isshow=true">其他金额</p>
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<form @submit.prevent @submit="submit()">
				<div class="m_dialog_content">
					<h3 class="m-dialog-title">
						打赏金额
					</h3>
					<div class="m-dialog-body">
						<div class="m-form-group">
							<label class="m-control-label">赞赏（学币）:</label>
							<input type="number" v-model="money" class="m-form-control">
						</div>
					</div>
					<flexbox :gutter="0" class="m-dialog-footer">
						<flexbox-item ><button type="submit" class="m-dialog-button">确定</button></flexbox-item>
						<flexbox-item><button class="m-dialog-button" v-link="{'path':'/mycenter/recharge'}">充值</button></flexbox-item>
					</flexbox>
				</div>
			</form>
		</dialog>
	</div>
</template>
<style>
	.sm-question-buy{
		background-color: #f0f4f3;
		min-height: 100%;
		font-size: .36rem;
	}
	.sm-question-buy .title{
		text-align: center;
		position: relative;
		line-height: 1rem;
		font-weight: normal;
	}
	.sm-question-buy .title .icon{
		position: absolute;
		font-size: .4rem;
		left: .3rem;
		top: .3rem;
	}
	.sm-question-buy .headpic{
		width: 2rem;
		text-align: center;
		margin: 0 auto;
		margin-top: 1rem;
	}
	.sm-question-buy .headpic .pic{
		width: 1.54rem;
		height: 1.54rem;
		border-radius:50%;
		overflow: hidden;
		border:1px solid #ff9100;
		margin-bottom: .1rem;
	}
	.sm-question-buy .headpic .name{
	}
	.sm-question-buy .check-list{
		width: 6.6rem;
		margin:1.9rem  auto 0 auto;
	}
	.sm-question-buy .check-list .check-item{
		border-radius: 10px;
		border: 1px solid #ff9100;
		width: 2rem;
		height: 1.2rem;
		line-height: 1.2rem;
		color: #ff9100;
		float: left;
		margin-right: .22rem;
		text-align: center;
		margin-bottom: .48rem;
	}
	.sm-question-buy .check-list .check-item:nth-child(3n){
		margin-right: 0px;
	}
	.sm-question-buy .check-list .check-item .big{
		font-size: .64rem;
	}
	.sm-question-buy .gray{
		width: 3rem;
		text-align: center;
		margin:0 auto;
		line-height: 1rem;
		font-size: .3rem;
		color: #666;
	}
	.ls-student .m-dialog-body {
		font-size: .14rem;
		color: #666;
		padding: 0px .2rem;
	}
	
	.ls-student .m-dialog-title {
		position: relative;
		color: #666;
		font-size: .34rem;
		font-weight: normal;
		border-bottom: 1px solid #ff9100;
		margin: 0 .2rem;
	}
	
	.ls-student .m-dialog-body .m-form-group {
		font-size: .3rem;
		border-bottom: 1px solid #dfdfdf;
		line-height: 1rem;
	}
	.ls-student .m-dialog-body .m-form-group .m-form-control{
		font-size: .3rem;
	}
	.ls-student .m-dialog-body .m-form-group:last-child{
		border-bottom: 0px;
	}
	
	.ls-student .m-dialog-title .m-dialog-close {
		position: absolute;
		right: .42rem;
		top: .2rem;
	}
	.ls-student .m-dialog-body .m-form-group .m-control-label{
		font-size: .3rem;
		display: inline-block;
		width: 50%;
		color: #333;
	}
	.ls-student .m-dialog-body .m-form-group .m-control-label~span{
		display: inline-block;
		width:40%;
		text-align: left;
	}
	.ls-student .m-dialog-body .m-form-group .m-form-control{
		width:40%;
		border:0px;
		box-shadow: 0px;
		outline: 0px;

	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import Dialog from "vux/src/components/dialog"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";

	export default {
		components:{
			MHeader,
			Dialog,
			Flexbox,
			FlexboxItem
		},
		data(){
			return {
				isshow:false,
				money:2,
				data:{}
			}
		},
		ready:function(){
			this.getData();
		},
		methods:{
			back:function(){
				history.back();
			},
			getData:function(){
				this.$http.post("/API/Student/GetTeacherInfo",{
					 "PK_UID": this.$route.params.PK_UID
				}).then(res => {
					this.data = res.body.Data;
				})
			},
			submit:function(){
				this.$http.post("/API/Student/PlayTour",{
					"PK_UID":this.data.PK_UID,
					"Amount":Number(this.money)
				}).then(res => {
					this.isshow = false;
					if(res.body.ErrCode==200){
						alert("操作成功！");
						history.go(-1);
					}
				});
			}
		}

	}
</script>
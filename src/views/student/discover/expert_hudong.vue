<template>
<div class="expert_hudong">
	<ul class="s-question-list">
		<li class="s-question-item" v-for="item in rows">
			<a @click.prevent @click="getDetail(item)">
				<p class="word font-base-dark">{{item.Content}}</p>
				<div class="yuyin clearfix">
					<div class="yuyin-person"><i class="icon icon-zaixianrenshu"></i><span class="desc">{{item.LookAtCount}}人</span></div>
					<div class="yuyin-mess">
						<div class="yuyin-comment">
							<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
								<i class="icon icon-voice"></i>
								<span class="bigger">{{item.STypeMessage}}</span>
								<span class="smaller">{{item.STypeSurplus}}</span>
							</span>
						</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
	<dialog :show.sync="isshow" :hide-on-blur="true">
		<div class="m_dialog_content">
			<h3 class="m-dialog-title">
				提示
			</h3>
			<div class="m-dialog-body">
				<div class="m-form-group">
					<label class="m-control-label">收费：</label>
					<span>{{Fee}}学币</span>
				</div>
				<div class="m-form-group">
					<label class="m-control-label">当前余额：</label>
					<span>{{myBalance}}学币</span>
				</div>
			</div>
			<flexbox :gutter="0" class="m-dialog-footer">
				<flexbox-item ><button v-on:click="PlayTour()" class="m-dialog-button">确定</button></flexbox-item>
				<flexbox-item><button class="m-dialog-button" v-link="{'path':'/mycenter/recharge'}">充值</button></flexbox-item>
			</flexbox>
		</div>
	</dialog>
</div>
</template>
<style>
	.expert_hudong .m-control-label{
		display: inline-block;
		width: 50%;
		text-align: right;
	}
	.expert_hudong .m-form-group{
		text-align: left;
		font-size: .28rem;
	}
	.s-question-list{
		padding: 0 .3rem;
		background: #fff;
	}
	.s-question-list .s-question-item{
		border-bottom: 1px solid #eaeaea;
		padding-bottom: .7rem;
	}
	.s-question-list .s-question-item:last-child{
		border-bottom: 0px;
	}
	.s-question-item .word{
		font-size: .3rem;
		line-height: 1;
		padding: .3rem 0;
	}
	.yuyin{

	}
	.yuyin .yuyin-person{
		width: 1.3rem;
		height: 1.3rem;
		display: inline-block;
		border-radius: 3px;
		overflow: hidden;
		border:1px solid #eaeaea;
		float: left;
	}
	.yuyin .yuyin-person>img{
		width: 100%;
		height: 100%;
	}
	.yuyin .yuyin-mess{
		padding-left: 1.44rem;
		width: 100%;
		box-sizing: border-box;
	}
	.yuyin-mess .tags .name{
		font-size: .26rem;
		margin-right: .18rem;
		display: inline-block;
	}
	.yuyin-mess .tags .tag{
		border:1px solid #dfdfdf;
		font-size: .22rem;
		margin-right: .1rem;
	}
	.yuyin-comment {
		margin: .14rem 0 .2rem .2rem;
	}
	.yuyin-comment .yuyin-comment-green{
		background: #86c82a;
		line-height: .76rem;
		padding: 0 .2rem;
		display: inline-block;
		color: #fff;
		border-radius: .2rem;
		position: relative;
		border-top-left-radius: 0px;
	}
	.yuyin-comment .yuyin-comment-green:before{
	 	background:url(../../../assets/images/icon-bg.jpg) right top/100% no-repeat;
	 	width: .2rem;
	 	height: .2rem;
	 	display: inline-block;
	 	content: "";
	 	position: absolute;
	 	left: -.19rem;
	 	top: 0px;

	}
	.yuyin-comment .yuyin-comment-green .icon{
		font-size: .4rem;
		vertical-align: middle;
		margin-right: .08rem;
	}
	.yuyin-comment .yuyin-comment-green .bigger{
		font-size: .28rem;
		margin-right: .08rem;
		vertical-align: middle;
	}
	.yuyin-comment .yuyin-comment-green .smaller{
		font-size: .18rem;
		vertical-align: middle;
	}
	.yuyin-comment .yuyin-icon{
		font-size: .24rem;
	}
	.yuyin-comment .yuyin-icon .icon{
		font-size: .24rem;
		vertical-align: middle;
	}
</style>
<style>
	.expert_hudong .yuyin-comment{
		padding-top: .4rem;
	}
	.expert_hudong .yuyin-person{
		text-align: center;
		background: #e5e5e5;
	}
	.expert_hudong .yuyin-person .icon{
		font-size: .7rem;
		display: block;text-align: center;
		color: #666666;
		line-height: .74rem;
	}
	.expert_hudong .yuyin-person .icon:before{
		vertical-align: middle;
	}
</style>
<script>
	import {Tab,TabItem} from "vux/src/components/tab"
	import {Flexbox,FlexboxItem} from "vux/src/components/flexbox"
	import Dialog from "vux/src/components/dialog"
	export default {
		data(){
			return {
				block:1,
				id:this.$route.params.id,
				rows:[],
				isshow:false
			}
		},
		ready:function(){
			this.getData();
		},
		methods:{
			getData:function(){
				this.$http.post("/API/Student/GetTeacherAskTheExpertsList",{
					"PK_UID":this.id, 
					"PageIndex":1, 
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				});
				this.getBalance();
			},
			getDetail:function(item){
				this.checkIsFree(item).then((bool) => {
					if(bool){
						this.$router.go({
							name  : 'question_detail',
							params: {
								'PK_AEID': item.PK_AEID
							}
						})
					}else{
						this.$set("Fee",item.ViewFee);
						this.$set("PK_AEID",item.PK_AEID);
						this.isshow = true;
					}
				});
			},
			getBalance:function(){
				this.$http.post("/API/Student/GetBalance").then(res => {
					this.$set("myBalance",res.body.Data);
				})
			},
			checkIsFree:function(d){
				return this.$http.post("/API/Student/CheckView",{
					"PK_AEID":d.PK_AEID
				}).then(res => {
					return !res.body.Data;
				})
			},
			PlayTour:function(){
				//购买问题
				this.$http.post("/API/Student/BuyAskTheExperts",{
					"PK_AEID": this.PK_AEID
				}).then(res => {
					if(res.body.Data){
						this.$router.go({
							name  : 'question_detail',
							params: {
								'PK_AEID': this.PK_AEID
							}
						});
					}
				})
			}
		},
		components:{
			Tab,
			TabItem,
			Flexbox,
			FlexboxItem,
			Dialog
		}
	}
</script>
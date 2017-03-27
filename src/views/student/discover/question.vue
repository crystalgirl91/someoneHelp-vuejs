<template>
	<div class="d_question">
		<tab :line-width="2" :active-color="'#86c82a'">
			<tab-item :selected="block===1" v-on:click="block = 1" title="热度" >热度</tab-item>
			<tab-item :selected="block===2" v-on:click="block = 2" title="最新">最新</tab-item>
			<tab-item :selected="block===3" v-on:click="block = 3" title="免费">免费</tab-item>
		</tab>
		<ul v-if="block===1" class="s-question-list">
			<li class="s-question-item" v-for="item in data[0]">
				<a @click.prevent @click="goDetail(item)">
					<p class="word font-base-dark">{{item.Content}}</p>
					<div class="yuyin clearfix">
						<div class="yuyin-person"><img :src="item.HeadPortraits"></div>
						<div class="yuyin-mess">
							<div class="tags">
								<span class="name">{{item.UName}}</span>
								<span class="tag" v-for="f in item.Field">{{f}}</span>
							</div>
							<div class="yuyin-comment">
								<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
									<i class="icon icon-voice"></i>
									<span class="bigger">{{item.STypeMessage}}</span>
									<span class="smaller">{{item.STypeSurplus}}</span>
								</span>
								<span class="yuyin-icon"><i class="icon icon-zaixianrenshu"></i>{{item.LookAtCount}}人</span>
							</div>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<ul v-if="block===2" class="s-question-list">
			<li class="s-question-item" v-for="item in data[1]">
				<a @click.prevent @click="goDetail(item)">
					<p class="word font-base-dark">{{item.Content}}</p>
					<div class="yuyin clearfix">
						<div class="yuyin-person"><img :src="item.HeadPortraits"></div>
						<div class="yuyin-mess">
							<div class="tags">
								<span class="name">{{item.UName}}</span>
								<span class="tag" v-for="f in item.Field">{{f}}</span>
							</div>
							<div class="yuyin-comment">
								<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
									<i class="icon icon-voice"></i>
									<span class="bigger">{{item.STypeMessage}}</span>
									<span class="smaller">{{item.STypeSurplus}}</span>
								</span>
								<span class="yuyin-icon"><i class="icon icon-zaixianrenshu"></i>{{item.LookAtCount}}人</span>
							</div>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<ul v-if="block===3" class="s-question-list">
			<li class="s-question-item" v-for="item in data[2]">
				<a @click.prevent @click="goDetail(item)">
					<p class="word font-base-dark">{{item.Content}}</p>
					<div class="yuyin clearfix">
						<div class="yuyin-person"><img :src="item.HeadPortraits"></div>
						<div class="yuyin-mess">
							<div class="tags">
								<span class="name">{{item.UName}}</span>
								<span class="tag" v-for="f in item.Field">{{f}}</span>
							</div>
							<div class="yuyin-comment">
								<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
									<i class="icon icon-voice"></i>
									<span class="bigger">{{item.STypeMessage}}</span>
									<span class="smaller">{{item.STypeSurplus}}</span>
								</span>
								<span class="yuyin-icon"><i class="icon icon-zaixianrenshu"></i>{{item.LookAtCount}}人</span>
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
	.d_question .m-control-label{
		display: inline-block;
		width: 50%;
		text-align: right;
	}
	.d_question .m-form-group{
		text-align: left;
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
	.yuyin-comment .yuyin-comment-item{
		width: 3.57rem;
		line-height: .76rem;
		padding: 0 .2rem;
		display: inline-block;
		color: #fff;
		border-radius: .2rem;
		position: relative;
		border-top-left-radius: 0px;
		margin-right: .1rem;
	}
	.yuyin-comment .yuyin-comment-item:before{
		width: .2rem;
	 	height: .2rem;
	 	display: inline-block;
	 	content: "";
	 	position: absolute;
	 	left: -.19rem;
	 	top: 0px;
	}
	.yuyin-comment .yuyin-comment-green{
		background-color: #86c82a;
	}
	.yuyin-comment .yuyin-comment-normal{
		background-color: #ff9100;
	}
	.yuyin-comment .yuyin-comment-normal:before{
		background:url(../../../assets/images/icon-bg-normal.jpg) right top/100% no-repeat;
		
	}
	.yuyin-comment .yuyin-comment-green:before{
	 	background:url(../../../assets/images/icon-bg.jpg) right top/100% no-repeat;
	}
	.yuyin-comment .yuyin-comment-item .icon{
		font-size: .4rem;
		vertical-align: middle;
		margin-right: .08rem;
	}
	.yuyin-comment .yuyin-comment-item .bigger{
		font-size: .28rem;
		margin-right: .08rem;
		vertical-align: middle;
	}
	.yuyin-comment .yuyin-comment-item .smaller{
		font-size: .18rem;
		vertical-align: middle;
	}
	.yuyin-comment .yuyin-icon{
		font-size: .24rem;
	}
	.yuyin-comment .yuyin-icon .icon{
		vertical-align: middle;
		margin-right: .05rem;
		font-size: .24rem;
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
				data:{0:[],1:[],2:[]},
				pageIndex:1,
				pageSize:100,
				isshow:false,
				Fee:"",
				PK_AEID:"",
				myBalance:""
			}
		},
		ready:function(){
			this.$watch("block",function(){
				this.getList(this.block - 1);
			})
			this.getList(0).then(this.getBalance);
		},
		methods:{
			getList:function(type){
				return this.$http.post("/API/Student/GetHomeAskList",{
					"GetType":type,
					"PageIndex":this.pageIndex,
					"PageSize":this.pageSize
				}).then(res => {
					this.data[type] = res.body.Data;
				})
			},
			goDetail:function(item){
				this.PK_AEID = item.PK_AEID;
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
						this.isshow = true;
					}
				});
			},
			checkIsFree:function(d){
				return this.$http.post("/API/Student/CheckView",{
					"PK_AEID":d.PK_AEID
				}).then(res => {
					return !res.body.Data;
				})
			},
			getBalance:function(){
				this.$http.post("/API/Student/GetBalance").then(res => {
					this.$set("myBalance",res.body.Data);
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
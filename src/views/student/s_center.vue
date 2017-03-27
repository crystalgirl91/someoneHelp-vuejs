<template>
	<div class="mycenter">
		<group class="group-no-border-t">
			<div class="m-panel-box-big">
				<div class="m-panel-card">
					<a class="m-panel-pic" v-link="{'path':'/mycenter/setting'}"><img :src="data.HeadPortraits"></a>
					<div class="m-panel-flex">
						<p class="title">{{data.UName}}</p>
						<span class="icon font-active" :style="{'background-image':'url(' + data.LevelImage + ')'}"></span>
						<span class="name">会员</span>
					</div>
					<span v-on:click="signIn()" class="panel-card-btn">
					<i class="icon icon-Sign-in"></i>签到</span>
				</div>
			</div>
		</group>
		<group class="group-no-border-t">
			<div class="card-title vux-1px-b">
				<i class="card-title-icon icon-ranking color-blue"></i>第<span class="color-blue">{{data.Ranking}}</span>名
			</div>
			<div class="card-horizontal vux-1px-b">
				<div class="card-item vux-1px-r">
					<i class="card-icon icon-Gold-coins2" style="color:#f4c600"></i>
					<span class="icon-des">{{data.Learn}}学币</span>
				</div>
				<a class="card-item" v-on:click="this.$router.go('/center_credit_record')">
					<i class="card-icon icon-jifen2" style="color:#eb4f38"></i>
					<span class="icon-des">{{data.Integral}}积分</span>
				</a>
			</div>
		</group>
		<group class="group-no-border-t">
			<cell title="今日任务" link="/mycenter/task" icon-class="icon-my2">
				<span slot="icon" class="icon icon-today-task" style="color:#ea4f39"></span>
				<badge class="m-badge" v-show="data.TaskCount > 0" :text="data.badge"></badge>
			</cell>
			<cell title="我的问答" link="/mycenter/question">
				<span slot="icon" class="icon icon-my-ques-and-ans" style="color:#f2c500"></span>
			</cell>
			<cell title="精品班" link="/mycenter/class">
				<span slot="icon" class="icon icon-my-class" style="color:#ea8010"></span>
			</cell>
			<cell title="我的收藏" link="/mycenter/follow">
				<span slot="icon" class="icon icon-my-collection" style="color:#58ade3"></span>
			</cell>
			<cell title="已学知识" link="/mycenter/knowledge">
				<span slot="icon" class="icon icon-learnt-knowledge" style="color:#00ba9b"></span>
			</cell>
		</group>
		<group class="group-no-border-t">
			<cell title="充值中心" v-on:click="toczlink()" :is-link="true" >
				<span slot="icon" class="icon icon-choangzhizhognxin" style="color:#56abe4"></span>
			</cell>
			<cell title="消费记录" link="/mycenter/record">
				<span slot="icon" class="icon icon-xiaofeijilu2" style="color:#9d55b8"></span>
			</cell>
		</group>
		<group class="group-no-border-t">
			<cell title="成为专家" link="/mycenter/expert">
				<span slot="icon" class="icon icon-become-professor" style="color:#56abe4"></span>
			</cell>
			<cell title="我的二维码" style="display: none;" link="/mycenter/qrcode">
				<span slot="icon" class="icon icon-my-Qr-code" style="color:#e16450"></span>
			</cell>
			<cell  v-if="data.ULType==7" :is-link="true" title="内训师" v-on:click="tolink()" >
				<span slot="icon" class="icon icon-neixunshi" style="color:#e16450"></span>
			</cell>
		</group>
		<dialog :show.sync="showDialog" :hide-on-blur="true">
			<i class="icon icon-close2" v-on:click="showDialog=false"></i>
			<div class="m_dialog_content">
				<div class="m-dialog-body m-dialog-body-nogutter">
					<div class="jifen-d-pic"></div>
					<div class="jifen-d-word">
						<span class="word-big font-active"> + 2 </span>
						积分
					</div>
					<p class="jifen-d-note">坚持每日签到，每日增加2积分</p>
				</div>
			</div>
		</dialog>
	</div>
</template>
<script>
	import Dialog from "vux/src/components/dialog"
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import Badge from "vux/src/components/badge"	

	export default {
		data(){
			return {
				showDialog:false,
				data:{
					badge:"0"
				}
			}
		},
		ready:function(){
			var _this=this;
				_this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
					wx.ready(function () {
						wx.hideOptionMenu();
						});
				});
			this.getData();
		},
		methods:{
			tolink:function(){
				window.location="index_class.html#!/home/question";
			},
			getData:function(){
				this.$http.post("/API/Student/GetHomeUser").then(res => {
					this.data = res.body.Data;
					this.data.badge = String(this.data.TaskCount);
				})
			},
			signIn:function(){
				this.$http.post("/API/Student/UserSignIn").then(res => {
					this.showDialog = true;
				})
			},
			toczlink:function(){
				window.location="index_student.html#!/mycenter/recharge";				
			}
		},
		components:{
			Group,
			Cell,
			Dialog,
			Badge
		}
	} 
</script>
<style>
	.mycenter{
		min-height: 100%;
		background-color: #f0f4f3;
		padding-bottom: 1.34rem;
		box-sizing: border-box;
	}
	.mycenter .icon{
		font-size: .4rem;
		margin-right: .18rem;
		display: inline-block; 
		vertical-align: middle;
	}
	.mycenter .panel-card-btn{
		position: absolute;
		right: .3rem;
		top:1.4rem;
		font-size: .36rem;
	}
	.mycenter .panel-card-btn .icon{
		font-size: .48rem;
		margin-right: .1rem;
		color: #ea8010;
		vertical-align: top;
	}
	.mycenter .weui_cell{
		padding: .24rem .4rem .24rem .32rem;
		/*border-bottom: 1px solid #dbd8d8;
		border-top: 0px;*/
	}
	.mycenter .weui_cell_bd > p{
		font-size: .28rem;
		vertical-align: middle;
	}
	.card-demo-flex {
	  display: flex;
	}
	.card-demo-content01 {
	  padding: 10px 0;
	}
	.card-padding {
	  padding: 15px;
	}
	.card-demo-flex > div {
	  flex: 1;
	  text-align: center;
	  font-size: 12px;
	}
	.card-demo-flex span {
	  color: #f74c31;
	}

	.card-horizontal{
		display: flex;
		padding: 0.09rem;
		/*border-bottom: 1px solid #dbd8d8;*/
	}
	.card-horizontal .card-item{
		flex: 1;
		height: .9rem;
		justify-content: center;
		display: flex;
		align-items: center;
	}
	.mycenter .card-title{
		height: .9rem;
		line-height: .9rem;
		justify-content: center;
		display: flex;
		align-items: center;
		padding: 0.09rem;
		margin:0 .3rem;
	}
	.mycenter .card-title .card-title-icon{
		font-size: .7rem;
		color: #56abe4;
		margin-right: .5rem;
		vertical-align: middle;
	}
	/*.card-horizontal .card-item:nth-child(1){
		border-right: 1px solid #dbd8d8;
	}*/
	.card-item .card-icon{
		font-size: .7rem;
		display: inline-block;
		border-radius: 50%;
		width: .7rem;
		height: .7rem;

	}
	.card-item .icon-des{
		vertical-align: middle;
		margin-left: .2rem;
		color: #333;
		font-size: .24rem;
		line-height: 1;
		display: inline-block;
		height: .3rem;
	}

	.m-panel-box-big{
		color: #333333;
		font-size: .3rem;
		padding: .39rem .30rem;
		display: block;
		position: relative;
	}
	.m-panel-box-big .m-panel-card{
		display: flex;
		margin-bottom: .2rem;
		justify-content: center;
		align-items: center;
	}
	.m-panel-box-big .m-panel-card .m-panel-pic{
		width: 1.84rem;
		height: 1.84rem;
		border-radius: 50%;
		overflow: hidden;
		background-color: #eee;
		background-size: 100%;
		background-position: center;
		margin-right: .26rem;
		flex: none;
	}
	.m-panel-box-big .m-panel-card .m-panel-pic >img {
		width: 100%;
		height: 100%;
	}
	.m-panel-box-big .m-panel-card .m-panel-flex{
		flex: 1;
	}
	.m-panel-box-big .m-panel-flex .title{
		font-size: .36rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		line-height: .4rem;
		height: .4rem;
		width: auto;
		margin-bottom: .2rem;
	}
	.m-panel-box-big .m-panel-flex .icon{
		font-size: .45rem;
		height: .5rem;line-height: .5rem;
	}
	.mycenter .m-panel-box-big .m-panel-flex .icon{
		width: .6rem;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center; 
	}
	.mycenter .m-panel-box-big .m-panel-flex .name{
		height: .5rem;line-height: .5rem;
		display: inline-block;
		vertical-align: middle;
	}
	.icon [class^='path']{
		font-size:.62rem;
	}
	.group-no-border-t{
		margin-top: .1rem;
	}
	.group-no-border-t:nth-child(1){
		margin-top: 0px;
	}
	.group-no-border-t .weui_cells:nth-child(1){
		margin-top: 0px;
	}
	.group-no-border-t .weui_cells:before,.group-no-border-t .weui_cells:after{
		content: "";
		border-top:0px;
	}
	.mycenter .m-dialog-body{
		padding: 0px;
	}
	.mycenter .m_dialog_content{
		padding: .66rem .3rem;
		position: relative;
		background: #fff;
	}
	.mycenter .jifen-d-pic{
		height: 1.08rem;
		width: 100%;
		background: url(../../assets/images/sign.jpg) no-repeat center/auto 100%;
	}
	.mycenter .jifen-d-word{
		font-size: .36rem;
		margin-bottom: .5rem;
		line-height: 1;
	}
	.mycenter .jifen-d-word .word-big{
		font-size: 1rem;
		vertical-align: middle;
	}
	.mycenter .jifen-d-note{
		font-size: .24rem;
		color: #666;
	}
	.mycenter .weui_dialog .icon-close2{
		position: absolute;
		width: .46rem;
		height: .46rem;
		background: #fff;
		right: -.23rem;
		top: -.23rem;
		text-align: center;
		display: inline-block;
		border-radius: 50%;
	}
	.mycenter .m-badge{
		position: absolute;
	    left: 0.5rem;
	    top: .12rem;
	}

</style>
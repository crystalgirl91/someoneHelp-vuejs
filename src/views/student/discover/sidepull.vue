<template>
	<div class="discover_sidepull">
		<m-header :style="{'border-bottom':'1px solid #d9d9d9'}"></m-header>
		<div class="discover_sidepull_wrap">
			<ul class="aside aside-default" v-bind:sync="value">
				<li v-on:click="checkOne($index)" v-bind:class="{'selected':curidx === $index}" v-for="item in list" class="aside-item">
					<span class="aside-span">{{item.UName}}</span><i class="icon" v-bind:class="{'icon-enter2':curidx !== $index,'icon-pull-down':curidx === $index}"></i>
				</li>
			</ul>
			<div class="sidepull">
				<li @click.prevent v-on:click="openDialog(item)" class="sidepull-item" v-for="item in classs">{{item.TName}}</li>
			</div>
		</div>
		<!-- <dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title">
					提示
					<i class="m-dialog-close icon-close" v-on:click="isshow = false"></i>
				</h3>
				<div class="m-dialog-body">
					<div class="m-form-group">
						<label class="m-control-label">会员价格：{{dialogData.Fee}}</label>
						<div></div>
					</div>
					<div class="m-form-group">
						<label class="m-control-label">有效期限：{{dialogData.DayLength}}</label>
						<div></div>
					</div>
					<x-button class="weui_btn_normal" @click="goClassDetail()"  type="normal" text="提交"></x-button>
				</div>
			</div>
		</dialog> -->
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title">
					提示
				</h3>
				<div class="m-dialog-body">
					<div class="m-form-group">
						<label class="m-control-label">会员价格：</label>
						<span>{{dialogData.Fee}}学币</span>
					</div>
					<div class="m-form-group">
						<label class="m-control-label">有效期限：</label>
						<span>{{dialogData.DayLength}}天</span>
					</div>
				</div>
				<flexbox :gutter="0" class="m-dialog-footer">
					<flexbox-item ><button @click="goClassDetail()" class="m-dialog-button">确定</button></flexbox-item>
					<flexbox-item><button class="m-dialog-button" v-link="{'path':'/mycenter/recharge'}">充值</button></flexbox-item>
				</flexbox>
			</div>
		</dialog>
	</div>
</template>
<script>

	// import MAside from "../../../components/aside.vue";
	import MHeader from "../../../components/header.vue";
	import Dialog from "vux/src/components/dialog";
	import XButton from 'vux/src/components/x-button';
	import {Flexbox,FlexboxItem} from "vux/src/components/flexbox"
	export default {
		data(){
			return {
				curidx:0,
				list:[],
				PK_UID:"",
				classs:[],
				dialogData:{},
				isshow:false
			}
		},
		methods:{
			checkOne:function(it){
				this.curidx = it;
				this.PK_UID = this.list[this.curidx].PK_UID;
				this.getClass();
			},
			getList:function(){
				return this.$http.post("/API/Student/GetMyCollectTeacher",{
					 "PageIndex":1,
					 "PageSize":100
				}).then(res => {
					this.list = res.body.Data;
					this.curidx = 0;
					this.PK_UID = this.list[this.curidx].PK_UID;
				})
			},
			getClass: function(){
				return this.$http.post("/API/Student/GetTeacherTeamList",{
					"PK_UID":this.PK_UID, "PageIndex":1, "PageSize":100
				}).then(res => {
					this.classs = res.body.Data
				})
			},
			openDialog:function(item){
				this.$http.post("/API/Student/CheckUserInTeam",{
					 "PK_TID":item.PK_TID
				}).then(res => {
					var isFee = res.body.Data.State;
					if(isFee){
						this.isshow = true;
						this.dialogData = item;
					}else{
						this.$router.go({"name":"discover_class_detail",params:{'PK_TID':item.PK_TID}})
					}
				})
			},
			goClassDetail:function(){
				this.$http.post("/API/Student/UserJoinTeam",{
					"PK_TID":this.dialogData.PK_TID
				}).then(res => {
					this.$router.go({"name":"discover_class_detail",params:{'PK_TID':this.dialogData.PK_TID}})
				})
			}
		},
		components:{
			MHeader,
			Dialog,
			XButton,
			Flexbox,
			FlexboxItem
		},
		ready:function(){
			this.$on('changeAside',function(val){
				
			});
			this.getList().then(this.getClass);
		}
	}
</script>
<style>
	.discover_sidepull{
		height: 100%;
		background-color: #f0f4f3;
		
	}
	.discover_sidepull .m-control-label{
		display: inline-block;
		width: 50%;
		text-align: right;
	}
	.discover_sidepull .m-form-group{
		text-align: left;
	}
	.discover_sidepull  .aside{
		height: 100%;
		background-color: #fff;
	}
	.discover_sidepull .discover_sidepull_wrap{
		box-sizing: border-box;
		position: relative;
		padding-top: 46px;
		height: 100%;
	}
	.discover_sidepull .sidepull{
		padding: 0 0 0 2.8rem;
		list-style: none;
	}
	.discover_sidepull .sidepull .sidepull-item{
		text-align: left;
		line-height: .9rem;
		width: 100%;
		font-size: .3rem;
	}
	.discover_sidepull .m-header{
		position: fixed;
		width: 100%;
		z-index: 4;
	}
	.discover_sidepull .m-label{
		font-size: .3rem;
	}
	.discover_sidepull .m-dialog-body{
		font-size: .28rem;
		color: #666;
	}
	.discover_sidepull .m-dialog-title{
		position: relative;
		color: #666;
		font-size: 15px;
		margin-bottom: .2rem;
		font-weight: normal;
	}
	.discover_sidepull .m-dialog-body .m-form-group{
		margin-bottom: .3rem;
		font-size: .3rem;
	}
	.discover_sidepull .m-dialog-title .m-dialog-close{
		position: absolute;
		right: .42rem;
		top:.2rem;
	}
	.aside{
		list-style: none;
		height: 100%;
		border-right: 1px solid #d9d9d9;
		position: absolute;
		left: 0px;
		box-sizing: border-box;
		position: absolute;
		top: 0px;
		z-index: 3;

	}
	
	.aside.aside-default{
		color: #333;
	    font-size: .3rem;
	    line-height: .9rem;
	    width: 2.46rem;
	    background-color: #fff;
	    position: absolute;
	    text-align: center;
	    padding-top: 46px;
	    height: 100%;
	    box-sizing: border-box;

	}
	.aside .aside-item{
		border-bottom: 1px solid #d9d9d9;
		background-color: #fff;
		width: 100%;
		font-size: .3rem;
	}
	.aside .aside-item.selected{
		background-color: #f0f4f3
	}
	.aside .aside-span{
		display: inline-block;
		width: 1.9rem;
	}
	.aside .icon{
		font-size: .26rem;
		vertical-align: middle;
		color: #d9d9d9;
	}
</style>
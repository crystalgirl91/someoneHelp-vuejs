<template>
	<div class="ls-student">
	<!-- <m-header title="班级学员"></m-header> -->
	<!-- <div class="vux-1px-b"></div> -->
	<table class="mystudent-table" cellpadding="0" cellspacing="0">
		<thead>
			<th class="vux-1px-b">学生姓名</th>
			<th class="text-center vux-1px-b">排名</th>
			<th class="text-center vux-1px-b">打赏</th>
		</thead>
		<tbody>
			<tr v-for="item in data">
				<td class="vux-1px-b">{{item.UName}}</td>
				<td class="text-center vux-1px-b">{{item.Ranking}}</td>
				<td class="text-center vux-1px-b" v-on:click="OnPlayTour(item)"><i class="icon icon-dashang"></i></td>
			</tr>
		</tbody>
	</table>
	<dialog :show.sync="isshow" :hide-on-blur="true">
		<div class="m_dialog_content">
			<h3 class="m-dialog-title">
				提示
			</h3>
			<div class="m-dialog-body">
				<div class="m-form-group">
					<label class="m-control-label">当前学币：</label>
					<span>{{balance}}</span>
				</div>
				<div class="m-form-group">
					<label class="m-control-label">打赏学币：</label>
					<input type="text" v-model="Play" class="m-form-control">
				</div>
			</div>
			<flexbox :gutter="0" class="m-dialog-footer">
				<flexbox-item ><button v-on:click="PlayTour()" class="m-dialog-button">确定</button></flexbox-item>
				<flexbox-item><button class="m-dialog-button" v-on:click="isshow=false">取消</button></flexbox-item>
			</flexbox>
		</div>
	</dialog>
	</div>
	<!-- <loading :show.sync="loading" text="加载中"></loading> -->
</template>
<script>
	import Loading from "vux/src/components/loading"
	import MHeader from '../../components/header.vue'
	import XButton from 'vux/src/components/x-button';
	import Dialog from "vux/src/components/dialog";
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	
	export default {
		data(){
			return {
				isshow:false,
				PK_UID:"",
				balance:0,
				Play:0,
				loading:true,
				data:[],
				PK_TID:this.$route.params.id
			}
		},
		ready:function(){
			 this.getData(this.PK_TID);
		},
		components:{
				MHeader,
				XButton,
				Dialog,
				Flexbox,
				FlexboxItem,
				Loading
			},
		methods:{
			getData:function(pk_tid){			
				 this.$http.post('/api/Teacher/GetTeamUserList',{"PK_TID":pk_tid}).then(res => {
						this.$set('data' , res.body.Data);	
						this.$http.post('/api/Teacher/GetTeacherHome').then(tres => {
							this.$set('balance' , tres.body.Data.Learn);
						});
				});
			},
			OnPlayTour:function(item){
				this.isshow=true;
				this.PK_UID=item.PK_UID;
			}
			,
			PlayTour:function(item){
				//获取余额
				 this.$http.post('/api/Teacher/PlayTour',{"PK_UID":this.PK_UID,"Amount":this.Play}).then(res => {
						if(res.body.Data){
							alert("打赏成功");
							this.isshow=false;
						}else{
							alert(res.body.ErrMsg);
							this.isshow=false;
						}
					
				});
			}
			
		}
	}
</script>
<style>
	.mystudent-table {
		width: 100%;
		padding: 0px .3rem;
		padding-top: .2rem;
	}
	
	.mystudent-table th {
		font-size: .3rem;
		color: #333;
		text-align: left;
		font-weight: normal;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table td {
		font-size: .28rem;
		color: #666;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table .icon-dashang {
		color: #ff9100;
		font-size: .5rem;
		vertical-align: middle;
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
		line-height: .9rem;
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
<template>
	<div class="m-setting-bank">
		<m-header title="银行信息"></m-header>
		<group>
			<cell title="持卡人" :value="data.Holder" :is-link="true" v-on:click="openDialog(1)">
			</cell>
			<cell title="所属银行" :value="data.BankName" :is-link="true" v-on:click="openDialog(2)">
			</cell>
			<cell title="银行卡号" :value="data.Accounts" :is-link="true" v-on:click="openDialog(3)">
			</cell>
		</group>
		<dialog :show.sync="show1" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group  style="margin-bottom:.45rem">
						<x-input readonly title="持卡人：" :value="data.Holder"></x-input>
						<x-input title="修改为：" :value.sync="Holder" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(1)"></x-button>
				</div>
			</div>
		</dialog>
		<dialog :show.sync="show2" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group  style="margin-bottom:.45rem">
						<x-input readonly title="所属银行：" :value="data.BankName"></x-input>
						<x-input title="修改为：" :value.sync="BankName" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(2)"></x-button>
				</div>
			</div>
		</dialog>
		<dialog :show.sync="show3" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group  style="margin-bottom:.45rem">
						<x-input readonly title="银行卡号：" :value="data.Accounts"></x-input>
						<x-input title="修改为：" :value.sync="Accounts" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(3)"></x-button>
				</div>
			</div>
		</dialog>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import Loading from "vux/src/components/loading"
	import MHeader from '../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import XButton from "vux/src/components/x-button"
	import XInput from "vux/src/components/x-input"
	import Dialog from "vux/src/components/dialog"

	export default {
		data(){
			return {
				show1:false,
				show2:false,
				show3:false,
				Holder:"",
				BankName:"",
				Accounts:"",
				data:{"PK_BCID":"","PK_UID":"","BankName":"","Holder":"","Accounts":""}
			}
			
		},
		components:{
			Group,
			Cell,
			MHeader,
			XButton,
			XInput,
			Dialog,
			Loading
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				this.$http.post('/api/Teacher/GetBankCard').then(res => {
					this.$set('data' , res.body.Data);
				});
			},
			openDialog:function(type){
				this["show" + type] = true;
			},
			submit:function(type){
				this["show" + type] = false;
				if(this.BankName.length>0)
				this.data.BankName=this.BankName;
				if(this.Holder.length>0)
				this.data.Holder=this.Holder;
				if(this.Accounts.length>0)
				this.data.Accounts=this.Accounts;
				this.$http.post('/api/Teacher/UpdateBankCard',this.data).then(res => {
					if(res.body.Data){
						alert("操作成功");
					}
				});
			}
		}
	} 
</script>
<style>
	
	.m-setting-bank .weui_cell{
		padding: .24rem .4rem .24rem .32rem;
	}
	.m-setting-bank  .m-dialog-body .weui_cell{
		padding-left: 0px;

	}
	.m-setting-bank .weui_cells{
		margin-top: 0px;
	}
	.m-setting-bank .weui_cell_bd > p{
		font-size: .28rem;
		vertical-align: middle;
		color: #666;
	}
	.m-setting-bank .weui_cell:before{
		left: 0px;
	}
</style>
<template>
	<div class="m-setting-money">
		<m-header title="价格设置"></m-header>
		<group>
			<cell title="问答价格" :value.sync="data.Price0" :is-link="true" v-on:click="openDialog(0)">
			</cell>
			<cell title="通话价格" :value.sync="data.Price1" :is-link="true" v-on:click="openDialog(1)">
			</cell>
			<cell title="见面价格" :value.sync="data.Price2" :is-link="true" v-on:click="openDialog(2)">
			</cell>
			<cell title="授课价格" :value.sync="data.Price3" :is-link="true" v-on:click="openDialog(3)">
			</cell>
			<cell title="咨询价格" :value.sync="data.Price4" :is-link="true" v-on:click="openDialog(4)">
			</cell>
		</group>
		<dialog :show.sync="show" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group style="margin-bottom:.45rem">
						<x-input readonly title="原价格（学币）："  type="number" :value.sync="ShowPic" ></x-input>
						<x-input title="新价格（学币）："  type="number" :value.sync="NewPic" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit()"></x-button>
				</div>
			</div>
		</dialog>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from '../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import XButton from "vux/src/components/x-button"
	import XInput from "vux/src/components/x-input"
	import Dialog from "vux/src/components/dialog"
	import Loading from "vux/src/components/loading"
	export default {
		data(){
			return {
				show:false,
				ShowPic:'0',
				NewPic:'0',
				PType:0,
				data:{Price0: 0, Price1: 0, Price2: 0, Price3: 0, Price4: 0},
				loading:true,
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
				this.$http.post('/api/Teacher/GetPriceModel').then(res => {
					this.$set('data' , res.body.Data);
				});
			},
			openDialog:function(type){
				this.show = true;
				this.$set('PType' , type);
				this.$set('NewPic' , '0');
				switch(this.PType){
					case 0:
					this.$set('ShowPic' , String(this.data.Price0));
					break;
					case 1:
					this.$set('ShowPic' , String(this.data.Price1));
					break;
					case 2:
					this.$set('ShowPic' , String(this.data.Price2));
					break;
					case 3:
					this.$set('ShowPic' , String(this.data.Price3));
					break;
					case 4:
					this.$set('ShowPic' , String(this.data.Price4));
					break;
				}
			},
			submit:function(){
				this.$http.post('/api/Teacher/SetPrice',{"SType":this.PType,"Price":Number(this.NewPic)}).then(res => {
					if(res.body.Data){
						this.show = false;
						switch(this.PType){
							case 0:
							this.data.Price0=this.NewPic;
							break;
							case 1:
							this.data.Price1=this.NewPic;
							break;
							case 2:
							this.data.Price2=this.NewPic;
							break;
							case 3:
							this.data.Price3=this.NewPic;
							break;
							case 4:
							this.data.Price4=this.NewPic;
							break;
						}
					}
				});
			}
		}
	} 
</script>
<style>
	.m-setting-money .weui_cell {
		padding: .24rem .4rem .24rem .32rem;
	}
	
	.m-setting-money .weui_cells {
		margin-top: 0px;
	}
	
	.m-setting-money .weui_cell_bd > p {
		font-size: .28rem;
		vertical-align: middle;
		color: #666;
	}
	
	.m-setting-money .weui_cell:before {
		left: 0px;
	}
	.m-setting-money .m_dialog_content .weui_cell{
		padding-left: 0px;
	}
</style>
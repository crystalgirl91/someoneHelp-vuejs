<template>
	<m-header title="添加专家库">
		<a slot="right" v-on:click="submit()" >确定</a>
	</m-header>
	<div class="setting_experts">
		<group>
			<p class="p">是否允许学员查看专家库 ，添加其他老师？</p>
			<div class="radio-group">
				<label class="radio-inline"><input hidden value="1" v-model="isadd" type="radio" name="is"><span>是</span></label>
				<label class="radio-inline"><input hidden value="0" v-model="isadd" type="radio" name="is"><span>否</span></label>
			</div>
		</group>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from '../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import XInput from "vux/src/components/x-input"
	import Loading from "vux/src/components/loading"
	export default {
		data(){
			return {
				isadd:1
			}
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				this.$http.post('/api/Teacher/GetAttentionState').then(res => {
					if(res.body.Data){
						this.$set('isadd' , 1);
					}else{
						this.$set('isadd' , 0);
					}
				});
			},
			submit:function(){
				var Status=false;
				if(this.isadd==1){
					Status=true;
				}
				this.$http.post('/api/Teacher/SetAttentionState',{"Status":Status}).then(res => {
					if(res.body.Data){
						alert("操作成功！");
					}
				});
			}
		},
		components:{
			MHeader,
			Group,
			Cell,
			XInput,
			Loading

		}
	} 
</script>
<style>
	/*body{
		background-color: #fff;
	}*/
	.setting_experts .weui_cells {
		margin-top: 0px;
		padding: .4rem;
	}
	.setting_experts .weui_cells:after{
		border-bottom: 0px;
	}
	.setting_experts .weui_cells {
		font-size: .3rem;
		color: #333;
	}
	.setting_experts .weui_cells .p{
		margin-bottom: .52rem;
		text-align: center;
	}
	.setting_experts .weui_cells .radio-group{
		text-align: center;
	}
	.setting_experts .radio-inline{
		margin-right: 1rem;
	}
	.setting_experts .radio-inline:last-child{
		margin-right: 0px;
	}
</style>
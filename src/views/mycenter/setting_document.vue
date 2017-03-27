<template>
	<div class="setting_document">
	<m-header title="个人简介" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" >
		<a v-on:click="submit()" slot="right">确定</a>
	</m-header>
		<group>
			<x-input :value.sync="data.Present"></x-input>
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
				data:{Details:""}
			}
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				this.$http.post('/api/Teacher/GetUserInfo').then(res => {
					this.$set('data' , res.body.Data);
				});
			},
			submit:function(){
				this.$http.post('/api/Teacher/UpdateUserPresent',{"Present":this.data.Present}).then(res => {
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
	.setting_document{
		background-color: #f0f4f3;
		min-height: 100%;
	}
	.setting_document p{
		border-bottom: 1px solid #D9D9D9;
	}
	.setting_document .weui_cells{
		background-color: transparent;
	}
	.setting_document .weui_cells:before{
		border-top: 0px;
	}
	
</style>
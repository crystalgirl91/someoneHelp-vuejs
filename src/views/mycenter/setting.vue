<template>
	<div class="m-setting">
		<m-header title="设置" ></m-header>
		<group>
			<cell title="个人设置" link="/setting_personal">
			</cell>
			<cell title="个人简介" link="/setting_document">
			</cell>
			<cell title="价格设置" link="/setting_money">
			</cell>
			<cell title="银行信息" link="/setting_bank">
			</cell>
			<cell title="添加专家库" link="/setting_experts">
			</cell>
			<cell title="是否在线" v-on:click="isshow=true" :is-link="true">
			</cell>
		</group>
		<div class="tuichu">
			<x-button type="normal" v-on:click="outlogin()" text="退出"></x-button>
		</div>
		<dialog :show.sync="isshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title">
					提示
				</h3>
				<div class="m-dialog-body m-dialog-body-nogutter">
					<div class="radio-group">
						<label class="radio-inline"><input name="isline" value="1" v-model="isline" type="radio" hidden><span>是</span></label>
						<label class="radio-inline"><input name="isline" value="0" v-model="isline" type="radio" hidden><span>否</span></label>
					</div>
				</div>
				<flexbox :gutter="0" class="m-dialog-footer">
					<flexbox-item ><button class="m-dialog-button" v-on:click="submit()">确定</button></flexbox-item>
					<flexbox-item><button class="m-dialog-button" v-on:click="isshow=false">取消</button></flexbox-item>
				</flexbox>
			</div>
		</dialog>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>

</template>
<script>
	import Dialog from "vux/src/components/dialog"
	import MHeader from '../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import XButton from "vux/src/components/x-button"
	import XInput from "vux/src/components/x-input"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import Loading from "vux/src/components/loading"


	export default {
		data(){
			return {
				isshow:false,
				isline:1
			}
		},
		ready:function(){
		      this.getData();
		},
		methods:{
			getData:function(){						
				this.$http.post('/api/Teacher/GetOnLine').then(res => {
					if(res.body.Data){
						this.$set('isline' , 1);
					}else{
						this.$set('isline' , 0);
					}
				});
			},
			submit:function(){
				var Status=false;
				if(this.isline==1){
					Status=true;
				}
				this.$http.post('/api/Teacher/SetOnLine',{"Status":Status}).then(res => {
					if(res.body.Data){
						this.isshow=false;
					}
				});
			},
			outlogin:function(){
				window.localStorage.PlatformUser="";
				window.localStorage.PlatformUser=null;
				this.$router.go('/login');
			}
		},
		components:{
			Group,
			Cell,
			MHeader,
			Dialog,
			XButton,
			XInput,
			Flexbox,
			FlexboxItem,
			Loading
		}
	} 
</script>
<style>
	   .tuichu {
            font-size: .36rem;
            padding: 0.8rem .48rem;
        }
	.m-setting {
		min-height: 100%;
	}
	.m-setting .weui_cells{
		margin-top: 0px;
	}
	.m-setting .weui_cell:before{
		left: 0px;
	}
	.m-setting .m-dialog-title{
		border-bottom: 1px solid #ff9100;
		margin-left: .2rem;
		margin-right: .2rem;
		color: #ff9100;
		margin-bottom: 0px;
	}
	.m-setting .radio-inline{
		margin-right: .5rem;
		font-size: .30rem;
	}
	.m-setting .m-dialog-body .radio-group{
		line-height: 0;
	}
	.m-setting .m-dialog-body  .radio-inline{
		line-height: 1.5
	}
</style>
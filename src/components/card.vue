<template>
<div class="m-panel">
	<div class="m-panel-wrap"  v-for="item in list">
		<a v-on:click="tolink(item.PK_AEID)" class="m-panel-box">
			<div class="m-panel-card">
				<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + item.HeadPortraits + ')'}"></div>
				<div class="m-panel-flex">
					<p class="title">{{item.UName}}</p>
					<p class="time">{{item.TimeStr}}</p>
				</div>
			</div>
			<div class="m-panel-p">{{item.Content}}</div>
		</a>
		<div class="m-panel-btngroup">
			<button class="m-panel-btn" v-if="item.IsAnswer === 2">已拒绝</button>
			<button class="m-panel-btn" v-if="item.IsAnswer === 0" v-on:click="Reject(item.PK_AEID)">拒绝回答</button>
			<button class="m-panel-btn" style="border-right:0px;" v-on:click="tolink(item.PK_AEID)">回答</button>
		</div>
	</div>
	<dialog :show.sync="isshow" :hide-on-blur="true">
		<div class="m_dialog_content">
			<h3 class="m-dialog-title m-dialog-title-border">
				提示
			</h3>
			<div class="m-dialog-body m-dialog-body-nogutter">
				是否确定拒绝回答？
			</div>
			<flexbox :gutter="0" class="m-dialog-footer">
				<flexbox-item ><button class="m-dialog-button" v-on:click="RefusalAnswer()">确定</button></flexbox-item>
				<flexbox-item><button class="m-dialog-button" v-on:click="isshow=false">取消</button></flexbox-item>
			</flexbox>
		</div>
	</dialog>
</div>
</template>
<style>
	.m-panel .m-dialog-body.m-dialog-body-nogutter{
		font-size: .3rem;
	}
	.m-panel .m-dialog-title{
		font-size: .34rem;
	}
</style>
<script>
	import XButton from "vux/src/components/x-button";
	import Dialog from "vux/src/components/dialog"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	export default{
		data(){
			return {
				isshow:false,
				PK_AEID:""
			}
		},
		props:{
			list:Array
		},
		methods:{
			Reject:function(PK_AEID){
				this.isshow=true;
				this.PK_AEID=PK_AEID;
			},
			tolink:function(PK_AEID){
				this.$router.go('/answer?PK_AEID='+PK_AEID);
			},
			RefusalAnswer:function(){
				this.isshow=false
				this.$http.post('/api/Teacher/RefusalAnswer',{"PK_AEID":this.PK_AEID}).then(res => {
					if(res.body.Data){
						for (var i = 0; i < this.list.length; i++) {
							if(this.list[i].PK_AEID==this.PK_AEID){
								this.list[i].IsAnswer=2;
							}
						}
					}else{
						alert("操作失败");
					}
				})
			}
		},
		components:{
			XButton,
			Flexbox,
			FlexboxItem,
			Dialog
		}
	}
</script>
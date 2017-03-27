<template>
	<m-header title="成为专家"></m-header>
	<div class="m-expert">
		<form @submit.prevent @submit="submit()">
			<group class="m-expert-group">
				<x-input required :value.sync="data.EName" type="text" placeholder="例：张三" title="姓名："></x-input>
				<x-input required :value.sync="data.ExpertType" type="text" placeholder="例：培训师、咨询师、网络大V等" title="专家类型："></x-input>
				<x-input required :value.sync="data.FieldTraining" type="text" placeholder="例：互联网、金融、管理等" title="擅长领域："></x-input>
				<x-input required :value.sync="data.Account" type="text" placeholder="例：微信、微博账号" title="社交媒体账号："></x-input>
				<x-input required :value.sync="data.EPhone" type="text" placeholder="例：12345678911" title="联系电话："></x-input>
				<x-input required :value.sync="data.Email" type="text" placeholder="例：5643215@163.com" title="邮箱："></x-input>
				<x-textarea  required placeholder="主要成就：" :value.sync="data.Achievement"></x-textarea>
				<div class="button-wrap"><x-button type="normal">提交审核</x-button></div>
			</group>
		</form>
	</div>
</template>
<style>
	.m-expert-group{
		font-size: .3rem;
	}
	.m-expert-group .weui_cells {
		font-size: .3rem;
	}
	.m-expert-group .vux-no-group-title{
		margin-top: 0px;
	}
	.m-expert-group .button-wrap{
		padding: 1.4rem 1rem;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	import XButton from "vux/src/components/x-button"
	import XInput from "vux/src/components/x-input"
	import XTextarea from "vux/src/components/x-textarea"
	import Group from "vux/src/components/group"
	export default {
		components:{
			MHeader,
			XInput,
			XTextarea,
			Group,
			XButton
		},
		data(){
			return {
				data:{
				 "EName":"",
				 "ExpertType":"",
				 "FieldTraining":"",
				 "Account":"",
				 "EPhone":"",
				 "Email":"",
				 "Achievement":"" 
				}
			}
		},
		methods:{
			submit:function(){
				return this.$http.post("/API/Student/SetExpertEntry",this.data).then(res => {
					Object.keys(this.data).forEach(key => {
						this.data[key] = "";
					});
					alert("申请成功！")
				})
			}
		}

	}
</script>
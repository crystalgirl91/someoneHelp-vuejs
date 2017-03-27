<template>
	<div class="l_regist_person">
		<m-header title="公司学习"></m-header>
		<group class="l_regist_company">
			<x-input title="公司名称：" :value.sync="data.CEName" type="text"></x-input>
			<x-input title="联系人：" :value.sync="data.LinkManName" type="text"></x-input>
			<x-input title="联系电话：" :value.sync="data.LinkPhone"  type="text"></x-input>
			<x-input title="介绍人：" :value.sync="data.Sponsor" placeholder="谁告诉您了解我们的" type="text"></x-input>
		</group>
		<div class="btn-go"><x-button  @click="submit()" type="normal">提交申请</x-button></div>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	import Group from "vux/src/components/group"
	import XInput from "vux/src/components/x-input"
	import XButton from "vux/src/components/x-button"
	export default {
		data(){
			return {
				data:{
					CEName:"",
					LinkManName:"",
					LinkPhone:"",
					Sponsor:""
				}
			}
		},
		methods:{
			submit:function(){
				this.$http.post("/API/NoPermissions/CompanyRegistered",this.data).then(res => {
					window.location.PlatformUser = res.body.Data;
					alert("注册成功！");
				})
			}
		},
		components:{
			MHeader,
			XInput,
			Group,
			XButton
		}
	}
</script>
<style>
	.l_regist_company{
		margin-bottom: 3.9rem;
	}
</style>
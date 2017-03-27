<template>
	<div class="l_regist_person">
		<m-header title="个人学习"></m-header>
		<group>
			<x-input title="用户名：" type="text" :value.sync="data.LoginName"></x-input>
			<x-input title="密码：" type="text" :value.sync="data.LoginPwd"></x-input>
			<x-input title="姓名：" type="text" :value.sync="data.UName"></x-input>
			<x-input title="电话：" type="text" :value.sync="data.Telephone"></x-input>
			<x-input title="邮箱：" type="text" :value.sync="data.Email"></x-input>
			<x-input title="企业ID：" type="text" :value.sync="data.PCode"></x-input>
		</group>
		<div class="classify">
			<h3 class="class-title" v-on:click="isshow=true">兴趣分类 > </h3>
			<ul class="class-list clearfix">
				<li class="class-item" v-for="item in collects">{{item.PFName}}</li>
			</ul>
		</div>
		<div class="btn-go"><x-button type="normal" @click="submit()">进入平台</x-button></div>
	</div>
	<div class="all-classify" v-show="isshow">
		<h3 class="title">全部分类 <i class="icon icon-close2 close" v-on:click="isshow=false"></i></h3>
		<dl class="class-list">
			<dd class="class-item" v-for="item in rows"> 
				<dl class="class-sub-list">
					<dt class="class-sub-title">{{item.PFName}}</dt>
					<dd class="class-sub-item clearfix">
						<label class="radio-square" v-for="subitem in item.Children"><input type="checkbox" v-model="subitem._checked" name="type"><span>{{subitem.PFName}}</span></label>
					</dd>
				</dl>
			</dd>
		</dl>
		<div class="text-center"><button class="classify-btn" @click="setClass()">确定</button></div>
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
				isshow:false,
				rows:[],
				data:{
					"PCode":"",
					"LoginName":"",
					"LoginPwd":"",
					"UName":"",
					"Telephone":"",
					"Email":"",
					"PK_PFID":[]
				},
				collects:[]
			}
		},
		ready:function(){
			this.getClass();
		},
		methods:{
			setClass:function(){
				var childs = [];
				this.rows.forEach(row => {
					childs = childs.concat(row.Children);
				});
				this.isshow = false;
				this.collects = childs.filter(child => {return child._checked});
			},
			submit:function(){
				this.data.PK_PFID = this.collects.map(col => {return col.PK_PFID});
				this.$http.post("/API/NoPermissions/RegisteredEmployee",this.data).then(res => {
				 	window.localStorage.PlatformUser=res.body.Data;
					this.$router.go("/");
				})
			},
			getClass:function(){
				this.$http.post("/API/NoPermissions/GetProfessionalField").then(res => {
					this.rows = res.body.Data.map(d => {
						d._checked = false;
						return d;
					});
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
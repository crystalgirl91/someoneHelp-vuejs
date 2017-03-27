<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="约咨询"></m-header>
	<div class="add_expert_meet ls-student ">
		<section class="card-list clearfix">
			<div class="card-vertical" :class="{'checked':idx === $index}" v-on:click="idx = $index" v-for="item in rows">
				<div class="card-pic"><img :src="item.HeadPortraits"></div>
				<div class="card-word">
					<p class="name">{{item.UName}}</p>
				</div>
			</div>
		</section>
		<section class="form">
			<p><label class="label">价<span class="spacing-5"></span>格：{{data.Price}}</label></p>
			<p><label class="label">见面时长：{{data.TimeLength}}</label></p>
			<span class="btn" v-on:click="isshow=true">预约</span>
		</section>
		<h4 class="table-title">会员级别声明</h4>
		<table class="s_table" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th class="td">会员等级</th>
					<th class="td">会员权限</th>
					<th class="td">所需金额</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="td"><i class="icon icon-medal font-active"></i>v1会员</td>
					<td class="td">提问专家</td>
					<td class="td">充值超过1学币</td>
				</tr>
				<tr>
					<td class="td"><i class="icon icon-medal font-active"></i>v2会员</td>
					<td class="td">约通话</td>
					<td class="td">累计充值超过100学币</td>
				</tr>
				<tr>
					<td class="td"><i class="icon icon-medal font-active"></i>v3会员</td>
					<td class="td">约见面</td>
					<td class="td">累计充值超过500学币</td>
				</tr>
				<tr>
					<td class="td"><i class="icon icon-medal font-active"></i>v4会员</td>
					<td class="td">约授课</td>
					<td class="td">累计充值超过2000学币</td>
				</tr>
				<tr>
					<td class="td"><i class="icon icon-medal font-active"></i>v5会员</td>
					<td class="td">约咨询</td>
					<td class="td">累计充值超过10000学币</td>
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
						<span>{{lastFee}}</span>
					</div>
					<div class="m-form-group">
						<label class="m-control-label">所需学币：</label>
						<span>{{data.Price}}</span>
					</div>
				</div>
				<flexbox :gutter="0" class="m-dialog-footer">
					<flexbox-item ><button class="m-dialog-button" v-on:click="goRecharge()">充值</button></flexbox-item>
					<flexbox-item><button class="m-dialog-button" v-on:click="submit()">提交</button></flexbox-item>
				</flexbox>
			</div>
		</dialog>
		<dialog :show.sync="isshow2" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title m-dialog-title-border">
					提示
				</h3>
				<div class="m-dialog-body m-dialog-body-nogutter">
					<p class="padding-p">预约成功，请等待{{rows[idx].UName}}专家的电话回复！</p>
				</div>
			</div>
		</dialog>
	</div>
</template>
<script>
	import MHeader from '../../../components/header.vue'
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import Dialog from "vux/src/components/dialog";

	export default{
		data(){
			return {
				isshow:false,
				isshow2:false,
				rows:[],
				idx:0,
				id:"",
				data:{},
				lastFee:""
			}
		},
		ready:function(){
			this.getList().then(() => {
				return this.getData(this.rows[this.idx].PK_UID);
			}).then(this.getFreeFee);
			this.$watch('idx', function(newdata){
				this.getData(this.rows[this.idx].PK_UID);
			});
		},
		methods:{
			goRecharge:function(){
				this.isshow = false;
				this.$router.go("/discorver_recharge");
			},
			submit:function(){
				this.$http.post("/API/Student/SetSubscribe",{
					"PK_UID":this.rows[this.idx].PK_UID,
					"SType":3
				}).then(res =>{
					this.isshow2 = true;
					this.isshow = false;
				})
			},
			getData: function(_id){
				return this.$http.post("/API/Student/GetSubscribe",{
					"PK_UID":_id,
					"SType":3
				}).then(res => {
					this.data = res.body.Data;
				})
			},
			getList:function(){
				return this.$http.post("/API/Student/GetMyTeacher",{
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			},
			getFreeFee:function(){
				this.$http.post("/API/Student/GetBalance").then(res => {
					this.lastFee = res.body.Data;
				})
			}
		},
		components:{
			MHeader,
			Flexbox,
			FlexboxItem,
			Dialog
		}
	}
</script>

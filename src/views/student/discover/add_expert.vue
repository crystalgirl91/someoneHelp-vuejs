<template>
	<div class="discover s_add_expert">
		<m-header title="添加专家" :bg-style="{'borderBottom':'1px solid #d9d9d9'}">
			<span slot="right">
				<i v-link="{'path':'/search'}" class="s_add_btn icon icon-search2"></i>
			</span>
		</m-header>
		<div class="tab-wrap">
			<tab active-color="#ff9100">
				<tab-item  @click="getList()">全部</tab-item>
				<tab-item v-for="tab in collects"  @click="clickTab(tab,$index)">{{tab.PFName}}</tab-item>
			</tab>
			<i class="s_add_btn s_add_btn-abs icon icon-add-professor" v-on:click="isshow=true"></i>
		</div>
		<ul class="s-cardlist">
			<li class="s-card" v-for="item in rows">
				<a class="s-card-fav clearfix">
					<div class="fav border-light"><img :src="item.HeadPortraits"></div>
					<div class="message">
						<h3 class="name">{{item.UName}} <span :style="{'background-image':'url('+ item.LevelImage+')'}" class="level-icon"></span></h3>
						<p class="tags"><span  v-for="d in item.Domains"class="tag border-light">{{d}}</span></p>
						<p class="word font-base">{{item.Present}}</p>
						<span v-show="!item.IsAttention" class="status color-green" @click="addFollow(item)">添加</span>
						<span v-show="item.IsAttention" class="status color-green">已添加</span>
					</div>
				</a>
			</li>
		</ul>
		<div class="all-classify" v-show="isshow">
			<h3 class="title">全部分类 <i class="icon icon-close2 close" v-on:click="isshow=false"></i></h3>
			<dl class="class-list">
				<dd class="class-item" v-for="item in collects"> 
					<dl class="class-sub-list">
						<dt class="class-sub-title">{{item.PFName}}</dt>
						<dd class="class-sub-item clearfix">
							<label class="radio-square" v-for="subitem in item.Children"><input type="checkbox" v-model="subitem._checked" name="type"><span>{{subitem.PFName}}</span></label>
						</dd>
					</dl>
				</dd>
			</dl>
			<div class="text-center"><button class="classify-btn" @click="filter()">确定</button></div>
		</div>
	</div>
</template>
<script>
	import MHeader from "../../../components/header.vue"
	import {Tab,TabItem} from "vux/src/components/tab"
	import Badge from "vux/src/components/badge"
	import Question from "./question.vue"
	export default {
		data(){
			return {
				istool:false,
				block:2,
				isshow:false,
				rows:[],
				collects:[],
				secMenus:[]
			}
		},
		components:{
			MHeader,
			Tab,
			TabItem,
			Badge,
			Question
		},
		ready:function(){
			this.getList().then(this.getCollects);
		},
		methods:{
			getCollects:function(){
				return this.$http.post("/API/Student/GetProfessionalField").then(res => {
					this.collects = res.body.Data;
					this.secMenus = [];
					this.collects.forEach(it => {
						if(it.Children.length){
							this.$set("secMenus", this.secMenus.concat(it.Children))
						}
					});
					this.secMenus.map(it => {
						it._checked = false;
						return it;
					})
				})
			},
			clickTab:function(param,i){
				var ids = param.Children.map(c => c.PK_PFID);
				this.getList({
					PK_PFIDS:ids,
					Search:""
				});
			},
			getList:function(params){
				var postData = { 
					"PageIndex":1, 
					"PageSize":100, 
					"PK_PFIDS":params ? (params.PK_PFIDS || []) : [], 
					"Search":params ? (params.Search || "") : ""
				};
				return this.$http.post("/API/Student/SearchTeacher",postData).then(res => {
					this.rows = res.body.Data;
				})
			},
			addFollow: function(param){
				this.$http.post("/API/Student/SetAttentionTeacher",{"PK_UID":param.PK_UID}).then(res => {
					param.IsAttention = true;
				})
			},
			filter:function(){
				var ids = this.secMenus.filter(it => { return it._checked }).map(it => {
					return it.PK_PFID;
				});
				this.isshow = false;
				this.getList({PK_PFIDS:ids});
			}
		}
	}
</script>
<!-- 与 discover/discover.vue 公用样式 -->
<style>
	.s_add_expert {
		background-color: #fff;
	}
	.s_add_expert .tab-wrap{
		position: relative;
	}
	.s_add_expert .s_add_btn{
		color: #ff9100;
		font-size: .5rem;
		padding-left: .2rem;
	}
	.s_add_expert .vux-tab{
		margin-right: .6rem;

	}
	.s_add_expert .s-card{
		border-top: 1px solid #dfdfdf;
		padding: .2rem 0rem 0 0rem;
		margin-right: .3rem;
		margin-left: .3rem;
	}
	.s_add_expert .s-card:first-child{
		border-top: 0px;
	}
	.s_add_expert .vux-tab .vux-tab-item{
		font-size: .28rem;
	}
	.s_add_expert .s_add_btn.s_add_btn-abs{
		position: absolute;
		top: 0px;
		right: .2rem;
		font-size: .32rem;
	    box-sizing: border-box;
	    background: -webkit-linear-gradient(top, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
	    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
	    background-size: 100%;
	    line-height: 44px;
	    background-size: 100% 1px;
	    border: 0px;
	}

	.all-classify{
		position: fixed;
		width: 100%;
		min-height: 100%;
		z-index: 200;
		top: 0px;
		left: 0px;
		background-color: #fff;
		color: #666;
	}
	.all-classify .title{
		border-bottom: 1px solid #dfdfdf;
		font-size: .34rem;
		color: #333;
		line-height: 1rem;
		position: relative;
		font-weight: normal;
		text-align: center;
	}
	.all-classify .title>.close{
		position: absolute;
		right: .3rem;
		top:.3rem;
		font-size:.38rem;
		color: #c7c7c7; 
	}
	.all-classify .class-list{
		padding-left: .3rem;
		margin-bottom: .6rem;
	}
	.all-classify .class-sub-item{
		padding-left: .9rem;
	}
	.all-classify .class-list .radio-square{
		float: left;
		margin-right: .6rem;
		margin-bottom: .1rem;
	}
	.all-classify  .class-sub-title{
		font-size: .28rem;
		line-height: .46rem;
		padding-top: .18rem;
		padding-bottom: .18rem;
	}
	.all-classify  .classify-btn{
		background: #ff9100;
		width: 1rem;
		height: .6rem;
		line-height: .6rem;
		font-size: .3rem;
		color: #fff;
		border:0px;
	}
</style>


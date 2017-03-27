	<template>
		<div class="expert_share">
			<section v-show="isshowactivity" v-link="{name:'plat_activity_detail',params:{'PK_AID':activity.PK_AID}}" class="expert_share-item expert_share_active">
				<h4 class="title"><i class="icon icon-sign font-active"></i>活动资讯<a class="more" v-link="{'name':'discover_activity',params:{id:id}}">更多</a></h4>
				<dl class="label-list-with-icon">
					<dt class="label-title">{{activity.Title}}</dt>
					<dd class="label-list-item"><i class="icon icon-time2 color-blue"></i><label class='label-list-label'>时间：</label>{{activity.TimeStr}}</dd>
					<dd class="label-list-item"><i class="icon icon-place2 color-red"></i><label class='label-list-label'>地址：</label>{{activity.Place}}</dd>
					<dd class="label-list-item"><i class="icon icon-cost2 color-green"></i><label class='label-list-label'>费用：</label>{{activity.Free}}元</dd>
					<dd class="label-list-item"><i class="icon icon-Num-of-participants color-green"></i><label class='label-list-label'>已报名人数：</label>{{activity.Number}}人</dd>
				</dl>
			</section>
			<div class="bg-bar-gray"></div>
			<section class="expert_share-item expert_share_course">
				<h4 class="title"><i class="icon icon-sign font-active"></i>微课</h4>
				<div class="expert_share-item_wrap"  v-link="{name:'discover_course',params: {id:item.PK_MID }}" v-for="item in courses">
					<p class="word">{{item.MTextContent}}</p>
					<div class="toolbar clearfix">
						<span class="left" >
							<!-- <i class="icon icon-voice color-red"></i><i class="icon icon-picture2 color-green" ></i><i class="icon icon-voice color-purple"></i> -->
							</span>
						<span class="right">
							<i class="icon icon-comments font-base" style="color:#56abe4;"> {{item.ReplyCount}}</i>
							<i class="icon icon-zan color-red"> {{item.PraiseCount}}</i> {{item.TimeStr}}
						</span>
					</div>
				</div>
			</section>
		</div>
	</template>
	<script>
		// import MHeader from '../../../components/header.vue';
		// import Badge from "vux/src/components/badge";
		// import Dialog from "vux/src/components/dialog";
		// import { Tab,TabItem } from 'vux/src/components/tab';
		import MButton from '../../../components/button.vue';
		export default {
			data(){
				return {
					isshowactivity:false,
					courses:[],
					id:this.$route.params.id,
					activity:{}
				}
			},
			components:{
				MButton,
			},
			ready:function(){
				this.getActivity().then(() =>{
					this.getCourse();
				});
			},
			methods:{
				openDialog:function(e,item){
					e.preventDefault();
					if(item.type == 1){
						this.isshow = true;
					}
					if(item.type == 2){
						this.$route.router.go("tuiguang_recharge");
					}
				},
				getActivity:function(){
					return this.$http.post("/API/Student/GetNewActivity",{"PK_UID":this.id}).then(res =>{
						if(res.body.Data!=null&&res.body.Data!="null"){
							this.activity = res.body.Data;
							this.isshowactivity=true;
						}
					});
				},
				getCourse:function(){
					return this.$http.post("/API/Student/GetMicrolectureList",{
						"PK_UID":this.id,
						 "PageIndex":1,
						 "PageSize":100
					}).then(res =>{
						this.courses = res.body.Data;
					});
				}
			}
		}
	</script>
	<style>
	/*.expert_share{
		padding-top: .1rem;
	}*/
	.expert_share .expert_share-item{
		padding: 0 .28rem;
		background-color: #fff;
		margin-bottom: .1rem;
		padding-bottom: .2rem;
	}
	.expert_share .expert_share-item:last-child{
		margin-bottom: 0px;
		border-bottom: 0px;
	}
	.expert_share .expert_share-item .expert_share-item_wrap{
		padding-left: .48rem;
		border-bottom: 1px solid #dfdfdf;
		padding-bottom: .1rem;
	}
	.expert_share .expert_share-item .expert_share-item_wrap .word{
		max-height: 1rem;
		overflow: hidden;
		font-size: 0.3rem;
    	line-height: 0.5rem;
	}
	.expert_share .title{
		font-size: .28rem;
		line-height: .48rem;
		position: relative;
		font-weight: normal;
		padding-top: .1rem;
	}
	.expert_share .title>.icon{
		margin-right: .18rem;
		vertical-align: middle;
	}
	.expert_share .title .more{
		position: absolute;
		right: .1rem;
	}
	.expert_share .label-title{
		font-size: .28rem;
		color: #333;
		line-height: .6rem;
		text-align: center;
		font-weight: bold;
	}
	.label-list-with-icon .label-list-item{
		padding-left: .42rem;
		line-height: .5rem;
	}
	.label-list-with-icon .label-list-item .icon{
		font-size: .32rem;
		margin-right: .1rem;
		vertical-align: middle;
	}
	.label-list-with-icon .label-list-item  .label-list-label{
		margin-right: .1rem;
	}
	.expert_share_course .word{
		line-height: .42rem;
		font-size: .24rem;
		margin: .2rem 0;
	}
	.expert_share_course .toolbar .left{
		float: left;
	}
	.expert_share_course .toolbar .icon{
		margin-right: .1rem;
		font-size: .32rem;
		font-style: normal;
		line-height: .4rem;
		height: .4rem;
		display: inline-block;
	}
	.expert_share_course .toolbar .icon:before{
		/*vertical-align: middle;*/
		font-size: .26rem;
	}
	.expert_share_course .toolbar .right{
		float: right;
	}

	</style>


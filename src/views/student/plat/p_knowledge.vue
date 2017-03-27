<template>
	<div class="plat_home plat_knowledge">
		<div class="question-tab vux-1px-b">
			<span class="toolbtn menu-btn" v-on:click="goBack()"><i class="icon icon-back2"></i></span>
			<span class="title" v-on:click="isup = !isup">分类<i class="icon btn-arrow icon-pull-down" :class="{'isup':isup}"></i></span>
		</div>
		<section class="p_nav" v-show="isup">
			<table class="table-layout" cellspacing="0" cellspacing="0" border="0">
				<tbody>
					<tr >
						<td class="p_nav_menu">
							<ul>
								<li class="p_nav_item" v-for="type in types" v-on:click="changeType($index,type.Children)" :class="{'selected':$index === curidx}">{{type.KName}}</li>
							</ul>
						</td>
						<td class="p_nav_cont">
							<ul class="clearfix">
								<li class="p_nav_cont-item" :class="{'checked': item.PK_KCID === typeid}" v-on:click="checkOne(item)" v-for="item in conts">{{item.KName}}</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="card-list clearfix">
			<div class="card-news" v-link="{name:'plat_course_detail',params:{PK_CID:item.PK_CID}}" v-for="item in rows">
				<div class="card-pic"><img :src="item.CoverImage"></div>
				<div class="card-body">
					<h4 class="card-title">{{item.CName}}</h4>
					<p class="card-desc">{{item.Introduction}}</p>
					<div class="card-tool clearfix">
						<span class="card-tool-right">
							<span class="t color-blue"><i class="icon icon-comments "></i>{{item.ReplyCount}}</span>
							<span class="t color-red"><i class="icon icon-score-empty"></i>{{item.Score}}</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import Badge from "vux/src/components/badge"
	import MHeader from "../../../components/header.vue"
	export default {
		data(){
			return {
				isup:false,
				curidx:0,
				typeid:null,
				types:[],
				conts:[],
				rows:[]
			}
		},
		ready:function(){
			var _this = this;
			this.getData().then(function(){
				_this.changeType(0,_this.types[0].Children)
			});
			this.getList();
		},
		methods:{
			goBack:function(){
				history.back();
			},
			changeType: function(i,c){
				this.conts = c;
				this.curidx = i;
			},
			getData:function(){
				return this.$http.post("/API/Student/GetKnowledgeCategory").then(res => {
					this.types = res.body.Data;
				})
			},
			getList: function(id){
				var postData = {
					"GetType":0,
					"PK_KCID":id || "",
					"PageIndex":1,
					"PageSize":100
				}
				this.$http.post("/API/Student/GetKnowledge",postData).then(res => {
					this.rows = res.body.Data;
				})
			},
			checkOne:function(item){
				if(this.typeid && this.typeid === item.PK_KCID){
					this.getList();
					this.typeid = null;
				}else{
					this.getList(item.PK_KCID);
					this.typeid = item.PK_KCID;
				}
			}
		},
		components:{
			MHeader,
			Badge
		}
	}
</script>
<style>
	.p_nav .table-layout{
		width: 100%;
		background-color: #fff;
	}
	.p_nav .table-layout .p_nav_menu{
		background-color: #eaeeed;
		width: 2.2rem;
		overflow: hidden;
	}
	.p_nav .table-layout  .p_nav_item{
		width: 2.2rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		font-size: .28rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.p_nav .table-layout  .p_nav_item.selected{
		background-color: #fff;
	}
	.p_nav .p_nav_cont .p_nav_cont-item{
		width: 100%;
		float: left;
		text-align: left;
		padding: 5px;
		box-sizing: border-box;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	.p_nav .p_nav_cont .p_nav_cont-item.checked{
		color: #ff9100;
	}
	.p_nav .p_nav_cont{
		vertical-align: top;
	}
	.plat_knowledge .title{
		width: 50%;
		margin:0 auto;
		text-align: center;
		font-size: .36rem;
		color: #333;
		display: block;
		position: relative;
		line-height: 30px;
	}
	.plat_knowledge .title .btn-arrow{
		color: #ff9100;
		position: absolute;
		width: .4rem;
		height: .4rem;
		left: 50%;
		margin-left: -.2rem;
		bottom: -.3rem;
		font-size: .18rem;
	}
	.plat_knowledge .p_nav{
		border-bottom: 1px solid #ebebeb;
		padding-bottom: .1rem;
		background-color: #fff;
	}
	.plat_knowledge .title .btn-arrow.isup{
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		bottom: -.15rem;
	}
	.plat_home .banner{
		height: 2.5rem;
		width: 100%;
		background-color:#dfdfdf;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center;
		margin-bottom: .1rem;
		background-image: none;
	}
	.plat_home .menu{
		margin-bottom: .1rem;
	}
	.plat_home .menu .menu-list{
		text-align: center;
		background-color: #fff;
	}
	.plat_home .menu .menu-item{
		width: 25%;
		float: left;
		padding: .3rem  0 .2rem 0; 
		box-sizing: border-box;
	}
	.plat_home .menu-item .icon{
		font-size: .6rem;
		margin-bottom: .12rem;
	}
	.plat_home .menu-item .menu-title{
		font-size: .24rem;
		color: #666;
	}
	.plat_home .card-list{
		background-color: #fff;
		padding: 0rem .3rem 0rem .3rem;
		border-bottom: 1px solid #ebebeb;
	}

	.plat_home  .card-news:last-child{
		border-bottom: 0px;
	}
	.plat_home .card-news{
		display: flex;
		padding: .2rem 0;
		align-items: stretch;
	}
	.plat_home .card-news .card-pic>img{
		height: 100%;

	}
	.plat_home .card-news .card-pic{
		flex: none;
		float: none;
		height: 1.6rem;
		overflow: hidden;
	}
	.plat_home .card-news .card-body{
		padding-left: .2rem;
		width: 100%;
	}
	.plat_home .card-vertical{
		padding: 0 .27rem;
		float: left;
		width: 33.3%;
		box-sizing: border-box;
	}
	.plat_home  .card-news .card-tool .card-tool-right .icon{
		vertical-align: middle;
	}

	.plat_home  .card-list .pull-right{
		float: right;
		margin-left: .2rem;
	}
	.plat_home  .card-list .pull-right .icon{
		vertical-align: middle;
	}
	.plat_home .question-tab .toolbtn{
		color: #ff9100;
		position: absolute;
		top: .25rem;
		display: block;
	}
	.plat_home .question-tab .toolbtn .icon.icon-back2{
		font-size: 20px;
	}
	.plat_home .question-tab .toolbtn .icon:before{
		vertical-align: middle;
	}
</style>
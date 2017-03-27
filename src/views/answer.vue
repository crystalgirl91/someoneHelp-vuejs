<template>
	<div class="ls-answer">
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="问答详情"></m-header>
	<div class="m-panel">
		<div class="m-panel-wrap vux-1px-r vux-1px-t vux-1px-l vux-1px-b">
			<a class="m-panel-box">
				<div class="m-panel-card">
					<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + data.HeadPortraits + ')'}"></div>
					<div class="m-panel-flex">
						<p class="title">{{data.UName}}</p>
						<p class="time">{{data.TimeStr}}</p>
					</div>
				</div>
				<div class="m-panel-p">{{data.Content}}</div>
			</a>
		</div>
	</div>
	<card-pic :list="list"></card-pic>
	<div class="m-panel">
		<p class="m-btn-wrap text-center" v-if="this.data.IsAnswer==3||this.data.IsAnswer==2"><button class="weui_btn weui_btn_mini weui_btn_normal weui_btn_plain_normal">回答已终止</button></p>
		<p class="m-btn-wrap text-center" v-if="this.data.IsAnswer==0||this.data.IsAnswer==1"><button v-on:click="isshow=true" class="weui_btn weui_btn_mini weui_btn_normal weui_btn_plain_normal">终止回答</button></p>
		<p class="m-btn-wrap" v-if="this.data.IsAnswer==0||this.data.IsAnswer==1"><button v-on:click="this.$router.go('/replyanswer?PK_AEID='+this.data.PK_AEID)" class="weui_btn weui_btn_normal">回复</button></p>
	</div>
	<dialog :show.sync="isshow" :hide-on-blur="true">
		<div class="m_dialog_content">
			<h3 class="m-dialog-title m-dialog-title-border">
				请勾选
			</h3>
			<div class="m-dialog-body m-dialog-body-nogutter">
				<div class="radio-group text-left">
					<label class="radio-inline"><input name="isline" value="0" checked type="radio" hidden><span>收费查看</span></label>
				</div>
				<div class="radio group text-left">
					<label class="radio-inline"><input name="isline" value="2" type="radio" hidden><span>限时免费<input class="radio-input" v-model="day" type="text">天</span></label>
				</div>
				<div class="radio group text-left">
					<label class="radio-inline"><input name="isline" value="1" type="radio" hidden><span>限次免费<input class="radio-input" v-model="dasMal" type="text">次</span></label>
				</div>
			</div>
			<flexbox :gutter="0" class="m-dialog-footer">
				<flexbox-item ><button class="m-dialog-button" v-on:click="stopAsk(data.PK_AEID)">确定</button></flexbox-item>
				<flexbox-item><button class="m-dialog-button" v-on:click="isshow=false">取消</button></flexbox-item>
			</flexbox>
		</div>
	</dialog>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
  import Tab from 'vux/src/components/tab/tab'
  import Dialog from 'vux/src/components/dialog'
  import TabItem from 'vux/src/components/tab/tab-item'
  import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
  import CardNobtn from '../components/card_nobtn'
  import CardPic from '../components/card_pic'
  import MHeader from '../components/header.vue'
  import Loading from "vux/src/components/loading"
  export default {
  data(){
  return {
  loading:true,
  isshow:false,
  dasMal:0,
  day:0,
  uuid:null,
  PK_AEID:"",
  data:{
  HeadPortraits:"",
  UName:"",
  TimeStr:"",
  Content:"",
  IsAnswer:0
  },
  list:[]
  }
  },
  ready:function(){
  this.getData(this.$route.query.PK_AEID);

  },
  methods:{
  getData: function(PK_AEID){
  this.$http.post('/api/Teacher/GetAskTheExpertsInfo',{"PK_AEID":PK_AEID}).then(res => {
  this.$set('data' , res.body.Data);
  this.getAnswerList(this.$route.query.PK_AEID);
  });
  }
  ,
  getAnswerList:function(PK_AEID){
  //专家的回答信息
  this.$http.post('/api/Teacher/GetAnswerList',{"PK_AEID":PK_AEID}).then(res => {
  this.$set('list' , res.body.Data);
  });
  },
  stopAsk:function(PK_AEID){
  	this.PK_AEID=PK_AEID;
  	this.isshow=false;
  	var SType=0;
  	//天数
 	var SelDayCount=0;
 	 //次数
 	var SelNumber=0;
	var radios=document.getElementsByName("isline");
    for(var i=0;i<radios.length;i++)
    {
        if(radios[i].checked==true)
        {
			switch(radios[i].value){
				case "0":
					SType=0;
				break;
				case "1":
				    SType=1;
					//限次数
					SelNumber=this.dasMal;
				break;
				case "2":
					//限天数
					SType=2;
					SelDayCount=this.day;
				break;
			}
        }
    }
  var PK_AEID=PK_AEID;
  this.$http.post('/api/Teacher/TerminationAskTheExperts',{"PK_AEID":this.PK_AEID,"SelDayCount":SelDayCount,"SelNumber":SelNumber,"SType":SType}).then(res => {
  if(res.body.Data){
  //alert("操作成功！");
  this.getData(PK_AEID);
  }
  });
  }
  },
  components:{
  Tab,
  TabItem,
  CardNobtn,
  CardPic,
  MHeader,
  Flexbox,
  FlexboxItem,
  Dialog,
  Loading
  }
  }
</script>
<style>
	.ls-answer{
		min-height: 100%;
		background-color: #f0f4f3;
		padding-bottom: .4rem;
	}
	.question-tab {
		background-color: #fff;
		padding: .2rem 0px;
	}
	
	.question-tab .vux-tab {
		width: 3.3rem;
		margin: 0 auto;
		border-radius: 3px;
		overflow: hidden;
		border: 2px solid #ff9100;
		height: auto;
	}
	
	.question-tab .vux-tab .vux-tab-item {
		font-size: .34rem;
		height: .52rem;
		background: 0, 0;
		line-height: inherit;
	}
	
	.question-tab .vux-tab .vux-tab-item.vux-tab-selected {
		background-color: #ff9100;
		color: #fff;
		border-bottom: 0px;
	}
	
	.question-tab .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {
		background-color: #ff9100;
		color: #fff;
	}
	
	.question-list {
		margin: .12rem;
	}
	
	.question-list .weui_panel {
		background-color: transparent;
	}
	
	.question-list .weui_media_box.weui_media_appmsg .weui_media_hd {
		border-radius: 50%;
		overflow: hidden;
		margin-right: .14rem;
	}
	
	.question-list .weui_media_box {
		margin-bottom: .12rem;
		background-color: #fff;
	}
	.ls-answer .m-dialog-body{
		padding: .25rem 0 .25rem .8rem;
	}
	.ls-answer .radio-inline {
		display:block;
	}
	.ls-answer .radio-inline .radio-input{
		font-size: .3rem;
		line-height: .3rem;width: .8rem;
		border-bottom:1px solid #dfdfdf;
		margin:0 .04rem;
		outline: 0px;
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		border-radius: 0px;
	}
	.ls-answer .m-dialog-title.m-dialog-title-border{
		font-size: .34rem;
	}
</style>
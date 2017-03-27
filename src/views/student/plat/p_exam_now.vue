<template>
	<div class="p_exam_now">
		<m-header :title="data.EName" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" >
			<a slot="right" v-on:click="submit()">
				<span :style="{color:'#ff9100'}">提交</span>
			</a>
		</m-header>
		<ul class="p_exam-list">
			<li class="p_exam_paper" v-for="item in data.TopicList" v-show="item.isshow">
				<p class="p_exam_p">{{ item.TName }} ：（
					<span class="letter font-active" >{{item.Answer}}</span>
				）</p>
				<ul class="choose-list" v-show="item.TType ===0">
					<label class="choose-item" v-on:click="checkOne($index,item,Option)" :class="'choose-item-' + $index" v-for="Option in item.TOption">
						<span class="letter-icon"></span>
						<span>{{ Option.Content }}</span>
					</label>
				</ul>
				<ul class="choose-list" v-show="item.TType ===1">
					<label class="choose-item" v-on:click="checkOne($index,item,Option)" :class="'choose-item-' + $index" v-for="Option in item.TOption">
						<span class="letter-icon"></span>
						<span>{{ Option.Content }}</span>
					</label>
				</ul>
				<ul class="choose-list" v-show="item.TType ===2">
					<input type="text" class="text-input" v-model="item.Answer">
				</ul>
			</li>
		</ul>
		<div class="footer">
			<p class="page"> {{page}}/ {{data.TopicList.length}}</p>
			<div class="toolbar">
				<span class="left next-btn" v-on:click="next(-1)"><i class="icon icon-left"></i></span>
				<span class="time">{{data.AnswerTime | time}}</span>
				<span class="right next-btn" v-on:click="next(1)"><i class="icon icon-right"></i></span>
			</div>
		</div>
	</div>
</template>
<style>
	.p_exam_now .footer{
		position: fixed;
		bottom: 0px;
		width: 100%;
	}
	.p_exam_now  .m-header-title{
		margin-right: 0px;
		margin-left:40px;
		text-align: left;
		font-size: 14px;
		font-weight: normal;
	}
	.p_exam_now .footer{
		padding: .3rem;
		box-sizing: border-box;
		font-size: .34rem;
	}
	.p_exam_now .footer .next-btn{
		width: .6rem;
		height: .6rem;
		font-size: .5rem;
		color: #c9c9c9;
	}
	.p_exam_now .footer .left{
		position: absolute;
		left: .0;
		top: 0px;
	}
	.p_exam_now .footer .toolbar{
		position: relative;

	}
	.p_exam_now .footer .right{
		position: absolute;
		right: 0;
		top: 0px;
	}
	.p_exam_now .footer .page{
		color: #ff9100;
		text-align: center;
	}
	.p_exam_now .footer .time{
		width: 100%;
		display: block;
		text-align: center;
		color: #ff9100;
		line-height: .6rem;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default {
		data(){
			return {
				time:"10:25",
				letters : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N"],
				page:1,
				data:{},
				PK_EID:this.$route.params.PK_EID,
				rows:[]
			}
		},
		ready:function(){
			this.getList().then(this.beginClock);
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetExaminationTopic",{
					PK_EID:this.PK_EID
				}).then(res => {
					var data = res.body.Data;
					data.TopicList.forEach(row =>{
						row.isshow=false;
						row.Answer="";
						try{
							row.TOption = JSON.parse(row.TOption);
						}catch(err){
							row.TOption = {};
						}
						row._checked = [];
					});
					
					if(data.TopicList.length>0){
						data.TopicList[0].isshow=true;
					}
					this.$set("data",data);
					this.data.AnswerTime = data.AnswerTime * 60;
				})
			},
			checkOne:function(idx,data,Option){
					switch(data.TType){
						case 0 :{
							data.Answer=Option.Title;
							break;
						};
						case 1 :{
							if(data.Answer.indexOf(Option.Title)!=-1){
								data.Answer=data.Answer.replace(Option.Title,"");
							}else{
								data.Answer+=Option.Title;
							}
							break;
						};
						case 2 :{
							break;
						}
				}
			},
			next:function(step){
				if(step<0&&this.page>1){
					this.page=this.page+step;
				}
				if(step>0&&this.page<this.data.TopicList.length){
					this.page=this.page+step;
				}
				for(var i=0;i<this.data.TopicList.length;i++){
					this.data.TopicList[i].isshow=false;
				}
				this.data.TopicList[this.page-1].isshow=true;
				// if()
			},
			submit:function(){
				var answers = [];
				//console.log( JSON.stringify(this.data.TopicList));
				for(var i=0;i<this.data.TopicList.length;i++){
					answers[answers.length]={PK_TID:this.data.TopicList[i].PK_TID,TAnswer:this.data.TopicList[i].Answer};
				}
				this.$http.post("/API/Student/SetExamination",{
					"PK_EID":this.PK_EID,
					"Answer":answers
				}).then(res => {
					if(res.body.ErrCode==200){
						alert("提交成功！");
						history.go(-1);
					}
				});
			},
			beginClock:function(){
				var clock = setInterval(() => {
					if(this.data.AnswerTime > 0){
						this.data.AnswerTime--
					}else{
						clearInterval(clock);
						this.submit();
					}
				},1000);
			}
		},
		components:{
			MHeader
		}
	}
</script>
<style>
	.p_exam-list .p_exam_paper{
		font-size: .28rem;
	}
	.p_exam-list{
		padding: .16rem .3rem ;
	}
	.p_exam_paper .p_exam_p{
		line-height: 1.5;
		margin-bottom: .16rem;
	}
	.p_exam_paper .choose-list .choose-item{
		display: block;
		margin-bottom: .28rem;

	}
	.p_exam_paper .choose-list  .text-input{
		outline: none;
		border:1px solid #dfdfdf;
		width: 4rem;
		display: inline-block;
		margin:0 auto;
		padding: 4px 6px;
	}
	.choose-item .letter-icon{
		font-size: .3rem;
		color: #ff9100;
		width: .48rem;
		height: .48rem;
		line-height: .48rem;
		border-radius: 50%;
		border:1px solid #ff9100;
		display: inline-block;
		text-align: center;

	}
	.choose-item .letter-icon{
		vertical-align: middle;
		margin-right: .2rem;
	}
	.choose-item .letter-icon:before{
		vertical-align: middle;
	}
	.choose-item.choose-item-0 .letter-icon:before{
		content: "A";
	}
	.choose-item.choose-item-1 .letter-icon:before{
		content: "B";
	}
	.choose-item.choose-item-2 .letter-icon:before{
		content: "C";
	}
	.choose-item.choose-item-3 .letter-icon:before{
		content: "D";
	}
	.choose-item.choose-item-4 .letter-icon:before{
		content: "E";
	}
	.choose-item.choose-item-5 .letter-icon:before{
		content: "F";
	}
	.choose-item.choose-item-6 .letter-icon:before{
		content: "G";
	}
	.choose-item.choose-item-7 .letter-icon:before{
		content: "H";
	}
	.choose-item.choose-item-8 .letter-icon:before{
		content: "I";
	}
	.choose-item.choose-item-9 .letter-icon:before{
		content: "J";
	}
	.choose-item.choose-item-10 .letter-icon:before{
		content: "K";
	}
	.choose-item.choose-item-11 .letter-icon:before{
		content: "L";
	}
	.choose-item.choose-item-12 .letter-icon:before{
		content: "M";
	}
	.choose-item.choose-item-13 .letter-icon:before{
		content: "N";
	}
</style>
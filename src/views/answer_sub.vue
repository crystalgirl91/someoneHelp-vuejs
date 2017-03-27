<template>
	<div class="answer-sub">
		<m-header title="发微课" :left-ops="{showBack:false}" :bg-style="{'backgroundColor':'#f0f4f3'}">
			<a slot="right" v-on:click="this.issendshow=true">
				<span :style="{color:'#999'}">发送</span>
			</a>
			<a slot="left" v-on:click="historyBack()">
				<span>取消</span>
			</a>
		</m-header>
		<group class="group-nomargint">
			<x-textarea :rows="7" placeholder="输入文字..." :value.sync="data.Content"></x-textarea>
		</group>
		<tab active-color="#ff9100" :line-width="0">
			<tab-item :selected="selected === 1" v-on:click="selected = 1">
				<i class=" icon icon-video-chengse"></i>
			</tab-item>
			<span class="line-vertical"></span>
			<tab-item :selected="selected === 2" v-on:click="selected = 2">
				<i class=" icon icon-picture-huise"></i>
			</tab-item>
		</tab>
		<div class="block" v-if="selected === 1">
			<div class="padding-block">
				<i class="icon-biger icon-video-chengse" v-show="!ispause"  v-on:click="startrecording()" ></i>
				<i class="icon-biger icon-big-zanting" v-show="ispause" v-on:click="stoprecording()"></i>
			</div>
			<div class="text-center clearfix"  v-for="m in audio">
				<m-audio :title="'音频'+ ($index + 1)" :src="m.url" :show-delete="true" v-on:error="onloaderr(this)"></m-audio>
			</div>
		</div>
		<div class="block" v-if="selected === 2">
			<dl class="upload-pic-list clearfix">
				<dd class="upload-pic" v-for="m in images">
					<i v-on:click="deleteimage(m)" class="icon-abs icon-close"></i>
					<img :src="m" alt="">
				</dd>
				<dt class="upload-pic upload-pic-btn" v-on:click="uploadpictures()">
					<i class="icon-middle icon-add-picture"></i>
				</dd>
			</dl>
		</div>
		<popup :show.sync="pop">
			<div class="pop">
				<group>
					<cell title="选择要上传的文件" class="text-center"></cell>
					<cell title="相机">
						<span slot="icon" class="icon icon-camera"></span>
					</cell>
					<cell title="图册">
						<span slot="icon" class="icon icon-Photo-album"></span>
					</cell>
				</group>
			</div>
		</popup>
		<dialog  :show.sync="issendshow" :hide-on-blur="true">
			<div class="m_dialog_content">
				<h3 class="m-dialog-title vux-1px-b font-active">
					允许查看人员
				</h3>
				<div class="m-dialog-body">
					<label class="checkbox-inline">
						<input v-on:change="allcheckclick()" type="checkbox" v-model="isall" name="type">
						<span>默认全员可查看</span>
					</label>
					<label v-for="item in TeamList" class="checkbox-inline">
						<input v-on:change="checkclick()" v-model="item.check" type="checkbox">
						<span>{{item.TName}}</span>
					</label>
					<x-button v-on:click="submit()" class="weui_btn_normal" type="normal" text="确定"></x-button>
				</div>
			</div>
		</dialog>
	</div>
</template>
<script type="text/javascript">
  import MHeader from "../components/header.vue"
  import Group from "vux/src/components/group"
  import Popup from "vux/src/components/popup"
  import Cell from "vux/src/components/cell"
  import XTextarea from "vux/src/components/x-textarea"
  import {Tab,TabItem} from "vux/src/components/tab"
  import Dialog from "vux/src/components/dialog";
  import MAudio from "../components/audio_default.vue"
  import XButton from "vux/src/components/x-button";
  export default {
        data(){
          return {
			  issendshow:false,
          	  ispause:false,
			  isshow:false,
              selected:1,
              pop:false,
			  isall:true,
			  Isinitialize:false,
			  images:[],
			  audio:[],
              data:{
				Range:1,
				TIDS:[],
                Content:"",
                Media:[]
              },
			  TeamList:[]
          }
        },
        components:{
            MHeader,
            Group,
			Dialog,
			XButton,
            XTextarea,
            Tab,
            TabItem,
            Popup,
            Cell,
            MAudio
        },
		ready:function(){
			//初始化微信的插件
			var _this=this;
			this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
                    wx.ready(function () {
						_this.Isinitialize=true;
                    });
					wx.error(function (res) {
                        _this.Isinitialize=false;
                    });
			});
			this.$on("audioDelete",function(data){
				this.deleteaudio(data.url);
			});
			//获取班级信息
			this.$http.post('/api/Teacher/GetTeamList').then(res => {
					for(var i=0;i<res.body.Data.length;i++){
						res.body.Data[i].check=false;
					}
					this.$set('TeamList' , res.body.Data);
			});
		},
        methods:{
			allcheckclick:function(){
				for(var i=0;i<this.TeamList.length;i++){
					this.TeamList[i].check=false;
				}
			},
			checkclick:function(){
				for(var i=0;i<this.TeamList.length;i++){
					if(this.TeamList[i].check){
						this.isall=false;
					}
				}
			},
            historyBack:function(){
              history.back();
            },
			deleteimage:function(url){
				for(var i=0;i<this.images.length;i++){
					if(url==this.images[i]){
						this.images.splice(i,1);
					}					 
				}
			},
			deleteaudio:function(url){
				for(var i=0;i<this.audio.length;i++){
					if(url==this.audio[i].url){
						this.audio.splice(i,1);
					}					 
				}
			},
			onloaderr:function(obj,url){
		
			},
			startrecording:function(){
				var _this=this;
				if(this.Isinitialize){
					_this.ispause=true;
					//开始录音
					wx.startRecord();
					//监听自动停止
					wx.onVoiceRecordEnd({
						// 录音时间超过一分钟没有停止的时候会执行 complete 回调
						complete: function (res) {
							_this.ispause=false;
							var localId = res.localId; 
							wx.uploadVoice({
								localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
								isShowProgressTips: 1, // 默认为1，显示进度提示
									success: function (res) {
									var serverId = res.serverId; // 返回音频的服务器端ID
									_this.$http.post('/api/NoPermissions/UploadFile',{"FType":1,"serverId":serverId}).then(fileres => {
										var name=_this.audio.length+1;
										_this.audio.push({"url":fileres.body.Data,"name":"录音"+name+""});
									});
								}
							});
						}
					});
				}else{
					alert("微信初始化失败");
				}
			},
			stoprecording:function(){
				//主动停止录音
				var _this=this;
				wx.stopRecord({
					success: function (res) {
						_this.ispause=false;
						var localId = res.localId;
						wx.uploadVoice({
							localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
							isShowProgressTips: 1, // 默认为1，显示进度提示
								success: function (res) {
								var serverId = res.serverId; // 返回音频的服务器端ID
								//上传录音 
								_this.$http.post('/api/NoPermissions/UploadFile',{"FType":1,"serverId":serverId}).then(fileres => {
									var name=_this.audio.length+1;
									_this.audio.push({"url":fileres.body.Data,"name":"录音"+name+""});
									
								});
							}
						});
					}
				});
			}
			,
			uploadpictures:function(){
				var _this=this;
				if(this.Isinitialize){
					wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							wx.uploadImage({
								localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
								isShowProgressTips: 1, // 默认为1，显示进度提示
								success: function (res) {
									var serverId = res.serverId; // 返回图片的服务器端ID
									//上传图片 
									_this.$http.post('/api/NoPermissions/UploadFile',{"FType":0,"serverId":serverId}).then(fileres => {
										 _this.images.push(fileres.body.Data);
									});
								}
							});
                        }
                    });
				}else{
					alert("微信初始化失败");
				}
			},
            submit:function(){
			  var TIDS=[];
			  var index=0;
			  var Range=1;
			  for(var i=0;i<this.TeamList.length;i++){
				  if(this.TeamList[i].check){
 					TIDS[index]=this.TeamList[i].PK_TID;
				  	index=index+1;
				  }				 
			  }
			  if(this.isall){
				  Range=0;
			  }
			  for(var i=0;i<this.images.length;i++){
				  this.data.Media[this.data.Media.length]={MType:0,MLength:0,MUrl:this.images[i]};
			  }
			  for(var i=0;i<this.audio.length;i++){
				  this.data.Media[this.data.Media.length]={MType:1,MLength:0,MUrl:this.audio[i].url};
			  }
			  if(this.data.Content.length<1){
				  alert("请输入微课信息");
				  return;
			  }
			  this.data.Range=Range;
			  this.data.TIDS=TIDS;
              this.$http.post('/api/Teacher/PublishMicro',this.data).then(res => {
                if(res.body.Data){
                  	history.go(-1);
                }
              });
            }
        }
  }
</script>
<style>
	/*body{
  background-color: #f0f4f3;
  }*/
  	.audio-inline {

  	}
  	.audio-wrap{
  		width: 80%;
  		float: left;
  		padding-left: 10px;
    	box-sizing: border-box;
    	text-align: center;
  	}
  	.audio-delete-wrap{
		width: 20%;
		float: right;
		height: 30px;
  	}
  	.audio-wrap .audio{
  		width: 4.3rem;
  	}
  	.audio-delete-wrap .audio-item{
  		background-color: #404140;
  		border-radius: 5px;
  		color: #999999;
  		display: inline-block;
  		line-height: 30px;
    	width: 80%;
    	font-size: .3rem;
  	}
  	.answer-sub{
  		min-height: 100%;
  		background-color: #f0f4f3;
  	}
	
	.answer-sub .vux-tab-item .icon {
		font-size: .39rem;
	}
	
	.answer-sub .vux-tab {
		background-color: #f0f4f3;
	}
	
	.answer-sub .icon-biger {
		font-size: 1.4rem;
		border-radius: 50%;
		display: block;
		color: #ea8010;
		width: 1.8rem;
		height: 1.8rem;
		border: 2px solid #ea8010;
		padding: .22rem;
		text-align: center;
		line-height: 1.8rem;
		margin:0 auto;
	}
	.answer-sub .padding-block{
		padding: .55rem 0;
	}
	.answer-sub .icon-middle {
		font-size: .6rem;
		color: #a9b7b7;
		display: block;
		line-height: 1.6rem;
	}
	
	.answer-sub .icon-abs {
		font-size: .24rem;
		height: .26rem;
		width: .26rem;
		border-radius: 50%;
		background-color: #505456;
		overflow: hidden;
		position: absolute;
		right: 5px;
		top: 5px;
		padding: 2px;
		color: #8d9195;
		text-align: center;vertical-align: middle;
	}
	
	.answer-sub .line-vertical {
		border-right: 1px solid #d9d9d9;
		display: block;
		height: 36px;
		margin-top: 4px;
	}
	
	.upload-pic-list {
		padding: .2rem .2rem
	}
	
	.upload-pic-list .upload-pic {
		width: 1.6rem;
		height: 1.6rem;
		position: relative;
		background-color: #eee;
		float: left;
		margin-right: .2rem;
		margin-bottom: .2rem;
	}
	.upload-pic-list .upload-pic>img{
		width: 100%;
		height: 100%;
	}
	.upload-pic-list .upload-pic:nth-child(4n){
		margin-right: 0px;
	}

	
	.upload-pic-list .upload-pic-btn {
		border: 1px dashed #cccccc;
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
	}
	
	.answer-sub .weui_cell {
		padding: .24rem .4rem .24rem .32rem;
	}
	
	.answer-sub .m-dialog-body .weui_cell {
		padding: .24rem 0 .24rem 0;
	}
	
	.answer-sub .weui_cells {
		margin-top: 0px;
	}
	
	.answer-sub .weui_cell_bd > p {
		font-size: .38rem;
		vertical-align: middle;
		color: #666;
	}
	
	.answer-sub .weui_cell:before {
		left: 0px;
	}
	
	.answer-sub .pop .img-wrap {
		width: 1.8rem;
		height: 1.8rem;
		margin: .4rem auto .78rem auto;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.answer-sub .pop .img-wrap>img {
		width: 100%;
		height: 100%;
	}
	
	.answer-sub .pop .icon {
		color: #999;
		font-size: .46rem;
		margin-right: .2rem;
		display: block;
	}
	.answer-sub .m-dialog-body{
		padding-top: .1rem;
	}

	.answer-sub .checkbox-inline{
		margin-bottom: .1rem;
		display: block;
		font-size: .30rem;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.answer-sub .checkbox-inline input[type='checkbox']{
		vertical-align: baseline;
	}


</style>
<template>
	<div class="answer-sub">
		<m-header title="发回复" :left-ops="{showBack:false}" :bg-style="{'backgroundColor':'#f0f4f3'}">
			<a slot="right" v-on:click="submit()">
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
	</div>
</template>
<!-- 样式与answer_sub.vue公用 -->
<script type="text/javascript">
  import MHeader from "../components/header.vue"
  import Group from "vux/src/components/group"
  import Popup from "vux/src/components/popup"
  import Cell from "vux/src/components/cell"
  import XTextarea from "vux/src/components/x-textarea"
  import {Tab,TabItem} from "vux/src/components/tab"
  import MAudio from "../components/audio_default.vue"
  export default {
        data(){
          return {
          	  ispause:false,
              selected:2,
              pop:false,
			  Isinitialize:false,
			  images:[],
			  audio:[],
              data:{
				PK_AEID:"",
                Content:"",
                Media:[]
              }
          }
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
		},
        components:{
            MHeader,
            Group,
            XTextarea,
            Tab,
            TabItem,
            Popup,
            Cell,
            MAudio
        },
        methods:{
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
              //提交
			  this.data.PK_AEID=this.$route.query.PK_AEID;
			  for(var i=0;i<this.images.length;i++){
				  this.data.Media[this.data.Media.length]={MType:0,MLength:0,MUrl:this.images[i]};
			  }
			  for(var i=0;i<this.audio.length;i++){
				  this.data.Media[this.data.Media.length]={MType:1,MLength:0,MUrl:this.audio[i].url};
			  }
			  var _this=this;
              this.$http.post('/api/Teacher/SetAnswer',this.data).then(res => {
                if(res.body.Data){
					alert("回复成功");
					history.go(-1);
                }
              });
            }
        }
  }
</script>

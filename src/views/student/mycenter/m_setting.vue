<template>
	<div class="my_setting_personal">
		<m-header title="个人设置" :bg-style="{'borderBottom':'1px solid #d9d9d9'}"></m-header>
		<div class="img-wrap" v-on:click="updateHeadPortraits()"><img v-bind:src="data.HeadPortraits" alt=""></div>
		<group>
			<cell title="用户名：" v-bind:value.sync="data.UName" :is-link="true" v-on:click="show1=true"></cell>
			<cell title="密码：" value="*******" :is-link="true" v-on:click="show2=true"></cell>
			<cell title="手机：" v-bind:value.sync="data.Telephone" :is-link="true" v-on:click="show3=true"></cell>
			<cell title="邮箱：" v-bind:value.sync="data.Email" :is-link="true" v-on:click="show4=true"></cell>
		</group>
		<div class="tuichu">
			<x-button type="normal" v-on:click="outlogin()" text="退出"></x-button>
		</div>
		<popup :show.sync="show0">
			<div class="popup0">
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
		<dialog :show.sync="show1" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group style="margin-bottom:.45rem">
						<x-input readonly title="姓 名：" v-bind:value.sync="data.UName"></x-input>
						<x-input title="更改为：" :value.sync="UName" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(1)"></x-button>
				</div>
			</div>
		</dialog>
		<dialog :show.sync="show2" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group style="margin-bottom:.45rem">
						<x-input title="原密码：" :value.sync="YLoginPwd" placeholder="请输入..."></x-input>
						<x-input title="新密码：" :value.sync="NewLoginPwd" placeholder="请输入..."></x-input>
						<x-input title="再次输入：" :value.sync="OKNewLoginPwd" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(2)"></x-button>
				</div>
			</div>
		</dialog>
		<dialog :show.sync="show3" :hide-on-blur="true">
			<div class="m_dialog_content"> 
				<div class="m-dialog-body">
					<group style="margin-bottom:.45rem">
						<x-input readonly title="手机号：" v-bind:value.sync="data.Telephone"></x-input>
						<x-input title="新手机号" :value.sync="Telephone" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(3)"></x-button>
				</div>
			</div>
		</dialog>
		<dialog :show.sync="show4" :hide-on-blur="true">
			<div class="m_dialog_content">
				<div class="m-dialog-body">
					<group style="margin-bottom:.45rem">
						<x-input readonly title="邮箱：" v-bind:value.sync="data.Email"></x-input>
						<x-input title="新邮箱：" :value.sync="Email" placeholder="请输入..."></x-input>
					</group>
					<x-button type="normal" text="确定" v-on:click="submit(4)"></x-button>
				</div>
			</div>
		</dialog>
	</div>
</template>
<script>
	import Dialog from "vux/src/components/dialog";
	import MHeader from '../../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import Popup from "vux/src/components/popup"
	import XButton from "vux/src/components/x-button"
	import XInput from "vux/src/components/x-input"
	export default {
		data(){
			return {
				show0:false,
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				YLoginPwd:"",
				NewLoginPwd:"",
				OKNewLoginPwd:"",
				UName:"",
				Telephone:"",
				Isinitialize:false,
				Email:"",
				data:{}
			}
		},
		components:{
			Group,
			Cell,
			MHeader,
			Popup,
			Dialog,
			XButton,
			XInput
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
					this.getData();
			  });
		},
		methods:{
			getData:function(){						
				this.$http.post('/api/Teacher/GetUserInfo').then(res => {
					this.$set('data' , res.body.Data);
				});
			},
			outlogin:function(){
				window.localStorage.PlatformUser="";
				window.localStorage.PlatformUser=null;
				this.$router.go('/login');
			},
			updateHeadPortraits:function(){
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
										_this.data.HeadPortraits=fileres.body.Data;
										//设置头像
										_this.$http.post('/API/Student/UpdateHeadPortraits',_this.data).then(fileres => {
											//设置头像
											if(!fileres.body.Data){
												alert("头像设置失败");
											}
										});
									});
								}
							});
						}
					});
				}else{
					alert("微信初始化失败");
				}
			},
			submit:function(type){
				switch(type){
					case 1:
					    this.$http.post('/API/Student/UpdateUName',{"UName":this.UName}).then(res => {
							if(res.body.Data){
								this.data.UName = this.UName;
							}
						});
						this.show1 = false;
						//姓名
						break;
					case 2:
						if(this.NewLoginPwd==this.OKNewLoginPwd){
							this.$http.post('/API/Student/UpdateUserPwd',{
								"YLoginPwd":this.YLoginPwd,
								"NewLoginPwd":this.NewLoginPwd,
								"OKNewLoginPwd":this.OKNewLoginPwd
							}).then(res => {
								if(res.body.Data){
									alert("操作成功！");
								}
							});
							this.show2 = false;
						}else{
							alert("新密码和确认密码必须相同");
						}
						//密码UpdateUserPwd
						break;
					case 3:
					this.$http.post('/API/Student/UpdateTelephone',{"Telephone":this.Telephone}).then(res => {
							if(res.body.Data){
								this.data.Telephone=this.Telephone;
							}
						});
						this.show3 = false;
						//联系电话
						break;
					case 4:
					this.$http.post('/API/Student/UpdateEmail',{"Email":this.Email}).then(res => {
							if(res.body.Data){
								this.data.Email=this.Email;
							}
						});
						this.show4 = false;
						//邮箱
						break;
				}
			}
		}
	} 
</script>
<style>
	.tuichu{
		width: 80%;
		margin: 0px auto;
		margin-top: 30px;
	}
	.my_setting_personal{
		background-color: #fff;
	}
	/*.my_setting_personal .weui_cell {
		padding: .24rem .4rem .24rem .32rem;
	}*/
	
	.my_setting_personal .m-dialog-body .weui_cell {
		padding: .24rem 0 .24rem 0;
		font-size: .28rem;
	}
	
	/*.my_setting_personal .weui_cells {
		margin-top: 0px;
	}
	
	.my_setting_personal .weui_cell_bd > p {
		font-size: .28rem;
		vertical-align: middle;
		color: #666;
	}*/
	
	.my_setting_personal .weui_cell:before {
		left: 0px;
	}
	
	.my_setting_personal .img-wrap {
		width: 1.8rem;
		height: 1.8rem;
		margin: .4rem auto .78rem auto;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.my_setting_personal .img-wrap>img {
		width: 100%;
		height: 100%;
	}
	
	.my_setting_personal .icon {
		color: #999;
		font-size: .46rem;
		margin-right: .2rem;
		display: block;
	}
	.my_setting_personal .weui_cell .weui_cell_ft{
		line-height: 1;
	}
</style>
<template>
<div class="m-panel audio-weike">
	<div class="m-panel-wrap vux-1px-r vux-1px-t vux-1px-l vux-1px-b"  v-for="item in list">
		<a href="javascript:void(0)" class="m-panel-box">
			<div class="m-panel-card">
				<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + item.HeadPortraits + ')'}"></div>
				<div class="m-panel-flex">
					<p class="title">{{item.UName}}</p>
					<p class="time">{{item.TimeStr}}</p>
				</div>
			</div>
			<div class="m-panel-p">{{item.Content}}</div>
			<div class="m-tip-audio" v-show="item.Media.length">
				<div class="m-tip-piclist clearfix">
					<img v-for="m in item.Media" v-show="m.MType==0" :src="m.MUrl" v-on:click="previewImage(m.MUrl,item.Media)" alt="" class="m-tip-pic">
				</div>
				<div v-for="m in item.Media" v-show="m.MType==1">
					<m-audio :src="m.MUrl"  v-on:error="onloaderr(this)"></m-audio>
				</div>
			</div>
		</a>
	</div>
</div>
</template>
<style>
	.m-panel .m-panel-pic{
		display: inline-block;
		width: .98rem;
		height: .98rem;
		margin-right: .2rem;
		display: inline-block;
		margin:.3rem 0;
	}
	.m-panel .m-btn-wrap{
		margin:.5rem;
	}
</style>
<script>
	import XButton from "vux/src/components/x-button";
	import Dialog from "vux/src/components/dialog"
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "./audio_default.vue"
	export default{
		data(){
			return {
				status:2
			}
		},
		components:{
			XButton,
			Flexbox,
			FlexboxItem,
			Dialog,
			MAudio
		},
		props:{
			list:Array
		},
		ready:function(){
			this.$http.post('/api/NoPermissions/GetWeChatSDK',{"url":window.location.href}).then(res => {
					wx.config(res.body.Data);
                    wx.ready(function () {
					
                    });
					wx.error(function (res) {

                    });
			});
		},
		methods:{
			previewImage:function(imageurl,arryobj){
				var urlarry=[];
				for(var i=0;i<arryobj.length;i++){
					if(arryobj[i].MType==0){
						urlarry[urlarry.length]=arryobj[i].MUrl;
					}
				}
				wx.previewImage({
					current: imageurl, // 当前显示图片的http链接
					urls: urlarry // 需要预览的图片http链接列表
				});
			},
			onloaderr:function(){
				
			}
		}
	}
</script>
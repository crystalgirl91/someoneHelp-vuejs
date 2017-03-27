<template>
<div class="m-card-tips audio-weike">
	<flexbox align="flex-start">
		<flexbox-item :style="_style" class="m-card-portrait"><img :src="item.HeadPortraits"></flexbox-item>
		<flexbox-item>
			<div class="m-tip-wrap">
				<span class="icon-arrow"></span>
				<div class="m-tip-head clearfix">
					<span class="m-tip-title">{{item.UName}}</span>
					<span class="m-tip-time">{{item.TimeStr}}</span>
				</div>
				<p class="m-tip-text">{{item.MTextContent}}</p>
				<div class="m-tip-audio" v-if="show_audio===true">
					<div v-if="item.Media.length>0" class="m-tip-piclist clearfix">
						<img v-for="m in item.Media" v-show="m.MType==0" :src="m.MUrl" v-on:click="previewImage(m.MUrl,item.Media)" alt="" class="m-tip-pic">
					</div>
					<div v-for="m in item.Media" v-show="m.MType==1">
						<m-audio :src="m.MUrl" v-on:error="onloaderr(this)"></m-audio>
					</div>
				</div>
				
			</div>
		</flexbox-item>
	</flexbox>
</div>
</template>
<script>
	import XButton from "vux/src/components/x-button";
	import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
	import MAudio from "./audio_default.vue"
	export default{
		data(){
			return {
				isshow:false
			}
		},
		props:{
			item:Object,
			show_audio:{
				type:Boolean,
				default(){
					return false
				}
			},
		},
		components:{
			XButton,
			Flexbox,
			FlexboxItem,
			MAudio
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
		computed:{
			_style(){
				return {
					width:".8rem",
					height:".8rem",
					"-webkit-box-flex": "inherit",
					flex: "inherit"
				}
			}
		},methods:{
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
<style>
	.audio-weike .audio-wrap{
		float: none;
		width: 100%;
		padding: 0px;
		text-align: left;
	}
	.audio-weike .audio{
		width: 4.3rem;
	}
	.audio-weike .audio-inline{
		width: 100%;
	}
	.m-card-tips{
		padding: 0 .3rem;
		color: #666;
		background-color: #fff;
	}
	.m-card-tips .m-tip-audio{
		padding: .1rem .35rem;
	}
	.m-card-tips .m-card-portrait{
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: .24rem;
	}
	.m-card-tips .m-card-portrait>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.m-card-tips .m-tip-wrap{
		border:1px solid #d2d2d2;
		padding: .1rem .18rem;
		background-color: #fff;
		position: relative;
		line-height: .36rem;
		margin-bottom: .2rem;

	}
	/*.m-tip-wrap .icon-arrow{
		border-right: 10px solid #d2d2d2;
		border-left: 10px solid transparent;
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
		position: absolute;
		top:.2rem;
		left: -20px;
	}*/
	/*.m-tip-wrap .icon-arrow:before{
		content: "";
		border-right: 8px solid #fff;
		border-left: 8px solid transparent;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		position: absolute;
		left: -6px;
		top: -6px;
	}*/
	.m-card-tips .m-tip-head{
		line-height: .46rem;
	}
	.m-tip-head .m-tip-title{
		display: block;
		width: 40%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		float: left;
		font-size: .26rem;
		
	}
	.m-tip-head .m-tip-time{
		float: right;
		font-size: .2rem;
		width: 60%;
	}
	.m-card-tips .m-tip-text{
		font-size: .24rem;
		line-height: .46rem;
	}
	.m-tip-piclist .m-tip-pic{
		width: 1rem;height: 1rem;
		display: block;
		float: left;
		margin-right: .2rem;
		margin-bottom: .1rem;
	}
</style>

<template>
	<div class="audio-container">
		<span class="name" v-show="title">{{title}}</span>
		<div class="audio-inline">
			<span v-show="status ==='play'"  @click="play()" class="audio-button audio-button-left"><i class="icon icon-play2"></i></span>	
			<span v-show="status ==='pause'" @click="play()" class="audio-button audio-button-left"><i class="icon icon-pause"></i></span>
			<div class="progress-wrap">
			<p class="progress">
				<span class="progress-bar" :style="{'width':width +'%'}"></span>
			</p>
			</div>
			<span v-show="showDelete" @click="deleteAudio()" class="audio-button audio-button-right"><i class="icon icon-lajitong"></i></span>
			<audio hidden :id="'audio' + id"  :src="src" controls></audio>
		</div>
		<span class="time">{{time}}</span>
	</div>
</template>
<style>
	.audio-container{
		display: flex;
		font-size: .20rem;
		justify-content: space-around;
		align-items: center;
		color: #666;
		margin-bottom: .1rem;
	}
	.audio-container>.name,.audio-container>.time{
		padding: 0 .1rem;
		width: .8rem;
		text-align: center;
		font-size: .26rem;
	}
	.audio-inline{
		display: inline-flex;
		border-radius: 5px;
		overflow: hidden;
		width: 4.94rem;
		height: .52rem;
		border:1px solid #dfdfdf;
		color: #b2b2b2;
		align-items: stretch;
	}
	.audio-inline .audio-button{
		width: .6rem;
		text-align: center;
		font-size: .3rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.audio-inline .audio-button-right{
		border-left: 1px solid #dfdfdf;
	}
	.audio-inline .audio-button-left{
		border-right: 1px solid #dfdfdf;
	}
	.audio-inline .progress{
		height: 4px;
		background-color: #cccccc;
		border-radius: 20px;
		width: 100%;
		margin:0 .2rem;
		position: relative;
		overflow: hidden;
		
	}
	.audio-inline .progress-wrap{
		-webkit-flex: 1;
		-moz-flex: 1;
		-ms-flex: 1;
		-o-flex: 1;
		flex: 1;
		align-items: center;
		display: flex;
	}
	.audio-inline .progress .progress-bar{
		background-color: #63baf0;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0px;
	}

</style>
<script>
export default{
	data(){
		return {
			width:0,
			id:String(Math.random()).slice(2),
			time:"0:0"
		}
	},
	props:{
		src:String,
		status:{
			type:String,
			default:"play"
		},
		title:String,
		showDelete:{
			type:Boolean,
			default:false
		}
	},
	ready:function(){
		var audio = document.querySelector("#audio" + this.id);
		audio.addEventListener("timeupdate", () => {
			this.time = parseInt(audio.currentTime / 60) + ":" + (audio.currentTime % 60).toFixed();
			this.width = audio.currentTime/audio.duration * 100
		});
		audio.addEventListener("ended", () => {
			audio.currentTime = 0.0; 
			this.status='play';
		});
		audio.addEventListener("pause", () => {
			audio.currentTime = 0.0; 
			this.status='play';
		});
	},
	methods:{
		play:function(){
			for(var i=0;i<document.getElementsByTagName("audio").length;i++){
				document.getElementsByTagName("audio")[i].pause();
				document.getElementsByTagName("audio")[i].currentTime = 0.0; 
			}
			var audio = document.querySelector("#audio" + this.id);
			if(this.status === 'play'){
				audio.play();
				//获取时间
				this.status = 'pause';
			}else{
				audio.pause();
				audio.currentTime = 0.0; 
				this.status = 'play';
			}
		},
		deleteAudio:function(){
			this.$dispatch('audioDelete',{'id':this.id,'url':this.src});
		}
	}
}
</script>

<template>
	<label class="m-audio-inline" v-on:click="trigger()">
		<span class="bugle" :class="{'play': isplay === true}" ></span>
		<audio id="audio" hidden :src="src" controls></audio>
	</label>
</template>
<style>
	.m-audio-inline{
		background-color: #9fe658;
		display: inline-block;
		width: 3rem;
		height: .8rem;
		line-height: .8rem;
		border-radius: 5px;
	    padding-left: .2rem;
	    border:1px solid #7bc144;
	    position: relative;
	    text-align: left;
	}
	.m-audio-inline:before{
		content: "";
		position: absolute;
		border-right: 8px solid #7bc144;
		left: -16px;
		top: 50%;
		margin-top: -8px;
		z-index: 9;
		border-left: 8px solid transparent;
		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
	}
	.m-audio-inline:after{
		content: "";
		position: absolute;
		border-right: 7px solid #9fe658;
		left: -13px;
		top: 50%;
		margin-top: -7px;
		z-index: 10;
		border-left: 7px solid transparent;
		border-top: 7px solid transparent;
		border-bottom: 7px solid transparent;
	}
	.bugle{
		width: .4rem;
	    background-size: 100% auto;
	    background-position: center;
	    display: inline-block;
	    background-repeat: no-repeat;
	    height: 100%;
	    background-image: url(/audio3.png?503335bb3d);
	    -webkit-transform: rotate(180deg);
	    transform: rotate(180deg);

	}
	.bugle.play{
		animation: playaudio  1s infinite;
		-webkit-animation: playaudio  1s infinite;
	}
	@keyframes playaudio{
		0%{
			background-image: url(../assets/images/audio1.png);
		}
		33%{
			background-image: url(../assets/images/audio2.png);
		}
		66%{
			background-image: url(../assets/images/audio3.png);
		}
		100%{
			background-image: url(../assets/images/audio1.png);
		}
	}
</style>
<script>
	export default {
		data(){
			return {
				isplay:false
			}
		},
		props:{
			"src":String
		},
		methods:{
			trigger:function(){
				var audio = document.querySelector("#audio");
				this.isplay ? audio.pause() : audio.play();
				this.isplay = !this.isplay;
			}
		}
	}

</script>
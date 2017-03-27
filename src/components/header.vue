<template>
<header class="m-header" v-bind:style="bgStyle">
	<div class="m-header-left">
		<a v-if="leftOps.showBack"  class="m-header-back" @click.preventDefault @click="onClickBack"></a>
		<slot name="left"></slot>
	</div>
	<h2 class="m-header-title">{{title}}</h2>
	<div class="m-header-right">
		<a class="m-header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOps.showMore"></a>
		<slot name="right"></slot>
	</div>
</header>
</template>
<script>
	export default{
		props:{
			bgStyle:{
				type:Object,
				default(){
					return {
						backgroundColor:"#fff"
					}
				}
			},
			leftOps:{
				type:Object,
				default(){
					return {
						showBack:true,
						backText:"",
						preventGoBack:false
					}
				}
			},
			rightOps:{
				type:Object,
				default(){
					return {
						showMore:false
					}
				}
			},
			title:String
		},
		methods:{
			onClickBack(){
				if(!this.leftOps.showBack){
					 this.$emit('on-click-back');
				}else{
					history.back();
				}
			}
		}
	}
</script>
<style>
.m-header {
  position: relative;
  padding: 3px 0;
  box-sizing: border-box;
  background-color: #fff;
}
.m-header.m-header-transparent{
	background-color: transparent;
}	
.m-header .m-header-title,.m-header h1 {
  margin: 0 88px;
  margin-left: 100px;
  line-height: 40px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  font-weight: 400;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}
.m-header .m-header-title > span {
  display: inline-block;
}
.m-header .m-header-left,.m-header .m-header-right {
  position: absolute;
  top: 14px;
  display: block;
  font-size: 14px;
  line-height: 21px;
  color: #000;
}
.m-header .m-header-title, .m-header h1{
  font-size: .36rem;
}
.m-header .m-header-left a,.m-header .m-header-left button,.m-header .m-header-right a,.m-header .m-header-right button {
  float: left;
  margin-right: 8px;
  color: #ff9100;
}
.m-header .m-header-left a:active,.m-header .m-header-left button:active,.m-header .m-header-right a:active,.m-header .m-header-right button:active {
  opacity: .5
}
.m-header .m-header-left {
  left: 18px
}
.m-header .m-header-left .m-header-back {
  padding-left: 16px
}
.m-header .m-header-left .m-header-back:before {
  content: "";
  position: absolute;
  display: block;
  top: 2px;
  left: 0;
  width: 12px;
  height: 12px;
  border: 1px solid #ff9000;
  border-width: 1px 0 0 1px;
  margin-left: 3px;
  margin-top: 1px;
  transform: rotate(315deg)
}
.m-header .m-header-right {
  right: 15px
}
.m-header .m-header-right a,.m-header .m-header-right button {
  margin-left: 8px;
  margin-right: 0
}
.m-header .m-header-right .m-header-more:after {
  content: "\2022\0020\2022\0020\2022\0020";
  font-size: 16px;
}
.m-header-fade-in-right-enter {
  animation: fadeinR .5s;
}
.m-header-fade-in-left-enter {
  animation: fadeinL .5s;
}
@keyframes fadeinR{
  0%{opacity:0;transform:translateX(80px);}
  100%{opacity:1;transform:translateX(0);}
}
@keyframes fadeinL{
  0%{opacity:0;transform:translateX(-80px);}
  100%{opacity:1;transform:translateX(0);}
}
</style>
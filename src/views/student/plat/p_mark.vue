<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'background-color':'#f0f4f3'}" title="积分商城">
		<i class="icon icon-jifenjilu" style="font-size:.4rem;vertical-align:middle" v-link="{'path':'/plat_point'}" slot="right"></i>
	</m-header>
	<div class="p_mark">
		<swiper  dots-class="swiper-dot" dots-position="center" :list="list" auto></swiper>
		<div class="weui_panel weui_panel_access">
		    <!-- <div class="weui_panel_hd" v-if="header" @click="onClickHeader"></div> -->
		    <div class="weui_panel_bd">
		      <a  v-link="{'name':'plat_product', params:{'PK_ISID':item.PK_ISID}}" v-for="item in rows"  class="weui_media_box weui_media_appmsg">
		        <div class="weui_media_hd" v-if="item.SImage">
		          <img class="weui_media_appmsg_thumb" :src="item.SImage">
		        </div>
		        <div class="weui_media_bd">
		          <h4 class="weui_media_title">{{item.SName}}</h4>
		          <p class="weui_media_desc">兑换积分{{item.Credits}} 库存数量{{item.Stock}}</p>
		        </div>
		      </a>
		     
		    </div>
		  </div>
	</div>
</template>
<style>
	.p_mark .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .p_mark .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
		color: #ff9100;
		background-color: #ff9100;
	}
</style>
<script>
	import MHeader from '../../../components/header.vue'
	import Swiper from 'vux/src/components/swiper'
	import Panel from 'vux/src/components/panel'
	export default {
		data(){
			return {
			      list: [],
			      rows:[]
			}
		},
		ready:function(){
			 this.getData().then(this.getFlash());
		},
		methods:{
			getData:function(){
				return this.$http.post("/API/Student/GetIntegralStoreList",{
					 "PageIndex":1,
					 "PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			},
			getFlash:function(){
				return this.$http.post("/API/Student/GetFlashView",{
					"FVType":1
				}).then(res => {
					this.list = res.body.Data.map(i => {
						return {
							url:i.FVLink,
							img:i.FVImage,
							title:i.FVTitle
						}
					});
				})
			}
		},
		components:{
			MHeader,
			Swiper,
			Panel
		}
	}
</script>
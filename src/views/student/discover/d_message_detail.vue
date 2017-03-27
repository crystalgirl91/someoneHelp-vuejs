<template>
	<div class="p_message_detail">
		<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="消息"></m-header>
		<div class="p">
			<p>系统通知：</p>
			<p>{{data.MNContent}}</p>
		</div>
		<div class="text-center"><time class="time">{{data.UpdateTime}}</time></div>
	</div>
</template>
<style>
	.p_message_detail{
		background: #f0f4f3;
		min-height: 100%;
	}
	.p_message_detail .p{
		line-height: 1.5;
	    background-color: #f8faf9;
	    margin: .1rem .3rem .2rem .3rem;
	    padding: .16rem;
	}
	.p_message_detail .time{
		background-color: #d6d9d8;
		padding: 2px 4px;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default {
		components:{
			MHeader
		},
		data(){
			return {
				PK_MNID:this.$route.params.PK_MNID,
				data:{}
			}
		},
		ready:function(){
			this.getData().then(this.changeStatus());
		},
		methods:{
			getData:function(){
				return this.$http.post("/API/Student/GetMessage",{
					"PK_MNID":this.PK_MNID
				}).then(res =>{
					this.data = res.body.Data;
				})
			},
			changeStatus:function(){
				return this.$http.post("/API/Student/MarkRead",{
					"PK_MNID":this.PK_MNID
				})
			}
		}

	}
</script>
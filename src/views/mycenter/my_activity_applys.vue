<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="报名信息"></m-header>
	<ul class="activity-apply-list">
		<li class="list-item" v-for="item in data" >
			<dl class="sub-list">
				<dd class="sub-item"><label class="item-label">姓名：</label>{{item.GUserName}}</dd>
				<dd class="sub-item"><label class="item-label">发票抬头：</label>{{item.Rise}}</dd>
				<dd class="sub-item"><label class="item-label">邮寄地址：</label>{{item.MailingAddress}}</dd>
				<dd class="sub-item"><label class="item-label">联系电话：</label>{{item.Telephone}}</dd>
				<dd class="sub-item"><label class="item-label">邮箱：</label>{{item.Email}}</dd>
			</dl>
		</li>
	</ul>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<style>
	/*body{
		 background-color: #f0f4f3;
	}*/
	.activity-apply-list{
		margin-top: .1rem;
		background: #fff;
		font-size: .28rem;
		color: #666;
		padding: 0 .27rem;
	}
	.activity-apply-list .sub-list{
		line-height: .52rem;
	}
	.activity-apply-list .list-item{
		border-bottom: 1px solid #d9d9d9;
		padding: .2rem 0;
	}
	.activity-apply-list .list-item:last-child{
		border-bottom: 0px;
	}
	.activity-apply-list .sub-list .item-label{
		width: 1.8rem;
		display: inline-block;
	}
	
</style>
<script>
	import MHeader from '../../components/header.vue'
	import Loading from "vux/src/components/loading"

	export default {
		data(){
			return {
				data:[]
			}
		},
		ready:function(){
			 this.getData(this.$route.query.PK_AID);
		},
		methods:{
			getData:function(PK_AID){
				this.$http.post('/api/Teacher/GetGradeByActivity',{"PK_AID":PK_AID}).then(res => {
					this.$set('data' , res.body.Data);	
				});
			}
		},
		components:{
			MHeader,
			Loading
		}
	}
</script>
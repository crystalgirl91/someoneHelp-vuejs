<template>
	<m-header title="交易记录"></m-header>
	<div class="trade_record">
		<group>
			<cell v-for="item in data" :title="item.Describe" :inline-desc="item.CTime">
				<slot><span class="color-normal font-big">{{item.Figure}}学币</span></slot>
			</cell>
		</group>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<script>
	import MHeader from '../../components/header.vue'
	import Group from "vux/src/components/group"
	import Cell from "vux/src/components/cell"
	import Loading from "vux/src/components/loading"
	export default{
		data(){
			return {
				data:[],
				loading:true
			}
		},
		ready:function(){
			this.getData();
		},
		methods:{
			getData:function(){			
				this.$http.post('/api/Teacher/GetExpenseList').then(res => {
					this.$set('data' , res.body.Data);	
				});
			}
		}
		,
		components:{
			MHeader,
			Group,
			Cell,
			Loading
		}
	}
</script>
<style>
	.trade_record .weui_cells {
		margin-top: 0px;
	}
	.trade_record .font-big{
		font-size: .3rem;
	}
	.trade_record .vux-label-desc{
		font-size: .24rem;
		color: #666;
	}
	.trade_record .weui_cell_bd > p{
		font-size: .28rem;
		color: #333;
	}
</style>
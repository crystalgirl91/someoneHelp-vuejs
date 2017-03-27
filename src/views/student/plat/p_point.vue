<template>
	<m-header :left-ops="{showBack:true}" :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="积分记录"></m-header>
	<div class="p_point">
		<ul class="point-list">
			<table class="point-table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th class="head" colspan="2">
							<div class="title">
								<p class="left">当前积分：</p>
								<div class="biger font-active">{{data.TotalIntegral}} <span class="small">分</span></div>
							</div>
							
						</th>
					</tr>
				</thead>
				<tbody class="body">
					<tr v-for="item in rows">
						<td class="td">
							<div>
								<p class="word margin-b">{{item.SName}}</p>
								<p class="time">{{item.CTime}}</p>
							</div>
						</td>
						<td class="td">
							<span class="word-big">数量{{item.Number}}</span>
						</td >
					</tr>
				</tbody>
			</table>
		</ul>
	</div>
</template>
<style>
	.point-table{
		width: 100%;
		background: #fff;
	}
	.point-table .head{
		border-bottom: 1px solid #dfdfdf;
	}
	.point-table .body .td{
		border-bottom: 1px solid #dfdfdf;
		padding: .25rem .3rem;
	}
	.point-table .body .margin-b{
		margin-bottom: .1rem;
	}
	.point-table .body .word{
		font-size: .28rem;
		color: #333;
	}
	.point-table .body .time{
		font-size: .24rem;
		color: #666;
	}
	.point-table .body .word-big{
		font-size: .3rem;
	}
	.p_point .title{
		font-size: .28rem;
		color: #333;
		padding: .3rem ;
		
	}
	.p_point .title .left{
		text-align: left;
		font-weight: normal;
	}
	.p_point .title .biger{
		font-size: .72rem;
		font-weight: normal;
	}

</style>
<script>
	import MHeader from '../../../components/header.vue'
	export default {
		data(){
			return {
				data:{},
				rows:[]
			}
		},
		ready:function(){
			 this.getData();
		},
		methods:{
			getData:function(){
				this.$http.post("/API/Student/GetExchangeGoodList",{
					"PageIndex":1,
					"PageSize":1000
				}).then(res => {
					this.data = res.body.Data;
					this.rows = res.body.Data.ExpenseList;
				})
			}
		},
		components:{
			MHeader
		}
	}
</script>
<template>
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="消费记录"></m-header>
		<div class="p_point">
		<ul class="point-list">
			<table class="point-table">
				<tbody class="body">
					<tr v-for="item in rows">
						<td class="td">
							<div>
								<p class="word margin-b">{{item.Describe}}</p>
								<p class="time">{{item.CTime}}</p>
							</div>
						</td>
						<td class="td text-right">
							<span class="word font-active">{{item.Figure}}学币</span>
						</td>
					</tr>
				</tbody>
			</table>
		</ul>
	</div>
</template>
<style>

</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default {
		components:{
			MHeader
		},
		data(){
			return {
				rows:[]
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetExpenseList",{
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		}
	}
</script>
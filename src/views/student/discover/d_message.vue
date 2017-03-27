<template>
	<m-header :bg-style="{'borderBottom':'1px solid #d9d9d9'}" title="消息"></m-header>
		<div class="p_point">
		<ul class="point-list">
			<table class="point-table">
				<tbody class="body">
					<tr v-for="item in rows">
						<td class="td">
							<div v-link="{'name':'discover_message_detail',params:{'PK_MNID':item.PK_MNID}}">
								<p class="word margin-b">{{item.MNTitle}}</p>
								<p class="time">{{item.CreateTime}}</p>
							</div>
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
				rows:[],
				messNumber:0
			}
		},
		ready:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				this.$http.post("/API/Student/GetMessageNotificationList",{
					"PageIndex":1, "PageSize":100
				}).then(res =>{
					this.rows = res.body.Data.MessageNotificationList;
				})
			}
		}

	}
</script>
<template>
	<table class="mystudent-table" cellpadding="0" cellspacing="0">
		<thead>
			<th class="vux-1px-b">班级名称</th>
			<th class="text-center vux-1px-b">班级人数</th>
		</thead>
		<tbody>
			<tr v-on:click="changeView(item)" v-for="item in data">
				<td class="vux-1px-b">{{item.TName}}</td>
				<td class="text-center vux-1px-b">{{item.Number}}</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	import MHeader from '../../../components/header.vue'

	export default {
		data(){
			return {
				isshow:true,
				data:[{}]
			}
		},
		components:{
			MHeader
		},
		ready:function(){
		      this.getData();
		    },
		methods:{
			getData:function(){						
				this.$http.post('/api/Student/NX_GetTeamList').then(res => {
					this.$set('data' , res.body.Data);
				});
			},
			changeView:function(d){
				this.$router.go({
							name  : 'c_class_detail',
							params: {
								'PK_TID': d.PK_TID,
								'TName':d.TName
							}
						});
			}
		}
	}
</script>
<style>
	.mystudent-table {
		width: 100%;
		padding: 0px .3rem;
		padding-top: .2rem;
	}
	
	.mystudent-table th {
		font-size: .3rem;
		color: #333;
		text-align: left;
		font-weight: normal;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table td {
		font-size: .28rem;
		color: #666;
		line-height: .84rem;
		vertical-align: middle;
	}
	
	.mystudent-table .icon-dashang {
		color: #ff9100;
		font-size: .5rem;
		vertical-align: middle;
	}
</style>
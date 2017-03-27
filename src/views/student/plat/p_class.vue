<template>
	<m-header title="班级"></m-header>
	<section class="plat_class color-bg" >
		<table class="tabel-card" v-for="item in rows" cellpadding="0" cellspacing="0" border="0">
			<thead>
				<th colspan="3" class="card-th"><h3 class="card-title"><p class="card-title-word">{{item.TName}}</p></h3></th>
			</thead>
			<tbody class="card-body">
				<tr v-for="subitem in item.CurriculumGroupList"  v-link="{name:'plat_class_detail',params:{'id':item.PK_TID,'group':subitem.PK_CGID}}">
					<td class="card-td">
						<h3 class="title-witharrow"><i class="icon icon-sign font-active"></i>{{subitem.GroupName}}</h3>
					</td>
					<td class="card-td">{{subitem.Credit}}</td>
					<td class="card-td">{{subitem.IsStudy ? "完成" : "未完"}}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td class="card-foot-td"><span class="margin-5">合格学分：{{item.QualifiedCredit}}</span></td>
					<td class="card-foot-td" colspan="2"><span class="margin-5">完成学分：{{item.CompleteCredit}}</span></td>
				</tr>
			</tfoot>
		</tabel>
	</section>
</template>
<style>
	.plat_class{
		padding: .1rem .28rem; 
		min-height: 100%;
		background-color: #f0f4f3;
	}
	.tabel-card{
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		border:1px solid #dfdfdf;
		width: 100%;
		padding: 0 .24rem;
		margin-bottom: .1rem;
	}
	.tabel-card .card-th{
		
	}
	.tabel-card .title-witharrow{
		font-size: .28rem;
		line-height: .5rem;
		padding: 0px;
	}
	.tabel-card .card-title{
		padding: .16rem 0;
		border-bottom: 1px solid #dfdfdf;
		margin-bottom: .2rem;
		font-weight: normal;
	}
	.tabel-card .border{
		border-top: 1px solid #dfdfdf;
	}
	.tabel-card .card-title-word{
		border-left: 2px solid #ff9100;
		font-size: .34rem;
		color: #333;
		padding-left: .1rem;
		line-height: 1;
		text-align: left;
	}
	.card-foot-td{
		font-size: .28rem;
		line-height: .5rem;
	}
	.card-foot-td .margin-5.padding{
		padding-left: .5rem;
	}
	.card-foot-td .margin-5{
		margin-top: .15rem;
		display: block;
		border-top: 1px solid #dfdfdf;
		line-height: 2.2;

	}
	.tabel-card .card-body{
	}
	.tabel-card .card-td{
		font-size: .28rem;
		line-height: 2.2;
	}
</style>
<script>
	import MHeader from "../../../components/header.vue"
	export default{
		components:{
			MHeader
		},
		data(){
			return {
				rows:[],
			}
		},
		methods:{
			getList:function(){
				return this.$http.post("/API/Student/GetEnterpriseTeam",{
					"PageIndex":1,
					"PageSize":100
				}).then(res => {
					this.rows = res.body.Data;
				})
			}
		},
		ready:function(){
			this.getList()
		}
	}
</script>
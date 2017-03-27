<template>
	<div class="mycenter">
		<group class="group-no-border-t">
			<a class="m-panel-box-big">
				<div class="m-panel-card">
					<div class="m-panel-pic">
						<img style="width: 100%;height: 100%;" v-bind:src="data.HeadPortraits" />
					</div>
					<div class="m-panel-flex">
						<p class="title">{{data.UName}}</p>
						<span v-bind:style="{'background-image': 'url('+data.LevelImg+')'}" class="icon"></span>
					</div>
				</div>
			</a>
		</group>
		<group class="group-no-border-t">
			<div class="card-horizontal">
				<div class="card-item">
					<i class="card-icon icon-money" style="color:#f4c600"></i>
					<span class="icon-des">{{data.Learn}}学币</span>
				</div>
				<div class="card-item">
					<i class="card-icon icon-fans" style="color:#eb4f38"></i>
					<span class="icon-des">{{data.FansCount}}粉丝</span>
				</div>
			</div>
		</group>
		<group class="group-no-border-t">
			<cell title="推广页面" v-link="{'name':'tuiguang','params':{'PK_UID':data.PK_UID}}" :is-link="true">
				<span slot="icon" class="icon icon-tuiguangyemian" style="color:#eb4f38"></span>
			</cell>
			<cell title="班级和学员" link="/myclass">
				<span slot="icon" class="icon icon-my-students" style="color:#f4c600"></span>
			</cell>
			<!-- <cell title="我的学员" link="/myclass">
				<span slot="icon" class="icon icon-my-students" style="color:#f4c600"></span>
			</cell> -->
			<cell title="交易记录" link="/myrecord">
				<span slot="icon" class="icon icon-xiaofeijilu" style="color:#ea8012"></span>
			</cell>
			<cell title="发布活动" link="/myactive">
				<span slot="icon" class="icon icon-fabuhuodong" style="color:#58ade3"></span>
			</cell>
			<cell title="提款申请" link="/myapply">
				<span slot="icon" class="icon icon-tikuanshenqing" style="color:#00ba9b"></span>
			</cell>
		</group>
		<group class="group-no-border-t">
			<cell title="我的二维码" link="/myqrcord">
				<span slot="icon" class="icon icon-wodeerweima" style="color:#56abe4"></span>
			</cell>
			<cell title="我的设置" link="/mysetting">
				<span slot="icon" class="icon icon-set" style="color:#e16450"></span>
			</cell>
		</group>
	</div>
	<loading :show.sync="loading" text="加载中"></loading>
</template>
<style>
	.mycenter{
		background-color: #f0f4f3;
		padding-bottom: 3rem;
		box-sizing: border-box;
	}
	.mycenter .icon {
		font-size: .4rem;
		margin-right: .18rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.mycenter .weui_cell {
		padding: .24rem .4rem .24rem .32rem;
		/*border-bottom: 1px solid #dbd8d8;
  border-top: 0px;*/
	}
	
	.mycenter .weui_cell_bd > p {
		font-size: .28rem;
		vertical-align: middle;
	}
	
	.card-demo-flex {
		display: flex;
	}
	
	.card-demo-content01 {
		padding: 10px 0;
	}
	
	.card-padding {
		padding: 15px;
	}
	
	.card-demo-flex > div {
		flex: 1;
		text-align: center;
		font-size: 12px;
	}
	
	.card-demo-flex span {
		color: #f74c31;
	}
	
	.card-horizontal {
		display: flex;
		padding: 0.09rem;
		border-bottom: 1px solid #dfdfdf;
	}
	
	.card-horizontal .card-item {
		flex: 1;
		height: .9rem;
		justify-content: center;
		display: flex;
		align-items: center;
	}
	.card-horizontal .card-item:first-child{
		border-right: 1px solid #dfdfdf;
	}
	/*.card-horizontal .card-item:nth-child(1){
  border-right: 1px solid #dbd8d8;
  }*/
	
	.card-item .card-icon {
		font-size: .7rem;
		display: inline-block;
		border-radius: 50%;
		overflow: hidden;
		width: .7rem;
		height: .7rem;
	}
	
	.card-item .icon-des {
		vertical-align: middle;
		margin-left: .2rem;
		color: #333;
		font-size: .24rem;
		line-height: 1;
		display: inline-block;
		height: .3rem;
	}
	
	.m-panel-box-big {
		color: #333333;
		font-size: .3rem;
		padding: .39rem .30rem;
		display: block;
	}
	
	.m-panel-box-big .m-panel-card {
		display: flex;
		margin-bottom: .2rem;
		justify-content: center;
		align-items: center;
	}
	
	.m-panel-box-big .m-panel-card .m-panel-pic {
		width: 1.84rem;
		height: 1.84rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: .26rem;
		background-color: #eee;
		flex: none;
	}
	
	.m-panel-box-big .m-panel-card .m-panel-flex {
		flex: 1;
	}
	
	.m-panel-box-big .m-panel-flex .title {
		font-size: .36rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: .4rem;
		height: .4rem;
		width: auto;
		margin-bottom: .2rem;
	}
	
	.m-panel-box-big .m-panel-flex .icon {
		font-size: .45rem;
		height: .5rem;
		line-height: .5rem;
		width: .8rem;
		height: .46rem;
		background-position: center;
		background-size: 100%;
		background-image: url(../assets/images/rate1.png);
		background-repeat: no-repeat;
	}
	
	.icon [class^='path'] {
		font-size: .62rem;
	}
	
	.group-no-border-t {
		margin-top: .1rem;
	}
	
	.group-no-border-t:nth-child(1) {
		margin-top: 0px;
	}
	
	.group-no-border-t .weui_cells:nth-child(1) {
		margin-top: 0px;
	}
	
	.group-no-border-t .weui_cells:before,
	.group-no-border-t .weui_cells:after {
		content: "";
		border-top: 0px;
	}
</style>
<script>
  import Group from "vux/src/components/group"
  import Cell from "vux/src/components/cell"
  import Loading from "vux/src/components/loading"
  export default {
  	components:{
	  Group,
	  Cell,
	  Loading
	},
	data(){
		return {
			data:{"UName":"","Nickname":"","HeadPortraits":"","Learn":0.0,"FansCount":0,"LevelImg":null,"Level":null},
			loading:true
		}
	},
	ready:function(){
		this.getData();
	},
	methods:{
		getData:function(){
			this.$http.post('/api/Teacher/GetTeacherHome').then(res => {
				this.$set('data' , res.body.Data);
			})
		}
	}
  }
</script>


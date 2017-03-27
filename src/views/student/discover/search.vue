<template>
	<div class="s-search">
		<form class="s_search-header s_search-form clearfix" @submit.prevent @submit="submit">
			<span class="back-btn m-header-back" v-on:click="back()"><i class="icon icon-back2"></i></span>
			<div class="search clearfix">
				<i class="icon icon-search2"></i>
				<input type="text" autofocus class="search-input" v-model="searchtext" placeholder="搜索">
				<button @click="submit()" class="btn s-search-btn">搜索</button>
			</div>
		</form>
		<ul class="s-cardlist">
			<li class="s-card" v-for="item in list">
				<a class="s-card-fav clearfix" v-link="{name:'discover_expert',params:{'id':item.PK_UID}}">
					<div class="fav border-light"><img :src="item.HeadPortraits"></div>
					<div class="message">
						<h3 class="name">{{item.UName}} <span :style="{'background-image':'url('+ item.LevelImage+')'}" class="level-icon"></span></h3>
						<p class="tags"><span class="tag border-light" v-for="d in item.Domains">{{d}}</span></p>
						<p class="word font-base">{{item.Present}}</p>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				searchtext:"",
				list:[]
			}
		},
		components:{
		},
		methods:{
			back:function(){
				history.back();
			},
			submit:function(){
				this.$http.post("/API/Student/SearchTeacher",{
					"PageIndex":1,
					"PageSize":100, 
					"PK_PFIDS":[],
					"Search":this.searchtext
				}).then(res => {
					this.list = res.body.Data;
				})
			}
		}
	}
</script>
<style>
	.s-search .s-search-btn{
		background-color: #ff9100;
	    border: none;
	    color: #fff;
	    width: 1.2rem;
	    display: inline-block;
	    line-height: .6rem;
	    vertical-align: middle;
	    margin-bottom: 3px;
	    margin-right: 0;
	    font-size: .30rem;
	    outline: none;
	}
	.s-search{
		min-height: 100%;
	}
	.s_search-form{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.s_search-header{
		padding: .1rem .1rem .1rem 0;
		border-bottom: 1px solid #dfdfdf;
		background-color: #fff;
	}
	.s_search-header .back-btn{
		padding: 0 .3rem;
		color:  #ff9100;
		font-size: 20px;
	}
	.s_search-header .back-btn .icon{
		vertical-align: middle;
	}
	.s_search-header .search{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.search{
		font-size:.30rem; 
		border-bottom: 1px solid #ff9100;
	}
	.search .icon{
		color: #ff9100;
		font-size: .3rem;
		vertical-align: middle;

	}
	.search .search-input{
		border:0px;
		outline: 0px;
		line-height: .46rem;
		padding: 3px 5px;
		font-size: .32rem;
	}
	.s-search .s-cardlist{
		padding: 0px .3rem;
	}
	.s-search .s-card{
		padding: .2rem 0 .2rem 0;
		border-bottom: 1px solid #dfdfdf;
	}
</style>
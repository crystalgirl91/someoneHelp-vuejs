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
		<div class="sm-question">
			<ul class="news-vertical">
				<li class="news-item" v-for="item in rows" @click="tolink(item)" >
					<h3 class="title">{{{item.Content}}}</h3>
				</li>
			</ul>
		</div>
	</div>
</template>
<!-- 与search.vue公用样式 -->
<script>
	export default{
		data(){
			return {
				searchtext:"",
				rows:[]
			}
		},
		components:{
		},
		methods:{
			back:function(){
				history.back();
			},
			tolink:function(item){
				if(item.PK_AEID!=""){
					this.$router.go({name:'mycenter_question_detail',params:{'PK_AEID':item.PK_AEID}});
				}	
			},
			submit:function(){
				this.$http.post("/API/Student/SearchAskList",{
					"PageIndex":1,
					"PageSize":100, 
					"Search":this.searchtext
				}).then(res => {
					this.rows = res.body.Data;
					for(var i=0;i<this.rows.length;i++){
						this.rows[i].Content=this.rows[i].Content.replace(this.searchtext,"<span style='color:red;'>"+this.searchtext+"</span>");  
					}
					if(this.rows.length==0){
						this.rows.push({Content:"<span style='color:red;'>没有搜索结果</span>",PK_AEID:""});
					}
				})
			}
		}
	}
</script>

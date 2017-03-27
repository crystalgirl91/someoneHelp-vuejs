<template>
	<tab :line-width="2" :active-color="'#86c82a'">
		<tab-item :selected="block===1" v-on:click="block = 1" title="热度" >热度</tab-item>
		<tab-item :selected="block===2" v-on:click="block = 2" title="最新">最新</tab-item>
	</tab>
	<ul v-if="block===1" class="s-question-list">
		<li class="s-question-item" v-for="item in data[0]">
			<a v-link="{'name':'question_detail',params:{'PK_AEID':item.PK_AEID}}">
				<p class="word font-base-dark">{{item.Content}}</p>
				<div class="yuyin clearfix">
					<div class="yuyin-person"><img :src="item.HeadPortraits"></div>
					<div class="yuyin-mess">
						<div class="tags">
							<span class="name">{{item.UName}}</span>
							<span class="tag" v-for="f in item.Field">{{f}}</span>
						</div>
						<div class="yuyin-comment">
							<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
								<i class="icon icon-voice"></i>
								<span class="bigger">{{item.STypeMessage}}</span>
								<span class="smaller">{{item.STypeSurplus}}</span>
							</span>
							<span class="yuyin-icon"><i class="icon icon-zaixianrenshu"></i>{{item.LookAtCount}}人</span>
						</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
	<ul v-if="block===2" class="s-question-list">
		<li class="s-question-item" v-for="item in data[1]">
			<a v-link="{'name':'question_detail',params:{'PK_AEID':item.PK_AEID}}">
				<p class="word font-base-dark">{{item.Content}}</p>
				<div class="yuyin clearfix">
					<div class="yuyin-person"><img :src="item.HeadPortraits"></div>
					<div class="yuyin-mess">
						<div class="tags">
							<span class="name">{{item.UName}}</span>
							<span class="tag" v-for="f in item.Field">{{f}}</span>
						</div>
						<div class="yuyin-comment">
							<span class="yuyin-comment-item" :class="{'yuyin-comment-normal':item.IsToll,'yuyin-comment-green':!item.IsToll}">
								<i class="icon icon-voice"></i>
								<span class="bigger">{{item.STypeMessage}}</span>
								<span class="smaller">{{item.STypeSurplus}}</span>
							</span>
							<span class="yuyin-icon"><i class="icon icon-zaixianrenshu"></i>{{item.LookAtCount}}人</span>
						</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
</template>
<!-- 和discover中question文件公用样式 -->
<script>
	import {Tab,TabItem} from "vux/src/components/tab"
	export default {
		data(){
			return {
				block:1,
				data:{0:[],1:[],2:[]},
				pageIndex:1,
				pageSize:100
			}
		},
		methods:{
			getList:function(type){
				return this.$http.post("/API/Student/GetPlatformAskList",{
					"GetType":type,
					"PageIndex":this.pageIndex,
					"PageSize":this.pageSize
				}).then(res => {
					this.data[type] = res.body.Data;
					console.log(this.data[0])
				})
			}
		},
		ready:function(){
			this.$watch("block",function(){
				this.getList(this.block - 1);
			})
			this.getList(0);
		},
		components:{
			Tab,
			TabItem
		}
	}
</script>
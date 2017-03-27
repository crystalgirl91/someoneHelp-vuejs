<template>
<div class="m-panel">
	<div class="m-panel-wrap vux-1px-r vux-1px-t vux-1px-l vux-1px-b"  v-for="item in list">
		<a v-link="{'path':'/answer?PK_AEID=item.PK_AEID'}" class="m-panel-box">
			<div class="m-panel-card">
				<div class="m-panel-pic" v-bind:style="{ backgroundImage: 'url(' + item.HeadPortraits + ')'}"></div>
				<div class="m-panel-flex">
					<p class="title">{{item.UName}}</p>
					<p class="time">{{item.TimeStr}}</p>
				</div>
			</div>
			<div class="m-panel-p">{{item.Content}}</div>
		</a>
	</div>
</div>
</template>
<script>
	export default{
		props:{
			list:Array
		}
	}
</script>
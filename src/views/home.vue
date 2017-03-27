<template>
    <tabbar class="m-tabbar">
      <tabbar-item link="/home/question" :selected="hash==='/home/question'" icon-class="icon-wenda">
        <span slot="label">问答</span>
      </tabbar-item>
      <tabbar-item link="/home/course" :selected="hash==='/home/course'" icon-class="icon-weike">
        <span slot="label">微课</span>
      </tabbar-item>
      <!-- <tabbar-item link="/home/mycenter" :selected="hash==='/home/mycenter'" icon-class="icon-my" badge="6"> -->
      <tabbar-item link="/home/mycenter" :selected="hash==='/home/mycenter'" icon-class="icon-my">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <router-view></router-view>
</template>
<script>
  import {Tabbar,TabbarItem} from 'vux/src/components/tabbar';
  export default {
    components:{
      Tabbar,
      TabbarItem
    },
    data(){
      return {
         // hash: location.hash.replace("#!","")
      }
    },
    ready:function(){
      console.log(this.$router)
    }
  }
</script>
<style>
  @import '~vux/dist/vux.css';
  @import '~vux/dist/styles/1px.css';
  @import '../../fonts/style.css';
  @import '../assets/css/common.css';
  .m-tabbar.weui_tabbar{
    position: fixed;
    width: 100%;
    padding: .12rem 0px;
    background-color: #fff;
  }
  .m-tabbar.weui_tabbar:before{
    border-top: 0px;
  }
  .m-tabbar .weui_tabbar_item{
    padding-top: 0px;
    line-height: .1rem;
    display: inline-block;
    height: .78rem;
  }
  .weui_tabbar_item .weui_tabbar_icon{
    font-size: .44rem;
    color: #989698;
    width: .44rem;
    height: auto;
    text-align: center;
  }
  .weui_tabbar_item p.weui_tabbar_label{
    margin-top: .1rem;
    line-height: 1;
    font-size:0.24rem;
  }
  .weui_tabbar_item.weui_bar_item_on .weui_tabbar_icon{
    color: #ea8010;
  }
  .weui_tabbar_item.weui_bar_item_on p.weui_tabbar_label{
    color: #ea8010;
  }
</style>
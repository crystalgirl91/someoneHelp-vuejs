<template>
    <tabbar >
      <tabbar-item link="/home/question" :selected="hash==='/home/question'" icon-class="icon-question-and-answer">
        <span slot="label">问答</span>
      </tabbar-item>
      <tabbar-item link="/home/class" :selected="hash==='/home/class'" icon-class="icon-class">
        <span slot="label">班级</span>
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
         TaskCount:"0",
         hash: location.hash.replace("#!",""),
         isCompany:false
      }
    },
    ready:function(){
      
    }
  }
</script>
<style>
  @import '~vux/dist/vux.css';
  @import '~vux/dist/styles/1px.css';
  @import '../../../fonts/student/style.css';
  @import '../../assets/css/common.css';
  @import '../../assets/css/color.css';

  body{
    /*padding-bottom: 2rem;*/
    color: #333;
    font-size: .28rem;
  }
  div.weui_tabbar{
    position: fixed;
    width: 100%;
    padding: .12rem 0px;
    background-color: #fff;
    border-top: 1px solid #D9D9D9;
  }
  div.weui_tabbar:before{
    border-top: 0px;
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
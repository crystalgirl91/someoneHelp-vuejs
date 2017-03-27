<template>
    <div class="login">
        <h2 class="login-title">有人帮</h2>
        <group class="input-group">
            <x-input :value.sync="loginName" title="登录名"></x-input>
            <x-input :value.sync="loginPwd" title="密 码"></x-input>
            <x-input :value.sync="code" title="专家ID"></x-input>
        </group>
        <x-button type="normal" v-on:click="login()" text="登录"></x-button>
    </div>
    <loading :show.sync="loading" text="加载中"></loading>
</template>
<style>
    @import '~vux/dist/vux.css';
    @import '~vux/dist/styles/1px.css';
    @import '../../fonts/style.css';
    @import '../assets/css/common.css';

        .login {
            font-size: .36rem;
            padding: 0px .48rem;
        }

        .login .login-title {
            font-size: .8rem;
            color: #ea8010;
            text-align: center;
            padding: 1.7rem 0px 1.2rem 0;
            line-height: 1;
        }

        .login .input-group {
            margin-bottom: 1rem;
        }

        .login .weui_label {
            color: #b2b2b2;
            word-spacing: .2rem;
            word-wrap: pre-wrap;
            font-size: .36rem;
        }

        .login .weui_cells {
            margin-top: 0px;
        }

            .login .weui_cells:before {
                border: 0px;
            }

        .login .weui_cell:before {
            left: 0px;
        }
</style>
<script>
  import XButton from 'vux/src/components/x-button'
  import Group from 'vux/src/components/group'
  import XInput from 'vux/src/components/x-input'
  import Loading from "vux/src/components/loading"
  export default {
  components:{
    XButton,
    XInput,
    Group,
    Loading
  },
  data(){
    return {
    loginName:"",//lan
    loginPwd:"",//lan
    code:""//888
    }
  }
  ,
  methods:{
    login:function (event) {
    // 传统写法
      var json={
        abid:window.localStorage.ABID,
        loginName:this.loginName,
        loginPwd:this.loginPwd,
        code:this.code
      };
      this.$http.post('/api/NoPermissions/TeacherLogin', json).then(response => {
        // 响应成功回调
        if(response.body.ErrCode==200){
          window.localStorage.PlatformUser=response.body.Data;
          this.$router.go("/home/mycenter");
        }else{
            alert(response.body.ErrMsg);
        }
      })
    }
  }
  }
</script>
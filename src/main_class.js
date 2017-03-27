import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Loading from 'vux/src/components/loading'

import Main from "./views/class/c_main.vue"
import Home from './views/class/c_home.vue'
import HomeQuestion from './views/class/question/c_question.vue'
import HomeClass from './views/class/class/c_class.vue'
import ClassDetailComment from './views/class/class/c_class_detail_comment.vue'
import HomeClassDetail from './views/class/class/c_class_detail.vue'
import QustionDetail from './views/class/question/c_question_detail.vue'
import QustionAnswer from './views/class/question/c_question_answer.vue'
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.filter("time", function(value){
    // value为秒
    if(Number(value) > -1){
        var seconds = value % 60;
        var minutes = Math.floor(value / 60) % 60;
        var houses = Math.floor(value / 60 / 60);
        return houses + ":" + minutes + ":" + seconds;
    }
    return "00:00:00"
})

const router = new VueRouter()
router.map({
	'/home':{
		component:Home,
		subRoutes:{
			'/question': {
				component: HomeQuestion
			},
			'/class': {
				component: HomeClass
			}
		}
	},
    '/home/class/detail/:PK_TID/:TName':{
        name:'c_class_detail',
        component:HomeClassDetail
    },
    '/question/detail/:PK_AEID':{
        name:"c_question_detaill",
        component:QustionDetail
    },
    '/question/answer/:PK_AEID':{
        name:"c_question_answer",
        component:QustionAnswer
    },
    '/class/detail/comment/:id':{
        name:"c_class_detail_comment",
        component:ClassDetailComment
    }

})
router.redirect({"*":"/home/question"});
router.afterEach((transition) => {
    // 修改微信title,ios下hack
    document.title = '有人帮';
    var body = document.body;
    var iframe = document.createElement('iframe');
    iframe.src = "./assets/images/icon-bg.jpg";
    iframe.style.display = "none";
    iframe.onload = function(){
        setTimeout(function(){
            iframe.remove();
        },10)
    };
    body.appendChild(iframe);
})

//请求拦截权限判断拦截*****************************************************************************************
//设置默认值
//window.localStorage.ABID="7008A27E499B42A19990AF1D557364FC";
//window.localStorage.WeChatUser="{\"openid\":\"op2vWshSy7M2rZ4lYKosUHFM4qIo\",\"nickname\":\"死亡中的独行者\",\"sex\":1,\"province\":\"广东\",\"city\":\"珠海\",\"country\":\"中国\",\"headimgurl\":\"http://wx.qlogo.cn/mmopen/GErrJ4IdcPLugOHLSTHwtZsUib5NEJpJn6ByqI2ScsyicIZcDyic6FLvcad16qo0Osmpk2OKXUO8FqbVI2LUtYhiczibINX2nq2Ix/0\",\"privilege\":[],\"unionid\":null}";
//window.localStorage.PlatformUser = "eyJQS19VSUQiOiI3QzE5QTFGRjEwNDk0RkQ1QTVEMjBDOTMwMzU3RDkyMSIsIlBLX1BJRCI6IjAwRjM4NTMwMDg1QjRDRUI4RkVGQ0MwNDU2MEU4NEQyIiwiU2lnbiI6IjU5RDU3MTAzQTdGQ0RBOTE4NzAwQzk2QkVGREJGOEFGIn0=";
//获取值
var PlatformUser = window.localStorage.PlatformUser;
var WeChatUser = window.localStorage.WeChatUser;
var ABID = window.localStorage.ABID;
var baseUrl = "http://www.365yrb.cn";//"http://192.168.3.72";"http://www.365yrb.cn";//http://192.168.31.84/
Vue.http.interceptors.push(function(request, next){
    //判断
    var PlatformUser = window.localStorage.PlatformUser;
    if(PlatformUser){
        request.headers.set("Authorization",PlatformUser);
    }
    this.$root.$set("loading",true);
    request.url = baseUrl + request.url;
    next((response) => {
        this.$root.$set("loading",false);
        var objbody=response.body;
        if(objbody.ErrCode!=200){
            if(objbody.ErrCode==504){
                //需要重新登录
                //需要登录
                window.location = "/WeChat/WxStudentLogin";
            }
            alert(objbody.ErrMsg);
            return window.Promise.reject(response);
        }
        else{
            return window.Promise.resolve(response);;
        }
    });
});

//请求拦截权限判断拦截*****************************************************************************************
router.start(Main, "#app");
try { 
    var WeChatUserObj = eval("(" + WeChatUser + ")");
    if (ABID != null && ABID != "") {
        //判断是否需要登录
        if (PlatformUser == null || PlatformUser == ""||PlatformUser=="null"||PlatformUser.length<32) {
            //需要登录
            window.location = "/WeChat/WxStudentLogin";
        } else {
            // router.go("/home/question");
        }
    } else {
        //从新授权
        window.location = "/WeChat/WxStudentLogin";
    }
} catch (e) {
    //从新授权
    window.location = "/WeChat/WxStudentLogin";
}

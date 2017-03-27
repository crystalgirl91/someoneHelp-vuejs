import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Loading from 'vux/src/components/loading'
import Home from './views/home.vue'
// import MyClassList from './views/myclasslist.vue'
// import MyClassInfo from './views/myclassinfo.vue'

import MyCenter from './views/mycenter.vue'
import Course from './views/course.vue'
import CourseDetail from './views/course_detail.vue'
import Question from './views/question.vue'
import Answer from "./views/answer.vue"
import AnswerSub from "./views/answer_sub.vue"
import Replyanswer from "./views/replyanswer.vue"
import Tuiguang from './views/mycenter/tuiguang.vue'
import TeacherDetail from "./views/mycenter/tuiguang_teacher_detail.vue"
import TuiguangRecharge from "./views/mycenter/tuiguang_recharge.vue"
import TradeRecord from "./views/mycenter/trade_record.vue"
import MyStudent from "./views/mycenter/my_student.vue"
import MyClass from "./views/mycenter/my_class.vue"
import MyClassDetail from "./views/mycenter/my_class_detail.vue"
import MyClassDetailComment from "./views/mycenter/my_class_detail_comment.vue"
import MyQrcord from "./views/mycenter/my_qrcode.vue"
import MyActivity from "./views/mycenter/my_activity.vue"
import MyActiveList from "./views/mycenter/my_activity_list.vue"
import MyActiveApplay from "./views/mycenter/my_activity_applys.vue"
import MyApply from "./views/mycenter/my_apply.vue"
import Setting from "./views/mycenter/setting.vue"
import SettingPersonal from "./views/mycenter/setting_personal.vue"
import SettingDocument from "./views/mycenter/setting_document.vue"
import SettingMoney from "./views/mycenter/setting_money.vue"
import SettingBank from "./views/mycenter/setting_bank.vue"
import SettingExperts from "./views/mycenter/setting_experts.vue"
import Main from "./views/main.vue"
import LoginHome from './views/login.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()
router.map({
    '/login':{
        title:"登录",
        component:LoginHome
    },
    '/home':{
        component:Home,
        subRoutes:{
            '/mycenter': {
                title:"我的",
                component: MyCenter
            },
            '/course': {
                title:"微课",
                component: Course
            },
            '/question': {
                title:"问答",
                component: Question
            }
        }
    },
    '/answer':{
        title:"回答",
        component: Answer
    },
    '/answer_sub':{
        title:"发微课",
        component: AnswerSub
    },
    '/replyanswer':{
        title:"发回复",
        component: Replyanswer
    },
    '/tuiguang/:PK_UID':{
        title:"推广",
        name:"tuiguang",
        component:Tuiguang
    },
    '/tuiguang_recharge':{
        title:"充值",
        component: TuiguangRecharge
    },
    '/teacher_detail':{
        title:"老师详情",
        component:TeacherDetail
    },
    '/myrecord':{
        title:"交易记录",
        component: TradeRecord
    },
    '/mystudent':{
        title:"我的学员",
        component: MyStudent
    },
    '/myclass':{
        title:"我的班级",
        component: MyClass
    },
    // '/myclasslist':{
    //     title:"我的班级",
    //     component: MyClassList
    // },
    // '/myclassinfo':{
    //     title:"班级信息",
    //     component: MyClassInfo
    // },
    '/myclass/detail/:id':{
        name:"myclass_detail",
        component: MyClassDetail
    },
    '/myclass/detail/comment/:id':{
        name:"myclass_detail_comment",
        component: MyClassDetailComment
    },
    '/myqrcord':{
        title:"我的二维码",
        component: MyQrcord
    },
    '/myactive':{
        title:"发布活动",
        component: MyActivity
    },
    '/my_active_list':{
        title:"已发布",
        component: MyActiveList
    },
    '/myapply':{
        title:"提款申请",
        component: MyApply
    },
    '/mysetting':{
        title:"我的设置",
        component:Setting
    },
    '/setting_personal':{
        title:"个人设置",
        component:SettingPersonal
    },
    '/setting_document':{
        title:"个人简介",
        component:SettingDocument
    },
    '/setting_money':{
        title:"价格设置",
        component:SettingMoney
    },
    '/setting_bank':{
        title:"银行信息",
        component: SettingBank
    },
    '/setting_experts':{
        title:"添加专家库",
        component: SettingExperts
    },
    '/course_detail':{
        title:"微课详情",
        component: CourseDetail
    },
    '/my_activity_applys':{
        title:"报名信息",
        component:MyActiveApplay
    }
})

//请求拦截权限判断拦截*****************************************************************************************
//设置默认值---------------------------------------------------
//window.localStorage.ABID="4A901C85A41247BF838E7DEA37172472";
//window.localStorage.WeChatUser="{\"openid\":\"op2vWshSy7M2rZ4lYKosUHFM4qIo\",\"nickname\":\"死亡中的独行者\",\"sex\":1,\"province\":\"广东\",\"city\":\"珠海\",\"country\":\"中国\",\"headimgurl\":\"http://wx.qlogo.cn/mmopen/GErrJ4IdcPLugOHLSTHwtZsUib5NEJpJn6ByqI2ScsyicIZcDyic6FLvcad16qo0Osmpk2OKXUO8FqbVI2LUtYhiczibINX2nq2Ix/0\",\"privilege\":[],\"unionid\":null}";
//window.localStorage.PlatformUser="eyJQS19VSUQiOiI3REYzRDZEMjFCOTg0MTQ5QTgxM0ZFMkUxRURDRkQwMCIsIlBLX1BJRCI6IjAwQUIwRTlFQ0U2MDQ2RDk5NUM0RTExMUVBNjUxRTc4IiwiU2lnbiI6IjcwMzg3RDY5NzAyNDU5MkZBMDFDQUUxMzk1RDc5NTIyIn0=";
//获取值
var PlatformUser = window.localStorage.PlatformUser;
var WeChatUser = window.localStorage.WeChatUser;
var ABID = window.localStorage.ABID;
var baseUrl ="http://www.365yrb.cn"; //"http://www.365yrb.cn";//"http://192.168.3.72";"http://www.365yrb.cn";//http://192.168.31.84/
//设置默认值---------------------------------------------------
Vue.http.interceptors.push(function(request, next){
    //判断
    var PlatformUser = window.localStorage.PlatformUser;
    if(PlatformUser){
        request.headers.set("Authorization",PlatformUser);
    }
    this.$set("loading",true);
    request.url = baseUrl + request.url;
    next((response) => {
        this.$set("loading",false);
    var objbody=response.body;
    if(objbody.ErrCode!=200){
        if(objbody.ErrCode==504){
            //需要重新登录
            //需要登录 
           router.go("/login");
        }
        //这里写一个提示
        alert(objbody.ErrMsg);
        return window.Promise.resolve(response);
    }else{
        return window.Promise.resolve(response);
    }
    });
});

//请求拦截权限判断拦截*****************************************************************************************
router.start(Main,"#app");
router.afterEach(function(transition){
    document.title = '有人帮';
    // 修改微信title,ios下hack
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
//登录控制*********************************************************
try { 
    //判断是否需要
    if(window.location.toString().indexOf("#!/tuiguang")==-1){
        var WeChatUserObj = eval("(" + WeChatUser + ")");
            if (ABID != null && ABID != "") {
                //判断是否需要登录
                if (PlatformUser == null || PlatformUser == ""||PlatformUser=="null"||PlatformUser.length<32) {
                    //需要登录
                    router.go("/login");
                } else {
                    //不需要登录就去个人首页
                    if("#!/login"!=window.location.hash){
                        
                    }else{
                        router.go("/home/mycenter");
                    }
                }
            } else {
                //从新授权
                window.location = "/WeChat/WxTeacherLogin";
            }
    }
} catch (e) {
    //从新授权
    alert("错误消息："+e);
    window.location = "/WeChat/WxTeacherLogin";
}
//登录控制*********************************************************








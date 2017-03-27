import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Loading from 'vux/src/components/loading'
import Home from "./views/student/s_home.vue"
import MyCenter from './views/student/s_center.vue'
import Plat from './views/student/plat/p_home.vue'
import Discover from './views/student/discover/discover.vue'
import Login from './views/student/s_login.vue'
import LoginRegist from './views/student/login/l_regist.vue'
import LoginPassword from './views/student/login/l_password.vue'
import CreditRecord from './views/student/mycenter/credit_record.vue'
import DiscoverCourse from './views/student/discover/course.vue'
import DiscoverExpert from './views/student/discover/expert.vue'
import ClassBuy from './views/student/mycenter/m_class_buy.vue'
import DiscoverClassDetail from './views/student/discover/d_class_detail.vue'
import Main from "./views/student/s_main.vue"
import Sidepull from "./views/student/discover/sidepull.vue"
import PlatClass from "./views/student/plat/p_class.vue"
import PlatClassDetail from "./views/student/plat/p_class_detail.vue"
import PlatCourseDetail from "./views/student/plat/p_course_detail.vue"
import PlatActivity from "./views/student/plat/p_activity.vue"
import DiscoverActivity from "./views/student/discover/d_activity.vue"
import PlatActivityDetail from "./views/student/plat/p_activity_detail.vue"
import PlatPoint from "./views/student/plat/p_point.vue"
import PlatMark from "./views/student/plat/p_mark.vue"
import PlatProduct from "./views/student/plat/p_product.vue"
import PlatStudent from "./views/student/plat/p_student.vue"
import PlatKnowledge from "./views/student/plat/p_knowledge.vue"
import MClass from "./views/student/mycenter/m_class.vue"
import MQrcode from "./views/student/mycenter/m_qrcode.vue"
import MKnowledge from "./views/student/mycenter/m_knowledge.vue"
import MQuestion from "./views/student/mycenter/m_question.vue"
// import MQuestionDetail from "./views/student/mycenter/m_question_detail.vue"
import MQuestionBuy from "./views/student/mycenter/m_question_buy.vue"
import MRecord from "./views/student/mycenter/m_record.vue"
import MExpert from "./views/student/mycenter/m_expert.vue"
import MRecharge from "./views/student/mycenter/m_recharge.vue"
import MSetting from "./views/student/mycenter/m_setting.vue"
import MTask from "./views/student/mycenter/m_task.vue"
import MFollow from "./views/student/mycenter/m_follow.vue"
import Search from "./views/student/discover/search.vue"
import PlatCourseComment from "./views/student/plat/p_course_comment"

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
			'/mycenter': {
				component: MyCenter
			},
			'/plat': {
				component: Plat
			},
			'/discover': {
				component: Discover
			}
		}
	},
	'/login':{
		component:Login
	},
    '/login_regist':{
        component:LoginRegist
    },
    '/login_regist_person':{
        component:function(resolve){
            return require(["./views/student/login/l_regist_person.vue"],resolve)
        }
    },
    '/login_regist_company':{
        component:function(resolve){
            return require(["./views/student/login/l_regist_compony.vue"],resolve)
        }
    },
    '/login_password':{
        component: LoginPassword
    },
	'/center_credit_record':{
		component:CreditRecord
	},
    '/discover_course/:id':{
        name:"discover_course",
        component:DiscoverCourse
    },
    '/discover_expert/:id':{
        name:"discover_expert",
        component:DiscoverExpert
    },
    '/discover_add_expert':{
        name:"discover_add_expert",
        component: function(res){
            return require(["./views/student/discover/add_expert.vue"],res)
        }
    },
    '/discover_add_meet':{
        component: function(res){
            return require(["./views/student/discover/add_expert_meet.vue"],res)
        }
    },
    '/discover_add_teach':{
        component: function(res){
            return require(["./views/student/discover/add_expert_teach.vue"],res)
        }
    },
    '/discover_add_speek':{
        component: function(res){
            return require(["./views/student/discover/add_expert_speek.vue"],res)
        }
    },
    '/discover_add_consult':{
        component: function(res){
            return require(["./views/student/discover/add_expert_consult.vue"],res)
        }
    },
    '/discover_message':{
         component: function(res){
            return require(["./views/student/discover/d_message.vue"],res)
        }
    },
    '/discover_question/:id':{
        name:"discover_question",
        component: function(res){
            return require(["./views/student/discover/d_question.vue"],res)
        }
    },
    '/discover_message_detail/:PK_MNID':{
        name:"discover_message_detail",
        component: function(res){
            return require(["./views/student/discover/d_message_detail.vue"],res)
        }
    },
    '/discorver_recharge':{
        component: function(res){
            return require(["./views/student/discover/d_recharge.vue"],res)
        }
    },
    '/discover_question_comment/:id':{
        name:"discover_question_comment",
        component: function(res){
            return require(["./views/student/discover/d_comment.vue"],res)
        }
    },
    '/discover_class_detail/:PK_TID':{
        name:"discover_class_detail",
        component:DiscoverClassDetail
    },
     '/class_buy/:PK_UID':{
         name:"class_buy",
         component:ClassBuy
     },
    '/search':{
        component: Search
    },
    '/search_ask':{
        component: function(res){
            return  require(["./views/student/discover/search_ask.vue"],res)
        }
    },
    '/sidepull':{
        component:Sidepull
    },
    '/plat_class':{
        component: PlatClass
    },
    '/plat_class_detail/:id/:group':{
        name:"plat_class_detail",
        component: PlatClassDetail
    },
    '/plat_course_detail/:PK_CID':{
        name:"plat_course_detail",
        component: PlatCourseDetail
    },
    '/plat_course_comment/:PK_CID':{
        name:"plat_course_comment",
        component:PlatCourseComment
    },
    '/plat_activity':{
        component: PlatActivity
    },
    '/discover_activity/:id':{
        name:"discover_activity",
        component: DiscoverActivity
    },
    '/plat_activity_detail/:PK_AID':{
        name:"plat_activity_detail",
        component: PlatActivityDetail
    },
    '/plat_point':{
        component: PlatPoint
    },
    '/plat_mark':{
        component:PlatMark
    },
    '/plat_product/:PK_ISID':{
        name:"plat_product",
        component:PlatProduct
    },
    '/plat_student/:PK_TID':{
        name:"plat_student",
        component:PlatStudent
    },
    '/plat_knowledge':{
        component:PlatKnowledge
    },
    '/plat/question/:id':{
        name:"plat_question",
        component:function(res){
            return  require(["./views/student/plat/p_question.vue"],res)
        }
    },
    '/plat_exam':{
        component:function(res){
            return require(["./views/student/plat/p_exam.vue"],res)
        }
    },
    '/plat_exam_now/:PK_EID':{
        name:"plat_exam_now",
        component:function(res){
            return require(["./views/student/plat/p_exam_now.vue"],res)
        }
    },
    '/plat_ask':{
        component:function(res){
            return require(["./views/student/plat/p_ask.vue"],res)
        }
    },
    '/plat_ask_detail':{
        component:function(res){
            return require(["./views/student/plat/p_ask_detail.vue"],res)
        }
    },
    '/mycenter/class':{
        component: MClass
    },
    '/mycenter/qrcode':{
        component: MQrcode
    },
    '/mycenter/knowledge':{
        component:MKnowledge
    },
    '/mycenter/question':{
        component:MQuestion
    },
    '/mycenter/question/detail/:PK_AEID':{
        // component: MQuestionDetail
        name:"mycenter_question_detail",
        component:function(res){
            return require(["./views/student/plat/p_ask_detail.vue"],res)
        }
    },
    '/question_detail/:PK_AEID':{
        name:"question_detail",
        component:function(res){
            return require(["./views/student/plat/p_ask_detail.vue"],res)
        }
    },
    '/mycenter/question/buy/:id':{
        name:"question_buy",
        component: MQuestionBuy
    },
    '/mycenter/record':{
        component: MRecord
    },
    '/mycenter/expert':{
        component: MExpert
    },
    "/mycenter/recharge":{
        component: MRecharge
    },
    "/mycenter/setting":{
        component: MSetting
    },
    "/mycenter/task":{
        component: MTask
    },
    "/mycenter/follow":{
        component:MFollow
    }
})
router.redirect({"*":"/home/discover"});
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
//window.localStorage.ABID="4A901C85A41247BF838E7DEA37172472";
// window.localStorage.WeChatUser="{\"openid\":\"op2vWshSy7M2rZ4lYKosUHFM4qIo\",\"nickname\":\"死亡中的独行者\",\"sex\":1,\"province\":\"广东\",\"city\":\"珠海\",\"country\":\"中国\",\"headimgurl\":\"http://wx.qlogo.cn/mmopen/GErrJ4IdcPLugOHLSTHwtZsUib5NEJpJn6ByqI2ScsyicIZcDyic6FLvcad16qo0Osmpk2OKXUO8FqbVI2LUtYhiczibINX2nq2Ix/0\",\"privilege\":[],\"unionid\":null}";
// window.localStorage.PlatformUser = "eyJQS19VSUQiOiI3QzE5QTFGRjEwNDk0RkQ1QTVEMjBDOTMwMzU3RDkyMSIsIlBLX1BJRCI6IjAwRjM4NTMwMDg1QjRDRUI4RkVGQ0MwNDU2MEU4NEQyIiwiU2lnbiI6IjU5RDU3MTAzQTdGQ0RBOTE4NzAwQzk2QkVGREJGOEFGIn0=";
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
                router.go("/login");
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
//登录控制*********************************************************
try { 
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
               router.go("/home/discover");
            } 
        }
    } else {
        //从新授权
        window.location = "/WeChat/WxStudentLogin";
    }
} catch (e) {
    //从新授权
    window.location = "/WeChat/WxStudentLogin";
}
//登录控制*********************************************************


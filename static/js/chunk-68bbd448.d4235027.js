(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68bbd448"],{"10a1":function(t,e,s){"use strict";s("c454")},"360f":function(t,e,s){"use strict";s("e02e")},"55f3":function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"social-signup-container"},[s("div",{staticClass:"sign-btn",on:{click:function(e){return t.wechatHandleClick("wechat")}}},[s("span",{staticClass:"wx-svg-container"},[s("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),t._v(" WeChat ")]),s("div",{staticClass:"sign-btn",on:{click:function(e){return t.tencentHandleClick("tencent")}}},[s("span",{staticClass:"qq-svg-container"},[s("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),t._v(" QQ ")])])},n=[],a={name:"SocialSignin",methods:{wechatHandleClick:function(t){alert("ok")},tencentHandleClick:function(t){alert("ok")}}},r=a,i=(s("10a1"),s("2877")),c=Object(i["a"])(r,o,n,!1,null,"7c479358",null);e["a"]=c.exports},"5e3b":function(t,e,s){},6733:function(t,e,s){"use strict";s("5e3b")},b106:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"registerForm",staticClass:"login-form",attrs:{model:t.registerForm,autocomplete:"on","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[t._v("Register Form")])]),s("el-form-item",{attrs:{prop:"name"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"name",attrs:{placeholder:"Name",name:"Name",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.registerForm.name,callback:function(e){t.$set(t.registerForm,"name",e)},expression:"registerForm.name"}})],1),s("el-form-item",{attrs:{prop:"email"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"email",attrs:{placeholder:"Email",name:"email",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.registerForm.email,callback:function(e){t.$set(t.registerForm,"email",e)},expression:"registerForm.email"}})],1),s("el-form-item",{attrs:{prop:"phone"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"phone",attrs:{placeholder:"Phone",name:"phone",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.registerForm.phone,callback:function(e){t.$set(t.registerForm,"phone",e)},expression:"registerForm.phone"}})],1),s("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),s("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleRegister(e)}]},model:{value:t.registerForm.password,callback:function(e){t.$set(t.registerForm,"password",e)},expression:"registerForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),s("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),s("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Confirm Password",name:"password_confirmation",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleRegister(e)}]},model:{value:t.registerForm.password_confirmation,callback:function(e){t.$set(t.registerForm,"password_confirmation",e)},expression:"registerForm.password_confirmation"}}),s("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),s("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleRegister(e)}}},[t._v("Register")]),s("div",[s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"tips",staticStyle:{"margin-top":"0.2rem"}},[s("hr")])])],1),s("el-row",{attrs:{align:"center",type:"flex"}},[s("el-col",{staticClass:"redirect",attrs:{span:17}},[t._v(" Already have an account? "),s("router-link",{attrs:{to:"/login"}},[t._v("Log In")])],1),s("el-col",{staticClass:"thirdparty",attrs:{span:7}},[s("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(e){t.showDialog=!0}}},[t._v(" Or connect with ")])],1)],1)],1)],1),s("el-dialog",{attrs:{title:"Or connect with",visible:t.showDialog},on:{"update:visible":function(e){t.showDialog=e}}},[t._v(" Can not be simulated on local, so please combine you own business simulation! ! ! "),s("br"),s("br"),s("br"),s("social-sign")],1)],1)},n=[],a=(s("13d5"),s("d3b7"),s("b64b"),s("55f3")),r={name:"Register",components:{SocialSign:a["a"]},data:function(){return{registerForm:{name:"",email:"",phone:"",password:"",password_confirmation:""},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},mounted:function(){""===this.registerForm.email?this.$refs.email.focus():""===this.registerForm.password&&this.$refs.password.focus()},methods:{checkCapslock:function(t){var e=t.key;this.capsTooltip=e&&1===e.length&&e>="A"&&e<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleRegister:function(){var t=this;this.$refs.registerForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("auth/register",t.registerForm).then((function(){t.loading=!1,window.location.href="/"})).catch((function(){t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(e,s){return"redirect"!==s&&"admin_token"!==s&&(e[s]=t[s]),e}),{})}}},i=r,c=(s("360f"),s("6733"),s("2877")),l=Object(c["a"])(i,o,n,!1,null,"53879d7c",null);e["default"]=l.exports},c454:function(t,e,s){},e02e:function(t,e,s){}}]);
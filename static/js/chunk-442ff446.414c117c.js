(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-442ff446"],{"37ff":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s=a("b775");function n(t){return Object(s["a"])({url:"/client/companies",method:"get",params:t})}},ce1b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("Companies",{attrs:{companies:t.list}})],1)},n=[],r=a("37ff"),i=a("d5f4"),o={name:"ExperienceList",data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,per_page:5}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(r["a"])(this.listQuery).then((function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1}))},formatDate:function(t){return t?new Date(t).toLocaleString("en-us",{month:"short",year:"numeric"}):"Present"}},components:{Companies:i["a"]}},l=o,c=a("2877"),u=Object(c["a"])(l,s,n,!1,null,null,null);e["default"]=u.exports},d5f4:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",[a("h3",{staticClass:"uppercase mb-1"},[t._v("Experience")])]),a("el-col",{attrs:{span:24}},[t.companies.length>0?a("el-row",{attrs:{gutter:12}},t._l(t.companies,(function(e){return a("div",{key:e._id,staticClass:"card cursor-pointer"},[a("a",{staticClass:"transition-link-ext",attrs:{href:e.url,target:"_blank"}},[a("el-row",{attrs:{type:"flexwrap"}},[a("el-col",{attrs:{xs:24,span:6}},[a("h4",{staticClass:"text-lightgray"},[t._v(t._s(t.formatDate(e.start_date)+" — "+t.formatDate(e.end_date))+" ")])]),a("el-col",{attrs:{xs:24,span:18}},[a("h3",{staticClass:"flex justify-between align-center mb-1"},[a("div",{staticClass:"flex justify-between align-center gap-2"},[a("div",{staticClass:"company_logo"},[a("img",{attrs:{src:e.logo,alt:e.name+" logo"}})]),t._v(" "+t._s(e.name)+" ")]),a("i",[a("svg-icon",{attrs:{"icon-class":"link"}})],1)]),a("h4",{staticClass:"text-darkgray mb-1"},[t._v(t._s(e.position))]),a("p",{domProps:{innerHTML:t._s(e.roles)}})])],1)],1)])})),0):a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"card"},t._l([1,2],(function(t){return a("content-placeholders",{key:t,attrs:{animated:!0,rounded:!0}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("content-placeholders-text",{attrs:{lines:1}})],1),a("el-col",{attrs:{span:18}},[a("content-placeholders-heading",{attrs:{img:!0}}),a("content-placeholders-text",{attrs:{lines:3}})],1)],1)],1)})),1)])],1)],1)},n=[],r={props:{companies:{Array:Array}},methods:{formatDate:function(t){return t?new Date(t).toLocaleString("en-us",{month:"short",year:"numeric"}):"Present"}}},i=r,o=a("2877"),l=Object(o["a"])(i,s,n,!1,null,null,null);e["a"]=l.exports}}]);
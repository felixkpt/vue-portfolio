(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dd9e8c4"],{"2cd8":function(t,e,a){},"592f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[t.listLoading||0!==t.total?t._e():a("el-row",{attrs:{justify:"end",align:"right",type:"flex"}},[a("div",[a("el-button",{staticClass:"el-button--primary el-button--large",on:{click:t.addAbout}},[t._v("Add about")])],1)]),a("about-form-dialog",{attrs:{"in-state-one":t.adding,visible:t.aboutDialogOpen,loading:t.loading,data:t.aboutData},on:{"update:visible":function(e){t.aboutDialogOpen=e},"update:loading":function(e){t.loading=e},confirm:t.confirmAbout}}),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"ID",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row._id))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"Featured image","min-width":"220px"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-row",{attrs:{align:"center",type:"flex"}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"item-logo"},[a("img",{attrs:{src:t.row.featured_image,alt:"Featured image"}})])])],1)]}}])}),a("el-table-column",{attrs:{align:"center",label:"Title"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s((e.row.salutation?e.row.salutation+". ":"")+e.row.name)+" ")])]}}])}),a("el-table-column",{attrs:{align:"center",label:"Slogan"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{domProps:{innerHTML:t._s(e.row.slogan)}})]}}])}),a("el-table-column",{attrs:{align:"center",label:"Content Short","min-width":"220px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{domProps:{innerHTML:t._s(e.row.content_short)}})]}}])}),a("el-table-column",{attrs:{align:"center",label:"Created At"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(new Intl.DateTimeFormat("en-US").format(new Date(e.row.created_at))))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"Author"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.user.name))])]}}])}),a("el-table-column",{attrs:{"class-name":"status-col",label:"Status",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-tag",{attrs:{type:t._f("statusFilter")(n.status)}},[t._v(" "+t._s(n.status)+" ")])]}}])}),a("el-table-column",{attrs:{align:"center",label:"Actions",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{staticClass:"avatar-container right-menu-item hover-effect",attrs:{trigger:"click"}},[a("div",{staticClass:"avatar-wrapper"},[a("i",{staticClass:"el-icon-caret-bottom"}),a("svg-icon",{attrs:{"icon-class":"nested"}})],1),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[a("div",{on:{click:function(a){return t.editAbout(e.row)}}},[a("i",{staticClass:"el-icon-edit"}),t._v(" Edit ")])]),a("el-dropdown-item",[a("div",{on:{click:function(a){return t.changeStatus(e.row._id)}}},[a("i",{staticClass:"el-icon-turn-off"}),t._v(" "+t._s(e.status?"Deactivate":"Activate")+" ")])])],1)],1)]}}])})],1)],1)},o=[],i=a("c7eb"),r=a("1da1"),s=a("5530"),l=(a("d3b7"),a("b775"));function c(t){return Object(l["a"])({url:"/admin/about",method:"get",params:t})}function u(t){return Object(l["a"])({url:"/admin/about",method:"post",data:t})}function d(t,e){return Object(l["a"])({url:"/admin/about/"+e,method:"put",data:t})}function f(t){return Object(l["a"])({url:"/admin/about/change-status/"+t,method:"post"})}var m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"form",attrs:{model:t.data}},[a("el-form-item",{attrs:{label:"Salutation",prop:"salutation"}},[a("el-input",{attrs:{name:"salutation"},model:{value:t.data.salutation,callback:function(e){t.$set(t.data,"salutation",e)},expression:"data.salutation"}})],1),a("el-form-item",{attrs:{label:"Name",prop:"name"}},[a("el-input",{attrs:{name:"name"},model:{value:t.data.name,callback:function(e){t.$set(t.data,"name",e)},expression:"data.name"}})],1),a("el-form-item",{attrs:{label:"Slogan",prop:"slogan"}},[a("el-input",{attrs:{name:"slogan"},model:{value:t.data.slogan,callback:function(e){t.$set(t.data,"slogan",e)},expression:"data.slogan"}})],1),a("el-form-item",{staticStyle:{"margin-bottom":"40px"},attrs:{"label-width":"70px",label:"Summary:"}},[a("el-input",{staticClass:"post-textarea",attrs:{name:"content_short",rows:1,type:"textarea",autosize:"",placeholder:"Please enter the content"},model:{value:t.data.content_short,callback:function(e){t.$set(t.data,"content_short",e)},expression:"data.content_short"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:t.contentShortLength,expression:"contentShortLength"}],staticClass:"word-counter"},[t._v(t._s(t.contentShortLength)+"words")])],1),a("el-form-item",{attrs:{prop:"content"}},[a("Tinymce",{ref:"editor",attrs:{name:"content",height:400},model:{value:t.data.content,callback:function(e){t.$set(t.data,"content",e)},expression:"data.content"}})],1),a("el-form-item",{staticStyle:{"margin-bottom":"30px"},attrs:{prop:"featured_image"}},[a("Upload",{attrs:{withBlob:!0},on:{blob:t.blobGen},model:{value:t.data.featured_image,callback:function(e){t.$set(t.data,"featured_image",e)},expression:"data.featured_image"}})],1)],1)},b=[],p=a("8256"),g=a("70a2"),h={props:{inStateOne:Boolean},data:function(){return{data:{},skillsList:[]}},computed:{defaultData:function(){return{salutation:"",name:"",slogan:"",content_short:"",content:"",featured_image:"",featured_image_blob:""}},contentShortLength:function(){var t;return null===(t=this.data.content_short)||void 0===t?void 0:t.length}},methods:{_setData:function(t){this.data=Object(s["a"])({},t)},_getData:function(){return Object(s["a"])({},this.data)},blobGen:function(t){return this.data.featured_image_blob=t}},components:{Tinymce:p["a"],Upload:g["a"]}},_=h,v=a("2877"),w=Object(v["a"])(_,m,b,!1,null,null,null),k=w.exports,O=a("04d8"),x=Object(O["createFormDialog"])({stateOneTitle:"Add about",stateTwoTitle:"Edit about",confirmText:"Save",cancelText:"Cancel"})(k),S={name:"PostList",components:{AboutFormDialog:x},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,per_page:10},dialogOpen:!1,adding:!1,data:{},aboutDialogOpen:!1,aboutData:{salutation:"",name:"",slogan:"",content_short:"",content:"",featured_image:"",featured_image_blob:""},loading:!1}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,c(this.listQuery).then((function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1}))},addAbout:function(){this.adding=!0,this.aboutDialogOpen=!0},editAbout:function(t){this.aboutData=Object(s["a"])(Object(s["a"])({},this.aboutData),t),this.adding=!1,this.aboutDialogOpen=!0},confirmAbout:function(t){var e=this;return Object(r["a"])(Object(i["a"])().mark((function a(){return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.loading=!0,!e.adding){a.next=6;break}return a.next=4,u(t).then((function(t){e.aboutDialogOpen=!1,e.$message(t.message),e.getList()})).finally((function(){return e.loading=!1}));case 4:a.next=8;break;case 6:return a.next=8,d(t,t._id).then((function(t){e.aboutDialogOpen=!1,e.$message(t.message),e.getList()})).finally((function(){return e.loading=!1}));case 8:case"end":return a.stop()}}),a)})))()},changeStatus:function(t){var e=this;return Object(r["a"])(Object(i["a"])().mark((function a(){return Object(i["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,f(t).then((function(t){e.$message(t.message),e.getList()}));case 2:case"end":return a.stop()}}),a)})))()}}},y=S,j=(a("c89f"),Object(v["a"])(y,n,o,!1,null,"309983bc",null));e["default"]=j.exports},"69d8":function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var n=a("bc7b"),o=a("1902"),i=a("6a92"),r={apiKey:"AIzaSyC-Ov3ssN6fFJQY5sYVVg7MPxzCbefLfk0",authDomain:"book-management-app-c1f9c.firebaseapp.com",projectId:"book-management-app-c1f9c",storageBucket:"book-management-app-c1f9c.appspot.com",messagingSenderId:"739964090155",appId:"1:739964090155:web:cea4a6a0f3db0d1857776e"},s=Object(n["a"])(r),l=(Object(o["a"])(s),Object(i["b"])(s))},c89f:function(t,e,a){"use strict";a("2cd8")},d961:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var n=a("b775");function o(t){return Object(n["a"])({url:"/admin/generate-blob",method:"post",data:t})}},e9bb:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var n=a("b775");function o(){return Object(n["a"])({url:"/qiniu/upload/token",method:"get"})}}}]);
(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[900],{87760:function(Pe,R,t){"use strict";t.r(R);var ve=t(89198),f=t(41205),Ce=t(26780),g=t(86444),x=t(13378),Fe=t(45030),z=t(1512),Ze=t(68137),l=t(39394),ye=t(66120),V=t(4867),Be=t(25324),$=t(45733),Ae=t(43623),C=t(28930),Re=t(74491),h=t(90383),ge=t(13753),E=t(48429),he=t(97140),j=t(69178),m=t(52663),F=t(68699),Te=t(67604),r=t(47552),o=t(44742),k=t(94043),i=t.n(k),e=t(67294),D=t(44084),G=t(18586),d=t(24480),c=t(23948),Y=t(46111),I=t(96486),Ue=t.n(I),T=D.Z.ORDER_ALL_URL,H=D.Z.ORDER_PAY_URL,J=D.Z.ORDER_CANCEL_URL,Q=D.Z.ORDER_STATUS_URL,X=D.Z.ORDER_UPDATE_URL,w=D.Z.ORDER_CONFIRM_URL,q=function(){var ee=(0,e.useState)([]),U=(0,o.Z)(ee,2),te=U[0],L=U[1],ae=(0,e.useState)([]),p=(0,o.Z)(ae,2),pe=p[0],be=p[1],ne=(0,e.useState)({current:1,pageSize:10,total:0}),b=(0,o.Z)(ne,2),M=b[0],W=b[1],ue=(0,e.useState)(!1),K=(0,o.Z)(ue,2),We=K[0],Ke=K[1],re=(0,e.useState)(!1),N=(0,o.Z)(re,2),se=N[0],Z=N[1],_e=(0,e.useState)(!1),S=(0,o.Z)(_e,2),le=S[0],y=S[1],oe=r.Z.useForm(),de=(0,o.Z)(oe,1),B=de[0],me=r.Z.useForm(),Ee=(0,o.Z)(me,1),Ne=Ee[0],ie=r.Z.useForm(),De=(0,o.Z)(ie,1),A=De[0],O=function(){var s=(0,F.Z)(i().mark(function n(){var a,u;return i().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return a=(0,m.Z)((0,m.Z)({},B.getFieldsValue()),{},{size:M.pageSize,page:M.current-1}),_.next=3,(0,d.kk)(T,a);case 3:u=_.sent,u&&(L(u.data),W((0,m.Z)((0,m.Z)({},M),{},{total:u.data.totalElements})));case 5:case"end":return _.stop()}},n)}));return function(){return s.apply(this,arguments)}}(),ce=function(){var s=(0,F.Z)(i().mark(function n(){var a,u;return i().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:if(a=B.getFieldsValue().status,console.log(a),console.log(Number(a)),a!==""){_.next=9;break}return _.next=6,(0,d.kk)(T,"");case 6:u=_.sent,_.next=12;break;case 9:return _.next=11,(0,d.nW)(Q,Number(a));case 11:u=_.sent;case 12:u&&L(u.data);case 13:case"end":return _.stop()}},n)}));return function(){return s.apply(this,arguments)}}();(0,e.useEffect)(function(){O()},[M.current]);function fe(s){console.log(s)}var Ie=function(n){console.log(n),A.setFieldsValue((0,m.Z)((0,m.Z)({},n),{},{address:[n.addressProvince,n.addressCity,n.addressDistinct]})),Z(!0)},Me=function(){var s=(0,F.Z)(i().mark(function n(){var a,u,v;return i().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return a=A.getFieldsValue(),a.address==null?u={orderItemId:a.orderItemId,receiverName:a.receiverName,phoneNumber:a.phoneNumber,addressProvince:"",addressCity:"",addressDistinct:"",addressDetail:a.addressDetail}:u={orderItemId:a.orderItemId,receiverName:a.receiverName,phoneNumber:a.phoneNumber,addressProvince:a.address[0],addressCity:a.address[1],addressDistinct:a.address[2],addressDetail:a.addressDetail},console.log("22222",u),P.next=5,(0,d.Cs)(X,(0,m.Z)({},u));case 5:v=P.sent,v&&(Z(!1),O());case 7:case"end":return P.stop()}},n)}));return function(){return s.apply(this,arguments)}}(),Oe=function(n){console.log(n),y(!0)};return e.createElement(G.ZP,null,e.createElement(h.Z,null,e.createElement(r.Z,{form:B,id:"searchForm",layout:"inline"},e.createElement(r.Z.Item,{name:"status"},e.createElement(j.Z,{placeholder:"\u9009\u62E9\u67E5\u8BE2\u72B6\u6001"},e.createElement(c.W,{value:""},"\u5168\u90E8"),e.createElement(c.W,{value:"0"},"\u672A\u4ED8\u6B3E"),e.createElement(c.W,{value:"1"},"\u5F85\u53D1\u8D27"),e.createElement(c.W,{value:"2"},"\u5F85\u6536\u8D27"),e.createElement(c.W,{value:"3"},"\u5DF2\u5B8C\u6210"),e.createElement(c.W,{value:"4"},"\u5DF2\u53D6\u6D88"))),e.createElement(r.Z.Item,null,e.createElement(E.Z,{type:"primary",onClick:ce},"\u67E5\u8BE2")))),e.createElement("br",null),e.createElement(h.Z,null,e.createElement(V.Z,{columns:[{title:"\u8BA2\u5355\u7F16\u53F7",dataIndex:"orderItemId",key:"orderItemId"},{title:"\u7528\u6237",dataIndex:"userName",key:"userName"},{title:"\u5546\u54C1",dataIndex:"commodityName",key:"commodityName"},{title:"\u578B\u53F7",dataIndex:"type",key:"type"},{title:"\u8D2D\u4E70\u6570\u91CF",dataIndex:"quantity",key:"quantity"},{title:"\u603B\u4EF7",dataIndex:"totalPrice",key:"totalPrice"},{title:"\u8BA2\u5355\u72B6\u6001",dataIndex:"status",key:"status",render:function(n){return n===0?"\u672A\u4ED8\u6B3E":n===1?"\u5F85\u53D1\u8D27":n===2?"\u5F85\u6536\u8D27":n===3?"\u5DF2\u5B8C\u6210":n===4?"\u5DF2\u53D6\u6D88":""}},{title:"\u6536\u8D27\u4EBA",dataIndex:"receiverName",key:"receiverName"},{title:"\u8054\u7CFB\u7535\u8BDD",dataIndex:"phoneNumber",key:"phoneNumber"},{title:"\u6536\u8D27\u5730\u5740",dataIndex:"addressMerge",key:"addressMerge"},{title:"\u7269\u6D41\u4FE1\u606F",dataIndex:"deliveryInfo",key:"deliveryInfo"},{title:"Action",key:"action",render:function(n,a){return e.createElement($.Z,{size:"middle"},e.createElement(E.Z,{onClick:function(){return Ie(a)},disabled:(0,I.toNumber)(a.status)>1},"\u7F16\u8F91"),e.createElement(C.Z,{title:"\u786E\u8BA4\u4ED8\u6B3E\uFF1F",okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onConfirm:function(){(0,d._r)(H,a.orderItemId).then(function(){return O()})}},e.createElement(E.Z,{type:"primary",ghost:!0,disabled:(0,I.toNumber)(a.status)>0},"\u4ED8\u6B3E")),e.createElement(C.Z,{title:"\u786E\u8BA4\u6536\u8D27\uFF1F",okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onConfirm:function(){(0,d.Nc)(w,a.orderItemId).then(function(){return O()})}},e.createElement(E.Z,{type:"primary",ghost:!0,disabled:(0,I.toNumber)(a.status)<=1},"\u6536\u8D27")),e.createElement(C.Z,{title:"\u786E\u8BA4\u53D6\u6D88\u8BA2\u5355\uFF1F",okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onConfirm:function(){(0,d.wz)(J,a.orderItemId).then(function(){return O()})}},e.createElement(E.Z,{danger:!0},"\u53D6\u6D88")),e.createElement(E.Z,{onClick:function(){return Oe(a)},disabled:(0,I.toNumber)(a.status)<=1},"\u67E5\u770B\u7269\u6D41"))}}],dataSource:te,pagination:M,onChange:function(n){return W(n)},rowKey:function(n){return n.id}})),e.createElement(g.Z,{title:"\u7F16\u8F91",visible:se,okButtonProps:{htmlType:"submit",form:"editForm"},onCancel:function(){Z(!1)}},e.createElement(r.Z,(0,x.Z)({name:"editForm",form:A},d.cl,{onFinish:Me,validateMessages:d.AS}),e.createElement(r.Z.Item,{name:"orderItemId",label:"\u8BA2\u5355\u7F16\u53F7"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"userName",label:"\u7528\u6237"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"commodityName",label:"\u5546\u54C1"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"type",label:"\u578B\u53F7"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"quantity",label:"\u8D2D\u4E70\u6570\u91CF"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"totalPrice",label:"\u603B\u4EF7"},e.createElement(l.Z,{disabled:!0})),e.createElement(r.Z.Item,{name:"receiverName",label:"\u6536\u8D27\u4EBA"},e.createElement(l.Z,null)),e.createElement(r.Z.Item,{name:"phoneNumber",label:"\u8054\u7CFB\u7535\u8BDD"},e.createElement(l.Z,null)),e.createElement(r.Z.Item,{name:"addressDetail",label:"\u8BE6\u7EC6\u5730\u5740",help:"\u5982\u679C\u4FEE\u6539\u7684\u8BDD\uFF0C\u4E0D\u7528\u8F93\u5165\u7701\u5E02\u533A"},e.createElement(l.Z,null)),e.createElement(r.Z.Item,{name:"address",label:"\u57FA\u672C\u5730\u5740"},e.createElement(z.Z,{name:"addCas",options:Y.Z.options,placeholder:"\u53EF\u4FEE\u6539\u7701/\u5E02/\u533A",onChange:fe})),e.createElement(r.Z.Item,{name:"deliveryInfo",label:"\u7269\u6D41\u4FE1\u606F"},e.createElement(l.Z,{disabled:!0})))),e.createElement(g.Z,{title:"\u67E5\u770B\u7269\u6D41",visible:le,onOk:function(){y(!1)},onCancel:function(){y(!1)}},e.createElement(f.Z,null,e.createElement(f.Z.Item,{color:"gray"},"\u5546\u54C1\u5DF2\u4E0B\u5355 2021-12-13 19:21"),e.createElement(f.Z.Item,{color:"gray"},"\u5305\u88F9\u6B63\u5728\u6536\u63FD 2021-12-14 14:02"),e.createElement(f.Z.Item,{color:"gray"},"\u3010\u4E0A\u6D77\u6768\u6D66B\u7AD9\u3011\u63FD\u6536\u6210\u529F 2021-12-14 18:15"),e.createElement(f.Z.Item,null,"\u3010\u4E0A\u6D77\u8F6C\u8FD0\u4E2D\u5FC3\u3011\uFF0C\u6B63\u5728\u53D1\u5F80\u3010\u5317\u4EAC\u8FD0\u8F6C\u4E2D\u5FC3\u30112021-12-14 20:38"))))};R.default=q}}]);
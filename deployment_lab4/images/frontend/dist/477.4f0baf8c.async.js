(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[477],{22540:function(me,te,n){"use strict";n.d(te,{D:function(){return g},Z:function(){return $}});var P=n(4763),A=n(3066),V=n(19877),o=n(67294),Z=n(35510),i=n.n(Z),D=n(26670),Q=n(45937),T={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"bars",theme:"outlined"},k=T,G=n(27029),X=function(h,b){return o.createElement(G.Z,(0,Q.Z)((0,Q.Z)({},h),{},{ref:b,icon:k}))};X.displayName="BarsOutlined";var oe=o.forwardRef(X),U=n(8812),B=n(67724),ie=n(51763),se=n(67170),u=function(h){return!isNaN(parseFloat(h))&&isFinite(h)},f=u,y=function(l,h){var b={};for(var C in l)Object.prototype.hasOwnProperty.call(l,C)&&h.indexOf(C)<0&&(b[C]=l[C]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var N=0,C=Object.getOwnPropertySymbols(l);N<C.length;N++)h.indexOf(C[N])<0&&Object.prototype.propertyIsEnumerable.call(l,C[N])&&(b[C[N]]=l[C[N]]);return b},d={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px"},g=o.createContext({}),W=function(){var l=0;return function(){var h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return l+=1,"".concat(h).concat(l)}}(),j=o.forwardRef(function(l,h){var b=l.prefixCls,C=l.className,N=l.trigger,ne=l.children,R=l.defaultCollapsed,ce=R===void 0?!1:R,r=l.theme,s=r===void 0?"dark":r,a=l.style,e=a===void 0?{}:a,t=l.collapsible,c=t===void 0?!1:t,v=l.reverseArrow,E=v===void 0?!1:v,x=l.width,S=x===void 0?200:x,m=l.collapsedWidth,z=m===void 0?80:m,q=l.zeroWidthTriggerStyle,H=l.breakpoint,_=l.onCollapse,Y=l.onBreakpoint,M=y(l,["prefixCls","className","trigger","children","defaultCollapsed","theme","style","collapsible","reverseArrow","width","collapsedWidth","zeroWidthTriggerStyle","breakpoint","onCollapse","onBreakpoint"]),K=(0,o.useContext)(ie.Gs),w=K.siderHook,F=(0,o.useState)("collapsed"in M?M.collapsed:ce),re=(0,V.Z)(F,2),L=re[0],J=re[1],ae=(0,o.useState)(!1),de=(0,V.Z)(ae,2),ue=de[0],ge=de[1];(0,o.useEffect)(function(){"collapsed"in M&&J(M.collapsed)},[M.collapsed]);var pe=function(p,I){"collapsed"in M||J(p),_==null||_(p,I)},he=(0,o.useRef)();he.current=function(O){ge(O.matches),Y==null||Y(O.matches),L!==O.matches&&pe(O.matches,"responsive")},(0,o.useEffect)(function(){function O(ee){return he.current(ee)}var p;if(typeof window!="undefined"){var I=window,fe=I.matchMedia;if(fe&&H&&H in d){p=fe("(max-width: ".concat(d[H],")"));try{p.addEventListener("change",O)}catch(ee){p.addListener(O)}O(p)}}return function(){try{p==null||p.removeEventListener("change",O)}catch(ee){p==null||p.removeListener(O)}}},[]),(0,o.useEffect)(function(){var O=W("ant-sider-");return w.addSider(O),function(){return w.removeSider(O)}},[]);var Ce=function(){pe(!L,"clickTrigger")},xe=(0,o.useContext)(se.E_),ye=xe.getPrefixCls,Ne=function(){var p,I=ye("layout-sider",b),fe=(0,D.Z)(M,["collapsed"]),ee=L?z:S,le=f(ee)?"".concat(ee,"px"):String(ee),ve=parseFloat(String(z||0))===0?o.createElement("span",{onClick:Ce,className:i()("".concat(I,"-zero-width-trigger"),"".concat(I,"-zero-width-trigger-").concat(E?"right":"left")),style:q},N||o.createElement(oe,null)):null,Oe={expanded:E?o.createElement(U.Z,null):o.createElement(B.Z,null),collapsed:E?o.createElement(B.Z,null):o.createElement(U.Z,null)},Pe=L?"collapsed":"expanded",Ze=Oe[Pe],Se=N!==null?ve||o.createElement("div",{className:"".concat(I,"-trigger"),onClick:Ce,style:{width:le}},N||Ze):null,Me=(0,A.Z)((0,A.Z)({},e),{flex:"0 0 ".concat(le),maxWidth:le,minWidth:le,width:le}),Ie=i()(I,"".concat(I,"-").concat(s),(p={},(0,P.Z)(p,"".concat(I,"-collapsed"),!!L),(0,P.Z)(p,"".concat(I,"-has-trigger"),c&&N!==null&&!ve),(0,P.Z)(p,"".concat(I,"-below"),!!ue),(0,P.Z)(p,"".concat(I,"-zero-width"),parseFloat(le)===0),p),C);return o.createElement("aside",(0,A.Z)({className:Ie},fe,{style:Me,ref:h}),o.createElement("div",{className:"".concat(I,"-children")},ne),c||ue&&ve?Se:null)},Ee=o.useMemo(function(){return{siderCollapsed:L}},[L]);return o.createElement(g.Provider,{value:Ee},Ne())});j.displayName="Sider";var $=j},51763:function(me,te,n){"use strict";n.d(te,{Gs:function(){return k},h4:function(){return B},$_:function(){return ie},VY:function(){return se}});var P=n(66156),A=n(4763),V=n(19877),o=n(3066),Z=n(67294),i=n(35510),D=n.n(i),Q=n(67170),T=function(u,f){var y={};for(var d in u)Object.prototype.hasOwnProperty.call(u,d)&&f.indexOf(d)<0&&(y[d]=u[d]);if(u!=null&&typeof Object.getOwnPropertySymbols=="function")for(var g=0,d=Object.getOwnPropertySymbols(u);g<d.length;g++)f.indexOf(d[g])<0&&Object.prototype.propertyIsEnumerable.call(u,d[g])&&(y[d[g]]=u[d[g]]);return y},k=Z.createContext({siderHook:{addSider:function(){return null},removeSider:function(){return null}}});function G(u){var f=u.suffixCls,y=u.tagName,d=u.displayName;return function(g){var W=function($){var l=Z.useContext(Q.E_),h=l.getPrefixCls,b=$.prefixCls,C=h(f,b);return Z.createElement(g,(0,o.Z)({prefixCls:C,tagName:y},$))};return W.displayName=d,W}}var X=function(f){var y=f.prefixCls,d=f.className,g=f.children,W=f.tagName,j=T(f,["prefixCls","className","children","tagName"]),$=D()(y,d);return Z.createElement(W,(0,o.Z)({className:$},j),g)},oe=function(f){var y,d=Z.useContext(Q.E_),g=d.direction,W=Z.useState([]),j=(0,V.Z)(W,2),$=j[0],l=j[1],h=f.prefixCls,b=f.className,C=f.children,N=f.hasSider,ne=f.tagName,R=T(f,["prefixCls","className","children","hasSider","tagName"]),ce=D()(h,(y={},(0,A.Z)(y,"".concat(h,"-has-sider"),typeof N=="boolean"?N:$.length>0),(0,A.Z)(y,"".concat(h,"-rtl"),g==="rtl"),y),b),r=Z.useMemo(function(){return{siderHook:{addSider:function(a){l(function(e){return[].concat((0,P.Z)(e),[a])})},removeSider:function(a){l(function(e){return e.filter(function(t){return t!==a})})}}}},[]);return Z.createElement(k.Provider,{value:r},Z.createElement(ne,(0,o.Z)({className:ce},R),C))},U=G({suffixCls:"layout",tagName:"section",displayName:"Layout"})(oe),B=G({suffixCls:"layout-header",tagName:"header",displayName:"Header"})(X),ie=G({suffixCls:"layout-footer",tagName:"footer",displayName:"Footer"})(X),se=G({suffixCls:"layout-content",tagName:"main",displayName:"Content"})(X);te.ZP=U},42477:function(me,te,n){"use strict";n.d(te,{Z:function(){return ce}});var P=n(3066),A=n(96285),V=n(76553),o=n(75304),Z=n(40251),i=n(67294),D=n(47503),Q=n(35510),T=n.n(Q),k=n(26670),G=n(44545),X=n(78396),oe=(0,i.createContext)({prefixCls:"",firstLevel:!0,inlineCollapsed:!1}),U=oe,B=n(75447);function ie(r){var s,a=r.popupClassName,e=r.icon,t=r.title,c=i.useContext(U),v=c.prefixCls,E=c.inlineCollapsed,x=c.antdMenuTheme,S=(0,D.Xl)(),m;if(!e)m=E&&!S.length&&t&&typeof t=="string"?i.createElement("div",{className:"".concat(v,"-inline-collapsed-noicon")},t.charAt(0)):i.createElement("span",{className:"".concat(v,"-title-content")},t);else{var z=(0,B.l$)(t)&&t.type==="span";m=i.createElement(i.Fragment,null,(0,B.Tm)(e,{className:T()((0,B.l$)(e)?(s=e.props)===null||s===void 0?void 0:s.className:"","".concat(v,"-item-icon"))}),z?t:i.createElement("span",{className:"".concat(v,"-title-content")},t))}var q=i.useMemo(function(){return(0,P.Z)((0,P.Z)({},c),{firstLevel:!1})},[c]);return i.createElement(U.Provider,{value:q},i.createElement(D.Wd,(0,P.Z)({},(0,k.Z)(r,["icon"]),{title:m,popupClassName:T()(v,"".concat(v,"-").concat(x),a)})))}var se=ie,u=n(4763),f=n(10048),y=n(82692),d=n(22540),g=function(r,s){var a={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&s.indexOf(e)<0&&(a[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(r);t<e.length;t++)s.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(r,e[t])&&(a[e[t]]=r[e[t]]);return a},W=function(r){(0,o.Z)(a,r);var s=(0,Z.Z)(a);function a(){var e;return(0,A.Z)(this,a),e=s.apply(this,arguments),e.renderItem=function(t){var c,v=t.siderCollapsed,E,x=e.context,S=x.prefixCls,m=x.firstLevel,z=x.inlineCollapsed,q=x.direction,H=e.props,_=H.className,Y=H.children,M=e.props,K=M.title,w=M.icon,F=M.danger,re=g(M,["title","icon","danger"]),L=K;typeof K=="undefined"?L=m?Y:"":K===!1&&(L="");var J={title:L};!v&&!z&&(J.title=null,J.visible=!1);var ae=(0,f.Z)(Y).length;return i.createElement(y.Z,(0,P.Z)({},J,{placement:q==="rtl"?"left":"right",overlayClassName:"".concat(S,"-inline-collapsed-tooltip")}),i.createElement(D.ck,(0,P.Z)({},re,{className:T()((c={},(0,u.Z)(c,"".concat(S,"-item-danger"),F),(0,u.Z)(c,"".concat(S,"-item-only-child"),(w?ae+1:ae)===1),c),_),title:typeof K=="string"?K:void 0}),(0,B.Tm)(w,{className:T()((0,B.l$)(w)?(E=w.props)===null||E===void 0?void 0:E.className:"","".concat(S,"-item-icon"))}),e.renderItemChildren(z)))},e}return(0,V.Z)(a,[{key:"renderItemChildren",value:function(t){var c=this.context,v=c.prefixCls,E=c.firstLevel,x=this.props,S=x.icon,m=x.children,z=i.createElement("span",{className:"".concat(v,"-title-content")},m);return(!S||(0,B.l$)(m)&&m.type==="span")&&m&&t&&E&&typeof m=="string"?i.createElement("div",{className:"".concat(v,"-inline-collapsed-noicon")},m.charAt(0)):z}},{key:"render",value:function(){return i.createElement(d.D.Consumer,null,this.renderItem)}}]),a}(i.Component);W.contextType=U;var j=n(67170),$=n(20324),l=n(31064),h=function(r,s){var a={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&s.indexOf(e)<0&&(a[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(r);t<e.length;t++)s.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(r,e[t])&&(a[e[t]]=r[e[t]]);return a},b=function(s){var a=s.prefixCls,e=s.className,t=s.dashed,c=h(s,["prefixCls","className","dashed"]),v=i.useContext(j.E_),E=v.getPrefixCls,x=E("menu",a),S=T()((0,u.Z)({},"".concat(x,"-item-divider-dashed"),!!t),e);return i.createElement(D.iz,(0,P.Z)({className:S},c))},C=b,N=function(r,s){var a={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&s.indexOf(e)<0&&(a[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(r);t<e.length;t++)s.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(r,e[t])&&(a[e[t]]=r[e[t]]);return a},ne=function(r){(0,o.Z)(a,r);var s=(0,Z.Z)(a);function a(e){var t;return(0,A.Z)(this,a),t=s.call(this,e),t.renderMenu=function(c){var v=c.getPopupContainer,E=c.getPrefixCls,x=c.direction,S=E(),m=t.props,z=m.prefixCls,q=m.className,H=m.theme,_=m.expandIcon,Y=N(m,["prefixCls","className","theme","expandIcon"]),M=(0,k.Z)(Y,["siderCollapsed","collapsedWidth"]),K=t.getInlineCollapsed(),w={horizontal:{motionName:"".concat(S,"-slide-up")},inline:l.Z,other:{motionName:"".concat(S,"-zoom-big")}},F=E("menu",z),re=T()("".concat(F,"-").concat(H),q),L=(0,X.Z)(function(J,ae,de,ue){return{prefixCls:J,inlineCollapsed:ae||!1,antdMenuTheme:de,direction:ue,firstLevel:!0}})(F,K,H,x);return i.createElement(U.Provider,{value:L},i.createElement(D.ZP,(0,P.Z)({getPopupContainer:v,overflowedIndicator:i.createElement(G.Z,null),overflowedIndicatorPopupClassName:"".concat(F,"-").concat(H)},M,{inlineCollapsed:K,className:re,prefixCls:F,direction:x,defaultMotions:w,expandIcon:(0,B.Tm)(_,{className:"".concat(F,"-submenu-expand-icon")})})))},(0,$.Z)(!("inlineCollapsed"in e&&e.mode!=="inline"),"Menu","`inlineCollapsed` should only be used when `mode` is inline."),(0,$.Z)(!(e.siderCollapsed!==void 0&&"inlineCollapsed"in e),"Menu","`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."),t}return(0,V.Z)(a,[{key:"getInlineCollapsed",value:function(){var t=this.props,c=t.inlineCollapsed,v=t.siderCollapsed;return v!==void 0?v:c}},{key:"render",value:function(){return i.createElement(j.C,null,this.renderMenu)}}]),a}(i.Component);ne.defaultProps={theme:"light"};var R=function(r){(0,o.Z)(a,r);var s=(0,Z.Z)(a);function a(){return(0,A.Z)(this,a),s.apply(this,arguments)}return(0,V.Z)(a,[{key:"render",value:function(){var t=this;return i.createElement(d.D.Consumer,null,function(c){return i.createElement(ne,(0,P.Z)({},t.props,c))})}}]),a}(i.Component);R.Divider=C,R.Item=W,R.SubMenu=se,R.ItemGroup=D.BW;var ce=R}}]);

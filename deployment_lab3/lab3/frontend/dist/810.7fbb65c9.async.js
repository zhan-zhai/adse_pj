(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[810],{22540:function(ce,Q,t){"use strict";t.d(Q,{D:function(){return C},Z:function(){return j}});var O=t(4763),D=t(3066),H=t(19877),i=t(67294),P=t(35510),o=t.n(P),T=t(26670),V=t(45937),$={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"bars",theme:"outlined"},X=$,K=t(27029),U=function(f,y){return i.createElement(K.Z,(0,V.Z)((0,V.Z)({},f),{},{ref:y,icon:X}))};U.displayName="BarsOutlined";var F=i.forwardRef(U),I=t(8812),k=t(67724),ae=t(51763),q=t(67170),p=function(f){return!isNaN(parseFloat(f))&&isFinite(f)},d=p,x=function(a,f){var y={};for(var g in a)Object.prototype.hasOwnProperty.call(a,g)&&f.indexOf(g)<0&&(y[g]=a[g]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,g=Object.getOwnPropertySymbols(a);r<g.length;r++)f.indexOf(g[r])<0&&Object.prototype.propertyIsEnumerable.call(a,g[r])&&(y[g[r]]=a[g[r]]);return y},u={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px"},C=i.createContext({}),z=function(){var a=0;return function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return a+=1,"".concat(f).concat(a)}}(),W=i.forwardRef(function(a,f){var y=a.prefixCls,g=a.className,r=a.trigger,h=a.children,l=a.defaultCollapsed,e=l===void 0?!1:l,n=a.theme,s=n===void 0?"dark":n,c=a.style,Z=c===void 0?{}:c,E=a.collapsible,S=E===void 0?!1:E,v=a.reverseArrow,L=v===void 0?!1:v,_=a.width,w=_===void 0?200:_,ee=a.collapsedWidth,Y=ee===void 0?80:ee,G=a.zeroWidthTriggerStyle,B=a.breakpoint,R=a.onCollapse,b=a.onBreakpoint,A=x(a,["prefixCls","className","trigger","children","defaultCollapsed","theme","style","collapsible","reverseArrow","width","collapsedWidth","zeroWidthTriggerStyle","breakpoint","onCollapse","onBreakpoint"]),le=(0,i.useContext)(ae.Gs),te=le.siderHook,ie=(0,i.useState)("collapsed"in A?A.collapsed:e),de=(0,H.Z)(ie,2),ne=de[0],ue=de[1],Ce=(0,i.useState)(!1),ve=(0,H.Z)(Ce,2),fe=ve[0],ge=ve[1];(0,i.useEffect)(function(){"collapsed"in A&&ue(A.collapsed)},[A.collapsed]);var me=function(m,M){"collapsed"in A||ue(m),R==null||R(m,M)},pe=(0,i.useRef)();pe.current=function(N){ge(N.matches),b==null||b(N.matches),ne!==N.matches&&me(N.matches,"responsive")},(0,i.useEffect)(function(){function N(J){return pe.current(J)}var m;if(typeof window!="undefined"){var M=window,oe=M.matchMedia;if(oe&&B&&B in u){m=oe("(max-width: ".concat(u[B],")"));try{m.addEventListener("change",N)}catch(J){m.addListener(N)}N(m)}}return function(){try{m==null||m.removeEventListener("change",N)}catch(J){m==null||m.removeListener(N)}}},[]),(0,i.useEffect)(function(){var N=z("ant-sider-");return te.addSider(N),function(){return te.removeSider(N)}},[]);var he=function(){me(!ne,"clickTrigger")},xe=(0,i.useContext)(q.E_),ye=xe.getPrefixCls,Ne=function(){var m,M=ye("layout-sider",y),oe=(0,T.Z)(A,["collapsed"]),J=ne?Y:w,re=d(J)?"".concat(J,"px"):String(J),se=parseFloat(String(Y||0))===0?i.createElement("span",{onClick:he,className:o()("".concat(M,"-zero-width-trigger"),"".concat(M,"-zero-width-trigger-").concat(L?"right":"left")),style:G},r||i.createElement(F,null)):null,Ee={expanded:L?i.createElement(I.Z,null):i.createElement(k.Z,null),collapsed:L?i.createElement(k.Z,null):i.createElement(I.Z,null)},Oe=ne?"collapsed":"expanded",Pe=Ee[Oe],Ze=r!==null?se||i.createElement("div",{className:"".concat(M,"-trigger"),onClick:he,style:{width:re}},r||Pe):null,Se=(0,D.Z)((0,D.Z)({},Z),{flex:"0 0 ".concat(re),maxWidth:re,minWidth:re,width:re}),Me=o()(M,"".concat(M,"-").concat(s),(m={},(0,O.Z)(m,"".concat(M,"-collapsed"),!!ne),(0,O.Z)(m,"".concat(M,"-has-trigger"),S&&r!==null&&!se),(0,O.Z)(m,"".concat(M,"-below"),!!fe),(0,O.Z)(m,"".concat(M,"-zero-width"),parseFloat(re)===0),m),g);return i.createElement("aside",(0,D.Z)({className:Me},oe,{style:Se,ref:f}),i.createElement("div",{className:"".concat(M,"-children")},h),S||fe&&se?Ze:null)};return i.createElement(C.Provider,{value:{siderCollapsed:ne}},Ne())});W.displayName="Sider";var j=W},51763:function(ce,Q,t){"use strict";t.d(Q,{Gs:function(){return X},h4:function(){return k},$_:function(){return ae},VY:function(){return q}});var O=t(66156),D=t(4763),H=t(19877),i=t(3066),P=t(67294),o=t(35510),T=t.n(o),V=t(67170),$=function(p,d){var x={};for(var u in p)Object.prototype.hasOwnProperty.call(p,u)&&d.indexOf(u)<0&&(x[u]=p[u]);if(p!=null&&typeof Object.getOwnPropertySymbols=="function")for(var C=0,u=Object.getOwnPropertySymbols(p);C<u.length;C++)d.indexOf(u[C])<0&&Object.prototype.propertyIsEnumerable.call(p,u[C])&&(x[u[C]]=p[u[C]]);return x},X=P.createContext({siderHook:{addSider:function(){return null},removeSider:function(){return null}}});function K(p){var d=p.suffixCls,x=p.tagName,u=p.displayName;return function(C){var z=function(j){var a=P.useContext(V.E_),f=a.getPrefixCls,y=j.prefixCls,g=f(d,y);return P.createElement(C,(0,i.Z)({prefixCls:g,tagName:x},j))};return z.displayName=u,z}}var U=function(d){var x=d.prefixCls,u=d.className,C=d.children,z=d.tagName,W=$(d,["prefixCls","className","children","tagName"]),j=T()(x,u);return P.createElement(z,(0,i.Z)({className:j},W),C)},F=function(d){var x,u=P.useContext(V.E_),C=u.direction,z=P.useState([]),W=(0,H.Z)(z,2),j=W[0],a=W[1],f=d.prefixCls,y=d.className,g=d.children,r=d.hasSider,h=d.tagName,l=$(d,["prefixCls","className","children","hasSider","tagName"]),e=T()(f,(x={},(0,D.Z)(x,"".concat(f,"-has-sider"),typeof r=="boolean"?r:j.length>0),(0,D.Z)(x,"".concat(f,"-rtl"),C==="rtl"),x),y);return P.createElement(X.Provider,{value:{siderHook:{addSider:function(s){a(function(c){return[].concat((0,O.Z)(c),[s])})},removeSider:function(s){a(function(c){return c.filter(function(Z){return Z!==s})})}}}},P.createElement(h,(0,i.Z)({className:e},l),g))},I=K({suffixCls:"layout",tagName:"section",displayName:"Layout"})(F),k=K({suffixCls:"layout-header",tagName:"header",displayName:"Header"})(U),ae=K({suffixCls:"layout-footer",tagName:"footer",displayName:"Footer"})(U),q=K({suffixCls:"layout-content",tagName:"main",displayName:"Content"})(U);Q.ZP=I},3810:function(ce,Q,t){"use strict";t.d(Q,{Z:function(){return g}});var O=t(3066),D=t(96285),H=t(76553),i=t(75304),P=t(40251),o=t(67294),T=t(47503),V=t(35510),$=t.n(V),X=t(26670),K=t(44545),U=(0,o.createContext)({prefixCls:"",firstLevel:!0,inlineCollapsed:!1}),F=U,I=t(75447);function k(r){var h,l=r.popupClassName,e=r.icon,n=r.title,s=o.useContext(F),c=s.prefixCls,Z=s.inlineCollapsed,E=s.antdMenuTheme,S=(0,T.Xl)(),v;if(!e)v=Z&&!S.length&&n&&typeof n=="string"?o.createElement("div",{className:"".concat(c,"-inline-collapsed-noicon")},n.charAt(0)):o.createElement("span",{className:"".concat(c,"-title-content")},n);else{var L=(0,I.l$)(n)&&n.type==="span";v=o.createElement(o.Fragment,null,(0,I.Tm)(e,{className:$()((0,I.l$)(e)?(h=e.props)===null||h===void 0?void 0:h.className:"","".concat(c,"-item-icon"))}),L?n:o.createElement("span",{className:"".concat(c,"-title-content")},n))}return o.createElement(F.Provider,{value:(0,O.Z)((0,O.Z)({},s),{firstLevel:!1})},o.createElement(T.Wd,(0,O.Z)({},(0,X.Z)(r,["icon"]),{title:v,popupClassName:$()(c,"".concat(c,"-").concat(E),l)})))}var ae=k,q=t(4763),p=t(10048),d=t(82692),x=t(22540),u=function(r,h){var l={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&h.indexOf(e)<0&&(l[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(r);n<e.length;n++)h.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(r,e[n])&&(l[e[n]]=r[e[n]]);return l},C=function(r){(0,i.Z)(l,r);var h=(0,P.Z)(l);function l(){var e;return(0,D.Z)(this,l),e=h.apply(this,arguments),e.renderItem=function(n){var s,c=n.siderCollapsed,Z,E=e.context,S=E.prefixCls,v=E.firstLevel,L=E.inlineCollapsed,_=E.direction,w=e.props,ee=w.className,Y=w.children,G=e.props,B=G.title,R=G.icon,b=G.danger,A=u(G,["title","icon","danger"]),le=B;typeof B=="undefined"?le=v?Y:"":B===!1&&(le="");var te={title:le};!c&&!L&&(te.title=null,te.visible=!1);var ie=(0,p.Z)(Y).length;return o.createElement(d.Z,(0,O.Z)({},te,{placement:_==="rtl"?"left":"right",overlayClassName:"".concat(S,"-inline-collapsed-tooltip")}),o.createElement(T.ck,(0,O.Z)({},A,{className:$()((s={},(0,q.Z)(s,"".concat(S,"-item-danger"),b),(0,q.Z)(s,"".concat(S,"-item-only-child"),(R?ie+1:ie)===1),s),ee),title:typeof B=="string"?B:void 0}),(0,I.Tm)(R,{className:$()((0,I.l$)(R)?(Z=R.props)===null||Z===void 0?void 0:Z.className:"","".concat(S,"-item-icon"))}),e.renderItemChildren(L)))},e}return(0,H.Z)(l,[{key:"renderItemChildren",value:function(n){var s=this.context,c=s.prefixCls,Z=s.firstLevel,E=this.props,S=E.icon,v=E.children,L=o.createElement("span",{className:"".concat(c,"-title-content")},v);return(!S||(0,I.l$)(v)&&v.type==="span")&&v&&n&&Z&&typeof v=="string"?o.createElement("div",{className:"".concat(c,"-inline-collapsed-noicon")},v.charAt(0)):L}},{key:"render",value:function(){return o.createElement(x.D.Consumer,null,this.renderItem)}}]),l}(o.Component);C.contextType=F;var z=t(67170),W=t(20324),j=t(31064),a=function(r,h){var l={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&h.indexOf(e)<0&&(l[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(r);n<e.length;n++)h.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(r,e[n])&&(l[e[n]]=r[e[n]]);return l},f=function(r){(0,i.Z)(l,r);var h=(0,P.Z)(l);function l(e){var n;return(0,D.Z)(this,l),n=h.call(this,e),n.renderMenu=function(s){var c=s.getPopupContainer,Z=s.getPrefixCls,E=s.direction,S=Z(),v=n.props,L=v.prefixCls,_=v.className,w=v.theme,ee=v.expandIcon,Y=a(v,["prefixCls","className","theme","expandIcon"]),G=(0,X.Z)(Y,["siderCollapsed","collapsedWidth"]),B=n.getInlineCollapsed(),R={horizontal:{motionName:"".concat(S,"-slide-up")},inline:j.Z,other:{motionName:"".concat(S,"-zoom-big")}},b=Z("menu",L),A=$()("".concat(b,"-").concat(w),_);return o.createElement(F.Provider,{value:{prefixCls:b,inlineCollapsed:B||!1,antdMenuTheme:w,direction:E,firstLevel:!0}},o.createElement(T.ZP,(0,O.Z)({getPopupContainer:c,overflowedIndicator:o.createElement(K.Z,null),overflowedIndicatorPopupClassName:"".concat(b,"-").concat(w)},G,{inlineCollapsed:B,className:A,prefixCls:b,direction:E,defaultMotions:R,expandIcon:(0,I.Tm)(ee,{className:"".concat(b,"-submenu-expand-icon")})})))},(0,W.Z)(!("inlineCollapsed"in e&&e.mode!=="inline"),"Menu","`inlineCollapsed` should only be used when `mode` is inline."),(0,W.Z)(!(e.siderCollapsed!==void 0&&"inlineCollapsed"in e),"Menu","`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."),n}return(0,H.Z)(l,[{key:"getInlineCollapsed",value:function(){var n=this.props,s=n.inlineCollapsed,c=n.siderCollapsed;return c!==void 0?c:s}},{key:"render",value:function(){return o.createElement(z.C,null,this.renderMenu)}}]),l}(o.Component);f.defaultProps={theme:"light"};var y=function(r){(0,i.Z)(l,r);var h=(0,P.Z)(l);function l(){return(0,D.Z)(this,l),h.apply(this,arguments)}return(0,H.Z)(l,[{key:"render",value:function(){var n=this;return o.createElement(x.D.Consumer,null,function(s){return o.createElement(f,(0,O.Z)({},n.props,s))})}}]),l}(o.Component);y.Divider=T.iz,y.Item=C,y.SubMenu=ae,y.ItemGroup=T.BW;var g=y}}]);

(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[142],{49101:function(xe,ee,n){"use strict";n.d(ee,{Z:function(){return L}});var M=n(45937),v=n(67294),t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},d=t,m=n(27029),ie=function(O,ae){return v.createElement(m.Z,(0,M.Z)((0,M.Z)({},O),{},{ref:ae,icon:d}))};ie.displayName="PlusOutlined";var L=v.forwardRef(ie)},52683:function(){},31930:function(){},25414:function(){},95832:function(xe,ee,n){"use strict";n.d(ee,{Z:function(){return M}});var M=function(t){if(!t)return null;var d=typeof t=="function";return d?t():t}},23040:function(xe,ee,n){"use strict";n.d(ee,{C:function(){return Ne}});var M=n(3066),v=n(4763),t=n(47103),d=n(19877),m=n(67294),ie=n(35510),L=n.n(ie),ge=n(74281),O=n(78703),ae=n(67170),me=n(20324),K=n(85748),te=n(31312),oe=m.createContext("default"),Re=function(p){var re=p.children,A=p.size;return m.createElement(oe.Consumer,null,function(k){return m.createElement(oe.Provider,{value:A||k},re)})},ue=oe,I=function(D,p){var re={};for(var A in D)Object.prototype.hasOwnProperty.call(D,A)&&p.indexOf(A)<0&&(re[A]=D[A]);if(D!=null&&typeof Object.getOwnPropertySymbols=="function")for(var k=0,A=Object.getOwnPropertySymbols(D);k<A.length;k++)p.indexOf(A[k])<0&&Object.prototype.propertyIsEnumerable.call(D,A[k])&&(re[A[k]]=D[A[k]]);return re},le=function(p,re){var A,k,Me=m.useContext(ue),Ge=m.useState(1),Ke=(0,d.Z)(Ge,2),ye=Ke[0],Ye=Ke[1],ke=m.useState(!1),Ie=(0,d.Z)(ke,2),Xe=Ie[0],Ue=Ie[1],Qe=m.useState(!0),we=(0,d.Z)(Qe,2),ve=we[0],Oe=we[1],De=m.useRef(),We=m.useRef(),Je=(0,O.sQ)(re,De),qe=m.useContext(ae.E_),Zt=qe.getPrefixCls,rt=function(){if(!(!We.current||!De.current)){var u=We.current.offsetWidth,l=De.current.offsetWidth;if(u!==0&&l!==0){var f=p.gap,h=f===void 0?4:f;h*2<l&&Ye(l-h*2<u?(l-h*2)/u:1)}}};m.useEffect(function(){Ue(!0)},[]),m.useEffect(function(){Oe(!0),Ye(1)},[p.src]),m.useEffect(function(){rt()},[p.gap]);var Tt=function(){var u=p.onError,l=u?u():void 0;l!==!1&&Oe(!1)},ft=p.prefixCls,mt=p.shape,it=p.size,He=p.src,Nt=p.srcSet,he=p.icon,Mt=p.className,It=p.alt,Dt=p.draggable,ht=p.children,et=I(p,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children"]),se=it==="default"?Me:it,bt=(0,te.Z)(),Wt=m.useMemo(function(){if((0,t.Z)(se)!=="object")return{};var c=K.c4.find(function(l){return bt[l]}),u=se[c];return u?{width:u,height:u,lineHeight:"".concat(u,"px"),fontSize:he?u/2:18}:{}},[bt,se]);(0,me.Z)(!(typeof he=="string"&&he.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(he,"` at https://ant.design/components/icon"));var Ce=Zt("avatar",ft),pt=L()((A={},(0,v.Z)(A,"".concat(Ce,"-lg"),se==="large"),(0,v.Z)(A,"".concat(Ce,"-sm"),se==="small"),A)),gt=m.isValidElement(He),e=L()(Ce,pt,(k={},(0,v.Z)(k,"".concat(Ce,"-").concat(mt),!!mt),(0,v.Z)(k,"".concat(Ce,"-image"),gt||He&&ve),(0,v.Z)(k,"".concat(Ce,"-icon"),!!he),k),Mt),s=typeof se=="number"?{width:se,height:se,lineHeight:"".concat(se,"px"),fontSize:he?se/2:18}:{},o;if(typeof He=="string"&&ve)o=m.createElement("img",{src:He,draggable:Dt,srcSet:Nt,onError:Tt,alt:It});else if(gt)o=He;else if(he)o=he;else if(Xe||ye!==1){var a="scale(".concat(ye,") translateX(-50%)"),r={msTransform:a,WebkitTransform:a,transform:a},i=typeof se=="number"?{lineHeight:"".concat(se,"px")}:{};o=m.createElement(ge.Z,{onResize:rt},m.createElement("span",{className:"".concat(Ce,"-string"),ref:function(u){We.current=u},style:(0,M.Z)((0,M.Z)({},i),r)},ht))}else o=m.createElement("span",{className:"".concat(Ce,"-string"),style:{opacity:0},ref:function(u){We.current=u}},ht);return delete et.onError,delete et.gap,m.createElement("span",(0,M.Z)({},et,{style:(0,M.Z)((0,M.Z)((0,M.Z)({},s),Wt),et.style),className:e,ref:Je}),o)},z=m.forwardRef(le);z.displayName="Avatar",z.defaultProps={shape:"circle",size:"default"};var Y=z,ce=n(10048),de=n(75447),Ee=n(56466),_e=function(p){var re=m.useContext(ae.E_),A=re.getPrefixCls,k=re.direction,Me=p.prefixCls,Ge=p.className,Ke=Ge===void 0?"":Ge,ye=p.maxCount,Ye=p.maxStyle,ke=p.size,Ie=A("avatar-group",Me),Xe=L()(Ie,(0,v.Z)({},"".concat(Ie,"-rtl"),k==="rtl"),Ke),Ue=p.children,Qe=p.maxPopoverPlacement,we=Qe===void 0?"top":Qe,ve=(0,ce.Z)(Ue).map(function(Je,qe){return(0,de.Tm)(Je,{key:"avatar-key-".concat(qe)})}),Oe=ve.length;if(ye&&ye<Oe){var De=ve.slice(0,ye),We=ve.slice(ye,Oe);return De.push(m.createElement(Ee.Z,{key:"avatar-popover-key",content:We,trigger:"hover",placement:we,overlayClassName:"".concat(Ie,"-popover")},m.createElement(Y,{style:Ye},"+".concat(Oe-ye)))),m.createElement(Re,{size:ke},m.createElement("div",{className:Xe,style:p.style},De))}return m.createElement(Re,{size:ke},m.createElement("div",{className:Xe,style:p.style},ve))},Te=_e,Se=Y;Se.Group=Te;var Ne=Se},90930:function(xe,ee,n){"use strict";var M=n(65056),v=n.n(M),t=n(52683),d=n.n(t),m=n(34276)},56466:function(xe,ee,n){"use strict";var M=n(3066),v=n(67294),t=n(82692),d=n(67170),m=n(95832),ie=n(31064),L=function(O,ae){var me={};for(var K in O)Object.prototype.hasOwnProperty.call(O,K)&&ae.indexOf(K)<0&&(me[K]=O[K]);if(O!=null&&typeof Object.getOwnPropertySymbols=="function")for(var te=0,K=Object.getOwnPropertySymbols(O);te<K.length;te++)ae.indexOf(K[te])<0&&Object.prototype.propertyIsEnumerable.call(O,K[te])&&(me[K[te]]=O[K[te]]);return me},ge=v.forwardRef(function(O,ae){var me=O.prefixCls,K=O.title,te=O.content,oe=L(O,["prefixCls","title","content"]),Re=v.useContext(d.E_),ue=Re.getPrefixCls,I=function(ce){return v.createElement(v.Fragment,null,K&&v.createElement("div",{className:"".concat(ce,"-title")},(0,m.Z)(K)),v.createElement("div",{className:"".concat(ce,"-inner-content")},(0,m.Z)(te)))},le=ue("popover",me),z=ue();return v.createElement(t.Z,(0,M.Z)({},oe,{prefixCls:le,ref:ae,overlay:I(le),transitionName:(0,ie.m)(z,"zoom-big",oe.transitionName)}))});ge.displayName="Popover",ge.defaultProps={placement:"top",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}},ee.Z=ge},34276:function(xe,ee,n){"use strict";var M=n(65056),v=n.n(M),t=n(31930),d=n.n(t)},47618:function(xe,ee,n){"use strict";n.d(ee,{Z:function(){return gt}});var M=n(3066),v=n(4763),t=n(67294),d=n(19877),m=n(47103),ie=n(63309),L=n(45937),ge=n(35510),O=n.n(ge),ae=n(10048),me=n(44581),K=n(82321),te=n(66156),oe=n(90468),Re=n(96285),ue=n(76553),I=n(75304),le=n(40251),z=n(97560),Y=n(32503),ce=n(78703),de=n(55065),Ee="rc-observer-key",_e=function(e){(0,I.Z)(o,e);var s=(0,le.Z)(o);function o(){var a;(0,Re.Z)(this,o);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return a=s.call.apply(s,[this].concat(i)),a.resizeObserver=null,a.childNode=null,a.currentElement=null,a.state={width:0,height:0,offsetHeight:0,offsetWidth:0},a.onResize=function(u){var l=a.props.onResize,f=u[0].target,h=f.getBoundingClientRect(),b=h.width,g=h.height,W=f.offsetWidth,R=f.offsetHeight,E=Math.floor(b),_=Math.floor(g);if(a.state.width!==E||a.state.height!==_||a.state.offsetWidth!==W||a.state.offsetHeight!==R){var U={width:E,height:_,offsetWidth:W,offsetHeight:R};if(a.setState(U),l){var w=W===Math.round(b)?b:W,Z=R===Math.round(g)?g:R;Promise.resolve().then(function(){l((0,L.Z)((0,L.Z)({},U),{},{offsetWidth:w,offsetHeight:Z}),f)})}}},a.setChildNode=function(u){a.childNode=u},a}return(0,ue.Z)(o,[{key:"componentDidMount",value:function(){this.onComponentUpdated()}},{key:"componentDidUpdate",value:function(){this.onComponentUpdated()}},{key:"componentWillUnmount",value:function(){this.destroyObserver()}},{key:"onComponentUpdated",value:function(){var r=this.props.disabled;if(r){this.destroyObserver();return}var i=(0,z.Z)(this.childNode||this),c=i!==this.currentElement;c&&(this.destroyObserver(),this.currentElement=i),!this.resizeObserver&&i&&(this.resizeObserver=new de.Z(this.onResize),this.resizeObserver.observe(i))}},{key:"destroyObserver",value:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}},{key:"render",value:function(){var r=this.props.children,i=(0,ae.Z)(r);if(i.length>1)(0,Y.ZP)(!1,"Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if(i.length===0)return(0,Y.ZP)(!1,"`children` of ResizeObserver is empty. Nothing is in observe."),null;var c=i[0];if(t.isValidElement(c)&&(0,ce.Yr)(c)){var u=c.ref;i[0]=t.cloneElement(c,{ref:(0,ce.sQ)(u,this.setChildNode)})}return i.length===1?i[0]:i.map(function(l,f){return!t.isValidElement(l)||"key"in l&&l.key!==null?l:t.cloneElement(l,{key:"".concat(Ee,"-").concat(f)})})}}]),o}(t.Component);_e.displayName="ResizeObserver";var Te=_e;function Se(e){var s=(0,t.useRef)(),o=(0,t.useRef)(!1);function a(){for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];o.current||(oe.Z.cancel(s.current),s.current=(0,oe.Z)(function(){e.apply(void 0,i)}))}return(0,t.useEffect)(function(){return function(){o.current=!0,oe.Z.cancel(s.current)}},[]),a}function Ne(e){var s=(0,t.useRef)([]),o=(0,t.useState)({}),a=(0,d.Z)(o,2),r=a[1],i=(0,t.useRef)(typeof e=="function"?e():e),c=Se(function(){var l=i.current;s.current.forEach(function(f){l=f(l)}),s.current=[],i.current=l,r({})});function u(l){s.current.push(l),c()}return[i.current,u]}var D=n(90826);function p(e,s){var o,a=e.prefixCls,r=e.id,i=e.active,c=e.tab,u=c.key,l=c.tab,f=c.disabled,h=c.closeIcon,b=e.closable,g=e.renderWrapper,W=e.removeAriaLabel,R=e.editable,E=e.onClick,_=e.onRemove,U=e.onFocus,w=e.style,Z=e.className,C="".concat(a,"-tab");t.useEffect(function(){return _},[]);var ne=R&&b!==!1&&!f;function V(P){f||E(P)}function X(P){P.preventDefault(),P.stopPropagation(),R.onEdit("remove",{key:u,event:P})}var J=t.createElement("div",{key:u,ref:s,className:O()(C,Z,(o={},(0,v.Z)(o,"".concat(C,"-with-remove"),ne),(0,v.Z)(o,"".concat(C,"-active"),i),(0,v.Z)(o,"".concat(C,"-disabled"),f),o)),style:w,onClick:V},t.createElement("div",{role:"tab","aria-selected":i,id:r&&"".concat(r,"-tab-").concat(u),className:"".concat(C,"-btn"),"aria-controls":r&&"".concat(r,"-panel-").concat(u),"aria-disabled":f,tabIndex:f?null:0,onClick:function(x){x.stopPropagation(),V(x)},onKeyDown:function(x){[D.Z.SPACE,D.Z.ENTER].includes(x.which)&&(x.preventDefault(),V(x))},onFocus:U},l),ne&&t.createElement("button",{type:"button","aria-label":W||"remove",tabIndex:0,className:"".concat(C,"-remove"),onClick:function(x){x.stopPropagation(),X(x)}},h||R.removeIcon||"\xD7"));return g?g(J):J}var re=t.forwardRef(p),A={width:0,height:0,left:0,top:0};function k(e,s,o){return(0,t.useMemo)(function(){for(var a,r=new Map,i=s.get((a=e[0])===null||a===void 0?void 0:a.key)||A,c=i.left+i.width,u=0;u<e.length;u+=1){var l=e[u].key,f=s.get(l);if(!f){var h;f=s.get((h=e[u-1])===null||h===void 0?void 0:h.key)||A}var b=r.get(l)||(0,L.Z)({},f);b.right=c-b.left-b.width,r.set(l,b)}return r},[e.map(function(a){return a.key}).join("_"),s,o])}var Me={width:0,height:0,left:0,top:0,right:0};function Ge(e,s,o,a,r){var i=r.tabs,c=r.tabPosition,u=r.rtl,l,f,h;["top","bottom"].includes(c)?(l="width",f=u?"right":"left",h=Math.abs(s.left)):(l="height",f="top",h=-s.top);var b=s[l],g=o[l],W=a[l],R=b;return g+W>b&&(R=b-W),(0,t.useMemo)(function(){if(!i.length)return[0,0];for(var E=i.length,_=E,U=0;U<E;U+=1){var w=e.get(i[U].key)||Me;if(w[f]+w[l]>h+R){_=U-1;break}}for(var Z=0,C=E-1;C>=0;C-=1){var ne=e.get(i[C].key)||Me;if(ne[f]<h){Z=C+1;break}}return[Z,_]},[e,h,R,c,i.map(function(E){return E.key}).join("_"),u])}var Ke=n(47503),ye=n(87547);function Ye(e,s){var o=e.prefixCls,a=e.editable,r=e.locale,i=e.style;return!a||a.showAdd===!1?null:t.createElement("button",{ref:s,type:"button",className:"".concat(o,"-nav-add"),style:i,"aria-label":(r==null?void 0:r.addAriaLabel)||"Add tab",onClick:function(u){a.onEdit("add",{event:u})}},a.addIcon||"+")}var ke=t.forwardRef(Ye);function Ie(e,s){var o=e.prefixCls,a=e.id,r=e.tabs,i=e.locale,c=e.mobile,u=e.moreIcon,l=u===void 0?"More":u,f=e.moreTransitionName,h=e.style,b=e.className,g=e.editable,W=e.tabBarGutter,R=e.rtl,E=e.removeAriaLabel,_=e.onTabClick,U=(0,t.useState)(!1),w=(0,d.Z)(U,2),Z=w[0],C=w[1],ne=(0,t.useState)(null),V=(0,d.Z)(ne,2),X=V[0],J=V[1],P="".concat(a,"-more-popup"),x="".concat(o,"-dropdown"),H=X!==null?"".concat(P,"-").concat(X):null,y=i==null?void 0:i.dropdownAriaLabel;function B(S,j){S.preventDefault(),S.stopPropagation(),g.onEdit("remove",{key:j,event:S})}var $=t.createElement(Ke.ZP,{onClick:function(j){var fe=j.key,q=j.domEvent;_(fe,q),C(!1)},id:P,tabIndex:-1,role:"listbox","aria-activedescendant":H,selectedKeys:[X],"aria-label":y!==void 0?y:"expanded dropdown"},r.map(function(S){var j=g&&S.closable!==!1&&!S.disabled;return t.createElement(Ke.sN,{key:S.key,id:"".concat(P,"-").concat(S.key),role:"option","aria-controls":a&&"".concat(a,"-panel-").concat(S.key),disabled:S.disabled},t.createElement("span",null,S.tab),j&&t.createElement("button",{type:"button","aria-label":E||"remove",tabIndex:0,className:"".concat(x,"-menu-item-remove"),onClick:function(q){q.stopPropagation(),B(q,S.key)}},S.closeIcon||g.removeIcon||"\xD7"))}));function F(S){for(var j=r.filter(function(Le){return!Le.disabled}),fe=j.findIndex(function(Le){return Le.key===X})||0,q=j.length,$e=0;$e<q;$e+=1){fe=(fe+S+q)%q;var je=j[fe];if(!je.disabled){J(je.key);return}}}function Ae(S){var j=S.which;if(!Z){[D.Z.DOWN,D.Z.SPACE,D.Z.ENTER].includes(j)&&(C(!0),S.preventDefault());return}switch(j){case D.Z.UP:F(-1),S.preventDefault();break;case D.Z.DOWN:F(1),S.preventDefault();break;case D.Z.ESC:C(!1);break;case D.Z.SPACE:case D.Z.ENTER:X!==null&&_(X,S);break}}(0,t.useEffect)(function(){var S=document.getElementById(H);S&&S.scrollIntoView&&S.scrollIntoView(!1)},[X]),(0,t.useEffect)(function(){Z||J(null)},[Z]);var Ze=(0,v.Z)({},R?"marginRight":"marginLeft",W);r.length||(Ze.visibility="hidden",Ze.order=1);var tt=O()((0,v.Z)({},"".concat(x,"-rtl"),R)),be=c?null:t.createElement(ye.Z,{prefixCls:x,overlay:$,trigger:["hover"],visible:Z,transitionName:f,onVisibleChange:C,overlayClassName:tt,mouseEnterDelay:.1,mouseLeaveDelay:.1},t.createElement("button",{type:"button",className:"".concat(o,"-nav-more"),style:Ze,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":P,id:"".concat(a,"-more"),"aria-expanded":Z,onKeyDown:Ae},l));return t.createElement("div",{className:O()("".concat(o,"-nav-operations"),b),style:h,ref:s},be,t.createElement(ke,{prefixCls:o,locale:i,editable:g}))}var Xe=t.memo(t.forwardRef(Ie),function(e,s){return s.tabMoving}),Ue=(0,t.createContext)(null),Qe=.1,we=.01,ve=20,Oe=Math.pow(.995,ve);function De(e,s){var o=(0,t.useState)(),a=(0,d.Z)(o,2),r=a[0],i=a[1],c=(0,t.useState)(0),u=(0,d.Z)(c,2),l=u[0],f=u[1],h=(0,t.useState)(0),b=(0,d.Z)(h,2),g=b[0],W=b[1],R=(0,t.useState)(),E=(0,d.Z)(R,2),_=E[0],U=E[1],w=(0,t.useRef)();function Z(P){var x=P.touches[0],H=x.screenX,y=x.screenY;i({x:H,y}),window.clearInterval(w.current)}function C(P){if(!!r){P.preventDefault();var x=P.touches[0],H=x.screenX,y=x.screenY;i({x:H,y});var B=H-r.x,$=y-r.y;s(B,$);var F=Date.now();f(F),W(F-l),U({x:B,y:$})}}function ne(){if(!!r&&(i(null),U(null),_)){var P=_.x/g,x=_.y/g,H=Math.abs(P),y=Math.abs(x);if(Math.max(H,y)<Qe)return;var B=P,$=x;w.current=window.setInterval(function(){if(Math.abs(B)<we&&Math.abs($)<we){window.clearInterval(w.current);return}B*=Oe,$*=Oe,s(B*ve,$*ve)},ve)}}var V=(0,t.useRef)();function X(P){var x=P.deltaX,H=P.deltaY,y=0,B=Math.abs(x),$=Math.abs(H);B===$?y=V.current==="x"?x:H:B>$?(y=x,V.current="x"):(y=H,V.current="y"),s(-y,-y)&&P.preventDefault()}var J=(0,t.useRef)(null);J.current={onTouchStart:Z,onTouchMove:C,onTouchEnd:ne,onWheel:X},t.useEffect(function(){function P(B){J.current.onTouchStart(B)}function x(B){J.current.onTouchMove(B)}function H(B){J.current.onTouchEnd(B)}function y(B){J.current.onWheel(B)}return document.addEventListener("touchmove",x,{passive:!1}),document.addEventListener("touchend",H,{passive:!1}),e.current.addEventListener("touchstart",P,{passive:!1}),e.current.addEventListener("wheel",y),function(){document.removeEventListener("touchmove",x),document.removeEventListener("touchend",H)}},[])}function We(){var e=(0,t.useRef)(new Map);function s(a){return e.current.has(a)||e.current.set(a,t.createRef()),e.current.get(a)}function o(a){e.current.delete(a)}return[s,o]}function Je(e,s){var o=t.useRef(e),a=t.useState({}),r=(0,d.Z)(a,2),i=r[1];function c(u){var l=typeof u=="function"?u(o.current):u;l!==o.current&&s(l,o.current),o.current=l,i({})}return[o.current,c]}var qe=function(s){var o=s.position,a=s.prefixCls,r=s.extra;if(!r)return null;var i,c={};return r&&(0,m.Z)(r)==="object"&&!t.isValidElement(r)?c=r:c.right=r,o==="right"&&(i=c.right),o==="left"&&(i=c.left),i?t.createElement("div",{className:"".concat(a,"-extra-content")},i):null};function Zt(e,s){var o,a=t.useContext(Ue),r=a.prefixCls,i=a.tabs,c=e.className,u=e.style,l=e.id,f=e.animated,h=e.activeKey,b=e.rtl,g=e.extra,W=e.editable,R=e.locale,E=e.tabPosition,_=e.tabBarGutter,U=e.children,w=e.onTabClick,Z=e.onTabScroll,C=(0,t.useRef)(),ne=(0,t.useRef)(),V=(0,t.useRef)(),X=(0,t.useRef)(),J=We(),P=(0,d.Z)(J,2),x=P[0],H=P[1],y=E==="top"||E==="bottom",B=Je(0,function(T,N){y&&Z&&Z({direction:T>N?"left":"right"})}),$=(0,d.Z)(B,2),F=$[0],Ae=$[1],Ze=Je(0,function(T,N){!y&&Z&&Z({direction:T>N?"top":"bottom"})}),tt=(0,d.Z)(Ze,2),be=tt[0],S=tt[1],j=(0,t.useState)(0),fe=(0,d.Z)(j,2),q=fe[0],$e=fe[1],je=(0,t.useState)(0),Le=(0,d.Z)(je,2),ot=Le[0],Et=Le[1],At=(0,t.useState)(0),yt=(0,d.Z)(At,2),st=yt[0],Lt=yt[1],Ct=(0,t.useState)(0),nt=(0,d.Z)(Ct,2),Pt=nt[0],Q=nt[1],Ve=(0,t.useState)(null),xt=(0,d.Z)(Ve,2),Pe=xt[0],bn=xt[1],pn=(0,t.useState)(null),$t=(0,d.Z)(pn,2),at=$t[0],gn=$t[1],En=(0,t.useState)(0),jt=(0,d.Z)(En,2),yn=jt[0],Cn=jt[1],Pn=(0,t.useState)(0),Vt=(0,d.Z)(Pn,2),xn=Vt[0],Rn=Vt[1],Sn=Ne(new Map),Ft=(0,d.Z)(Sn,2),On=Ft[0],Zn=Ft[1],Rt=k(i,On,q),Gt="".concat(r,"-nav-operations-hidden"),lt=0,ct=0;y?b?(lt=0,ct=Math.max(0,q-Pe)):(lt=Math.min(0,Pe-q),ct=0):(lt=Math.min(0,at-ot),ct=0);function Bt(T){return T<lt?lt:T>ct?ct:T}var Yt=(0,t.useRef)(),Tn=(0,t.useState)(),Xt=(0,d.Z)(Tn,2),St=Xt[0],Qt=Xt[1];function zt(){Qt(Date.now())}function _t(){window.clearTimeout(Yt.current)}De(C,function(T,N){function G(pe,ze){pe(function(Fe){var dt=Bt(Fe+ze);return dt})}if(y){if(Pe>=q)return!1;G(Ae,T)}else{if(at>=ot)return!1;G(S,N)}return _t(),zt(),!0}),(0,t.useEffect)(function(){return _t(),St&&(Yt.current=window.setTimeout(function(){Qt(0)},100)),_t},[St]);function Jt(){var T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h,N=Rt.get(T)||{width:0,height:0,left:0,right:0,top:0};if(y){var G=F;b?N.right<F?G=N.right:N.right+N.width>F+Pe&&(G=N.right+N.width-Pe):N.left<-F?G=-N.left:N.left+N.width>-F+Pe&&(G=-(N.left+N.width-Pe)),S(0),Ae(Bt(G))}else{var pe=be;N.top<-be?pe=-N.top:N.top+N.height>-be+at&&(pe=-(N.top+N.height-at)),Ae(0),S(Bt(pe))}}var Nn=Ge(Rt,{width:Pe,height:at,left:F,top:be},{width:st,height:Pt},{width:yn,height:xn},(0,L.Z)((0,L.Z)({},e),{},{tabs:i})),qt=(0,d.Z)(Nn,2),Mn=qt[0],In=qt[1],Ot={};E==="top"||E==="bottom"?Ot[b?"marginRight":"marginLeft"]=_:Ot.marginTop=_;var en=i.map(function(T,N){var G=T.key,pe=T.className;return t.createElement(re,{id:l,prefixCls:r,key:G,tab:T,style:N===0?void 0:Ot,className:pe,closable:T.closable,editable:W,active:G===h,renderWrapper:U,removeAriaLabel:R==null?void 0:R.removeAriaLabel,ref:x(G),onClick:function(Fe){w(G,Fe)},onRemove:function(){H(G)},onFocus:function(){Jt(G),zt(),!!C.current&&(b||(C.current.scrollLeft=0),C.current.scrollTop=0)}})}),Kt=Se(function(){var T,N,G,pe,ze,Fe,dt,wt,Ht,zn=((T=C.current)===null||T===void 0?void 0:T.offsetWidth)||0,_n=((N=C.current)===null||N===void 0?void 0:N.offsetHeight)||0,cn=((G=X.current)===null||G===void 0?void 0:G.offsetWidth)||0,un=((pe=X.current)===null||pe===void 0?void 0:pe.offsetHeight)||0,Kn=((ze=V.current)===null||ze===void 0?void 0:ze.offsetWidth)||0,kn=((Fe=V.current)===null||Fe===void 0?void 0:Fe.offsetHeight)||0;bn(zn),gn(_n),Cn(cn),Rn(un);var dn=(((dt=ne.current)===null||dt===void 0?void 0:dt.offsetWidth)||0)-cn,vn=(((wt=ne.current)===null||wt===void 0?void 0:wt.offsetHeight)||0)-un;$e(dn),Et(vn);var fn=(Ht=V.current)===null||Ht===void 0?void 0:Ht.className.includes(Gt);Lt(dn-(fn?0:Kn)),Q(vn-(fn?0:kn)),Zn(function(){var mn=new Map;return i.forEach(function(Un){var hn=Un.key,vt=x(hn).current;vt&&mn.set(hn,{width:vt.offsetWidth,height:vt.offsetHeight,left:vt.offsetLeft,top:vt.offsetTop})}),mn})}),Dn=i.slice(0,Mn),Wn=i.slice(In+1),tn=[].concat((0,te.Z)(Dn),(0,te.Z)(Wn)),An=(0,t.useState)(),nn=(0,d.Z)(An,2),Ln=nn[0],Bn=nn[1],Be=Rt.get(h),an=(0,t.useRef)();function rn(){oe.Z.cancel(an.current)}(0,t.useEffect)(function(){var T={};return Be&&(y?(b?T.right=Be.right:T.left=Be.left,T.width=Be.width):(T.top=Be.top,T.height=Be.height)),rn(),an.current=(0,oe.Z)(function(){Bn(T)}),rn},[Be,y,b]),(0,t.useEffect)(function(){Jt()},[h,Be,Rt,y]),(0,t.useEffect)(function(){Kt()},[b,_,h,i.map(function(T){return T.key}).join("_")]);var on=!!tn.length,ut="".concat(r,"-nav-wrap"),kt,Ut,sn,ln;return y?b?(Ut=F>0,kt=F+Pe<q):(kt=F<0,Ut=-F+Pe<q):(sn=be<0,ln=-be+at<ot),t.createElement("div",{ref:s,role:"tablist",className:O()("".concat(r,"-nav"),c),style:u,onKeyDown:function(){zt()}},t.createElement(qe,{position:"left",extra:g,prefixCls:r}),t.createElement(Te,{onResize:Kt},t.createElement("div",{className:O()(ut,(o={},(0,v.Z)(o,"".concat(ut,"-ping-left"),kt),(0,v.Z)(o,"".concat(ut,"-ping-right"),Ut),(0,v.Z)(o,"".concat(ut,"-ping-top"),sn),(0,v.Z)(o,"".concat(ut,"-ping-bottom"),ln),o)),ref:C},t.createElement(Te,{onResize:Kt},t.createElement("div",{ref:ne,className:"".concat(r,"-nav-list"),style:{transform:"translate(".concat(F,"px, ").concat(be,"px)"),transition:St?"none":void 0}},en,t.createElement(ke,{ref:X,prefixCls:r,locale:R,editable:W,style:(0,L.Z)((0,L.Z)({},en.length===0?void 0:Ot),{},{visibility:on?"hidden":null})}),t.createElement("div",{className:O()("".concat(r,"-ink-bar"),(0,v.Z)({},"".concat(r,"-ink-bar-animated"),f.inkBar)),style:Ln}))))),t.createElement(Xe,(0,M.Z)({},e,{removeAriaLabel:R==null?void 0:R.removeAriaLabel,ref:V,prefixCls:r,tabs:tn,className:!on&&Gt,tabMoving:!!St})),t.createElement(qe,{position:"right",extra:g,prefixCls:r}))}var rt=t.forwardRef(Zt);function Tt(e){var s=e.id,o=e.activeKey,a=e.animated,r=e.tabPosition,i=e.rtl,c=e.destroyInactiveTabPane,u=t.useContext(Ue),l=u.prefixCls,f=u.tabs,h=a.tabPane,b=f.findIndex(function(g){return g.key===o});return t.createElement("div",{className:O()("".concat(l,"-content-holder"))},t.createElement("div",{className:O()("".concat(l,"-content"),"".concat(l,"-content-").concat(r),(0,v.Z)({},"".concat(l,"-content-animated"),h)),style:b&&h?(0,v.Z)({},i?"marginRight":"marginLeft","-".concat(b,"00%")):null},f.map(function(g){return t.cloneElement(g.node,{key:g.key,prefixCls:l,tabKey:g.key,id:s,animated:h,active:g.key===o,destroyInactiveTabPane:c})})))}function ft(e){var s=e.prefixCls,o=e.forceRender,a=e.className,r=e.style,i=e.id,c=e.active,u=e.animated,l=e.destroyInactiveTabPane,f=e.tabKey,h=e.children,b=t.useState(o),g=(0,d.Z)(b,2),W=g[0],R=g[1];t.useEffect(function(){c?R(!0):l&&R(!1)},[c,l]);var E={};return c||(u?(E.visibility="hidden",E.height=0,E.overflowY="hidden"):E.display="none"),t.createElement("div",{id:i&&"".concat(i,"-panel-").concat(f),role:"tabpanel",tabIndex:c?0:-1,"aria-labelledby":i&&"".concat(i,"-tab-").concat(f),"aria-hidden":!c,style:(0,L.Z)((0,L.Z)({},E),r),className:O()("".concat(s,"-tabpane"),c&&"".concat(s,"-tabpane-active"),a)},(c||W||o)&&h)}var mt=["id","prefixCls","className","children","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll"],it=0;function He(e){return(0,ae.Z)(e).map(function(s){if(t.isValidElement(s)){var o=s.key!==void 0?String(s.key):void 0;return(0,L.Z)((0,L.Z)({key:o},s.props),{},{node:s})}return null}).filter(function(s){return s})}function Nt(e,s){var o,a=e.id,r=e.prefixCls,i=r===void 0?"rc-tabs":r,c=e.className,u=e.children,l=e.direction,f=e.activeKey,h=e.defaultActiveKey,b=e.editable,g=e.animated,W=g===void 0?{inkBar:!0,tabPane:!1}:g,R=e.tabPosition,E=R===void 0?"top":R,_=e.tabBarGutter,U=e.tabBarStyle,w=e.tabBarExtraContent,Z=e.locale,C=e.moreIcon,ne=e.moreTransitionName,V=e.destroyInactiveTabPane,X=e.renderTabBar,J=e.onChange,P=e.onTabClick,x=e.onTabScroll,H=(0,ie.Z)(e,mt),y=He(u),B=l==="rtl",$;W===!1?$={inkBar:!1,tabPane:!1}:W===!0?$={inkBar:!0,tabPane:!0}:$=(0,L.Z)({inkBar:!0,tabPane:!1},(0,m.Z)(W)==="object"?W:{});var F=(0,t.useState)(!1),Ae=(0,d.Z)(F,2),Ze=Ae[0],tt=Ae[1];(0,t.useEffect)(function(){tt((0,me.Z)())},[]);var be=(0,K.Z)(function(){var Q;return(Q=y[0])===null||Q===void 0?void 0:Q.key},{value:f,defaultValue:h}),S=(0,d.Z)(be,2),j=S[0],fe=S[1],q=(0,t.useState)(function(){return y.findIndex(function(Q){return Q.key===j})}),$e=(0,d.Z)(q,2),je=$e[0],Le=$e[1];(0,t.useEffect)(function(){var Q=y.findIndex(function(xt){return xt.key===j});if(Q===-1){var Ve;Q=Math.max(0,Math.min(je,y.length-1)),fe((Ve=y[Q])===null||Ve===void 0?void 0:Ve.key)}Le(Q)},[y.map(function(Q){return Q.key}).join("_"),j,je]);var ot=(0,K.Z)(null,{value:a}),Et=(0,d.Z)(ot,2),At=Et[0],yt=Et[1],st=E;Ze&&!["left","right"].includes(E)&&(st="top"),(0,t.useEffect)(function(){a||(yt("rc-tabs-".concat(it)),it+=1)},[]);function Lt(Q,Ve){P==null||P(Q,Ve),fe(Q),J==null||J(Q)}var Ct={id:At,activeKey:j,animated:$,tabPosition:st,rtl:B,mobile:Ze},nt,Pt=(0,L.Z)((0,L.Z)({},Ct),{},{editable:b,locale:Z,moreIcon:C,moreTransitionName:ne,tabBarGutter:_,onTabClick:Lt,onTabScroll:x,extra:w,style:U,panes:u});return X?nt=X(Pt,rt):nt=t.createElement(rt,Pt),t.createElement(Ue.Provider,{value:{tabs:y,prefixCls:i}},t.createElement("div",(0,M.Z)({ref:s,id:a,className:O()(i,"".concat(i,"-").concat(st),(o={},(0,v.Z)(o,"".concat(i,"-mobile"),Ze),(0,v.Z)(o,"".concat(i,"-editable"),b),(0,v.Z)(o,"".concat(i,"-rtl"),B),o),c)},H),nt,t.createElement(Tt,(0,M.Z)({destroyInactiveTabPane:V},Ct,{animated:$}))))}var he=t.forwardRef(Nt);he.TabPane=ft;var Mt=he,It=Mt,Dt=n(44545),ht=n(49101),et=n(54549),se=n(20324),bt=n(67170),Wt=n(10772),Ce=function(e,s){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&s.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)s.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]]);return o};function pt(e){var s=e.type,o=e.className,a=e.size,r=e.onEdit,i=e.hideAdd,c=e.centered,u=e.addIcon,l=Ce(e,["type","className","size","onEdit","hideAdd","centered","addIcon"]),f=l.prefixCls,h=l.moreIcon,b=h===void 0?t.createElement(Dt.Z,null):h,g=t.useContext(bt.E_),W=g.getPrefixCls,R=g.direction,E=W("tabs",f),_;s==="editable-card"&&(_={onEdit:function(Z,C){var ne=C.key,V=C.event;r==null||r(Z==="add"?V:ne,Z)},removeIcon:t.createElement(et.Z,null),addIcon:u||t.createElement(ht.Z,null),showAdd:i!==!0});var U=W();return(0,se.Z)(!("onPrevClick"in l)&&!("onNextClick"in l),"Tabs","`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead."),t.createElement(Wt.Z.Consumer,null,function(w){var Z,C=a!==void 0?a:w;return t.createElement(It,(0,M.Z)({direction:R,moreTransitionName:"".concat(U,"-slide-up")},l,{className:O()((Z={},(0,v.Z)(Z,"".concat(E,"-").concat(C),C),(0,v.Z)(Z,"".concat(E,"-card"),["card","editable-card"].includes(s)),(0,v.Z)(Z,"".concat(E,"-editable-card"),s==="editable-card"),(0,v.Z)(Z,"".concat(E,"-centered"),c),Z),o),editable:_,moreIcon:b,prefixCls:E}))})}pt.TabPane=ft;var gt=pt},84786:function(xe,ee,n){"use strict";var M=n(65056),v=n.n(M),t=n(25414),d=n.n(t)},74281:function(xe,ee,n){"use strict";var M=n(45937),v=n(96285),t=n(76553),d=n(75304),m=n(40251),ie=n(67294),L=n(97560),ge=n(10048),O=n(32503),ae=n(78703),me=n(55065),K="rc-observer-key",te=function(oe){(0,d.Z)(ue,oe);var Re=(0,m.Z)(ue);function ue(){var I;(0,v.Z)(this,ue);for(var le=arguments.length,z=new Array(le),Y=0;Y<le;Y++)z[Y]=arguments[Y];return I=Re.call.apply(Re,[this].concat(z)),I.resizeObserver=null,I.childNode=null,I.currentElement=null,I.state={width:0,height:0,offsetHeight:0,offsetWidth:0},I.onResize=function(ce){var de=I.props.onResize,Ee=ce[0].target,_e=Ee.getBoundingClientRect(),Te=_e.width,Se=_e.height,Ne=Ee.offsetWidth,D=Ee.offsetHeight,p=Math.floor(Te),re=Math.floor(Se);if(I.state.width!==p||I.state.height!==re||I.state.offsetWidth!==Ne||I.state.offsetHeight!==D){var A={width:p,height:re,offsetWidth:Ne,offsetHeight:D};if(I.setState(A),de){var k=Ne===Math.round(Te)?Te:Ne,Me=D===Math.round(Se)?Se:D;Promise.resolve().then(function(){de((0,M.Z)((0,M.Z)({},A),{},{offsetWidth:k,offsetHeight:Me}),Ee)})}}},I.setChildNode=function(ce){I.childNode=ce},I}return(0,t.Z)(ue,[{key:"componentDidMount",value:function(){this.onComponentUpdated()}},{key:"componentDidUpdate",value:function(){this.onComponentUpdated()}},{key:"componentWillUnmount",value:function(){this.destroyObserver()}},{key:"onComponentUpdated",value:function(){var le=this.props.disabled;if(le){this.destroyObserver();return}var z=(0,L.Z)(this.childNode||this),Y=z!==this.currentElement;Y&&(this.destroyObserver(),this.currentElement=z),!this.resizeObserver&&z&&(this.resizeObserver=new me.Z(this.onResize),this.resizeObserver.observe(z))}},{key:"destroyObserver",value:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}},{key:"render",value:function(){var le=this.props.children,z=(0,ge.Z)(le);if(z.length>1)(0,O.ZP)(!1,"Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if(z.length===0)return(0,O.ZP)(!1,"`children` of ResizeObserver is empty. Nothing is in observe."),null;var Y=z[0];if(ie.isValidElement(Y)&&(0,ae.Yr)(Y)){var ce=Y.ref;z[0]=ie.cloneElement(Y,{ref:(0,ae.sQ)(ce,this.setChildNode)})}return z.length===1?z[0]:z.map(function(de,Ee){return!ie.isValidElement(de)||"key"in de&&de.key!==null?de:ie.cloneElement(de,{key:"".concat(K,"-").concat(Ee)})})}}]),ue}(ie.Component);te.displayName="ResizeObserver",ee.Z=te},3305:function(xe,ee){"use strict";function n(M,v){for(var t=Object.assign({},M),d=0;d<v.length;d+=1){var m=v[d];delete t[m]}return t}ee.Z=n}}]);

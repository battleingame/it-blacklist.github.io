var B=Object.defineProperty;var y=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var v=(r,t,a)=>t in r?B(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,S=(r,t)=>{for(var a in t||(t={}))C.call(t,a)&&v(r,a,t[a]);if(y)for(var a of y(t))N.call(t,a)&&v(r,a,t[a]);return r};import{j as e,c as j,u as A,r as o,b as p,F as x,L,N as H,S as D,P as M,h as b,E as W,I as k,i as I,k as P}from"./vendor.3311845d.js";import{H as w}from"./index.bf0bb543.js";import{g as E}from"./index.c6a4b3cb.js";const z="_header_barsy_1",K="_left_barsy_10",R="_placeholder_barsy_13",T="_loadingWrapper_barsy_18";var c={header:z,left:K,placeholder:R,loadingWrapper:T};const V=()=>{const r=A(),[t,a]=o.exports.useState([]),[h,i]=o.exports.useState(!0),[F,l]=o.exports.useState(1),[m,f]=o.exports.useState("");o.exports.useEffect(()=>{u()},[]);async function g(s,_){return s?E({current:1,pageSize:20,city:"\u77F3\u5BB6\u5E84",company:_}).then(n=>{l(d=>d+1),a([...n]),i(n.length>=20)}):E({current:F,pageSize:20,city:"\u77F3\u5BB6\u5E84",company:_}).then(n=>{l(d=>d+1),a([...t,...n]),i(n.length>=20)})}async function u(s=m){l(1),a([]),i(!0),await g(!0,s)}return p(x,{children:[e(L,{to:"/statement",children:e(H,{content:"\u7F6E\u9876\u516C\u544A",color:"alert"})}),e(w,{}),e("div",{className:c.header,children:e("div",{className:c.left,children:e(D,{value:m,onChange:s=>f(s),onSearch:u,placeholder:"\u8F93\u5165\u516C\u53F8\u540D\u79F0\u641C\u7D22~"})})}),e(M,{onRefresh:()=>{f(""),u("")},children:t.length>0?p(x,{children:[e(b,{children:t.map(s=>e(b.Item,{description:e(W,{direction:"end",rows:2,content:s.content}),onClick:()=>r(`/uni-content?_id=${s._id}&type="uni"`),children:s.company},s._id))}),e(k,{loadMore:g,hasMore:h})]}):h?p("div",{className:c.placeholder,children:[e("div",{className:c.loadingWrapper,children:e(P,{})}),"\u6B63\u5728\u62FC\u547D\u52A0\u8F7D\u6570\u636E"]}):e(I,{description:"\u6682\u65E0\u6570\u636E"})})]})},O=r=>e(j.exports.KeepAlive,{saveScrollPosition:"screen",children:e(V,S({},r))});export{O as default};
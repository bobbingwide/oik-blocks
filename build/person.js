(()=>{"use strict";var e,t={530:(e,t,o)=>{const r=window.wp.i18n;function n(e){var t,o,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(o=n(e[t]))&&(r&&(r+=" "),r+=o)}else for(o in e)e[o]&&(r&&(r+=" "),r+=o);return r}const s=function(){for(var e,t,o=0,r="",s=arguments.length;o<s;o++)(e=arguments[o])&&(t=n(e))&&(r&&(r+=" "),r+=t);return r},i=window.wp.blocks,l=window.wp.blockEditor,a=window.wp.serverSideRender;var c=o.n(a);const u=window.wp.components,b=window.wp.element,d=window.lodash,p=window.ReactJSXRuntime;var v={none:(0,r.__)("Logos","oik-blocks"),gener:(0,r.__)("Genericons","oik-blocks")};v=(0,d.map)(v,((e,t)=>({value:t,label:e}))),(0,i.registerBlockType)("oik-block/person",{edit:e=>{const{attributes:t,setAttributes:o,instanceId:n,focus:i,isSelected:a}=e,{textAlign:d,label:f}=e.attributes,w=(0,l.useBlockProps)({className:s({[`has-text-align-${d}`]:d})});return(0,p.jsxs)(b.Fragment,{children:[(0,p.jsx)(l.InspectorControls,{children:(0,p.jsxs)(u.PanelBody,{children:[(0,p.jsx)(u.PanelRow,{children:(0,p.jsx)(u.TextControl,{label:(0,r.__)("User","oik-blocks"),value:e.attributes.user,onChange:t=>{e.setAttributes({user:t})}})}),(0,p.jsx)(u.PanelRow,{children:(0,p.jsx)(u.SelectControl,{label:(0,r.__)("Follow me icons style","oik-blocks"),value:e.attributes.theme,options:v,onChange:t=>{e.setAttributes({theme:t})}})}),(0,p.jsx)(u.PanelRow,{children:(0,p.jsx)(u.TextControl,{label:(0,r.__)("Fields","oik-blocks"),value:e.attributes.fields,onChange:t=>{e.setAttributes({fields:t})}})})]})}),(0,p.jsx)("div",{...w,children:(0,p.jsx)(c(),{block:"oik-block/person",attributes:e.attributes})})]})},save:({attributes:e})=>null})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var s=o[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=(t,o,n,s)=>{if(!o){var i=1/0;for(u=0;u<e.length;u++){for(var[o,n,s]=e[u],l=!0,a=0;a<o.length;a++)(!1&s||i>=s)&&Object.keys(r.O).every((e=>r.O[e](o[a])))?o.splice(a--,1):(l=!1,s<i&&(i=s));if(l){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[o,n,s]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={968:0,561:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,s,[i,l,a]=o,c=0;if(i.some((t=>0!==e[t]))){for(n in l)r.o(l,n)&&(r.m[n]=l[n]);if(a)var u=a(r)}for(t&&t(o);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(u)},o=globalThis.webpackChunkoik_blocks=globalThis.webpackChunkoik_blocks||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[561],(()=>r(530)));n=r.O(n)})();
!function(){var e,t={280:function(e,t,l){"use strict";var n=window.wp.element,o=window.wp.i18n,r=l(184),a=l.n(r),i=window.wp.blocks,c=window.wp.blockEditor,s=window.wp.serverSideRender,u=l.n(s),b=window.wp.components,k=window.lodash,m=window.wp.data,p=window.wp.url;const{Component:d}=wp.element,{getBlockTypes:h,getBlockType:v}=wp.blocks,{BlockIcon:w}=wp.blockEditor,{SelectControl:g}=wp.components;function f(e){let{value:t,onChange:l,...r}=e;const a=h().map((e=>y(e))).filter(_).map((e=>function(e){return{label:e,value:e}}(e)));return a.sort(E),(0,n.createElement)(g,{label:(0,o.__)("Prefix","oik-blocks"),value:t,options:a,onChange:l})}function E(e,t){return e.value<t.value?-1:e.value>t.value?1:0}function _(e,t,l){return l.indexOf(e)===t}function y(e){return e.name.split("/")[0]}function C(e,t,l,o,r){const a=e.split("/")[0];var c=(0,i.getBlockTypes)(),s=(c=(c=c.filter(B,a)).sort(((e,t)=>e.title.localeCompare(t.title)))).length,u=I(c),b=null;l&&o&&(b=t?u.map((e=>P(e,r))):u.map((e=>T(e))));var k=null;if(o)t?k=(0,n.createElement)("pre",null,"rem Blocks ",s,(0,n.createElement)("br",null),"rem Variations ",u.length,(0,n.createElement)("br",null),c.map((e=>P(e,r))),b):(c=c.sort(((e,t)=>e.name.localeCompare(t.name))),k=(0,n.createElement)("pre",null,"rem Block ",s,(0,n.createElement)("br",null),"rem Variations ",u.length,(0,n.createElement)("br",null),c.map((e=>T(e))),b));else if(k=(0,n.createElement)("dl",null,c.map((e=>A(e,t)))),l){var m=(0,n.createElement)("dl",null,u.map((e=>A(e,t))));k=(0,n.createElement)(n.Fragment,null,k,(0,n.createElement)("h3",null,"Variations"),m)}return k}function B(e,t,l){return this==y(e)}function A(e,t){var l=null;t&&(l=void 0===e.block_name||""===e.block_name?function(e){var t=e.title.replace(/ /g,"-");t=(t=t.replace("/","-")).toLowerCase();var l=e.name.replace("/","-"),n=null,o=(0,m.select)("core/editor").getPermalinkParts();if(null!==o){var r=(0,m.select)("core/editor").getCurrentPostType();n=o.prefix.replace(r,"block")}else console.log("SiteURL's null");return`${n}${t}-${l}`}(e):function(e){var t=$(e.block_title),l=(window.location.href,(window.location.origin+window.location.pathname).replace("wp-admin/post.php","")+"block/"),n=$(e.title),o=e.block_name.replace("/","-");return`${l}${t}-${o}/${n}-${o}`}(e));var r,a,i;return r=void 0===e.block_name||""===e.block_name?"":" : ",a=V(e),i=x(e.description),(0,n.createElement)(n.Fragment,{key:e.block_name+"|"+e.name},(0,n.createElement)("dt",null,(0,n.createElement)(b.Icon,{icon:e.icon&&e.icon.src?e.icon.src:e.icon})),(0,n.createElement)("dd",null,t&&(0,n.createElement)("a",{href:l,title:(0,o.__)("View block","oik-blocks")},e.block_title,r,e.title," - ",e.block_name," ",e.name),!t&&(0,n.createElement)("span",null,e.block_title,r,e.title," - ",e.block_name," ",e.name),a,(0,n.createElement)("br",null),i,(0,n.createElement)("br",null)))}function P(e,t){var l=ajaxurl,o=x(e.description),r=e.keywords?e.keywords.join():null;return l=(0,p.addQueryArgs)(l,{action:"oiksc_create_or_update_block"}),l=(0,p.addQueryArgs)(l,{title:e.title}),l=(0,p.addQueryArgs)(l,{name:e.name}),l=(0,p.addQueryArgs)(l,{description:o}),l=(0,p.addQueryArgs)(l,{component:t}),l=(0,p.addQueryArgs)(l,{keywords:r}),l=(0,p.addQueryArgs)(l,{category:e.category}),l=(0,p.addQueryArgs)(l,{variation:e.block_name}),(0,n.createElement)("a",{key:e.name,href:l},"Create/Update: ",e.title," - ",e.name,(0,n.createElement)("br",null))}function T(e,t){var l="";void 0!==e.block_name&&(l=l.concat(e.block_name," ")),l=l.concat(e.name);var o="";return void 0!==e.block_title&&(o=o.concat(e.block_title," ")),o=o.concat(e.title),(0,n.createElement)(n.Fragment,null,l,",",o,(0,n.createElement)("br",null))}function x(e){if("boolean"==typeof e)return"";if("string"==typeof e)return e;var t="TBC",l=e.props.children;return"p"===l[0].type&&(t=l[0].props.children),t}function S(e){if(void 0===e.variations)return null;var t=e.variations;return(0,n.createElement)("dl",null,t.map((t=>function(e,t){return A(R(e,t),!0)}(t,e))))}function I(e){var t=[];return t=e.map((e=>function(e){return e.variations.map((t=>R(t,e)))}(e))),console.log(t),t=t.flat(),console.log(t),t}function R(e,t){var l=Object.assign({},e);return void 0===l.title&&(l.title=t.title),void 0===l.icon&&(l.icon=t.icon),void 0===l.description&&(l.description=t.description),l.block_name=t.name,l.block_title=t.title,l}function $(e){var t=e;return(t=(t=(t=t.replace(/ /g,"-")).replace(/\//g,"")).replace(/--/g,"-")).toLowerCase()}function O(e){let{value:t,onChange:l,...r}=e;const a=function(){var e=(0,i.getBlockTypes)(),t=I(e),l=e.map((e=>function(e){var t=function(e){return`${e.name} - ${e.title}`}(e);return{label:t,value:e.name}}(e)));const n=t.map((e=>function(e){var t=function(e){return`${e.block_name} - ${e.name} - ${e.title}`}(e);return{label:t,value:e.block_name+"|"+e.name}}(e)));return l.concat(n)}();return a.sort(L),(0,n.createElement)(b.SelectControl,{label:(0,o.__)("Blocks","oik-blocks"),value:t,options:a,onChange:l})}function L(e,t){return e.value<t.value?-1:e.value>t.value?1:0}function N(e){for(var t=F(e),l=arguments.length,o=new Array(l>1?l-1:0),r=1;r<l;r++)o[r-1]=arguments[r];return(0,n.createElement)("div",{className:o.className},t?(0,n.createElement)(b.Icon,{icon:t.icon&&t.icon.src?t.icon.src:t.icon}):(0,n.createElement)("p",null,"Hmm"))}function F(e){var t=e.split("|"),l=t[0],n=(0,i.getBlockType)(l);void 0===n&&(n=(0,i.getBlockType)("core/missing"));var o=void 0;if(t.length>1&&(o=t[1],void 0!==n.variations)){var r=n.variations.find((e=>e.name===o));r&&(n=R(r,n))}return void 0===n.block_name&&(n.block_name="",n.block_title=""),n}function V(e){return(0,i.hasBlockSupport)(e,"inserter",!0)?"":" ( Not insertable )"}function j(e,t,l,o,r,a,i,c,s){var u=F(e);if(t){var b=A(u,t);return(0,n.createElement)("dl",null,b)}for(var k=arguments.length,m=new Array(k>9?k-9:0),p=9;p<k;p++)m[p-9]=arguments[p];var d=l?N(e,m):null,h=o?(0,n.createElement)("div",null,u.block_name," ",u.name):null,v=r?(0,n.createElement)("div",null,u.title):null,w=a?x(u.description):null,g=i?(0,n.createElement)("div",null,u.category):null,f=u.keywords?u.keywords.join():null,E=c?(0,n.createElement)("div",null,f):null,_=null;_=""===(_=V(u))?null:(0,n.createElement)("div",null,_);var y=s?S(u):null;return(0,n.createElement)("div",{className:m.className},d,_,h,v,w,g,E,y)}(0,i.registerBlockType)("oik-block/blockicon",{example:{},styles:[{name:"svg24",label:"24px"},{name:"svg64",label:"64px",isDefault:!0},{name:"svg100",label:"100px"},{name:"svg150",label:"150px"}],edit:e=>{const{attributes:t,setAttributes:l,instanceId:o,focus:r,isSelected:i}=e,{textAlign:s,label:u}=e.attributes,k=(0,c.useBlockProps)({className:a()({[`has-text-align-${s}`]:s})});var m=N(e.attributes.blockicon,e);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(O,{value:e.attributes.blockicon,onChange:t=>{e.setAttributes({blockicon:t})}})))),(0,n.createElement)("div",k,m))},save:e=>{const t=c.useBlockProps.save();var l=N(e.attributes.blockicon,e);return(0,n.createElement)("div",t,l)}}),(0,i.registerBlockType)("oik-block/blockinfo",{example:{},transforms:{from:[{type:"block",blocks:["oik-block/blockicon"],transform:function(e){return(0,i.createBlock)("oik-block/blockinfo",{blockicon:e.blockicon})}}],to:[{type:"block",blocks:["oik-block/blockicon"],transform:function(e){return(0,i.createBlock)("oik-block/blockicon",{blockicon:e.blockicon})}}]},edit:e=>{const{attributes:t,setAttributes:l,instanceId:r,focus:i,isSelected:s}=e,{textAlign:u,label:k}=e.attributes,m=(0,c.useBlockProps)({className:a()({[`has-text-align-${u}`]:u})});var p=j(e.attributes.blockicon,e.attributes.showBlockLink,e.attributes.showBlockIcon,e.attributes.showBlockTypeName,e.attributes.showTitle,e.attributes.showDescription,e.attributes.showCategory,e.attributes.showKeywords,e.attributes.showVariations,e);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(O,{value:e.attributes.blockicon,onChange:t=>{e.setAttributes({blockicon:t})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block link","oik-blocks"),checked:!!e.attributes.showBlockLink,onChange:t=>{e.setAttributes({showBlockLink:!e.attributes.showBlockLink})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block icon","oik-blocks"),checked:!!e.attributes.showBlockIcon,onChange:t=>{e.setAttributes({showBlockIcon:!e.attributes.showBlockIcon})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block type name","oik-blocks"),checked:!!e.attributes.showBlockTypeName,onChange:t=>{e.setAttributes({showBlockTypeName:!e.attributes.showBlockTypeName})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block title","oik-blocks"),checked:!!e.attributes.showTitle,onChange:t=>{e.setAttributes({showTitle:!e.attributes.showTitle})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block description","oik-blocks"),checked:!!e.attributes.showDescription,onChange:t=>{e.setAttributes({showDescription:!e.attributes.showDescription})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show category","oik-blocks"),checked:!!e.attributes.showCategory,onChange:t=>{e.setAttributes({showCategory:!e.attributes.showCategory})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show keywords","oik-blocks"),checked:!!e.attributes.showKeywords,onChange:t=>{e.setAttributes({showKeywords:!e.attributes.showKeywords})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show variations","oik-blocks"),checked:!!e.attributes.showVariations,onChange:t=>{e.setAttributes({showVariations:!e.attributes.showVariations})}})))),(0,n.createElement)("div",m,p))},save:e=>{const t=c.useBlockProps.save();var l=j(e.attributes.blockicon,e.attributes.showBlockLink,e.attributes.showBlockIcon,e.attributes.showBlockTypeName,e.attributes.showTitle,e.attributes.showDescription,e.attributes.showCategory,e.attributes.showKeywords,e.attributes.showVariations,e);return(0,n.createElement)("div",t,l)}}),(0,i.registerBlockType)("oik-block/blocklist",{example:{attributes:{showBlockLink:!1,prefix:"oik-block"}},edit:e=>{const{attributes:t,setAttributes:l,instanceId:r,focus:i,isSelected:s}=e,{textAlign:u,label:k}=e.attributes,m=(0,c.useBlockProps)({className:a()({[`has-text-align-${u}`]:u})});var p=C(e.attributes.prefix,e.attributes.showBlockLink,e.attributes.showVariations,e.attributes.showBatch,e.attributes.component);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(f,{value:e.attributes.prefix,onChange:t=>{e.setAttributes({prefix:t})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block link","oik-blocks"),checked:!!e.attributes.showBlockLink,onChange:t=>{e.setAttributes({showBlockLink:!e.attributes.showBlockLink})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show block variations","oik-blocks"),checked:!!e.attributes.showVariations,onChange:t=>{e.setAttributes({showVariations:!e.attributes.showVariations})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Show batch commands","oik-blocks"),checked:!!e.attributes.showBatch,onChange:t=>{e.setAttributes({showBatch:!e.attributes.showBatch})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("Component","oik-blocks"),value:e.attributes.component,onChange:t=>{e.setAttributes({component:t})}})))),(0,n.createElement)("div",m,p))},save:e=>{const t=c.useBlockProps.save();var l=C(e.attributes.prefix,e.attributes.showBlockLink,e.attributes.showVariations,e.attributes.showBatch,e.attributes.component);return(0,n.createElement)("div",t,l)}});const D={none:(0,o.__)("All","oik-blocks"),featured:(0,o.__)("Featured image","oik-blocks"),file_size:(0,o.__)("File size of attachment","oik-blocks"),dimensions:(0,o.__)("Image dimensions","oik-blocks"),thumbnail:(0,o.__)("Thumbnail","oik-blocks"),googlemap:(0,o.__)("Google Maps Map","oik-blocks"),template:(0,o.__)("Page template name","oik-blocks"),post_date:(0,o.__)("Post date","oik-blocks"),post_modified:(0,o.__)("Post modified date","oik-blocks"),author_name:(0,o.__)("Author name","oik-blocks")};(0,i.registerBlockType)("oik-block/fields",{example:{},edit:e=>{const{attributes:t,setAttributes:l,instanceId:r,focus:i,isSelected:s}=e,{textAlign:m,label:p}=e.attributes,d=(0,c.useBlockProps)({className:a()({[`has-text-align-${m}`]:m})});return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.SelectControl,{label:(0,o.__)("Fields","oik-blocks"),value:e.attributes.fields,options:(0,k.map)(D,((e,t)=>({value:t,label:e}))),onChange:(0,k.partial)((function(t,l){e.setAttributes({[t]:l})}),"fields")})))),(0,n.createElement)("div",d,(0,n.createElement)(u(),{block:"oik-block/fields",attributes:e.attributes})))},save(){return null}});const Q={default:(0,o.__)("Default","oik-blocks"),bar:(0,o.__)("Bar","oik-blocks")};(0,i.registerBlockType)("oik-block/nivo",{edit:e=>{const{attributes:t,setAttributes:l,instanceId:r,focus:i,isSelected:s}=e,{textAlign:u,label:m}=e.attributes,p=(0,c.useBlockProps)({className:a()({[`has-text-align-${u}`]:u})});function d(t,l){e.setAttributes({[t]:l})}var h=e.attributes,v="[nivo";for(var w of Object.keys(h)){var g=h[w];g&&(v=v+" "+w+'="'+g+'"')}return v+="]",[(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("Theme","oik-blocks"),value:e.attributes.theme,id:"theme",onChange:t=>{e.setAttributes({theme:t})}}),(0,n.createElement)(b.TextControl,{label:(0,o.__)("IDs","oik-blocks"),value:e.attributes.id,onChange:t=>{e.setAttributes({id:t})}}),(0,n.createElement)(b.TextControl,{label:(0,o.__)("Effect","oik-blocks"),value:e.attributes.effect,onChange:(0,k.partial)(d,"effect")}),(0,n.createElement)(b.SelectControl,{label:"t2",value:e.attributes.theme,options:(0,k.map)(Q,((e,t)=>({value:t,label:e}))),onChange:(0,k.partial)(d,"theme")}))),(0,n.createElement)("div",p,(0,n.createElement)(n.Fragment,null,v))]},save:e=>{const t=c.useBlockProps.save();var l=e.attributes,o="[nivo";for(var r of Object.keys(l)){var a=l[r];a&&(o=o+" "+r+'="'+a+'"')}return o+="]",(0,n.createElement)(n.RawHTML,t,o)}});var K={none:(0,o.__)("Logos","oik-blocks"),gener:(0,o.__)("Genericons","oik-blocks")};K=(0,k.map)(K,((e,t)=>({value:t,label:e}))),(0,i.registerBlockType)("oik-block/person",{edit:e=>{const{attributes:t,setAttributes:l,instanceId:r,focus:i,isSelected:s}=e,{textAlign:k,label:m}=e.attributes,p=(0,c.useBlockProps)({className:a()({[`has-text-align-${k}`]:k})});return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(b.PanelBody,null,(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("User","oik-blocks"),value:e.attributes.user,onChange:t=>{e.setAttributes({user:t})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.SelectControl,{label:(0,o.__)("Follow me icons style","oik-blocks"),value:e.attributes.theme,options:K,onChange:t=>{e.setAttributes({theme:t})}})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("Fields","oik-blocks"),value:e.attributes.fields,onChange:t=>{e.setAttributes({fields:t})}})))),(0,n.createElement)("div",p,(0,n.createElement)(u(),{block:"oik-block/person",attributes:e.attributes})))},save(e){let{attributes:t}=e;return null}})},184:function(e,t){var l;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var r=typeof l;if("string"===r||"number"===r)e.push(l);else if(Array.isArray(l)){if(l.length){var a=o.apply(null,l);a&&e.push(a)}}else if("object"===r){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var i in l)n.call(l,i)&&l[i]&&e.push(i)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(l=function(){return o}.apply(t,[]))||(e.exports=l)}()}},l={};function n(e){var o=l[e];if(void 0!==o)return o.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=function(t,l,o,r){if(!l){var a=1/0;for(u=0;u<e.length;u++){l=e[u][0],o=e[u][1],r=e[u][2];for(var i=!0,c=0;c<l.length;c++)(!1&r||a>=r)&&Object.keys(n.O).every((function(e){return n.O[e](l[c])}))?l.splice(c--,1):(i=!1,r<a&&(a=r));if(i){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[l,o,r]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var o,r,a=l[0],i=l[1],c=l[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var u=c(n)}for(t&&t(l);s<a.length;s++)r=a[s],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},l=self.webpackChunkoik_blocks=self.webpackChunkoik_blocks||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var o=n.O(void 0,[431],(function(){return n(280)}));o=n.O(o)}();
"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[4013],{61460:(e,t,s)=>{s.d(t,{Z:()=>v});var a=s(67294),i=s(90512),r=s(46040),l=s(87524),n=s(39960),c=s(95999),o=s(16550),m=s(48596);function d(e){const{pathname:t}=(0,o.TH)();return(0,a.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,m.Mg)(e.permalink,t))}(e,t)))),[e,t])}const u={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};var g=s(85893);function h(e){let{sidebar:t}=e;const s=d(t.items);return(0,g.jsx)("aside",{className:"col col--3",children:(0,g.jsxs)("nav",{className:(0,i.Z)(u.sidebar,"thin-scrollbar"),"aria-label":(0,c.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,g.jsx)("div",{className:(0,i.Z)(u.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,g.jsx)("ul",{className:(0,i.Z)(u.sidebarItemList,"clean-list"),children:s.map((e=>(0,g.jsx)("li",{className:u.sidebarItem,children:(0,g.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var b=s(13102);function p(e){let{sidebar:t}=e;const s=d(t.items);return(0,g.jsx)("ul",{className:"menu__list",children:s.map((e=>(0,g.jsx)("li",{className:"menu__list-item",children:(0,g.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function j(e){return(0,g.jsx)(b.Zo,{component:p,props:e})}function x(e){let{sidebar:t}=e;const s=(0,l.i)();return t?.items.length?"mobile"===s?(0,g.jsx)(j,{sidebar:t}):(0,g.jsx)(h,{sidebar:t}):null}function v(e){const{sidebar:t,toc:s,children:a,...l}=e,n=t&&t.items.length>0;return(0,g.jsx)(r.Z,{...l,children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsx)(x,{sidebar:t}),(0,g.jsx)("main",{className:(0,i.Z)("col",{"col--7":n,"col--9 col--offset-1":!n}),itemScope:!0,itemType:"https://schema.org/Blog",children:a}),s&&(0,g.jsx)("div",{className:"col col--2",children:s})]})})})}},24524:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});s(67294);var a=s(90512),i=s(35155),r=s(1944),l=s(35281),n=s(61460),c=s(26090),o=s(90197),m=s(92503),d=s(85893);function u(e){let{tags:t,sidebar:s}=e;const u=(0,i.M)();return(0,d.jsxs)(r.FG,{className:(0,a.Z)(l.k.wrapper.blogPages,l.k.page.blogTagsListPage),children:[(0,d.jsx)(r.d,{title:u}),(0,d.jsx)(o.Z,{tag:"blog_tags_list"}),(0,d.jsxs)(n.Z,{sidebar:s,children:[(0,d.jsx)(m.Z,{as:"h1",children:u}),(0,d.jsx)(c.Z,{tags:t})]})]})}},13008:(e,t,s)=>{s.d(t,{Z:()=>n});s(67294);var a=s(90512),i=s(39960);const r={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var l=s(85893);function n(e){let{permalink:t,label:s,count:n}=e;return(0,l.jsxs)(i.Z,{href:t,className:(0,a.Z)(r.tag,n?r.tagWithCount:r.tagRegular),children:[s,n&&(0,l.jsx)("span",{children:n})]})}},26090:(e,t,s)=>{s.d(t,{Z:()=>o});s(67294);var a=s(35155),i=s(13008),r=s(92503);const l={tag:"tag_Nnez"};var n=s(85893);function c(e){let{letterEntry:t}=e;return(0,n.jsxs)("article",{children:[(0,n.jsx)(r.Z,{as:"h2",id:t.letter,children:t.letter}),(0,n.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,n.jsx)("li",{className:l.tag,children:(0,n.jsx)(i.Z,{...e})},e.permalink)))}),(0,n.jsx)("hr",{})]})}function o(e){let{tags:t}=e;const s=(0,a.P)(t);return(0,n.jsx)("section",{className:"margin-vert--lg",children:s.map((e=>(0,n.jsx)(c,{letterEntry:e},e.letter)))})}},35155:(e,t,s)=>{s.d(t,{M:()=>i,P:()=>r});var a=s(95999);const i=()=>(0,a.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function r(e){const t={};return Object.values(e).forEach((e=>{const s=function(e){return e[0].toUpperCase()}(e.label);t[s]??=[],t[s].push(e)})),Object.entries(t).sort(((e,t)=>{let[s]=e,[a]=t;return s.localeCompare(a)})).map((e=>{let[t,s]=e;return{letter:t,tags:s.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}}}]);
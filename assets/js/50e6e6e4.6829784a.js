"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[9450],{64850:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>r,toc:()=>o});var a=s(85893),i=s(11151);const t={title:"WSL (Windows Subsystem for Linux)",authors:"lyrihkaesa",tags:["guide","windows-10"]},l=void 0,r={permalink:"/blog/2023/10/07/wsl",editUrl:"https://github.com/lyrihkaesa/lyrihkaesa.github.io/tree/main/articles/blog/2023-10-07-wsl/index.md",source:"@site/articles/blog/2023-10-07-wsl/index.md",title:"WSL (Windows Subsystem for Linux)",description:"Cara Instalasi",date:"2023-10-07T00:00:00.000Z",formattedDate:"7 Oktober 2023",tags:[{label:"guide",permalink:"/blog/tags/guide"},{label:"windows-10",permalink:"/blog/tags/windows-10"}],readingTime:.65,hasTruncateMarker:!1,authors:[{name:"Kaesa Lyrih",title:"Project Manager",url:"https://github.com/lyrihkaesa",imageURL:"https://github.com/lyrihkaesa.png",key:"lyrihkaesa"}],frontMatter:{title:"WSL (Windows Subsystem for Linux)",authors:"lyrihkaesa",tags:["guide","windows-10"]},unlisted:!1,prevItem:{title:"Informasi Tentang SIM Card",permalink:"/blog/2023/11/05/sim-card"},nextItem:{title:"Windows Installation",permalink:"/blog/2023/08/13/windows-installation"}},d={authorsImageUrls:[void 0]},o=[{value:"Cara Instalasi",id:"cara-instalasi",level:2}];function c(e){const n={code:"code",h2:"h2",img:"img",input:"input",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{id:"cara-instalasi",children:"Cara Instalasi"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Buka ",(0,a.jsx)(n.strong,{children:"Turn Windows: feature on or off"}),"\n",(0,a.jsx)(n.img,{alt:"Search Turn Windows: feature on or off",src:s(17466).Z+"",width:"788",height:"647"})]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Turn Windows: feature on or off",src:s(82032).Z+"",width:"411",height:"723"})}),"\n",(0,a.jsxs)(n.p,{children:["Pada gambar ",(0,a.jsx)(n.strong,{children:"Windows Feature"})," di atas Anda aktifkan fitur:"]}),"\n",(0,a.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"[-] Virtual Machine Platform"}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"[-] Windows Subsystem for Linux"}),"\n"]}),"\n",(0,a.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.input,{type:"checkbox",disabled:!0})," ","Hyper-V (Tidak wajib diaktifkan jika menggunakan ",(0,a.jsx)(n.code,{children:"WSL2"}),")"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["Selanjutnya membuka ",(0,a.jsx)(n.code,{children:"Terminal"})," > ",(0,a.jsx)(n.code,{children:"PowerShell"})," > ",(0,a.jsx)(n.code,{children:"Run as Administator"})]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["Pada ",(0,a.jsx)(n.code,{children:"PowerShell"})," ketik perintah berikut:"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-powershell",children:"wsl --install\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-powershell",children:"wsl --list --online\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-powershell",children:"wsl --install -d Ubuntu-22.04 # Untuk install distro Ubuntu 22.04 LTS\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Windows PowerShell",src:s(54751).Z+"",width:"701",height:"568"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Tunggu instalasinya"}),"\n",(0,a.jsx)(n.li,{children:"Setelah itu Anda akan dimintai untuk mengisi username (saran huruf kecil semua jangan KAPITAL) dan password yang mudah Anda ketik karena WSL ini biasanya Anda pakai sendiri."}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-powershell",children:" wsl --set-default Ubuntu-22.04\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},17466:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/search-windows-feature-d774586772029c5ce41d746aae148250.png"},54751:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/windows powershell-e5567fbf70642e23009b58d987cd2c0f.png"},82032:(e,n,s)=>{s.d(n,{Z:()=>a});const a=s.p+"assets/images/windows-feature-fdaaaf5776d57c3a6c113daa540f9537.png"},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>l});var a=s(67294);const i={},t=a.createContext(i);function l(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);
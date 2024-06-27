"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[7942],{90287:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>o,frontMatter:()=>l,metadata:()=>t,toc:()=>d});var s=a(85893),i=a(11151);const l={},r="Initial Project",t={id:"2023/2023-10-09",title:"Initial Project",description:"Menggunakan tech stack:",source:"@site/articles/journal/2023/2023-10-09.md",sourceDirName:"2023",slug:"/2023/2023-10-09",permalink:"/journal/2023/2023-10-09",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Journal",permalink:"/journal/"},next:{title:"Pondok Mbodo",permalink:"/journal/2023/2023-10-16"}},c={},d=[{value:"Memasang SSH untuk GitLab for Windows 10",id:"memasang-ssh-untuk-gitlab-for-windows-10",level:2},{value:"Setup Local Laravel Project",id:"setup-local-laravel-project",level:2}];function h(e){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",h1:"h1",h2:"h2",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"initial-project",children:"Initial Project"}),"\n",(0,s.jsx)(n.p,{children:"Menggunakan tech stack:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Laravel Framework ",(0,s.jsx)(n.code,{children:"v9.52.15"})]}),"\n",(0,s.jsxs)(n.li,{children:["Minimum PHP ",(0,s.jsx)(n.code,{children:"v8.1.0"})]}),"\n",(0,s.jsx)(n.li,{children:"GitLab"}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"memasang-ssh-untuk-gitlab-for-windows-10",children:"Memasang SSH untuk GitLab for Windows 10"}),"\n",(0,s.jsxs)(n.p,{children:["Buka ",(0,s.jsx)(n.code,{children:"Command Promp (CMD)"})," lalu ketik perintah berikut:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cmd",children:'ssh-keygen -t rsa -b 2048 -C "gitlab.com/lyrihkaesa"\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["gitlab.com/lyrihkaesa adalah ",(0,s.jsx)(n.code,{children:"<comment>"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"cmd ssh keygen",src:a(46936).Z+"",width:"921",height:"552"})}),"\n",(0,s.jsx)(n.p,{children:"Setelah itu ada tulisan:"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Enter file in which to save the key (C:\\Users\\kaesa/.ssh/id_rsa): ...."})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Silakan ketik ulang lalu ubah ",(0,s.jsx)(n.code,{children:"id_rsa"})," menjadi ",(0,s.jsx)(n.code,{children:"id_rsa_name"})," kalau GitLab bisa seperti ini ",(0,s.jsx)(n.code,{children:"id_rsa_gitlab"}),"."]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Enter passphrase (empty for no passphrase):"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Enter same passphrase again:"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Sementara abaikan saja ",(0,s.jsx)(n.code,{children:"passpharse"})]}),"\n",(0,s.jsxs)(n.p,{children:["Sekarang pada folder ",(0,s.jsx)(n.code,{children:".ssh"})," yang ada pada path ",(0,s.jsx)(n.code,{children:"C:\\Users\\kaesa/.ssh"})," terdapat dua file baru yaitu:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"id_rsa_name"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"id_rsa_name.pub"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["atau Jika tadi Anda menamainya menjadi ",(0,s.jsx)(n.code,{children:"gitlab"}),", akan menjadi:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"id_rsa_gitlab"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"id_rsa_gitlab.pub"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Selanjutnya buka file ",(0,s.jsx)(n.code,{children:"id_rsa_gitlab.pub"})," Open with ",(0,s.jsx)(n.code,{children:"Notepad"})," atau ",(0,s.jsx)(n.code,{children:"Notepad++"})," atau text editor lainnya. Copy isinya lalu paste ke ...."]}),"\n",(0,s.jsxs)(n.p,{children:["Buka dulu ",(0,s.jsx)(n.a,{href:"https://gitlab.com/-/profile/keys",children:"GitLab Profile Keys"})," lalu klik tombol ",(0,s.jsx)(n.code,{children:"Add new key"}),", lalu masukan isi file ",(0,s.jsx)(n.code,{children:"id_rsa_gitlab.pub"})," ke dalam text field ",(0,s.jsx)(n.code,{children:"Key"})," setelah itu klik tombol ",(0,s.jsx)(n.code,{children:"Add key"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Setelah itu buat file namanya ",(0,s.jsx)(n.code,{children:"config"})," tanpa extension file apa pun. Pada folder ",(0,s.jsx)(n.code,{children:".ssh"})," dengan path ",(0,s.jsx)(n.code,{children:"C:\\Users\\kaesa/.ssh"})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"config",src:a(14458).Z+"",width:"352",height:"182"})}),"\n",(0,s.jsx)(n.p,{children:"Lalu masukan pengaturan berikut:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-txt",children:"# GITLAB\nHost gitlab.com\n   HostName gitlab.com\n   PreferredAuthentications publickey\n   IdentityFile ~/.ssh/id_rsa_gitlab\n"})}),"\n",(0,s.jsx)(n.p,{children:"lalu silakan tulis perintah berikut untuk mengecek apakah sudah terhubung dengan GitLab:\n``"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"ssh -T git@gitlab.com\n"})}),"\n",(0,s.jsxs)(n.p,{children:["jika sudah muncul ",(0,s.jsx)(n.code,{children:"Welcome to GitLab"})," berarti ssh sukses dikonfigurasi:\n",(0,s.jsx)(n.img,{alt:"Welcome SSH -T",src:a(89919).Z+"",width:"182",height:"47"})]}),"\n",(0,s.jsx)(n.p,{children:"Setelah itu saya bisa clone repository:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone git@gitlab.com:username/repository-name.git\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Catatan:\nJika gagal kemungkinan pada file ",(0,s.jsx)(n.code,{children:"known_hosts"})," tidak ada nilai berikut:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-txt",children:"gitlab.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAfuCHKVTjquxvt6CM6tdG4SLp1Btn/nOeHHE5UOzRdf\ngitlab.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCsj2bNKTBSpIYDEGk9KxsGh3mySTRgMtXL583qmBpzeQ+jqCMRgBqB98u3z++J1sKlXHWfM9dyhSevkMwSbhoR8XIq/U0tCNyokEi/ueaBMCvbcTHhO7FcwzY92WK4Yt0aGROY5qX2UKSeOvuP4D6TPqKF1onrSzH9bx9XUf2lEdWT/ia1NEKjunUqu1xOB/StKDHMoX4/OKyIzuS0q/T1zOATthvasJFoPrAjkohTyaDUz2LN5JoH839hViyEG82yB+MjcFV5MU3N1l1QL3cVUCh93xSaua1N85qivl+siMkPGbO5xR/En4iEY6K2XPASUEMaieWVNTRCtJ4S8H+9\ngitlab.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBFSMqzJeV9rUzU4kWitGjeR4PWSa29SPqJ1fVkhtj3Hw9xjLVXVYrU9QlYWrOLXBpQ6KWjbjTDTdDkoohFzgbEY=\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"setup-local-laravel-project",children:"Setup Local Laravel Project"}),"\n",(0,s.jsxs)(n.p,{children:["Setelah clone tidak lupa untuk mengatur ",(0,s.jsx)(n.code,{children:".env"})," dari salinan ",(0,s.jsx)(n.code,{children:".env.example"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-env",children:"APP_NAME=Laravel\nAPP_ENV=local\nAPP_KEY=<genrate key>\nAPP_DEBUG=true\nAPP_URL=http://localhost\n\nLOG_CHANNEL=stack\nLOG_DEPRECATIONS_CHANNEL=null\nLOG_LEVEL=debug\n\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=socha_lms_app\nDB_USERNAME=root\nDB_PASSWORD=\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"<genrate key>"})," jangan lupa generate key untuk laravelnya."]}),"\n",(0,s.jsxs)(n.li,{children:["dan mengatur database ",(0,s.jsx)(n.code,{children:"DB_DATABASE"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Setelah database sudah di konfigurasi selanjutnya jalankan perintah:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"php artisan install\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"php artisan migrate --seed\n"})}),"\n",(0,s.jsxs)(n.p,{children:["jika lupa ",(0,s.jsx)(n.code,{children:"--seed"})," jalankan perintah:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"php artisan db:seed\n"})}),"\n",(0,s.jsx)(n.p,{children:"untuk menjalankan servernya tidak lupa dengan perintah"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"php artisan serve\n"})})]})}function o(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},46936:(e,n,a)=>{a.d(n,{Z:()=>s});const s=a.p+"assets/images/shh-keygen-4857f9e2155073e9082f84f0b67ef3e6.png"},14458:(e,n,a)=>{a.d(n,{Z:()=>s});const s=a.p+"assets/images/ssh-config-ea01e74672f27e92f824569f496bda80.png"},89919:(e,n,a)=>{a.d(n,{Z:()=>s});const s="data:image/png;base64,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"},11151:(e,n,a)=>{a.d(n,{Z:()=>t,a:()=>r});var s=a(67294);const i={},l=s.createContext(i);function r(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);
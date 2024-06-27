"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[1871],{55061:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>t,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var r=a(85893),i=a(11151);const l={},t="Flutter",d={id:"flutter/intro-flutter",title:"Flutter",description:"Yeah, ini adalah artikel panduan untuk Kaesa Lyrih dalam mengerjakan project, yang berisikan masalah, tips, dan trik, dan beberapa saran praktik terbaik (best practice) yang ditemukan.",source:"@site/articles/learning/02-flutter/00-intro-flutter.md",sourceDirName:"02-flutter",slug:"/flutter/intro-flutter",permalink:"/learning/flutter/intro-flutter",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Flutter",permalink:"/learning/category/flutter"},next:{title:"State Management",permalink:"/learning/flutter/state-management"}},s={},c=[{value:"Membuat Proyek Flutter",id:"membuat-proyek-flutter",level:2},{value:"Build <code>apk</code>",id:"build-apk",level:2},{value:"Debugging Wireless",id:"debugging-wireless",level:2},{value:"Build Runner",id:"build-runner",level:2},{value:"<code>build_runner watch</code>",id:"build_runner-watch",level:3},{value:"<code>build_runner build</code>",id:"build_runner-build",level:3},{value:"Git",id:"git",level:2},{value:"Git Commit",id:"git-commit",level:3},{value:"Package: Firebase",id:"package-firebase",level:2},{value:"Package: flutter_gen",id:"package-flutter_gen",level:2},{value:"Package: flutter_native_splash",id:"package-flutter_native_splash",level:2},{value:"Clean Architecture",id:"clean-architecture",level:2},{value:"Package <code>cached_network_image</code>",id:"package-cached_network_image",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"flutter",children:"Flutter"}),"\n",(0,r.jsx)(n.p,{children:"Yeah, ini adalah artikel panduan untuk Kaesa Lyrih dalam mengerjakan project, yang berisikan masalah, tips, dan trik, dan beberapa saran praktik terbaik (best practice) yang ditemukan."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter doctor -v\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter clean\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter upgrade --force # upgrade paksa\n"})}),"\n",(0,r.jsx)(n.h2,{id:"membuat-proyek-flutter",children:"Membuat Proyek Flutter"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter create --org id.my.charapon --android-language kotlin --ios-language swift --platforms=web,android,ios kaesa_app\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"build-apk",children:["Build ",(0,r.jsx)(n.code,{children:"apk"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter build apk\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter build apk --obfuscate --split-debug-info=build/app/outputs/symbols\n"})}),"\n",(0,r.jsx)(n.h2,{id:"debugging-wireless",children:"Debugging Wireless"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"adb tcpip 5555 # membuka port 5555\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"adb connect <ip-android:port> # adb connect 192.168.1.9:5555 - jika ingin konek\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"adb devices # melihat semua device yang terkoneksi\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"adb kill-server # mematikan server, dan menghapus juga device yang terlah terkoneksi\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Debugging Wireless atau dengan Wi-Fi dengan mudah dilakukan untuk ",(0,r.jsx)(n.code,{children:"Android 11"})," untuk ",(0,r.jsx)(n.code,{children:"Android 10"})," ke bawah harus terkoneksi dengan USB Debugging dulu baru bisa terkoneksi dengan Debugging Wireless."]}),"\n",(0,r.jsxs)(n.p,{children:["Debugging Wireless untuk Android 11 paling mudah dengan menggunakan ",(0,r.jsx)(n.code,{children:"QR Code"})," yang ada pada ",(0,r.jsx)(n.code,{children:"Android Studio"})," bagian emulator."]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"build-runner",children:"Build Runner"}),"\n",(0,r.jsx)(n.h3,{id:"build_runner-watch",children:(0,r.jsx)(n.code,{children:"build_runner watch"})}),"\n",(0,r.jsx)(n.p,{children:"Selalu memantau perubahan, jadi tidak perlu menjalankan perintah build ulang."}),"\n",(0,r.jsx)(n.p,{children:"Before:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter pub run build_runner watch --delete-conflicting-outputs\n"})}),"\n",(0,r.jsx)(n.p,{children:"After:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"dart run build_runner watch --delete-conflicting-outputs\n"})}),"\n",(0,r.jsx)(n.h3,{id:"build_runner-build",children:(0,r.jsx)(n.code,{children:"build_runner build"})}),"\n",(0,r.jsx)(n.p,{children:"Hanya sekali melakukan build, tanpa memantau perubahan yang terjadi ada kode, jadi lebih ringan. Tapi perlu menjalankan perintah build untuk mengimplementasikan perubahan."}),"\n",(0,r.jsx)(n.p,{children:"Before:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"flutter pub run build_runner build --delete-conflicting-outputs\n"})}),"\n",(0,r.jsx)(n.p,{children:"After:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"dart run build_runner build --delete-conflicting-outputs\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"git",children:"Git"}),"\n",(0,r.jsx)(n.h3,{id:"git-commit",children:"Git Commit"}),"\n",(0,r.jsxs)(n.p,{children:["Sebelum commit sebaiknya ",(0,r.jsx)(n.code,{children:"fix import"})," terlebih dahulu sampai 3x. Shortcut: ",(0,r.jsx)(n.code,{children:"CTRL + LEFT SHIFT + P"})," nanti akan form search seperti ini ",(0,r.jsx)(n.code,{children:"> ..."})," lalu cari atau ketik ",(0,r.jsx)(n.code,{children:"> fix all imports"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"(feature) git checkout dev\n(dev) git fetch --all\n(dev) git pull --all\n(dev) checkout profile\n(profile) git rebase origin/dev  # solusi selain migrate\nresolve conflic via VSCode\n(profile) git push -f\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git log --oneline --graph\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git checkout -b <nama-branch> # ganti branch + membuat branch baru\ngit checkout <nama-branch> # hanya ganti branch\n"})}),"\n",(0,r.jsx)(n.p,{children:"Aturan penulisan branch untuk Kaesa:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["jika fiturnya tidak tergantung dengan perannya (role)","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"feature/app"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["jika fiturnya hanya dimiliki oleh user dengan peran (role) sebagai admin","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"feature/admin/list-user"}),"\n",(0,r.jsx)(n.li,{children:"feature/admin/edit-waste-price"}),"\n",(0,r.jsx)(n.li,{children:"feature/admin/report"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"package-firebase",children:"Package: Firebase"}),"\n",(0,r.jsxs)(n.p,{children:["Firebase membutuhkan ",(0,r.jsx)(n.code,{children:"flutter.minSdkVersion = 19"}),". Jadi ubah versinya pada path ",(0,r.jsx)(n.code,{children:"C:\\Development\\flutter\\packages\\flutter_tools\\gradle"}),", temukan file yang namanya ",(0,r.jsx)(n.code,{children:"flutter.gradle"}),", buka dan ubah kode ",(0,r.jsx)(n.code,{children:"flutter.minSdkVersion = 16"})," menjadi ",(0,r.jsx)(n.code,{children:"19"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-gradle",children:"/** flutter/packages/flutter_tools/gradle/flutter.gradle */\nstatic int minSdkVersion = 16 // Defaultnya\nstatic int minSdkVersion = 20 // Diubah karena BLOC minimal itu 19.\n\n/** flutter\\packages\\flutter_tools\\gradle\\src\\main\\groovy\\flutter.groovy*/\n/** Sets the minSdkVersion used by default in Flutter app projects. */\nstatic int minSdkVersion = 19 // Default flutter versi 3.13.1\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"package-flutter_gen",children:"Package: flutter_gen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"fluttergen -c pubspec.yaml\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"package-flutter_native_splash",children:"Package: flutter_native_splash"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"dart run flutter_native_splash:create\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"clean-architecture",children:"Clean Architecture"}),"\n",(0,r.jsxs)(n.p,{children:["Dari ",(0,r.jsx)(n.code,{children:"datasoruce"})," bisa ",(0,r.jsx)(n.code,{children:"local"})," atau ",(0,r.jsx)(n.code,{children:"remote"}),"."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"local = offline atau database local"}),"\n",(0,r.jsxs)(n.li,{children:["remote = online atau api\nlalu ke ",(0,r.jsx)(n.code,{children:"repository"})," > ",(0,r.jsx)(n.code,{children:"usecase"})," > ",(0,r.jsx)(n.code,{children:"bloc"})," > ",(0,r.jsx)(n.code,{children:"page/form"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.h2,{id:"package-cached_network_image",children:["Package ",(0,r.jsx)(n.code,{children:"cached_network_image"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},11151:(e,n,a)=>{a.d(n,{Z:()=>d,a:()=>t});var r=a(67294);const i={},l=r.createContext(i);function t(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);
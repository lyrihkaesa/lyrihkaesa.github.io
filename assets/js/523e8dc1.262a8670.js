"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[3447],{63384:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>d,metadata:()=>t,toc:()=>o});var i=a(85893),r=a(11151);const d={},s="Freezed dan JSON Serialization",t={id:"flutter/freezed-and-json-serialization",title:"Freezed dan JSON Serialization",description:"Selamat datang di Freezed, pembuat code generator untuk data-classes/unions/pattern-matching/cloning.",source:"@site/articles/learning/02-flutter/06-freezed-and-json-serialization.md",sourceDirName:"02-flutter",slug:"/flutter/freezed-and-json-serialization",permalink:"/learning/flutter/freezed-and-json-serialization",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tema di Flutter",permalink:"/learning/flutter/flutter-theme"},next:{title:"Struktur Aplikasi",permalink:"/learning/flutter/structure-aplikasi"}},l={},o=[{value:"Motivasi",id:"motivasi",level:2},{value:"Menjalankan Build Runner",id:"menjalankan-build-runner",level:2},{value:"Dart (Rekomendasi gunakan ini)",id:"dart-rekomendasi-gunakan-ini",level:3},{value:"Flutter",id:"flutter",level:3},{value:"Pemasangan (Install)",id:"pemasangan-install",level:2},{value:"Pasang Semua Package",id:"pasang-semua-package",level:3},{value:"Pasang Satu Persatu",id:"pasang-satu-persatu",level:3},{value:"<code>pubspec.yaml</code>",id:"pubspecyaml",level:3},{value:"\u26a0 Warning <code>invlid_annotation_target</code>",id:"-warning-invlid_annotation_target",level:2},{value:"<code>analysis_options.yaml</code>",id:"analysis_optionsyaml",level:3},{value:"<code>.gitignore</code>",id:"gitignore",level:2},{value:"Menjalankan Generator",id:"menjalankan-generator",level:2},{value:"Membuat Model menggunakan Freezed",id:"membuat-model-menggunakan-freezed",level:2},{value:"Mendefinisikan Kelas Mutable (bisa diubah) sebagai Pengganti Kelas Immutable",id:"mendefinisikan-kelas-mutable-bisa-diubah-sebagai-pengganti-kelas-immutable",level:2},{value:"Mengizinkan Mutasi List/Map/Set",id:"mengizinkan-mutasi-listmapset",level:2},{value:"Bagaimana <code>copyWith</code> Bekerja",id:"bagaimana-copywith-bekerja",level:3}];function c(e){const n={admonition:"admonition",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"freezed-dan-json-serialization",children:"Freezed dan JSON Serialization"}),"\n",(0,i.jsxs)(n.p,{children:["Selamat datang di ",(0,i.jsx)(n.code,{children:"Freezed"}),", pembuat ",(0,i.jsx)(n.em,{children:"code generator"})," untuk ",(0,i.jsx)(n.code,{children:"data-classes/unions/pattern-matching/cloning"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Package ",(0,i.jsx)(n.code,{children:"freezed"})," dan ",(0,i.jsx)(n.code,{children:"json_serializable"})," adalah salah satu package code generation."]}),"\n",(0,i.jsx)(n.h2,{id:"motivasi",children:"Motivasi"}),"\n",(0,i.jsx)(n.p,{children:'Memang Dart itu keren, tapi mendefinisikan "model" bisa jadi merepotkan. Kita mungkin harus:'}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Mendefinisikan ",(0,i.jsx)(n.em,{children:"constructor"})," dan ",(0,i.jsx)(n.em,{children:"properties"})]}),"\n",(0,i.jsxs)(n.li,{children:["Meng-override method ",(0,i.jsx)(n.code,{children:"toString"}),", operator ",(0,i.jsx)(n.code,{children:"=="}),", dan ",(0,i.jsx)(n.code,{children:"hashCode"})]}),"\n",(0,i.jsxs)(n.li,{children:["Mengimplementasikan method ",(0,i.jsx)(n.code,{children:"copyWith"})," untuk menduplikasi objek"]}),"\n",(0,i.jsxs)(n.li,{children:["Menangani ",(0,i.jsx)(n.em,{children:"de/serialization"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Semua ini bisa membutuhkan ratusan baris kode, yang rentan terhadap kesalahan dan bisa sangat mengurangi keterbacaan model Anda."}),"\n",(0,i.jsxs)(n.p,{children:["Package ",(0,i.jsx)(n.code,{children:"Freezed"})," mencoba mengatasi masalah ini dengan mengimplementasikan sebagian besar hal tersebut untuk Anda, sehingga Anda bisa lebih fokus pada definisi model Anda."]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Sebelumnya"}),(0,i.jsx)(n.th,{children:"Sesudahnya"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{alt:"before",src:a(77518).Z+"",width:"984",height:"2584"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{alt:"after",src:a(48631).Z+"",width:"950",height:"498"})})]})})]}),"\n",(0,i.jsx)(n.h2,{id:"menjalankan-build-runner",children:"Menjalankan Build Runner"}),"\n",(0,i.jsx)(n.h3,{id:"dart-rekomendasi-gunakan-ini",children:"Dart (Rekomendasi gunakan ini)"}),"\n",(0,i.jsxs)(n.p,{children:["Bisa digunakan di project flutter. Karena memang flutter itu dibuat menggunakan dart.",(0,i.jsx)(n.br,{}),"\n","Sekali eksekusi:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"dart run build_runner build --delete-conflicting-outputs\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Selalu memantau perubahan file dan melakukan build ulang file generated ",(0,i.jsx)(n.code,{children:"*.freezed.dart"})," dan ",(0,i.jsx)(n.code,{children:"*.g.dart"}),". Mirip seperti hot reload."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"dart run build_runner watch --delete-conflicting-outputs\n"})}),"\n",(0,i.jsx)(n.h3,{id:"flutter",children:"Flutter"}),"\n",(0,i.jsx)(n.p,{children:"Sekali eksekusi:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub run build_runner build --delete-conflicting-outputs\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Selalu memantau perubahan file dan melakukan build ulang file generated ",(0,i.jsx)(n.code,{children:"*.freezed.dart"})," dan ",(0,i.jsx)(n.code,{children:"*.g.dart"}),". Mirip seperti hot reload."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub run build_runner watch --delete-conflicting-outputs\n"})}),"\n",(0,i.jsx)(n.h2,{id:"pemasangan-install",children:"Pemasangan (Install)"}),"\n",(0,i.jsxs)(n.p,{children:["Untuk menggunakan ",(0,i.jsx)(n.code,{children:"Freezed"}),", Anda memerlukan pengaturan ",(0,i.jsx)(n.code,{children:"build_runner/code-generator"})," yang umum."]}),"\n",(0,i.jsxs)(n.p,{children:["Pertama, install ",(0,i.jsx)(n.code,{children:"build_runner"})," dan ",(0,i.jsx)(n.code,{children:"Freezed"})," dengan menambahkannya ke file ",(0,i.jsx)(n.code,{children:"pubspec.yaml"})," Anda:"]}),"\n",(0,i.jsx)(n.h3,{id:"pasang-semua-package",children:"Pasang Semua Package"}),"\n",(0,i.jsx)(n.p,{children:"Gak mau ribet pakai ini."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub add freezed_annotation json_annotation dev:build_runner dev:freezed dev:json_serializable\n"})}),"\n",(0,i.jsx)(n.h3,{id:"pasang-satu-persatu",children:"Pasang Satu Persatu"}),"\n",(0,i.jsx)(n.p,{children:"Ada package yang sudah terpasang pakai ini."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub add --dev build_runner\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub add freezed_annotation dev:freezed\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Jika menggunakan ",(0,i.jsx)(n.code,{children:"freezed"})," untuk generate method ",(0,i.jsx)(n.code,{children:"fromJson/toJson"}),", silahkan tambahkan:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"flutter pub add json_annotation dev:json_serializable\n"})}),"\n",(0,i.jsx)(n.h3,{id:"pubspecyaml",children:(0,i.jsx)(n.code,{children:"pubspec.yaml"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yml",metastring:'title="./pubspec.yaml"',children:"name: kaesa_app\ndescription: A new Flutter project.\npublish_to: 'none'\nversion: 1.0.0+1\n\nenvironment:\n  sdk: '>=2.17.6 <3.0.0'\n\ndependencies:\n  flutter:\n    sdk: flutter\n  cupertino_icons: ^1.0.2\n  # highlight-start\n  # code generator (jangan salah peletakan depedencies)\n  freezed_annotation: ^2.4.1\n  json_annotation: ^4.8.1\n\xa0 # highlight-end\n\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n  flutter_lints: ^3.0.1\n  # highlight-start\n  # code generator (jangan salah peletakan depedencies)\n  # dart run build_runner build --delete-conflicting-outputs\n  build_runner: ^2.4.8\n  freezed: ^2.4.7\n  json_serializable: ^6.7.1\n  # highlight-end\n\nflutter:\n  uses-material-design: true\n"})}),"\n",(0,i.jsx)(n.p,{children:"Mengistal ini akan menambahkan tiga package:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"build_runner"}),": perangkat untuk menjalankan code-generator"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"freezed"}),": pembuat kode (code generator)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"freezed_annotation"}),": package yang berisi anotasi untuk\xa0",(0,i.jsx)(n.code,{children:"freezed"})]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.h2,{id:"-warning-invlid_annotation_target",children:["\u26a0 Warning ",(0,i.jsx)(n.code,{children:"invlid_annotation_target"})]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Disabling ",(0,i.jsx)(n.code,{children:"invalid_annotation_target"})," warning and warning in generates files.\nMematikan peringatan  ",(0,i.jsx)(n.code,{children:"invalid_annotation_target"})," dan peringatan di file yang dibuat oleh ",(0,i.jsx)(n.code,{children:"freezed"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["Jika Anda berencana menggunakan ",(0,i.jsx)(n.code,{children:"freezed"})," bersama dengan ",(0,i.jsx)(n.code,{children:"json_serializable"}),", versi terbaru dari ",(0,i.jsx)(n.code,{children:"json_serializable"})," dan ",(0,i.jsx)(n.code,{children:"meta"})," mungkin mengharuskan Anda untuk menonaktifkan peringatan ",(0,i.jsx)(n.code,{children:"invalid_annotation_target"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Untuk melakukannya, Anda dapat menambahkan yang berikut ini ke file ",(0,i.jsx)(n.code,{children:"analysis_options.yaml"})," di root project Anda:"]}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["The annotation ",(0,i.jsx)(n.code,{children:"JsonSerializable"})," can only be used on classes."]})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["The annotation ",(0,i.jsx)(n.code,{children:"JsonKey"})," can only be used on fields or getters."]})}),"\n",(0,i.jsxs)(n.p,{children:["Jika Anda mendapatkan warning di atas, silahkan tambahkan aturan (rules) untuk static analyzer pada file ",(0,i.jsx)(n.code,{children:"analysis_options.yaml"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"analysis_optionsyaml",children:(0,i.jsx)(n.code,{children:"analysis_options.yaml"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="./analysis_options.yaml"',children:"include: package:flutter_lints/flutter.yaml\n\n# highlight-start\n# info lengkap: https://github.com/rrousselGit/freezed/issues/488\nanalyzer:\n  exclude:\n    - '**/*.g.dart'\n    - '**/*.freezed.dart'\n  errors:\n    invalid_annotation_target: ignore\n# highlight-end\n\nlinter:\n  rules:\n"})}),"\n",(0,i.jsx)(n.h2,{id:"gitignore",children:(0,i.jsx)(n.code,{children:".gitignore"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-gitignore",metastring:'title="./.gitignore"',children:"# build_runner generated files from code generator\n*.freezed.dart\n*.g.dart\n"})}),"\n",(0,i.jsx)(n.h2,{id:"menjalankan-generator",children:"Menjalankan Generator"}),"\n",(0,i.jsx)(n.p,{children:"Untuk menjalankan generator kode, jalankan perintah berikut:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"dart run build_runner build\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Catatan:"})," Seperti kebanyakan generator kode, ",(0,i.jsx)(n.code,{children:"freezed"})," akan membutuhkan Anda untuk both import anotasi (",(0,i.jsx)(n.code,{children:"freezed_annotation"}),") dan menggunakan kata kunci ",(0,i.jsx)(n.code,{children:"part"})," di bagian atas file Anda."]}),"\n",(0,i.jsxs)(n.p,{children:["Oleh karena itu, file yang ingin menggunakan ",(0,i.jsx)(n.code,{children:"Freezed"})," akan dimulai dengan:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"import 'package:freezed_annotation/freezed_annotation.dart';\n\npart 'my_file.freezed.dart';\n\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"PERTIMBANGKAN"})," untuk juga mengimpor ",(0,i.jsx)(n.code,{children:"package:flutter/foundation.dart"}),". Alasannya, mengimpor ",(0,i.jsx)(n.code,{children:"foundation.dart"})," juga mengimpor kelas-kelas untuk membuat objek terbaca dengan baik di devtool Flutter. Jika Anda mengimpor ",(0,i.jsx)(n.code,{children:"foundation.dart"}),", ",(0,i.jsx)(n.code,{children:"Freezed"})," akan melakukannya secara otomatis untuk Anda."]}),"\n",(0,i.jsx)(n.h2,{id:"membuat-model-menggunakan-freezed",children:"Membuat Model menggunakan Freezed"}),"\n",(0,i.jsx)(n.p,{children:"Lebih baik contoh daripada penjelasan abstrak yang panjang, jadi inilah contoh kelas Freezed yang umum:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",metastring:'title="./lib/data/models/person_model.dart"',children:"import 'package:freezed_annotation/freezed_annotation.dart';\nimport 'package:flutter/foundation.dart'; // for devtools\n\n// wajib: mengaitkan \"person_model.dart\" kita dengan kode yang dihasilkan oleh Freezed\npart 'person_model.freezed.dart';\n// opsional: Karena class Person bersifat serializable, kita harus menambahkan baris ini.\n// Tetapi jika Person tidak serializable, kita bisa melewatkannya.\npart 'person_model.g.dart';\n\n@freezed\nclass Person with _$Person {\n  const factory Person({\n    required String firstName,\n    required String lastName,\n    required int age,\n  }) = _Person;\n\n  factory Person.fromJson(Map<String, Object?> json)\n      => _$PersonFromJson(json);\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Potongan kode berikut mendefinisikan model bernama ",(0,i.jsx)(n.code,{children:"Person"}),":"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Person"})," memiliki 3 properti: ",(0,i.jsx)(n.code,{children:"firstName"}),", ",(0,i.jsx)(n.code,{children:"lastName"}),", dan ",(0,i.jsx)(n.code,{children:"age"})]}),"\n",(0,i.jsxs)(n.li,{children:["Karena kita menggunakan ",(0,i.jsx)(n.code,{children:"@freezed"}),", semua properti kelas ini bersifat immutable (tidak dapat diubah)."]}),"\n",(0,i.jsxs)(n.li,{children:["Karena kita mendefinisikan ",(0,i.jsx)(n.code,{children:"fromJson"}),", kelas ini bersifat ",(0,i.jsx)(n.em,{children:"de/serializable"})," (dapat diubah menjadi JSON dan sebaliknya). Freezed akan menambahkan metode ",(0,i.jsx)(n.code,{children:"toJson"})," untuk kita."]}),"\n",(0,i.jsxs)(n.li,{children:["Freezed juga akan secara otomatis menghasilkan:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["method ",(0,i.jsx)(n.code,{children:"copyWith"}),", untuk menduplikasi objek dengan properti yang berbeda"]}),"\n",(0,i.jsxs)(n.li,{children:["override ",(0,i.jsx)(n.code,{children:"toString"})," yang mencantumkan semua properti objek"]}),"\n",(0,i.jsxs)(n.li,{children:["override ",(0,i.jsx)(n.code,{children:"operator =="})," dan ",(0,i.jsx)(n.code,{children:"hashCode"})," (karena ",(0,i.jsx)(n.code,{children:"Person"})," bersifat immutable)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Dari contoh ini, kita dapat melihat beberapa hal:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Diperlukan untuk menganotasi model kita dengan ",(0,i.jsx)(n.code,{children:"@freezed"})," (atau ",(0,i.jsx)(n.code,{children:"@freezed"})," / ",(0,i.jsx)(n.code,{children:"@unfreezed"}),", lebih lanjut tentang itu nanti). Anotasi ini memberi tahu Freezed untuk menghasilkan kode untuk kelas itu."]}),"\n",(0,i.jsxs)(n.li,{children:["Kita juga harus menerapkan mixin dengan nama kelas kita, diawali dengan ",(0,i.jsx)(n.code,{children:"_$"}),". Mixin ini yang mendefinisikan berbagai ",(0,i.jsx)(n.em,{children:"properties/methods"})," objek kita."]}),"\n",(0,i.jsxs)(n.li,{children:["Saat mendefinisikan ",(0,i.jsx)(n.em,{children:"constructor"})," dalam kelas Freezed, kita harus menggunakan kata kunci ",(0,i.jsx)(n.code,{children:"factory"})," seperti yang ditunjukkan (",(0,i.jsx)(n.code,{children:"const"})," opsional).",(0,i.jsx)(n.br,{}),"\n","Parameter ",(0,i.jsx)(n.em,{children:"constructor"})," ini akan menjadi daftar semua properti yang dimiliki kelas ini.",(0,i.jsx)(n.br,{}),"\n","Parameter ",(0,i.jsx)(n.strong,{children:"tidak"})," harus diberi nama dan wajib diisi (",(0,i.jsx)(n.code,{children:"required"}),"). Jangan ragu untuk menggunakan parameter opsional posisi jika Anda mau!"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"mendefinisikan-kelas-mutable-bisa-diubah-sebagai-pengganti-kelas-immutable",children:"Mendefinisikan Kelas Mutable (bisa diubah) sebagai Pengganti Kelas Immutable"}),"\n",(0,i.jsxs)(n.p,{children:["Sejauh ini, kita telah melihat bagaimana cara mendefinisikan model di mana semua propertinya bersifat ",(0,i.jsx)(n.code,{children:"final"})," (tidak bisa diubah); tetapi Anda mungkin ingin mendefinisikan properti yang bisa diubah dalam model Anda."]}),"\n",(0,i.jsxs)(n.p,{children:["Freezed mendukung ini, dengan mengganti anotasi ",(0,i.jsx)(n.code,{children:"@freezed"})," dengan ",(0,i.jsx)(n.code,{children:"@unfreezed"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"@unfreezed\nclass Person with _$Person {\n  factory Person({\n    required String firstName,\n    required String lastName,\n    required final int age,\n  }) = _Person;\n\n  factory Person.fromJson(Map<String, Object?> json)\n      => _$PersonFromJson(json);\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Ini mendefinisikan model yang sebagian besar identik dengan cuplikan kode kita sebelumnya, tetapi dengan perbedaan berikut:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"firstName"})," dan ",(0,i.jsx)(n.code,{children:"lastName"})," sekarang bisa diubah. Oleh karena itu, kita dapat menulis:"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"void main() {\n  var person = Person(firstName: 'John', lastName: 'Smith', age: 42);\n\n  person.firstName = 'Mona';\n  person.lastName = 'Lisa';\n}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"age"})," masih tidak bisa diubah, karena kita secara eksplisit menandai properti tersebut sebagai ",(0,i.jsx)(n.code,{children:"final"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Person"})," tidak lagi memiliki implementasi ",(0,i.jsx)(n.code,{children:"==/hashCode"})," khusus:"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"void main() {\n  var john = Person(firstName: 'John', lastName: 'Smith', age: 42);\n  var john2 = Person(firstName: 'John', lastName: 'Smith', age: 42);\n\n  print(john == john2); // false\n}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Tentu saja, karena kelas ",(0,i.jsx)(n.code,{children:"Person"})," kita bisa diubah, maka tidak mungkin lagi untuk membuat instance-nya menggunakan ",(0,i.jsx)(n.code,{children:"const"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"mengizinkan-mutasi-listmapset",children:"Mengizinkan Mutasi List/Map/Set"}),"\n",(0,i.jsxs)(n.p,{children:["Secara default, ketika menggunakan ",(0,i.jsx)(n.code,{children:"@freezed"})," (tetapi tidak ",(0,i.jsx)(n.code,{children:"@unfreezed"}),"), properti dengan tipe ",(0,i.jsx)(n.code,{children:"List"}),"/",(0,i.jsx)(n.code,{children:"Map"}),"/",(0,i.jsx)(n.code,{children:"Set"})," diubah menjadi immutable (tidak dapat diubah)."]}),"\n",(0,i.jsx)(n.p,{children:"Ini berarti bahwa menulis kode berikut akan menyebabkan exception runtime:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"@freezed\nclass Example with _$Example {\n  factory Example(List<int> list) = _Example;\n}\n\nvoid main() {\n  var example = Example([]);\n  example.list.add(42); // akan menghasilkan exception karena kita mencoba mengubah collection\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Perilaku ini dapat dinonaktifkan dengan menulis:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"@Freezed(makeCollectionsUnmodifiable: false)\nclass Example with _$Example {\n  factory Example(List<int> list) = _Example;\n}\n\nvoid main() {\n  var example = Example([]);\n  example.list.add(42); // Tidak akan eror\n}\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"bagaimana-copywith-bekerja",children:["Bagaimana ",(0,i.jsx)(n.code,{children:"copyWith"})," Bekerja"]}),"\n",(0,i.jsxs)(n.p,{children:["Seperti yang dijelaskan sebelumnya, ketika kita mendefinisikan sebuah model menggunakan Freezed, maka code-generator akan secara otomatis menghasilkan metode ",(0,i.jsx)(n.code,{children:"copyWith"})," untuk kita. Metode ini digunakan untuk mengkloning sebuah objek dengan nilai yang berbeda."]}),"\n",(0,i.jsx)(n.p,{children:"Misalnya jika kita mendefinisikan:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"@freezed\nclass Person with _$Person {\n  factory Person(String name, int? age) = _Person;\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Maka kita bisa menulis:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-dart",children:"void main() {\n  var person = Person('Remi', 24);\n\n  // `age` tidak diberikan, nilainya masih sama\n  print(person.copyWith(name: 'Dash')); // Person(name: Dash, age: 24)\n  // `age` diatur menjadi `null`\n  print(person.copyWith(age: null)); // Person(name: Remi, age: null)\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Perhatikan bahwa Freezed mendukung ",(0,i.jsx)(n.code,{children:"person.copyWith(age: null)"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},77518:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/Pasted image 20240308193302-6b29a4400ecbe0eabebb84f98c6ca93e.png"},48631:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/Pasted image 20240308193324-d1bfdf647734d5a63a8b20484584db88.png"},11151:(e,n,a)=>{a.d(n,{Z:()=>t,a:()=>s});var i=a(67294);const r={},d=i.createContext(r);function s(e){const n=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(d.Provider,{value:n},e.children)}}}]);
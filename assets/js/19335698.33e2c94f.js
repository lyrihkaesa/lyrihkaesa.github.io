"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[5461],{12020:(a,n,e)=>{e.r(n),e.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>k,frontMatter:()=>t,metadata:()=>l,toc:()=>g});var i=e(85893),s=e(11151);const t={},r="UAS Bisnis Cerdas Genap 2023",l={id:"semester-06/bisnis-cerdas/uas",title:"UAS Bisnis Cerdas Genap 2023",description:"Membuat alur pusat panggilan untuk analisis instan.",source:"@site/articles/course/semester-06/75-bisnis-cerdas/099-uas.md",sourceDirName:"semester-06/75-bisnis-cerdas",slug:"/semester-06/bisnis-cerdas/uas",permalink:"/course/semester-06/bisnis-cerdas/uas",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:99,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Chapter 3: Cleaning Transformations",permalink:"/course/semester-06/bisnis-cerdas/cleaning-transformations"},next:{title:"Bahasa Indonesia",permalink:"/course/category/bahasa-indonesia"}},d={},g=[{value:"Panduan Pengiriman Jawaban",id:"panduan-pengiriman-jawaban",level:2},{value:"Tutorial",id:"tutorial",level:2},{value:"Kesimpulan",id:"kesimpulan",level:2}];function u(a){const n={admonition:"admonition",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...a.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"uas-bisnis-cerdas-genap-2023",children:"UAS Bisnis Cerdas Genap 2023"}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsx)(n.p,{children:"Membuat alur pusat panggilan untuk analisis instan."})}),"\n",(0,i.jsx)(n.p,{children:"Ambil file-file yang tersedia pada Kulino UAS."}),"\n",(0,i.jsx)(n.p,{children:"File-file di sini berisi informasi dari pusat panggilan untuk perusahaan yang menjual laptop dan desktop PC."}),"\n",(0,i.jsx)(n.p,{children:"Terdapat file-file data untuk bulan Januari 2021 yang mencakup informasi panggilan, data kasus dari sistem CRM, dan ekstrak dari survei Kepuasan Pelanggan (CSAT)."}),"\n",(0,i.jsx)(n.p,{children:"Survei CSAT adalah survei opsional yang dikirim kepada pelanggan setelah panggilan dan meminta mereka untuk menilai kepuasan mereka dengan interaksi tersebut dalam skala 1 hingga 10, di mana 1 adalah sangat tidak puas dan 10 adalah sangat puas."}),"\n",(0,i.jsx)(n.p,{children:"Mari kita asumsikan bahwa baru-baru ini, Skor Kepuasan Pelanggan, juga dikenal sebagai Skor\nCSAT, mengalami penurunan dan Pimpinan telah meminta kita untuk menyelidiki penyebabnya."}),"\n",(0,i.jsx)(n.p,{children:"Dengan menggunakan Tableau Prep, selidikilah data yang tersedia untuk mengidentifikasi beberapa petunjuk tentang faktor apa yang mungkin mempengaruhi penurunan CSAT."}),"\n",(0,i.jsx)(n.h2,{id:"panduan-pengiriman-jawaban",children:"Panduan Pengiriman Jawaban"}),"\n",(0,i.jsx)(n.p,{children:"Upload rekaman youtube anda dengan menceritakan:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Masalah yang dihadapi Call center tersebut (25)"}),"\n",(0,i.jsx)(n.li,{children:"Praktek mengolah data dari awal hingga selesai (60)"}),"\n",(0,i.jsx)(n.li,{children:"Ceritakan kesimpulan dari temuan tableau prep tersebut (15)"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Tulis link youtube anda ke docx dengan status rekaman public lalu dikirim ke kulino sebelum batas waktu yang ditentukan."}),"\n",(0,i.jsx)(n.h2,{id:"tutorial",children:"Tutorial"}),"\n",(0,i.jsxs)(n.p,{children:["Mari kita mulai melihat data kepuasan pelanggan. Buka instance Tableau Prep baru dan connect ke ",(0,i.jsx)(n.code,{children:"csat_data.csv"}),". Kemudian, lakukan langkah-langkah berikut:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Mulailah dengan mengoreksi tipe data. Ubah ",(0,i.jsx)(n.strong,{children:"survey_id"})," menjadi ",(0,i.jsx)(n.strong,{children:"String"})," dan ubah juga ",(0,i.jsx)(n.strong,{children:"call_id"})," menjadi ",(0,i.jsx)(n.strong,{children:"String"})]}),"\n",(0,i.jsxs)(n.li,{children:["Selanjutnya, klik ikon ",(0,i.jsx)(n.code,{children:"+"})," dan tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," ke flow Anda. Amati profil data dan Anda akan melihatnya distribusi score survei condong ke ujung bawah, seperti yang ditunjukkan berikut ini tangkapan layar. Hal ini wajar karena kita sedang menyelidiki alasan di balik score survei bisnis yang rendah."]}),"\n",(0,i.jsxs)(n.li,{children:["Sekarang mari kita dapatkan score rata-rata dengan menambahkan ",(0,i.jsx)(n.strong,{children:"Aggregate Step"}),". Dalam konfigurasi step, seret dan lepas file ",(0,i.jsx)(n.strong,{children:"score"})," field ke bagian ",(0,i.jsx)(n.strong,{children:"Aggregated Fields"}),", dan klik ",(0,i.jsx)(n.strong,{children:"SUM"}),", diikuti dengan ",(0,i.jsx)(n.strong,{children:"Average"}),", untuk mendapatkan rata-rata score di semua survei. Di sini, kita dapat melihat bahwa score rata-rata kita adalah 4.05."]}),"\n",(0,i.jsxs)(n.li,{children:["Sekarang setelah kita mengetahui score rata-rata, mari persempit dataset kita menjadi survei di mana score pelanggan antara 1 dan 4. Untuk melakukan ini, pilih ",(0,i.jsx)(n.strong,{children:"Clean Step"}),", pilih nilai score 1, 2, 3, dan 4 (gunakan Command atau CTRL tombol untuk multi-select), lalu klik-kanan dan pilih ",(0,i.jsx)(n.strong,{children:"Keep Only"}),". Ini akan memfilter data survei kami hanya untuk score 1-4."]}),"\n",(0,i.jsxs)(n.li,{children:["Mari kita lihat apa yang bisa kita temukan dari data panggilan untuk survei ini. Tambahkan data connection lain, kali ini ke file ",(0,i.jsx)(n.strong,{children:"call_data.csv"}),". Kumpulan data ini berisi informasi tentang tanggal panggilan dilakukan, berapa lama pelanggan harus menunggu sebelum terhubung ke agen layanan pelanggan (",(0,i.jsx)(n.strong,{children:"wait_time_seconds"})," field), durasi percakapan dengan agen (",(0,i.jsx)(n.strong,{children:"call_time_seconds"}),"), dan waktu agen dihabiskan memperbarui sistem manajemen kasus setelah panggilan berakhir (",(0,i.jsx)(n.strong,{children:"after_call_seconds"}),"). Sebelum Anda melanjutkan, perbaiki tipe data ",(0,i.jsx)(n.strong,{children:"call_id"})," field ke ",(0,i.jsx)(n.strong,{children:"String"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Mari gabungkan (join) data ini dengan data survei kita. Untuk melakukannya, seret langkah ",(0,i.jsx)(n.strong,{children:"call_data"})," di atas ",(0,i.jsx)(n.strong,{children:"Clean Step"})," dan pilih ",(0,i.jsx)(n.strong,{children:"Join"})," untuk langsung menambahkan ",(0,i.jsx)(n.strong,{children:"Join Step"}),". Perhatikan bagaimana Tableau Prep dengan mulus mencabangkan flow kita (cabang asli yang diakhiri dengan Aggregate). Karena dua kumpulan data kita berisi nama field yang sama, ",(0,i.jsx)(n.strong,{children:"call_id"}),", Tableau Prep secara otomatis mengonfigurasi ",(0,i.jsx)(n.strong,{children:"Join Clauses"})," untuk menggunakan field tersebut, yang sesuai. kita dapat membiarkan ",(0,i.jsx)(n.strong,{children:"Join Type"})," default disetel ke ",(0,i.jsx)(n.strong,{children:"Inner"}),", yang memastikan bahwa hanya panggilan yang cocok dengan data survei yang difilter kita yang masuk:"]}),"\n",(0,i.jsxs)(n.li,{children:["Agar kumpulan data Anda tetap ramping, tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," baru setelah ",(0,i.jsx)(n.strong,{children:"Join"})," dan hapus field duplikat, ",(0,i.jsx)(n.strong,{children:"call_id-1"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Mari kita lihat waktu panggilan rata-rata selanjutnya. Tambahkan ",(0,i.jsx)(n.strong,{children:"Aggregate step"})," baru setelah ",(0,i.jsx)(n.strong,{children:"Join"})," dan seret kolom ",(0,i.jsx)(n.strong,{children:"wait_time_seconds"}),", ",(0,i.jsx)(n.strong,{children:"call_time_seconds"}),", dan ",(0,i.jsx)(n.strong,{children:"after_call_seconds"})," ke bagian ",(0,i.jsx)(n.strong,{children:"Aggregated Fields"})," dan ubah aggregate untuk semua fields dari ",(0,i.jsx)(n.strong,{children:"SUM"})," menjadi ",(0,i.jsx)(n.strong,{children:"Average"}),". Untuk melihat hasilnya dengan mudah, tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," setelah ",(0,i.jsx)(n.strong,{children:"Aggregate"}),". Kami perlu membandingkan informasi ini dengan panggilan dengan skor survei yang lebih tinggi, yaitu panggilan dengan skor antara 5 dan 10. Kami akan melanjutkannya di langkah berikutnya."]}),"\n",(0,i.jsxs)(n.li,{children:["Lanjutkan dan, sekali lagi, gabungkan ",(0,i.jsx)(n.strong,{children:"call_data"})," field dengan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," pertama, yang menghasilkan cabang ketiga dalam alur kita. Kali ini, kami hanya tertarik pada panggilan di mana pengguna tidak memiliki skor survei sama sekali (yang dimungkinkan, karena survei bersifat opsional), atau skor lebih tinggi dari 4. Untuk melakukan ini, konfigurasikan ",(0,i.jsx)(n.strong,{children:"Join Type"})," ke ",(0,i.jsx)(n.strong,{children:"rightOnly/Right unmatched only"})," Hanya menggunakan Venn ilustrasi diagram. Ini akan menghasilkan kembalian semua data dari sisi kanan, yaitu data panggilan yang tidak cocok dengan data apa pun pada Clean Step yang difilter (yang difilter untuk hasil dengan skor 1-4 saja)."]}),"\n",(0,i.jsxs)(n.li,{children:["Agar data kita tetap rapi, tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," dan hapus ",(0,i.jsx)(n.strong,{children:"call_id"})," field yang duplikat, pertahankan ",(0,i.jsx)(n.strong,{children:"call_id-1"}),".","\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"CATATAN PENTING"}),(0,i.jsx)(n.br,{}),"\n","Dalam latihan ini, kita menggunakan fungsi Clean step untuk menghapus field dari kumpulan data yang telah menjadi redundan mengikuti Join Step. Perlu diperhatikan bahwa tindakan yang sama, menghapus field, dapat dilakukan dalam Joint Step itu sendiri, bahkan jika field tersebut adalah bagian dari Join Clause. Ini adalah preferensi pribadi yang terkait dengan bagaimana Anda ingin mengatur flow Anda secara visual."]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Sekarang cabang ketiga kita yang baru hanya berisi data survei positif (dengan asumsi positif tidak ada skor, atau skor antara 5-10), mari kita lakukan analisis aggregate yang sama seperti yang kita lakukan sebelumnya, yaitu menambahkan ",(0,i.jsx)(n.strong,{children:"Aggregate Step"})," baru setelah ",(0,i.jsx)(n.strong,{children:"Join"})," dan seret field ",(0,i.jsx)(n.strong,{children:"wait_time_seconds"}),", ",(0,i.jsx)(n.strong,{children:"call_time_seconds"}),", dan ",(0,i.jsx)(n.strong,{children:"after_call_seconds"})," ke bagian ",(0,i.jsx)(n.strong,{children:"Aggregated Fields"}),", lalu ubah aggregate untuk semua field dari ",(0,i.jsx)(n.strong,{children:"SUM"})," menjadi ",(0,i.jsx)(n.strong,{children:"Average"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Untuk membandingkan hasil ini dengan mudah dengan hasil aggregate kami sebelumnya untuk data panggilan survei negatif, seret step bertanda ",(0,i.jsx)(n.strong,{children:"AGGREGATE 3"})," di atas ",(0,i.jsx)(n.strong,{children:"Aggregate 2"})," dan pilih ",(0,i.jsx)(n.strong,{children:"Union"})," untuk menambahkan ",(0,i.jsx)(n.strong,{children:"Union step"}),". Pada langkah Union, klik dua kali nilai ",(0,i.jsx)(n.strong,{children:"csat_data.csv"}),", ",(0,i.jsx)(n.strong,{children:"call_data.csv"})," di names field tabel dan ganti namanya menjadi ",(0,i.jsx)(n.strong,{children:"Regular/Positive Survey Score"}),". Kemudian, ganti nama nilai ",(0,i.jsx)(n.strong,{children:"call_data.csv-1"}),", ",(0,i.jsx)(n.strong,{children:"csat_data.csv-1"})," menjadi ",(0,i.jsx)(n.strong,{children:"Negative Survey Score"}),".",(0,i.jsx)(n.br,{}),"\n","Dalam tampilan ",(0,i.jsx)(n.strong,{children:"Union Results"}),", sekarang kita dapat dengan mudah membandingkan data panggilan. Sementara nilai ",(0,i.jsx)(n.strong,{children:"wait_time_seconds"})," dan ",(0,i.jsx)(n.strong,{children:"after_call_seconds"})," relatif sama, kita dapat melihat perbedaan yang signifikan dalam ",(0,i.jsx)(n.strong,{children:"call_time_seconds"}),". Bahkan, kira-kira 27% (433/349) lebih tinggi daripada panggilan telepon yang menghasilkan skor umpan balik positif."]}),"\n",(0,i.jsxs)(n.li,{children:["Mungkin menarik untuk melihat persentase penelepon yang mengalami waktu panggilan lebih tinggi ini dan meninggalkan skor negatif. Kami dapat dengan mudah kembali ke langkah mana pun dalam flow kami dan membuat perubahan pada konfigurasinya, sesuatu yang sangat umum dalam analisis ad hoc seperti ini. Kembali ke step ",(0,i.jsx)(n.strong,{children:"Aggregate 2"})," dan ",(0,i.jsx)(n.strong,{children:"Aggregate 3"})," dan tambahkan ",(0,i.jsx)(n.strong,{children:"Number of Rows field"})," ke bagian ",(0,i.jsx)(n.strong,{children:"Aggregated Fields"}),". ",(0,i.jsx)(n.strong,{children:"Number of Rows field"})," dibuat secara otomatis dalam aggregate step dan memberi tahu kami number of rows untuk langkah tersebut. Setelah selesai, kembali ke ",(0,i.jsx)(n.strong,{children:"Union Step"}),".",(0,i.jsx)(n.br,{}),"\n","Perhatikan bahwa ",(0,i.jsx)(n.strong,{children:"1.363"})," pelanggan dari total 3.830 (",(0,i.jsx)(n.strong,{children:"1.363+2.467"}),") pelanggan mengalami waktu panggilan yang lebih tinggi, setidaknya secara rata-rata, dan meninggalkan skor survei negatif. Itu setara dengan 36% dari semua penelepon.","\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["CATATAN PENTING",(0,i.jsx)(n.br,{}),"\n","Jangan lupakan kalkulator tua biasa Anda. Seringkali, perhitungan cepat sederhana selama analisis ad hoc, seperti menentukan selisih persentase pada langkah ini, dilakukan lebih cepat dengan kalkulator sederhana. Jika Anda tidak perlu menghitung ulang nilai ini lagi atau tidak bermaksud untuk menjalankan alur Anda terhadap data baru, tip sederhana ini seringkali dapat menghemat waktu Anda."]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Kumpulan data yang disediakan juga menyertakan file data kasus. Data ini berisi kutipan dari sistem manajemen kasus pusat panggilan dan mencatat tujuan panggilan, serta produk terkait. Tambahkan data connection ketiga ke flow Anda untuk file Excel, ",(0,i.jsx)(n.strong,{children:"case_data.xlsx"}),". Di connection settings, perbaiki tipe data untuk bidang ",(0,i.jsx)(n.strong,{children:"call_id"})," menjadi ",(0,i.jsx)(n.strong,{children:"String"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Gabungkan data kasus yang baru ditambahkan dengan ",(0,i.jsx)(n.strong,{children:"Clean Step 2"})," dengan menyeret dan menjatuhkan ",(0,i.jsx)(n.strong,{children:"Case Data step"})," di atas ",(0,i.jsx)(n.strong,{children:"Clean Step 2"}),". Clean Step 2 berisi semua data yang telah kami gunakan sejauh ini untuk pelanggan yang memberikan peringkat antara 1 dan 4. Dengan menggabungkannya dengan data kasus, kami dapat mulai mengidentifikasi alasan pelanggan ini menelepon. Tinggalkan ",(0,i.jsx)(n.strong,{children:"Join Clause"})," yang terdeteksi secara otomatis atur ke ",(0,i.jsx)(n.strong,{children:"case_id"})," dan ",(0,i.jsx)(n.strong,{children:"Join Type"})," sebagai ",(0,i.jsx)(n.strong,{children:"Inner"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Tambahkan ",(0,i.jsx)(n.strong,{children:"Aggregate Step"})," setelah ",(0,i.jsx)(n.strong,{children:"Join 3"})," yang baru ditambahkan, lalu tambahkan ",(0,i.jsx)(n.strong,{children:"contact_reason"})," ke bagian ",(0,i.jsx)(n.strong,{children:"Grouped Fields"}),", dan ",(0,i.jsx)(n.strong,{children:"Number of Rows"})," ke bagian ",(0,i.jsx)(n.strong,{children:"Aggregated Fields"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Selanjutnya, tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," dan amati number of rows berdasarkan ",(0,i.jsx)(n.strong,{children:"contact_reason"}),". Cukup jelas bahwa tiga angka menonjol dari yang lain: ",(0,i.jsx)(n.strong,{children:"403"}),", ",(0,i.jsx)(n.strong,{children:"404"}),", dan ",(0,i.jsx)(n.strong,{children:"410"})," jauh lebih tinggi daripada number of rows lainnya. Pilih tiga angka, klik kanan, dan pilih ",(0,i.jsx)(n.strong,{children:"Keep Only"})," untuk memfilter data hanya ke tiga nilai ini. Saat melakukannya, kami segera melihat tiga alasan utama mengapa orang menelepon: ",(0,i.jsx)(n.strong,{children:"Firmware Issue"}),", ",(0,i.jsx)(n.strong,{children:"Unable to Boot Up"}),", dan ",(0,i.jsx)(n.strong,{children:"Update Issue"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Untuk memastikan persentase panggilan yang dialihkan ke tiga alasan ini, klik langkah ",(0,i.jsx)(n.strong,{children:"Join 3"})," untuk melihat jumlah baris di cabang ini yang tercantum di bawah ",(0,i.jsx)(n.strong,{children:"Join Result"})," di konfigurasi. Jumlah baris di sini, ",(0,i.jsx)(n.strong,{children:"1.363"}),", adalah jumlah survei dengan skor 4 atau lebih rendah. Dengan informasi yang dikumpulkan pada Langkah 17, kita dapat menghitung persentase panggilan dalam subset ini yang terkait dengan salah satu dari tiga kategori utama, yaitu (403+404+410)/1363 = 89%"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Data Kasus"})," juga mencakup ",(0,i.jsx)(n.strong,{children:"produk"})," per kasus. Mari kita lihat produk mana yang dipengaruhi oleh tiga alasan kasus yang telah kami identifikasi di Langkah 17. Untuk melakukan ini, gabungkan ",(0,i.jsx)(n.strong,{children:"Join 3"})," dengan ",(0,i.jsx)(n.strong,{children:"Clean 5"}),". Biarkan konfigurasi default disetel, dengan ",(0,i.jsx)(n.strong,{children:"Join Clause"})," pada ",(0,i.jsx)(n.strong,{children:"contact_reason"})," dan ",(0,i.jsx)(n.strong,{children:"Join Type inner"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Terakhir, tambahkan ",(0,i.jsx)(n.strong,{children:"Clean Step"})," setelah gabungan yang baru ditambahkan dan hapus semua field kecuali ",(0,i.jsx)(n.strong,{children:"Number of Rows"}),", ",(0,i.jsx)(n.strong,{children:"product"}),", dan ",(0,i.jsx)(n.strong,{children:"contact_reason"}),". Sekarang kita dapat dengan jelas melihat produk yang terpengaruh di file produk."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"kesimpulan",children:"Kesimpulan"}),"\n",(0,i.jsx)(n.p,{children:"Dengan selesainya langkah-langkah ini, Anda telah berhasil melakukan analisis ad hoc di Tableau Prep itu sendiri. Kami dapat meringkas temuan kami dalam laporan kepada pemohon sebagai berikut:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Skor kepuasan pelanggan rata-rata untuk Januari 2021 adalah ",(0,i.jsx)(n.strong,{children:"4,05"})," (dari 10)."]}),"\n",(0,i.jsxs)(n.li,{children:["Lebih dari sepertiga, ",(0,i.jsx)(n.strong,{children:"36%"}),", pelanggan menilai tingkat kepuasan mereka sebagai 4 atau lebih rendah."]}),"\n",(0,i.jsxs)(n.li,{children:["Rata-rata, pelanggan yang memberikan umpan balik negatif biasanya mengalami waktu panggilan ",(0,i.jsx)(n.strong,{children:"27% lebih lama"})," dibandingkan dengan waktu panggilan untuk pelanggan yang memberikan umpan balik positif."]}),"\n",(0,i.jsxs)(n.li,{children:["Dari ",(0,i.jsx)(n.strong,{children:"1.363"})," panggilan terkait dengan umpan balik negatif (4 atau lebih rendah), ",(0,i.jsx)(n.strong,{children:"1.217 (89%)"})," terkait dengan masalah terkait ",(0,i.jsx)(n.strong,{children:"Firmware, Updates atau Booting up"}),". Produk yang berhubungan dengan panggilan dan masalah ini adalah sebagai berikut:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'2019 13" Super Book'}),"\n",(0,i.jsx)(n.li,{children:'2019 15" Desktop PC'}),"\n",(0,i.jsx)(n.li,{children:'2020 13" Airbook Laptop'}),"\n",(0,i.jsx)(n.li,{children:'2020 13" Notebook Z'}),"\n",(0,i.jsx)(n.li,{children:'2020 14" Notebook X'}),"\n",(0,i.jsx)(n.li,{children:'2020 16" Megabook Pro'}),"\n",(0,i.jsx)(n.li,{children:'2020 16" Ultrabook'}),"\n"]}),"\n"]}),"\n"]})]})}function k(a={}){const{wrapper:n}={...(0,s.a)(),...a.components};return n?(0,i.jsx)(n,{...a,children:(0,i.jsx)(u,{...a})}):u(a)}},11151:(a,n,e)=>{e.d(n,{Z:()=>l,a:()=>r});var i=e(67294);const s={},t=i.createContext(s);function r(a){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function l(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(s):a.components||s:r(a.components),i.createElement(t.Provider,{value:n},a.children)}}}]);
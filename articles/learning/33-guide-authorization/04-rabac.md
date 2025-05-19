# Kontrol Akses Berdasarkan Hubungan (ReBAC)

Otorisasi berbasis hubungan, atau ReBAC, berarti menyusun hak akses berdasarkan hubungan antar resource. Hubungan-hubungan ini dapat meliputi:

- **Kepemilikan data**, misalnya membiarkan pengguna yang membuat suatu posting untuk mengedit posting tersebut.
- **Hubungan induk-anak**, seperti hubungan antara sebuah organisasi dan akun-akun yang menjadi bagiannya.
- **Kelompok**, misalnya tim yang anggotanya memiliki hak akses yang sama.
- **Hierarki**, seperti struktur pelaporan manajerial.

Dalam panduan ini, kita akan:

- Membahas pemodelan, implementasi, dan evaluasi masing-masing strategi ReBAC—yakni apa, bagaimana, dan kapan. Di sinilah sebagian besar waktu kita akan difokuskan.
- Membandingkan ReBAC dengan strategi otorisasi lain seperti RBAC dan ABAC.
- Menyelami cara kerja Google Zanzibar sebagai sistem untuk mengelola otorisasi berbasis hubungan.

---

## 0. Rekap Authorization Academy

Selamat datang di bab empat Authorization Academy! Mungkin Anda langsung datang dari bab sebelumnya, atau mungkin sudah beberapa waktu berlalu. Bagaimanapun juga, mari kita lakukan rekap singkat:

- Pada [**Apa itu Otorisasi?**](https://www.osohq.com/academy/what-is-authorization) kita telah membahas cara berpikir mengenai otorisasi secara arsitektural — di mana sebaiknya Anda menerapkan penegakan (enforcement) dan di mana Anda membuat keputusan otorisasi. Hal ini akan kembali relevan saat kita memikirkan cara mengimplementasikan model yang berbasis hubungan.
- Pada [**Role-Based Access Control (RBAC)**](https://www.osohq.com/academy/role-based-access-control-rbac) kita telah melihat pemodelan peran, yaitu cara mengelompokkan sekumpulan hak akses ke dalam peran seperti “user” dan “admin.”

Jika Anda baru dalam model otorisasi, kami menyarankan untuk menelaah kedua panduan tersebut terlebih dahulu. Pada panduan ini, kita akan membahas **hubungan** dan memandang peran sebagai salah satu tipe hubungan merupakan titik awal yang bagus.

---

## 1. Memodelkan Otorisasi sebagai Hubungan

Pada bab ini, kita akan membahas tentang hubungan dan konsep **kontrol akses berbasis hubungan** atau ReBAC. Dari sisi implementasi, hubungan sangat mirip dengan peran. Anda dapat menggunakan hubungan sebagai model mental yang berguna untuk mengimplementasikan otorisasi dan juga untuk mengkomunikasikannya kepada pengguna.

### Aplikasi Contoh Favorit Kami: GitClub

Kita akan terus menggunakan aplikasi contoh GitClub yang telah diperkenalkan pada panduan [**Apa itu Otorisasi?**](https://www.osohq.com/academy/what-is-authorization) dan yang juga digunakan di bab sebelumnya. Sebagai pengingat: GitClub adalah situs web untuk hosting kode sumber, kolaborasi, dan version control, mirip dengan aplikasi nyata seperti GitLab dan GitHub. GitClub memberikan contoh murni dari apa yang memotivasi otorisasi sejak awal — yaitu mengamankan akses ke resource. Sebuah "resource" adalah "sesuatu yang dapat diakses", seperti sebuah repository di GitClub. Pengguna mungkin dapat membaca atau mengubah sebuah repository, atau mungkin tidak.

### Apa Itu Hubungan?

Pertimbangkan skenario-skenario berikut:

- Pengguna dapat menghapus komentar yang **mereka buat**.
- Anda dapat membaca sebuah isu jika Anda adalah kontributor dari repository **induk**.
- Anda adalah kontributor repository jika Anda **termasuk dalam** sebuah tim, dan tim tersebut memiliki peran kontributor.

Dalam semua kasus ini, kita mendeskripsikan logika otorisasi dengan menggambarkan hubungan antar objek. Anda dapat mengetahui bahwa ini merupakan hubungan dengan membayangkan ada sebuah panah yang menghubungkan satu objek ke objek lainnya:

![Contoh hubungan antar objek](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f482b56d3d01b4bc85eb_P45RchmvjnMjixtkvzzjgdPmMPNcnVGNaxwsV25MMQphPb_Fa789TnmBbh_AuSoLvDiPUPHxeXgJ_vyAb9xni4wsT4sIvGy9-IY07fAyPo4pPJjecH0Q-Pv5Wrpd1QguWjvbykqf.avif)

**Contoh hubungan**

Kita memiliki beberapa tipe hubungan di sini. Yang pertama adalah hubungan "dibuat oleh" antara sebuah komentar dan seorang pengguna. Yang kedua adalah hubungan induk-anak antara sebuah isu dan sebuah repository. Dan yang terakhir adalah struktur kelompok, yaitu pengguna yang tergabung dalam tim.

Dengan ReBAC, Anda akan memanfaatkan hubungan-hubungan ini untuk menyusun otorisasi dalam aplikasi Anda.

### Kontrol Akses Berdasarkan Hubungan (ReBAC) versus Kontrol Akses Berdasarkan Atribut (ABAC)

![Hierarki peran, hubungan, dan atribut](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f4823b3749ec0a50afa5_TDy-IH54xrFUhzCHY-hpAvqFRTldduafw3uzMJJbq6oxrjkGagg-yU641eR053As3cSgiirDX-_PvVX8itjMV5C-OPVRHtVky8HW34FkEYaS1XqQCr13-sCpsjgrpE9KKCZOguZG.avif)

**Hierarki Peran, Hubungan, dan Atribut**

Seringkali orang membicarakan kontrol akses berbasis peran (RBAC) dan kontrol akses berbasis atribut (ABAC) sebagai dua model utama untuk otorisasi. Kita telah membahas berbagai bentuk peran pada Bab III. Tapi, apa sebenarnya ABAC itu?

**ABAC** mengacu pada model umum logika otorisasi yang menggunakan atribut tentang _actor_ (pelaku) dan _resource_ (sumber daya).

Jika Anda berpikir bahwa hal ini terdengar sangat luas, Anda benar. Hampir apa saja bisa dianggap sebagai atribut. Sebagai contoh, RBAC merupakan subset dari ABAC—sebuah peran adalah salah satu bentuk atribut. Namun, banyak kasus penggunaan dari bab-bab sebelumnya dan bab ini yang mengaburkan garis batas antara peran dan atribut. Seringkali, hal-hal tersebut lebih tepat disebut sebagai **hubungan**.

**ReBAC** (Kontrol Akses Berdasarkan Hubungan) juga merupakan subset dari ABAC. Kita bisa memandangnya sebagai sesuatu di antara RBAC dan ABAC, karena peran merupakan bentuk dari hubungan. Mempelajari akses berbasis hubungan merupakan langkah alami setelah mempelajari peran, dan hal ini akan membantu kita dalam memahami atribut di kemudian hari.

Pada akhirnya, atribut mencakup lebih banyak hal dibandingkan hanya peran dan hubungan. Ambil contoh yang sederhana: siapa pun dapat membaca sebuah repository jika ditandai sebagai "public". Atribut "public" merupakan contoh atribut yang bukan merupakan hubungan.

Meskipun model berbasis hubungan tidak sepenuhnya mencakup semua kasus penggunaan ABAC, model ini mencakup banyak kasus yang menarik. Mari kita selami dan lihat bagaimana hal ini bekerja.

### 2. Memodelkan Kontrol Akses Berdasarkan Hubungan (ReBAC)

Sebagai pengingat: model otorisasi dapat memberikan struktur pada implementasi dan cara berpikir tentang otorisasi di dalam aplikasi Anda. Menentukan model otorisasi yang tepat biasanya menghasilkan pengalaman pengguna yang intuitif dan memuaskan.

Jadi, ketika memikirkan skenario-skenario sebelumnya:

- Pengguna dapat menghapus komentar **yang mereka buat.**
- Anda dapat membaca sebuah isu jika Anda adalah kontributor dari repository **induk.**
- Anda menjadi kontributor repository jika Anda **termasuk dalam** sebuah tim, dan tim tersebut memiliki peran kontributor.

Model otorisasi bekerja paling baik ketika mereka mencerminkan cara kita secara alami mengekspresikan skenario-skenario tersebut. Inilah yang didapatkan ketika kita memandang hal tersebut sebagai hubungan.

Saat kita masuk ke dalam rincian implementasi, mungkin Anda akan menyadari bahwa hal-hal tersebut terlihat _persis_ seperti cara kita mengimplementasikan peran. Pengamatan yang bagus, masa depan Anda! Kami telah menyatakan bahwa peran adalah salah satu jenis hubungan, jadi wajar jika Anda mulai melihat kesamaan seperti ini.

Garis batas antara paradigma otorisasi yang berbeda memang bisa menjadi agak samar, dan kami akan menunjukkan perbedaannya sepanjang pembahasan. Sebagian perbedaannya terletak pada pengalaman pengguna dan model mental. Misalnya, apakah masuk akal untuk mengizinkan pengguna mendefinisikan hubungan mereka sendiri? Mungkin tidak. Namun, peran yang didefinisikan oleh pengguna masuk akal. Atau, haruskah kita memiliki konsep kepemilikan data (ownership) selain konsep peran? Sebaiknya pilih salah satunya karena masing-masing memiliki waktu dan tempatnya sendiri. Pertanyaan-pertanyaan seperti ini akan kita bahas lebih mendalam seiring berjalannya pembahasan.

---

#### Model Otorisasi Kepemilikan Data

Di GitClub, kita menerima permintaan fitur yang tidak sesuai dengan model berbasis peran yang kita terapkan sebelumnya. Pengguna ingin dapat menutup isu yang telah mereka buka. Sebelumnya, kita memungkinkan pengguna membuat dan membaca isu hanya berdasarkan izin yang mereka miliki pada repository. Menutup isu yang Anda buka mengharuskan keputusan otorisasi memperlakukan Anda lebih dari sekadar peran Anda.

##### Apa itu model otorisasi ini?

Banyak aplikasi memiliki konsep kepemilikan data. Misalnya, kebanyakan aplikasi mengizinkan pengguna memodifikasi profil dan pengaturan mereka sendiri, tetapi tidak pengaturan untuk pengguna lain. Kami mendeskripsikannya sebagai pengguna yang **memiliki** data mereka (apakah pengguna benar-benar "memiliki" data mereka adalah pertanyaan tersendiri).

Demikian pula, ketika seorang pengguna menulis komentar atau membuka sebuah isu, mereka adalah pemilik dari data tersebut, yang memberikan lebih banyak hak akses kepada pemilik.

##### Bagaimana mengimplementasikan model ini?

Salah satu aspek terbaik dalam menggunakan hubungan untuk memodelkan otorisasi adalah bahwa Anda sering kali dapat menggunakan data yang sudah ada di dalam aplikasi.

![Struktur basis data kepemilikan isu GitClub](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f482d4890d99ce439496_x4B3e18b9nwhV0h2MpdIeS5VzTWYudccwbWQHmX7PYGzxPFBYj6508KAJ-cXjHei28ZUtcZkzNkeZyHDnbLk6SogwmWLGNvpYUm3wJVZ5TV6f6F8iIWh8LUs5kMOuAAARclF3cUZ.avif)

Ketika seorang pengguna membuka sebuah isu, Anda kemungkinan besar akan menyimpan informasi itu dalam tabel **issues** dengan kolom **owner**. Selamat, Anda telah mendapatkan model hubungan Anda!

Secara serius, tantangannya di sini bukanlah bagaimana menyusun data — melainkan kapan harus menerapkan model ini dibandingkan mendefinisikan peran "owner" dan mengaitkan pengguna dengan peran tersebut. Kita juga harus memutuskan bagaimana merepresentasikan logika otorisasi, dan bagaimana menggabungkannya dengan logika peran yang sudah ada.

Sebagai contoh, kita masih ingin mengizinkan para maintainer repository untuk menutup isu. Dan kita mungkin tidak ingin pemilik isu dapat memberi tag pada isu atau menetapkan pengguna pada isu tersebut. Pertama, kita perlu menyelesaikan pemeriksaan akses berbasis peran, kemudian memeriksa akses berbasis hubungan.

![Alur keputusan otorisasi untuk kepemilikan isu](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f482f9f061b7681f8867_fZUnAx9VczufFuWyRI3m_JmyGEapPmkDgEhc6sWrNprfEayDEXJuym71sWDPxk88Ygv7ZTV1urz1pOmZJO9Gtu_Cb3FWIEnilEqxKXuPuYeS3XvFGOskLeVKc3KqJCr_hK3JKaDE.avif)

##### Kapan menggunakan model ini?

Model kepemilikan data sangat cocok digunakan kapan pun Anda menemukan ekspresi izin seperti “pengguna harus dapat ___ data mereka sendiri.” Contohnya: _menghapus_ isu mereka sendiri, _membaca_ profil mereka sendiri, atau _mengedit_ pull request mereka sendiri.

Model kepemilikan data merupakan pelengkap yang bagus untuk model berbasis peran yang ada, karena seringkali mengenkapsulasi logika yang tidak secara natural masuk ke dalam model peran.

Mari kita lihat bagaimana fitur yang sama akan bekerja jika menggunakan _hanya_ peran. Alih-alih menggunakan data submitter/isu, kita bisa memastikan bahwa setiap isu memiliki sebuah peran. Pertama, kita menetapkan bahwa orang yang membuat isu secara default mendapatkan peran "owner". Semua orang lainnya mendapatkan peran default "viewer". Akhirnya, maintainer repository juga mendapatkan peran "owner" untuk sebuah isu. Namun, apakah kita akan pernah mengharapkan untuk secara eksplisit menetapkan seseorang peran untuk sebuah isu? Tidak, setidaknya tidak dalam aplikasi GitClub ini. Mungkin di masa depan kita ingin mengizinkan maintainer menetapkan seorang pengguna ke peran "triage" untuk isu tersebut, yang memberikan mereka izin untuk menutup isu. Namun, di GitClub, kita tidak memiliki kasus penggunaan seperti itu.

Itulah pengamatan pentingnya! Terdapat banyak tumpang tindih antara peran dan hubungan, sehingga membedakan keduanya bisa menjadi rumit. Namun, menambahkan peran pada isu agar otorisasi lebih mudah diimplementasikan terasa seperti ekor yang menggoyangkan anjing. Cara alami untuk mengekspresikan pemilik isu bersamaan dengan peran repository sudah cukup untuk menyatakan model otorisasi yang kita butuhkan.

Akhirnya, untuk tipe resource tertentu, gunakanlah _satu_ cara: baik peran atau hubungan. Tidak masalah jika sebuah izin peran _mempengaruhi_ resource yang juga menggunakan model izin berbasis hubungan, seperti pada diagram di atas, tetapi jangan melakukan hal yang sama dengan dua cara berbeda. Hal itu akan membingungkan pengguna! Misalnya, ketika seseorang mengalami perubahan izin (misalnya, berhenti menjadi pemilik resource), mereka seharusnya mengharapkan bahwa akses mereka berubah sesuai dengan itu. Selain itu, Anda (sebagai programmer) tidak seharusnya harus mengkoordinasikan perubahan peran dan kepemilikan pada setiap titik akses.

---

#### Otorisasi dengan Resource Induk-Anak

Ada sebuah pola yang telah kami gunakan beberapa kali, baik di sini maupun pada Bab III, yang sengaja kami sederhanakan untuk menghindari memperkenalkan terlalu banyak abstraksi baru sekaligus. Maafkan kami karena telah mengecewakan kepercayaan Anda dengan menyembunyikan informasi ini.

Pola yang dimaksud adalah bagaimana menggunakan izin yang dimiliki pengguna untuk sebuah organisasi atau repository guna memberikan akses ke sebuah isu atau komentar yang tersarang di dalam organisasi atau repository tersebut. Secara khusus, tidak cukup hanya mengatakan “kontributor repository dapat menutup isu” — melainkan, Anda perlu menyatakan secara lengkap: “kontributor repository dapat menutup isu yang _dimiliki oleh_ repository tersebut.”

##### Apa itu model otorisasi ini?

Isu yang dimiliki oleh repository, repository yang dimiliki oleh organisasi. Pemetaan peran organisasi ke peran repository. Semua itu adalah contoh _resource induk-anak_ — jenis hubungan berikutnya.

![Contoh hubungan induk-anak](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6094049ec4bc0346f6971e72_E0oLXLTUN1HyS33WQpMfOIO-VxCheaRP7C2WL5XrDSXLGFr1tOCoCAhzLV0ClhpAVlOtlxD6G0QnxijMR29V6NAUJDytTsHZba7f4Zlmjr6AWv4J23WYp1ZVZ_PJ7yxwzF8a7wKe.avif)

Ide dasarnya adalah memberikan izin kepada seorang pengguna atau peran untuk _semua anak_ dari resource tertentu. Konsep ini sangat umum sehingga Anda mungkin tidak pernah menganggapnya perlu diberi nama khusus.

Perbedaannya terletak pada pertanyaan “apakah pengguna diizinkan untuk membaca isu ini?” dengan “apakah pengguna diizinkan untuk membaca semua isu pada repository ini?” Kita sering perlu dapat menyelesaikan kedua pertanyaan tersebut. Pola kepemilikan data yang baru saja kita lihat sedetail sebuah resource, sedangkan sebuah peran, di sisi lain, mungkin memberikan akses ke semua isu dalam sebuah repository.

Dengan merumuskan logika otorisasi menggunakan hubungan induk-anak, kita dapat menangani _kedua_ hal tersebut. Pertama, kita periksa apakah pengguna memiliki akses langsung, dan jika tidak, kita periksa apakah pengguna memiliki akses melalui resource induk.

##### Bagaimana mengimplementasikan model ini?

Sekali lagi, Anda dapat menggunakan model data yang sudah ada untuk mengimplementasikan model otorisasi ini. Tidak ada trik khusus di sini — kontrol akses berbasis hubungan didorong oleh pemanfaatan struktur data yang sudah ada di aplikasi Anda. Bab ini membantu Anda mengidentifikasi apa saja struktur tersebut, dan bagaimana menggunakannya untuk otorisasi.

![Struktur basis data untuk hubungan induk-anak](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f482d4890d99ce439496_x4B3e18b9nwhV0h2MpdIeS5VzTWYudccwbWQHmX7PYGzxPFBYj6508KAJ-cXjHei28ZUtcZkzNkeZyHDnbLk6SogwmWLGNvpYUm3wJVZ5TV6f6F8iIWh8LUs5kMOuAAARclF3cUZ.avif)

Logika otorisasi direpresentasikan dalam flowchart berikut. Ide umumnya adalah untuk pertama-tama memeriksa apakah _actor_ diizinkan untuk melakukan aksi pada resource — apakah melalui peran atau hubungan — dan jika tidak, periksa apakah actor diizinkan untuk melakukan aksi yang lebih umum pada resource induk.

![Alur keputusan otorisasi untuk resource induk-anak](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f483ee549b49f0f7988f_4N570k0Xk8l1OnU2pXH_XAGLfyNhrUwZUk8QJ1gkaRXc3RfPSg1xDpdEdx4NkJbO7b255H8KgI6qG1lyY5GkmH4gfe3ZNdKRRT84y3OU5LQRcjFD5NO_MtOBS61jtln18sY8iPQb.avif)

Misalnya, anggap kita ingin memeriksa apakah seorang pengguna dapat menghapus sebuah isu.

1. Periksa apakah pengguna memiliki izin _langsung_. Dalam kasus ini, satu-satunya kemungkinan adalah memeriksa apakah pengguna adalah pemilik isu.
2. Jika itu gagal, periksa apakah pengguna memiliki izin pada resource induk, yaitu apakah mereka memiliki izin untuk menghapus _semua_ isu yang dimiliki oleh repository induk.

Saat melihat flowchart di atas, Anda mungkin berpikir, “Apa yang telah saya masuki ini?” Anda mulai dengan organisasi, repository, dan isu, namun sekarang Anda melihat flowchart yang bersarang tiga tingkat.

Realisasinya, ini semua adalah skenario otorisasi yang sangat umum. Walaupun masing-masing bagiannya secara individual mudah dipahami, interaksi dan komposisinya mulai mengarah pada logika yang kompleks.

Dalam flowchart di atas, kami telah mengoptimalkan kemampuan grafis kami untuk menyajikan sesuatu yang mudah dipahami untuk merepresentasikan alur logika. Namun, kami tidak mencakup _semua_ kombinasi yang mungkin terjadi. Misalnya, kami menggunakan peran implisit induk-anak pada bab sebelumnya ketika menyatakan “admin organisasi adalah maintainer repository.”

Kita akan membahas bagaimana mengelola kompleksitas ini di akhir bagian ini.

##### Kapan menggunakan model ini?

Anda hampir pasti akan menggunakan model ini, baik secara eksplisit maupun tidak. Jadi, terimalah! Ingatlah model ini saat Anda menambahkan izin pada suatu peran yang menyatakan, “admin organisasi diizinkan untuk mengedit tugas,” karena mungkin saja ada hubungan induk-anak yang terlibat. Ingatlah bahwa ketika memeriksa siapa yang dapat mengedit sebuah tugas, Anda mungkin perlu memeriksa apakah seseorang memiliki izin langsung (misalnya, mereka membuat tugas itu) atau melalui resource induk (misalnya, sebagai admin dari organisasi induk).

Namun, hindarilah menggunakan izin resource induk-anak bersamaan dengan peran pada resource anak. Hal ini dapat mengakibatkan terlalu banyak cara berbeda untuk mendapatkan akses ke resource yang sama.

Kita sudah memiliki peran repository, jadi seharusnya kita **tidak** mengizinkan agar izin repository didefinisikan pada peran organisasi. Jika dilakukan, akan muncul terlalu banyak kemungkinan dalam mengizinkan sebuah permintaan. Hasil akhirnya biasanya adalah pengalaman pengguna yang membingungkan, implementasi yang rentan terhadap kesalahan, atau keduanya. Sebaiknya, gunakan pola _peran implisit induk-anak_. Pola peran implisit induk-anak menyatakan bahwa jika seorang pengguna memiliki “Peran X” pada resource induk, maka ini menyiratkan bahwa mereka juga memiliki “Peran Y” pada resource anak.

Sebagai contoh, jika Anda ingin semua anggota organisasi dapat membaca repository, maka jadikan anggota organisasi memiliki peran implisit sebagai _repository guest_. Ini memberikan mereka tingkat izin dasar, sekaligus memperjelas tindakan apa yang dapat dilakukan sebagai anggota organisasi di dalam repository.

---

#### Model Otorisasi dengan User Groups

Bayangkan GitClub meroket sukses, dan organisasi-organisasi besar terus bergabung. Namun, beberapa organisasi kesulitan mengelola seluruh pengguna mereka. Terlalu banyak peran individual yang harus dikelola. Yang mereka inginkan sebenarnya adalah **tim**. Mereka sudah mengorganisasi engineer berdasarkan tim, jadi wajar jika mereka menggunakan struktur serupa untuk mengelompokkan pengguna dan menetapkan izin.

##### Apa itu model otorisasi ini?

Membagi pengguna ke dalam **kelompok** adalah cara alami untuk mengatasi pertumbuhan jumlah pengguna, dan banyak tim produk mendapati diri mereka menambahkan kelompok saat menarik pelanggan yang lebih besar.

User groups secara struktural sangat mirip dengan hubungan resource induk-anak. Namun, alih-alih resource yang dimiliki oleh resource lain, di sini kita memiliki pengguna yang tergabung dalam kelompok. Dari situ, kita perlu memutuskan bagaimana kelompok memengaruhi izin anggota-anggotanya.

Kelompok tidak secara inheren memiliki makna otorisasi tertentu. Sama seperti pengguna, kelompok perlu diberikan izin. Memutuskan model otorisasi apa yang akan digunakan dengan kelompok mengikuti proses pemikiran yang sama seperti untuk pengguna. Mudah-mudahan, sudah ada kebutuhan yang jelas untuk kelompok dalam aplikasi, dan Anda menggunakannya untuk memandu desain. Untuk GitClub, tujuannya adalah mengontrol akses ke repository berdasarkan keanggotaan tim. Untuk pengguna, kita menggunakan peran untuk menentukan hal ini, jadi kita sebaiknya menggunakan peran untuk tim juga.

##### Bagaimana mengimplementasikan model ini?

Terdapat dua bagian inti dalam model data user groups. Pertama adalah implementasi kelompok itu sendiri. Tergantung kasus penggunaannya, Anda mungkin ingin pengguna tergabung dalam beberapa kelompok. Jika kelompok mewakili departemen di sebuah perusahaan, mungkin satu penugasan per kelompok sudah cukup. Untuk GitClub, pengguna dapat tergabung dalam beberapa tim.

Bagian kedua adalah data yang memberikan akses. Karena kita menggunakan peran untuk hal ini, model data kita akan memiliki peran antara tim dan repository.

![Struktur basis data untuk user groups](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f4836bde46987864a43f_SprQB8c3pUqm2WHK71-jonz1negmVtvibDJLxIkefAtLgIis9-XhH1TCxKQgO25R1-uHBdAzNUddyL9EhcrdILKG-NkCi5SJbUSRa8a9iWep-ab2fT-fiyESxr_OhudTvd1C7xYP.avif)

**Diagram Struktur Basis Data untuk User Groups**

Kami tidak akan membuat flowchart lagi; ide umumnya sama seperti pada diagram induk-anak:

1. Periksa apakah pengguna memiliki izin yang relevan (baik melalui peran, hubungan kepemilikan, atau melalui resource induk).
2. Untuk setiap kelompok yang diikuti pengguna, periksa apakah kelompok tersebut memiliki izin.

##### Kapan menggunakan model ini?

User groups adalah cara yang bagus untuk memberdayakan pengguna akhir dalam mengorganisasi izin mereka dengan struktur yang lebih rapi. Di sini kami menampilkan salah satu varian di mana pengguna dikelompokkan bersama, dan kemudian izin diberikan kepada kelompok tersebut melalui peran.

Varian hubungan lain yang serupa juga ada dan semuanya mengikuti pola yang sama. Misalnya, Anda mungkin menambahkan sejumlah isu ke dalam sebuah proyek bersama. Atau, Anda mungkin menetapkan pengguna ke sebuah proyek. Ini menggunakan model kontrol akses baik _induk-anak_ **dan** kelompok secara bersamaan. Sebuah isu akan memiliki proyek induk, dan pengguna tergabung dalam proyek, mirip dengan kelompok. Dalam hal ini, kita akan menggabungkan kedua model kontrol akses: seorang pengguna dapat mengedit isu yang dimiliki oleh sebuah proyek jika mereka juga tergabung dalam proyek tersebut.

---

#### Hierarki, alias "Recursive Relationships"

Pada suatu hari musim panas yang cerah di GitClub, semuanya berjalan dengan baik. Hingga tiba berita: Pelanggan $large_co ingin menggunakan tim GitClub untuk mencerminkan struktur organisasi mereka dan memberikan akses ke repository yang berbeda berdasarkan tim mana pengguna tergabung. Kedengarannya luar biasa sampai kita menyadari bahwa ini berarti mendukung tim yang tersarang (nested teams) — sesuatu yang belum pernah kita temui sebelumnya.

##### Apa itu model otorisasi ini?

Ada beberapa kasus di mana hubungan menjadi **rekursif**.

Meskipun pola ini tidak seumum beberapa pola lain yang telah kita bahas, **hierarki** muncul dalam berbagai skenario. Salah satu contohnya adalah apa pun yang perlu menangani hierarki organisasi. Ini bisa terkait dengan HR, penggajian, pengeluaran, dan sejenisnya. Logika otorisasi yang menyertainya berbunyi: “manajer dapat menyetujui pengeluaran untuk karyawan yang mereka pimpin,” di mana manajer itu sendiri bisa memiliki manajer.

Contoh lain adalah apa pun yang menyerupai sistem berkas. Dalam aplikasi seperti Google Drive, Anda dapat memberikan akses kepada pengguna pada sebuah folder, dan secara otomatis mereka akan mendapatkan akses ke semua file atau subfolder di dalam folder tersebut.

##### Bagaimana mengimplementasikan model ini?

Ini mungkin sudah terdengar familiar — kita sudah melihat sebagian besar komponen yang diperlukan untuk mengimplementasikan model ini. Kita akan memperluas model sebelumnya sehingga tim juga memiliki tim induk.

![Struktur basis data untuk hubungan rekursif](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f4834449931f1b97597d_WVIxcpKUkMwDwwmUezLKmq0a5cK7KmxnD4grNPSlCxGlUawPKnD867Cv8ddgplgpbMkn9CkkJaGe7q-qF-4He0MuTjnEz9NjUBbVE_BGW--4D1sd2rhHSYXrbxZ1HIzdrbJO1mf_.avif)

Logika otorisasi secara tingkat tinggi sama seperti pada skenario resource induk-anak dan kelompok. Namun, perbedaannya adalah sekarang kita memiliki hubungan rekursif. Cara yang baik untuk menangani rekursi ini adalah dengan memanfaatkan dukungan basis data untuk mengambil semua tim bersarang untuk seorang pengguna atau repository sekaligus. Dengan demikian, Anda menghindari melakukan query basis data berkali-kali saat memeriksa setiap tim untuk izin yang diperlukan.

##### Kapan menggunakan model ini?

Jika aplikasi Anda tidak memiliki data hierarkis, Anda dapat dengan aman melewati bagian ini dan melupakannya.

Namun, jika Anda _memiliki_ hierarki, apakah Anda dapat menghindari menangani struktur data rekursif untuk keputusan otorisasi?

Hal itu hanya mungkin jika resource yang berada dalam hierarki tidak perlu mengevaluasi izin untuk _semua_ induk. Misalnya, anggap kita menambahkan komentar berantai (threaded comments) di GitClub. Satu baris di tabel komentar mungkin memiliki kolom “parent_comment_id” dan “root_comment_id”. Dalam kasus itu, kita masih bisa menjalankan logika “pengguna dapat mengedit komentar untuk repository yang mereka kelola” dengan menelusuri dari komentar ke komentar root ke repository, menggunakan model hubungan induk-anak. Cari peluang serupa jika Anda ingin menghindari kompleksitas hierarki.

---

### Mengimplementasikan Logika Kontrol Akses Berdasarkan Hubungan

Setiap contoh hubungan yang kita bahas memiliki model data yang relatif sederhana. Dalam banyak kasus, kita menggunakan data aplikasi secara langsung. Namun, kombinasi dan permutasi berbagai hubungan dan aturan secara perlahan-lahan mengubah flowchart kita menjadi semacam seni abstrak.

Kami sedang membangun Oso untuk memudahkan ekspresi dan penggabungan jenis hubungan ini ke dalam model otorisasi yang konsisten. Pendekatan kami adalah menggunakan _kebijakan terpusat_ (centralized policy) untuk mengekspresikan logika atas hubungan yang sudah ada di aplikasi Anda. Bahasa kebijakan tersebut memungkinkan Anda menggabungkan hubungan-hubungan itu menjadi logika otorisasi yang lengkap. Misalnya, Anda dapat mendefinisikan peran dan hubungan, dan menggunakan potongan-potongan tersebut bersama-sama untuk mendefinisikan model komposit untuk izin induk-anak dan peran implisit yang telah kita bahas sebelumnya. Hal ini memungkinkan Anda fokus pada **apa** yang harus dilakukan, tanpa harus memikirkan _bagaimana_ menyelesaikannya. Jika Anda tertarik untuk mempelajari lebih lanjut, tempat yang bagus untuk memulai adalah [dokumentasi Oso mengenai pola otorisasi ReBAC](https://www.osohq.com/docs/guides/relationship-based-access-control-rebac).

---

## 3. Satu ReBAC Untuk Mengatur Semuanya?

Melihat kembali, kita kini telah membahas sekitar setengah lusin model otorisasi, termasuk peran dan hubungan. Semua model tersebut didasarkan pada pemanfaatan model data yang sudah ada di dalam aplikasi, mungkin dengan menambahkan peran jika diperlukan.

Dengan setup ini, seluruh data otorisasi hidup berdampingan dengan data aplikasi. Faktanya, sebagian besar data otorisasi _adalah_ data aplikasi, dan tantangannya terutama terletak pada bagaimana membuat keputusan otorisasi dengan menggunakan input tersebut.

Pendekatan alternatif adalah dengan mengambil seluruh hubungan itu dan mengonsolidasikannya ke dalam satu model data tunggal. Pendekatan ini memungkinkan Anda mengadopsi arsitektur otorisasi terpusat yang telah kita bahas di Bab II. Keuntungannya adalah Anda dapat menambahkan dan memperbarui logika otorisasi secara independen dari aplikasi Anda. Namun, hal ini datang dengan biaya yang cukup besar — sekarang semua data aplikasi harus melewati model sentral tersebut.

---

### Data Hubungan Terpusat

Seluruh hubungan yang telah kita bahas sejauh ini dapat diekspresikan sebagai sebuah triple data:

- **Siapa/apa** yang merupakan sumber hubungan.
- **Siapa/apa** yang menjadi target hubungan.
- **Apa** hubungan antara sumber dan target tersebut.

Sebagai contoh, dalam hubungan “Alice adalah pemilik isu #412”, sumber hubungannya adalah Alice, hubungannya adalah “pemilik”, dan target hubungannya adalah isu #412.

Triple data ini merupakan awal dari model data terpusat kita.

Anda dapat membayangkan data ini sebagai sebuah grafik. Versi sederhana dari grafik tersebut memiliki node yang mewakili sumber dan target, dan hubungan diindikasikan oleh tepi (edge).

![Hubungan data antar resource di GitClub](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f483c4bc039abc96af7f_j1gRCPHytSLzQt7I4fdpDlw3u8v2068GgSCtePAUF1gGi9v27sN5d8aWFCi8GVEudOk9fSwZXE6dDeIInxKo1IkFHyV_7xz5QTE6fJbRSVgx5h87uE2jrITxc2aYujDOf1k0IPvD.avif)

_(Diagram: Hubungan data antar resource di GitClub)_

Misalkan kita ingin mengevaluasi pertanyaan: apakah Alice diizinkan mengedit repository Anvil? Pertama, kita mencari seluruh hubungan yang dimiliki Alice dengan repository tersebut. Kita dapat melakukannya dengan menelusuri grafik dan menemukan semua jalur (path).

Data yang direpresentasikan dalam grafik di atas adalah:

- (Alice, admin, Acme)
- (Acme, induk, Anvil)
- (Anvil, induk, isu #412)
- (Bob, tamu, Anvil)
- (Alice, pemilik, isu #412)

Kita mulai dengan setiap hubungan yang sumbernya adalah Alice, dan menelusuri dari sumber ke target:

- Alice → admin di Acme
- Acme → induk dari Anvil

Maka, berdasarkan aturan “admin organisasi adalah maintainer repository”, Alice merupakan _maintainer_ dari repository Anvil.

Dalam layanan terpusat kita, kita bisa menggunakan satu tabel “relations” untuk menyimpan triple data tersebut. Sebagai contoh:

![Struktur basis data untuk data hubungan terpusat](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6093f48395fb10856f0de90e_oRQbjnekL-CGpcZfxKV6gvJqlNAmt-p-qkxb1FjAEysiQSTZG2ZuOf9_xYbFX8rGzy8JwpBWHRgxYh5R8G62nv1yqd1-APU9Xt0IQ6N36yO3P450qqF5QCUcdMN0QS326vuXAKFb.avif)

_(Diagram: Struktur basis data untuk data hubungan terpusat)_

Diagram skema di atas adalah contoh kasar bagaimana data dapat disusun. Namun, diagram tersebut menyoroti poin terpenting: kita tidak lagi menyimpan informasi hubungan secara langsung pada model data. Untuk melakukan tugas-tugas umum seperti menampilkan semua repository dalam suatu organisasi, aplikasi perlu merujuk ke tabel relations.

Namun, model data ini saja belum cukup untuk menangkap kontrol akses berbasis hubungan dalam model terpusat. Anda memerlukan logika otorisasi tambahan di atasnya.

Sebagai contoh, kita tahu bahwa admin organisasi juga merupakan anggota organisasi. Kita tidak ingin menyatakan seluruh logika ini secara statis dengan memasukkan entri yang sesuai ke dalam tabel. Sebaliknya, kita harus dapat mengevaluasi data hubungan yang ada bersama dengan aturan dinamis kita.

Mengimplementasikan logika ini sedikit lebih terbatas dibandingkan apa yang telah kita bahas di awal bab. Kita tidak perlu lagi mengetahui _bagaimana_ cara memeriksa apakah sebuah repository milik suatu organisasi — kita cukup mencari hubungan “pemilik” antara organisasi dan repository di basis data. Hal ini menyederhanakan satu bagian logika otorisasi: kita tahu cara mengakses data. Namun, Anda tetap perlu menentukan bagaimana menulis logika untuk menggabungkan seluruh hubungan tersebut agar membentuk model otorisasi secara keseluruhan.

---

### Sistem ReBAC Terpusat di Dunia Nyata: Google Zanzibar

Salah satu contoh model data terpusat di dunia nyata adalah [**Google Zanzibar**](https://www.osohq.com/learn/google-zanzibar). Pertama kali dipresentasikan pada USENIX ATC 2019, Zanzibar merupakan pendekatan Google untuk otorisasi bagi layanan seperti Cloud, Drive, dan YouTube — hampir semua otorisasi di Google menggunakan sistem ini.

Dua kontribusi utama dari paper Zanzibar adalah:

1. Implementasi contoh dari model otorisasi berbasis hubungan.
2. Bagaimana mereka berhasil membuat Zanzibar bekerja pada skala Google.

Model hubungan Zanzibar terdiri dari dua komponen utama: _relationship tuples_ dan konfigurasi _namespace_. Masing-masing mewakili data otorisasi dan logika otorisasi.

- _Relationship tuples_ setara dengan triple data yang kita lihat sebelumnya.
- Konfigurasi _namespace_ menangkap informasi seperti:
    - Terdapat pemilik dokumen, editor, dan viewer. Pengguna dapat ditetapkan secara langsung ke salah satu hubungan (peran) tersebut.
    - Pemilik dokumen merupakan editor dokumen. Dan editor dokumen merupakan viewer dokumen.
    - Pengguna yang merupakan editor dari induk dokumen juga merupakan editor dari dokumen itu.

Kombinasi antara _relationship tuples_ dan konfigurasi _namespace_ merupakan cara yang fantastis untuk menyusun otorisasi. Seluruh model yang diusulkan di Zanzibar sangat berpengaruh bagi penulis ini dan banyak pihak lainnya.

Namun, yang paling mengesankan dari Zanzibar adalah infrastruktur yang diperlukan agar sistem tersebut dapat bekerja pada skala Google.

Untuk memberi gambaran mengenai istilah “skala Google”, berdasarkan paper 2019:

- Ratusan aplikasi.
- Lebih dari 2 triliun _relation tuples_ yang memakan hampir 100 terabyte.
- 10 juta permintaan klien per detik.

Untuk mengelola beban ini, Google menggunakan lebih dari 10.000 server untuk menangani permintaan, dan data itu sendiri disimpan di basis data SQL terdistribusi Google, [**Spanner**](https://cloud.google.com/blog/products/gcp/introducing-cloud-spanner-a-global-database-service-for-mission-critical-applications).

Jika Anda ingin mempelajari Zanzibar lebih detail, kami pernah berkolaborasi dengan salah satu penulis Zanzibar dalam artikel [Building Zanzibar From Scratch](https://www.osohq.com/post/zanzibar). Seperti namanya, artikel tersebut membahas Zanzibar secara mendalam.

---

### Kapan Menggunakan Hubungan Terpusat

Manfaat utama dari model hubungan terpusat adalah memungkinkan pengelolaan otorisasi secara terpusat. Artinya, tim pengembangan dapat membuat aplikasi baru dan menambahkan hubungan baru tanpa perlu memperbarui kode aplikasi apa pun.

Namun, kekurangannya adalah Anda membatasi aplikasi untuk menggunakan model data yang sangat spesifik dan Anda harus merancang aplikasi Anda berdasarkan penyimpanan data tersebut.

Karena alasan ini, kami tidak merekomendasikan penggunaan model hubungan terpusat secara umum.

Mengulangi pesan utama dari bab ini: bangunlah otorisasi di sekitar aplikasi Anda, bukan sebaliknya. Artinya, ketika Anda menghadapi masalah skala data dan mempertimbangkan untuk memusatkan sebagian arsitektur data Anda, saat itulah waktu yang tepat untuk mempertimbangkan mengonsolidasikan model otorisasi Anda.

Kami menemukan bahwa pada kenyataannya hanya ada beberapa hubungan yang benar-benar penting. Kita telah membahasnya dalam dua bab sebelumnya: peran, kepemilikan data, resource induk-anak, dan kelompok.

Jika Anda ingin mendapatkan manfaat dari model otorisasi berbasis hubungan yang konsisten, kami menyarankan Anda menggunakan sesuatu seperti Oso, yang memudahkan ekspresi otorisasi menggunakan hubungan atas model data yang sudah ada di aplikasi Anda.

---
## 4. Aturan Emas: Bangun Otorisasi di Sekitar Aplikasi Anda

Hubungan merupakan konsep inti yang muncul secara alami di banyak aplikasi — tidak hanya untuk otorisasi. Sebelumnya, kita telah melihat berbagai skema otorisasi berbasis peran dan bagaimana menggunakannya. Dengan hubungan, tantangannya adalah mengenali kapan data yang relevan sudah ada di aplikasi Anda, dan bagaimana memanfaatkannya untuk otorisasi.

Kita telah membahas beberapa contoh hubungan dan cara mengimplementasikannya menggunakan model data aplikasi yang sudah ada. Pendekatan alternatif adalah dengan memusatkan seluruh data hubungan seperti yang dilakukan oleh Google Zanzibar. Meskipun pendekatan ini memungkinkan Anda membangun model otorisasi yang konsisten, biayanya adalah Anda harus secara drastis merancang ulang arsitektur aplikasi Anda. Hal ini melanggar aturan emas kita: bangunlah otorisasi di sekitar aplikasi Anda, bukan sebaliknya. Kami menyarankan untuk tetap menggunakan model data aplikasi yang sudah ada.
# Penegakan Otorisasi

Penegakan otorisasi adalah proses untuk meminta keputusan otorisasi dan bertindak berdasarkan hasilnya. Setelah Anda mengetahui apakah seorang pengguna seharusnya diizinkan atau ditolak untuk mengakses suatu resource, Anda perlu mengimplementasikan aturan akses tersebut. Anda juga harus menentukan di mana penegakan ini ditempatkan, dan panduan ini akan menunjukkan cara menentukan hal tersebut.

---

### 1. Apa yang Dibahas dalam Panduan Ini

Pada Bab II, kita telah membahas arsitektur otorisasi dan menelusuri alur hidup sebuah permintaan dalam aplikasi contoh GitClub. Kita melihat ada beberapa titik di mana kita mungkin ingin menambahkan otorisasi, dan semua itu berpusat pada pertanyaan: apakah **actor** diizinkan untuk melakukan **action** pada **resource** tertentu? Pertanyaan inilah yang membentuk antarmuka otorisasi kita, dan dua sisi dari antarmuka tersebut adalah keputusan dan penegakan.

Pada Bab III dan IV, kita melihat bagaimana kita dapat menggunakan model otorisasi untuk membuat keputusan otorisasi. Model-model tersebut mencakup peran dan hubungan.

Bab ini membahas **penegakan**, bagian kedua dari persamaan _otorisasi = keputusan + penegakan_ yang telah kita perkenalkan di Bab II. Di sini, kita menyediakan model untuk menentukan di mana sebaiknya otorisasi ditegakkan, apa saja yang harus ditegakkan di titik-titik tersebut, bagaimana menghubungkan penegakan dengan mekanisme keputusan, dan apa yang harus dilakukan dengan hasil keputusan tersebut.

Seperti pada bab-bab sebelumnya, kita akan terus menggunakan aplikasi contoh GitClub. Sebagai pengingat: GitClub adalah situs web untuk hosting kode sumber, kolaborasi, dan version control, mirip dengan aplikasi nyata seperti GitLab dan GitHub. GitClub memberikan contoh murni tentang apa yang memotivasi otorisasi sejak awal — yaitu mengamankan akses ke resource. Sebuah "resource" adalah "sesuatu yang dapat diakses", seperti sebuah repository di GitClub. Pengguna mungkin dapat membaca atau melakukan perubahan pada repository tersebut, atau mungkin tidak.

---

#### Apa itu Penegakan Otorisasi?

Pada dua bab terakhir, kita telah menelusuri cara membuat **keputusan otorisasi**: apakah actor diizinkan melakukan aksi pada resource tertentu? Penegakan adalah proses untuk meminta **keputusan otorisasi tersebut dan bertindak berdasarkan hasilnya**.

Dengan kata lain, penegakan adalah bagian yang Anda tambahkan ke dalam aplikasi Anda untuk benar-benar mencegah pengguna mengakses data yang tidak seharusnya mereka akses.

![Alur penegakan otorisasi](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb67c66b560f5ed529d523_NBCbp33ErpxKQ3e25k_5ZU3qXZR2f-UauBEBAl-JefmXiFnDBtE2avoYoPstUWrS_1bMeoLBVwj_7hMZHpG3WZp9H9hlfTr1Osya5Zd3fzCB7-yzAXdsesST-VX1OSi6iN8TpWsY.png)

Di aplikasi GitClub, salah satu contoh penegakan adalah pada kode yang menangani pengambilan dan pengembalian sebuah repository. Untuk meminta keputusan otorisasi, pertama-tama kita menentukan query otorisasi: apakah pengguna saat ini diizinkan untuk membaca repository yang diminta? Di GitClub, kita menangani otorisasi melalui sebuah library. Jadi, meminta keputusan berarti memanggil metode library, misalnya `is_allowed(user, "read", repository)`.

Kita akan mendapatkan sebuah keputusan. Jika keputusannya "allow", maka permintaan dilanjutkan seperti biasa. Namun, jika keputusannya "deny", maka kita akan mengembalikan error kepada pengguna.

---

#### Di Mana Menegakkan Otorisasi?

Sebaiknya kita memikirkan di mana menambahkan penegakan dengan melihat lapisan-lapisan dalam arsitektur multitier. Kita tidak akan menulis buku tentang pola arsitektur di sini, jadi jika Anda belum familiar, Anda bisa melihat di [Wikipedia](https://en.wikipedia.org/wiki/Multitier_architecture) untuk memahami konteksnya.

**Lapisan-lapisan di GitClub:**

- **Lapisan Layanan (Service layer):**  
    Bertanggung jawab untuk menangani dan merutekan permintaan. Di GitClub, lapisan ini mencakup proxy jaringan dan router dalam aplikasi itu sendiri.
    
- **Lapisan Logika Bisnis (Business logic layer):**  
    Tempat menjalankan fungsi-fungsi inti aplikasi GitClub.
    
- **Lapisan Data (Data layer):**  
    Menyediakan akses ke data. Di GitClub, ini adalah basis data dan sistem berkas tempat penyimpanan data repository.
    
- **Lapisan Presentasi (Presentation layer):**  
    Apa yang ditampilkan kepada pengguna. Ini adalah antarmuka web GitClub yang akan Anda lihat ketika mengunjungi (hipotetis) [https://www.gitclub.dev](https://www.gitclub.dev/).
    

Untuk setiap lapisan aplikasi, terdapat level otorisasi yang berbeda. Level-level tersebut dibedakan berdasarkan data yang digunakan untuk membuat keputusan otorisasi.

![Alur data dari lapisan penegakan ke titik keputusan](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb7dabb5130d231e47b562_k3n18FhZddHnKIl5nWJ1B3SiLtQ1gWwIzpw2vWHlpyXr8g4PPARRhtdV_8SqdNk8cTOL86h4hn-X9slsZTxCpoaaX6OqtqzXW6jDQlgk8jh_dGK2mh-GMK8wK3JcGT6k70My4si_.avif)

**Level otorisasi:**

- **Lapisan Layanan:**  
    Pada lapisan ini, kita dapat membuat keputusan otorisasi berdasarkan isi permintaan. Karena konteks aplikasi masih terbatas, praktisnya hanya bisa menentukan apakah endpoint dapat diakses atau tidak. Ini disebut otorisasi **tingkat permintaan**.
    
- **Lapisan Logika Bisnis:**  
    Di lapisan ini, kita memiliki konteks penuh mengenai apa yang dilakukan pengguna dan resource apa yang diakses. Ini disebut otorisasi **tingkat resource**.
    
- **Lapisan Data:**  
    Saat melakukan otorisasi secara massal atas kumpulan data, ada baiknya untuk mendorongnya ke lapisan data. Caranya adalah dengan menerapkan otorisasi pada komunikasi dengan lapisan data. Ini disebut otorisasi **tingkat query**.
    
- **Lapisan Presentasi:**  
    Kita juga dapat menerapkan otorisasi di sisi klien, yaitu **otorisasi sisi klien**. Namun, berbeda dengan level lainnya, otorisasi di sini tidak dapat diandalkan untuk penegakan karena pengguna dapat mengakali klien dan mengakses backend secara langsung.
    

Di bagian selanjutnya, kita akan membahas setiap lapisan dan level secara rinci, termasuk langkah-langkah untuk menyusun query, mengirimkannya ke mekanisme keputusan, dan menangani responsnya.

---
## 2. Penegakan Otorisasi Berdasarkan Lapisan dan Level

Mari kita bahas setiap lapisan secara bergiliran dan lihat seperti apa penegakan otorisasi di masing-masing lapisan. Kita akan tinggalkan lapisan presentasi untuk bagian akhir karena sedikit berbeda dibandingkan lapisan-lapisan lainnya.

---

#### **Lapisan Layanan dan Otorisasi Tingkat Permintaan**

Pada lapisan layanan, kita berurusan dengan permintaan HTTP mentah. Di GitClub, salah satu tempat kita menangani permintaan HTTP adalah pada _middleware_ permintaan. Hampir setiap kerangka kerja web menyediakan semacam _middleware_ permintaan yang dapat Anda gunakan untuk menerapkan logika yang sama untuk setiap permintaan.

![Alur penegakan untuk permintaan HTTP](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb7db9edf92bf77208854f_Jcrx3xNVj3btFkPqyi3hYNnRZ25eE-l9OEkTYQ1EDrob7WN1g2P8VfCNyyz_U-U6F61XkbFh1VGKfjx5jZTPPQt5uEV4T2_TYUaemgGoeOxU7uPmlsPXxaw6Bd_IZCNfx0Bzbk_n.avif)

**Apa itu otorisasi tingkat permintaan?**

Otorisasi tingkat permintaan dilakukan pada lapisan layanan dengan menggunakan informasi yang tersedia dalam permintaan itu sendiri untuk membuat keputusan otorisasi. Pada tingkat ini, terdapat satu jenis query: “apakah actor diizinkan membuat permintaan ini ke layanan ini?”  
Dalam kasus permintaan HTTP, informasi yang digunakan untuk membuat keputusan otorisasi biasanya adalah path permintaan dan metode HTTP.

Seringkali, data pengguna juga tersedia. Misalnya, banyak aplikasi menangani sesi pengguna sebagai bagian dari _middleware_ atau menyertakan data tambahan tentang pengguna sebagai bagian dari kredensial autentikasi. Namun, biasanya Anda tidak perlu mengambil resource dari basis data pada lapisan layanan, karena hal tersebut akan menduplikasi pekerjaan yang akan dilakukan di lapisan bisnis.

Pembatasan ini mencegah kita menerapkan banyak model otorisasi karena model-model yang telah kita bahas di bab-bab sebelumnya bergantung pada data aplikasi untuk membuat keputusan.

Mari kita lihat beberapa contoh dan apa yang menjadi actor, action, dan resource pada masing-masing kasus.

**Contoh: Seorang pengguna yang tidak login mengunjungi halaman utama**

- **Actor:** Saat pengguna belum login, actor dianggap sebagai _guest_.
- **Action:** Melakukan permintaan GET ke `/home`.
- **Resource:** Aplikasi web GitClub.

Query otorisasi: Apakah tamu diizinkan melakukan permintaan GET ke route `/home` pada aplikasi web GitClub?

Untuk keputusannya, kita menerapkan aturan: “siapa pun boleh melakukan permintaan GET ke route yang diawali dengan `/home` pada aplikasi web.” Kita juga harus memastikan bahwa tamu dapat mengunjungi halaman login. Permintaan lain akan ditolak dan pengguna akan dialihkan ke halaman login.

**Contoh: GitClub CLI menggunakan API token untuk membuka pull request baru di repository Acme/Anvil**

- **Actor:** Saat menggunakan API token, identitas actor adalah pemegang token.
- **Action:** Melakukan permintaan POST ke `/org/acme/repo/anvil/pull_requests`.
- **Resource:** Layanan API GitClub.

Query otorisasi: Apakah API token tersebut diizinkan melakukan permintaan POST ke endpoint `/org/acme/repo/anvil/pull_requests` pada layanan API GitClub?

Dalam kasus ini, kita tidak dapat secara langsung menentukan apakah permintaan tersebut harus diizinkan, karena kita belum mengetahui apakah pengguna yang membuat token memiliki izin untuk membuka pull request di repository Acme/Anvil. Namun, kita dapat menggunakan informasi dalam permintaan untuk membuat keputusan awal. API token adalah token kriptografis yang menyertakan hak akses yang diberikan kepada pemegang token. Oleh karena itu, kita dapat memutuskan berdasarkan apakah token memiliki izin “repository:write”.

Karena logika yang sama diperlukan untuk setiap endpoint API, dengan menggunakan otorisasi tingkat permintaan pada lapisan layanan, kita dapat menangani hal ini di satu tempat saja.

Meski begitu, otorisasi yang ditangani di sini masih bersifat cukup kasar. Misalnya, aplikasi masih perlu memeriksa apakah pengguna yang membuat token benar-benar diizinkan membuka pull request di Acme/Anvil. Pengecekan ini harus dilakukan di tingkat resource pada lapisan bisnis. Keuntungannya adalah logika penanganan API token ditangani di lapisan layanan, sehingga informasi tersebut tidak perlu diteruskan ke lapisan bisnis.

**Di mana menerapkan otorisasi tingkat permintaan?**

Dalam aplikasi monolitik, _middleware_ permintaan adalah tempat terbaik untuk mengimplementasikan otorisasi tingkat permintaan. Pendekatan terbaik adalah menerapkan otorisasi untuk _setiap_ permintaan dan menggunakan mekanisme opt-out untuk route-route tertentu yang tidak memerlukan otorisasi.

Dalam arsitektur berbasis layanan, Anda juga dapat menambahkan pengecekan otorisasi tingkat permintaan sebagai bagian dari proxy jaringan, seperti API gateway, service mesh, atau load balancer. Proxy jaringan dapat menerapkan otorisasi tingkat permintaan dengan mendelegasikan keputusan otorisasi ke layanan pusat. Seperti yang kita lihat pada contoh sebelumnya, layanan tersebut biasanya perlu mengakses data pengguna.

**Apa yang harus dikembalikan?**

Untuk permintaan API, sebaiknya kembalikan pesan error HTTP 403 Forbidden beserta detail error dalam body respons.

---

#### **Lapisan Logika Bisnis dan Otorisasi Tingkat Resource**

Setelah permintaan berhasil dirutekan dengan benar, kita memasuki logika bisnis aplikasi. Inilah tempat “keajaiban” terjadi! Di sini, aplikasi mengambil data, melakukan operasi, memperbarui data lainnya, dan memicu pekerjaan latar belakang.

Pada lapisan logika bisnis, kode sering kali bekerja dengan objek, kelas, atau tipe data yang merepresentasikan konsep inti domain aplikasi. Di sinilah sebagian besar otorisasi biasanya terjadi, dalam bentuk otorisasi tingkat resource.

![Alur penegakan otorisasi pada logika bisnis](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb7dc99f0fbd888f11ad0f_c0bhUGr_CuluarO0stbOl_AvQIT17riz2mWVaJUemWXA3LHuXdgTrxuf0hqIEeTSzd-S7bG7tlIlbtynvEzK7ArStPjZZA8BNAn4e47eSDD1IkHetGhInw65dR__GpMg9ZH4iVC5.avif)

**Apa itu otorisasi tingkat resource?**

Sebuah “resource” merujuk pada setiap potongan data yang mungkin diakses atau diinteraksikan oleh pengguna dalam sebuah aplikasi. Organisasi, repository, isu, dan komentar adalah contoh resource di GitClub.

Otorisasi tingkat resource menggunakan data resource dan informasi terkait secara langsung ketika membuat keputusan. Contoh yang kita gunakan pada bab-bab sebelumnya adalah otorisasi tingkat resource. Misalnya, “apakah pengguna diizinkan membaca isu #1313 dari repository Acme/Anvil?” merupakan pengecekan tingkat resource.

**Apa yang harus ditegakkan?**

Bayangkan seorang teman bertanya: “Bolehkah aku masuk ke apartemenmu?” Anda mungkin akan kesulitan menjawab tanpa konteks tambahan, seperti “apa yang ingin kamu lakukan?” Mungkin mereka hanya ingin mengambil jaket yang tertinggal. Akan lebih mudah menjawab jika pertanyaannya adalah “bolehkah aku mengambil jaket saya di apartemenmu?”

Kita menghadapi masalah yang sama dengan otorisasi aplikasi. Misalnya, jika kita menangani permintaan pengguna untuk menutup isu #312 dari repository Acme/Anvil, query otorisasi paling spesifik yang bisa kita buat adalah: “apakah **pengguna** (actor) diizinkan untuk **menutup** (action) **isu #312 dari repository Acme/Anvil** (resource)?”  
Spesifikasi yang tinggi ini memberikan mekanisme keputusan dengan informasi sebanyak mungkin, sehingga mereka dapat menentukan jawaban terbaik.

Jika kita membuat query otorisasi lebih umum, misalnya “apakah **pengguna** diizinkan untuk **mengedit** repository Acme/Anvil?”, maka kita dapat dengan mudah membuat keputusan berdasarkan izin apa yang dimiliki pengguna untuk repository tersebut. Query yang sama bisa digunakan untuk setiap perubahan yang diminta pengguna pada repository.  
Namun, dengan cara tersebut, kita telah mengorbankan informasi penting yang diperlukan untuk membuat keputusan yang tepat. Misalnya, jika pengguna sebenarnya bukan anggota repository tetapi merupakan kolaborator eksternal yang membuka isu, seharusnya kita menggunakan otorisasi berbasis hubungan untuk menentukan bahwa pemilik isu dapat menutup isu, yang didukung oleh query otorisasi yang lebih spesifik.

Masalahnya adalah logika otorisasi mulai "bocor" ke dalam kode aplikasi. Kita secara implisit mengasumsikan bahwa pengguna dapat menutup isu jika mereka dapat mengedit repository yang dimiliki isu tersebut.

**Intinya, selalu buat query otorisasi sedetail mungkin.**  
Hal ini menjaga logika otorisasi tetap terpisah, mengurangi kompleksitas dalam menentukan apa yang harus ditegakkan, dan memungkinkan logika keputusan lebih fleksibel.

**Di mana menerapkan otorisasi tingkat resource?**

Tempat terbaik untuk menambahkan otorisasi tingkat resource adalah di dalam kode aplikasi, sedekat mungkin dengan tempat aksi yang dimaksud dilakukan.

Jika resource sudah tersedia, kita dapat langsung melakukan pengecekan otorisasi. Ini sering terjadi saat membuat resource baru.

Jika tidak, kita mungkin perlu mengambil resource terlebih dahulu, menerapkan pengecekan akses, lalu melakukan aksi yang diinginkan. Misalnya, saat membaca data, langkah pertama adalah mengambil resource dari basis data, kemudian memeriksa apakah pengguna diizinkan membaca resource tersebut. (Pada bagian selanjutnya, kita akan membahas pendekatan alternatif.)

**Apa yang harus dikembalikan?**

Strategi default saat terjadi kegagalan otorisasi adalah mengembalikan pesan error HTTP 403 Forbidden, beserta detail yang dapat membantu klien.

Namun, dalam beberapa kasus, mengembalikan pesan error dapat mengungkap informasi yang seharusnya tidak diketahui oleh pengguna. Sebagai contoh, jika seorang pengguna GitClub mengunjungi `/org/acme/repo/secret_project` – sebuah repository privat – maka pesan 403 Forbidden mungkin akan mengungkapkan bahwa repository tersebut ada.  
Oleh karena itu, praktik terbaik adalah mengembalikan pesan HTTP 404 Not Found ketika pengguna tidak diizinkan membaca resource, terlepas dari aksi yang diminta.

**Field-level access**

Sering kali kita ingin mengendalikan field apa saja dari sebuah resource yang dapat diakses oleh pengguna.

Misalnya, di GitClub, pengguna dapat melihat profil mereka sendiri dan melihat seluruh data tentang mereka. Namun, ketika melihat profil pengguna lain, mereka hanya dapat melihat sebagian data.

Hal ini dikenal sebagai **field-level access**. Ini merupakan level tambahan di luar otorisasi tingkat resource.

Ada dua cara untuk menangani penegakan field-level:

1. **Pendekatan Individual:** Buat aksi baru yang lebih spesifik untuk mewakili field yang diakses.
2. **Pendekatan Generik:** Jadikan field tersebut sebagai parameter tambahan pada query otorisasi.

Pendekatan individual tidak memerlukan pekerjaan tambahan di atas otorisasi tingkat resource, namun sedikit kurang fleksibel. Pendekatan kedua lebih powerful, tetapi memerlukan perubahan pada antarmuka otorisasi.  
Misalnya, di GitClub, pengguna diizinkan mengubah repository. Mereka dapat mengubah nama, menambahkan deskripsi, menetapkan tag, dan sebagainya melalui metode “update repository”. Kita menggunakan otorisasi tingkat resource untuk memeriksa apakah pengguna diizinkan memperbarui repository.  
Namun, sekarang kita ingin membatasi agar hanya admin organisasi yang diizinkan mengubah status privasi repository. Pendekatan saat ini tidak dapat menangani hal ini karena kita hanya memeriksa apakah pengguna diizinkan memperbarui repository.  
Pendekatan **individual** untuk penegakan field-level cocok untuk sejumlah kecil field, tetapi seiring waktu dapat menyebabkan logika otorisasi tersebar di dalam aplikasi.  
Pendekatan **generik** akan mengubah query untuk menyertakan field yang diminta. Sebagai contoh, daripada hanya mempertimbangkan aksi “update”, query akan menyertakan konteks lengkap field-field yang diupdate. Dengan cara ini, mekanisme keputusan akan menangani logika: jika permintaan update menyertakan atribut “private”, maka pengguna harus memiliki izin “change_visibility” pada repository tersebut.  
Kekurangannya adalah Anda perlu memperbarui antarmuka otorisasi untuk menangani parameter tambahan — field.  
Jika hanya ada beberapa field yang perlu diatur, pendekatan individual mungkin sudah cukup.

---

#### **Lapisan Data dan Otorisasi Tingkat Query**

Otorisasi tingkat resource memiliki satu kekurangan besar: Anda harus mengambil resource terlebih dahulu untuk melakukan pengecekan otorisasi.

Hal ini mungkin terdengar sepele karena kita biasanya memang ingin mengambil resource tersebut. Namun, jika Anda harus mengambil setiap resource secara individu untuk melakukan otorisasi, hal ini menjadi masalah ketika mengimplementasikan endpoint list yang mengambil banyak resource.

Di GitClub, kita menyediakan endpoint yang menampilkan semua repository yang dapat diakses oleh seorang pengguna. Melakukan ini dengan otorisasi tingkat resource berarti mengambil _setiap_ repository dari basis data dan meminta keputusan otorisasi untuk masing-masing.  
Sebagai gantinya, kita dapat mendorong otorisasi ke lapisan data dan menggunakan **otorisasi tingkat query**. Lapisan data biasanya merujuk ke basis data, meskipun juga dapat mencakup layanan lain.

![Alur penegakan untuk query basis data](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb7dde8be7289162fcaaa3_XJt2sVlB_XBhzAdsBq0GuJt2btwlJdUkH8u8UY_vArnPYt1-Jlt6UhNofMLuwXd4eDl3bfl4OFA6h725UFi-wOpwEo8g81RKpIs-wHZWHIaiV1reyj_tQOJytrfr_Zz8SgwR0IhL.avif)

**Apa itu otorisasi tingkat query?**

Otorisasi tingkat query adalah pendekatan untuk menerapkan otorisasi pada lapisan data dengan memodifikasi query akses data (misalnya, query SQL) untuk menyertakan parameter otorisasi.  
Pendekatan ini melibatkan antarmuka otorisasi yang berbeda dari yang telah kita lihat sejauh ini. Keputusan otorisasi bukan lagi berupa jawaban ya/tidak tunggal, melainkan keputusan harus dibuat untuk setiap resource dalam dataset dengan mengenkode keputusan tersebut sebagai filter pada query.

Sebagai contoh sederhana, kita tahu bahwa seorang pengguna dapat membaca repository yang mereka buat. Untuk merefleksikan logika ini, query untuk mengambil semua repository dapat menyertakan kondisi “where created_by = [ID pengguna saat ini]”. Dengan ini, basis data akan difilter sehingga hanya resource yang diizinkan yang dikembalikan.

**Keputusan dan Penegakan**

Anda dapat memandang query otorisasi tingkat query sebagai: “apakah actor diizinkan melakukan aksi terhadap semua resource yang dihasilkan oleh query ini?”  
Sebagai contoh, query akan menjadi: apakah pengguna diizinkan melakukan aksi “read” terhadap repository yang dihasilkan dari query tabel “repositories”?

Pada contoh penegakan sebelumnya, keputusan otorisasi adalah jawaban sederhana ya/tidak. Namun, untuk otorisasi tingkat query, keputusan harus mencakup semua kondisi yang harus diterapkan sebagai filter pada query.

Di GitClub, beberapa skenario di mana seseorang dapat membaca repository antara lain:

- Repository bersifat publik.
- Pengguna telah ditambahkan sebagai kolaborator pada repository.
- Pengguna memiliki peran dalam organisasi tempat repository berada.

Setiap kondisi ini perlu direpresentasikan sedemikian rupa sehingga mekanisme penegakan dapat menerjemahkannya menjadi filter query. Semakin fleksibel format kondisi tersebut, semakin extensible logika otorisasi. Namun, ini memerlukan implementasi mekanisme keputusan yang dapat mengembalikan kondisi-kondisi arbitrer. Di Oso, hal ini dimungkinkan dengan bahasa kebijakan Polar yang dapat mengembalikan seperangkat batasan sebagai output dari query otorisasi.

Anda dapat menghindari penggunaan bahasa kebijakan penuh dengan mengorbankan fleksibilitas dan menentukan sejumlah kondisi terbatas yang dapat dikembalikan oleh mekanisme keputusan. Misalnya, kondisi yang mungkin dikembalikan:

- "repository_is_public" – periksa apakah repository bersifat publik.
- "user_has_repository_role_contributor" – periksa apakah pengguna memiliki peran “contributor” pada repository.
- "user_has_organization_role_member" – periksa apakah pengguna memiliki peran “member” pada organisasi tempat repository berada.

Peran mekanisme penegakan adalah memproses kondisi-kondisi yang dikembalikan oleh mekanisme keputusan dan menerapkannya ke query. Anda dapat menganggap penegakan ini sebagai penegakan secara _proaktif_, dibandingkan dengan penegakan secara _retroaktif_ setelah data diambil.

Kami mengasumsikan bahwa lapisan data mendukung beberapa bentuk penyaringan, baik itu melalui basis data, mesin pencari, atau layanan eksternal lainnya. Untuk menerapkan otorisasi tingkat query, Anda harus dapat menerjemahkan setiap kondisi yang dikembalikan menjadi filter yang didukung oleh lapisan data tersebut.

Contoh, masing-masing kondisi sebelumnya dapat diimplementasikan sebagai filter SQL:

![Filter SQL yang mengimplementasikan penegakan](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb6950892b85b2672e39fc_Knsgk-ZJ29UYciyIbFFUW0NpxYtKxe8hf9Y-0wofeY8xvOp8cLG-kl6uaDISGUPJbp02pI0_ojtqIfGB0NJ6tmzYWiYh-sOhHqT-NVPPK1r7WK1yzJaknEA4iDe9znzCsQX9kzt2.avif)

**Di mana menerapkan?**

Otorisasi tingkat query harus diterapkan di lapisan akses data – bagian kode aplikasi yang bertanggung jawab untuk mengambil data dari basis data atau sumber lain.

Query otorisasi masih membutuhkan konteks yang sama seperti otorisasi tingkat resource, seperti pengguna saat ini dan aksi yang dilakukan. Konteks tersebut harus menjadi bagian dari antarmuka query.

**Apa yang dikembalikan?**

Karena otorisasi diterapkan dengan memfilter dataset, tidak ada perlunya penanganan khusus terhadap hasilnya. Bagi kode aplikasi, resource yang tidak diizinkan akan tampak seolah-olah tidak ada. Pendekatan ini ideal untuk aksi "read".

Namun, dalam beberapa kasus, lebih baik membedakan antara “tidak ada hasil” dan “tidak diizinkan”. Misalnya, jika pengguna GitClub mencoba menampilkan daftar tim untuk suatu organisasi, bisa jadi tidak ada hasil karena pengguna tidak tergabung dalam organisasi tersebut, atau karena semua tim bersifat privat. Untuk membedakan kedua kasus tersebut, Anda dapat menambahkan pengecekan tingkat resource tambahan: apakah pengguna diizinkan untuk “list teams” pada organisasi tersebut. Jika tidak, kembalikan error atau alihkan pengguna. Jika ya, lanjutkan dengan pengecekan tingkat query.

Otorisasi tingkat query juga dapat digunakan untuk menggantikan beberapa pengecekan tingkat resource. Misalnya, daripada mengambil repository dari basis data dan kemudian memeriksa apakah pengguna memiliki izin membaca, Anda bisa melakukan kedua langkah tersebut sekaligus menggunakan otorisasi tingkat query. Pendekatan ini bagus ketika Anda ingin menghindari mengungkapkan keberadaan resource, seperti yang telah kita bahas pada pengecekan tingkat resource.

---

#### **Lapisan Presentasi dan Otorisasi Sisi Klien**

Lapisan terakhir yang perlu dipertimbangkan untuk penegakan adalah lapisan presentasi. Lapisan presentasi merujuk pada antarmuka pengguna (UI) apa pun, apakah itu halaman web yang dirender di server, aplikasi halaman tunggal, aplikasi baris perintah, atau situs web. Pada semua kasus tersebut, kode penegakan berjalan di sisi klien yang tidak dapat dipercaya. Karena ini mudah untuk diakali, kita hanya dapat menggunakan **otorisasi sisi klien** sebagai cara untuk memberikan pengalaman pengguna yang lebih baik.

**Apa itu otorisasi sisi klien?**

Otorisasi sisi klien merujuk pada penggunaan keputusan otorisasi di dalam antarmuka pengguna untuk menginformasikan apa yang diharapkan dapat dilakukan pengguna. Hal ini memberikan pengalaman pengguna yang lebih baik — _tidak ada yang ingin mengklik tombol hanya untuk mendapatkan pesan error_.

![Contoh dialog "akses ditolak" tanpa konteks — pengalaman pengguna yang buruk](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb697fa193151c43ea3d33_ur-kWK-gujBk49pheg9GNoqNI77uUsqRnUlTHGGLzW0YfMOT1hjWus7C4WmVYlGAMv3f3gn5Vxat8HfNyM_JsDUPpZPU28x2RPv3ozpyXmIUJpexAoQNdSljP_ajqO2ZVZZCAZC4.avif)

Untuk menghindari hal tersebut, kita menggunakan otorisasi sisi klien untuk memprediksi apakah suatu permintaan akan diizinkan atau tidak. Jika permintaan tersebut akan ditolak, maka komponen antarmuka pengguna terkait bisa dinonaktifkan atau disembunyikan dari pengguna.

Lebih baik lagi, kita bisa menampilkan alasan mengapa suatu keputusan otorisasi dibuat kepada pengguna, sehingga mereka tahu dengan tepat mengapa mereka tidak dapat melakukan aksi tersebut.

![Contoh tampilan pengaturan repository GitHub yang menjelaskan mengapa seorang anggota organisasi tidak diizinkan menghapus atau mentransfer repository](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/60cb699cc95594cb529dc070_p5asP-tOvUdjVbtAMhcsGChkDcvPb6aMl76IbyoHkAmpGlqOrLmdXN4h3Qn_9RdNwlERyS3gBrr8Cq4JyoJa6Z0pv0Enig7Vm-je4NHEc9Jg6dG_IzMUbiGACDItbk3WI0huTA-6.avif)

**Apa yang harus ditegakkan?**

Salah satu tantangan utama dalam otorisasi sisi klien adalah bagaimana menjaga sinkronisasi dengan otorisasi yang diterapkan di backend.

Biasanya, Anda ingin menyembunyikan atau menampilkan komponen UI berdasarkan aksi apa yang diizinkan untuk dilakukan pengguna pada sebuah resource. Pola yang baik adalah meminta dari server informasi mengenai aksi apa saja yang diizinkan untuk pengguna saat ini. Dengan begitu, Anda tidak perlu menduplikasi logika otorisasi yang harus diimplementasikan oleh server, dan klien dapat menggunakan informasi tersebut sesuai kebutuhan.

Sebagai contoh, saat merender halaman "repository settings", kita dapat menghitung seluruh izin yang dimiliki pengguna saat ini untuk repository tersebut, misalnya “read”, “change_visibility”, dan “update”. Halaman web hanya perlu menerapkan logika sederhana: sembunyikan tombol delete jika izin “delete” tidak ada dalam daftar izin pengguna.

Namun, hal ini tetap menciptakan ketergantungan antara klien dan server: keduanya harus selalu sinkron mengenai aksi apa saja yang diperlukan untuk setiap endpoint pada server.

---

Itulah penjelasan mengenai penegakan otorisasi berdasarkan lapisan dan level. Setiap lapisan memiliki tantangan dan pendekatan tersendiri, mulai dari penegakan di lapisan layanan hingga ke otorisasi sisi klien.
## 3. Ringkasan: Kapan Menggunakan Setiap Level

Ketika kita membahas di mana sebaiknya otorisasi dilakukan di Bab II, kita menyimpulkan bahwa otorisasi harus dilakukan di lapisan logika bisnis dan lapisan akses data. Di kedua tempat tersebut, konteks yang tersedia paling lengkap untuk menangani skenario otorisasi umum, seperti “apakah pengguna ini diizinkan membaca repository ini?”

Kita kini telah membahas dengan lebih rinci **empat** lapisan berbeda dalam arsitektur aplikasi di mana kita dapat menerapkan otorisasi, serta level otorisasi yang dapat diterapkan. Ringkasannya adalah bahwa setiap level otorisasi memiliki tempatnya masing-masing:

- **Tingkat Permintaan (Request-level):**  
    Digunakan untuk mengekstrak langkah penegakan umum yang sama untuk seluruh permintaan. Level ini juga dapat digunakan sebagai lapisan tambahan (defense-in-depth) di atas otorisasi tingkat resource.
    
- **Tingkat Resource (Resource-level):**  
    Merupakan pilihan yang aman untuk sebagian besar skenario. Di level ini, seluruh konteks yang relevan tersedia untuk membuat keputusan otorisasi.
    
- **Tingkat Query (Query-level):**  
    Merupakan pendekatan yang kuat dan harus digunakan ketika Anda perlu menerapkan otorisasi tingkat resource ke seluruh dataset.
    
- **Sisi Klien (Client-side):**  
    Hanya merupakan lapisan tambahan di atas penegakan yang telah dilakukan di backend. Level ini sebaiknya digunakan di mana pun memungkinkan untuk membantu memberi sinyal kepada pengguna mengenai aksi apa yang dapat atau tidak dapat dilakukan.
    

Dengan kata lain, terdapat banyak tempat di mana otorisasi mungkin terjadi, dan hal ini bisa menjadi sulit untuk dilacak! Anda harus memastikan bahwa _setidaknya_ satu level otorisasi diterapkan sepanjang jalur permintaan.

Jika Anda ingin melihat contoh praktis, kami telah mendemonstrasikan penegakan otorisasi pada [tingkat resource](https://docs.osohq.com/guides/enforcement/resource.html), [tingkat field](https://docs.osohq.com/guides/enforcement/field.html), dan [tingkat permintaan](https://docs.osohq.com/guides/enforcement/request.html) menggunakan Oso.
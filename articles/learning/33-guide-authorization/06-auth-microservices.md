# Otorisasi dalam Microservices

Saat Anda berpindah dari monolit ke arsitektur berbasis layanan (service-oriented architecture), Anda perlu mendesain otorisasi Anda dengan tepat. Anda harus berbagi data otorisasi antar layanan, dan ada banyak cara untuk melakukannya. Setiap keputusan desain dan arsitektur memiliki trade-off yang perlu Anda pahami. Di panduan ini, kami akan menunjukkan setiap pilihan tersebut beserta trade-off-nya, serta menyediakan heuristik yang dapat membantu Anda membuat keputusan tentang arsitektur layanan Anda.

---

### 1. Bagaimana Microservices Membuat Otorisasi Menjadi Rumit

Pada bab-bab sebelumnya, kita telah membahas pembangunan otorisasi di dalam sebuah aplikasi di mana seluruh kode, logika, dan data hidup di dalam aplikasi yang sama.

Di sini, kita akan membahas tantangan membuat otorisasi bekerja di lingkungan terdistribusi di mana kode, logika, dan data mungkin berada di layanan yang berbeda. Pada bab ini:

- **Layanan** adalah sebuah komputer — atau terkadang sekelompok banyak komputer — yang diakses oleh pengguna atau layanan lain melalui jaringan.
- **Aplikasi** atau **API** yang terdiri dari banyak layanan kecil memiliki arsitektur "microservice".

Bab ini membahas otorisasi dalam arsitektur microservices.

Meskipun istilah "microservices" biasanya mengacu pada penerapan dengan banyak layanan terpisah, tantangan membangun di lingkungan terdistribusi tetap sama, entah Anda memiliki dua layanan atau dua ratus. Di sini, kami menggunakan istilah “microservices” untuk menggambarkan sebuah aplikasi yang terdiri dari dua layanan atau lebih.

Terdapat perbedaan antara membangun otorisasi yang bekerja secara internal _di antara_ aplikasi Anda dengan menggunakan protokol otorisasi terfederasi seperti OAuth untuk integrasi dengan layanan pihak ketiga secara aman. Bab ini membahas yang pertama — kami tidak akan membahas otorisasi dengan pihak ketiga.

Ada banyak alasan untuk mengadopsi arsitektur dengan banyak layanan. Misalnya, Anda mungkin ingin membangun produk baru yang mengharuskan Anda menggunakan _technology stack_ yang berbeda. Atau, Anda mungkin perlu memecah sebuah layanan monolitik menjadi layanan-layanan yang lebih kecil agar tim Anda dapat mengerjakan komponen-komponen secara terpisah.

Apapun alasannya, hasilnya adalah Anda akan memiliki sebuah aplikasi yang terdiri dari banyak basis kode yang berbeda, dan Anda perlu memastikan mereka menyajikan pengalaman otorisasi yang konsisten.

Persyaratan ini saling bertentangan! Pengembang menggunakan arsitektur microservices untuk memisahkan layanan sehingga tim dapat mengerjakannya secara terpisah, namun otorisasi mengikatnya bersama karena harus bekerja secara konsisten di setiap layanan.

![Contoh Diagram Microservices](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/62450049006c00875d5974da_emCdsbure5d5hFAeJxW-7z9CZdjAeNo3odDu5g8g7HmpYnGOXMZhkhMwvMKAWM9_wKSdLSHoPKxXalL6LH_3qDH0vkwaepFKIv7r-a01HunedoNRx0rh3tIgfQdIzwqDGnnDgdvk.avif)

Untuk melihat permasalahan ini secara nyata, pertimbangkan contoh RBAC (Role-Based Access Control). Dalam sebuah aplikasi dengan beberapa layanan, **Pengguna** tergabung dan memiliki salah satu dari beberapa peran di dalam sebuah **Organisasi**.

Minimal, setiap layanan harus sepakat mengenai peran-peran yang mungkin dimiliki seorang anggota di sebuah organisasi. Selain mengetahui peran-peran apa saja yang ada, setiap layanan juga harus mengetahui peran spesifik apa yang dimiliki oleh seorang pengguna.

Dalam monolit, Anda dapat melakukan query pada basis data lokal untuk mendapatkan peran pengguna. Dalam contoh kita, apa yang terjadi ketika Anda menulis kode untuk sebuah layanan yang tidak memiliki salinan basis data tersebut secara lokal? Apakah Anda mengirimkan seluruh data dalam sebuah token? Apakah layanan saling memanggil untuk mengambil data yang mereka butuhkan saat pengguna membuat permintaan, secara "just in time"? Setelah sebuah layanan memiliki input yang diperlukan untuk membuat keputusan otorisasi, bagaimana layanan tersebut menegakkan keputusan tersebut dan mengkomunikasikan hasilnya kepada pengguna?

Pertanyaan-pertanyaan ini semua adalah pertanyaan arsitektur yang signifikan, dan pendekatan terbaiknya tidak selalu jelas.

---

### 2. Contoh Kita: GitClub Jobs

Mari kita lihat trade-off yang berbeda ini dalam praktik. Kami sedang membangun layanan baru bernama **GitClub Jobs** untuk melengkapi produk GitClub yang sudah ada. Jika Anda baru saja tiba, GitClub adalah aplikasi hosting kode seperti GitHub atau GitLab. **GitClub Jobs** adalah cara bagi para pengembang untuk mendefinisikan dan mengotomatiskan tugas deployment dan kompilasi di dalam repository mereka. Pelanggan dapat menggunakan GitClub Jobs untuk menjalankan rangkaian pengujian (test suite) setiap kali ada commit baru atau mengotomatiskan pembuatan dan deployment layanan web mereka setiap kali merilis versi baru.

Kami mendesain layanan GitClub Jobs untuk pekerjaan yang sepenuhnya berbeda dari layanan web asli kami: menjalankan tugas komputasi arbitrer. Karena persyaratan yang berbeda, kami membangun GitClub Jobs sebagai layanan baru.

![Contoh GitClub Jobs](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6245031f2aca4618247b17d5_sn4e_b9wY6_ye7lQAenW__ZMUiOksfcTO2Dr8xFrEbW_ls2YOrs3nMQVv_k-D-wspkT2FwHl0xWR0N-MRx8wv3tBKPrqyRNoiz9tfowLdjVjgOVAjoxjRFcMYHeez0wlPf29qgeE.avif)

Objek data dalam layanan baru ini adalah **jobs** dan **runs**. **Jobs** merupakan definisi dari tugas otomatis yang harus dijalankan, dan **Runs** merepresentasikan eksekusi individual dari sebuah objek **Job**. Sebagai contoh, seorang pengguna yang ingin menjalankan unit test aplikasi akan mendefinisikan sebuah job “test” yang mencakup instruksi yang diperlukan. Setiap kali pengguna memulai rangkaian pengujian, kita membuat objek **Run**. Objek tersebut menyimpan status keberhasilan dan keluaran lain, seperti log atau artefak.

Pengguna berinteraksi dengan GitClub Jobs melalui halaman baru di `gitclub.dev/$ORGANIZATION/$REPOSITORY/jobs`. Halaman ini menampilkan gambaran umum tentang jobs yang ada untuk sebuah repository dan memungkinkan pengguna melakukan beberapa tugas manajemen dasar, seperti “cancel job” atau “restart job.”

GitClub Jobs mencakup dua kasus otorisasi yang akan Anda lihat di microservices: otorisasi bersama (shared authorization) dan otorisasi spesifik layanan (service-specific authorization). Model otorisasi GitClub Jobs memiliki objek yang sama dengan aplikasi web GitClub, seperti pengguna, organisasi, dan repository. Kita perlu berbagi konsep-konsep ini antar layanan kita. Model tersebut juga mendefinisikan objek-objek khusus layanan—jobs dan runs—yang tidak perlu dipertimbangkan oleh aplikasi web.

#### **Model Otorisasi GitClub Jobs**

![Model Otorisasi GitClub Jobs](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6245035464c36d8e386768bc_TNZjwldMLqct6a2tY0aTxI0seQlILG6xNYmhQPWHQwwhiOrMe6pvjrwZunQWGIjXAb_UNmkdjiEa_Wi_4i-f9NI74YTTAjkBJKfUjub6Aw1GH5oMeqc0PrA5zN2D8Gv81n7NVmlr.avif)

Jobs eksis dalam konteks repository individual — sebuah job tidak bisa ada tanpa sebuah repository. Hubungan ini memungkinkan kita memodelkan otorisasi untuk objek **Jobs** dengan menggunakan peran yang sama seperti yang digunakan untuk **Repositories**. Misalnya, seorang pengguna dengan peran “member” di sebuah **Repository** akan memiliki peran “member” yang sama di layanan jobs untuk seluruh objek **Jobs** terkait.

Pengguna memiliki hubungan dengan **Jobs** dan **Runs** melalui **Organizations** dan **Repositories**. Kita ingin menggunakan hubungan ini untuk menegakkan kebijakan berikut:

- Pengguna dengan peran “reader” pada sebuah repository dapat **melihat** semua runs dan jobs yang terkait dengan repository tersebut.
- Pengguna dengan peran “maintainer” pada sebuah repository dapat **membatalkan** (cancel) dan **mengulangi** (restart) setiap run dari jobs yang terkait dengan repository tersebut.
- Pengguna dapat **membatalkan** dan **mengulangi** runs untuk jobs yang mereka buat.

Untuk menampilkan halaman gambaran umum sebuah job, kita membutuhkan akses ke banyak titik data. Setidaknya, kita perlu mengetahui:

- Pengguna mana yang membuat job.
- Apakah pengguna memiliki peran di repository secara langsung, misalnya sebagai hasil undangan.
- Organisasi apa yang dimiliki repository tersebut, dan apakah pengguna memiliki peran di organisasi tersebut.

Data pertama tersebut tersedia di layanan jobs, namun bagaimana dengan data organisasi dan repository? Dalam monolit, seluruh data itu tersedia di satu tempat, tetapi sekarang data tersebut tersebar di antara dua layanan kita.

Untuk menegakkan kebijakan ini, kita harus menemukan cara agar kedua layanan dapat berbagi kebijakan dan data yang diperlukan untuk keputusan otorisasi.

---

### 3. Cara Berbagi Data Antar Layanan

#### Mendekentralisasi atau Mempusatkan Model Otorisasi Anda

Saat Anda memecah monolit menjadi beberapa layanan, Anda perlu menentukan apakah model otorisasi Anda harus dipusatkan atau dipisah ke masing-masing layanan. Keputusan ini akan memengaruhi cara Anda mengelola model otorisasi, serta proses rollout perubahan model tersebut ke seluruh layanan Anda.

Saat membuat keputusan ini, pertimbangkan juga kebutuhan tim Anda. Misalnya, apakah tim perlu dapat melakukan perubahan pada model otorisasi layanan mereka sendiri tanpa harus berkoordinasi dengan tim lain?

---

##### **Model Dekentralisasi**

Salah satu cara untuk mendekentralisasi model otorisasi Anda adalah dengan menduplikasi logika otorisasi di setiap layanan. Jika Anda hanya memiliki beberapa layanan, pendekatan ini bisa menjadi awal yang tepat. Dalam skenario ini, setiap layanan memiliki salinan lengkap model otorisasi. Model tersebut mencakup elemen-elemen umum di semua layanan (seperti hubungan antara pengguna dan organisasi) serta elemen khusus layanan (seperti aturan yang menentukan siapa yang dapat membatalkan job). Pendekatan ini memungkinkan setiap layanan mengubah model otorisasi tanpa perlu masukan dari tim lain.

![Contoh model dekentralisasi](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/62450415a8ab820a3a93a355_88g923yzU-HulX_3zzqy4z_-JIIxTYsrx8knL6AXFPBEqwOwnWznTdtGl8gqZuMB3_W4DKBWINQcebkmXnDclwnMHd7N6Pb_b48Vls_U-ekxnBI-IH8cJqvPUliGGwagc9WNaFG3.avif)

Seiring dengan pertumbuhan kebijakan Anda, Anda akan perlu mengelola banyak salinan logika otorisasi yang sama di seluruh layanan. Penting untuk memastikan bahwa setiap salinan tersebut selalu diperbarui, sehingga setiap perubahan harus dirollout ke masing-masing layanan.

Jika seluruh basis kode layanan Anda menggunakan bahasa pemrograman yang sama, Anda bisa memisahkan logika otorisasi ke dalam sebuah pustaka (library) bersama. Setiap layanan kemudian bergantung pada pustaka bersama tersebut. Penggunaan kode bersama ini menghilangkan risiko sebuah layanan memiliki kesalahan pada kebijakannya sendiri. Meskipun pendekatan ini mengatasi risiko implementasi yang mulai menyimpang seiring waktu, Anda tetap perlu mengoordinasikan pembaruan di seluruh layanan.

---

##### **Model Pusat (Centralizing Models)**

Sistem terdistribusi tidak selalu konsisten atau tersedia. Jika Anda mendistribusikan ke banyak layanan, hal ini dapat membuat pembaruan kebijakan di seluruh layanan rentan terhadap kesalahan. Pada titik ini, masuk akal untuk memusatkan definisi dan pengelolaan kebijakan otorisasi Anda.

![Contoh model sentralisasi](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/6245042fdfdab82c0faab3eb_ugE7LjSXS8Q-Cn5_2SDok8drsST-BZ0dsjWCXlzC7wOv6oB7WoCYlLZgiS1ZMu8J2VhFtfl0BraYamGs0DIx_zGg32sZpizyvPMfi98sRQ3rg_DduDAwmAoePDzGQZDLTSHugDZX.avif)

Model pusat memiliki trade-off. Dalam arsitektur yang sepenuhnya terdesentralisasi, setiap layanan bebas untuk memperkenalkan dan menguji perubahan pada kebijakan secara terpisah. Di dunia yang dipusatkan, Anda harus mengdeploy perubahan ke semua layanan sekaligus. Sulit untuk memprediksi kasus edge di setiap layanan sebelumnya. Penting untuk mempertimbangkan cara-cara menguji perilaku kebijakan sebelum melakukan deploy, seperti menggunakan data mock dan test fixture.

Salah satu opsi adalah membuat layanan khusus untuk menangani keputusan otorisasi untuk aplikasi Anda. Layanan Anda kemudian memanggil API pusat ini setiap kali ada pertanyaan otorisasi. Dengan mengekspos kebijakan otorisasi melalui jaringan, layanan aplikasi Anda dapat mendelegasikan pekerjaan tersebut ke satu tempat yang juga menyediakan pengelolaan kebijakan otorisasi secara sentral. Selain itu, layanan pusat memungkinkan Anda memperbarui kebijakan untuk seluruh klien sekaligus, sehingga tidak perlu mengoordinasikan perubahan ke masing-masing layanan.

---

#### Mempusatkan Data

Kebijakan hanyalah setengah dari persamaan otorisasi. Untuk menegakkan kebijakan tersebut, Anda juga memerlukan akses ke data yang relevan.

Pertanyaan kapan harus memusatkan kebijakan Anda lebih mudah dijawab dibandingkan dengan kapan harus memusatkan data. Hal ini karena ukuran dataset — kebijakan biasanya hanya beberapa ratus baris teks, sementara basis data bisa sangat besar — dan frekuensi pembaruan data yang jauh lebih tinggi.

Anda mungkin akan memperbarui kebijakan Anda secara jarang. Sebaliknya, pengguna dan layanan terus-menerus mengubah data aplikasi Anda. Selain itu, kebijakan Anda mungkin memerlukan akses ke banyak titik data yang berbeda untuk membuat keputusan otorisasi.

Untuk mendemonstrasikan, kita kembali ke contoh GitClub Jobs. Kita ingin menegakkan aturan berikut:

- Pengguna dengan peran “member” pada sebuah repository dapat melihat semua job untuk repository tersebut.
- Pengguna dengan peran “admin” pada sebuah repository dapat membatalkan (cancel) job apa pun untuk repository tersebut.
- Pengguna dapat membatalkan job yang mereka buat.

Untuk menegakkan kebijakan ini, kita memerlukan akses ke data tentang pengguna, job, dan organisasi serta repository tempat mereka masing-masing berada. Itu banyak input yang berbeda! Data pengguna dapat disediakan dalam bentuk JSON Web Token, sedangkan data job tersedia secara lokal di layanan. Namun, bagaimana dengan data organisasi dan repository?

Dalam monolit, Anda dapat yakin bahwa semua data tersebut tersedia di satu tempat. Sayangnya, tidak ada jaminan seperti itu di dunia microservices. Skenario seperti ini umum terjadi ketika Anda memecah aplikasi yang sudah ada menjadi layanan-layanan yang berbeda, dan hal ini menyoroti tantangan mendasar dalam menyelesaikan otorisasi di aplikasi terdistribusi.

Ketika Anda menghadapi situasi ini, Anda memiliki dua opsi:

1. Gunakan teknologi yang sudah ada untuk mendistribusikan data di dalam infrastruktur Anda.
2. Perkenalkan layanan otorisasi terpusat untuk mengumpulkan data di satu lokasi.

---

#### Mendistribusikan Data dengan Infrastruktur yang Ada

Aturan emas kita adalah: bangunlah otorisasi di sekitar aplikasi Anda, bukan sebaliknya. Aturan ini berlaku baik untuk monolit maupun arsitektur microservices. Oleh karena itu, pertimbangkan infrastruktur atau opsi lain yang mungkin sudah tersedia untuk membagikan data antar microservices Anda.

Masalah ini tidak unik untuk otorisasi — masalah berbagi data dengan semua layanan muncul kapan pun diperlukan. Karena itu, mungkin saja Anda sudah memiliki infrastruktur yang dapat digunakan kembali untuk mendistribusikan data otorisasi Anda.

Berikut beberapa opsi:

---

##### **Komunikasi Antar-Layanan (Service-to-service communication)**

Salah satu opsi adalah membuat layanan Anda bertindak seperti klien dan memanggil API layanan lain untuk mengambil data yang diperlukan secara just-in-time. Dengan cara ini, data yang digunakan untuk keputusan otorisasi akan selalu segar dan dapat diandalkan.

![Contoh komunikasi antar layanan](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/624504b19a4c8a0f144e8064_PBQjvYOcXhtRUxP5DvJmkjvZHHS7oovzYmEZdawg-O8QqVFZEhP_5ZvQSDJkghyCoaIewDRVMcWpg7HAbROU6YG4Vblldv4d_Otb20uHVJ5V0EMYkTMNwzlUUex1ctSdFtlJRAGv.avif)

Pendekatan naif ini bisa bekerja jika persyaratan performa rendah, namun dengan cepat akan menghasilkan performa yang buruk di bawah beban tinggi. Setiap permintaan yang memerlukan data dari banyak layanan akan menjadi lambat — satu permintaan klien dapat memicu beberapa permintaan lain, secara efektif menggandakan beban permintaan Anda.

Jika Anda memiliki metode yang sangat performa untuk mengambil data antar layanan — misalnya, menggunakan gRPC untuk komunikasi antar layanan — silakan gunakan itu!

---

##### **Authorization Tokens**

Jika, seperti banyak di antara kita, organisasi Anda belum memiliki solusi basis data terdistribusi yang performa tinggi dan andal, ada opsi lain.

Jika hanya terdapat sedikit data yang perlu tersedia untuk setiap layanan guna otorisasi, Anda dapat mendesentralisasikannya dengan menyertakan seluruh data dalam setiap permintaan. Salah satu cara melakukannya adalah dengan menggunakan token otorisasi, seperti JSON Web Tokens (JWT), untuk menyebarkan data antar layanan secara aman.

![Contoh Authorization Token](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/624504b12eb71a50e66930c5_SSpWj0Z6XUIOShEMzaSo2X6YE-kOvU2hApLaEct71SghDG1qtZCkITs6oJUOAzd9Ty5qDrxES6g8jGkecKzcQbfop_lg7H_XsrmwwAMjREeOISbH02wsR_Ul4ORhlrzhqVYzgeGZ.avif)

Token otorisasi mengandalkan tanda tangan kriptografi untuk melindungi integritas isinya dari manipulasi. Tanda tangan kriptografi mencegah penyerang mengambil token milik satu pengguna dan mengubahnya untuk mewakili pengguna lain. Banyak aplikasi membatasi ruang lingkup token otorisasi hanya untuk menyerialisasikan identitas pengguna. Namun, hal itu tidak selalu diperlukan — Anda dapat menyertakan data RBAC lainnya agar dapat digunakan oleh layanan Anda.

Dalam contoh GitClub, Anda dapat menyerialisasikan seluruh peran organisasi yang dimiliki seorang pengguna ke dalam JWT bersama identitas pengguna. Pendekatan ini akan bekerja dengan baik untuk peran organisasi karena biasanya pengguna tidak memiliki banyak peran seperti itu. Namun, strategi ini tidak berguna untuk mengenkode peran repository karena ruang dalam JWT akan terbatas. Selain itu, jika Anda mengirimkan JWT melalui header HTTP, Anda akan menemui batasan ukuran header.

Satu kekhawatiran lain adalah data yang terkandung dalam token otorisasi dapat dengan cepat menjadi usang. Misalnya, dalam aplikasi di mana pengguna hanya mendapatkan token otorisasi baru secara jarang (misalnya, saat login), perubahan (seperti undangan ke repository baru) tidak akan segera terlihat. Sebaliknya, pengguna harus menyegarkan token otorisasi mereka agar perubahan tersebut muncul.

---

##### **Basis Data Bersama (Shared Databases)**

Jika Anda memiliki lebih banyak data otorisasi daripada yang dapat dimasukkan ke dalam satu token, di mana sebaiknya data itu disimpan? Salah satu opsi adalah menggunakan basis data khusus yang digunakan bersama untuk data otorisasi.

Perusahaan biasanya mendesain microservices mereka agar memiliki penyimpanan data independen untuk memastikan keandalan atau isolasi keamanan. Itu adalah hal yang tepat jika layanan Anda tidak memiliki ketergantungan yang erat satu sama lain.

Namun, ketika mengimplementasikan otorisasi, Anda ingin data tersebut dapat dibagikan ke seluruh layanan Anda. Basis data bersama adalah solusi yang baik dalam situasi ini. Basis data menangani penyimpanan data dan membuatnya dapat diakses oleh banyak pembaca dengan performa tinggi. Jika tidak semua layanan perlu memanipulasi data otorisasi, Anda bahkan dapat menggunakan read replica untuk membagikan data antar layanan tanpa mengandalkan satu host pusat sebagai titik kegagalan.

![Diagram Basis Data Bersama](https://cdn.prod.website-files.com/5f1483105c9a72fd0a3b662a/624504b1f60b3a3890b90901_zQdwpNTqSoFamppK3qWQf_CPHkmetA_MFkshYNwjFS8flkBq8_mB5ZmnmVykJ03Y60TmgJfmiYMDi2GHjKsCuCt47hgPPYKzNBr4dIPcE7jiCGxIWmQQukkHZpKhDGxPb5qx37I8.avif)

---

##### **Event Sourcing dan Replikasi Data Selektif**

Jika Anda menjalankan banyak layanan, tidak selalu masuk akal untuk mereplikasi seluruh dataset otorisasi Anda ke setiap layanan. Setiap layanan kemungkinan hanya menggunakan sebagian kecil dari dataset tersebut, sehingga replikasi secara keseluruhan menjadi tidak efisien.

Dalam kasus ini, Anda dapat mengimplementasikan mekanisme event sourcing menggunakan platform seperti Kafka. Anda dapat menerbitkan perubahan pada resource ke dalam aliran event terdistribusi dan mengonsumsinya di layanan lain. Platform streaming event seperti Kafka umumnya memungkinkan konsumen untuk berlangganan hanya pada bagian tertentu dari aliran. Dengan begitu, layanan hanya akan berlangganan pada perubahan yang relevan dengan model otorisasi mereka dan dapat mempertahankan salinan data lokal secara independen.

Menggunakan aliran event pada dasarnya sama dengan replikasi basis data, kecuali bahwa Anda menggunakan aplikasi Anda untuk menerapkan penyaringan demi performa atau alasan lainnya. Hasil akhirnya sama — sebuah sumber data lokal yang dapat diquery layanan Anda untuk mendapatkan hasil otorisasi dengan cepat.

---

#### Authorization-as-a-Service

Jika Anda tidak memiliki mekanisme transfer data yang memadai, jangan membangun satu mekanisme khusus hanya untuk otorisasi.

Jika tidak ada opsi di atas yang cocok untuk tim Anda, opsi terbaik berikutnya adalah membangun layanan otorisasi terpusat. Memusatkan otorisasi juga masuk akal jika Anda berencana meningkatkan jumlah layanan di masa depan, karena setiap layanan baru hanya memerlukan biaya marginal kecil untuk mendukungnya.

Perbedaan utama antara pendekatan ini dengan menggunakan basis data bersama adalah bahwa Anda akan memusatkan kebijakan dan pengambilan keputusan dalam layanan baru ini, selain memusatkan data Anda.

Tantangan terbesar dalam mengembangkan layanan otorisasi terpusat adalah masalah data. Secara khusus, Anda harus memastikan data tersebut direplikasi secara andal atau dipusatkan dengan baik. Arsitektur Anda akan bergantung pada apakah Anda mendefinisikan layanan baru ini sebagai sumber kebenaran utama untuk seluruh isinya atau jika layanan tersebut menyimpan salinan data dari sumber lain.

---

##### **Menyimpan Data ke dalam Layanan**

Dalam sistem terdistribusi, setiap layanan memiliki tanggung jawab dan ketergantungan masing-masing. Dalam contoh GitClub, layanan web bertanggung jawab mengelola pengguna, organisasi, repository, dan hubungan antar mereka. Layanan jobs menangani pembuatan, orkestrasi, dan eksekusi jobs dari repository. Sistem terdistribusi Anda juga akan memiliki hubungan khusus yang dimiliki oleh masing-masing layanan.

Agar otorisasi terpusat dapat bekerja, Anda harus mengirimkan salinan informasi tersebut dari semua layanan aplikasi Anda ke layanan otorisasi. Karena microservices biasanya memiliki datastore independen, Anda harus mengatur mekanisme replikasi untuk setiap datastore yang mengandung data yang relevan dengan kebijakan otorisasi Anda.

Ada banyak opsi untuk mekanisme replikasi data. Salah satunya adalah dengan mengekspos API di layanan otorisasi Anda, lalu memanggil API tersebut dari dalam kode model di layanan Anda setiap kali terjadi perubahan resource. Kunci agar mekanisme ini bekerja adalah memastikan bahwa semua kasus error ditangani dengan benar — misalnya, jika panggilan HTTP ke layanan otorisasi gagal, maka pembaruan lokal juga harus gagal, dan sebaliknya.

Banyak teknologi basis data menyediakan _operation log_ yang menyerialisasikan setiap operasi pembuatan dan pembaruan record secara berurutan. Anda dapat mengonsumsi log operasi ini untuk memantau perubahan pada tipe resource yang penting, kemudian meneruskan perubahan tersebut ke layanan otorisasi. Gunakan pola ini di situasi di mana replikasi secara real-time sangat penting, misalnya, untuk mengisi indeks pencarian berdasarkan isi basis data relasional.

Kasus terburuk adalah ketidaksesuaian antara isi data lokal dan data di layanan otorisasi. Jika sebuah resource ada secara lokal tetapi tidak ada di layanan otorisasi terpusat, maka pengguna tidak akan memiliki izin yang benar untuk resource tersebut.

Seiring bertambahnya layanan, jumlah koneksi antar layanan juga akan meningkat. Mereplikasi data dan memastikan bahwa salinan lokal dan remote selalu sinkron dapat menjadi tidak andal. Anda dapat menghindari masalah ini sepenuhnya dengan mengandalkan layanan otorisasi terpusat sebagai sumber kebenaran utama untuk data tersebut.

Sayangnya, pendekatan ini dapat memerlukan reorganisasi besar pada layanan aplikasi Anda. Di mana sebelumnya aplikasi dapat mengandalkan basis data lokal untuk memfilter dan mengambil resource, sekarang mereka harus memanggil layanan otorisasi terpusat Anda. Pendekatan ini praktis, tetapi melanggar isolasi ketat antara microservices.

---

##### **Berapa Banyak Data yang Harus Disimpan?**

Memilih bagian dari model mana yang harus dipindahkan ke datastore terpusat bergantung pada kebijakan Anda. Hampir setiap atribut bisa dianggap sebagai data otorisasi.

Dalam contoh GitClub Jobs, masuk akal untuk memusatkan penyimpanan data peran dan hubungan untuk organisasi dan repository. Layanan web dan jobs akan sama-sama menggunakan data tersebut.

Namun, bagaimana dengan atribut khusus layanan lainnya? Misalnya, kita mungkin menggunakan properti _author_ dari objek _Job_ untuk menerapkan aturan, seperti contoh sebelumnya di mana pengguna dapat membatalkan jobs yang mereka buat. Jika layanan jobs adalah satu-satunya layanan yang menggunakan hubungan ini untuk aturan otorisasinya, tampaknya mereplikasi data tersebut ke layanan terpusat terasa boros. Namun, itu tidak masalah! Data tersebut penting, dan biasanya ukurannya tidak menjadi bottleneck. Jika Anda ingin layanan otorisasi terpusat mengembalikan hasil otorisasi (ya/tidak), maka layanan tersebut harus memiliki akses ke seluruh data yang terlibat dalam keputusan tersebut. Bersikaplah dermawan saat mereplikasi data ke layanan otorisasi terpusat Anda. Dengan begitu, Anda dapat menulis kebijakan yang lebih komprehensif.

Melakukan hal ini juga memudahkan perluasan model di masa depan. Misalnya, bayangkan di masa depan Anda ingin membuat layanan baru bernama GitClub Artifacts yang mendistribusikan file hasil dari sebuah Job kepada pengguna. Anda dapat menggunakan hubungan _Job_ baik dengan output Artifacts maupun dengan pengguna yang membuatnya untuk menerapkan kontrol akses yang sangat ketat.

---

#### **Pre-built Options**

Membangun layanan otorisasi terpusat adalah usaha besar. Perusahaan yang membangun layanan otorisasi sendiri — seperti Google, Slack, dan Airbnb — menemukan bahwa upaya ini memerlukan lebih dari satu tahun kerja oleh tim khusus.

Anda juga dapat menggunakan layanan otorisasi terpusat dari pihak ketiga. Opsi-opsi yang tersedia antara lain [Oso Cloud](https://www.osohq.com/docs), Ory Keto (solusi berbasis Google Zanzibar), dan Aserto (solusi berbasis Open Policy Agent). Kami telah menulis lebih detail tentang layanan-layanan ini dan lainnya dalam [panduan otorisasi sebagai layanan](https://www.osohq.com/cloud/authorization-service).

---

### 4. Ringkasan: Aturan Umum untuk Otorisasi pada Microservices

Apakah Anda baru mulai memecah monolit atau sudah sangat maju dalam perjalanan microservices Anda, Anda akan membutuhkan model otorisasi yang konsisten untuk memberikan pengalaman yang mulus kepada pengguna.

Hal terpenting adalah izin harus transparan bagi pengguna Anda. Pengguna tidak boleh bisa membedakan apakah mereka berinteraksi dengan monolit atau dengan kumpulan microservices yang berbeda. Untuk itu, pada akhirnya layanan Anda harus sepakat mengenai otorisasi.

Apapun rencana Anda, bangunlah otorisasi di sekitar aplikasi Anda, bukan sebaliknya. Artinya, jika Anda memiliki sedikit data peran untuk setiap pengguna, Anda mungkin cukup menyimpannya dalam sebuah JWT dan mengirimkannya ke setiap layanan. Jika Anda sudah memiliki komunikasi antar-layanan yang efektif di lingkungan terdistribusi Anda, Anda dapat menggunakan komunikasi tersebut untuk mengambil data otorisasi yang diperlukan langsung dari sumbernya. Jika Anda perlu menerapkan otorisasi yang lebih granular daripada yang bisa dicapai dengan JWT, pertimbangkan untuk memusatkan otorisasi dalam satu layanan.

Jika Anda memiliki banyak data otorisasi dan tidak ada infrastruktur yang tersedia untuk tugas tersebut, Anda harus membangun layanan otorisasi terpusat untuk menyimpan data tersebut. Tantangan terbesar dalam mengoperasikan layanan seperti itu adalah memastikan bahwa data yang dimilikinya selalu mencerminkan keadaan dunia yang up-to-date dan konsisten.

Jika Anda memilih untuk membangun layanan otorisasi terpusat, prioritas utama Anda adalah menjaga agar data tersebut sinkron dengan semua perubahan yang terjadi di layanan Anda. Untuk setiap resource baru yang dibuat oleh pengguna dan untuk setiap peran yang Anda tetapkan kepada pengguna, Anda harus memastikan bahwa perubahan tersebut direplikasi ke datastore otorisasi terpusat Anda. Jika tidak, hasil otorisasi bisa salah (false-negative) dan menghasilkan pengalaman yang menyebalkan bagi pengguna.
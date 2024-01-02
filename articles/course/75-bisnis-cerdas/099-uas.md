# UAS Bisnis Cerdas Genap 2023

:::info
Membuat alur pusat panggilan untuk analisis instan.
:::

Ambil file-file yang tersedia pada Kulino UAS.

File-file di sini berisi informasi dari pusat panggilan untuk perusahaan yang menjual laptop dan desktop PC.

Terdapat file-file data untuk bulan Januari 2021 yang mencakup informasi panggilan, data kasus dari sistem CRM, dan ekstrak dari survei Kepuasan Pelanggan (CSAT).

Survei CSAT adalah survei opsional yang dikirim kepada pelanggan setelah panggilan dan meminta mereka untuk menilai kepuasan mereka dengan interaksi tersebut dalam skala 1 hingga 10, di mana 1 adalah sangat tidak puas dan 10 adalah sangat puas.

Mari kita asumsikan bahwa baru-baru ini, Skor Kepuasan Pelanggan, juga dikenal sebagai Skor
CSAT, mengalami penurunan dan Pimpinan telah meminta kita untuk menyelidiki penyebabnya.

Dengan menggunakan Tableau Prep, selidikilah data yang tersedia untuk mengidentifikasi beberapa petunjuk tentang faktor apa yang mungkin mempengaruhi penurunan CSAT.

## Panduan Pengiriman Jawaban

Upload rekaman youtube anda dengan menceritakan:

1. Masalah yang dihadapi Call center tersebut (25)
2. Praktek mengolah data dari awal hingga selesai (60)
3. Ceritakan kesimpulan dari temuan tableau prep tersebut (15)

Tulis link youtube anda ke docx dengan status rekaman public lalu dikirim ke kulino sebelum batas waktu yang ditentukan.

## Tutorial

Mari kita mulai melihat data kepuasan pelanggan. Buka instance Tableau Prep baru dan connect ke `csat_data.csv`. Kemudian, lakukan langkah-langkah berikut:

1. Mulailah dengan mengoreksi tipe data. Ubah **survey_id** menjadi **String** dan ubah juga **call_id** menjadi **String**
2. Selanjutnya, klik ikon `+` dan tambahkan **Clean Step** ke flow Anda. Amati profil data dan Anda akan melihatnya distribusi score survei condong ke ujung bawah, seperti yang ditunjukkan berikut ini tangkapan layar. Hal ini wajar karena kita sedang menyelidiki alasan di balik score survei bisnis yang rendah.
3. Sekarang mari kita dapatkan score rata-rata dengan menambahkan **Aggregate Step**. Dalam konfigurasi step, seret dan lepas file **score** field ke bagian **Aggregated Fields**, dan klik **SUM**, diikuti dengan **Average**, untuk mendapatkan rata-rata score di semua survei. Di sini, kita dapat melihat bahwa score rata-rata kita adalah 4.05.
4. Sekarang setelah kita mengetahui score rata-rata, mari persempit dataset kita menjadi survei di mana score pelanggan antara 1 dan 4. Untuk melakukan ini, pilih **Clean Step**, pilih nilai score 1, 2, 3, dan 4 (gunakan Command atau CTRL tombol untuk multi-select), lalu klik-kanan dan pilih **Keep Only**. Ini akan memfilter data survei kami hanya untuk score 1-4.
5. Mari kita lihat apa yang bisa kita temukan dari data panggilan untuk survei ini. Tambahkan data connection lain, kali ini ke file **call_data.csv**. Kumpulan data ini berisi informasi tentang tanggal panggilan dilakukan, berapa lama pelanggan harus menunggu sebelum terhubung ke agen layanan pelanggan (**wait_time_seconds** field), durasi percakapan dengan agen (**call_time_seconds**), dan waktu agen dihabiskan memperbarui sistem manajemen kasus setelah panggilan berakhir (**after_call_seconds**). Sebelum Anda melanjutkan, perbaiki tipe data **call_id** field ke **String**.
6. Mari gabungkan (join) data ini dengan data survei kita. Untuk melakukannya, seret langkah **call_data** di atas **Clean Step** dan pilih **Join** untuk langsung menambahkan **Join Step**. Perhatikan bagaimana Tableau Prep dengan mulus mencabangkan flow kita (cabang asli yang diakhiri dengan Aggregate). Karena dua kumpulan data kita berisi nama field yang sama, **call_id**, Tableau Prep secara otomatis mengonfigurasi **Join Clauses** untuk menggunakan field tersebut, yang sesuai. kita dapat membiarkan **Join Type** default disetel ke **Inner**, yang memastikan bahwa hanya panggilan yang cocok dengan data survei yang difilter kita yang masuk:
7. Agar kumpulan data Anda tetap ramping, tambahkan **Clean Step** baru setelah **Join** dan hapus field duplikat, **call_id-1**.
8. Mari kita lihat waktu panggilan rata-rata selanjutnya. Tambahkan **Aggregate step** baru setelah **Join** dan seret kolom **wait_time_seconds**, **call_time_seconds**, dan **after_call_seconds** ke bagian **Aggregated Fields** dan ubah aggregate untuk semua fields dari **SUM** menjadi **Average**. Untuk melihat hasilnya dengan mudah, tambahkan **Clean Step** setelah **Aggregate**. Kami perlu membandingkan informasi ini dengan panggilan dengan skor survei yang lebih tinggi, yaitu panggilan dengan skor antara 5 dan 10. Kami akan melanjutkannya di langkah berikutnya.
9. Lanjutkan dan, sekali lagi, gabungkan **call_data** field dengan **Clean Step** pertama, yang menghasilkan cabang ketiga dalam alur kita. Kali ini, kami hanya tertarik pada panggilan di mana pengguna tidak memiliki skor survei sama sekali (yang dimungkinkan, karena survei bersifat opsional), atau skor lebih tinggi dari 4. Untuk melakukan ini, konfigurasikan **Join Type** ke **rightOnly/Right unmatched only** Hanya menggunakan Venn ilustrasi diagram. Ini akan menghasilkan kembalian semua data dari sisi kanan, yaitu data panggilan yang tidak cocok dengan data apa pun pada Clean Step yang difilter (yang difilter untuk hasil dengan skor 1-4 saja).
10. Agar data kita tetap rapi, tambahkan **Clean Step** dan hapus **call_id** field yang duplikat, pertahankan **call_id-1**.  
    :::info
    _CATATAN PENTING_  
    Dalam latihan ini, kita menggunakan fungsi Clean step untuk menghapus field dari kumpulan data yang telah menjadi redundan mengikuti Join Step. Perlu diperhatikan bahwa tindakan yang sama, menghapus field, dapat dilakukan dalam Joint Step itu sendiri, bahkan jika field tersebut adalah bagian dari Join Clause. Ini adalah preferensi pribadi yang terkait dengan bagaimana Anda ingin mengatur flow Anda secara visual.
    :::
11. Sekarang cabang ketiga kita yang baru hanya berisi data survei positif (dengan asumsi positif tidak ada skor, atau skor antara 5-10), mari kita lakukan analisis aggregate yang sama seperti yang kita lakukan sebelumnya, yaitu menambahkan **Aggregate Step** baru setelah **Join** dan seret field **wait_time_seconds**, **call_time_seconds**, dan **after_call_seconds** ke bagian **Aggregated Fields**, lalu ubah aggregate untuk semua field dari **SUM** menjadi **Average**.
12. Untuk membandingkan hasil ini dengan mudah dengan hasil aggregate kami sebelumnya untuk data panggilan survei negatif, seret step bertanda **AGGREGATE 3** di atas **Aggregate 2** dan pilih **Union** untuk menambahkan **Union step**. Pada langkah Union, klik dua kali nilai **csat_data.csv**, **call_data.csv** di names field tabel dan ganti namanya menjadi **Regular/Positive Survey Score**. Kemudian, ganti nama nilai **call_data.csv-1**, **csat_data.csv-1** menjadi **Negative Survey Score**.  
    Dalam tampilan **Union Results**, sekarang kita dapat dengan mudah membandingkan data panggilan. Sementara nilai **wait_time_seconds** dan **after_call_seconds** relatif sama, kita dapat melihat perbedaan yang signifikan dalam **call_time_seconds**. Bahkan, kira-kira 27% (433/349) lebih tinggi daripada panggilan telepon yang menghasilkan skor umpan balik positif.
13. Mungkin menarik untuk melihat persentase penelepon yang mengalami waktu panggilan lebih tinggi ini dan meninggalkan skor negatif. Kami dapat dengan mudah kembali ke langkah mana pun dalam flow kami dan membuat perubahan pada konfigurasinya, sesuatu yang sangat umum dalam analisis ad hoc seperti ini. Kembali ke step **Aggregate 2** dan **Aggregate 3** dan tambahkan **Number of Rows field** ke bagian **Aggregated Fields**. **Number of Rows field** dibuat secara otomatis dalam aggregate step dan memberi tahu kami number of rows untuk langkah tersebut. Setelah selesai, kembali ke **Union Step**.  
    Perhatikan bahwa **1.363** pelanggan dari total 3.830 (**1.363+2.467**) pelanggan mengalami waktu panggilan yang lebih tinggi, setidaknya secara rata-rata, dan meninggalkan skor survei negatif. Itu setara dengan 36% dari semua penelepon.  
    :::info
    CATATAN PENTING  
    Jangan lupakan kalkulator tua biasa Anda. Seringkali, perhitungan cepat sederhana selama analisis ad hoc, seperti menentukan selisih persentase pada langkah ini, dilakukan lebih cepat dengan kalkulator sederhana. Jika Anda tidak perlu menghitung ulang nilai ini lagi atau tidak bermaksud untuk menjalankan alur Anda terhadap data baru, tip sederhana ini seringkali dapat menghemat waktu Anda.
    :::
14. Kumpulan data yang disediakan juga menyertakan file data kasus. Data ini berisi kutipan dari sistem manajemen kasus pusat panggilan dan mencatat tujuan panggilan, serta produk terkait. Tambahkan data connection ketiga ke flow Anda untuk file Excel, **case_data.xlsx**. Di connection settings, perbaiki tipe data untuk bidang **call_id** menjadi **String**.
15. Gabungkan data kasus yang baru ditambahkan dengan **Clean Step 2** dengan menyeret dan menjatuhkan **Case Data step** di atas **Clean Step 2**. Clean Step 2 berisi semua data yang telah kami gunakan sejauh ini untuk pelanggan yang memberikan peringkat antara 1 dan 4. Dengan menggabungkannya dengan data kasus, kami dapat mulai mengidentifikasi alasan pelanggan ini menelepon. Tinggalkan **Join Clause** yang terdeteksi secara otomatis atur ke **case_id** dan **Join Type** sebagai **Inner**.
16. Tambahkan **Aggregate Step** setelah **Join 3** yang baru ditambahkan, lalu tambahkan **contact_reason** ke bagian **Grouped Fields**, dan **Number of Rows** ke bagian **Aggregated Fields**.
17. Selanjutnya, tambahkan **Clean Step** dan amati number of rows berdasarkan **contact_reason**. Cukup jelas bahwa tiga angka menonjol dari yang lain: **403**, **404**, dan **410** jauh lebih tinggi daripada number of rows lainnya. Pilih tiga angka, klik kanan, dan pilih **Keep Only** untuk memfilter data hanya ke tiga nilai ini. Saat melakukannya, kami segera melihat tiga alasan utama mengapa orang menelepon: **Firmware Issue**, **Unable to Boot Up**, dan **Update Issue**.
18. Untuk memastikan persentase panggilan yang dialihkan ke tiga alasan ini, klik langkah **Join 3** untuk melihat jumlah baris di cabang ini yang tercantum di bawah **Join Result** di konfigurasi. Jumlah baris di sini, **1.363**, adalah jumlah survei dengan skor 4 atau lebih rendah. Dengan informasi yang dikumpulkan pada Langkah 17, kita dapat menghitung persentase panggilan dalam subset ini yang terkait dengan salah satu dari tiga kategori utama, yaitu (403+404+410)/1363 = 89%
19. **Data Kasus** juga mencakup **produk** per kasus. Mari kita lihat produk mana yang dipengaruhi oleh tiga alasan kasus yang telah kami identifikasi di Langkah 17. Untuk melakukan ini, gabungkan **Join 3** dengan **Clean 5**. Biarkan konfigurasi default disetel, dengan **Join Clause** pada **contact_reason** dan **Join Type inner**.
20. Terakhir, tambahkan **Clean Step** setelah gabungan yang baru ditambahkan dan hapus semua field kecuali **Number of Rows**, **product**, dan **contact_reason**. Sekarang kita dapat dengan jelas melihat produk yang terpengaruh di file produk.

## Kesimpulan

Dengan selesainya langkah-langkah ini, Anda telah berhasil melakukan analisis ad hoc di Tableau Prep itu sendiri. Kami dapat meringkas temuan kami dalam laporan kepada pemohon sebagai berikut:

- Skor kepuasan pelanggan rata-rata untuk Januari 2021 adalah **4,05** (dari 10).
- Lebih dari sepertiga, **36%**, pelanggan menilai tingkat kepuasan mereka sebagai 4 atau lebih rendah.
- Rata-rata, pelanggan yang memberikan umpan balik negatif biasanya mengalami waktu panggilan **27% lebih lama** dibandingkan dengan waktu panggilan untuk pelanggan yang memberikan umpan balik positif.
- Dari **1.363** panggilan terkait dengan umpan balik negatif (4 atau lebih rendah), **1.217 (89%)** terkait dengan masalah terkait **Firmware, Updates atau Booting up**. Produk yang berhubungan dengan panggilan dan masalah ini adalah sebagai berikut:
  - 2019 13" Super Book
  - 2019 15" Desktop PC
  - 2020 13" Airbook Laptop
  - 2020 13" Notebook Z
  - 2020 14" Notebook X
  - 2020 16" Megabook Pro
  - 2020 16" Ultrabook

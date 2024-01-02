# Pairwise Testing

Dalam ilmu komputer, semua pengujian berpasangan atau pengujian berpasangan adalah metode kombinasi pengujian perangkat lunak yang, untuk setiap pasangan parameter input ke sistem (biasanya, algoritme perangkat lunak), menguji semua kemungkinan kombinasi diskrit dari parameter tersebut.

Menggunakan vektor uji yang dipilih dengan cermat, ini dapat dilakukan jauh lebih cepat daripada pencarian menyeluruh dari semua kombinasi semua parameter, dengan "memparalelkan" uji pasangan parameter.

Generator data uji kombinatorial menghasilkan tabel data untuk pengujian. Strategi pembuatan data kombinatorial yang paling dasar dan umum digunakan adalah apa yang dikenal sebagai pengujian berpasangan, pengujian semua pasangan, mencakup array atau desain Taguchi.

Pengujian berpasangan mencoba untuk mengatasi masalah praktis berikut: sistem Anda memiliki parameter konfigurasi len, dan setiap parameter konfigurasi memiliki sepuluh nilai yang berbeda dan menarik. Bagaimana Anda dapat menguji bahwa sistem Anda berperilaku dengan benar dengan semua konfigurasi yang berbeda?

Karena Ada 10 miliar konfigurasi berbeda yang tersedia, Anda tidak dapat menguji semuanya. Usulan pengujian berpasangan adalah cukup untuk menguji semua kemungkinan kombinasi nilai untuk dua dari sepuluh variabel.

Dalam sistem komputer, kerusakan biasanya melibatkan satu kondisi, terlepas dari kondisi lain di sistem. Jika ada masalah dengan perangkat atau variabel atau pengaturan, masalahnya biasanya pada perangkat atau variabel atau pengaturan itu sendiri.

## Kelebihan Pairwise Testing (All-Pair Testing)

- Pairwise Testing mengurangi jumlah eksekusi kasus uji.
- Pairwise Testing meningkatkan cakupan pengujian hampir hingga seratus persen.
- Pairwise Testing meningkatkan rasio deteksi cacat.
- Pairwise Testing membutuhkan lebih sedikit waktu untuk menyelesaikan eksekusi rangkaian pengujian.
- Pairwise Testing mengurangi anggaran pengujian keseluruhan untuk suatu proyek

## Kekurangan Pairwise Testing (All-Pair Testing)

- Pengujian berpasangan tidak menguntungkan jika nilai variabel tidak sesuai.
- Dalam pengujian berpasangan dimungkinkan untuk melewatkan kombinasi saat memilih data pengujian.
- Dalam pengujian berpasangan, rasio hasil cacat dapat dikurangi jika kombinasi terlewatkan.
- Pengujian berpasangan tidak berguna jika kombinasi variabel tidak dipahami dengan benar.

## All-Pair Technique

Misalkan ada lima variabel, masing-masing diwakili oleh huruf alfabet. Dan misalkan setiap variabel dapat berisi nilai dari satu hingga lima.

Mari kita tetapkan variabel A, B, C, dan D semuanya sama dengan 1. Jika nilai-nilai itu tetap, variabel E dapat memiliki nilai dari satu hingga lima. Kami akan melacak jumlah total kombinasi di kolom paling kiri kami; Lima kombinasi pertama kita akan diberi nomor dari 1 sampai 5.

Table 1: Varying column E only

| Combination Number | A   | B   | C   | D   | E   |
| ------------------ | --- | --- | --- | --- | --- |
| 1                  | 1   | 1   | 1   | 1   | 1   |
| 2                  | 1   | 1   | 1   | 1   | 2   |
| 3                  | 1   | 1   | 1   | 1   | 3   |
| 4                  | 1   | 1   | 1   | 1   | 4   |
| 5                  | 1   | 1   | 1   | 1   | 5   |

Mari kita tetapkan variabel D menjadi dua, bukan satu, dan pertahankan A. B, dan C tetap satu. Lima kombinasi lagi, nomor 6-10.

Kemudian kita akan menyetel D ke 3. lalu ke 4, lalu ke 5, menyetel E ke nilai dari 1 hingga 5 setiap kali. Kita harus melalui 25 kombinasi sebelum kita menghabiskan semua kombinasi untuk D dan E, dan baru setelah itu kita dapat mengubah C dari 1 ke 2. Kolom di sebelah kanan akan berguling relatif cepat, tetapi saat kita bergerak ke kiri lingkungan, kolom AB dan C akan lebih jarang berubah.

Faktanya, jika hanya ada lima variabel dalam program, masing-masing dengan lima kemungkinan status, program akan menjadi sangat sederhana, namun kita harus menguji 3125 kombinasi.  
Jika kita dapat menguji satu kombinasi per menit, pengujian lengkap akan membutuhkan tujuh setengah hari pengujian terus menerus, tujuh jam sehari. Pasti ada cara untuk mengurangi jumlah tes menjadi sesuatu yang bisa kami tangani.

Bayangkan bahwa cacat kita bergantung pada kotak centang A yang dikosongkan (yaitu, tidak dicentang) dan kotak centang B sedang disetel (dicentang). Jika kami mencoba semua pengaturan yang mungkin dikombinasikan satu sama lain, kami akan menemukan cacatnya.

Kombinasi 1, 3, dan 4 berfungsi dengan baik, tetapi Kombinasi 2 menunjukkan masalahnya. Kami memerlukan empat pengujian untuk memastikan bahwa kami telah mencakup semua kombinasi di mana A dan B dapat ditemukan. Dua variabel, dan dua pengaturan untuk masing-masing; empat kombinasi.

Sekarang pertimbangkan sesuatu yang hanya sedikit lebih kompleks: tes kotak hitam dari dialog dengan tiga set tombol radio di atasnya, yang mewakili kebutuhan perjalanan di Amerika Utara.

Rangkaian tombol radio pertama menentukan tujuan, menurut negara; catatan kedua pilihan tempat duduk lorong atau dekat jendela; dan yang ketiga memberi pilihan pelatih, bisnis, atau kelas ekonomi. Saat pengguna membuat pilihannya dan menekan "OK" untuk menutup dialog. aplikasi akan mengambil jalur eksekusi yang berbeda untuk setiap kombinasi dari opsi yang diberikan dalam status tertentu.

Asumsikan sekarang bahwa ada cacat yang bergantung pada dua kondisi. Ini dikenal sebagai kesalahan mode ganda.

Jenis masalah yang paling sulit ditemukan dengan pengujian kotak hitam adalah masalah yang melibatkan beberapa variabel, dan masing-masing harus berada dalam status unik dan spesifik untuk memicu masalah.

Misalnya, jika kolom negara disetel ke "AS, pilihan kursi ke" lorong ", dan kelas layanan ke" Pertama ", maka bug akan dipicu.

Ini dikenal sebagai kesalahan mode tiga, atau lebih umum sebagai kesalahan multi-mode, yang menjelaskan kesalahan yang terkait dengan tiga atau lebih parameter.

Tabel ini memastikan bahwa Kanada diuji setidaknya sekali dengan masing-masing Coach, Business Class, dan First Class, dan dengan kotak centang di Aisle state dan window state. Demikian pula, setiap opsi diuji dengan setiap opsi lainnya.

Kami menangkap kesalahan mode ganda yang diekspos dalam kombinasi 3; kita tidak perlu menguji kombinasi 12, karena pasangannya tercakup dalam kombinasi 1, kombinasi 11, dan kombinasi 3 (yang menguji Tujuan = AS dan Kelas = Pelatih, dan memperlihatkan konflik taruhan di antara keduanya). Dalam hal ini kami memenuhi setengah dari jumlah persyaratan pengujian, dari 18 menjadi sembilan.

## Contoh

Aplikasi Pemesanan Mobil:

- Aplikasi pemesanan mobil memungkinkan untuk Jual Beli mobil. Ini harus mendukung perdagangan di Delhi dan Mumbai.
- Aplikasi harus memiliki nomor registrasi, mungkin valid atau tidak valid. Ini harus memungkinkan perdagangan mobil berikut: BMW, Audi, dan Mercedes.
- Dua jenis pemesanan dapat dilakukan: E-booking dan In Store.
- Pesanan hanya dapat ditempatkan selama jam perdagangan.

### Langkah 1

Membuat daftar variabel yang terlibat

1) Kategori pesanan
a. Beli
b. Menjual

2) Lokasi
a. Delhi
b. Mumbai

3) Merek mobil
a. BMW
b. Audi
c. Mercedes

4) Nomor pendaftaran
a. Valid (5000)
b. tidak valid

5) Jenis pesanan
a. E-booking
b. Di toko

6) Waktu pemesanan
a. Jamkerja
b. Jam tidak bekerja

Jika kita ingin menguji semua kemungkinan kombinasi yang valid:
= 2 X 2 X 3 X 5000 X 2 X 2
= 240000 Kombinasi kasus uji yang valid
Ada juga kombinasi yang tidak valid dalam jumlah tak terbatas.

### Langkah 2

Menyederhanakan

- Gunakan sampel representatif yang cerdas.
- Gunakan grup dan batasan, bahkan ketika data tidak diskrit.
- Kurangi Nomor Registrasi menjadi Dua
  - Nomor registrasi yang valid
  - Nomor registrasi tidak valid

Sekarang hitung banyaknya kemungkinan kombinasi
= 2 X 2 X 3 X 2 X 2 X 2
= 96

### Langkah 3

Menyusun variabel dan nilai yang terlibat

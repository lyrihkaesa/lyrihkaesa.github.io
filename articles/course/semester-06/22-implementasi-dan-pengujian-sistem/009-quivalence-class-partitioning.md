# Equivalence class partitioning

Adalah metode black-box testing yang membagi domain masukan dari suatu program ke dalam kelas-kelas data, dimana test cases dapat diturunkan [BCS97a].

Equivalence partitioning berdasarkan pada premis masukan dan keluaran dari suatu komponen yang dipartisi ke dalam kelas-kelas, menurut spesifikasi dari komponen tersebut, yang akan diperlakukan sama (ekuivalen) oleh komponen tersebut. Dapat juga diasumsikan bahwa masukan yang sama akan menghasilkan respon yang sama pula.

Nilai tunggal pada suatu partisi ekuivalensi diasumsikan sebagai representasi dari semua nilai dalam partisi.

Hal ini digunakan untuk mengurangi masalah yang tidak mungkin untuk testing terhadap tiap nilai masukan (lihat prinsip testing: testing yang lengkap tidak mungkin).

## Kombinasi yang mungkin dalam partisi ekuivalensi

- Nilai masukan yang valid atau tak valid.
- Nilai numerik yang negatif, positif atau nol.
- String yang kosong atau tidak kosong.
- Daftar (list) yang kosong atau tidak kosong.
- File data yang ada dan tidak, yang dapat dibaca / ditulis atau tidak.
- Tanggal yang berada setelah tahun 2000 atau sebelum tahun 2000, tahun kabisat atau bukan tahun kabisat (terutama tanggal 29 Pebruari 2000 yangg mempunyai proses tersendiri).
- Tanggal yang berada di bulan yang berjumlah 28, 29, 30, atau 31 hari.
- Hari pada hari kerja atau liburan akhir pekan.
- Waktu di dalam atau di luar jam kerja kantor.
- Tipe file data, seperti: teks, data berformat, grafik, video, atau suara.
- Sumber atau tujuan file, seperti hard drive, floppy drive, CD-ROM, jaringan.

## Analisa partisi

- Tester menyediakan suatu model komponen yang dites yang merupakan partisi dari nilai masukan dan keluaran komponen.
- Masukan dan keluaran dibuat dari spesifikasi dari tingkah laku komponen.
- Partisi adalah sekumpulan nilai, yang dipilih dengan suatu cara dimana semua nilai di dalam partisi, diharapkan untuk diperlakukan dengan cara yang sama oleh komponen (seperti mempunyai proses yang sama).
- Partisi untuk nilai valid dan tidak valid harus ditentukan.

## Contoh ilustrasi

Suatu fungsi, `generateGrading(int value)`, dengan spesifikasi sebagai berikut:

- Fungsi mempunyai dua penanda, yaitu “Ujian” (di atas 75) dan “Tugas” (di atas 25).
- Fungsi melakukan gradasi nilai kursus dalam rentang ‘A’ sampai ‘D’. Tingkat gradasi dihitung dari kedua penanda, yang dihitung sebagai total penjumlahan nilai “Ujian” dan nilai “Tugas”, sebagaimana dinyatakan berikut ini:
  - Lebih besar dari atau sama dengan 70 – ‘A’
  - Lebih besar dari atau sama dengan 50, tapi lebih kecil dari 70 – ‘B’
  - Lebih besar dari atau sama dengan 30, tapi lebih kecil dari 50 – ‘C’
  - Lebih kecil dari 30 – ‘D’
- Dimana bila nilai berada di luar rentang yang diharapkan akan muncul pesan kesalahan ("Failure Message"). Semua masukan berupa integer.

## Desain test cases

Test cases didisain untuk menguji partisi.
Suatu test case menyederhanakan hal-hal berikut:

- Masukan komponen.
- Partisi yang diuji.
- Keluaran yang diharapkan dari test case.

Dua pendekatan pembuatan test case untuk menguji partisi, adalah:

- Test cases terpisah dibuat untuk tiap partisi dengan one-to-one basis.
- Sekumpulan kecil test cases dibuat untuk mencakup semua partisi. Test case yang sama dapat diulang untuk test cases yang lain.

## Test cases minimal untuk multi partisi

- Pada kasus test cases di atas banyak yang mirip, tapi mempunyai target partisi ekuivalensi yang berlainan.
- Hal ini memungkinkan untuk mengembangkan test cases tunggal yang menguji multi partisi dalam satu waktu.
- Pendekatan ini memungkinkan tester untuk mengurangi jumlah test cases yang dibutuhkan untuk mencakup semua partisi ekuivalensi.

## One-to-one vs minimalisasi

Kekurangan dari pendekatan one-to-one membutuhkan lebih banyak test cases.
Bagaimana juga identifikasi dari partisi memakan waktu lebih lama daripada penurunan dan eksekusi test cases. Tiap penghematan untuk mengurangi jumlah test cases, relatif kecil dibandingkan dengan biaya pemakaian teknik dalam menghasilkan partisi.
Kekurangan dari pendekatan minimalisasi adalah sulitnya menentukan penyebab dari terjadinya kesalahan. Hal ini akan menyebabkan debugging menjadi lebih menyulitkan, daripada pelaksanaan proses testingnya sendiri.

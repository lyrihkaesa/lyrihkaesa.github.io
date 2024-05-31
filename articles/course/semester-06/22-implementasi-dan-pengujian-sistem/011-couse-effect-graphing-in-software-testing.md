# Cause-Effect Graphing in Software Testing

Cause Effect Graph adalah teknik pengujian kotak hitam yang populer.

Cause Effect Graph menggambarkan hubungan antara hasil yang diberikan dan semua faktor yang mempengaruhi hasil secara grafis.

Sebuah "Sebab (Cause)" adalah singkatan dari kondisi masukan yang berbeda yang mengambil tentang perubahan internal dalam sistem.
Sebuah "Efek (Effect)" mewakili kondisi keluaran, keadaan sistem yang dihasilkan dari kombinasi penyebab.

## Penerapannya

- Untuk menganalisis masalah yang ada sehingga tindakan perbaikan dapat dilakukan sesegera mungkin.
- Untuk menghubungkan interaksi sistem dengan faktor-faktor yang mempengaruhi suatu proses tertentu.
- Untuk mengidentifikasi penyebab akar yang mungkin, alasan dari suatu efek, masalah, atau hasil tertentu.

## Problem-01

Rancang kasus uji untuk masalah berikut-

Jika karakter pada kolom pertama adalah 'A' atau 'B' dan kolom kedua berupa angka, maka file dianggap telah diperbarui. Jika karakter pertama salah, maka pesan x harus dicetak. Jika kolom kedua bukan angka, maka pesan y harus dicetak.

## Solusi-01

### Langkah-01

Identifikasi dan jelaskan kondisi masukan (penyebab (cause)) dan tindakan (efek (effect)).

Penyebab yang direpresentasikan oleh huruf "c" adalah sebagai berikut:

- c1: Karakter pada kolom 1 adalah 'A'
- c2: Karakter pada kolom 1 adalah 'B'
- c3: Karakter pada kolom 2 adalah angka

Efek yang direpresentasikan oleh huruf "e" adalah sebagai berikut:

- e1: File diperbarui
- e2: Pesan x dicetak
- e3: Pesan y dicetak

### Langkah-02

Bangunlah Cause-Effect Graphing

### Langkah-03

Ubah Cause-Effect Graphing menjadi tabel keputusan

Masalah-02
Mengapa Teknik Cause-Effect Graphing lebih baik dibandingkan dengan Teknik Black-box Testing lainnya?

Solusi

- Analisis batas nilai dan partisi kesetaraan tidak mengeksplorasi kombinasi kondisi masukan.
- Keduanya hanya mempertimbangkan kondisi masukan tunggal.
- Namun, kombinasi masukan dapat menghasilkan situasi menarik.
- Situasi-situasi ini harus diuji.
- Dengan mempertimbangkan semua kombinasi yang valid dari kelas kesetaraan, akan ada jumlah kasus uji yang besar.
- Banyak dari kasus uji ini tidak akan berguna untuk mengungkapkan kesalahan baru.

Di sisi lain,

- Cause-Effect Graphing adalah teknik yang membantu dalam memilih sekumpulan kasus uji dengan hasil yang tinggi secara sistematis.
- Ini memiliki efek yang menguntungkan dalam menunjukkan ketidaklengkapannya dan ambiguitas dalam spesifikasinya.

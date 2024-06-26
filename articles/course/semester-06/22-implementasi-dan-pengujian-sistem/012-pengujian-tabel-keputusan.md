# Pengujian Tabel Keputusan

Alat penting dalam kotak peralatan pribadi penguji.

Alat yang sangat baik untuk menangkap jenis persyaratan sistem tertentu dan untuk mendokumentasikan desain sistem internal dan digunakan untuk merekam aturan bisnis yang kompleks yang harus diterapkan oleh sistem. Selain itu, dapat berfungsi sebagai panduan untuk membuat kasus pengujian.

## Teknik

Tabel keputusan mewakili aturan bisnis yang kompleks berdasarkan sekumpulan kondisi.
Bentuk umumnya adalah sebagai berikut :

|               | Rule 1 | Rule 2 | ... | Rule p |
| ------------- | ------ | ------ | --- | ------ |
| Conditions    |        |        |     |        |
| - Condition-1 |        |        |     |        |
| - Condition-2 |        |        |     |        |
| - ...         |        |        |     |        |
| - Condition-m |        |        |     |        |
| Actions       |        |        |     |        |
| - Action-1    |        |        |     |        |
| - Action-2    |        |        |     |        |
| - ...         |        |        |     |        |
| - Action-n    |        |        |     |        |

Setiap aturan menentukan kombinasi unik dari kondisi yang menghasilkan eksekusi ("pengaktifan") tindakan yang terkait dengan aturan tersebut. Tetapi semua tindakan tidak bergantung pada urutan di mana kondisi dievaluasi, tetapi hanya pada nilainya. (Semua nilai diasumsikan tersedia secara bersamaan.) Selain itu, tindakan hanya bergantung pada kondisi yang ditentukan, bukan pada kondisi input atau status sistem sebelumnya.

Contoh :
Perusahaan asuransi mobil memberikan diskon kepada pengemudi yang sudah menikah dan / atau pelajar yang baik. Mari kita mulai dengan kondisi. Tabel keputusan berikut memiliki dua kondisi, yang masing-masing memiliki nilai Ya atau Tidak.

## Table 5-2A decision table with two binary conditions

|                 | Rule | Rule | RUle | Rule |
| --------------- | ---- | ---- | ---- | ---- |
| Conditions      | 1    | 2    | 3    | 4    |
| - Married?      | Yes  | Yes  | No   | No   |
| - Good Student? | Yes  | No   | Yes  | No   |

- Semua isi tabel berisi kombinasi ketentuan. Diberikan dua kondisi biner (Ya atau Tidak), kemungkinan kombinasi adalah (Yes, Yes), (Yes, No), (No, Yes), dan (No, No).
- Setiap aturan mewakili salah satu dari kombinasi. Sebagai penguji, maka akan melakukan verifikasi bahwa semua kombinasi kondisi telah ditentukan.
- Kehilangan kombinasi dapat mengakibatkan pengembangan sistem yang mungkin tidak memproses rangkaian input tertentu dengan benar.

## Table 5-3 Adding a single action to a decision table

|                 | Rule | Rule | RUle | Rule |
| --------------- | ---- | ---- | ---- | ---- |
| Conditions      | 1    | 2    | 3    | 4    |
| - Married?      | Yes  | Yes  | No   | No   |
| - Good Student? | Yes  | No   | Yes  | No   |
| Actions         |      |      |      |      |
| - Discount ($)  | 60   | 25   | 50   | 0    |

- Setiap aturan menyebabkan tindakan "diaktifkan". Setiap aturan dapat menetapkan tindakan unik untuk aturan itu, atau aturan dapat berbagi tindakan.

## Table 5-4 A decision table with multiple actions

|               | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| ------------- | ------ | ------ | ------ | ------ |
| Conditions    |        |        |        |        |
| - Condition-1 | Yes    | Yes    | No     | No     |
| - Condition-2 | Yes    | No     | Yes    | No     |
| Actions       |        |        |        |        |
| - Action-1    | Do X   | Do Y   | Do X   | Do Z   |
| - Action-2    | Do A   | Do B   | Do B   | Do B   |

- Kondisi menentukan masukan dan Tindakan menentukan hasil yang diharapkan.
- Sementara contoh sebelumnya menggunakan kondisi biner sederhana, kondisinya bisa lebih kompleks.
- Jika sistem yang diuji memiliki aturan bisnis yang kompleks, dan jika analis atau desainer bisnisnya belum mendokumentasikan aturan ini dalam formulir, penguji harus mengumpulkan informasi dan mewakilinya dalam formulir tabel keputusan. Alasannya karena mengingat perilaku sistem yang direpresentasikan dalam bentuk yang lengkap dan ringkas ini, kasus uji dapat dibuat langsung dari tabel keputusan.
- Dalam pengujian, buat setidaknya satu kasus pengujian untuk setiap aturan. Jika ketentuan aturan bersifat biner, satu pengujian untuk setiap kombinasi mungkin sudah cukup. Di sisi lain, jika suatu kondisi adalah rentang nilai, pertimbangkan untuk menguji pada ujung rendah dan tinggi dari rentang tersebut. Dengan cara ini kami menggabungkan gagasan pengujian Nilai Batas dengan pengujian Tabel Keputusan.

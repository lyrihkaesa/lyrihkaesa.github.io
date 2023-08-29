# Black-Box Testing Techniques

Program dipandang sebagai Black-box, yang menerima beberapa input dan menghasilkan beberapa output

Kasus uji diturunkan semata-mata dari spesifikasi, tanpa mengetahui struktur internal program.

- Black-box testing, dilakukan tanpa pengetahuan detail struktur internal dari sistem atau komponen yang dites.
- Disebut juga sebagai _behavioral testing, specification-base testing, input/output testing, atau functional testing_.
- Black-box testing, berfokus pada kebutuhan fungsional pada software, berdasarkan spesifikasi kebutuhan dari software.
- Black-box testing, bukan teknik alternatif pada _white-box testing_. Lebih daripada itu, ia merupakan pendekatan pelengkap dalam mencakup error dengan kelas yang berbeda dari metode _white-box testing_.

## Dekomposisi Kebutuhan

Untuk dapat membuat test cases yang efektif, harus dilakukan dekomposisi dari tugas-tugas testing suatu sistem ke aktivitas-aktivitas yang lebih kecil dan dapat dikelola hingga tercapai test case individual.

Dalam desain test case digunakan mekanisme untuk memastikan bahwa test case yang ada telah cukup dan mencakup semua aspek dari sistem.

## Spesifikasi

Spesifikasi atau model sistem adalah titik awal dalam membuat desain tes yang berupa spesifikasi fungsional, kenerja atau keamanan, skenario pengguna, atau spesifikasi berdasarkan pada resiko sistem.

Spesifikasi menggambarkan kriteria yang digunakan untuk menentukan operasi yang benar atau dapat diterima, sebagai acuan pelaksanaan tes.

## Obyektifitas Tes

Desain tes berfokus pada spesifikasi komponen yang dites. Obyektifitas tes tingkat atas disusun berdasarkan pada spesifikasi komponen. Tiap obyektifitas tes ini untuk kemudian didekomposisikan ke dalam obyektifitas tes lain atau test cases menggunakan teknik desain tes.

## Functional Test-Case Design Techniques

- Equivalence class partitioning
- Boundary value analysis
- Cause-effect graphing
- Error guessing

### Equivalence Class Partitioning

Memisahkan domain masukan program ke dalam kelas-kelas kesetaraan (kelas-kelas data yang menurut spesifikasinya diperlakukan secara identik oleh program)

Dasar dari teknik ini adalah bahwa pengujian nilai perwakilan dari setiap kelas sama dengan pengujian nilai lain dari kelas yang sama.

Identifikasi kelas kesetaraan yang valid maupun tidak valid

Untuk setia kelas kesetaraan, hasilkan kasus uji untuk menguji masukan yang mewakili kelas tersebut.

Contoh:

Input condition

```js
0 <= x <= max;
```

Valid equivalence class

```js
0 <= x <= max;
```

Invalid equivalence class

```js
x < 0, x > max;
```

3 test cases

**Guidelines for Identifying Equivalance Classes**

| Input Condition                                                           | Valid Eq Classes                  | Invalid Eq Classes                                |
| ------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------- |
| range of values (eg. 1 - 200)                                             | on valid (value within range)     | two invalid (one outside each end of range)       |
| number N valid values                                                     | one valid                         | two invalid (none, more than N)                   |
| Set of input values each handled differently by the program (eg. A, B, C) | one valid eq class for each value | one invalid (eg. any value not invalid input set) |
| must be condition (eg. Id name must begin with a latter)                  | one (eg. it is a letter)          | one (eg. it is not a letter)                      |

Jika Anda mengetahui bahwa elemen dalam suatu equivalence class tidak diperlakukan secara identik oleh program, bagi equivalence class tersebut menjadi equivalence classes yang lebih kecil.

**Identifying Test Cases for Equivalence Classes**

Berikan nomor unik untuk setiap equialence class.

Sampai semua equialence class yang valid telah ditutupi oleh kasus uji, tulis kasus uji baru yang mencakup sebanyak mungkin equialence class yang valid yang belum tercakup.

Setiap equialence class yang tidak valid ditutupi oleh kasus uji terpisah.

### Boundary Value Analysis

Merancang kasus uji yang menguji nilai-nilai yang berada di batas-batas equivalence class dan untuk situasi yang sedikit melebihi batas-batas tersebut.

Contoh:

Input condition

```js
0 <= x <= max;
```

Test for values:

```txt
0, max (valid inputs)

-1, max+1 (invalid inputs)
```

### Cause Effect Graphing

Sebuah teknik yang membantu dalam memilih kasus uji untuk kombinasi kondisi masukan secara sistematis.

- Identifikasi penyebab (input conditions) dan efek (output conditions) dari program yang sedang diuji.
- Untuk setiap efek, identifikasi penyebab yang dapat menghasilkan efek tersebut. Buatlah Cause-Effect Graph.
- Buatlah satu kasus uji untuk setiap kombinasi input conditions yang membuat suatu efek menjadi benar.

Contoh:

| Input conditions                 | Output conditions         |
| -------------------------------- | ------------------------- |
| c1: command is credit            | e1: print invalid command |
| c2: command is debit             | e2: print invalid A/C     |
| c3: A/C is valid not valid       | e3: print debit amount    |
| c4: Transaction amount not valid | e4: debit A/C             |
|                                  | e5: credit A/C            |

### Error Guessing

Dari intuisi dan pengalaman, sebutkan daftar kemungkinan kesalahan atau situasi rawan kesalahan, lalu tulis kasus uji untuk mengungkap kesalahan tersebut.

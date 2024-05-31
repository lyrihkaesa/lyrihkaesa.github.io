# Chapter 3: Cleaning Transformations

Semua fungsionalitas **Tableau Prep Builder** dirancang dengan tujuan untuk menggabungkan (combining), membentuk (shaping), dan membersihkan (cleaning) data Anda agar siap untuk analisis lebih lanjut. Dalam bab ini, kita akan melihat berbagai transformasi yang tersedia untuk membentuk dan membersihkan data Anda.

Dalam bab ini, Anda akan menemukan resep-resep berikut yang akan membantu Anda mentransformasi data Anda:

1. Mengubah nama kolom (Renaming columns)
2. Memfilter dataset Anda (Filtering your dataset)
3. Mengubah jenis data (Changing data types)
4. Validasi otomatis data (Auto-validating data)
5. Validasi data dengan daftar referensi kustom (Validating data with a custom reference list)
6. Memisahkan bidang dengan nilai-nilai ganda (Splitting fields with multiple values)

## Persyaratan teknis

Untuk mengikuti resep-resep dalam bab ini, Anda akan memerlukan Tableau Prep Builder. Kami akan menggunakan file Excel contoh yang disediakan dalam repositori **GitHub** buku ini, sehingga tidak perlu terhubung ke database. Namun, dalam setiap resep, Anda dapat mengganti sumber data masukan contoh yang disarankan dengan jenis koneksi apa pun yang sesuai dengan skenario Anda.

Resep-resep dalam bab ini menggunakan file data contoh yang dapat Anda unduh dari repositori GitHub buku ini: https://github.com/PacktPublishing/Tableau-Prep-Cookbook.

```bash
git clone https://github.com/PacktPublishing/Tableau-Prep-Cookbook.git
```

## Mengubah nama kolom (Renaming columns)

Ketika melakukan pembersihan data, salah satu tindakan yang paling sederhana namun paling kuat mungkin adalah hanya dengan mengubah nama _field_ menjadi format yang lebih ramah pengguna.

Langkah-langkah dalam Tableau Prep dapat dikategorikan menjadi tiga item: **inputs, transformations, dan outputs**. Selama dua langkah pertama, yaitu langkah input dan transformasi, kita selalu memiliki kemampuan untuk mengubah nama bidang sesuai keinginan.

### Bersiap

Untuk mengikuti resep ini, unduh folder **Sample Files 3.1** dari repositori GitHub buku ini.

### Bagaimana cara melakukannya…

Buka Tableau Prep Builder dan sambungkan ke file `December 2016 Sales.xlsx`:

- Seret `Sales_Datas` ke dalam flow canvas

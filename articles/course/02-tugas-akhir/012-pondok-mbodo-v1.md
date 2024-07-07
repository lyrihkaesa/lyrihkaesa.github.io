# Pondok Mbodo v1


Aplikasi pembayaran santri kepada yayasan pondok mbodo.

## Berdasarkan Peran (By Roles)

Fitur berdasarkan peranan.

### Semua

- Semua peran dapat mengganti profile masing-masing
- Semua peran dapat mengganti password masing-masing

### Santri atau Siswa

- Santri dapat mendaftarkan dirinya sendiri
  - table: users one to one santris
- Santri dapat melihat profilnya sendiri

### Guru

- Guru dapat melakukan absensi sesuai jadwal dan mata pelajaran yang sudah ditentukan

### Admin Keuangan

- Melihat daftar santri

### Admin Tata Usaha

- Memasukkan data santri
- Melihat data santri
- Mengedit data santri
- Menghapus data santri

- Memasukkan data karyawan
- Melihat data karyawan
- Mengedit data karyawan

- Melihat daftar roles
- Mengedit role setiap karyawan tetapi tidak untuk super admin
- Membuat role baru sesuai dengan permission
- Mengedit role
- Menghapus role tetapi tidak untuk super admin

### Super Admin

- Dapat mengelola segalanya

## Kategori Sekolah

Semua dipisah antara putra dan putri.

### Formal

- Paud atau TK
- MI atau SD
- SMP Islam Al Hawi
- MA dan/atau SMK Islam Al Hawi

### Madarasah

- Takhasus Athfal
  - Setara Paud/TK dan MI/SD
- Kelas Wusthu
  - Setara SMP
  - Terdapat tiga kelas sama seperti SMP
- Kelas Ulya
  - Setara MA dan/atau SMK
  - Terdapat tiga kelas sama seperti SMA/MA/SMK

### Program Jurusan

- Jurusan Persiapan (Level 0)
- Jurusan Quran Tahsin
- Jurusan Kitap
- Jurusan Suwuk
- Jurusan Tahfidz
  - Hanya ada kelas putri

Interview Protocol

Tujuan interview: Adapun tujuan interview yang dilakukan pada Yayasan Pondok Mbodo yaitu sebagai berikut:

1. Mendapatkan detail informasi mengenai gambaran umum, struktur organisasi, berserta proses bisnis Yayasan pondok Mbodo yang berjalan.
2. Mendapatkan informasi terkait dengan kondisi saat ini dari proses bisnis yang mengalami permasalahan terkait dengan teknologi, dan sistem informasi baik berupa sistem dan layanan.
3. Memperoleh informasi terkait dengan pengembangan layanan sistem informasi yaitu sistem informasi akademik.

| Key              | Value                             |
| ---------------- | --------------------------------- |
| Hari dan tanggal | xxx, xxx November 2023            |
| Waktu            | 09.00 - 10.00 WIB                 |
| Lokasi           | Kantor Suwuk Yayasan Pondok Mbodo |
| Narasumber       | ....                              |
| Jabatan          |                                   |

Sasaran atau goals:

1. Gambaran umum, struktur organisasi dari proses bisnis Yayasan Pondok Mbodo.
2. Kondisi Yayasan Pondok Mbodo saat ini terkait dengan permasalahan yang terjadi.
3. Infrastruktur TI (hardware/software/network) yang dikelola dan dikembangkan Yayasan Pondok Mbodo.
4. Permasalahan saat ini yang terjadi pada Yayasan Pondok Mbodo.
5. Sistem informasi yang dikelola dan dikembangkan Yayasan Pondok Mbodo.
6. Pendokumentasian pembangunan, pengelolaan, dan pengembangan sistem informasi.
7. Metode dan kerangka kerja pengembangan layanan sistem informasi akademik baru.

[2018 Sitorus - IMPLEMENTASI ARSITEKTUR ENTERPRISE ZACHMAN FRAMEWORK PADA SISTEM INFORMASI AKADEMIK UNIVERSITAS DIAN NUSWANTORO SEMARANG - 22781.pdf](file:///G:/My%20Drive/_Perkuliahan%20-%2006495%20Kukuh/Paper/Referensi%20TA/2018%20Sitorus%20-%20IMPLEMENTASI%20ARSITEKTUR%20ENTERPRISE%20ZACHMAN%20FRAMEWORK%20PADA%20SISTEM%20INFORMASI%20AKADEMIK%20UNIVERSITAS%20DIAN%20NUSWANTORO%20SEMARANG%20-%2022781.pdf)

Oke saya perjelas lagi proses keuangan yang ada pada aplikasi adalah

1. Admin dapat membuat product (berupa layanan atau barang)
2. Admin dapat membuat productPackage (berupa daftar produk)
3. Admin dapat mengkaitkan beberapa produk, bisa satu persatu atau banyak dengan productPackage ke student
4. Student dapat melihat daftar produk yang perlu dibayar kepada admin
5. Student membayar produk yang sudah ditautkan ke Admin
6. Admin memvalidasi bahwa produk yang sudah dikaitkan tadi sudah dibayar oleh Student

---

Custom Unique Rules

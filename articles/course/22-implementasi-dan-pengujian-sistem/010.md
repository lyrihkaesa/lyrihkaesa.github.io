# Boundary Value Analysis

- Untuk suatu alasan yang tidak dapat sepenuhnya dijelaskan, sebagian besar jumlah errors cenderung terjadi di sekitar batasan dari domain masukan daripada di pusat-nya.
- Karena alasan inilah boundary value analysis (BVA) dikembangkan sebagai salah satu teknik testing.
- Boundary value analysis adalah suatu teknik desain test cases yang berguna untuk melakukan pengujian terhadap nilai sekitar dari pusat domain masukan.
- Teknik boundary value analysis merupakan komplemen dari teknik equivalence partitioning.
- Setelah dilakukan pemilihan tiap elemen suatu kelas ekuivalensi (menggunakan equivalence partitioning), BVA melakukan pemilihan nilai batas-batas dari kelas untuk test cases.
- BVA tidak hanya berfokus pada kondisi masukan, BVA membuat test cases dari domain keluaran juga.
- Boundary-values merupakan nilai batasan dari kelas-kelas ekuivalensi.  
  Contoh:
  - Senin dan Minggu untuk hari.
  - Januari dan Desember untuk bulan.
  - (-32767) dan 32767 untuk 16-bit integers.
  - Satu karakter string dan maksimum panjang string.
- Test cases dilakukan untuk menguji nilai-nilai di kedua sisi dari batasan.
- Nilai tiap sisi dari batasan yang dipilih, diusahakan mempunyai selisih sekecil mungkin dengan nilai batasan (misal: selisih 1 untuk bilangan integers).

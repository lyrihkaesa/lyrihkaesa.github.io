---
sidebar_position: 0
---
# 📔 Catatan Belajar Kaesa

Artikel ini akan menjadi dokumentasi pribadi saya tentang **praktik terbaik (best practices)** dalam pengembangan perangkat lunak dan jaringan.

Praktik ini mungkin sangat **subyektif** dan **tidak bekerja untuk semua orang**, tetapi jangan ragu untuk memeriksa alasan saya dan menggunakan cara saya jika menurut Anda berguna.
## UI/UX Design Web

- EN, Video, Free & Berbayar - https://www.youtube.com/@Hyperplexed
- EN, Video, Free & Berbayar - https://www.youtube.com/@juxtopposed
- ID, Video, Free & Berbayar - https://www.youtube.com/@MasKukuhAldy

## Front End Developer

- ID, Video, Free & Berbayar - https://www.youtube.com/@sandhikagalihWPU

## Back End Developer & DevOps

- ID, Tulisan, Berbayar - https://www.dicoding.com/learningpaths/53
- ID, Video, Free & Berbayar - https://www.youtube.com/@ProgrammerZamanNow

## Flutter

- ID, Tulisan, Berbayar - https://www.dicoding.com/learningpaths/21
- ID, Video, Free & Berbayar - https://www.youtube.com/@flutterdelux
- ID, Video, Free & Berbayar -  https://www.youtube.com/@KuldiiProject
- ID, Video, Free & Berbayar https://www.youtube.com/@ericodarmawan

## Music

Saya suka genre music trap, jika kita sama bisa berbagi judul musik join discord saya [Coming Soon].

## Kuliah

- https://sci-hub.se/

---

## Note Tips

Mempercepat video
```js
document.querySelector('video').playbackRate = 2.5;
```


## Obat

- Obat Flu Pilek
	- flucadex 
	- remavar 


---
Untuk menggabungkan sel tanpa mengganggu yang lain, ==gunakan fitur "Center Across Selection" daripada "Merge & Center" asli==. Cara ini akan membuat teks terlihat di tengah seperti sel yang tergabung, tetapi secara teknis sel-sel tersebut tetap terpisah. Ini memastikan bahwa Anda dapat memblokir data di bawahnya tanpa masalah yang disebabkan oleh sel yang tergabung.  

Langkah-langkah menggunakan "Center Across Selection"

1. **Pilih sel**: yang ingin Anda gabungkan secara visual.
2. Tekan `Ctrl + 1`: untuk membuka jendela "Format Cells".
3. Pada tab Alignment, cari bagian Horizontal.
4. Ubah pilihan dari `General` menjadi `Center Across Selection` .
5. Klik OK. 

Mengapa metode ini lebih baik

- **Menghindari masalah pada data lain:** 
    
    "Merge & Center" dapat menyebabkan masalah saat Anda menyortir atau memfilter data, karena secara fisik menggabungkan sel. "Center Across Selection" tidak melakukan ini, sehingga data Anda tetap dapat diakses secara individual.
    
- **Mempertahankan integritas tabel:** 
    
    Struktur tabel Anda tidak akan berubah secara permanen, memungkinkan operasi seperti menyalin dan menempel untuk bekerja dengan benar.
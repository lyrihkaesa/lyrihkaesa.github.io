# Pengantar Authorization Academy

Authorization Academy adalah serangkaian panduan teknis yang menjelaskan bagaimana cara membangun otorisasi ke dalam sebuah aplikasi, mencakup arsitektur, pola pemodelan, penegakan aturan, pengujian, integrasi pada level antarmuka pengguna, dan masih banyak lagi. Setelah menyelesaikan kursus ini, Anda akan memiliki model mental mengenai cara kerja otorisasi serta alat untuk mengintegrasikannya ke dalam aplikasi Anda sendiri.

Jika Anda seperti kebanyakan tim pengembangan, Anda ingin menghabiskan waktu hanya secukupnya untuk otorisasi – tidak lebih. Permasalahannya adalah: materi konkrit yang tersedia untuk pengembang mengenai cara membangun otorisasi ke dalam aplikasi masih terbatas. Untuk membantu pengembang dalam membangun sistem dan fitur otorisasi tersebut, kami menulis Authorization Academy.

Agar kursus ini se-konkrit mungkin, kami menggunakan sebuah aplikasi contoh sepanjang kursus, yang kami sebut GitClub. GitClub adalah sebuah situs web untuk hosting kode sumber, kolaborasi, dan version control. Mungkin Anda merasa familiar! Inspirasi kami untuk GitClub berasal dari aplikasi nyata – GitHub dan GitLab – yang merupakan studi kasus yang bagus untuk skenario otorisasi umum.

Kursus ini berfokus pada otorisasi dalam aplikasi software-as-a-service (SaaS) bisnis-ke-bisnis (B2B), meskipun kami juga akan membahas pola dan model lain sepanjang kursus. Pengembang dengan berbagai tingkat keahlian akan menemukan kursus ini bermanfaat. Bagi pengembang pemula, kursus ini akan memberikan dasar yang kuat tentang fondasi otorisasi. Sedangkan bagi para veteran yang lebih berpengalaman, kursus ini akan menawarkan pendekatan yang lebih bersih terhadap masalah yang mungkin pernah mereka temui sebelumnya.

Kami adalah profesional di bidang otorisasi. Kursus ini kami bangun berdasarkan pengalaman kami sendiri dalam menulis sistem otorisasi, serta melalui puluhan pertemuan dengan pengembang yang bekerja pada otorisasi di berbagai perusahaan, mulai dari startup hingga perusahaan-perusahaan dalam Fortune 100.

---

## Apa yang Diajar Authorization Academy?

Konten kursus ini dibagi menjadi beberapa bab, di mana kami akan membahas topik-topik berikut:

- **Bab II:** Apa itu otorisasi: cara mengorganisasi kode otorisasi Anda
- **Bab III:** Kontrol akses berbasis peran: mengelompokkan hak akses dalam aplikasi Anda ke dalam peran seperti User dan Admin
- **Bab IV:** Kontrol berbasis hubungan: mengelompokkan hak akses berdasarkan hubungan, misalnya "pembuat sebuah posting dapat mengedit posting tersebut"
- **Bab V:** Penegakan otorisasi: setelah aplikasi Anda memutuskan untuk mengizinkan atau menolak akses, apa yang harus dilakukan dengan keputusan tersebut?
- **Bab VI:** Otorisasi dalam microservices: bagaimana cara membagikan data otorisasi Anda antar layanan

Kami juga merencanakan bab-bab selanjutnya tentang:

- **Antarmuka Pengguna**
- **Pengujian kode otorisasi Anda**

Selanjutnya, kami akan mendefinisikan otorisasi itu sendiri dan memberikan gambaran umum tentang bagaimana menyusun sistem otorisasi Anda.

---

Nantinya, contoh implementasi dengan Laravel bisa kita buat untuk mengilustrasikan konsep-konsep di atas. Misalnya, kita dapat membuat contoh menggunakan Laravel Policy untuk mengatur otorisasi berdasarkan peran, hubungan, dan atribut. Jika Anda tertarik, kita bisa lanjut ke bagian contoh kode dengan Laravel nanti.
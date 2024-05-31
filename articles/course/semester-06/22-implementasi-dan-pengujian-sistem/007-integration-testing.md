# Integration Testing (Pengujian Integrasi)

lebih dari satu (diuji) komunikasi komponen antar komponen.

- Apa yang dapat dilakukan oleh himpunan yang tidak mungkin dilakukan secara individual aspek non-funsional jika memungkinkan strategi:
  - Big-Bang vs ikremental
  - top-down, bottom-up, fungsional
- dilakukan oleh desainer (designers), analis (analysts), atau penguji independent (idependent tester)

## Incremental Integration

Incremental integration adalah proses pengembangan sistem yang dilakukan secara bertahap dengan mengintegrasikan komponen-komponen sistem secara bertahap. Proses ini dilakukan untuk mengatasi kompleksitas sistem dan meminimalkan kesalahan yang terjadi pada saat integrasi. Tujuan dari metode ini adalah untuk mengurangi risiko kesalahan integrasi yang dapat terjadi saat semua komponen sistem diintegrasikan secara bersamaan.

Dalam pengujian incremental integration, sering kali digunakan teknik pengujian top-down atau bottom-up, tergantung pada urutan pengujian modul yang dipilih. Dalam top-down, pengujian dimulai dengan menguji modul paling tinggi di dalam hirarki sistem, sedangkan dalam bottom-up, pengujian dimulai dengan menguji modul paling rendah terlebih dahulu.

| Baseline | Keterangan             |
| -------- | ---------------------- |
| 0        | Tested Component       |
| 1        | Two Components         |
| 3        | Three Components, etc. |

Keuntungan (Advantages):

1. Pencarian dan perbaikan kesalahan yang lebih mudah (Easier fault location and fix)  
   Dalam incremental integration, modul sistem diintegrasikan satu per satu sehingga memudahkan dalam mencari dan memperbaiki kesalahan integrasi yang terjadi pada setiap modul. Jika terdapat kesalahan integrasi pada suatu modul, maka hal ini dapat segera diidentifikasi dan diperbaiki sebelum modul lain diintegrasikan.
2. Pemulihan lebih mudah dari bencana atau masalah (easier recovery from disaster / problems)
   Dalam incremental integration, setiap modul diuji secara terpisah, sehingga memudahkan dalam mengidentifikasi dan memecahkan masalah pada setiap modul. Jika terdapat masalah pada suatu modul, maka hal ini dapat diperbaiki dengan lebih mudah tanpa harus mempengaruhi modul lainnya.
3. Antarmuka harus diuji dalam pengujian komponen, tetapi ditambahkan ke dasar pengujian (interfaces should have been tested in component tests, but add to tested baseline)
   Metode incremental integration memungkinkan pengujian antarmuka antara modul-modul sistem dilakukan seiring dengan proses pengujian satu per satu. Ini memastikan bahwa antarmuka sudah diuji dengan baik dalam pengujian komponen, dan kemudian ditambahkan ke dasar pengujian sistem secara keseluruhan. Hal ini membantu meminimalkan kesalahan integrasi pada antarmuka saat seluruh sistem diintegrasikan.

## Top-Down Integration

Top-Down Integration adalah salah satu metode pengujian integrasi sistem yang dimulai dari modul yang teratas dalam hierarki sistem dan kemudian secara bertahap mengintegrasikan modul yang lebih rendah. Dalam metode ini, modul yang teratas diuji terlebih dahulu secara terpisah, kemudian modul yang berada di bawahnya secara bertahap diintegrasikan. Proses ini berlangsung hingga seluruh modul diintegrasikan dan membentuk sistem yang utuh.

Top-Down Integration biasanya dilakukan dengan membuat driver yang digunakan untuk mensimulasikan modul yang berada di bawah modul yang sedang diuji. Driver tersebut meniru interaksi antarmuka antara modul yang sedang diuji dengan modul yang lainnya. Hal ini dilakukan untuk memastikan bahwa modul yang sedang diuji bekerja dengan benar dalam konteks sistem yang lebih besar.

Keuntungan dari Top-Down Integration adalah metode ini memungkinkan pengujian integrasi sistem dimulai sejak dini dan lebih fokus pada interaksi antara modul. Namun, kelemahan dari metode ini adalah bahwa modul yang berada di bawah mungkin belum selesai atau belum siap diuji, sehingga mengakibatkan penundaan dalam pengujian sistem secara keseluruhan.

| Baseline | Keterangan              |
| -------- | ----------------------- |
| 0        | Component A             |
| 1        | Component A + B         |
| 2        | Component A + B + C     |
| 3        | Component A + B + C + D |
| ...      | etc.                    |

"Need to call to lower-level components not yet integrated, Stubs: simulate missing components" berkaitan dengan penggunaan stubs (pengganti) dalam metode Top-Down Integration. Dalam metode ini, saat menguji modul teratas dalam hierarki sistem, modul yang berada di bawahnya mungkin belum selesai atau belum siap untuk diuji. Untuk mengatasi hal ini, digunakanlah stubs yang berfungsi sebagai pengganti modul yang belum siap tersebut.

Stubs adalah program kecil yang mensimulasikan perilaku modul yang belum siap dan menanggapi panggilan fungsi yang diterima dari modul yang sedang diuji. Dalam konteks Top-Down Integration, stubs digunakan untuk mensimulasikan interaksi antara modul yang sedang diuji dengan modul yang berada di bawahnya yang belum siap.

Dalam Top-Down Integration, ketika modul yang sedang diuji memanggil fungsi dari modul yang belum siap, stub akan merespon panggilan tersebut dengan memberikan nilai kembalian yang telah ditentukan sebelumnya. Hal ini memungkinkan pengujian modul teratas dapat dilakukan meskipun modul yang berada di bawahnya belum selesai atau belum siap.

Dengan menggunakan stubs dalam Top-Down Integration, pengujian integrasi sistem dapat dilakukan sejak dini dan fokus pada interaksi antara modul. Namun, perlu diingat bahwa penggunaan stubs juga memiliki kelemahan, yakni kemungkinan terjadi kesalahan jika perilaku modul yang disimulasikan tidak akurat atau tidak sesuai dengan perilaku modul yang sebenarnya.

### Stups

Stub merupakan program kecil yang digunakan untuk menggantikan komponen yang dipanggil (dalam hal ini modul) dalam pengujian integrasi.

Untuk memudahkan penggunaan stub, perlu diterapkan prinsip "Keep it simple" atau menjaga kesederhanaan stub yang dibuat. Beberapa fungsi dari stub yang dapat diimplementasikan antara lain:

- Mencetak atau menampilkan nama komponen yang dipanggil untuk memudahkan pelacakan
- Memberikan balasan atau reply kepada modul yang memanggil dengan memberikan nilai tunggal (single value)
- Menghitung atau melakukan komputasi untuk memberikan balasan dengan variasi nilai (variety of values)
- Meminta masukan atau reply dari pengujian untuk dijadikan input
- Mencari daftar balasan yang telah ditentukan sebelumnya untuk memberikan balasan kepada modul yang memanggil
- Memberikan delay waktu untuk meniru kondisi nyata dalam sistem

Dalam pengujian integrasi, stubs digunakan untuk menggantikan komponen-komponen yang belum siap atau belum tersedia, sehingga memungkinkan pengujian integrasi sistem dapat dilakukan sejak dini dan fokus pada interaksi antara komponen. Namun, perlu diingat bahwa penggunaan stubs juga memiliki kelemahan, yakni kemungkinan terjadi kesalahan jika perilaku modul yang disimulasikan tidak akurat atau tidak sesuai dengan perilaku modul yang sebenarnya.

### Pros & Cost of Top-Down Approach

#### Keuntungan

- Struktur kontrol kritis diuji terlebih dahulu dan paling sering
- Dapat menunjukkan sistem secara dini (menampilkan menu yang berfungsi)

Top-Down Integration memiliki keuntungan yaitu struktur kontrol kritis diuji terlebih dahulu dan dapat menunjukkan sistem secara dini. Dengan kata lain, bagian penting dari sistem akan diuji terlebih dahulu sehingga akan lebih mudah untuk menemukan masalah yang krusial dan memperbaikinya. Selain itu, pengujian Top-Down juga dapat menampilkan antarmuka sistem pada tahap awal, sehingga dapat membantu memastikan bahwa menu-menu dan fitur-fitur pada sistem bekerja dengan baik.

1.  Struktur kontrol kritis diuji terlebih dahulu dan sering diuji.
2.  Menampilkan sistem pada tahap awal, sehingga dapat membantu memastikan bahwa menu-menu dan fitur-fitur pada sistem berfungsi dengan baik.

#### Kerugian

- Membutuhkan stub
- Detail ditinggalkan sampai akhir
- Mungkin sulit untuk "melihat" output detail (tetapi seharusnya sudah diuji dalam pengujian komponen)
- Dapat terlihat lebih selesai daripada yang sebenarnya.

Namun, Top-Down Integration juga memiliki beberapa kelemahan. Salah satunya adalah membutuhkan penggunaan stub, yaitu komponen palsu yang digunakan untuk menggantikan komponen yang belum terintegrasi saat pengujian. Selain itu, detail-detail kecil pada sistem sering ditinggalkan untuk pengujian terakhir, sehingga ada kemungkinan terlewatkan masalah pada detail-detail tersebut. Selain itu, meskipun sistem terlihat selesai, sebenarnya masih perlu pengujian lebih lanjut untuk memastikan bahwa seluruh bagian sistem berfungsi dengan baik.

1.  Membutuhkan penggunaan stub.
2.  Detail-detail kecil pada sistem sering ditinggalkan untuk pengujian terakhir.
3.  Mungkin sulit untuk melihat detail output.
4.  Meskipun sistem terlihat selesai, masih perlu pengujian lebih lanjut untuk memastikan seluruh bagian sistem berfungsi dengan baik.

## Bottom-Up Integration

| Baselines | Keterangan              |
| --------- | ----------------------- |
| 0         | Component N             |
| 1         | Component N + I + O     |
| 3         | Component N + I + O + D |
| ...       | etc.                    |

- Membutuhkan drivers untuk dipanggil (need drivers to call)
- the baseline configuration
- Dan juga membutuhkan stubs di beberapa baseline (Also needs stubs for some baselines)

### Drivers

Driver: test harness: scaffolding  specially written or general purpose (commercial tools)

- linvoke baseline
- lsend any data baseline expects
- lreceive any data baseline produces (print)
  each baseline has different requirements from  the test driving software

Driver atau test harness merupakan perangkat lunak yang digunakan untuk menguji dan mengintegrasikan komponen-komponen pada level yang lebih rendah ke dalam sistem.

Driver atau test harness akan memanggil baseline atau komponen dasar pada level yang lebih rendah. Selanjutnya, driver atau test harness akan mengirimkan data yang diharapkan oleh baseline dan menerima data yang dihasilkan oleh baseline. Setiap baseline pada level yang lebih rendah membutuhkan kebutuhan yang berbeda dari perangkat lunak pengujinya.

Dalam Bottom-Up Integration, setiap baseline harus diuji terlebih dahulu dan dipastikan berfungsi dengan baik sebelum diintegrasikan ke level yang lebih tinggi. Keuntungan dari pendekatan Bottom-Up adalah setiap komponen akan diuji dan diperbaiki terlebih dahulu sebelum diintegrasikan ke dalam sistem utama. Namun, kerugiannya adalah proses integrasi akan memakan waktu yang lebih lama karena setiap komponen harus diuji terlebih dahulu.

## Pros & Cons of bottom-up approach

Beberapa keuntungan dari Bottom-Up Integration adalah:

1.  (lowest levels tested first and most thoroughly (but should have been tested in unit testing)) Level terendah diuji terlebih dahulu dan paling teliti (tetapi seharusnya sudah diuji dalam unit testing)
2.  (good for testing interfaces to external environment (hardware, network)) Baik untuk menguji antarmuka dengan lingkungan eksternal (perangkat keras, jaringan)
3.  (visibility of detail) Tampilan detail yang jelas

Namun, ada beberapa kerugian dalam pengujian Bottom-Up, antara lain:

1.  Tidak ada sistem yang berfungsi sampai baseline terakhir
2.  Membutuhkan baik driver maupun stubs
3.  Masalah kontrol utama ditemukan terakhir

## Minimum Capability Integration  (also called Functional)

Minimum Capability Integration (MCI) adalah pendekatan pengujian integrasi sistem yang dilakukan dengan mengintegrasikan sistem dalam bentuk minimum atau paling sedikit. Pendekatan ini dilakukan untuk memastikan bahwa sistem mampu melakukan fungsi dasar dengan benar sebelum diintegrasikan dengan sistem lainnya. Dalam MCI, hanya beberapa modul atau komponen sistem yang diintegrasikan, sehingga memungkinkan untuk mengidentifikasi kesalahan dan masalah integrasi pada tahap awal. Setelah modul atau komponen yang terintegrasi dengan baik, modul atau komponen lainnya dapat diintegrasikan secara bertahap hingga sistem lengkap terbentuk. Dalam MCI, biasanya digunakan stub atau driver untuk menguji sistem sebelum diintegrasikan dengan modul atau komponen lainnya.

- Membutuhkan stubs
- Tidak membutuhkan drivers (jika Top-Down)

Keuntungan (Advantages):

- Control level tested first and most often
- Visibility of detail
- Real working partial system earliest
  Kerugian (Disadvantages):
- Membutuhkan stubs

## Thread Integration  (also called functional)

Thread Integration, juga disebut integrasi fungsional, adalah jenis metode integrasi sistem yang dilakukan dengan mengintegrasikan fungsi-fungsi atau "threads" dari sistem secara bertahap. Dalam metode ini, pengujian dilakukan pada tiap "thread" atau jalur fungsional yang ada dalam sistem secara terpisah sebelum diintegrasikan ke dalam sistem utuh.

Dalam Thread Integration, "thread" atau jalur fungsional yang ada dalam sistem diuji secara terpisah dari jalur fungsional lainnya. Hal ini dilakukan untuk memastikan bahwa setiap "thread" dapat berfungsi dengan baik sebelum digabungkan dengan "thread" lainnya. Setelah setiap "thread" diuji dan dianggap berfungsi dengan baik, maka dilakukan pengujian integrasi untuk mengintegrasikan seluruh "thread" tersebut menjadi sistem utuh.

Keuntungan dari Thread Integration adalah dapat menemukan kesalahan atau bug pada setiap "thread" secara terpisah sehingga lebih mudah untuk menemukan dan memperbaikinya. Selain itu, pengembang dapat memfokuskan pada setiap "thread" secara individu dan memastikan bahwa setiap "thread" dapat berfungsi dengan baik sebelum diintegrasikan ke dalam sistem utuh.

Namun, kekurangan dari Thread Integration adalah membutuhkan waktu yang cukup lama dalam pengujian. Selain itu, jika ada kesalahan yang terjadi pada saat pengujian integrasi, maka memperbaikinya dapat menjadi sulit karena harus mengidentifikasi "thread" mana yang menyebabkan kesalahan tersebut.

order of processing some event  determines integration order interrupt, user transaction minimum capability in time

Keuntungan (advantages):

- critical processing first
- early warning of  performance problems

Kekurangan (disadvantages):

- may need complex drivers and stubs

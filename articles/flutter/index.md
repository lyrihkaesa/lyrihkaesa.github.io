---
sidebar_position: 0
---
# Flutter

Artikel ini dibuat oleh Kaesa Lyrih dalam mengerjakan project, yang berisikan masalah, tips, dan trik, dan beberapa saran praktik terbaik (best practice) yang ditemukan. Anda dapat mengikutinya atau membacanya sebagai hiburan.

> Jika Anda tidak paham maksudnya, ingin bertanya, atau mungkin tanya masalah, issue, bug, dsb.
> Silahkan gabung di discord dan but post pada forum channel flutter.

---
## Akun Developer Google Play Store

Jika Anda membuat akun Developer baru setelah 13 November 2023, anda memerlukan 12 penguji supaya bisa publish aplikasi Anda ke play store. 
- Baca selengkapnya disini: https://support.google.com/googleplay/android-developer/answer/14151465?hl=id

Jika Anda tidak memiliki ATM/Kartu Bank Umum anda bisa mendaftar ke Bank Jago dan aktifkan fitur transaksi internasional untuk membuat akun developer google seharga 24$ atau sebesar kurang lebih Rp500.000,-.

---
## Build Runner

### `build_runner watch`

Selalu memantau perubahan, jadi tidak perlu menjalankan perintah build ulang.

Before:

```bash
flutter pub run build_runner watch --delete-conflicting-outputs
```

After:

```bash
dart run build_runner watch --delete-conflicting-outputs
```

### `build_runner build`

Hanya sekali melakukan build, tanpa memantau perubahan yang terjadi ada kode, jadi lebih ringan. Tapi perlu menjalankan perintah build untuk mengimplementasikan perubahan.

Before:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

After:

```bash
dart run build_runner build --delete-conflicting-outputs
```

---
## Package: Firebase

Firebase membutuhkan `flutter.minSdkVersion = 19`. 
Jadi ubah versinya pada path `C:\Development\flutter\packages\flutter_tools\gradle`, temukan file yang namanya `flutter.gradle`, buka dan ubah kode `flutter.minSdkVersion = 16` menjadi `19`.
Path `C:\Development\flutter` ini adalah path dimana flutter berada, jadi anda bisa mengeceknya lewat `fvm flutter doctor`

```gradle
/** flutter/packages/flutter_tools/gradle/flutter.gradle */
static int minSdkVersion = 16 // Defaultnya
static int minSdkVersion = 20 // Diubah karena BLOC minimal itu 19.

/** flutter\packages\flutter_tools\gradle\src\main\groovy\flutter.groovy*/
/** Sets the minSdkVersion used by default in Flutter app projects. */
static int minSdkVersion = 19 // Default flutter versi 3.13.1
```

---
## Git

### Git Commit

Sebelum commit sebaiknya `fix import` terlebih dahulu sampai 3x. Shortcut: `CTRL + LEFT SHIFT + P` nanti akan form search seperti ini `> ...` lalu cari atau ketik `> fix all imports`.

```bash
(feature) git checkout dev
(dev) git fetch --all
(dev) git pull --all
(dev) checkout profile
(profile) git rebase origin/dev  # solusi selain migrate
resolve conflic via VSCode
(profile) git push -f
```

```bash
git log --oneline --graph
```

```bash
git checkout -b <nama-branch> # ganti branch + membuat branch baru
git checkout <nama-branch> # hanya ganti branch
```

Aturan penulisan branch untuk Kaesa:

- jika fiturnya tidak tergantung dengan perannya (role)
  - feature/app
- jika fiturnya hanya dimiliki oleh user dengan peran (role) sebagai admin
  - feature/admin/list-user
  - feature/admin/edit-waste-price
  - feature/admin/report

---
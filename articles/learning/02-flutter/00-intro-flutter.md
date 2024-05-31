# Flutter

Yeah, ini adalah artikel panduan untuk Kaesa Lyrih dalam mengerjakan project, yang berisikan masalah, tips, dan trik, dan beberapa saran praktik terbaik (best practice) yang ditemukan.

```bash
flutter doctor -v
```

```bash
flutter clean
```

```bash
flutter upgrade --force # upgrade paksa
```
## Membuat Proyek Flutter

```bash
flutter create --org id.my.charapon --android-language kotlin --ios-language swift --platforms=web,android,ios kaesa_app
```
## Build `apk`

```bash
flutter build apk
```

```bash
flutter build apk --obfuscate --split-debug-info=build/app/outputs/symbols
```

## Debugging Wireless

```bash
adb tcpip 5555 # membuka port 5555
```

```bash
adb connect <ip-android:port> # adb connect 192.168.1.9:5555 - jika ingin konek
```

```bash
adb devices # melihat semua device yang terkoneksi
```

```bash
adb kill-server # mematikan server, dan menghapus juga device yang terlah terkoneksi
```

Debugging Wireless atau dengan Wi-Fi dengan mudah dilakukan untuk `Android 11` untuk `Android 10` ke bawah harus terkoneksi dengan USB Debugging dulu baru bisa terkoneksi dengan Debugging Wireless.

Debugging Wireless untuk Android 11 paling mudah dengan menggunakan `QR Code` yang ada pada `Android Studio` bagian emulator.

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

## Package: Firebase

Firebase membutuhkan `flutter.minSdkVersion = 19`. Jadi ubah versinya pada path `C:\Development\flutter\packages\flutter_tools\gradle`, temukan file yang namanya `flutter.gradle`, buka dan ubah kode `flutter.minSdkVersion = 16` menjadi `19`.

```gradle
/** flutter/packages/flutter_tools/gradle/flutter.gradle */
static int minSdkVersion = 16 // Defaultnya
static int minSdkVersion = 20 // Diubah karena BLOC minimal itu 19.

/** flutter\packages\flutter_tools\gradle\src\main\groovy\flutter.groovy*/
/** Sets the minSdkVersion used by default in Flutter app projects. */
static int minSdkVersion = 19 // Default flutter versi 3.13.1
```

---

## Package: flutter_gen

```bash
fluttergen -c pubspec.yaml
```

---

## Package: flutter_native_splash

```bash
dart run flutter_native_splash:create
```

---

## Clean Architecture

Dari `datasoruce` bisa `local` atau `remote`.

- local = offline atau database local
- remote = online atau api
  lalu ke `repository` > `usecase` > `bloc` > `page/form`.

---

## Package `cached_network_image`



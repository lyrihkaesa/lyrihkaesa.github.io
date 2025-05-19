# Flutter

Artikel ini dibuat oleh Kaesa Lyrih dalam mengerjakan project, yang berisikan masalah, tips, dan trik, dan beberapa saran praktik terbaik (best practice) yang ditemukan. Anda dapat mengikutinya atau membacanya sebagai hiburan.

Gunakanlah [`fvm` (Flutter Version Manager)](https://fvm.app/documentation/getting-started/installation) supaya mudah dalam berganti-ganti versi flutter. Ini mirip dengan `nodejs` saya lebih baik menggunakan `nvm` untuk mengelola versi `nodejs` pada perangkat kerja saya.

Karena saya menggunakan windows jadi saya menggunakan ini:
Jadi perlu install chocolaty
```powershell
choco install fvm
```

Check apakah sudah terpasang dengan baik:
```bash
fvm --version
```

Pergi ke project flutter kalian, dan ketik perintah:
```bash
fvm use stable
```
or
```bash
fvm use 3.24.0
```

Perintah di atas akan membuat berapa folder dan file configuration:
```txt
# Ini folder berisi symlink flutter sdk dll.
.fvm/
  - fvm_config.json
# Ini adalah file konfigurasi
.fvrc
```

Oh yaa jangan lupa tambahkan `.fvm/` pada `.gitignore`. Karena tidak dibutuhkan oleh device lain. Yang penting itu adalah file `.fvrc` ini berisi informasi `SDK Flutter` apa yang digunakan.

Nah untuk mengecek bisa menggunakan perintah berikut:
```bash
fvm doctor
```

```bash
fvm flutter doctor
```

`Setting > Update & Security > For Developer > Developer Mode > On`

## VSCode FVM

- setting
```json
  "dart.flutterSdkPath": ".fvm/flutter_sdk",

  "dart.flutterSdkPaths": ["/Users/kaesa/fvm/versions"],

  // Remove .fvm files from search

  "search.exclude": {

    "**/.fvm": true

  },

  // Remove from file watching

  "files.watcherExclude": {

    "**/.fvm": true

  }
```

## Default Flutter Installation

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



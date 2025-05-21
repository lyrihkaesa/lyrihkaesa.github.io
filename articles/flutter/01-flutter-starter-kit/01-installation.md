# Installation

## Install Flutter Version Manager (FVM)

Sebelum membuat project flutter dengan starter kit yang saya buat, saya sarankan anda untuk memasang `FVM` (Flutter Version Manager) pada komputer anda.

Gunakanlah [`fvm` (Flutter Version Manager)](https://fvm.app/documentation/getting-started/installation) supaya mudah dalam berganti-ganti versi flutter. Ini mirip dengan `nodejs` saya lebih baik menggunakan `nvm` untuk mengelola versi `nodejs` pada perangkat kerja saya.

### Install FVM in Windows

- Pertama pastikan anda memasang package manager [chocolaty](https://chocolatey.org/install):
- Jika sudah silahkan jalankan perintah berikut:

```powershell
choco install fvm
```

- Check apakah sudah terpasang dengan baik:

```bash
fvm --version
```

- Pergi ke project flutter kalian, dan ketik perintah:

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

### Windows Developer Mode: ON

`Setting > Update & Security > For Developer > Developer Mode > On`

### VSCode FVM

- `setting.json` pada Visual Studio Code

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

### Create Flutter Project

Membuat proyek flutter dimana saya tidak ingin menggunakan folder `com.example` > `id.my.charapon.inventory`, bahasa pemprograman android menggunakan `java` > `kotlin`, bahasa pemprograman ios menggunakan `swift` dan flutter dapat di compile ke platform `web`, `android`, dan `ios`, saya beri nama `charapon_inventory`:

```bash
flutter create --org id.my.charapon.inventory --android-language kotlin --ios-language swift --platforms=web,android,ios charapon_inventory
```

![Flutter Create](attachments/flutter-create.png)

Pindah ke directory app flutter:

```bash
cd charapon_inventory
```

Buka di Visual Studio Code:

```bash
code .
```

Jalankan project dengan perintah:

- Jika menggunakan flutter default:

```bash
flutter run
```

- Jika menggunakan FVM (Flutter Version Manager) atau Anda yakin VS Code anda sudah di setting dengan benar maka anda bisa menjalankan perintah `flutter run` seperti biasa.

```bash
fvm flutter run
```

```bash
fvm flutter create --org io.github.lyrihkaesa.flutterstarterkit --android-language kotlin --ios-language swift --platforms=web,android,ios flutter_starter_kit
```

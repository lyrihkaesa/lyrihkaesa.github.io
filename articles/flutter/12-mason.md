# Mason

**Mason** adalah sebuah tool berbasis Dart CLI yang berfungsi untuk mempercepat pengembangan aplikasi dengan konsep _code generator_ berbasis _brick_. Ibaratnya seperti "template engine" untuk kode, Mason memungkinkan kita membuat potongan kode yang berulang (misalnya struktur folder, class BLoC, widget, atau modul fitur) lalu membangunnya kembali di proyek dengan satu perintah. Dengan Mason, tim bisa menjaga konsistensi arsitektur antar-proyek, mengurangi kesalahan penulisan kode boilerplate, serta mempercepat produktivitas karena developer tidak perlu lagi menulis ulang struktur dasar berulang kali.

## Install mason

Saya pakai fvm untuk bisa menjalankan `dart` saya perlu memilih salah satu versi flutter yang ada di `C:\Users\<username>\fvm\versions\<versi>\bin` untuk di masukan ke path Windows Environment, nanti saya bisa menjalankan perintah di bawah: 
```bash
dart pub global activate mason_cli
```

Karena saya pakai FVM saya coba perintah di bawah ini bisa akan tetapi saya tidak bisa memanggil `mason`, jika menemukan solusi lain nanti saya catat disini:
```bash
fvm dart pub global activate mason_cli
```

Saya bisa menjalakan mason dengan fvm dengan perintah berikut:
```bash
fvm dart pub global run mason_cli:mason
```

Untuk mempersingkat saya buatkan git alias di `~\.bashrc`
```bash
alias fmason="fvm dart pub global run mason_cli:mason"
```

> 📔 Catatan: Jika Anda pengguna Windows tidak bisa menjalankan `mason --version` lewat `git bash` saya sarankan pakai `powershell`

## Initial Mason
Perintah ini digunakan untuk initial mason nanti otomatis generate `mason.yaml` yang berisi daftar bricks mason yang digunakan.
```bash
mason init
```

## Menambahkan Brick

```bash
mason add remote_datasource --git-url https://github.com/lyrihkaesa/bricks_flutter_starter_kit.git --git-path bricks/remote_datasource
```

```bash
mason add remote_datasource --path=bricks/remote_datasource
```

## Menggunakan Mason

```bash
mason make remote_datasource
```

## Mengecek daftar Brick

```bash
mason list
```
## Membuat Brick
```bash
mason new <brick_name> --output-dir bricks
```

```bash
mason new remote_datasource --output-dir bricks
```

## `analysis_options.yaml`
Agar tidak kena warning error:
```yaml
# include: package:flutter_lints/flutter.yaml

linter:
  rules:

analyzer:
  exclude:
    - bricks/**/*
  errors:
    invalid_annotation_target: ignore
```
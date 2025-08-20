# Prologue

Ini hanyalah starter kit yang saya buat untuk diri saya sendiri.
Saya sering mengerjakan project **Flutter** dengan backend **Laravel**, karena itulah saya membuat starter kit ini supaya lebih mudah dan cepat dalam membuat aplikasi baru tanpa harus setup banyak hal dari awal.

> 💡 **Idea**
> Membawa fitur-fitur bagus dari **Laravel** ke dalam **Flutter**.

---

## ✨ Fitur Utama Starter Kit

* **Clean Architecture** dengan struktur `core`, `data`, `domain`, `presentation`.
* **State Management** → `flutter_bloc` (opsi `provider`).
* **Dependency Injection** → `get_it` + `injectable`.
* **Routing** → `go_router` dengan rencana middleware.
* **Environment Config** → `flutter_dotenv`.
* **Error & Exception Handling** → standar di `core/errors`.
* **Form & Validation** → `flutter_form_builder` + validator.
* **Networking** → `dio` + `http` dengan interceptor.
* **Authorization (Policy / Gate)** → rencana mirip Laravel Policy.
* **Internationalization** → `intl`.
* **Local Storage** → `shared_preferences` + `flutter_secure_storage`.
* **Image & File Handling** → crop, picker, caching.
* **Utility & Helper** → `freezed`, `json_serializable`, `logger`, `rxdart`.
* **Dummy API** → login, profile, dll dengan delay seolah-olah API asli.

---

## 🚀 `Flast` (Flutter Starter Kit Generator)

Agar instalasi starter kit lebih cepat, tersedia package CLI bernama `flast`.

### Instalasi

Pastikan **FVM Flutter** sudah ditambahkan ke PATH Windows, contoh:

```
C:\Users\<username>\fvm\versions\3.32.5\bin
```

Cek Dart:

```bash
dart --version
```

Install **flast**:

```bash
dart pub global activate flast
```

Jalankan generator:

```bash
flast create
```

> ⚠️ Catatan: Untuk Windows gunakan **PowerShell/CMD**, bukan Git Bash (masih ada issue, akan diperbaiki nanti).

📦 Package ada di: [pub.dev/packages/flast](https://pub.dev/packages/flast)
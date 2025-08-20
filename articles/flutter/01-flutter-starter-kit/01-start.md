# Getting Started

- **Prologue**
   * Latar belakang
   * Tujuan starter kit
   * Fitur besar
- **FVM (Flutter Version Manager)**
   * Kenapa pakai FVM
   * Instalasi & konfigurasi PATH
   * Perintah dasar
- **`Flast` (Starter Kit Generator)**
   * Instalasi
   * Membuat project baru
- **Struktur Project**
   * Core
   * Data
   * Domain
   * Presentation
- **Request Lifecycle**
   * Alur data dari UI sampai API
   * Contoh use case (Login/Profile dummy)
- **Mason Bricks**
   * https://github.com/lyrihkaesa/bricks_flutter_starter_kit
   * Cara add brick
   * Contoh penggunaan

---
## 📦 Package List

| Package              | Type   | Kegunaan                                                      |
|-----------------------|--------|---------------------------------------------------------------|
| flutter_dotenv       | Main   | Load variabel dari file `.env` (API key, base URL, secret).   |
| logger               | Main   | Logging rapi & berwarna untuk debugging.                      |
| go_router            | Main   | Routing modern dengan support nested route & redirect.        |
| freezed_annotation   | Main   | Definisi data class immutable & union types.                  |
| json_annotation      | Main   | Definisi model untuk serialisasi JSON.                        |
| dio                  | Main   | HTTP client advanced (interceptor, retry, cancel).            |
| get_it               | Main   | Service locator untuk dependency injection.                   |
| injectable           | Main   | Deklarasi dependency injection (butuh generator).             |
| shared_preferences   | Main   | Local storage key-value sederhana.                            |
| freezed              | Dev    | Generator untuk `freezed_annotation`.                         |
| build_runner         | Dev    | Code generator (untuk freezed, json_serializable, injectable). |
| injectable_generator | Dev    | Generator kode untuk `injectable`.                            |
| json_serializable    | Dev    | Generator model JSON dari `json_annotation`.                   |
| flutter_lints        | Dev    | Aturan linting default Flutter.                               |

---

## 📦 Package List (Draft)

| Package                   | Tipe     | Kegunaan                                                                 |
|----------------------------|----------|--------------------------------------------------------------------------|
| provider                  | Main     | State management sederhana berbasis ChangeNotifier.                      |
| flutter_bloc              | Main     | State management berbasis BLoC pattern.                                  |
| rxdart                    | Main     | Reactive programming dengan Stream tambahan.                             |
| fpdart                    | Main     | Functional programming (Either, Option, dll).                            |
| path                      | Main     | Utility path untuk file system.                                          |
| connectivity_plus         | Main     | Mengecek status koneksi internet (WiFi/seluler).                         |
| intl                      | Main     | Internationalization (format tanggal, angka, dll).                       |
| image_cropper             | Main     | Crop gambar sebelum upload.                                              |
| image_picker              | Main     | Ambil gambar/video dari kamera/galeri.                                   |
| cached_network_image      | Main     | Load dan cache gambar dari network.                                      |
| flutter_secure_storage    | Main     | Penyimpanan lokal yang lebih aman (keychain/keystore).                   |
| http                      | Main     | HTTP client sederhana bawaan Flutter.                                    |
| path_provider             | Main     | Akses direktori sistem (temp, document, dll).                            |
| file_picker               | Main     | Pilih file dari sistem (pdf, doc, dll).                                  |
| open_file                 | Main     | Buka file dengan aplikasi eksternal.                                     |
| flutter_form_builder      | Main     | Membuat form lebih cepat dengan widget siap pakai.                       |
| form_builder_validator    | Main     | Validator input untuk form builder.                                      |
| form_builder_extra_fields | Main     | Field tambahan untuk form builder (dropdown, chip, dll).                 |
| salomon_bottom_bar        | Main     | Bottom navigation bar dengan animasi stylish.                            |
| ulid                      | Optional | Generate unique ID (alternatif UUID).                                    |

# List Task

Sip, jadi fokus dulu ke **Flutter side**.
Kalau tujuannya bikin **starter kit**, fitur awal jangan terlalu banyak, tapi harus **fundamental** supaya developer lain bisa extend dengan mudah.
Aku buatkan daftar **feature Flutter Starter Kit** yang *wajib* + *opsional* biar jelas roadmap kamu dan temanmu.

---

# 📋 Daftar Feature Flutter Starter Kit

## 1. 🔑 **Authentication Module**

> Feature inti yang hampir semua aplikasi butuh.

* [ ] **Register** (Form validation client + server).
* [ ] **Login** (Email/username + password).
* [ ] **Logout** (Clear token, call API logout).
* [ ] **Refresh Token** (kalau pakai JWT).
* [ ] **Profile (Me)** → get user info dari server.
* [ ] **State Management Auth** (authenticated vs unauthenticated flow).

---

## 2. 🧾 **Common Infrastructure**

> Pondasi yang dipakai semua fitur.

* [ ] **API Client (Dio/Chopper)** dengan interceptor untuk auth token.
* [ ] **Error Handling (Failure model)** → mapping `server / validation / connection / unknown`.
* [ ] **ResponseModel generic** (data, meta, permissions, errors).
* [ ] **Form Validation System** (client-side + server-side).
* [ ] **Dependency Injection** dengan `injectable + get_it`.
* [ ] **State Management** dengan `bloc + freezed`.
* [ ] **SecureStorage / SharedPref** untuk token & settings.
* [ ] **Router (GoRouter / AutoRoute)** untuk protected routes.

---

## 3. 🎨 **UI Essentials**

> Supaya developer cepat bikin tampilan dasar.

* [ ] **Theme + Dark Mode support**.
* [ ] **Custom Widgets**: Button, InputField, Snackbar, Loading, EmptyState.
* [ ] **FormBuilder Wrapper** (field + server error integration).
* [ ] **Generic List + Pagination** (infinity scroll / load more).
* [ ] **Permission-based UI** (hide/show button sesuai permissions dari API).

---

## 4. 📂 **Feature Example Modules**

> Modul contoh biar developer ngerti alur (mirip Laravel punya `User` resource).

* [ ] **User Management (contoh CRUD)**
  * List users (with pagination).
  * Create user (form validation).
  * Edit user.
  * Delete user.
* [ ] **Settings/Profile** (update password, update profile).

---

## 5. 🧪 **Testing & Dev Tools**

> Supaya starter kit profesional & siap dipakai tim.

* [ ] **Unit Test UseCase**.
* [ ] **Bloc Test** (auth & register bloc).
* [ ] **Widget Test** (form validation).
* [ ] **Mason Brick Flutter Feature** (auto-generate folder + file untuk feature baru).

---

## 6. 🚀 **Nice-to-Have (Opsional, bisa belakangan)**

* [ ] **Localization (multi-language)**.
* [ ] **Notification (FCM setup)**.
* [ ] **Offline-first support (Hive/Drift)**.
* [ ] **Error Logger** (Sentry/Crashlytics).
* [ ] **Theming system** (easy color/font switch).

---

📌 Jadi kalau diprioritaskan:

1. **Auth** dulu (supaya bisa login/logout).
2. **Infrastructure** (Failure, ResponseModel, API client, DI).
3. **UI Essentials** (Form, Validation, Generic List).
4. **Example CRUD (User Management)** → biar developer ngerti pattern.


----

analysis_options.yaml
 ```yaml
 linter:
	 rules:
		 prefer_relative_imports: true
 ```
---

# Prologue

Ini hanyalah starter kit yang saya buat untuk diri saya sendiri. Dimana saya sering mengerjakan project `Flutter` dengan backend `Laravel`, karena itulah saya membuat ini untuk membantu saya dalam membuat aplikasi flutter dengan mudah tanpa harus setup banyak hal.

> 💡 Idea
> Saya ingin membawa fitur bagus pada laravel ke dalam flutter.

---
## Catatan
- Saya masih bingung dimana saya harus meletakan middleware pada flutter, soalnya bisa dibuat pada `go_route`, `bloc`. 
- Saya masih bingung juga dimana saya harus meletakan `exception` karena API ada beberapa `exception` yang perlu di handle.
- Saya masih bingung membuat `Validation Rules` yang tepat untuk `Form`, karena saya inginnya beberapa validasi dijalankan disisi client terlebih dahulu sebelum dikirim ke server (walaupun server pasti ada validasi juga), ini supaya kita tidak membebani server.
- Saya masih bingung membuat api yang sesuai untuk `Policy/Gate` alias authorization yang bagus.

---
## Package

- Environment Variable
	- `flutter_dotenv`
- State Management
	- `flutter_bloc`
	- `provider`
- Dependency Injection
	- `injectable`
	- `get_it`
- Navigation Router
	- `go_router`
- Utility/Tools/Helper
	- `freezed_annotation json_annotation`
		- `build_runner freezed json_serializable‎ --dev`
	- `rxdart`
	- `fpdart‎
	- `path`
	- `connectivity_plus`
	- `logger`
- Internationalization
	- `intl`
- Image
	- `image_cropper`
	- `image_picker`
	- `cached_network_image`
- Local Storage  
  Untuk data yang bentuknya masa lampau bisa disimpan pada local storage karena tidak akan pernah berubah.
	- `shared_preferences`
	- `flutter_secure_storage`
- HTTP Client
	- `http`
	- `dio`
- File
	- `path_provider`
	- `file_picker`
	- `open_file`

- UI Widget
	- `flutter_form_builder`
	- `form_builder_validator`
	- `form_builder_extra_fields`
	- `salomon_bottom_bar`

- Unique ID (Optional)
	- `ulid`

## Struktur Directory

```txt
lib/
├── core/
│   ├── constants/
│   ├── enums/
│   ├── errors/
│   ├── extensions/
│   ├── utils/
│   ├── config/
│   └── lang/
├── data/
│   ├── datasources/
│   │   ├── local/
│   │   └── remote/
│   ├── models/
│   └── repositories_impl/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── presentation/
│   ├── blocs/
│   ├── pages/
│   │   ├── auth/
│   │   ├── home/
│   │   └── errors/
│   ├── widgets/
│   └── router/
└── main.dart
```

## Request Lifecycle


---
```bash
git clone https://github.com/lyrihkaesa/flutter_starter_kit.git nama-project
```

```bash
cd nama-project
```

```bash
git remote -v
```

```bash
git remote set-url origin ssh:repository-remote-kamu
```

```bash
git remote -v
```

```bash
ssh -T git@gitlab.com
```
- Welcome to GitLab, @kaesalyrih
- git@gitlab.com: Permission denied (publickey).
	- Buat ssh dilocal
	- Copy ssh kamu misal adadada.pub ke gitlab
	- gitlab.com/-/user_settings/ssh_keys 
		- Lalu copy ssh pub disana

```bash
ssh -T git@gitlab.com
```

```bash
git fetch origin --prune
```

```bash
git push origin --all
```

Seharusnya sudah ada di remote repository.

---

```bash
fvm list
```

```bash
fvm use 3.32.5
```

- Restart VSCode
`CTRL + SHIFT + P` > `Developer: Reload Window`

```bash
fvm flutter pub get
```

```bash
cp .env.example .env
```

Menghapus folder `android`, `ios`, `web`
```bash
rm -rf ios android web
```

- Powershell
```ps
Remove-Item -Recurse -Force ios, android, web
```

Membuat project flutter `android`, `ios`, `web` dengan org baru
```bash
fvm flutter create --org id.my.charapon --platforms android,ios,web -a kotlin -i swift .
```

```bash
fvm flutter create --org id.my.charapon --platforms android,ios,web --android-language kotlin --ios-language swift .
```

Terus jalankan projectnya.

---

```bash
fvm flutter // menggunakan flutter version yang global
flutter // menggunakan flutter version yang local
```

---
```bash
$ fvm use 3.32.5
Flutter SDK: SDK Version : 3.32.5 is not installed.
✔ Would you like to install it now? · yes 
✓ Flutter SDK: SDK Version : 3.32.5 installed! (87.8s)

No pubspec.yaml detected in this directory
✔ Would you like to continue? · yes 
Setting up Flutter SDK: 3.32.5

Checking Dart SDK version... 
Downloading Dart SDK from Flutter engine ... 
Expanding downloaded archive with 7z...
Building flutter tool... 
Running pub upgrade... 
Resolving dependencies... (10.3s)
Downloading packages... (51.5s)
Got dependencies.
Flutter 3.32.5 • channel stable • https://github.com/flutter/flutter.git
Framework • revision fcf2c11572 (7 weeks ago) • 2025-06-24 11:44:07 -0700
Engine • revision dd93de6fb1 (7 weeks ago) • 2025-06-24 07:39:37 -0700
Tools • Dart 3.8.1 • DevTools 2.45.1

✓ Flutter SDK: SDK Version : 3.32.5 is setup
Skipping "pub get" because no pubspec.yaml found.


✗ Requires administrator priviledges to run this command.

┌───────────────────────────────────────────────────────────────────────────────────┐
│ ⚠ You don't have the required priviledges to run this command.                   	│
│ Try running with sudo or administrator priviledges.		                     	│
│ If you are on Windows, you can turn on developer mode: https://bit.ly/3vxRr2M		│
└───────────────────────────────────────────────────────────────────────────────────┘
```
- Windows `Settings` > `Update & Security` > `For developers` > Enable/On ✅ `Developer Mode`
```bash
$ fvm use 3.32.5
Skipping "pub get" because no pubspec.yaml found.

✓ Project now uses Flutter SDK : SDK Version : 3.32.5
┌───────────────────────────────────────────────────────────────────┐
│ ✓ Running on VsCode, please restart the terminal to apply changes	│
└───────────────────────────────────────────────────────────────────┘
You can then use "flutter" command within the VsCode terminal.
```
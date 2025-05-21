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
	- `get_it` or `injectable`
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
│   ├── repositories/
│   └── exceptions/
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── usecases/
│   └── exceptions/
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

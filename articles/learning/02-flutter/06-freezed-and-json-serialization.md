# Freezed dan JSON Serialization

Selamat datang di `Freezed`, pembuat *code generator* untuk `data-classes/unions/pattern-matching/cloning`.

Package `freezed` dan `json_serializable` adalah salah satu package code generation.

## Motivasi

Memang Dart itu keren, tapi mendefinisikan "model" bisa jadi merepotkan. Kita mungkin harus:
- Mendefinisikan *constructor* dan *properties*
- Meng-override method `toString`, operator `==`, dan `hashCode`
- Mengimplementasikan method `copyWith` untuk menduplikasi objek
- Menangani *de/serialization*

Semua ini bisa membutuhkan ratusan baris kode, yang rentan terhadap kesalahan dan bisa sangat mengurangi keterbacaan model Anda.

Package `Freezed` mencoba mengatasi masalah ini dengan mengimplementasikan sebagian besar hal tersebut untuk Anda, sehingga Anda bisa lebih fokus pada definisi model Anda.

| Sebelumnya                                                 | Sesudahnya                                                |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| ![before](attachments/Pasted%20image%2020240308193302.png) | ![after](attachments/Pasted%20image%2020240308193324.png) |

## Menjalankan Build Runner

### Dart (Rekomendasi gunakan ini) 
Bisa digunakan di project flutter. Karena memang flutter itu dibuat menggunakan dart.  
Sekali eksekusi:
```bash
dart run build_runner build --delete-conflicting-outputs
```
Selalu memantau perubahan file dan melakukan build ulang file generated `*.freezed.dart` dan `*.g.dart`. Mirip seperti hot reload.
```bash
dart run build_runner watch --delete-conflicting-outputs
```

### Flutter  
Sekali eksekusi:
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```
Selalu memantau perubahan file dan melakukan build ulang file generated `*.freezed.dart` dan `*.g.dart`. Mirip seperti hot reload.
```bash
flutter pub run build_runner watch --delete-conflicting-outputs
```

## Pemasangan (Install)

Untuk menggunakan `Freezed`, Anda memerlukan pengaturan `build_runner/code-generator` yang umum.

Pertama, install `build_runner` dan `Freezed` dengan menambahkannya ke file `pubspec.yaml` Anda:
### Pasang Semua Package
Gak mau ribet pakai ini.
```bash
flutter pub add freezed_annotation json_annotation dev:build_runner dev:freezed dev:json_serializable
```

### Pasang Satu Persatu
Ada package yang sudah terpasang pakai ini.
```bash
flutter pub add --dev build_runner
```

```bash
flutter pub add freezed_annotation dev:freezed
```

Jika menggunakan `freezed` untuk generate method `fromJson/toJson`, silahkan tambahkan:
```bash
flutter pub add json_annotation dev:json_serializable
```

### `pubspec.yaml`

```yml title="./pubspec.yaml"
name: kaesa_app
description: A new Flutter project.
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=2.17.6 <3.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  # highlight-start
  # code generator (jangan salah peletakan depedencies)
  freezed_annotation: ^2.4.1
  json_annotation: ^4.8.1
  # highlight-end

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  # highlight-start
  # code generator (jangan salah peletakan depedencies)
  # dart run build_runner build --delete-conflicting-outputs
  build_runner: ^2.4.8
  freezed: ^2.4.7
  json_serializable: ^6.7.1
  # highlight-end

flutter:
  uses-material-design: true
```

Mengistal ini akan menambahkan tiga package:
- `build_runner`: perangkat untuk menjalankan code-generator
- `freezed`: pembuat kode (code generator)
- `freezed_annotation`: package yang berisi anotasi untuk `freezed`
---

## ⚠ Warning `invlid_annotation_target`

:::info
Disabling `invalid_annotation_target` warning and warning in generates files.
Mematikan peringatan  `invalid_annotation_target` dan peringatan di file yang dibuat oleh `freezed`.
:::

Jika Anda berencana menggunakan `freezed` bersama dengan `json_serializable`, versi terbaru dari `json_serializable` dan `meta` mungkin mengharuskan Anda untuk menonaktifkan peringatan `invalid_annotation_target`.

Untuk melakukannya, Anda dapat menambahkan yang berikut ini ke file `analysis_options.yaml` di root project Anda:

:::warning
The annotation `JsonSerializable` can only be used on classes.
:::

:::warning
The annotation `JsonKey` can only be used on fields or getters.
:::

Jika Anda mendapatkan warning di atas, silahkan tambahkan aturan (rules) untuk static analyzer pada file `analysis_options.yaml`.

### `analysis_options.yaml`

```yaml title="./analysis_options.yaml"
include: package:flutter_lints/flutter.yaml

# highlight-start
# info lengkap: https://github.com/rrousselGit/freezed/issues/488
analyzer:
  exclude:
    - '**/*.g.dart'
    - '**/*.freezed.dart'
  errors:
    invalid_annotation_target: ignore
# highlight-end

linter:
  rules:
```

## `.gitignore`

```gitignore title="./.gitignore"
# build_runner generated files from code generator
*.freezed.dart
*.g.dart
```

## Menjalankan Generator

Untuk menjalankan generator kode, jalankan perintah berikut:

```
dart run build_runner build
```

**Catatan:** Seperti kebanyakan generator kode, `freezed` akan membutuhkan Anda untuk both import anotasi (`freezed_annotation`) dan menggunakan kata kunci `part` di bagian atas file Anda.

Oleh karena itu, file yang ingin menggunakan `Freezed` akan dimulai dengan:

```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'my_file.freezed.dart';

```

**PERTIMBANGKAN** untuk juga mengimpor `package:flutter/foundation.dart`. Alasannya, mengimpor `foundation.dart` juga mengimpor kelas-kelas untuk membuat objek terbaca dengan baik di devtool Flutter. Jika Anda mengimpor `foundation.dart`, `Freezed` akan melakukannya secara otomatis untuk Anda.

## Membuat Model menggunakan Freezed

Lebih baik contoh daripada penjelasan abstrak yang panjang, jadi inilah contoh kelas Freezed yang umum:

```dart title="./lib/data/models/person_model.dart"
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart'; // for devtools

// wajib: mengaitkan "person_model.dart" kita dengan kode yang dihasilkan oleh Freezed
part 'person_model.freezed.dart';
// opsional: Karena class Person bersifat serializable, kita harus menambahkan baris ini.
// Tetapi jika Person tidak serializable, kita bisa melewatkannya.
part 'person_model.g.dart';

@freezed
class Person with _$Person {
  const factory Person({
    required String firstName,
    required String lastName,
    required int age,
  }) = _Person;

  factory Person.fromJson(Map<String, Object?> json)
      => _$PersonFromJson(json);
}
```

Potongan kode berikut mendefinisikan model bernama `Person`:
- `Person` memiliki 3 properti: `firstName`, `lastName`, dan `age`
- Karena kita menggunakan `@freezed`, semua properti kelas ini bersifat immutable (tidak dapat diubah).
- Karena kita mendefinisikan `fromJson`, kelas ini bersifat *de/serializable* (dapat diubah menjadi JSON dan sebaliknya). Freezed akan menambahkan metode `toJson` untuk kita.
- Freezed juga akan secara otomatis menghasilkan:
    - method `copyWith`, untuk menduplikasi objek dengan properti yang berbeda
    - override `toString` yang mencantumkan semua properti objek
    - override `operator ==` dan `hashCode` (karena `Person` bersifat immutable)

Dari contoh ini, kita dapat melihat beberapa hal:
- Diperlukan untuk menganotasi model kita dengan `@freezed` (atau `@freezed` / `@unfreezed`, lebih lanjut tentang itu nanti). Anotasi ini memberi tahu Freezed untuk menghasilkan kode untuk kelas itu.
- Kita juga harus menerapkan mixin dengan nama kelas kita, diawali dengan `_$`. Mixin ini yang mendefinisikan berbagai *properties/methods* objek kita.
- Saat mendefinisikan *constructor* dalam kelas Freezed, kita harus menggunakan kata kunci `factory` seperti yang ditunjukkan (`const` opsional).  
  Parameter *constructor* ini akan menjadi daftar semua properti yang dimiliki kelas ini.  
  Parameter **tidak** harus diberi nama dan wajib diisi (`required`). Jangan ragu untuk menggunakan parameter opsional posisi jika Anda mau!

## Mendefinisikan Kelas Mutable (bisa diubah) sebagai Pengganti Kelas Immutable

Sejauh ini, kita telah melihat bagaimana cara mendefinisikan model di mana semua propertinya bersifat `final` (tidak bisa diubah); tetapi Anda mungkin ingin mendefinisikan properti yang bisa diubah dalam model Anda.

Freezed mendukung ini, dengan mengganti anotasi `@freezed` dengan `@unfreezed`:
```dart
@unfreezed
class Person with _$Person {
  factory Person({
    required String firstName,
    required String lastName,
    required final int age,
  }) = _Person;

  factory Person.fromJson(Map<String, Object?> json)
      => _$PersonFromJson(json);
}
```

Ini mendefinisikan model yang sebagian besar identik dengan cuplikan kode kita sebelumnya, tetapi dengan perbedaan berikut:
- `firstName` dan `lastName` sekarang bisa diubah. Oleh karena itu, kita dapat menulis:  
```dart
void main() {
  var person = Person(firstName: 'John', lastName: 'Smith', age: 42);

  person.firstName = 'Mona';
  person.lastName = 'Lisa';
}
```
- `age` masih tidak bisa diubah, karena kita secara eksplisit menandai properti tersebut sebagai `final`.  
- `Person` tidak lagi memiliki implementasi `==/hashCode` khusus:
```dart
void main() {
  var john = Person(firstName: 'John', lastName: 'Smith', age: 42);
  var john2 = Person(firstName: 'John', lastName: 'Smith', age: 42);

  print(john == john2); // false
}
```
- Tentu saja, karena kelas `Person` kita bisa diubah, maka tidak mungkin lagi untuk membuat instance-nya menggunakan `const`.

## Mengizinkan Mutasi List/Map/Set

Secara default, ketika menggunakan `@freezed` (tetapi tidak `@unfreezed`), properti dengan tipe `List`/`Map`/`Set` diubah menjadi immutable (tidak dapat diubah).

Ini berarti bahwa menulis kode berikut akan menyebabkan exception runtime:

```dart
@freezed
class Example with _$Example {
  factory Example(List<int> list) = _Example;
}

void main() {
  var example = Example([]);
  example.list.add(42); // akan menghasilkan exception karena kita mencoba mengubah collection
}
```

Perilaku ini dapat dinonaktifkan dengan menulis:
```dart
@Freezed(makeCollectionsUnmodifiable: false)
class Example with _$Example {
  factory Example(List<int> list) = _Example;
}

void main() {
  var example = Example([]);
  example.list.add(42); // Tidak akan eror
}
```


### Bagaimana `copyWith` Bekerja

Seperti yang dijelaskan sebelumnya, ketika kita mendefinisikan sebuah model menggunakan Freezed, maka code-generator akan secara otomatis menghasilkan metode `copyWith` untuk kita. Metode ini digunakan untuk mengkloning sebuah objek dengan nilai yang berbeda.

Misalnya jika kita mendefinisikan:

```dart
@freezed
class Person with _$Person {
  factory Person(String name, int? age) = _Person;
}
```

Maka kita bisa menulis:
```dart
void main() {
  var person = Person('Remi', 24);

  // `age` tidak diberikan, nilainya masih sama
  print(person.copyWith(name: 'Dash')); // Person(name: Dash, age: 24)
  // `age` diatur menjadi `null`
  print(person.copyWith(age: null)); // Person(name: Remi, age: null)
}
```

Perhatikan bahwa Freezed mendukung `person.copyWith(age: null)`.


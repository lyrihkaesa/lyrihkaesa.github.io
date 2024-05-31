# Tema di Flutter

Salah satu pertanyaan paling umum yang diajukan developer saat bekerja dengan Flutter adalah cara mengelola tema secara efisien untuk membuat UI yang menarik secara visual dan konsisten di seluruh aplikasi mereka. Tema (Themes) adalah bagian sistem desain (design system) yang kami gunakan. Aplikasi Flutter biasanya menggunakan Desain Material atau Cupertino, namun artikel ini berfokus pada tema dengan Desain Material 3.

## Memahami Tema Flutter Material Design

Material Design 3 adalah sistem desain terbaru Google untuk membuat aplikasi dan websites. Sebelum mempelajari tema, Anda harus membaca tentang `design system`. Theme di Flutter adalah kumpulan pasangan property-value yang menentukan tampilan widget aplikasi. `ThemeData` adalah kelas yang bertanggung jawab untuk menyimpan properti ini. Pertama-tama mari kita pahami pentingnya `ThemeData` dan bagaimana hal itu membantu dalam menentukan tema.

## `ThemeData`

Kelas `ThemeData` merangkum properti `colors`, `typography`, dan `shape` pada tema Material Design. Kami biasanya menggunakan sebagai argumen untuk widget `MaterialApp`, yang kemudian menerapkan tema tersebut ke semua widget turunannya.

## Membuat Tema Custom

Buatlah instance `ThemeData` dan berikan nilai pada propertinya yang ingin Anda sesuaikan. Mari buat tema kustom dan terapkan pada aplikasi Flutter kita. Anda dapat mencobanya di [Dartpad](https://dartpad.dev/). Cukup modifikasi aplikasi default yang sudah ada di sana. Pastikan Anda mengatur `useMaterial3` menjadi `true` karena ini memberi tahu Flutter bahwa Anda ingin menggunakan versi terbaru dari Material Design, yaitu versi tiga. Secara default Flutter 3.16 `useMaterial3: true`, jadi tidak perlu menambahkannya juga sudah upgrade.

```dart
ThemeData lightTheme = ThemeData(
  brightness: Brightness.light,
  // useMaterial3: true, // true in Flutter 3.16
  textTheme: const TextTheme(
    displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    bodyLarge: TextStyle(fontSize: 18, color: Colors.black87),
  ),
  appBarTheme: const AppBarTheme(
    color: Colors.blue,
    iconTheme: IconThemeData(color: Colors.white),
  ),
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
);
```

## Terapkan instance `ThemeData`

Kirimkan tema kustom ke properti `theme` dari widget `MaterialApp`.

```dart
MaterialApp(
  title: 'Custom Theme Demo',
  theme: lightTheme,
  home: MyHomePage(),
);
```

## Menggunakan Properti Tema

Akses properti ThemeData dengan metode `Theme.of(context)`. Berikut contoh penggunaan warna utama (primary color) dan tema teks dalam sebuah widget Text:

```dart
Text(
  'Hello, Flutter!',
  style: Theme.of(context).textTheme.headlineMedium,
);
```

## Dark and Light Themes

Flutter juga memungkinkan Anda untuk menentukan tema terpisah untuk mode gelap dan terang. Anda dapat mengatur properti `darkTheme` dari widget `MaterialApp`. Pastikan Anda mengatur properti `brightness` dari `ColorScheme` menjadi `Brightness.dark` untuk menunjukkan bahwa ini adalah tema gelap.

```dart
ThemeData darkTheme = ThemeData(
  textTheme: const TextTheme(
    displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    bodyLarge: TextStyle(fontSize: 18, color: Colors.white70),
  ),
  appBarTheme: const AppBarTheme(
    color: Colors.red,
    iconTheme: IconThemeData(color: Colors.white),
  ),
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.red,
    brightness: Brightness.dark, //<-- SEE HERE
  ),
);
```

## Menerapkan Instants ThemeData Gelap

Ini memberi tahu Flutter bahwa ada dua tema: terang dan gelap. Flutter secara otomatis beralih antara kedua tema tersebut berdasarkan pengaturan kecerahan perangkat.

```dart
MaterialApp(
  title: 'Custom Theme Demo',
  theme: lightTheme,
  darkTheme: darkTheme, //<-- SEE HERE
  home: MyHomePage(),
);
```

Anda juga dapat secara manual mengatur mode tema menjadi terang atau gelap menggunakan properti `themeMode` dari widget `MaterialApp`. Jika Anda melakukannya, aplikasi Flutter akan mengabaikan pengaturan kecerahan perangkat Anda dan menggunakan tema yang Anda tentukan.

```dart
MaterialApp(
  title: 'Custom Theme Demo',
  theme: lightTheme,
  darkTheme: darkTheme,
  themeMode: ThemeMode.light, //<-- SEE HERE
  home: MyHomePage(),
);
```

## Pentingnya `ColorScheme` dalam Material Design 3

Widget Flutter memberikan perhatian khusus pada `ColorScheme` dalam data tema Anda. Mereka menggunakan warna di sini sebagai nilai warna default.

### Apa itu `ColorScheme`?

`ColorScheme` adalah sebuah kelas yang menentukan set warna yang dapat digunakan oleh aplikasi Anda. Ini harus memiliki set warna yang kohesif dan mengikuti `sistem warna (color system)` Material Design. Ini berisi properti untuk warna utama, sekunder, permukaan, latar belakang, kesalahan, dan warna lain yang membentuk palet warna aplikasi Anda.

Dalam Material Design 3, `ColorScheme` memainkan peran yang lebih signifikan. Ini menentukan warna default untuk banyak widget dan menyediakan cara yang mudah untuk membuat tema adaptif yang berfungsi baik dalam mode terang dan gelap.

## Warna default dalam Material Design 3

Tujuan utama dari `ColorScheme` adalah untuk menentukan serangkaian warna default untuk aplikasi Anda, yang kemudian diterapkan pada berbagai widget dan elemen UI. Dalam Material Design 3, banyak komponen dan tema mengandalkan `ColorScheme` untuk menentukan warna default mereka. Ini memudahkan pembuatan palet warna yang konsisten untuk aplikasi Anda sambil mematuhi pedoman Material Design.

Saat membuat objek `ThemeData` untuk aplikasi Anda, Anda dapat menentukan `ColorScheme` kustom dengan menggunakan `ColorScheme.fromSeed()` (direkomendasikan untuk Material Design 3) atau dengan menentukan setiap properti warna secara individual. Contoh ini menghasilkan warna dari seed color biru.

```dart
ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.blue,
  ),
)
```

## Mengidentifikasi Bagaimana Widget Mendapatkan Warna Default Mereka

Widget mendapatkan warna default mereka dari `ColorScheme`. Setiap widget memiliki serangkaian properti khusus yang menentukan berbagai warna yang digunakan. Sebagai contoh, `TextButton` mendapatkan warna teks depan dari `ColorScheme.primary`. Dalam contoh ini, teks tombol ditampilkan sebagai warna hijau.

```dart
import 'package:flutter/material.dart';

void main() => runApp(
      MaterialApp(
        theme: ThemeData(
          brightness: Brightness.light,
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.blue,
          ).copyWith(
            primary: Colors.green,
          ),
        ),
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: TextButton(
            onPressed: () {},
            child: const Text('test'),
          ),
        ),
      ),
    );
```

Sayangnya, tidak ada cara yang sesuai untuk menentukan properti `ColorScheme` mana yang digunakan oleh widget karena mereka menggunakan properti warna yang berbeda untuk warna default mereka. Sumber utama untuk mempelajari hal ini adalah a) kode sumber Flutter dan b) dokumentasi.

Anda tidak selalu akan menemukan jawabannya dalam dokumentasi, jadi lihatlah kode sumber widget tersebut. Flutter bersifat open-source; Anda dapat melihat kode sumber untuk setiap widget untuk melihat persis bagaimana cara kerjanya. Cukup tekan ctrl+klik (atau cmd+klik di macOS) pada nama widget di editor Anda jika Anda menggunakan IDE seperti VSCode atau Android Studio, dan itu seharusnya membawa Anda ke definisi dalam kode sumber.

Button memiliki metode `defaultStyleOf` yang mengembalikan `ButtonStyle`. Contoh ini berasal dari kode sumber Flutter dan mengembalikan nilai default dari `_TextButtonDefaultsM3`.

```dart
@override
  ButtonStyle defaultStyleOf(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final ColorScheme colorScheme = theme.colorScheme;

    return Theme.of(context).useMaterial3
      ? _TextButtonDefaultsM3(context)
      : styleFrom(
        // [This code is irrelevant for Material Design 3]
        );
  }
```

Berikut adalah definisi dari kelas `_TextButtonDefaultsM3`. Sebagian besar widget memiliki kelas yang diakhiri dengan `DefaultsM3` yang dapat Anda temukan dalam file sumber kode widget tersebut. Kode ini menunjukkan bagaimana widget mengambil warna teks depan dari properti `ColorScheme.primary` saat tombol diaktifkan.

```dart
class _TextButtonDefaultsM3 extends ButtonStyle {
  _TextButtonDefaultsM3(this.context)
   : super(
       animationDuration: kThemeChangeDuration,
       enableFeedback: true,
       alignment: Alignment.center,
     );

  final BuildContext context;
  late final ColorScheme _colors = Theme.of(context).colorScheme;

  // ...

  @override
  MaterialStateProperty<Color?>? get foregroundColor =>
    MaterialStateProperty.resolveWith((Set<MaterialState> states) {
      if (states.contains(MaterialState.disabled)) {
        return _colors.onSurface.withOpacity(0.38);
      }
      return _colors.primary;
    });

  // ...
}
```

Anda sebaiknya mencoba menggunakan warna-warna `ColorScheme` karena jika Anda melakukannya dengan benar, aplikasi Anda secara otomatis akan sesuai dengan pedoman Material Design dan memiliki skema warna yang konsisten. Namun, Anda juga dapat mengganti warna untuk widget tertentu di tingkat tema. Ini dapat menjadi jalan pintas untuk menemukan warna default `ColorScheme`, tetapi ini berarti Anda hanya mengubah warna untuk widget tertentu. Widget yang seharusnya memiliki warna yang sama sesuai dengan Material Design 3 mungkin berakhir dengan warna yang berbeda.

## Mengganti Warna Default

Dalam Material Design 3, `ElevatedButton`, `OutlinedButton`, dan `TextButton` semuanya menggunakan `ColorScheme` untuk mendapatkan warna default mereka. Namun, Anda dapat mengganti warna default untuk widget-widget ini dengan mengatur properti `style` dari tombol tertentu atau dengan mengganti style khusus dari jenis tombol tersebut.

Sebagai contoh, Anda dapat mengganti warna latar belakang hanya untuk `ElevatedButton` seperti ini. Perhatikan bahwa kita perlu mengonversi warna ke `MaterialStateProperty<Color?>`. Hal ini karena warna latar belakang dapat berubah tergantung pada status tombol. Contoh ini membuat tombol menjadi warna merah dalam setiap statusnya.

```dart
ThemeData theme = ThemeData(
  elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
    backgroundColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) => Colors.red,
    ),
  )),
  useMaterial3: true,
);
```

Ingatlah bahwa meskipun Anda dapat mengatur `buttonStyle` pada tema, ini sering kali memiliki sedikit atau tidak ada efek. Anda mungkin berpikir bahwa ini akan membuat tombol muncul dalam warna merah, tetapi kenyataannya tidak demikian.

```dart
import 'package:flutter/material.dart';

void main() => runApp(
      MaterialApp(
        theme: ThemeData(
          buttonTheme: const ButtonThemeData(buttonColor: Colors.red),
          useMaterial3: true,
        ),
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: ElevatedButton(
            onPressed: () {},
            child: const Text('test'),
          ),
        ),
      ),
    );
```

## Contoh Lengkap

Contoh ini memungkinkan Anda beralih antara tiga mode tema untuk melihat bagaimana tampilan tema gelap dan terangnya. Anda dapat memodifikasi kode untuk melihat bagaimana berbagai warna diterapkan pada widget-widget.

```dart
import 'package:flutter/material.dart';

ThemeData lightTheme = ThemeData(
  brightness: Brightness.light,
  useMaterial3: true,
  textTheme: const TextTheme(
    displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    bodyLarge: TextStyle(fontSize: 18, color: Colors.black87),
  ),
  appBarTheme: const AppBarTheme(
    color: Colors.blue,
    iconTheme: IconThemeData(color: Colors.white),
  ),
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
);

ThemeData darkTheme = ThemeData(
  brightness: Brightness.dark,
  textTheme: const TextTheme(
    displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    bodyLarge: TextStyle(fontSize: 18, color: Colors.white70),
  ),
  appBarTheme: const AppBarTheme(
    color: Colors.red,
    iconTheme: IconThemeData(color: Colors.white),
  ),
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.red)
      .copyWith(brightness: Brightness.dark),
);
void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.light;

  IconData get _themeModeIcon {
    switch (_themeMode) {
      case ThemeMode.light:
        return Icons.brightness_low;
      case ThemeMode.dark:
        return Icons.brightness_3;
      case ThemeMode.system:
      default:
        return Icons.brightness_auto;
    }
  }

  void _toggleThemeMode() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light
          ? ThemeMode.dark
          : _themeMode == ThemeMode.dark
              ? ThemeMode.system
              : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: _themeMode,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Theme Toggler'),
          actions: [
            IconButton(
              icon: const Icon(Icons.brightness_6),
              onPressed: _toggleThemeMode,
            ),
          ],
        ),
        body: Center(
          child: MyWidget(
            themeMode: _themeMode,
            themeModeIcon: _themeModeIcon,
          ),
        ),
      ),
    );
  }
}

class MyWidget extends StatelessWidget {
  final ThemeMode themeMode;
  final IconData themeModeIcon;

  const MyWidget(
      {required this.themeMode, required this.themeModeIcon, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Hello, World!',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 20),
        Text(
          'Current Theme Mode: ${themeMode.toString().split('.').last}',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        const SizedBox(height: 10),
        Icon(themeModeIcon, size: 48),
      ],
    );
  }
}
```

## Memodifikasi Typography dengan `TextStyles`

Typography adalah aspek penting dari Material Design, dan `ThemeData` Flutter memungkinkan Anda menyesuaikan tipografi aplikasi Anda. Ini termasuk penyesuaian ukuran font, bobot, dan warna untuk berbagai gaya teks. Properti `textTheme` dari `ThemeData` berisi objek `TextTheme`, yang pada gilirannya memiliki serangkaian properti `TextStyle` yang telah ditentukan sebelumnya. Properti-properti ini mewakili gaya teks yang berbeda seperti headlines, body text, captions, dll. Anda dapat memodifikasi properti-properti `TextStyle` untuk menyesuaikan tipografi untuk setiap gaya. Berikut adalah contoh pengaturan ukuran dan bobot font.

```dart
ThemeData lightTheme = ThemeData(
  textTheme: const TextTheme(
    displayLarge: TextStyle(
        fontSize: 96, fontWeight: FontWeight.w300, color: Colors.black),
    displayMedium: TextStyle(
        fontSize: 60, fontWeight: FontWeight.w400, color: Colors.black),
    displaySmall: TextStyle(
        fontSize: 48, fontWeight: FontWeight.w400, color: Colors.black),
    headlineMedium: TextStyle(
        fontSize: 34, fontWeight: FontWeight.w400, color: Colors.black),
    headlineSmall: TextStyle(
        fontSize: 24, fontWeight: FontWeight.w400, color: Colors.black),
    titleLarge: TextStyle(
        fontSize: 20, fontWeight: FontWeight.w500, color: Colors.black),
    bodyLarge: TextStyle(
        fontSize: 16, fontWeight: FontWeight.w400, color: Colors.black87),
    bodyMedium: TextStyle(
        fontSize: 14, fontWeight: FontWeight.w400, color: Colors.black87),
    bodySmall: TextStyle(
        fontSize: 12, fontWeight: FontWeight.w400, color: Colors.black54),
    labelLarge: TextStyle(
        fontSize: 14, fontWeight: FontWeight.w500, color: Colors.white),
  ),
);
```

Anda dapat menggunakan gaya-gaya ini dalam aplikasi Anda dengan menggunakan properti `Theme.of(context).textTheme`, dan `TextStyle` default dari widget `Text` adalah `bodyMedium`. Contoh ini menunjukkan bagaimana mengatur gaya teks, bagaimana widget `Text` mengambil gaya default, dan bagaimana menggunakan `TextStyle` bernama dari tema.

## Theme Shapes

Menentukan bentuk pada tingkat tema di Flutter memastikan desain Anda tetap konsisten, menjadikan aplikasi Anda lebih intuitif dan menarik bagi pengguna. Bentuk dalam Material Design 3 dapat sederhana atau kompleks, menambah kedalaman dan meningkatkan hierarki visual antarmuka pengguna. Dari sudut yang halus hingga sudut potong yang berani dan ekspresif, variasi bentuk dapat berdampak signifikan pada tampilan dan fungsionalitas desain.

Untuk menentukan bentuk pada tingkat tema, tentukan parameter `shape` dari tema widget seperti ini.

```dart
ThemeData(
  useMaterial3: true,
  cardTheme: CardTheme(
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(4.0),
    ),
  ),
)
```

Tema menetapkan bentuk default untuk widget, dan Anda dapat merujuk bentuk tersebut dari `Theme`.

```dart
Card(
  shape: Theme.of(context).cardTheme.shape,
  child: const SizedBox(
    width: 100,
    height: 100,
  ),
),
```

Berikut adalah contoh lengkapnya. Kartu pertama menggunakan bentuk default, dan kartu kedua menggunakan bentuk kustom.

```dart
import 'package:flutter/material.dart';

void main() => runApp(
      MaterialApp(
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.red)
              .copyWith(surface: Colors.pink),
          cardTheme: CardTheme(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(4.0),
            ),
          ),
        ),
        debugShowCheckedModeBanner: false,
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Card(
                    child: SizedBox(
                      width: 100,
                      height: 100,
                    ),
                  ),
                  Card(
                    shape: (Theme.of(context).cardTheme.shape
                            as RoundedRectangleBorder)
                        .copyWith(
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: const SizedBox(
                      width: 100,
                      height: 100,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );

```

## Kesimpulan

Memahami tema Material Design 3 Flutter merupakan kunci desain aplikasi modern, jadi luangkan waktu untuk mengunjungi situs Material Design untuk mempelajari lebih lanjut tentang sistem ini dan bagaimana menggunakannya dalam aplikasi Anda. Kembali ke panduan ini ketika Anda membutuhkan gambaran umum, tetapi ingatlah untuk meluangkan waktu membaca dokumentasi resmi. Selain itu, bereksperimenlah dengan tema di Dartpad. Ini akan menghemat banyak waktu. Terakhir, ingatlah bahwa Anda mungkin perlu memeriksa kode Flutter yang sebenarnya dari widget untuk mengetahui dari mana mereka mendapatkan nilai tema default mereka.

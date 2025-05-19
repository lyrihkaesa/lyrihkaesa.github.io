# Button State

## Enabled (Aktif)

Ini adalah state default di mana tombol dapat diinteraksikan dan merespons sentuhan pengguna. Tombol ini dapat digunakan untuk menjalankan tindakan yang terkait dengannya.

```dart
ElevatedButton(
  onPressed: () {}, //<-- SEE HERE
  child: const Text('Enabled Button'),
)
```
## Disabled (Nonaktif)

Ini adalah state di mana tombol tidak dapat diinteraksikan dan tidak akan merespons sentuhan pengguna. Biasanya digunakan ketika suatu kondisi atau persyaratan tertentu belum terpenuhi.

```dart
ElevatedButton(
  onPressed: null, //<-- SEE HERE
  child: const Text('Disabled Button'),
)
```
## Hovered (Melayang)

Ini adalah state di mana kursor berada di atas tombol (ketika aplikasi dijalankan di desktop) tanpa sentuhan pengguna. Ini dapat digunakan untuk memberikan respons visual tambahan ketika pengguna mengarahkan kursor ke tombol.

```dart
ElevatedButton(
  onPressed: () {},
  onHover: (value) {},
  child: const Text('Disabled Button'),
)
```
## Focused (Difokuskan)

Ini adalah state di mana tombol mendapatkan fokus, yang biasanya terjadi ketika pengguna menggunakan keyboard atau navigasi fokus. Ini berguna untuk aplikasi yang mendukung interaksi keyboard.

```dart
ElevatedButton(
  onPressed: () {},
  onFocusChange: (hasFocus) { 
  // Lakukan sesuatu ketika tombol difokuskan atau kehilangan fokus 
  },
  child: const Text('Disabled Button'),
)
```
## Pressed (Ditekan)

Ini adalah state yang terjadi ketika tombol ditekan oleh pengguna. Tombol dapat menampilkan efek visual tambahan atau memicu aksi tertentu selama periode ini.

```dart
ElevatedButton(
  onPressed: () {}, //<-- SEE HERE
  child: const Text('Enabled Button'),
)
```
Sama dengan enabled.

## Loading / Busy (Menunggu / Sibuk)

Penamaan `isLoading` or `isBusy`.

State button "Loading" atau "Busy" merujuk pada kondisi ketika tombol sedang menunggu atau sibuk melakukan suatu operasi, seperti pengambilan data dari server, pemrosesan, atau operasi asinkron lainnya. Selama periode ini, tombol akan menunjukkan indikasi visual bahwa suatu tindakan sedang berlangsung, dan biasanya tidak dapat diakses atau diaktifkan lagi oleh pengguna.

Beberapa karakteristik dari state button "Loading" atau "Busy" melibatkan:

1. **Penonaktifan Tombol:** Tombol menjadi tidak dapat diakses atau diaktifkan selama proses loading. Hal ini menghindari interaksi yang tidak diinginkan selama proses operasi berlangsung.    
2. **Indikator Aktivitas:** Tombol biasanya menampilkan indikator visual, seperti indikator loading (misalnya, `CircularProgressIndicator`), untuk memberi tahu pengguna bahwa operasi sedang berlangsung di latar belakang.
3. **Perubahan Tampilan:** Warna, teks, atau elemen visual lain pada tombol dapat diubah untuk memberikan umpan balik visual bahwa tombol sedang dalam keadaan "Loading" atau "Busy".

> my_elevated_button.dart

```dart
import 'package:flutter/material.dart';

class MyElevatedButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isLoading;

  const MyElevatedButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isLoading = false, // set default = false
  }) : super(key: key);

  @override
  _MyElevatedButtonState createState() => _MyElevatedButtonState();
}

class _MyElevatedButtonState extends State<MyElevatedButton> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: widget.isLoading ? null : widget.onPressed,
      child: _buildButtonChild(),
    );
  }

  Widget _buildButtonChild() {
    if (widget.isLoading) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(),
          SizedBox(width: 8),
          Text('Loading...'),
        ],
      );
    } else {
      return Text(widget.text);
    }
  }
}
```

Cara menggunakannya:

```dart
class MyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('MyElevatedButton Example'),
      ),
      body: Center(
        child: MyElevatedButton(
          text: 'Press Me',
          onPressed: () async {
            // Lakukan sesuatu, seperti pemrosesan data atau panggilan API
            await Future.delayed(Duration(seconds: 2));
          },
          isLoading: false, // Ganti dengan variabel boolean sesuai kebutuhan
        ),
      ),
    );
  }
}
```

## Expand Button by Parent's Size

### Menggunakan `CrossAxisAlignment` pada `Row` Widget:

Tambahkan property `crossAxisAlignment: CrossAxisAlignment.stretch` pada widget Row.

```dart
Row(
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: [
    // ... widgets lainnya
  ],
)
```

### Menggunakan `ButtonTheme`:
Bungkus tombol dengan `ButtonTheme` dan atur `minWidth: double.infinity` untuk memberikan batasan.

```dart
ButtonTheme(
  minWidth: double.infinity,
  child: MaterialButton(
    onPressed: () {},
    child: Text('Raised Button'),
  ),
)
```

### Menggunakan `ElevatedButton` dan `Container`:
Bungkus `ElevatedButton` dengan `Container` yang memiliki lebar infinity.

```dart
Container(
  width: double.infinity,
  child: ElevatedButton(
    onPressed: null,
    child: Text('NEXT'),
  ),
)
```

### Menggunakan `SizedBox` Widget:
Gunakan `SizedBox` dengan property `width: double.maxFinite`.

```dart
SizedBox(
  width: double.maxFinite,
  child: RaisedButton(
    // ... properti tombol lainnya
  ),
)
```

### Menggunakan `minWidth` pada `MaterialButton`:
Atur property `minWidth: double.maxFinite` pada `MaterialButton`.

```dart
MaterialButton(
  minWidth: double.maxFinite,
  onPressed: () {},
  child: Text("Button"),
)
```


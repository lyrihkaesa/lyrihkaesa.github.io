## Dio

Jika ingin upload file dengan progres bar, anda harus menggunakan `onSendProgress` pada dio dan gunakanlah `file.openRead()` atau `MultipartFile.fromFileSync(filepath)`. Jangan gunakan `Uint8List` atau `MultipartFile.fromBytes()`.

- https://stackoverflow.com/questions/61635094/flutter-how-to-increase-onsendprogress-calls-for-a-fluid-progress-bar-animation
- https://github.com/cfug/dio/issues/925
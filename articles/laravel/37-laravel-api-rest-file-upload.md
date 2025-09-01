# Strategi REST API File Upload (Laravel + Flutter)

Artikel ini membahas **strategi REST API File Upload** menggunakan **Laravel** (local & S3) serta implementasi di sisi **Flutter** dengan **Dio**. Setiap strategi akan dijelaskan **kelebihan & kekurangan** sebelum diberikan **contoh implementasi kode**.

---

## 📌 1. Strategi File Upload

### 1️⃣ File sebagai Properti dalam Resource Induk (Base64 di JSON)

**Contoh**: File dikirim dalam bentuk base64 string di dalam payload JSON.

**Kelebihan**

* Payload tetap JSON → lebih sederhana integrasi FE & BE.
* Tidak perlu endpoint khusus untuk file.
* Mudah di-testing pakai Postman.

**Kekurangan**

* Payload membengkak ±33% karena encoding base64.
* Tidak efisien untuk file besar (upload lambat, memory tinggi).
* Membebani API Gateway & BE (decode base64 → simpan binary).
* ❌ **Tidak mendukung progress upload secara akurat** (karena file sudah berupa string besar).

**Contoh Payload**

```json
{
  "name": "John Doe",
  "profile_pic": "data:image/jpeg;base64,/9j/4AAQSkZ..."
}
```

**Laravel Controller (decode base64)**

```php
public function store(Request $request)
{
    $request->validate(['profile_pic' => 'required|string']);

    $imageData = base64_decode(preg_replace('#^data:image/\\w+;base64,#i', '', $request->profile_pic));
    $fileName = uniqid().'.jpg';
    $path = storage_path('app/public/uploads/'.$fileName);

    file_put_contents($path, $imageData);

    return [
        'file_name' => $fileName,
        'file_url' => asset('storage/uploads/'.$fileName),
    ];
}
```

**Kekurangan di kode**: konsumsi memory besar kalau file >5MB.

---

### 2️⃣ File sebagai Child Resource (Multipart di Endpoint Tertentu)

**Contoh**: File diupload langsung via multipart ke endpoint resource induk.

**Kelebihan**

* Lebih efisien daripada base64 (langsung binary).
* Endpoint lebih semantik (misal `/users/{id}/avatar`).
* ✅ Mendukung progress upload (Dio → `onSendProgress`).

**Kekurangan**

* Endpoint jadi lebih banyak kalau resource punya banyak file.
* Tidak reusable lintas resource.

**Contoh Request cURL**

```bash
curl -X POST "https://api.example.com/users/123/avatar" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@profile.jpg"
```

**Laravel Controller**

```php
public function uploadAvatar(Request $request, $id)
{
    $request->validate(['file' => 'required|file|mimes:jpg,png|max:2048']);

    $path = $request->file('file')->store("avatars/$id", 'public');

    return [
        'file_name' => basename($path),
        'file_url' => asset('storage/'.$path)
    ];
}
```

**Kekurangan di kode**: setiap resource butuh method upload khusus.

---

### 3️⃣ File sebagai Resource Independen (🔥 Paling Fleksibel)

**Contoh**: File punya endpoint sendiri (`/uploads`), lalu direferensikan dari resource lain.

**Kelebihan**

* Paling fleksibel → file bisa dipakai lintas resource.
* Endpoint lebih bersih (`/uploads`, `/uploads/{id}`).
* Cocok untuk sistem skala besar.
* ✅ Mendukung progress upload (Dio → `onSendProgress`).

**Kekurangan**

* FE perlu dua langkah: upload file → simpan `file_id` atau `file_path` di resource induk.

**Contoh Laravel Controller**

```php
public function store(Request $request)
{
    $request->validate(['file' => 'required|file|mimes:jpg,png|max:2048']);

    $disk = env('FILESYSTEM_DISK', 'local');
    $path = $request->file('file')->store('uploads', $disk);
    $url = Storage::disk($disk)->url($path);

    return [
        'path' => $path,
        'file_name' => basename($path),
        'file_url' => $url,
    ];
}
```

**Catatan**: tidak selalu butuh `id`. Bisa juga pakai `path` sebagai identifier di DB. Namun `id` kadang dipakai agar lebih aman & mudah direlasikan (misalnya relasi `user → avatar_file_id`).

---

## 📌 2. Upload ke S3 vs Local

* **Local** → cocok untuk development atau aplikasi kecil.
* **S3** → cocok untuk production, file besar, scalable.
* Laravel cukup ganti `FILESYSTEM_DISK=s3` di `.env`.

**Contoh S3 Upload (Laravel Controller)**

```php
$path = $request->file('file')->store('uploads', 's3');
$url = Storage::disk('s3')->url($path);
```

### Signed Upload URL (S3 / MinIO / GCS)

Signed URL memungkinkan FE upload langsung ke storage tanpa lewat server BE (lebih efisien & scalable).

**Contoh Laravel Generate Signed URL (S3)**

```php
use Illuminate\Support\Facades\Storage;

public function getUploadUrl(Request $request)
{
    $request->validate(['file_name' => 'required', 'mime' => 'required']);

    $disk = Storage::disk('s3');
    $path = 'uploads/' . uniqid() . '_' . $request->file_name;

    $client = $disk->getDriver()->getAdapter()->getClient();
    $expiry = "+10 minutes";

    $command = $client->getCommand('PutObject', [
        'Bucket' => env('AWS_BUCKET'),
        'Key' => $path,
        'ContentType' => $request->mime
    ]);
    
    $presignedRequest = $client->createPresignedRequest($command, $expiry);
    $uploadUrl = (string) $presignedRequest->getUri();

    return [
        'upload_url' => $uploadUrl,
        'file_path' => $path
    ];
}
```

**Flutter Upload langsung ke S3 dengan Signed URL**

```dart
Future<void> uploadToSignedUrl(String filePath, String signedUrl) async {
  final dio = Dio();
  await dio.put(
    signedUrl,
    data: File(filePath).openRead(),
    options: Options(
      headers: {"Content-Type": "image/jpeg"},
    ),
    onSendProgress: (sent, total) {
      print("Progress: ${(sent / total * 100).toStringAsFixed(0)}%");
    },
  );
}
```

**Kelebihan**

* Server BE tidak menanggung beban file besar.
* Lebih scalable.
* Bisa kontrol akses private/public via policy.
* ✅ Mendukung progress upload (karena langsung pakai Dio stream).

**Kekurangan**

* Lebih kompleks implementasinya (FE butuh dua step: dapat signed URL → upload file).

### ❓ Multiple File Upload

* **Single Endpoint** bisa menerima array file (lebih simpel, tapi validasi per-file terbatas).
* **Lebih baik** buat endpoint tetap single-file, lalu FE lakukan upload paralel/berulang.

**Contoh Multiple File Upload Laravel**

```php
public function uploadMultiple(Request $request)
{
    $request->validate([
        'files.*' => 'required|file|mimes:jpg,png|max:2048'
    ]);

    $uploaded = [];
    foreach ($request->file('files') as $file) {
        $path = $file->store('uploads', 'public');
        $uploaded[] = [
            'file_name' => basename($path),
            'file_url' => asset('storage/'.$path)
        ];
    }

    return $uploaded;
}
```

**Kekurangan Multiple Upload dalam Satu Request**: Validasi sulit granular (misalnya satu file gagal, semua gagal). Best practice: upload file satu-satu supaya validasi & progress lebih jelas.

---

## 📌 3. Flutter (Dio) Implementasi

### a. Upload File dengan Progress

```dart
final dio = Dio();

Future<void> uploadFile(String filePath) async {
  String fileName = filePath.split('/').last;
  FormData formData = FormData.fromMap({
    "file": await MultipartFile.fromFile(filePath, filename: fileName),
  });

  await dio.post(
    "https://api.example.com/uploads",
    data: formData,
    onSendProgress: (sent, total) {
      print("Progress: ${(sent / total * 100).toStringAsFixed(0)}%");
    },
  );
}
```

**Kelemahan**: kalau strategi base64 dipakai, progress sulit dihitung akurat.

### b. Upload Multiple File dari Flutter

```dart
Future<void> uploadMultipleFiles(List<String> paths) async {
  final dio = Dio();
  for (final path in paths) {
    await uploadFile(path); // upload satu-satu
  }
}
```

---

## 📌 4. Ringkasan Dukungan Progress Upload

| Strategi                  | Dukungan Progress Upload |
| ------------------------- | ------------------------ |
| Base64 JSON               | ❌ Tidak akurat           |
| Multipart (Child)         | ✅ Didukung               |
| Resource Independen       | ✅ Didukung               |
| Signed URL (S3/MinIO/GCS) | ✅ Didukung               |

---

## 📌 5. Best Practice Ringkas

* ✅ Gunakan **Multipart Upload** untuk efisiensi.
* ✅ Pakai **resource independen** untuk fleksibilitas.
* ✅ Gunakan **Presigned URL** kalau file besar (langsung ke S3/minio).
* ❌ Hindari base64 untuk file >2MB.
* ✅ Selalu validasi file (mime, size).
* ✅ Simpan **path atau id** di DB, bukan file binary.
* ✅ Gunakan signed URL untuk kontrol akses **private/public** di S3. Untuk local, gunakan middleware Laravel.
* ✅ Untuk multiple file → lebih aman upload satu-satu.

---

Dengan pendekatan ini, kita bisa pilih strategi sesuai kebutuhan:

* **Base64** untuk prototyping cepat.
* **Child Resource** untuk kasus simpel.
* **Resource Independen** untuk sistem production skala besar.
* **Signed URL** untuk upload file besar & scalable.

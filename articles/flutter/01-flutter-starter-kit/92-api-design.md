# 📘 API Design Guide untuk Flutter Starter Kit

_(Laravel backend + Flutter frontend, support Sanctum & JWT Redis)_

## 1. Struktur Base URL

- Semua API prefiks di `/api/v1`  
- Contoh:
    - Login → `POST /api/v1/login`
    - Logout → `POST /api/v1/logout`
    - Refresh (JWT only) → `POST /api/v1/auth/refresh`
    - User profile → `GET /api/v1/me`

## 2. Auth Flow Perbandingan

### 🔹 Sanctum
- Token hanya **access token** → simpan DB
- Tidak ada refresh token.
- Token berlaku lama (atau sesuai config expiration).
- Logout → revoke token di server (`/logout`).
### 🔹 JWT + Redis
- Ada **2 token**: `access_token` (umur pendek, ex: 15 menit) + `refresh_token` (umur panjang, ex: 7 hari).
- Keduanya disimpan di Redis whitelist dengan TTL.
- Access token habis → pakai refresh token ke `/auth/refresh` untuk issue baru.
- Logout → hapus token di Redis whitelist.

## 3. Bentuk Response

### Login sukses
**Sanctum:**
```json
{
  "data": {
    "access_token": "xxx",
    "token_type": "Bearer",
    "user": {
      "id": 1,
      "email": "user@mail.com",
      "name": "John"
    }
  },
  "message": "Login success"
}
```

**JWT:**
```json
{
  "data": {
    "access_token": "xxx",
    "refresh_token": "yyy",
    "token_type": "Bearer",
	"expires_in": 900,
    "user": {
      "id": 1,
      "email": "user@mail.com",
      "name": "John"
    }
  },
  "message": "Login success",
}
```

### Refresh (JWT only)

```json
{
  "access_token": "new_access",
  "refresh_token": "new_refresh",
  "token_type": "Bearer",
  "expires_in": 900
}
```

### Error format

**Auth (OAuth2-style):**

```json
{
  "error": "invalid_grant",
  "error_description": "Invalid credentials"
}
```

**Validation (Laravel default):**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

---

## 4. Flutter Integration Guide

Di Flutter Starter Kit kamu buat lapisan `auth_repository.dart` → handle login, refresh, logout.  
Lalu di `dio_interceptor.dart` atur `Authorization` header.

### 🔹 Interceptor Workflow

1. Cek request path:    
    - `/login`, `/register`, `/forgot-password` → **tanpa Authorization**.
    - selain itu → tambahkan `Authorization: Bearer {token}`.
2. Kalau request dapat `401 Unauthorized`:
    - **Sanctum** → langsung logout (karena tidak ada refresh).
    - **JWT** → coba refresh token → ulangi request. Kalau gagal → logout.

---

## 5. Switching Strategy
**Kalau developer mau ganti dari Sanctum ke JWT:**
- **Backend**:
    - Tambah endpoint `/auth/refresh`        
    - Issue refresh token di `/login`
    - Simpan access + refresh ke Redis
- **Frontend (Flutter)**:
    - Ganti bagian `auth_repository` supaya simpan `refresh_token` di secure storage.
    - Update `dio_interceptor` untuk handle refresh flow.
    - Tidak perlu ubah UI atau repository lain.

**Kalau mau ganti dari JWT ke Sanctum:**
- **Backend**:
    - Hilangkan refresh endpoint.
    - Login hanya return `access_token`.        
- **Frontend**:
    - Hapus logika refresh token di interceptor.
    - Logout cukup hapus access token.

## 6. Best Practice Checklist
- Gunakan `Bearer {token}` standar di header.
- Pisahkan error format:
    - Auth → pakai `error`, `error_description`
    - Validation → pakai `message`, `errors`
- Selalu balikan `token_type` di response (biar konsisten).
- Simpan token di **SecureStorage** di Flutter, bukan SharedPrefs.
- Jangan campur user data dengan token di JWT mode (pakai `/me` untuk fetch user).
- Di Redis: TTL harus sesuai expiry token → biar auto-expire.

---

## ✅ Response Sukses (Data Object)

```json
{
  "data": {
    "id": 1,
    "email": "user@mail.com",
    "name": "John Doe"
  },
  "errors": {},
  "error": null,
  "error_description": null,
  "message": "Success",
  "meta": {}
}
```

---

## ✅ Response Sukses (Data List)

```json
{
  "data": [
    {
      "id": 1,
      "email": "user1@mail.com",
      "name": "John Doe",
      "can": {
	      "edit": true,
	      "delete": true,
	      "publish": true,
      },
    },
    {
      "id": 2,
      "email": "user2@mail.com",
      "name": "Jane Smith",
      "can": {
	      "edit": true,
	      "delete": true,
	      "publish": true,
      },
    }
  ],
  "errors": {},
  "error": null,
  "error_description": null,
  "message": "List fetched successfully",
  "meta": {
    "current_page": 1,
    "last_page": 10,
    "per_page": 20,
    "total": 200
  }
}
```

---

## ❌ Response Error Validasi (Laravel-style)

```json
{
  "data": null,
  "errors": {
    "email": [
      "The email field is required.",
      "The email must be a valid email address."
    ],
    "password": [
      "The password must be at least 8 characters."
    ]
  },
  "error": null,
  "error_description": null,
  "message": "The given data was invalid.",
  "meta": {}
}
```

---

## ❌ Response Error Auth (OAuth2-style / JWT)

```json
{
  "data": null,
  "errors": {},
  "error": "invalid_grant",
  "error_description": "Invalid username or password",
  "message": "Authentication failed",
  "meta": {}
}
```

---

## 🏗️ Model Konseptual di Flutter

```dart
class ResponseModel<T> {
  final T? data; // Bisa object atau list
  final Map<String, List<String>>? errors; // Validasi Laravel
  final String? error; // OAuth2/JWT error
  final String? errorDescription; // OAuth2/JWT error description
  final String? message; // Pesan umum
  final Map<String, dynamic>? meta; // Pagination, dsb.

  ResponseModel({
    this.data,
    this.errors,
    this.error,
    this.errorDescription,
    this.message,
    this.meta,
  });

  factory ResponseModel.fromJson(
      Map<String, dynamic> json,
      T Function(Object? json) fromJsonT,
  ) {
    return ResponseModel<T>(
      data: json['data'] != null ? fromJsonT(json['data']) : null,
      errors: (json['errors'] as Map?)?.map(
        (key, value) => MapEntry(key as String, List<String>.from(value)),
      ),
      error: json['error'] as String?,
      errorDescription: json['error_description'] as String?,
      message: json['message'] as String?,
      meta: json['meta'] as Map<String, dynamic>?,
    );
  }
}
```

> Dengan pola ini, `ResponseModel<User>` atau `ResponseModel<List<User>>` bisa dipakai sama tanpa perlu bikin banyak model response.
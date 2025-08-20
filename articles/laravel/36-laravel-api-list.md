# 📄 Dokumentasi API: List User (Best Practice)

## 1️⃣ Endpoint

| Method | URL      | Description         |
| ------ | -------- | ------------------- |
| GET    | `/users` | Fetch list of users |

---

## 2️⃣ Query Parameters

| Parameter       | Type   | Description                                                 |
| --------------- | ------ | ----------------------------------------------------------- |
| `page`          | int    | Page number (offset pagination, default: 1)                 |
| `limit`         | int    | Number of items per page (default: 20)                      |
| `last_id`       | int    | Cursor-based pagination, ambil record dengan `id > last_id` |
| `role`          | string | Filter by user role                                         |
| `status`        | string | Filter by user status                                       |
| `created_after` | date   | Filter users created after this date                        |
| `search`        | string | Full-text search (keyword search + optional advanced query) |

> Notes:
>
> - Jika `last_id` diberikan → **cursor-based pagination**
> - Jika `last_id` tidak ada → **offset pagination**
> - Filter opsional, bisa dikombinasi

---

## 3️⃣ Response Format

### 3.1 Offset Pagination

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "user1@mail.com",
      "can": { "edit": true, "delete": true, "publish": true }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 10,
    "per_page": 20,
    "total": 200
  },
  "permissions": { "create": true, "export": true, "import": false },
  "message": "Users fetched successfully"
}
```

### 3.2 Cursor-based Pagination (Sederhana)

```json
{
  "data": [
    {
      "id": 101,
      "name": "Jane Smith",
      "email": "user101@mail.com",
      "can": { "edit": true, "delete": false, "publish": true }
    }
  ],
  "meta": {
    "last_id": 110,
    "has_more": true
  },
  "permissions": { "create": true, "export": true, "import": false },
  "message": "Users fetched successfully"
}
```

> Meta cursor cukup sederhana: `last_id` + `has_more`.  
> Frontend tinggal pakai `meta.last_id` untuk request berikutnya.

---

## 4️⃣ Filter Handling

- **Simple filters**: `role`, `status`, `created_after` → query builder `where`
- **Range filters**: `_min` / `_max` suffix, misal `age_min`, `age_max`
- **Full-text / advanced search**: `search` param, bisa parse keyword & operator ala Google (`date:2025-01-01 -site:example.com`)
- **Hybrid**: structured filter + search string

---

## 5️⃣ Permissions

### 5.1 Global permissions (halaman / tombol umum)

```json
"permissions": {
  "create": true,
  "export": true,
  "import": false
}
```

### 5.2 Per-item permissions (aksi individual)

```json
"data": [
  {
    "id": 1,
    "name": "John Doe",
    "email": "user1@mail.com",
    "can": { "edit": true, "delete": true, "publish": true }
  }
]
```

> Gunakan untuk menentukan tampilan tombol per item di frontend.

---

## 6️⃣ Backend Laravel Example (Controller)

```php
$query = User::query();
$limit = $request->get('limit', 20);

// Apply filters
if ($request->filled('role')) $query->where('role', $request->role);
if ($request->filled('status')) $query->where('status', $request->status);
if ($request->filled('created_after')) $query->where('created_at', '>=', $request->created_after);
if ($request->filled('search')) {
    $search = $request->search;
    $query->where(function($q) use ($search) {
        $q->where('name', 'like', "%$search%")
          ->orWhere('email', 'like', "%$search%");
    });
}

if ($request->filled('last_id')) {
    // Cursor-based pagination
    $users = $query->where('id', '>', $request->last_id)
                   ->orderBy('id', 'asc')
                   ->limit($limit)
                   ->get();

    $lastUser = $users->last();
    $meta = [
        'last_id' => $lastUser?->id,
        'has_more' => $users->count() === $limit
    ];

    return UserResource::collection($users)
        ->additional([
            'meta' => $meta,
            'permissions' => [
                'create' => auth()->user()->can('create', User::class),
                'export' => auth()->user()->can('export', User::class),
                'import' => auth()->user()->can('import', User::class),
            ],
            'message' => 'Users fetched successfully'
        ]);
} else {
    // Offset pagination
    $users = $query->paginate($limit);

    return UserResource::collection($users)
        ->additional([
            'permissions' => [
                'create' => auth()->user()->can('create', User::class),
                'export' => auth()->user()->can('export', User::class),
                'import' => auth()->user()->can('import', User::class),
            ],
            'message' => 'Users fetched successfully'
        ]);
}
```

---

## Best Practices Ringkas

1. **Dual-mode pagination** → offset + cursor
2. **Meta sederhana** → `last_id` + `has_more` untuk cursor, `current_page/total/last_page` untuk offset
3. **Filter fleksibel** → structured + optional search string
4. **Permissions global & per-item** → untuk UI kontrol tombol
5. **ResponseEntity / `Either<Failure, Entity>`** → di repository/usecase Flutter
6. **Default limit** → jangan terlalu besar, misal 20-50 per request
7. **Cursor deterministik** → gunakan kolom unik & terurut (`id` atau timestamp + id)

Kalau mau, saya bisa buatkan versi **diagram flow BLoC → UseCase → Repository → API Laravel** yang langsung plug & play untuk starter kit Flutter-mu, lengkap dengan:

- Offset / cursor pagination
- Filter fleksibel + search
- Meta sederhana (`last_id` + `has_more`)
- Permissions global & per-item

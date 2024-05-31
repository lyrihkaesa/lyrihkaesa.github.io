# MinIO Laravel

## Konfigurasi Driver S3

Sebelum menggunakan driver `s3`, Anda perlu install package `Flysystem S3` melalui package manager `Composer`:

```bash
composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
```

Sebuah array konfigurasi disk S3 terletak di file konfigurasi `config/filesystems.php` Anda. Secara umum, Anda seharusnya mengonfigurasi informasi dan credentials S3 Anda menggunakan `environment variables` berikut yang dirujuk oleh file konfigurasi `config/filesystems.php`:

```env
AWS_ACCESS_KEY_ID=<your-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=<your-bucket-name>
AWS_USE_PATH_STYLE_ENDPOINT=false
```

Untuk kenyamanan, variabel lingkungan ini sesuai dengan konvensi penamaan yang digunakan oleh AWS CLI.

## Konfigurasi Driver S3 `MinIO` (By: Kaesa)

- Pada config file `config/filesystem.php` silahkan tambahkan `minio` dan `minio_public`.
```php
return [
	// ... kode disembunyikan
	'disks' => [
			
	        'local' => [
	            // ... kode disembunyikan
	        ],
	        
	        'public' => [
	            // ... kode disembunyikan
	        ],
	        
	        's3' => [
	            // ... kode disembunyikan
	        ],
	
	        // Minio Default (Privat)
	        'minio' => [
	            'driver' => 's3',
	            'key' => env('MINIO_ACCESS_KEY_ID'),
	            'secret' => env('MINIO_SECRET_ACCESS_KEY'),
	            'region' => env('MINIO_DEFAULT_REGION'),
	            'bucket' => env('MINIO_BUCKET'),
	            'url' => env('MINIO_URL'),
	            'endpoint' => env('MINIO_ENDPOINT'),
	            'use_path_style_endpoint' => env('MINIO_USE_PATH_STYLE_ENDPOINT', true),
	            'use_ssl' => env('MINIO_USE_SSL', false),
	            'throw' => env('MINIO_THROW', env('APP_DEBUG', false)),
	        ],
	        
	        'minio_public' => [
	            'driver' => 's3',
	            'key' => env('MINIO_PUBLIC_ACCESS_KEY_ID', env('MINIO_ACCESS_KEY_ID')),
	            'secret' => env('MINIO_PUBLIC_SECRET_ACCESS_KEY', env('MINIO_SECRET_ACCESS_KEY')),
	            'region' => env('MINIO_PUBLIC_DEFAULT_REGION', env('MINIO_DEFAULT_REGION')),
	            'bucket' => env('MINIO_PUBLIC_BUCKET'),
	            'url' => env('MINIO_PUBLIC_URL', env('MINIO_URL')),
	            'endpoint' => env('MINIO_PUBLIC_ENDPOINT', env('MINIO_ENDPOINT')),
	            'use_path_style_endpoint' => env('MINIO_PUBLIC_USE_PATH_STYLE_ENDPOINT', env('MINIO_USE_PATH_STYLE_ENDPOINT', true)),
	            'use_ssl' => env('MINIO_PUBLIC_USE_SSL', env('MINIO_USE_SSL', false)),
	            'throw' => env('MINIO_PUBLIC_THROW', env('MINIO_THROW', env('APP_DEBUG', false))),
	        ],
	    ],
];
```

- [Opsional] jika menggunakan paket filament `config/filament.php`:
```php
return [
	'default_filesystem_disk' => env('FILAMENT_FILESYSTEM_DISK', 'public'),
];
```

- Lalu tambahkan `key-value` pada `.env` seperti berikut:

- versi sederhana
```env
# Konfigurasi default filesystems
FILESYSTEM_DISK=minio # default: local

# [Opsional] Konfigurasi default filesystems package filament
FILAMENT_FILESYSTEM_DISK=minio_public #default: public

# Konfigurasi untuk bucket MinIO privat
MINIO_ACCESS_KEY_ID=<your-access-key-id>
MINIO_SECRET_ACCESS_KEY=<your-secret-access-key>
MINIO_DEFAULT_REGION=id-jkt-1-default # random
MINIO_BUCKET=your-bucket-private
MINIO_ENDPOINT=http://your-ip-address:9010 # default port minio: 9000
MINIO_USE_PATH_STYLE_ENDPOINT=true
MINIO_USE_SSL=false

# Konfigurasi untuk bucket MinIO publik
MINIO_PUBLIC_BUCKET=your-bucket-public
```

- versi lengkap
```env
# Konfigurasi default filesystems
FILESYSTEM_DISK=minio # default: local

# [Opsional] Konfigurasi default filesystems package filament
FILAMENT_FILESYSTEM_DISK=minio_public #default: public

# Konfigurasi untuk bucket MinIO privat
MINIO_ACCESS_KEY_ID=<your-access-key-id>
MINIO_SECRET_ACCESS_KEY=<your-secret-access-key>
MINIO_DEFAULT_REGION=id-jkt-1-default # random
MINIO_BUCKET=your-bucket-private
MINIO_URL=
MINIO_ENDPOINT=http://your-ip-address:9010 # default port minio: 9000
MINIO_USE_PATH_STYLE_ENDPOINT=true
MINIO_USE_SSL=false
MINIO_THROW=true

# Konfigurasi untuk bucket MinIO publik
MINIO_PUBLIC_ACCESS_KEY_ID=<your-access-key-id>
MINIO_PUBLIC_SECRET_ACCESS_KEY=<your-secret-access-key>
MINIO_PUBLIC_DEFAULT_REGION=id-jkt-1-default # random
MINIO_PUBLIC_BUCKET=your-bucket-public
MINIO_PUBLIC_URL=
MINIO_PUBLIC_ENDPOINT=http://your-ip-address:9010 # default port minio: 9000
MINIO_PUBLIC_USE_PATH_STYLE_ENDPOINT=true
MINIO_PUBLIC_USE_SSL=false
MINIO_PUBLIC_THROW=true
```
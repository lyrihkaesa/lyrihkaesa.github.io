# Pondok Mbodo v3

Pengurus

- unit itu badan lembaga.

```
league/flysystem-aws-s3-v3
```

```php
'minio' => [
            'driver' => 's3',
            'key' => env('MINIO_ACCESS_KEY_ID'),
            'secret' => env('MINIO_SECRET_ACCESS_KEY'),
            'region' => env('MINIO_DEFAULT_REGION'),
            'bucket' => env('MINIO_BUCKET'),
            'url' => env('MINIO_URL'),
            'endpoint' => env('MINIO_ENDPOINT'),
            'use_path_style_endpoint' => env('MINIO_USE_PATH_STYLE_ENDPOINT', false),
            'use_ssl' => env('MINIO_USE_SSL', false),
            'throw' => false,
        ],
```

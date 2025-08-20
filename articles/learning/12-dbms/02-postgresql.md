# PostgreSQL
## Ubah Password
```sql
ALTER USER casaos WITH PASSWORD 'new-password';
```
## Docker Bash PostgreSQL
```bash
sudo docker exec -it postgresql bash
```

- Langsung ke container username `postgres` dan directory `~/data`
```bash
sudo docker exec -it --user postgres postgresql bash -c "cd ~/data && exec bash"
```
### CasaOS Default
```bash
psql --username=casaos
```

## Menampilkan Daftar Database
- Lengkap
```bash
\list
```
- Singkatan:
```bash
\l
```

## Keluar dari username sekarang
```bash
\q
```
## Backup Database
```bash
pg_dump --host=127.0.0.1 --port=5432 --dbname=pondokmbodo --username=pondokmbodo --verbose --format=plain --file=pondokmbodo_backup.sql --password
```

```bash
pg_dump --host=90.90.90.90 --port=5432 --dbname=pondokmbodo --username=pondokmbodo --verbose --format=plain --file=pondokmbodo_backup.sql --password
```

```bash
pg_dump -h 90.90.90.90 -U pondokmbodo -d pondokmbodo -F c -b -v -f mydatabase.backup
```
## Restore Database
```bash
psql --username=casaos
```

```sql
DROP DATABASE IF EXISTS pondokmbodo_staging;
```

```sql
CREATE DATABASE pondokmbodo_staging OWNER pondokmbodo;
```

```bash
psql --host=127.0.0.1 --port=5432 --dbname=pondokmbodo_staging --username=pondokmbodo --file=pondokmbodo_backup.sql --password
```

```bash
psql --host=90.90.90.90 --port=5432 --dbname=pondokmbodo_restore --username=pondokmbodo --file=pondokmbodo_backup.sql --password
```

```bash
pg_restore -h 90.90.90.90 -U pondokmbodo -d pondokmbodo_restore -v mydatabase.backup
```

## 🐘 Instalasi PostgreSQL Client 15 di Ubuntu 24.04 dengan `signed-by` GPG Key (Tanpa `apt-key`)

Instalasi PostgreSQL client sering kali menghasilkan peringatan deprecated karena penggunaan `apt-key`. Berikut adalah cara **modern, aman, dan bersih** untuk menginstal PostgreSQL client versi 15 di Ubuntu 24.04 (Noble Numbat).

---

### 🔧 Langkah Instalasi PostgreSQL Client 15

#### 1. Tambahkan GPG Key PostgreSQL ke Format Modern

```bash
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/postgresql.gpg > /dev/null
```

#### 2. Tambahkan Repository PostgreSQL dengan `signed-by`

```bash
echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | \
sudo tee /etc/apt/sources.list.d/pgdg.list
```

#### 3. Update dan Install PostgreSQL Client

```bash
sudo apt update
sudo apt install postgresql-client-15
```

#### 4. Verifikasi Versi

```bash
psql --version
# Output: psql (PostgreSQL) 15.13
```

---

## 🔌 Cara Koneksi ke PostgreSQL Server

### 1. Koneksi Biasa (Password Prompt)

```bash
psql -h 127.0.0.1 -p 5432 -U postgres -d namadb
```

Akan muncul prompt password:

```
Password for user postgres:
```

---

### 2. Koneksi Tanpa Password (Menggunakan `.pgpass`)

Buat file `~/.pgpass` dan isi dengan format:

```
hostname:port:database:username:password
```

Contoh:

```
127.0.0.1:5432:namadb:postgres:supersecret
```

Lalu ubah permission:

```bash
chmod 600 ~/.pgpass
```

Sekarang kamu bisa konek tanpa password prompt:

```bash
psql -h 127.0.0.1 -p 5432 -U postgres -d namadb
```

---

### 3. Koneksi via SSH Tunnel (Mirip GUI client seperti TablePlus/DBeaver)

#### A. SSH Tunnel Manual

```bash
ssh -L 5433:localhost:5432 user@remotehost
```

Artinya:

- Port lokal `5433` akan diteruskan ke `localhost:5432` di server tujuan.

Kemudian dari terminal lain:

```bash
psql -h 127.0.0.1 -p 5433 -U postgres -d namadb
```

#### B. SSH Tunnel Satu Baris (Tanpa Interaktif)

```bash
ssh -fN -L 5433:localhost:5432 user@remotehost
```

---

## 🧠 Tips Tambahan

- Kamu bisa export SQL dari remote PostgreSQL via:

```bash
pg_dump -h host -U user -d namadb > backup.sql
```

- Restore bisa dilakukan via:

```bash
psql -h host -U user -d namadb < backup.sql
```

- Jika kamu berada di dalam container, kamu cukup install `postgresql-client-15` di host lalu koneksi ke container dengan IP atau network alias Docker.

---

## ✅ Penutup

Dengan pendekatan `signed-by`, kamu tidak hanya menghindari warning `trusted.gpg`, tapi juga mengikuti standar keamanan yang direkomendasikan Debian/Ubuntu. Ditambah lagi, berbagai metode koneksi di atas membuat client CLI PostgreSQL menjadi fleksibel bahkan untuk sistem otomatisasi dan scripting.
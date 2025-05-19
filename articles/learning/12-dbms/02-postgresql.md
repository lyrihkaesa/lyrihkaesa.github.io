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


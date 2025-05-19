# Docker Compose

## Installation
```bash
docker compose version
```

- old version
```bash
docker-compose
```

## YAML
https://yaml.org

```yaml
key: value
name: "Kaesa Lyrih"
hobbies:
	- Networking
	- Gaming
	- Coding
address:
	city: "Sofya"
	country: "Toram Online"
account:
	- email: kaesalyrih@gmail.com
	  name: "Kaesa Lyrih"
	- email: lyrihkaesa@gmail.com
	  name: "Lyrih Kaesa"
```

## `docker-compose.yaml`

```yaml
version: "3.8"

services:
	nginx-example:
		container_name: nginx-example
		image: nginx:latest
```


## Membuat Container
```bash
docker compose create
```

## Menjalankan Container
```bash
docker compose start
```

## Melihat Container
```bash
docker compose ps
```

## Menghentikan Container
```bash
docker compose stop
```

## Menghapus Container
```bash
docker compose down
```

## List Project Compose Name
```bash
docker compose ls
```

## `services`

- container list yang ingin dijalankan secara bersamaan.

## Komentar YAML
JSON tidak bisa menggunakan komentar.

```yaml
# Ini Komentar
```

## Ports




# Mikrotik `IP/Hotspot`

MikroTik HotSpot Gateway menyediakan authentication untuk client sebelum mengakses jaringan publik.

## Fitur HotSpot Gateway
- **Metode autentikasi klien yang berbeda:** Menggunakan database klien lokal pada router atau server RADIUS jarak jauh.
- **Akunting pengguna:** Menggunakan database lokal pada router atau server RADIUS jarak jauh.
- **Sistem walled garden:** Mengizinkan akses ke beberapa halaman web tanpa otorisasi.
- **Modifikasi halaman login:** Dapat menambahkan informasi tentang perusahaan pada halaman login.
- **Pengubahan otomatis alamat IP klien:** Secara otomatis mengubah alamat IP klien menjadi alamat yang valid.
- **Dukungan RFC 7710:** Mulai dari versi 6.48, Hotspot dapat menginformasikan klien DHCP bahwa mereka berada di belakang portal captive.
- **Keterbatasan IPv6:** Hotspot hanya dapat bekerja dengan stabil saat menggunakan IPv4. Saat ini, aturan NAT Firewall belum didukung untuk IPv6.



## Authentication
- WPA/WPA2 (Wi-Fi Protected Access - Pre Shared Key)
- Access Lists (Wireless MAC Authentication)
	- CAPs MAN
- Radius Server
	- MAC Authentication
	- Usermanager
- (EAP) Exstensible Authontication Protocol
	- Username dan Password
- DOT1x and MAC authentication (Auth dengan kabel)
- Hotspot
- PPPoE
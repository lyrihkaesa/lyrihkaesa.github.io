# Konfigurasi Service PPPoE dan Hostpot pada Mikrotik

| Slot   | Keterangan                 |
| ------ | -------------------------- |
| `eth1` | Sumber Internet            |
| `eth2` | Kosongkan untuk jaga-jaga. |
| `eth3` | `bridge1`                  |
| `eth4` | `bridge1`                  |
| `eth5` | `bridge1`                  |

## Terhubung ke Mikrotik

| Key      | Value | **Value New**           |
| -------- | ----- | ----------------------- |
| username | admin | admin                   |
| password |       | Cek pada body mikrotik. |

## Mengubah Users Default Supaya Aman

Agar lebih aman ubah user default `admin` dengan nama Anda, dan jangan lupa untuk menghapus user `admin` supaya tidak kena hack. Untuk mengubahkan anda dapat menuju ke Tab `⚙ System` > `users`

- Hapus user dengan name: `admin`
- Tambahkan user baru dengan menekan tombol ➕
  - Name: `kaesa`
  - Group: `full`
  - Allowed Address: (Kosongkan, bisa di isi untuk keamanan lebih lanjut)
  - Password: `rahasia`
  - Confirm Password: `rahasia`

## Mengonfigurasi Waktu (Time/Clock)

Untuk mengonfigurasi waktu silahkan menuju ke Tab `⚙ System` > `Clock`.  
Pada Tab `Time`:

- Matikan atau Uncheck 🔲 `Time Zone Autodetect`
- Ubah `Time Zone Name` menjadi `Asia/Jakarta`

Setelah itu tekan tombol `OK`.

## Mengubah Nama Default MikroTik

Untuk mengubah nama default `MikroTik` dengan nama lain. Tab `⚙ System` > `Identity` > Ganti Nama Mikrotik > `OK`

## Mengubah NTP Client

Untuk mengubah NTP Client. Tab `⚙ System` > `NTP Client`.

| NTP Client  | Keterangan                                  |
| ----------- | ------------------------------------------- |
|             | ☑ `Enabled`                                 |
| Mode:       | `unicast`                                   |
| NTP Server: | `0.id.pool.ntp.org`<br/>`1.id.pool.ntp.org` |
| VRF:        | `main`                                      |

## Matikan Watchdog

Saya kurang tahu fungsi pastinya. `⚙ System` > `Watchdog`. Katanya membuat mikrotik auto reboot jika ada error.

| Key                    | Value               | -   |
| ---------------------- | ------------------- | --- |
|                        | 🔲 Watchdog Timer   |     |
| Watch Address:         |                     |     |
| Ping Start After Boot: | 00:05:00            |     |
| Ping Timeout:          | 60                  | s   |
|                        | 🔲 Automatic Supout |     |
|                        | 🔲 Auto Send Supout |     |
| Send Email To:         |                     |     |
| Send Email From:       |                     |     |
| Send SMTP Server:      |                     |     |

---

## Konfigurasi DHCP Client

`IP` > `DHCP Client` > ➕ `New DHCP Client`

| DNCP               |                | Keterangan                                            |
| ------------------ | -------------- | ----------------------------------------------------- |
| Interface          | `ether1`       | Port Ethernet yang berfungsi sebagai sumber Internet. |
|                    | ☑ Use Peer DNS |                                                       |
|                    | ☑ Use Peer NTP |                                                       |
| Add Default Route: | yes            |                                                       |

Lalu tekan tombol `Apply` > `OK`.

## Konfigurasi DNS

`IP` > `DNS`

| DNS Settings     |                                       | Keterangan                                   |
| ---------------- | ------------------------------------- | -------------------------------------------- |
| Servers:         | `8.8.8.8`<br/>`8.8.4.4`<br/>`1.1.1.1` | DNS Google<br/>DNS Google<br/>DNS Cloudflare |
| Dynamic Servers: |                                       |                                              |
| Use DoH Server:  |                                       |                                              |
|                  | ☑ Allow Remote Requests               |                                              |

Lalu tekan tombol `Apply` > `OK`

## Konfigurasi NAT

`IP` > `Firewall` > Tab `NAT` > ➕ `New Nat Rule`

| General         |             |
| --------------- | ----------- |
| Chain:          | `srcnat`    |
| Out. Interface: | 🔲 `ether1` |

| Action  |              |
| ------- | ------------ |
| Action: | `masquerade` |

Lalu tekan tombol `Apply` > `OK`

---

## Membuat `bridge1` untuk Menghubungkan Port `ether3`, `ether4` dan `ether5`

`Bridge` > Tab `Bridge` > ➕ `New Interface`

| General |           |
| ------- | --------- |
| Name:   | `bridge1` |

Lalu tekan tombol `Apply` > `OK`.  
Setelah itu pada Tab `Ports` > ➕ `New Bridge Port`

| New Bridge Port (General) |           |
| ------------------------- | --------- |
| Interface:                | `ether3`  |
| Bridge:                   | `bridge1` |

Lalu tekan tombol `Copy` supaya cepat menambahkan port `ether4` dan `ether5`.

| New Bridge Port (General) |           |           |           |
| ------------------------- | --------- | --------- | --------- |
| Interface:                | `ether3`  | `ether4`  | `ether5`  |
| Bridge:                   | `bridge1` | `bridge1` | `bridge1` |

---

## Membuat Addresses Baru

`IP` > `Addresses` > ➕ `New Address`

| New Address |                 |
| ----------- | --------------- |
| Address:    | `99.99.99.1/24` |
| Network:    | `99.99.99.0`    |
| Interface:  | `bridge1`       |

Lalu tekan tombol `Apply` > `OK`

## Konfigurasi Service Hotspot

`IP` > `Hotspot` > Tab `Server` > Tekan Tombol `Hotspot Setup`

- Step1: Select interface to run HotSpot on
  - HotSpot Interface: `bridge1`
  - Lalu tekan tombol `Next`
- Step2: Set HotSpot address for interface
  - Local Address of Network: `99.99.99.1/24`
  - ☑ Masquerade Network
  - Lalu tekan tombol `Next`
- Step3: Set pool for HotSpot addresses
  - Address Pool of Network: `99.99.99.2-99.99.99.254`
  - Lalu tekan tombol `Next`
- Step4: Select hotspot SSL certificate
  - Select Certificate: `none`
  - Lalu tekan tombol `Next`
- Step5: Select SMTP Server
  - IP Address of SMTP Server: `0.0.0.0`
  - Lalu tekan tombol `Next`
- Step6: Setup DNS configuration
  - DNS Servers:
    - `8.8.8.8`
    - `8.8.8.8`
    - `1.1.1.1`
    - `99.99.99.1`
  - Lalu tekan tombol `Next`
- Step7: DNS name of local hotspot server
  - DNS Name: `hotspot.charapon.my.id`
  - Lalu tekan tombol `Next`
- Step8: Create local HotSpot user
  - Name of Local HotSpot User: `kaesa`
  - Password for the User: `hotspotrahasia`
  - Lalu tekan tombol `Next`
- Selesai

Lalu ubah lagi HotSpot `hotspot1` pada bagian:

- Addresses Per MAC: `1` (Default: `2`)

### User Profiles

Ini digunakan untuk melakukan pembatasan users yang menggunakan service hotspot.
`IP` > `Hotspot` > `User Profiles` > ➕ `New Hospot User Profile`

| Key                 | Value           |
| ------------------- | --------------- |
| Name:               | `1Device-3Mbps` |
| Address Pool:       | `none`          |
| Shared Users:       | `1`             |
| Rate Limit (rx/tx): | `3M/3M`         |

### Users

`IP` > `Hotspot` > `Users` > ➕ `New Hospot User`
Ini adalah tempat menampung data username dan password user, yang disesuaikan dengan User Profiles masing-masing.

| General   |                 |
| --------- | --------------- |
| Server:   | `all`/`server1` |
| Name:     | `kaesa`         |
| Password: | `lyrih`         |
| Profile:  | `1Device-3Mbps` |

---

## Konfigurasi Service PPPoE

### PPPoE Server

`PPP` > Tab `PPPoE Servers` > ➕ `New PPPoE Service`

| New PPPoE Service |                 |
| ----------------- | --------------- |
| Service Name:     | `service-PPPoE` |
| Interface:        | `bridge1`       |

Lalu tekan tombol `Apply` > `OK`

### Profiles

Ini digunakan untuk limitasi PPPoE Client.
➕`New PPP Profile`

| General     |                         |
| ----------- | ----------------------- |
| Name:       | `profile-7M`            |
| DNS Server: | `8.8.8.8`<br/>`8.8.4.4` |

| Limits              |         |                                                      |
| ------------------- | ------- | ---------------------------------------------------- |
| Rate Limit (rx/tx): | `5M/7M` |                                                      |
| Only One            | ☑ `yes` | Supaya satu `Secrets` hanya dipakai sekali. (1 user) |

Lalu tekan tombol `Apply` > `OK`

### Secrets

Digunakan untuk membuat user Name dan Password Client.
➕ `New PPP Secret`

| New PPP Secret  |               |
| --------------- | ------------- |
| Name:           | `clientname1` |
| Password:       | `clientname1` |
| Service:        | `pppoe`       |
| Profile:        | `profile-7M`  |
| Local Address:  | `88.88.88.1`  |
| Remote Address: | `88.88.88.2`  |

---

## Mengatur Dual SSID pada Mikrotik

- `Wireless` > Tab `Security Profiles` > ➕ `New Security Profile`
  - Name: `profile1`
  - Mode: `dynamic keys`
  - Authentication Types: ☑ `WPA PSK`, ☑ `WPA2 PSK`
  - WPA Pre-Shared Key: `passwordwifianda`
  - WPA2 Pre-Shared Key: `passwordwifianda`
- `Wireless` > Tab `WiFi Interfaces`
  - Klik interface name `wlan1` > `Wireless`
  - Mode: `ap bridge`
  - SSID: `Nama Wifi Untuk PPPoE`
  - Security Profile: `profile1`
- `Wireless` > Tab `WiFi Interfaces` > ➕ `Virtual`
  Virtual interface ini digunakan untuk Hotspot.
  - Mode: `ap bridge`
  - SSID: `Nama Wifi Untuk Hotspot`
  - Master Interface: `wlan1`
  - Security Profile: `disabled`

# Mode dalam Perangkat Jaringan
Pada zaman sekarang perangkat jaringan dengan fungsi routing, switch, dan access point (Wi-Fi) dijadikan dalam satu perangkat. Sama halnya dengan dulu smartphone sudah ada banyak aplikasi dari berbagai perangkat seperti kalkulator, seter, kamera, dsb. Perangkat dalam jaringan juga berkembang juga yang sebelumnya terpisah modem, router, access point (Wi-Fi), dan switch, dijadikan dalam satu perangkat.

| Mode               | WAN               | WWAN                       | LAN                | WLAN                        | DHCP Server | Membaca MAC | Remote Device |
| ------------------ | ----------------- | -------------------------- | ------------------ | --------------------------- | ----------- | ----------- | ------------- |
| Nama Lain          | Wide Area Network | Wireless Wide Area Network | Local Area Network | Wireless Local Area Network |             |             |               |
| Router             | ✅                 |                            | ✅                  | ✅                           | ✅           |             | ✅             |
| Access Point       | ✅                 |                            | ✅                  | ✅                           |             |             |               |
| WISP               |                   | ✅                          | ✅                  | ✅                           | ✅           | ✅           | ✅             |
| Client             |                   | ✅                          | ✅                  |                             |             |             | ✅             |
| Universal Repeater |                   | ✅                          | ✅                  | ✅                           |             |             |               |
| Bridge             |                   |                            | ✅                  | ✅                           |             |             | ✅             |

## WAN (Wide Area Network) & WWAN (Wireless WAN)
Biasanya digunakan untuk sumber akses internet, setiap perangkat jaringan sekarang akan ada port Ethernet WAN biasanya terletak pada eth1. Sedangkan WWAN atau Wireless Wide Area Network, itu tidak menggunakan kabel sebagai sumber internet, melainkan tanpa kabel (wireless) alias menggunakan Wi-Fi sebagai sumber internet.

## LAN (Local Area Network) dan WLAN (Wireless LAN)
Biasanya digunakan untuk mendistribusikan internet. Luas Area juga pada area kecil (local) tidak lebar (wide). LAN dan WLAN sama hanya saja LAN itu dengan kabel dan WLAN tanpa kabel alias menggunakan Wi-Fi.

## DHCP Server
Ini adalah sebuah server atau peladen/pelayan yang memberikan service/layanan distribusi IP Address secara otomatis ke pengguna (DHCP Client), pengaturan IP Address secara manual ke perangkat pengguna disebut juga Static IP (IP Tetap).

## Remote Device
Maksud dari remote device, artinya kita dapat mengatur device dengan mudah dari perangkat lainnya.
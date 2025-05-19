# Jaringan Pondok Mbodo

Public dokumentasi jaringan Pondok Mbodo.

| SSID (Nama WiFi)     | Keamanan                    |
| -------------------- | --------------------------- |
| Pondok Mbodo         | WPA/WPA2 PSK                |
| Pondok Mbodo Hotspot | Captive Portal Pondok Mbodo |
| Abah Rumah           | WPA/WPA2 PSK                |

## Rencana 2024
![network-diagram-pondok-mbodo-v2.](attachments/network-diagram-pondok-mbodo-v2.png)

---

```puml
@startuml
title Network Diagram Pondok Mbodo

cloud ISP as "Indihome (20Mbps, 350GB FUP) Rp 304.000" {
    note "Indihome (100Mbps, 3000GB FUP) Rp 417.000" as note91
}

node "Modem ISP, 100 Mbps" as modem

node "Mikrotik 100 Mbps, Router Wireless `RB952Ui-5ac2nD-TC (hAP-AC-Lite-TC)`: Rp 765.400" as mikrotik {
  [Hotspot Service]
  [PPPoE Service]
  [DHCP Service]
  [DNS Service]
  [SSID: Pondok Mbodo] as ssid01
  [SSID: Pondok Mbodo Hotspot] as ssid02
  [SSID: Abah Rumah] as ssid03
}

node "Converter FO 01 A, 100Mbps, Netlink 3100: Rp 90.000" as converter_fo_01_a #Gold

node "Converter FO 01 B, 100Mbps, Netlink 3100: Rp 90.000" as converter_fo_01_b #Gold

node "AP Pondok Putri, 100Mbps, Tenda N301: Rp 150.000" as ap_pondokputri {
    [SSID: Pondok Mbodo (PPPoE: pondokputri)]
}

node "AP Kaesa, 1Gbps, Router ONT Fiberhome HG6145F: Rp 190.000" as ap_kaesa {
    [SSID: Pondok Mbodo Hotspot] as ssid05
}

database "Server PC01, 1Gbps" as server_01 {
    rectangle CasaOS {
        rectangle Docker {
            [Emby Media Server] as media_server
            [PostgreSQL Server] as postgree_server
            [MariaDB MySQL Server] as mysql_server
            [Nginx Proxy Manager Server] as proxy_server
            [PlantUML Server] as plantuml_server
            [Web pondokmbodo.local] as web_pondokmbodo_local_server
            [S3 Storage Minio Server] as minio_server
            [NAS Nextcloud Server] as nextcloud_server
            [Speedtest Server] as speedtest_server

            media_server <--> proxy_server
            postgree_server <--> proxy_server
            mysql_server <--> proxy_server
            plantuml_server <--> proxy_server
            web_pondokmbodo_local_server <--> proxy_server
            minio_server <--> proxy_server
            nextcloud_server <--> proxy_server
            speedtest_server <--> proxy_server

            web_pondokmbodo_local_server <--> minio_server
            web_pondokmbodo_local_server <--> postgree_server
            nextcloud_server <--> postgree_server
        }
    }
}


node "AP Aisa, 100Mbps, Router Totolink N300RT: Rp 210.000" as ap_aisa {
    [SSID: Aisa (PPPoE: aisa)] as ssid06
}

node "AP Taman Suwuk, 1Gbps, Router Xiaomi Mi 4A Gigabit Edition: Rp 289.000" as ap_tamansuwuk #Gold {
    [SSID: Pondok Mbodo Hotspot] as ssid07
}

node "AP Kantor TU, 100Mbps, Router Totolink N300RT: Rp 220.000" as ap_kantortu #Gold {
    [SSID: Pondok Mbodo Hotspot] as ssid08
    [SSID: Pondok Mbodo] as ssid09
}

node "AP Rumah Etan, 100Mbps, Router Totolink N300RT: Rp 220.000" as ap_rumahetan #Tomato {
    [SSID: Pondok Mbodo Hotspot] as ssid10
    [SSID: Pondok Mbodo] as ssid11
}

node "SMP, 100Mbps, ??" as ap_smp #Tomato {
    [SSID: Pondok Mbodo Hotspot] as ssid12
}

ISP --> modem
modem --> mikrotik: [eth3, eth1]
mikrotik --> converter_fo_01_a: [eth4, eth1]
mikrotik --> ap_pondokputri: [eth2, wan, PPPoE: pondokputri]
mikrotik --> ap_kaesa: [eth3, eth1]
ap_kaesa --> server_01: [eth3, eth1]
ap_kaesa --> ap_aisa: [eth2, wan, PPPoE: aisa]
converter_fo_01_a --> converter_fo_01_b: [fo1, fo1]
converter_fo_01_b -> ap_tamansuwuk: [eth1, wan]
ap_tamansuwuk --> ap_kantortu: [eth1, wan, PPPoE: kantortu]
ap_tamansuwuk --> ap_rumahetan: [eth2, wan, PPPoE: rumahetan]
ap_rumahetan --> ap_smp: [eth1, wan]
@enduml
```

## Rencana 2027 (3 Tahun Kedepan)

- Semua jaringan full (Gigabit Ethernet) `1000 Mbps` untuk jaringan LOCAL AREA NETWORK (LAN).
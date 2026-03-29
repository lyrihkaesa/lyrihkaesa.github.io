# Sistem Informasi MBG (SPPG)
Sebenarnya sudah ada aplikasi namanya `Sinutrihub`, tapi ini kurang enak jadi sepertinya saya akan membuatnya.
Kamu ingin **arsitektur sistem informasi internal berbasis Laravel + Filament**, dengan kontrol akses pakai **Spatie Laravel Permission + Laravel Policy**, dan semua diagram menggunakan **PlantUML** (bukan ERD konvensional).  
API disiapkan **belakangan** (fase integrasi Flutter/mobile), jadi saat ini fokus ke web-based workflow dulu.

---

## 📘 Rencana Pembuatan Sistem Informasi _Makan Bergizi Gratis_ (Dokumen Perencanaan Tahap 1)

### 1. Tujuan Sistem

Sistem ini mengelola operasional yayasan dalam program **Makan Bergizi Gratis (MBG)** yang menaungi banyak dapur.  
Setiap dapur mengatur jadwal menu, distribusi makanan, bahan baku, supplier, serta laporan periodik ke yayasan.

---

### 2. Struktur Role (pakai Spatie Laravel Permission)

| Role                  | Level   | Deskripsi                                             |
| --------------------- | ------- | ----------------------------------------------------- |
| **SuperAdmin**        | Global  | Mengelola seluruh tenant (yayasan & dapur)            |
| **Admin Yayasan**     | Yayasan | Membuat dapur, memantau laporan keuangan & distribusi |
| **Ketua Dapur**       | Dapur   | Mengelola staff & relawan, verifikasi laporan         |
| **PIC Dapur**         | Dapur   | Menginput data sekolah/batch & distribusi             |
| **Ahli Gizi**         | Dapur   | Menyusun menu, nilai gizi, jadwal periode             |
| **Akuntansi Dapur**   | Dapur   | Mencatat keuangan & supplier                          |
| **Admin Dapur**       | Dapur   | CRUD data umum dapur                                  |
| **Chef (Relawan)**    | Dapur   | Menginput menu harian & bahan baku                    |
| **Asisten Lapangan**  | Dapur   | Mencatat distribusi harian                            |
| **Relawan Persiapan** | Dapur   | Non-akses langsung, tercatat di sistem saja           |

---

### 3. Use Case Diagram (PlantUML)

```plantuml
@startuml
left to right direction
actor "Admin Yayasan" as AY
actor "Ketua Dapur" as KD
actor "Ahli Gizi" as AG
actor "Chef" as CH
actor "Akuntansi" as AK
actor "Asisten Lapangan" as AL

rectangle System {
  AY --> (Kelola Dapur MBG)
  AY --> (Lihat Laporan Semua Dapur)
  KD --> (Kelola Staff & Relawan)
  KD --> (Validasi Laporan Distribusi)
  AG --> (Buat Menu & Nilai Gizi)
  AG --> (Susun Jadwal Menu Periode)
  CH --> (Input Bahan & Menu Harian)
  AK --> (Input Pengeluaran & Supplier)
  AL --> (Catat Distribusi Harian)
}
@enduml
```

---

### 4. Activity Diagram — _Alur Distribusi Periode_

```plantuml
@startuml
start
:Ahli Gizi buat periode (start_date, end_date, active_days);
:Chef & Ahli Gizi input menu + nilai gizi;
:Scheduler assign menu ke setiap hari aktif;
:Generate daftar belanja bahan;
:Akuntansi verifikasi dan input pembelian supplier;
:Hari H -> Asisten Lapangan catat jumlah porsi dikirim ke sekolah;
:Ketua Dapur verifikasi data distribusi;
:Admin Yayasan lihat rekap periode;
stop
@enduml
```

---

### 5. Activity Diagram — _Keuangan Dapur_

```plantuml
@startuml
start
:Admin Yayasan kirim dana ke dapur;
:Akuntansi Dapur catat penerimaan dana;
:Akuntansi buat transaksi pembelian bahan dari supplier;
:Ketua Dapur review & approve pengeluaran;
:Admin Yayasan lihat laporan konsolidasi;
stop
@enduml
```

---

### 6. Tabel Utama & Relasi (PlantUML Class Diagram)

```plantuml
@startuml
class Tenant {
  +id
  +name
  +location
}

class User {
  +id
  +name
  +email
  +tenant_id
}

class Period {
  +id
  +tenant_id
  +start_date
  +end_date
  +active_days JSON
}

class Menu {
  +id
  +tenant_id
  +name
  +nutrition_summary JSON
}

class Schedule {
  +id
  +tenant_id
  +period_id
  +date
  +menu_id
}

class Batch {
  +id
  +tenant_id
  +name
  +contact_person
}

class ClassCount {
  +id
  +batch_id
  +period_id
  +grade
  +male
  +female
  +allergy_count
}

class Distribution {
  +id
  +batch_id
  +schedule_id
  +served_count
  +notes
}

class Supplier {
  +id
  +tenant_id
  +name
  +type
}

class Expense {
  +id
  +tenant_id
  +supplier_id
  +amount
  +date
}

Tenant "1" -- "many" User
Tenant "1" -- "many" Period
Tenant "1" -- "many" Menu
Tenant "1" -- "many" Batch
Tenant "1" -- "many" Supplier
Period "1" -- "many" Schedule
Schedule "1" -- "many" Distribution
Batch "1" -- "many" ClassCount
Supplier "1" -- "many" Expense
@enduml
```

---

### 7. Kebijakan Akses (Policy Mapping)

|Model|Policy Class|Akses Role|
|---|---|---|
|Tenant|`TenantPolicy`|SuperAdmin, Admin Yayasan|
|Period|`PeriodPolicy`|Ahli Gizi, Ketua Dapur|
|Menu|`MenuPolicy`|Ahli Gizi, Chef|
|Schedule|`SchedulePolicy`|Ahli Gizi|
|Batch|`BatchPolicy`|PIC Dapur|
|Distribution|`DistributionPolicy`|Asisten Lapangan, Ketua Dapur|
|Expense|`ExpensePolicy`|Akuntansi, Ketua Dapur|

---

### 8. Flow Implementasi (Roadmap MVP Web)

1. **Fase 0 – Setup**
    
    - Laravel + Filament, install Spatie Permission.
        
    - Buat seed roles & policies.
        
2. **Fase 1 – Master Data**
    
    - CRUD Tenant/Dapur, User Management.
        
3. **Fase 2 – Menu & Periode**
    
    - CRUD Menu + Nutrition, Period & Schedule Builder.
        
4. **Fase 3 – Distribusi**
    
    - Quick Entry distribusi harian per batch.
        
5. **Fase 4 – Keuangan Dasar**
    
    - CRUD Supplier & Expense, export CSV.
        
6. **Fase 5 – Dashboard Yayasan**
    
    - Agregasi distribusi & keuangan per periode.
        

---

### 9. Standar Industri & Praktik Baik

- Gunakan **Policy + Gate** di setiap Filament Resource (integrasi dengan Spatie Permission).
- Audit trail via package seperti _spatie/laravel-activitylog_.
- Validation Rules via FormRequest.
- Migration: gunakan `uuid()` untuk id di tabel lintas tenant.
- Multi-tenant simple (single DB + tenant_id) → bisa di-upgrade ke schema-per-tenant nanti.
- Naming konvensi: `snake_case` untuk tabel, `camelCase` untuk model attributes.
- Testing: minimal _Feature Tests_ untuk setiap modul Filament.
- Deployment: staging branch + CI GitHub Actions + automatic migration & seed.

---

### 10. Rencana Iterasi

- **Phase 2 (Integrasi API / Flutter):** publish endpoint dari controller Filament.
- **Phase 3 (Analytics):** dashboard gizi & efisiensi biaya.
- **Phase 4 (Per-Siswa Data):** extend Batch → Students.


```plantuml
@startuml
' ===========================
'  SISTEM INFORMASI MBG
' ===========================

class Tenant {
  +id : UUID
  +name : string
  +location : string
}

class User {
  +id : UUID
  +name : string
  +email : string
  +password : string
  +tenant_id : UUID
}

class Period {
  +id : UUID
  +tenant_id : UUID
  +start_date : date
  +end_date : date
  +active_days : json
  +description : text
}

class Batch {
  +id : UUID
  +tenant_id : UUID
  +name : string
  +contact_person : string
  +phone : string
}

class ClassCount {
  +id : UUID
  +batch_id : UUID
  +period_id : UUID
  +grade : string
  +male : int
  +female : int
  +allergy_count : int
}

class Ingredient {
  +id : UUID
  +name : string
  +unit : string
  +category : string
}

class IngredientAvailability {
  +id : UUID
  +tenant_id : UUID
  +ingredient_id : UUID
  +period_id : UUID
  +is_available : boolean
  +note : text
}

class Menu {
  +id : UUID
  +tenant_id : UUID
  +name : string
  +nutrition_summary : json
  +is_active : boolean
}

class MenuIngredient {
  +id : UUID
  +menu_id : UUID
  +ingredient_id : UUID
  +qty : decimal
  +unit : string
}

class Schedule {
  +id : UUID
  +tenant_id : UUID
  +period_id : UUID
  +date : date
  +menu_id : UUID
}

class Distribution {
  +id : UUID
  +batch_id : UUID
  +schedule_id : UUID
  +served_count : int
  +notes : text
}

class Supplier {
  +id : UUID
  +tenant_id : UUID
  +name : string
  +type : enum('afiliasi','non_afiliasi')
  +contact : string
}

class Expense {
  +id : UUID
  +tenant_id : UUID
  +supplier_id : UUID
  +amount : decimal
  +date : date
  +description : text
}

class Transfer {
  +id : UUID
  +from_tenant_id : UUID
  +to_tenant_id : UUID
  +amount : decimal
  +date : date
}

' ===== RELASI ANTAR ENTITAS =====
Tenant "1" -- "many" User
Tenant "1" -- "many" Period
Tenant "1" -- "many" Batch
Tenant "1" -- "many" IngredientAvailability
Tenant "1" -- "many" Menu
Tenant "1" -- "many" Supplier
Period "1" -- "many" Schedule
Batch "1" -- "many" ClassCount
Batch "1" -- "many" Distribution
Schedule "1" -- "many" Distribution
Menu "1" -- "many" MenuIngredient
Ingredient "1" -- "many" MenuIngredient
Ingredient "1" -- "many" IngredientAvailability
Supplier "1" -- "many" Expense
Tenant "1" -- "many" Expense
Tenant "1" -- "many" Transfer

@enduml
```


```plantuml
@startuml
' ===========================
'  SISTEM INFORMASI MBG - Hybrid Multi-Tenant
' ===========================

class Foundation {
  +id : UUID
  +name : string
  +contact_person : string
  +address : string
}

class Tenant {
  +id : UUID
  +foundation_id : UUID
  +name : string
  +location : string
  +status : enum('active','inactive')
}

class User {
  +id : UUID
  +tenant_id : UUID
  +name : string
  +email : string
  +password : string
  +role : string
}

class Menu {
  +id : UUID
  +tenant_id : UUID?  'null = global'
  +name : string
  +nutrition_summary : json
  +is_active : boolean
  +shared_scope : enum('global','local')
}

class Ingredient {
  +id : UUID
  +tenant_id : UUID?  'null = global'
  +name : string
  +unit : string
  +category : string
}

class MenuIngredient {
  +menu_id : UUID
  +ingredient_id : UUID
  +qty : decimal
}

class Supplier {
  +id : UUID
  +tenant_id : UUID?  'null = global'
  +name : string
  +type : enum('afiliasi','non_afiliasi')
  +contact : string
  +coverage_area : json
}

class Period {
  +id : UUID
  +tenant_id : UUID
  +start_date : date
  +end_date : date
  +active_days : json
  +is_active : boolean
}

class Schedule {
  +id : UUID
  +tenant_id : UUID
  +period_id : UUID
  +date : date
  +menu_id : UUID
}

class Batch {
  +id : UUID
  +tenant_id : UUID
  +name : string
  +contact_person : string
  +phone : string
}

class Distribution {
  +id : UUID
  +batch_id : UUID
  +schedule_id : UUID
  +served_count : int
  +notes : text
}

class Expense {
  +id : UUID
  +tenant_id : UUID
  +supplier_id : UUID
  +amount : decimal
  +date : date
  +description : text
}

Foundation "1" -- "many" Tenant
Tenant "1" -- "many" User
Tenant "1" -- "many" Period
Tenant "1" -- "many" Batch
Tenant "1" -- "many" Expense
Menu "1" -- "many" MenuIngredient
Ingredient "1" -- "many" MenuIngredient
Supplier "1" -- "many" Expense
Schedule "1" -- "many" Distribution
Batch "1" -- "many" Distribution
Period "1" -- "many" Schedule
@enduml
```

```plantuml
@startuml
' ===========================
' SISTEM INFORMASI MBG - Inventory Extended
' ===========================

class Foundation {
  +id : UUID
  +name : string
}

class Tenant {
  +id : UUID
  +foundation_id : UUID
  +name : string
  +location : string
}

class Ingredient {
  +id : UUID
  +tenant_id : UUID?
  +name : string
  +unit : string
  +category : string
}

class StockItem {
  +id : UUID
  +tenant_id : UUID
  +ingredient_id : UUID
  +current_qty : decimal
  +min_qty : decimal
  +updated_at : datetime
}

class StockMovement {
  +id : UUID
  +tenant_id : UUID
  +ingredient_id : UUID
  +movement_type : enum('in','out','adjustment')
  +qty : decimal
  +source_type : enum('purchase','menu_usage','manual','transfer')
  +source_id : UUID?
  +note : text
  +created_at : datetime
}

class PurchaseOrder {
  +id : UUID
  +tenant_id : UUID
  +supplier_id : UUID
  +order_date : date
  +status : enum('draft','ordered','received','cancelled')
  +total_amount : decimal
}

class PurchaseOrderItem {
  +id : UUID
  +purchase_order_id : UUID
  +ingredient_id : UUID
  +qty : decimal
  +unit_price : decimal
}

class Menu {
  +id : UUID
  +tenant_id : UUID?
  +name : string
  +nutrition_summary : json
}

class MenuIngredient {
  +menu_id : UUID
  +ingredient_id : UUID
  +qty : decimal
}

Foundation "1" -- "many" Tenant
Tenant "1" -- "many" StockItem
Tenant "1" -- "many" StockMovement
Tenant "1" -- "many" PurchaseOrder
PurchaseOrder "1" -- "many" PurchaseOrderItem
Ingredient "1" -- "many" StockItem
Ingredient "1" -- "many" StockMovement
Ingredient "1" -- "many" PurchaseOrderItem
Menu "1" -- "many" MenuIngredient
Ingredient "1" -- "many" MenuIngredient
@enduml
```


```plantuml
@startuml
class Tenant {
  +id : UUID
  +name : string
  +address : string
}

class BeneficiaryGroup {
  +id : UUID
  +foundation_id : UUID
  +school_name : string
  +level : enum('PAUD','TK','SD','SMP','SMA')
  +address : string
  +contact_person : string
  +phone : string
  +is_active : boolean
}

class BeneficiaryAssignment {
  +id : UUID
  +beneficiary_group_id : UUID
  +tenant_id : UUID
  +start_date : date
  +end_date : date?
  +is_active : boolean
}

class BeneficiaryIndividual {
  +id : UUID
  +beneficiary_group_id : UUID
  +name : string
  +gender : enum('male','female')
  +grade_level : int
  +portion_type : enum('small','large')
  +allergy : string?
  +is_active : boolean
}

Tenant "1" <-- "many" BeneficiaryAssignment
BeneficiaryGroup "1" --> "many" BeneficiaryAssignment
BeneficiaryGroup "1" --> "many" BeneficiaryIndividual
@enduml
```

```plantuml
@startuml
'--- User dan profil login ---
class User {
  +id : UUID
  +name : string
  +email : string
  +password : string
  +role : enum('super_admin','foundation_admin','tenant_staff','volunteer','supervisor','beneficiary')
  +is_active : boolean
}

class Employee {
  +id : UUID
  +user_id : UUID
  +tenant_id : UUID
  +position : enum('ketua_dapur','pic_dapur','akuntansi','ahli_gizi','admin','relawan','chef','asisten_lapangan')
  +is_staff : boolean
}

class BeneficiaryGroup {
  +id : UUID
  +foundation_id : UUID
  +school_name : string
  +address : string
  +is_active : boolean
}

class BeneficiarySupervisor {
  +id : UUID
  +user_id : UUID
  +beneficiary_group_id : UUID
  +is_lead : boolean
  +is_active : boolean
}

class BeneficiaryIndividual {
  +id : UUID
  +beneficiary_group_id : UUID
  +user_id : UUID?  'opsional, siswa biasanya tidak login'
  +supervisor_id : UUID
  +name : string
  +gender : enum('male','female')
  +grade_level : int
  +portion_type : enum('small','large')
  +allergy : string?
  +is_active : boolean
}

'--- Relasi ---
User "1" --> "1" Employee : optional
User "1" --> "1" BeneficiarySupervisor : optional
User "1" --> "1" BeneficiaryIndividual : optional
BeneficiaryGroup "1" --> "many" BeneficiarySupervisor
BeneficiaryGroup "1" --> "many" BeneficiaryIndividual
BeneficiarySupervisor "1" --> "many" BeneficiaryIndividual : manages
@enduml
```

```plantuml
@startuml
' MBG Domain Model - Multi-tenant + Spatie + Pivot tables
' PKs use UUID. tenant_id nullable for shared resources.

class Foundation {
  +id : UUID
  +name : string
  +contact : string
}
class Tenant {
  +id : UUID
  +foundation_id : UUID
  +name : string
  +location : string
  +status : enum('active','inactive')
}

class User {
  +id : UUID
  +tenant_id : UUID? 
  +name : string
  +email : string
  +password : string
  +is_active : boolean
}
class Employee {
  +id : UUID
  +user_id : UUID
  +tenant_id : UUID
  +position : string
}
class BeneficiaryGroup {
  +id : UUID
  +foundation_id : UUID
  +name : string
  +level : enum('PAUD','TK','SD','SMP','SMA')
  +address : string
  +is_active : boolean
}
class BeneficiaryIndividual {
  +id : UUID
  +beneficiary_group_id : UUID
  +user_id : UUID?
  +name : string
  +gender : enum('male','female')
  +grade_level : int
  +portion_type : enum('small','large')
  +allergy : string?
  +is_active : boolean
}
class BeneficiaryAssignment {
  +id : UUID
  +beneficiary_group_id : UUID
  +tenant_id : UUID
  +start_date : date
  +end_date : date?
  +is_active : boolean
}

class Role {
  +id : int
  +name : string
  +guard_name : string
}
class Permission {
  +id : int
  +name : string
  +guard_name : string
}
class model_has_roles {
  +role_id : int
  +model_type : string
  +model_id : UUID
}
class model_has_permissions {
  +permission_id : int
  +model_type : string
  +model_id : UUID
}
class role_has_permissions {
  +permission_id : int
  +role_id : int
}

class Menu {
  +id : UUID
  +tenant_id : UUID?
  +name : string
  +nutrition_summary : json
  +is_active : boolean
}

class Ingredient {
  +id : UUID
  +tenant_id : UUID?
  +name : string
  +unit : string
  +category : string
}

class MenuIngredient {
  +id : UUID
  +menu_id : UUID
  +ingredient_id : UUID
  +qty : decimal
  +unit : string
}

class StockItem {
  +id : UUID
  +tenant_id : UUID
  +ingredient_id : UUID
  +current_qty : decimal
  +min_qty : decimal
}

class StockMovement {
  +id : UUID
  +tenant_id : UUID
  +ingredient_id : UUID
  +movement_type : enum('in','out','adjustment')
  +qty : decimal
  +source_type : string
  +source_id : UUID?
  +note : text
  +created_at : datetime
}

class Supplier {
  +id : UUID
  +tenant_id : UUID?    'nullable = global supplier
  +name : string
  +type : enum('afiliasi','non_afiliasi')
  +contact : string
  +coverage_area : json
}

class PurchaseOrder {
  +id : UUID
  +tenant_id : UUID
  +supplier_id : UUID
  +order_date : date
  +status : enum('draft','ordered','received','cancelled')
  +total_amount : decimal
}

class PurchaseOrderItem {
  +id : UUID
  +purchase_order_id : UUID
  +ingredient_id : UUID
  +qty : decimal
  +unit_price : decimal
}

class Period {
  +id : UUID
  +tenant_id : UUID
  +start_date : date
  +end_date : date
  +active_days : json
  +is_active : boolean
}

class Schedule {
  +id : UUID
  +tenant_id : UUID
  +period_id : UUID
  +date : date
  +menu_id : UUID
}
class Distribution {
  +id : UUID
  +tenant_id : UUID
  +beneficiary_group_id : UUID
  +schedule_id : UUID
  +served_count : int
  +notes : text
}

class Expense {
  +id : UUID
  +tenant_id : UUID
  +supplier_id : UUID
  +amount : decimal
  +date : date
  +description : text
}
class Transfer {
  +id : UUID
  +from_tenant_id : UUID
  +to_tenant_id : UUID
  +amount : decimal
  +date : date
}

' === RELATIONS ===
Foundation "1" -- "many" Tenant
Foundation "1" -- "many" BeneficiaryGroup
Tenant "1" -- "many" User
Tenant "1" -- "many" Employee
Tenant "1" -- "many" Period
Tenant "1" -- "many" Menu
Tenant "1" -- "many" Ingredient
Tenant "1" -- "many" Supplier
Tenant "1" -- "many" StockItem
Tenant "1" -- "many" StockMovement
Tenant "1" -- "many" PurchaseOrder
Tenant "1" -- "many" Expense
Tenant "1" -- "many" Transfer
Tenant "1" -- "many" Distribution

User "1" -- "0..1" Employee
User "1" -- "0..1" BeneficiarySupervisor : (via BeneficiarySupervisor table)
User "1" -- "0..1" BeneficiaryIndividual : optional login

BeneficiaryGroup "1" -- "many" BeneficiaryIndividual
BeneficiaryGroup "1" -- "many" BeneficiaryAssignment
BeneficiaryAssignment "many" -- "1" Tenant

Menu "1" -- "many" MenuIngredient
Ingredient "1" -- "many" MenuIngredient
Ingredient "1" -- "many" StockItem
Ingredient "1" -- "many" StockMovement
Supplier "1" -- "many" PurchaseOrder
PurchaseOrder "1" -- "many" PurchaseOrderItem
Schedule "1" -- "many" Distribution
BeneficiaryGroup "1" -- "many" Distribution

' Spatie pivots relations (morph-like)
Role "1" -- "many" model_has_roles
Permission "1" -- "many" model_has_permissions
Role "1" -- "many" role_has_permissions
model_has_roles ..> User : model_id/model_type
model_has_permissions ..> User : model_id/model_type

note right of Menu : tenant_id nullable -> if null menu is global/shared
note right of Ingredient : tenant_id nullable -> global/local
note right of Supplier : tenant_id nullable -> supplier can serve many tenants

@enduml
```

```plantuml
@startuml
' ==============================
' DOMAIN: PENERIMA MANFAAT & EMPLOYEE
' ==============================

package "Tenant / Dapur MBG" {
  class Tenant {
    +id: UUID
    +name: string
    +address: string
  }

  class Employee {
    +id: UUID
    +tenant_id: UUID
    +user_id: UUID
    +name: string
    +position: enum("Chef","Ahli Gizi","Guru Penanggung Jawab","Admin")
    +salary: decimal
    +status: enum("active","inactive")
  }
}

package "Penerima Manfaat" {
  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +school_name: string
    +address: string
    +contact_phone: string
  }

  class BeneficiarySupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +notes: text
  }

  class BeneficiaryIndividual {
    +id: UUID
    +beneficiary_group_id: UUID
    +beneficiary_supervisor_id: UUID?
    +tenant_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +education_level: enum("PAUD","TK","SD","SMP","SMA")
    +class_number: int
    +allergy_notes: string?
    +portion_type: enum("small","large")
    +is_active: bool
  }
}

package "Distribusi & Menu" {
  class DistributionRecord {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +menu_id: UUID
    +distribution_date: date
    +small_portions: int
    +large_portions: int
  }

  class Menu {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +period_start: date
    +period_end: date
  }
}

Tenant "1" -- "many" Employee : employs >
Tenant "1" -- "many" BeneficiaryGroup : manages >
BeneficiaryGroup "1" -- "many" BeneficiarySupervisor : has >
BeneficiarySupervisor "1" -- "many" BeneficiaryIndividual : oversees >
Employee "1" -- "1" BeneficiarySupervisor : assigned as >
BeneficiaryGroup "1" -- "many" BeneficiaryIndividual : contains >
Tenant "1" -- "many" BeneficiaryIndividual : serves >
BeneficiaryGroup "1" -- "many" DistributionRecord : recorded >
Menu "1" -- "many" DistributionRecord : used in >

@enduml
```

```plantuml
@startuml
' ========================================
' DOMAIN: DISTRIBUSI & MENU MBG
' ========================================

package "Tenant / Dapur MBG" {
  class Tenant {
    +id: UUID
    +name: string
    +address: string
  }

  class Employee {
    +id: UUID
    +tenant_id: UUID
    +user_id: UUID
    +name: string
    +position: enum("Chef","Ahli Gizi","Guru Penanggung Jawab","Admin")
    +salary: decimal
    +status: enum("active","inactive")
  }
}

package "Penerima Manfaat" {
  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +school_name: string
    +address: string
    +contact_phone: string
  }

  class BeneficiarySupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +notes: text
  }

  class BeneficiaryIndividual {
    +id: UUID
    +beneficiary_group_id: UUID
    +beneficiary_supervisor_id: UUID?
    +tenant_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +education_level: enum("PAUD","TK","SD","SMP","SMA")
    +class_number: int
    +allergy_notes: string?
    +portion_type: enum("small","large")
    +is_active: bool
  }
}

package "Menu & Distribusi" {
  class Menu {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +description: text
    +calories: int
    +portion_type: enum("small","large")
    +is_active: bool
  }

  class DistributionRecord {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +distribution_date: date
    +supervisor_id: UUID?
    +status: enum("draft","confirmed","delivered")
    +notes: text
    +created_by: UUID
  }

  class DistributionItem {
    +id: UUID
    +distribution_record_id: UUID
    +menu_id: UUID
    +quantity: int
    +portion_type: enum("small","large")
  }
}

Tenant "1" -- "many" Employee : employs >
Tenant "1" -- "many" BeneficiaryGroup : manages >
BeneficiaryGroup "1" -- "many" BeneficiarySupervisor : has >
BeneficiarySupervisor "1" -- "many" BeneficiaryIndividual : oversees >
Employee "1" -- "1" BeneficiarySupervisor : assigned as >
BeneficiaryGroup "1" -- "many" BeneficiaryIndividual : contains >
Tenant "1" -- "many" BeneficiaryIndividual : serves >

BeneficiaryGroup "1" -- "many" DistributionRecord : receives >
DistributionRecord "1" -- "many" DistributionItem : contains >
Menu "1" -- "many" DistributionItem : referenced >
DistributionRecord "1" -- "1" Employee : created_by >

@enduml
```

```plantuml
@startuml
' ============================================
' DOMAIN: PENERIMA MANFAAT (v2 - dengan grup summary dan multi supervisor)
' ============================================

package "Tenant / Dapur MBG" {
  class Tenant {
    +id: UUID
    +name: string
    +address: string
  }

  class Employee {
    +id: UUID
    +tenant_id: UUID
    +user_id: UUID
    +name: string
    +position: enum("Chef","Ahli Gizi","Guru Penanggung Jawab","Admin")
    +salary: decimal
    +status: enum("active","inactive")
  }
}

package "Penerima Manfaat" {
  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +school_name: string
    +address: string
    +contact_phone: string
    +total_small_portions: int
    +total_large_portions: int
    +total_teacher_portions: int
  }

  class BeneficiaryGroupSupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +role: enum("primary","assistant")
    +notes: text
  }

  class BeneficiaryGroupClassSummary {
    +id: UUID
    +beneficiary_group_id: UUID
    +education_level: enum("PAUD","TK","SD","SMP","SMA")
    +class_number: int
    +male_small: int
    +female_small: int
    +male_large: int
    +female_large: int
    +teacher_portion: int
  }

  class BeneficiaryIndividual {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +education_level: enum("PAUD","TK","SD","SMP","SMA")
    +class_number: int
    +allergy_notes: string?
    +portion_type: enum("small","large")
    +is_active: bool
  }
}

Tenant "1" -- "many" Employee : employs >
Tenant "1" -- "many" BeneficiaryGroup : manages >

BeneficiaryGroup "1" -- "many" BeneficiaryGroupClassSummary : summarizes >
BeneficiaryGroup "1" -- "many" BeneficiaryGroupSupervisor : supervised by >
Employee "1" -- "many" BeneficiaryGroupSupervisor : assigned as >

BeneficiaryGroup "1" -- "many" BeneficiaryIndividual : contains >
Tenant "1" -- "many" BeneficiaryIndividual : serves >

@enduml
```


```plantuml
@startuml
' ==================================================
' SISTEM INFORMASI MBG - UNIFIED DOMAIN MODEL (FINAL)
' ==================================================

package "Tenant / Dapur MBG" {
  class Tenant {
    +id: UUID
    +name: string
    +address: string
    +phone: string
  }

  class Employee {
    +id: UUID
    +tenant_id: UUID
    +user_id: UUID
    +name: string
    +position: enum("Ketua","PIC","Ahli Gizi","Chef","Akuntansi","Admin","Penanggung Jawab")
    +salary: decimal
    +status: enum("active","inactive")
  }
}

package "Beneficiary Domain" {
  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +type: enum("School","Posyandu","Panti","Community")
    +address: string
    +contact_phone: string
    +total_small_portions: int
    +total_large_portions: int
    +total_supervisor_portions: int
  }

  class BeneficiaryGroupSupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +role: enum("primary","assistant")
    +notes: text
  }

  class BeneficiaryGroupClassSummary {
    +id: UUID
    +beneficiary_group_id: UUID
    +education_level: enum("PAUD","TK","SD","SMP","SMA","None")
    +class_number: int?
    +male_small: int
    +female_small: int
    +male_large: int
    +female_large: int
    +supervisor_portion: int
  }

  class BeneficiaryIndividual {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +education_level: enum("PAUD","TK","SD","SMP","SMA","None")
    +class_number: int?
    +portion_type: enum("small","large")
    +allergy_notes: string?
    +is_active: bool
  }
}

package "Menu & Distribusi" {
  class Menu {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +description: text
    +calories: int
    +portion_type: enum("small","large")
    +is_active: bool
  }

  class Ingredient {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +unit: string
    +stock_quantity: decimal
    +is_affiliated_supplier: bool
  }

  class MenuIngredient {
    +id: UUID
    +menu_id: UUID
    +ingredient_id: UUID
    +quantity_required: decimal
  }

  class DistributionRecord {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +distribution_date: date
    +status: enum("draft","confirmed","delivered")
    +notes: text
    +created_by: UUID
  }

  class DistributionItem {
    +id: UUID
    +distribution_record_id: UUID
    +menu_id: UUID
    +quantity: int
    +portion_type: enum("small","large")
  }
}

Tenant "1" -- "many" Employee : employs >
Tenant "1" -- "many" BeneficiaryGroup : manages >
Employee "1" -- "many" BeneficiaryGroupSupervisor : assigned as >
BeneficiaryGroup "1" -- "many" BeneficiaryGroupSupervisor : supervised by >
BeneficiaryGroup "1" -- "many" BeneficiaryGroupClassSummary : summarizes >
BeneficiaryGroup "1" -- "many" BeneficiaryIndividual : contains >
Tenant "1" -- "many" BeneficiaryIndividual : serves >

BeneficiaryGroup "1" -- "many" DistributionRecord : receives >
DistributionRecord "1" -- "many" DistributionItem : contains >
Menu "1" -- "many" DistributionItem : referenced >
Menu "1" -- "many" MenuIngredient : uses >
Ingredient "1" -- "many" MenuIngredient : consumed_by >
DistributionRecord "1" -- "1" Employee : created_by >

@enduml
```

```plantuml
@startuml
package "Beneficiary Domain" {
  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +type: enum("School","Posyandu","Panti","Community")
    +address: string
    +contact_phone: string
    +total_small_portions: int
    +total_large_portions: int
    +supervisor_portions: int
    +total_portions: int  ' = small + large + supervisor
  }

  class BeneficiaryGroupSupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +role: enum("primary","assistant")
    +notes: text
  }

  class BeneficiaryGroupClassSummary {
    +id: UUID
    +beneficiary_group_id: UUID
    +education_level: enum("PAUD","TK","SD","SMP","SMA","None")
    +class_number: int?
    +male_small: int
    +female_small: int
    +male_large: int
    +female_large: int
    +notes: text?
  }

  class BeneficiaryIndividual {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +education_level: enum("PAUD","TK","SD","SMP","SMA","None")
    +class_number: int?
    +portion_type: enum("small","large")
    +allergy_notes: string?
    +is_active: bool
  }

  BeneficiaryGroup "1" --> "*" BeneficiaryGroupSupervisor : has
  BeneficiaryGroup "1" --> "*" BeneficiaryGroupClassSummary : summarizes
  BeneficiaryGroup "1" --> "*" BeneficiaryIndividual : includes
}
@enduml
```

```plantuml
@startuml
!theme plain

' ===============================
' TENANT & USER DOMAIN
' ===============================
package "Core Domain" {
  class Tenant {
    +id: UUID
    +name: string
    +address: string
    +contact_email: string
    +contact_phone: string
    +is_active: bool
  }

  class User {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +email: string
    +password: string
    +is_active: bool
  }

  class Role {
    +id: UUID
    +name: string
    +guard_name: string
  }

  class Permission {
    +id: UUID
    +name: string
    +guard_name: string
  }

  User "*" --> "1" Tenant : belongs_to
  Role "*" -- "*" Permission : has_many_through
  User "*" -- "*" Role : spatie_roles
}

' ===============================
' EMPLOYEE DOMAIN
' ===============================
package "Employee Domain" {
  class Employee {
    +id: UUID
    +tenant_id: UUID
    +user_id: UUID
    +position: enum("KetuaDapur","PIC","Akuntansi","AhliGizi","Admin","Chef","RelawanPersiapan","AsistenLapangan")
    +employment_type: enum("staff","volunteer")
    +phone: string
    +is_active: bool
  }

  Employee "*" --> "1" Tenant : belongs_to
  Employee "1" --> "1" User : profile_of
}

' ===============================
' MENU & BAHAN BAKU DOMAIN
' ===============================
package "Menu & Ingredient Domain" {
  class Ingredient {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +unit: string
    +calories_per_unit: decimal(8,2)
    +stock_qty: decimal(10,2)
    +stock_threshold: decimal(10,2)
  }

  class Menu {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +description: text
    +total_energy_kcal: decimal(8,2)
    +is_active: bool
  }

  class MenuIngredient {
    +menu_id: UUID
    +ingredient_id: UUID
    +quantity: decimal(10,2)
  }

  class PortionCategory {
    +id: UUID
    +code: string  ' small, large, maternal
    +label: string
    +energy_kcal: decimal(6,1)
    +description: text?
  }

  Menu "*" --> "*" Ingredient : composed_of
  MenuIngredient "*" --> "1" PortionCategory : fits_for
  Ingredient "*" --> "1" Tenant : belongs_to
}

' ===============================
' BENEFICIARY DOMAIN
' ===============================
package "Beneficiary Domain" {
  class BeneficiaryCategory {
    +id: UUID
    +code: string
    +label: string
    +energy_kcal: decimal(6,1)
    +portion_category_id: UUID
    +description: text?
  }

  class BeneficiaryGroup {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +type: enum("School","Posyandu","Panti","Community")
    +address: string
    +contact_phone: string
    +portion_small_count: int
    +portion_large_count: int
    +portion_supervisor_count: int
    +total_portions: int
  }

  class BeneficiaryGroupSupervisor {
    +id: UUID
    +beneficiary_group_id: UUID
    +employee_id: UUID
    +role: enum("primary","assistant")
  }

  class BeneficiaryGroupClassSummary {
    +id: UUID
    +beneficiary_group_id: UUID
    +category_summary: string
    +male_small: int
    +female_small: int
    +male_large: int
    +female_large: int
    +notes: text?
  }

  class BeneficiaryIndividual {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +beneficiary_category_id: UUID
    +portion_category_id: UUID
    +full_name: string
    +gender: enum("L","P")
    +allergy_notes: string?
    +is_active: bool
  }

  BeneficiaryGroup "1" --> "*" BeneficiaryGroupSupervisor : has
  BeneficiaryGroup "1" --> "*" BeneficiaryGroupClassSummary : summarizes
  BeneficiaryGroup "1" --> "*" BeneficiaryIndividual : includes
  BeneficiaryIndividual "*" --> "1" BeneficiaryCategory : classified_as
  BeneficiaryCategory "*" --> "1" PortionCategory : uses_portion
}

' ===============================
' SUPPLIER & DISTRIBUTION DOMAIN
' ===============================
package "Supply & Distribution Domain" {
  class Supplier {
    +id: UUID
    +tenant_id: UUID
    +name: string
    +type: enum("Afiliasi","NonAfiliasi")
    +address: string
    +contact_phone: string
    +is_active: bool
  }

  class DistributionRecord {
    +id: UUID
    +tenant_id: UUID
    +beneficiary_group_id: UUID
    +distribution_date: date
    +notes: text?
  }

  class DistributionMenuItem {
    +distribution_record_id: UUID
    +menu_id: UUID
    +portion_category_id: UUID
    +quantity: int
  }

  Supplier "*" --> "1" Tenant : belongs_to
  DistributionRecord "*" --> "*" Menu : distributes
  DistributionRecord "1" --> "*" DistributionMenuItem : has_many
  DistributionRecord "*" --> "1" BeneficiaryGroup : delivers_to
}

@enduml
```

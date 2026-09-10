import React, { useState, useEffect, useRef } from 'react'
import Link from '@docusaurus/Link'
import {
  LabelKiri,
  LabelKanan,
  LabelSepasang,
  OmprengMockup,
} from '../components/StikerOmprengV2/StikerOmprengV2'
import {
  Printer,
  FileText,
  Building2,
  Clock,
  PhoneCall,
  Type,
  UtensilsCrossed,
  Sparkles,
  Tag,
  RotateCw,
  Layers,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Calendar,
  Share2,
  Upload,
  CheckCircle2,
  Scissors,
  Info,
  Copy,
  LayoutGrid,
  X,
  ShieldCheck,
  QrCode,
  Link2,
  Sliders,
  Eye,
  Ruler,
  Loader2,
  AlertCircle,
  Save,
  HardDrive,
  RefreshCw,
  Trash2,
} from 'lucide-react'

// Helper format tanggal Indonesia
const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const MONTH_SHORT_ID = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
]
const DAY_NAMES_ID = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
]

const pad2 = (n) => String(n).padStart(2, '0')

const getTodayISO = () => {
  const now = new Date()
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`
}

const getTomorrowISO = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return `${tomorrow.getFullYear()}-${pad2(tomorrow.getMonth() + 1)}-${pad2(tomorrow.getDate())}`
}

// Konversi YYYY-MM-DD ke berbagai format tampilan Indonesia
const formatTanggalID = (iso, fmt) => {
  if (!iso) return ''
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return String(iso)
  const dt = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (isNaN(dt.getTime())) return String(iso)
  const dd = pad2(dt.getDate())
  const mm = pad2(dt.getMonth() + 1)
  const yyyy = dt.getFullYear()
  switch (fmt) {
    case 'dmy-dash':
      return `${dd}-${mm}-${yyyy}`
    case 'dmy-slash':
      return `${dd}/${mm}/${yyyy}`
    case 'full':
      return `${DAY_NAMES_ID[dt.getDay()]}, ${dd} ${MONTH_NAMES_ID[dt.getMonth()]} ${yyyy}`
    case 'short':
      return `${dd} ${MONTH_SHORT_ID[dt.getMonth()]} ${yyyy}`
    case 'long':
    default:
      return `${dt.getDate()} ${MONTH_NAMES_ID[dt.getMonth()]} ${yyyy}`
  }
}

// Pilihan format tampilan tanggal
const TANGGAL_FORMATS = [
  { id: 'long', label: 'Panjang (10 September 2026)' },
  { id: 'full', label: 'Hari + Panjang (Kamis, 10 September 2026)' },
  { id: 'short', label: 'Pendek (10 Sep 2026)' },
  { id: 'dmy-dash', label: 'Strip (10-09-2026)' },
  { id: 'dmy-slash', label: 'Garis Miring (10/09/2026)' },
]

// Konfigurasi Default Sesuai Surat Edaran BGN 2026
const DEFAULT_CFG = {
  // SPPG & Logo
  namaSppg: 'SPPG JAKARTA PUSAT 1',
  alamatSppg: 'Jl. Kramat Raya No. 123, RT 01/RW 02, Kel. Kwitang, Kec. Senen, Jakarta Pusat',
  logoUrl: '/img/logo-bgn.png',

  // Batas Waktu Konsumsi
  showOrnament: true, // Ornamen selalu ditampilkan dengan kontras hitam pekat (tidak difilter abu-abu)
  waktuMode: 'direct', // 'direct' (jam tercetak) atau 'blank' (kosong untuk stempel/spidol)
  jamKonsumsi: '11:00 WIB',
  showTanggal: false,
  tanggalKonsumsi: getTodayISO(),
  tanggalFormat: 'long', // 'long' | 'full' | 'short' | 'dmy-dash' | 'dmy-slash'

  // Kotak Pengaduan Resmi BGN (Default Ringkas agar tidak terlalu panjang)
  pengaduanCallCenter: '157',
  pengaduanWa: '0811-1020-0157',
  pengaduanWeb: 'bgn.go.id',
  pengaduanEmail: '', // Dikosongkan default agar kotak pengaduan tidak kepanjangan
  pengaduanIg: '',    // Dikosongkan default agar kotak pengaduan tidak kepanjangan
  pengaduanFb: '',
  pengaduanTiktok: '',

  // Lebar Kolom & QR Code Menu & Gizi (Label Kanan)
  widthKolomLarangan: 27, // mm
  showQrMenu: true,
  qrMenuUrl: 'https://bgn.go.id',
  qrMenuText: 'MENU & ANALISIS GIZI',
  qrMenuSub: '',
  fsQrJudul: 5.6,
  fsQrSub: 3.8,

  // Tipografi & Styling
  primaryColor: '#0b2545',
  fontFamily: "Verdana, Geneva, 'DejaVu Sans', sans-serif",
  borderThickness: '1.6pt',
  borderRadius: '2.8mm',

  // Font Sizes fine-tuning
  fsNamaSppg: 8.5,
  fsAlamatSppg: 4.8,
  fsBatasAman: 8.8,
  fsJam: 22,
  fsTanggal: 6.8,
  fsLarangan: 6.8,
  fsSegeraKonsumsi: 6.8,
  fsHeaderPengaduan: 7.5,
  fsIsiPengaduan: 5.1,
  fsQrJudul: 5.2,
  fsQrSub: 3.8,

  // Ukuran font per kontak pengaduan
  fsPengaduanWeb: 5.1,
  fsPengaduanEmail: 5.1,
  fsPengaduanCallCenter: 5.1,
  fsPengaduanWa: 5.1,
  fsPengaduanIg: 5.1,
  fsPengaduanFb: 5.1,
  fsPengaduanTiktok: 5.1,
}

// Preset Jam Konsumsi Cepat
const JAM_PRESETS = [
  '08:00 WIB',
  '08:30 WIB',
  '09:00 WIB',
  '09:30 WIB',
  '10:00 WIB',
  '10:30 WIB',
  '11:00 WIB',
  '11:30 WIB',
  '12:00 WIB',
  '12:30 WIB',
  '13:00 WIB',
  '14:30 WIB',
]

// Pilihan Font untuk Printer Thermal
const FONT_OPTIONS = [
  { label: 'Verdana', value: "Verdana, Geneva, 'DejaVu Sans', sans-serif", desc: 'Optimal untuk teks kecil (203/300 DPI)', badge: 'Rekomendasi BGN' },
  { label: 'Tahoma', value: "Tahoma, Verdana, Geneva, sans-serif", desc: 'Karakter rapat, hemat lebar ruang' },
  { label: 'Arial', value: "Arial, Helvetica, sans-serif", desc: 'Standar struk & pos thermal' },
  { label: 'Segoe UI', value: "'Segoe UI', Tahoma, Verdana, sans-serif", desc: 'Modern & ramping' },
  { label: 'Trebuchet MS', value: "'Trebuchet MS', Verdana, sans-serif", desc: 'Bukaan huruf terbuka' },
  { label: 'Sistem (UI)', value: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", desc: 'Font bawaan perangkat operasi' },
]

// Pengatur Ukuran Font (pt)
const FONT_SIZE_FIELDS = [
  { key: 'fsNamaSppg', label: 'Nama SPPG', min: 4, max: 14, step: 0.1 },
  { key: 'fsAlamatSppg', label: 'Alamat SPPG', min: 3, max: 8, step: 0.1 },
  { key: 'fsBatasAman', label: 'Judul "Harus Dikonsumsi"', min: 5, max: 14, step: 0.1 },
  { key: 'fsJam', label: 'Jam Konsumsi', min: 8, max: 30, step: 0.5 },
  { key: 'fsTanggal', label: 'Tanggal', min: 4, max: 10, step: 0.1 },
  { key: 'fsLarangan', label: 'Teks Larangan Bawa Pulang', min: 4, max: 10, step: 0.1 },
  { key: 'fsSegeraKonsumsi', label: 'Teks Segera Konsumsi', min: 4, max: 10, step: 0.1 },
  { key: 'fsHeaderPengaduan', label: 'Judul Kotak Pengaduan', min: 5, max: 12, step: 0.1 },
  { key: 'fsIsiPengaduan', label: 'Isi Kotak Pengaduan (Global)', min: 3, max: 8, step: 0.1 },
  { key: 'fsQrJudul', label: 'Judul QR Menu & Gizi', min: 3.5, max: 9, step: 0.1 },
  { key: 'fsQrSub', label: 'Subjudul QR Menu', min: 2.5, max: 7, step: 0.1 },
]

// Ukuran font per kontak pengaduan
const PENGADUAN_FONT_FIELDS = [
  { key: 'fsPengaduanWeb', label: 'Website' },
  { key: 'fsPengaduanEmail', label: 'Email' },
  { key: 'fsPengaduanCallCenter', label: 'Call Center' },
  { key: 'fsPengaduanWa', label: 'WhatsApp' },
  { key: 'fsPengaduanIg', label: 'Instagram' },
  { key: 'fsPengaduanFb', label: 'Facebook' },
  { key: 'fsPengaduanTiktok', label: 'TikTok' },
]

// Dynamic loader html-to-image dari package lokal
const loadHtmlToImage = async () => {
  return await import('html-to-image')
}

const STORAGE_KEY = 'stiker_ompreng_v2_config'
const STORAGE_META_KEY = 'stiker_ompreng_v2_meta'

export default function StikerMakanV2Page() {
  const [cfg, setCfg] = useState(DEFAULT_CFG)
  const [colorMode, setColorMode] = useState('bw') // 'bw' (thermal) atau 'color'
  const [cetakTarget, setCetakTarget] = useState('alternating') // 'kiri', 'kanan', 'alternating', 'both_batch', 'sepasang'
  const [jumlahCetak, setJumlahCetak] = useState(1)
  const [activeTab, setActiveTab] = useState('kiri') // 'kiri', 'kanan', 'sepasang', 'ompreng'
  const [editorTab, setEditorTab] = useState('cetak') // 'cetak', 'identitas', 'pengaduan', 'tipografi'
  const [editorMode, setEditorMode] = useState('tabs') // 'tabs' atau 'all'
  const [previewBg, setPreviewBg] = useState('white') // 'white', 'grid', 'roll'
  const [zoomScale, setZoomScale] = useState(1.25)
  const [showCropMarks, setShowCropMarks] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [configJsonInput, setConfigJsonInput] = useState('')
  const [configError, setConfigError] = useState(null)
  const [mobileView, setMobileView] = useState('editor') // 'editor' | 'preview'
  const [hasSavedData, setHasSavedData] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState(null)
  const [storageSizeBytes, setStorageSizeBytes] = useState(0)
  const fileInputRef = useRef(null)

  // Show auto-dismiss toast
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Load Saved Config & Meta from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.tanggalKonsumsi && !/^\d{4}-\d{2}-\d{2}$/.test(parsed.tanggalKonsumsi)) {
            parsed.tanggalKonsumsi = getTodayISO()
          }
          setCfg((prev) => ({ ...prev, ...parsed }))
          setHasSavedData(true)
          setStorageSizeBytes(new Blob([saved]).size)
        }
        const meta = localStorage.getItem(STORAGE_META_KEY)
        if (meta) {
          const parsedMeta = JSON.parse(meta)
          if (parsedMeta.savedTime) setLastSavedTime(parsedMeta.savedTime)
          if (parsedMeta.colorMode) setColorMode(parsedMeta.colorMode)
          if (parsedMeta.cetakTarget) setCetakTarget(parsedMeta.cetakTarget)
          if (parsedMeta.showCropMarks !== undefined) setShowCropMarks(parsedMeta.showCropMarks)
          if (parsedMeta.jumlahCetak) setJumlahCetak(parsedMeta.jumlahCetak)
        }
      } catch (e) {
        console.warn('Gagal membaca saved config:', e)
      }
    }
  }, [])

  // Save Config to LocalStorage (Auto-sync)
  const updateCfg = (newValues) => {
    setCfg((prev) => {
      const updated = { ...prev, ...newValues }
      if (typeof window !== 'undefined') {
        try {
          const jsonStr = JSON.stringify(updated)
          localStorage.setItem(STORAGE_KEY, jsonStr)
          setHasSavedData(true)
          setStorageSizeBytes(new Blob([jsonStr]).size)
        } catch (e) {}
      }
      return updated
    })
  }

  // Handle Explicit Save to LocalStorage
  const handleSaveToLocalStorage = () => {
    if (typeof window === 'undefined') return
    try {
      const now = new Date()
      const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())} WIB`
      const jsonCfg = JSON.stringify(cfg)
      const metaObj = {
        savedTime: timeStr,
        savedIso: now.toISOString(),
        colorMode,
        cetakTarget,
        showCropMarks,
        jumlahCetak,
      }
      localStorage.setItem(STORAGE_KEY, jsonCfg)
      localStorage.setItem(STORAGE_META_KEY, JSON.stringify(metaObj))
      setLastSavedTime(timeStr)
      setHasSavedData(true)
      setStorageSizeBytes(new Blob([jsonCfg]).size)
      triggerToast(`Konfigurasi tersimpan di Local Storage (${timeStr})`)
    } catch (e) {
      triggerToast('Gagal menyimpan ke Local Storage: ' + e.message)
    }
  }

  // Handle Restore from LocalStorage
  const handleRestoreFromLocalStorage = () => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        triggerToast('Belum ada data konfigurasi yang tersimpan di browser ini')
        return
      }
      const parsed = JSON.parse(saved)
      if (parsed.tanggalKonsumsi && !/^\d{4}-\d{2}-\d{2}$/.test(parsed.tanggalKonsumsi)) {
        parsed.tanggalKonsumsi = getTodayISO()
      }
      setCfg((prev) => ({ ...prev, ...parsed }))
      const meta = localStorage.getItem(STORAGE_META_KEY)
      if (meta) {
        const parsedMeta = JSON.parse(meta)
        if (parsedMeta.savedTime) setLastSavedTime(parsedMeta.savedTime)
        if (parsedMeta.colorMode) setColorMode(parsedMeta.colorMode)
        if (parsedMeta.cetakTarget) setCetakTarget(parsedMeta.cetakTarget)
        if (parsedMeta.showCropMarks !== undefined) setShowCropMarks(parsedMeta.showCropMarks)
        if (parsedMeta.jumlahCetak) setJumlahCetak(parsedMeta.jumlahCetak)
      }
      triggerToast('Data konfigurasi berhasil dipulihkan dari Local Storage')
    } catch (e) {
      triggerToast('Gagal memulihkan dari Local Storage: ' + e.message)
    }
  }

  // Handle Clear LocalStorage & Reset to Defaults
  const handleClearLocalStorage = () => {
    if (typeof window === 'undefined') return
    if (!window.confirm('Hapus seluruh data konfigurasi di Local Storage dan reset ke pengaturan awal?')) {
      return
    }
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_META_KEY)
      setHasSavedData(false)
      setLastSavedTime(null)
      setStorageSizeBytes(0)
      setCfg(DEFAULT_CFG)
      setColorMode('bw')
      setCetakTarget('alternating')
      setShowCropMarks(false)
      setJumlahCetak(1)
      triggerToast('Penyimpanan lokal dibersihkan & reset ke standar awal')
    } catch (e) {
      triggerToast('Gagal membersihkan data: ' + e.message)
    }
  }

  // Handle Logo File Upload (Base64)
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      triggerToast('Mohon pilih file gambar (PNG, JPG, SVG, WebP)')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      triggerToast('Ukuran gambar maksimal 2 MB agar performa cetak optimal')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      updateCfg({ logoUrl: ev.target.result })
      triggerToast('Logo SPPG berhasil diperbarui!')
    }
    reader.readAsDataURL(file)
  }

  const isBW = colorMode === 'bw'

  // Hitung Daftar Halaman Cetak Thermal
  const generatePrintLabels = () => {
    const pages = []
    const count = Math.max(1, parseInt(jumlahCetak, 10) || 1)

    if (cetakTarget === 'kiri') {
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kiri', id: `print-kiri-${i}` })
      }
    } else if (cetakTarget === 'kanan') {
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kanan', id: `print-kanan-${i}` })
      }
    } else if (cetakTarget === 'alternating') {
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kiri', id: `print-alt-kiri-${i}` })
        pages.push({ type: 'kanan', id: `print-alt-kanan-${i}` })
      }
    } else if (cetakTarget === 'both_batch') {
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kiri', id: `print-batch-kiri-${i}` })
      }
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kanan', id: `print-batch-kanan-${i}` })
      }
    } else if (cetakTarget === 'sepasang') {
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'sepasang', id: `print-sepasang-${i}` })
      }
    }

    return pages
  }

  // Handle Cetak Langsung Browser
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // Handle Clean Window Print (Isolasi 100% untuk Thermal Printer)
  const handleCleanThermalPrint = () => {
    if (typeof window === 'undefined') return

    const printRoot = document.getElementById('thermal-print-root')
    if (!printRoot) {
      window.print()
      return
    }

    const isPair = cetakTarget === 'sepasang'
    const pageWidthMm = isPair ? 140 : 70
    const pageHeightMm = 50
    const innerHtml = printRoot.innerHTML

    const printWindow = window.open('', '_blank', 'width=560,height=480')
    if (!printWindow) {
      window.print()
      return
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8">
          <title>Cetak Stiker Thermal BGN (${pageWidthMm}×${pageHeightMm} mm)</title>
          <style>
            @page {
              size: ${pageWidthMm}mm ${pageHeightMm}mm;
              margin: 0mm !important;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              width: ${pageWidthMm}mm !important;
              background: #ffffff !important;
              color: #000000 !important;
              font-family: ${cfg.fontFamily || "Verdana, Geneva, 'DejaVu Sans', sans-serif"};
            }
            .thermal-label-page {
              width: ${pageWidthMm}mm !important;
              height: ${pageHeightMm}mm !important;
              page-break-after: always;
              break-after: page;
              overflow: hidden;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justifyContent: center;
            }
          </style>
        </head>
        <body>
          ${innerHtml}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
          </script>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(fullHtml)
    printWindow.document.close()
  }

  // Handle Download PNG Resolusi Tinggi (300 DPI)
  const handleDownloadPng = async (targetIdOrType, filename) => {
    try {
      setIsExporting(true)
      const htmlToImage = await loadHtmlToImage()
      let node = document.getElementById(targetIdOrType)
      if (!node) {
        node = document.getElementById(`export-node-${targetIdOrType}`)
      }
      if (!node) throw new Error('Elemen stiker tidak ditemukan')

      // Pixel ratio 4 menghasilkan resolusi tajam ~1058x756 px (300 DPI untuk 70x50mm)
      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 4,
        quality: 1,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      triggerToast(`Berhasil mengunduh ${filename}.png (300 DPI)`)
    } catch (err) {
      console.error(err)
      triggerToast('Gagal mengunduh: ' + (err.message || err))
    } finally {
      setIsExporting(false)
    }
  }

  // Handle Copy Image ke Clipboard
  const handleCopyPng = async (targetIdOrType) => {
    try {
      setIsExporting(true)
      const htmlToImage = await loadHtmlToImage()
      let node = targetIdOrType ? document.getElementById(targetIdOrType) : null
      if (!node && targetIdOrType) {
        node = document.getElementById(`export-node-${targetIdOrType}`)
      }
      if (!node) {
        const defaultType = activeTab === 'kanan' ? 'kanan' : activeTab === 'kiri' ? 'kiri' : 'sepasang'
        node = document.getElementById(`export-node-${defaultType}`)
      }
      if (!node) throw new Error('Elemen stiker tidak ditemukan')

      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error('Clipboard API gambar tidak didukung di browser ini')
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      triggerToast('Gambar stiker berhasil disalin ke clipboard (300 DPI)')
    } catch (err) {
      console.error(err)
      triggerToast('Gagal menyalin: ' + (err.message || err))
    } finally {
      setIsExporting(false)
    }
  }

  // Handle Export Config to Clipboard
  const handleExportConfig = () => {
    try {
      const jsonStr = JSON.stringify(cfg, null, 2)
      navigator.clipboard.writeText(jsonStr)
      triggerToast('Konfigurasi disalin ke clipboard (JSON)')
    } catch (e) {
      triggerToast('Gagal menyalin konfigurasi: ' + e.message)
    }
  }

  // Handle Import Config
  const handleApplyImportConfig = () => {
    try {
      const parsed = JSON.parse(configJsonInput)
      updateCfg(parsed)
      setShowConfigModal(false)
      setConfigJsonInput('')
      setConfigError(null)
      triggerToast('Konfigurasi berhasil diimpor dan diterapkan')
    } catch (e) {
      setConfigError('Format JSON tidak valid: ' + e.message)
    }
  }

  const printPages = generatePrintLabels()
  const isPairMode = cetakTarget === 'sepasang'
  const estimasiPanjangMeter = ((printPages.length * 52) / 1000).toFixed(1)

  return (
    <main
      className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white dark:selection:bg-blue-600 dark:selection:text-white"
      style={{ accentColor: '#2563eb' }}
    >
      {/* ─── PRINT CSS STYLES (PRESISI THERMAL 70 × 50 mm & 140 × 50 mm) ─── */}
      <style>{`
        @page {
          size: ${isPairMode ? '140mm 50mm' : '70mm 50mm'};
          margin: 0mm !important;
        }
        @media screen {
          #thermal-print-root {
            display: none !important;
          }
        }
        @media print {
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            width: ${isPairMode ? '140mm' : '70mm'} !important;
            color: #000000 !important;
          }
          .no-print-area, nav, footer, header, .navbar, .footer, .no-print {
            display: none !important;
          }
          #thermal-print-root {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .thermal-label-page {
            width: ${isPairMode ? '140mm' : '70mm'} !important;
            height: 50mm !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: flex !important;
            align-items: center !important;
            justifyContent: center !important;
          }
        }
      `}</style>

      {/* ─── TOAST NOTIFICATION (ACCESSIBLE STATUS) ─── */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 dark:bg-slate-900/95 text-white dark:text-slate-100 rounded-xl shadow-xs border border-slate-700/80 dark:border-slate-700 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-1.5 p-1 rounded-md text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* ─── HEADER / NAVIGATION BAR (NO PRINT) ─── */}
      <header className="no-print-area border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xs dark:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md ring-1 ring-white/20 shrink-0 select-none">
              7×5
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight m-0 text-slate-900 dark:text-white text-balance">
                  Stiker Makan V2
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-slate-700 whitespace-nowrap shadow-2xs">
                  <ShieldCheck className="w-3 h-3" /> Standar BGN 2026
                </span>
                <span className="hidden md:inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-cyan-300 border border-slate-200 dark:border-slate-800 whitespace-nowrap font-mono">
                  Thermal Ready · 70 × 50 mm
                </span>
                {hasSavedData && (
                  <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700 whitespace-nowrap font-mono tabular-nums shadow-2xs">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Tersimpan {lastSavedTime ? `(${lastSavedTime})` : ''}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-blue-200/80 m-0 hidden sm:block">
                Generator Label Thermal Roll 70 × 50 mm • Khusus Dapur SPPG &amp; Kotak Pengaduan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              to="/stiker-makan"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              <span>←</span>
              <span className="hidden xs:inline sm:inline">Versi 1</span>
            </Link>

            <button
              type="button"
              onClick={handleSaveToLocalStorage}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-400 dark:border-slate-700 bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none shadow-2xs"
              title="Simpan konfigurasi ke Local Storage browser"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simpan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.confirm('Kembalikan semua konfigurasi ke standar awal SE BGN 2026?')) {
                  updateCfg(DEFAULT_CFG)
                  triggerToast('Konfigurasi dikembalikan ke default')
                }
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              title="Reset semua pengaturan ke standar awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              title="Kelola Penyimpanan Lokal atau Impor/Ekspor JSON"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span className="hidden sm:inline">Data &amp; Backup</span>
            </button>

            <button
              type="button"
              onClick={handleCleanThermalPrint}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak ({printPages.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── WORKSPACE (NO PRINT) ─── */}
      <div className="no-print-area max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        
        {/* ─── MOBILE VIEW SWITCHER (< 1024px) ─── */}
        <div className="lg:hidden sticky top-[57px] z-30 mb-4 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
              mobileView === 'editor'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-200 dark:ring-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Pengaturan</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
              mobileView === 'preview'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-200 dark:ring-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau ({activeTab === 'kiri' ? 'Kiri' : activeTab === 'kanan' ? 'Kanan' : activeTab === 'sepasang' ? '14×5' : 'Ompreng'})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ─── PANEL KONTROL KIRI (EDITOR SETTINGS) ─── */}
          <section className={`lg:col-span-5 flex-col gap-4 ${mobileView === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
            
            {/* Navigasi Kategori Editor (Tabs / All) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 sm:p-2 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2">
              <nav role="tablist" aria-label="Kategori Pengaturan Label" className="flex items-center gap-1 flex-1 overflow-x-auto text-xs font-semibold">
                <button
                  type="button"
                  role="tab"
                  aria-selected={editorTab === 'cetak'}
                  onClick={() => setEditorTab('cetak')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    editorTab === 'cetak' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak &amp; Roll</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={editorTab === 'identitas'}
                  onClick={() => setEditorTab('identitas')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    editorTab === 'identitas' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>SPPG &amp; Waktu</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={editorTab === 'pengaduan'}
                  onClick={() => setEditorTab('pengaduan')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    editorTab === 'pengaduan' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Pengaduan &amp; QR</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={editorTab === 'tipografi'}
                  onClick={() => setEditorTab('tipografi')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    editorTab === 'tipografi' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Tipografi</span>
                </button>
              </nav>

              <button
                type="button"
                onClick={() => setEditorMode((prev) => (prev === 'tabs' ? 'all' : 'tabs'))}
                title={editorMode === 'tabs' ? 'Buka Semua Bagian' : 'Sederhanakan dengan Tab'}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer shrink-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{editorMode === 'tabs' ? 'Lihat Semua' : 'Mode Tab'}</span>
              </button>
            </div>

            {/* FORM CONTAINER */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              
              {/* 1. Pengaturan Thermal & Cetak Cepat */}
              {(editorMode === 'all' || editorTab === 'cetak') && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                      <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Opsi Cetak Printer Thermal</span>
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-slate-700 font-mono">
                      Ukuran: 70 × 50 mm
                    </span>
                  </div>

                  {/* Pilihan Target Cetak */}
                  <fieldset className="mb-4 border-0 p-0 m-0">
                    <legend className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Pilih Label yang Hendak Dicetak:
                    </legend>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => { setCetakTarget('kiri'); setActiveTab('kiri'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                          cetakTarget === 'kiri'
                            ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-blue-600" />
                          <span>Label Kiri Saja</span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-blue-200/80 mt-0.5">SPPG &amp; Batas Waktu (70×50)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('kanan'); setActiveTab('kanan'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                          cetakTarget === 'kanan'
                            ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Label Kanan Saja</span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-emerald-200/80 mt-0.5">Larangan &amp; Pengaduan (70×50)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('alternating'); setActiveTab('sepasang'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                          cetakTarget === 'alternating'
                            ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Bergantian (Urut)</span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-indigo-200/80 mt-0.5">1 Kiri, lalu 1 Kanan urut</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('both_batch'); setActiveTab('sepasang'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                          cetakTarget === 'both_batch'
                            ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-purple-600" />
                          <span>Batch Terpisah</span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-purple-200/80 mt-0.5">N Kiri dulu, lalu N Kanan</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('sepasang'); setActiveTab('sepasang'); }}
                        className={`col-span-2 p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                          cetakTarget === 'sepasang'
                            ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Sepasang Berjejer (Format 140 × 50 mm)</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-blue-200 border border-slate-200 dark:border-slate-800">
                            Printer Lebar 14cm
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-blue-200/80 mt-0.5">
                          Kedua label dicetak bersebelahan dalam satu lembar stiker memanjang.
                        </div>
                      </button>
                    </div>
                  </fieldset>

                  {/* Jumlah Label & Mode Warna */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label htmlFor="jumlahCetakInput" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {cetakTarget === 'alternating' || cetakTarget === 'both_batch' ? 'Jumlah Pasang (Ompreng):' : 'Jumlah Stiker:'}
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setJumlahCetak((prev) => Math.max(1, prev - 1))}
                          className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                          aria-label="Kurangi jumlah cetak"
                        >
                          -
                        </button>
                        <input
                          id="jumlahCetakInput"
                          type="number"
                          min="1"
                          max="1000"
                          value={jumlahCetak}
                          onChange={(e) => setJumlahCetak(Math.max(1, parseInt(e.target.value, 10) || 1))}
                          className="w-full text-center py-2 px-2 text-xs font-bold font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setJumlahCetak((prev) => prev + 1)}
                          className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                          aria-label="Tambah jumlah cetak"
                        >
                          +
                        </button>
                      </div>

                      {/* Tombol Cepat Batch */}
                      <div className="flex items-center gap-1 mt-1.5">
                        {[10, 50, 100].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setJumlahCetak((prev) => prev + num)}
                            className="text-[10px] font-semibold font-mono tabular-nums px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-all active:scale-[0.95]"
                          >
                            +{num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Mode Warna Cetak:
                      </label>
                      <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setColorMode('bw')}
                          className={`py-2 px-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                            isBW
                              ? 'bg-slate-900 text-white shadow-xs dark:bg-slate-800 dark:text-white dark:ring-1 dark:ring-slate-700'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>Hitam Putih (B&amp;W)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setColorMode('color')}
                          className={`py-2 px-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                            !isBW
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>Warna Resmi</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-blue-200/70 mt-1">
                        {isBW ? 'Direkomendasikan untuk printer thermal 203 DPI' : 'Untuk printer inkjet / stiker chromo berwarna'}
                      </p>
                    </div>
                  </div>

                  {/* Crop Marks Toggle */}
                  <div className="flex items-center justify-between py-2 px-3 mb-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <label htmlFor="cropMarksToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer select-none">
                      <Scissors className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>Garis Bantu Potong / Batas (Crop Marks)</span>
                    </label>
                    <input
                      id="cropMarksToggle"
                      type="checkbox"
                      checked={showCropMarks}
                      onChange={(e) => setShowCropMarks(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Ornamen Pangan Toggle (Default Nonaktif/Diabaikan) */}
                  <div className="flex items-center justify-between py-2 px-3 mb-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <label htmlFor="showOrnamentToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer select-none">
                        <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                        <span>Strip Ornamen Sayur &amp; Pangan</span>
                      </label>
                      <p className="text-[10px] text-slate-500 dark:text-slate-300 m-0">
                        Menampilkan strip ornamen asli dengan kontras hitam pekat (tidak pudar jadi abu-abu di mode B&amp;W).
                      </p>
                    </div>
                    <input
                      id="showOrnamentToggle"
                      type="checkbox"
                      checked={cfg.showOrnament ?? true}
                      onChange={(e) => updateCfg({ showOrnament: e.target.checked })}
                      className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Ringkasan Output Kertas Roll */}
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-slate-950 border border-blue-200 dark:border-slate-800 mb-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-600 dark:text-slate-300">
                        Total Output: <strong className="font-black text-blue-600 dark:text-blue-400 text-sm font-mono tabular-nums">{printPages.length} label</strong>
                        <span className="text-[11px] text-slate-500 dark:text-blue-200/80 ml-1 font-mono">(@ 70 × 50 mm)</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-blue-200/80 mt-0.5 font-mono tabular-nums">
                        Estimasi panjang roll kertas: <strong>~{estimasiPanjangMeter} meter</strong>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-slate-700">
                        <Check className="w-3 h-3" /> Siap Roll Thermal
                      </span>
                    </div>
                  </div>

                  {/* Tombol Aksi Cetak */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCleanThermalPrint}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Thermal Presisi</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white dark:text-slate-200 border border-transparent dark:border-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Cetak Dialog Browser</span>
                    </button>
                  </div>

                  {/* Status Penyimpanan Lokal */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span>{hasSavedData ? `Tersimpan di browser (${storageSizeBytes > 0 ? `${(storageSizeBytes / 1024).toFixed(1)} KB` : ''})` : 'Belum tersimpan di browser'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleSaveToLocalStorage}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                    >
                      <Save className="w-3 h-3" />
                      <span>Simpan Sekarang</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Form Identitas SPPG & Logo */}
              {(editorMode === 'all' || editorTab === 'identitas') && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Identitas SPPG &amp; Dapur BGN</span>
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="namaSppgInput" className="font-semibold text-slate-700 dark:text-slate-300">
                          Nama Satuan Pelayanan (SPPG):
                        </label>
                        <span className="text-[10px] text-slate-500 dark:text-blue-200/75">Tekan Enter untuk baris baru</span>
                      </div>
                      <textarea
                        id="namaSppgInput"
                        rows={2}
                        value={cfg.namaSppg}
                        onChange={(e) => updateCfg({ namaSppg: e.target.value })}
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold uppercase text-xs leading-relaxed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        placeholder={'Contoh:\nSPPG JAKARTA PUSAT 1\natau baris kedua untuk detail wilayah'}
                      />
                    </div>

                    <div>
                      <label htmlFor="alamatSppgInput" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Alamat Lengkap SPPG / Dapur:
                      </label>
                      <textarea
                        id="alamatSppgInput"
                        rows={2}
                        value={cfg.alamatSppg}
                        onChange={(e) => updateCfg({ alamatSppg: e.target.value })}
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs leading-relaxed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        placeholder="Alamat jalan, kelurahan, kecamatan, kota/kabupaten..."
                      />
                    </div>

                    {/* Logo SPPG / BGN dengan File Picker */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Logo SPPG / Badan Gizi Nasional:
                      </label>
                      <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/80">
                        <div className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                          <img
                            src={cfg.logoUrl}
                            alt="Preview Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none shadow-2xs"
                            >
                              <Upload className="w-3 h-3 text-blue-600" />
                              <span>Unggah Logo Baru</span>
                            </button>

                            {cfg.logoUrl !== '/img/logo-bgn.png' && (
                              <button
                                type="button"
                                onClick={() => {
                                  updateCfg({ logoUrl: '/img/logo-bgn.png' })
                                  triggerToast('Logo dikembalikan ke Logo BGN Resmi')
                                }}
                                className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-200 cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                              >
                                Reset ke Logo BGN
                              </button>
                            )}
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                          <p className="text-[10px] text-slate-500 dark:text-blue-200/70 m-0 mt-1 truncate">
                            {cfg.logoUrl.startsWith('data:') ? 'Menggunakan logo khusus lokal' : cfg.logoUrl}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Section: Batas Waktu Konsumsi (Label Kiri) */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Batas Waktu Konsumsi (Label Kiri)</span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      {/* Mode Waktu: Jam Tercetak vs Kolom Kosong */}
                      <fieldset className="border-0 p-0 m-0">
                        <legend className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Mode Tampilan Waktu:
                        </legend>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => updateCfg({ waktuMode: 'direct' })}
                            className={`py-2 px-3 rounded-xl border text-left font-semibold cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                              cfg.waktuMode === 'direct'
                                ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                                : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span>Jam Tercetak</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-blue-200/80 mt-0.5">Cetak jam langsung di stiker</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateCfg({ waktuMode: 'blank' })}
                            className={`py-2 px-3 rounded-xl border text-left font-semibold cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                              cfg.waktuMode === 'blank'
                                ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                                : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                              <span>Kolom Kosong</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-blue-200/80 mt-0.5">Untuk stempel / tulis spidol</div>
                          </button>
                        </div>
                      </fieldset>

                      {cfg.waktuMode === 'direct' && (
                        <div className="space-y-3 pt-1">
                          <div>
                            <label htmlFor="jamKonsumsiInput" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Teks Jam Konsumsi:
                            </label>
                            <input
                              id="jamKonsumsiInput"
                              type="text"
                              value={cfg.jamKonsumsi}
                              onChange={(e) => updateCfg({ jamKonsumsi: e.target.value })}
                              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-black text-sm tracking-wider focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="Contoh: 11:00 WIB"
                            />

                            {/* Tombol Cepat Pilihan Jam */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {JAM_PRESETS.map((jp) => (
                                <button
                                  key={jp}
                                  type="button"
                                  onClick={() => updateCfg({ jamKonsumsi: jp })}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold font-mono tabular-nums border cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                                    cfg.jamKonsumsi === jp
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {jp}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggle Cantumkan Tanggal */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="showTanggalCheckbox"
                              checked={cfg.showTanggal}
                              onChange={(e) => updateCfg({ showTanggal: e.target.checked })}
                              className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                            />
                            <label htmlFor="showTanggalCheckbox" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                              Cantumkan Tanggal di Bawah Jam
                            </label>
                          </div>

                          {cfg.showTanggal && (
                            <div className="space-y-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
                              <div>
                                <label htmlFor="tanggalKonsumsiInput" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                  Pilih Tanggal:
                                </label>
                                <div className="flex items-center gap-1.5">
                                  <input
                                    id="tanggalKonsumsiInput"
                                    type="date"
                                    value={/^\d{4}-\d{2}-\d{2}$/.test(cfg.tanggalKonsumsi || '') ? cfg.tanggalKonsumsi : ''}
                                    onChange={(e) => updateCfg({ tanggalKonsumsi: e.target.value })}
                                    className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateCfg({ tanggalKonsumsi: getTodayISO() })}
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                                  >
                                    Hari Ini
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateCfg({ tanggalKonsumsi: getTomorrowISO() })}
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                                  >
                                    Besok
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                  Format Tampilan Tanggal:
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {TANGGAL_FORMATS.map((tf) => (
                                    <button
                                      key={tf.id}
                                      type="button"
                                      title={tf.label}
                                      onClick={() => updateCfg({ tanggalFormat: tf.id })}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold border cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                                        (cfg.tanggalFormat || 'long') === tf.id
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                                      }`}
                                    >
                                      {formatTanggalID(cfg.tanggalKonsumsi || getTodayISO(), tf.id)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Form Kotak Pengaduan BGN (Label Kanan) */}
              {/* 3. Form Kotak Pengaduan & QR Code BGN (Label Kanan) */}
              {(editorMode === 'all' || editorTab === 'pengaduan') && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Saluran Kontak &amp; QR Code (Label Kanan)</span>
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Proporsi Lebar Kolom Label Kanan (Lebar Larangan vs Kontak & QR) */}
                    <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="slider-widthKolomLarangan" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Proporsi Lebar Kolom Label Kanan:</span>
                        </label>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 font-bold tabular-nums">
                            Larangan: {cfg.widthKolomLarangan || 27} mm
                          </span>
                          <span className="text-slate-400 dark:text-blue-300/80">vs</span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700 font-bold tabular-nums">
                            Kontak &amp; QR: {(63 - (cfg.widthKolomLarangan || 27)).toFixed(0)} mm
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-blue-200/80 mb-2">
                        Lebar kolom larangan (kiri) dapat dipersempit agar kotak pengaduan dan QR Code di sisi kanan memiliki ruang horizontal lebih lebar dan tidak terpotong.
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500 dark:text-blue-200/80 shrink-0 font-semibold">22 mm (Ramping)</span>
                        <input
                          id="slider-widthKolomLarangan"
                          type="range"
                          min={22}
                          max={36.5}
                          step={0.5}
                          value={cfg.widthKolomLarangan || 27}
                          onChange={(e) => updateCfg({ widthKolomLarangan: parseFloat(e.target.value) })}
                          className="flex-1 accent-blue-600 cursor-pointer"
                          aria-label="Lebar Kolom Larangan (mm)"
                        />
                        <span className="text-[10px] text-slate-500 dark:text-blue-200/80 shrink-0 font-semibold">36.5 mm (Standar Lama)</span>
                      </div>

                      {/* Preset Cepat Lebar Kolom */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {[
                          { label: 'Standar Baru (27 mm)', val: 27, badge: 'Rekomendasi' },
                          { label: 'Ekstra Luas (25 mm)', val: 25 },
                          { label: 'Seimbang (29 mm)', val: 29 },
                          { label: 'Standar Lama (36.5 mm)', val: 36.5 },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => updateCfg({ widthKolomLarangan: item.val })}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold border cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                              (cfg.widthKolomLarangan || 27) === item.val
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Kontak Pengaduan Resmi BGN */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 m-0">
                          Daftar Saluran Pengaduan BGN:
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-blue-200/75">Pilih mode ringkas agar tidak kepanjangan</span>
                      </div>

                      {/* Tombol Cepat Pilihan Mode Kontak */}
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            updateCfg({
                              pengaduanCallCenter: '157',
                              pengaduanWa: '0811-1020-0157',
                              pengaduanWeb: 'bgn.go.id',
                              pengaduanEmail: '',
                              pengaduanIg: '',
                              pengaduanFb: '',
                              pengaduanTiktok: '',
                            })
                            triggerToast('Mode Ringkas aktif (157, WA, Web)')
                          }}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-bold border border-blue-500 bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 cursor-pointer shadow-2xs transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        >
                          Ringkas: 157, WA &amp; Web (Rekomendasi)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateCfg({
                              pengaduanCallCenter: '157',
                              pengaduanWa: '0811-1020-0157',
                              pengaduanWeb: 'bgn.go.id',
                              pengaduanEmail: 'pengaduan@bgn.go.id',
                              pengaduanIg: '',
                              pengaduanFb: '',
                              pengaduanTiktok: '',
                            })
                            triggerToast('Mode Standar aktif (+ Email)')
                          }}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        >
                          Standar (+ Email)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateCfg({
                              pengaduanCallCenter: '157',
                              pengaduanWa: '0811-1020-0157',
                              pengaduanWeb: 'bgn.go.id',
                              pengaduanEmail: 'pengaduan@bgn.go.id',
                              pengaduanIg: '@badangizinasional.ri',
                              pengaduanFb: 'Badan Gizi Nasional RI',
                              pengaduanTiktok: '@badangizinasional.ri',
                            })
                            triggerToast('Mode Lengkap aktif (+ Medsos)')
                          }}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        >
                          Lengkap (+ Medsos)
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="callCenterInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              Call Center BGN:
                            </label>
                            <input
                              id="callCenterInput"
                              type="tel"
                              value={cfg.pengaduanCallCenter}
                              onChange={(e) => updateCfg({ pengaduanCallCenter: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-bold font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="157"
                            />
                          </div>
                          <div>
                            <label htmlFor="waInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              WhatsApp Hotline:
                            </label>
                            <input
                              id="waInput"
                              type="tel"
                              value={cfg.pengaduanWa}
                              onChange={(e) => updateCfg({ pengaduanWa: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="0811-1020-0157"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="webInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              Website Resmi:
                            </label>
                            <input
                              id="webInput"
                              type="text"
                              value={cfg.pengaduanWeb}
                              onChange={(e) => updateCfg({ pengaduanWeb: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="bgn.go.id"
                            />
                          </div>
                          <div>
                            <label htmlFor="emailInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              Email Pengaduan:
                            </label>
                            <input
                              id="emailInput"
                              type="email"
                              value={cfg.pengaduanEmail}
                              onChange={(e) => updateCfg({ pengaduanEmail: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="pengaduan@bgn.go.id"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-0.5">
                          <div>
                            <label htmlFor="igInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              Instagram:
                            </label>
                            <input
                              id="igInput"
                              type="text"
                              value={cfg.pengaduanIg}
                              onChange={(e) => updateCfg({ pengaduanIg: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-[11px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="@badangizinasional.ri"
                            />
                          </div>
                          <div>
                            <label htmlFor="fbInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              Facebook:
                            </label>
                            <input
                              id="fbInput"
                              type="text"
                              value={cfg.pengaduanFb}
                              onChange={(e) => updateCfg({ pengaduanFb: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-[11px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="Badan Gizi Nasional RI"
                            />
                          </div>
                          <div>
                            <label htmlFor="tiktokInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-200 mb-0.5">
                              TikTok:
                            </label>
                            <input
                              id="tiktokInput"
                              type="text"
                              value={cfg.pengaduanTiktok}
                              onChange={(e) => updateCfg({ pengaduanTiktok: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-[11px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                              placeholder="@badangizinasional.ri"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fine-Tuning Ukuran Font Tiap Kontak */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Fine-Tuning Ukuran Font Kontak:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const reset = {}
                            PENGADUAN_FONT_FIELDS.forEach((pf) => {
                              reset[pf.key] = DEFAULT_CFG.fsIsiPengaduan
                            })
                            updateCfg(reset)
                          }}
                          className="text-[10px] font-semibold text-slate-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded px-1 transition-all"
                        >
                          Reset font kontak
                        </button>
                      </div>

                      <div className="space-y-2">
                        {PENGADUAN_FONT_FIELDS.map((pf) => (
                          <div key={pf.key} className="flex items-center gap-2">
                            <label htmlFor={`slider-${pf.key}`} className="w-[75px] shrink-0 text-[10px] font-semibold text-slate-600 dark:text-slate-200 truncate">
                              {pf.label}
                            </label>
                            <input
                              id={`slider-${pf.key}`}
                              type="range"
                              min={2.8}
                              max={8}
                              step={0.1}
                              value={cfg[pf.key] ?? cfg.fsIsiPengaduan}
                              onChange={(e) => updateCfg({ [pf.key]: parseFloat(e.target.value) })}
                              className="flex-1 accent-blue-600 cursor-pointer"
                              aria-label={`Ukuran font ${pf.label}`}
                            />
                            <span className="w-[42px] shrink-0 text-right text-[10px] font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                              {Number(cfg[pf.key] ?? cfg.fsIsiPengaduan).toFixed(1)} pt
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ─── FITUR QR CODE MENU & ANALISIS GIZI ─── */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>QR Code Menu &amp; Analisis Gizi</span>
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700">
                          Di Bawah Kontak
                        </span>
                      </div>

                      {/* Toggle Tampilkan QR Code */}
                      <div className="flex items-center justify-between p-3 mb-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs">
                        <div>
                          <label htmlFor="showQrMenuToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                            <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tampilkan QR Code Menu &amp; Gizi</span>
                          </label>
                          <p className="text-[10px] text-slate-500 dark:text-slate-300 m-0">
                            Menempatkan kotak QR Code di bawah kotak pengaduan pada Label Kanan.
                          </p>
                        </div>
                        <input
                          id="showQrMenuToggle"
                          type="checkbox"
                          checked={cfg.showQrMenu ?? true}
                          onChange={(e) => updateCfg({ showQrMenu: e.target.checked })}
                          className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                        />
                      </div>

                      {(cfg.showQrMenu ?? true) && (
                        <div className="space-y-3 p-3.5 rounded-xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200 dark:border-slate-800 animate-in fade-in duration-150">
                          {/* Input Tautan / URL */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label htmlFor="qrMenuUrlInput" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <Link2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Tautan / Link Menu &amp; Gizi:</span>
                              </label>
                              <span className="text-[10px] text-slate-500 dark:text-emerald-300/80">Generate otomatis</span>
                            </div>
                            <input
                              id="qrMenuUrlInput"
                              type="url"
                              value={cfg.qrMenuUrl || ''}
                              onChange={(e) => updateCfg({ qrMenuUrl: e.target.value })}
                              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none transition-all"
                              placeholder="https://bgn.go.id atau tautan menu SPPG"
                            />

                            {/* Tombol Preset URL Cepat */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {[
                                { label: 'bgn.go.id', url: 'https://bgn.go.id' },
                                { label: '/menu-hari-ini', url: 'https://bgn.go.id/menu' },
                                { label: '/analisis-gizi', url: 'https://bgn.go.id/analisis-gizi' },
                                { label: 'Web SPPG', url: cfg.pengaduanWeb ? (cfg.pengaduanWeb.startsWith('http') ? cfg.pengaduanWeb : `https://${cfg.pengaduanWeb}`) : 'https://bgn.go.id' },
                              ].map((preset) => (
                                <button
                                  key={preset.label}
                                  type="button"
                                  onClick={() => updateCfg({ qrMenuUrl: preset.url })}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border cursor-pointer transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                                    cfg.qrMenuUrl === preset.url
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                      : 'border-emerald-200 dark:border-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-800 text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900'
                                  }`}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Judul & Ukuran Font QR */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label htmlFor="qrMenuTextInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-200 mb-1">
                                Judul di Atas QR:
                              </label>
                              <input
                                id="qrMenuTextInput"
                                type="text"
                                value={cfg.qrMenuText || ''}
                                onChange={(e) => updateCfg({ qrMenuText: e.target.value })}
                                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-bold uppercase focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none transition-all"
                                placeholder="MENU & ANALISIS GIZI"
                              />
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <label htmlFor="slider-fsQrJudul" className="font-semibold text-slate-600 dark:text-slate-200">
                                  Ukuran Font Judul QR:
                                </label>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums text-[10px]">
                                  {Number(cfg.fsQrJudul || 5.6).toFixed(1)} pt
                                </span>
                              </div>
                              <input
                                id="slider-fsQrJudul"
                                type="range"
                                min={3.5}
                                max={8}
                                step={0.1}
                                value={cfg.fsQrJudul || 5.6}
                                onChange={(e) => updateCfg({ fsQrJudul: parseFloat(e.target.value) })}
                                className="w-full accent-emerald-600 cursor-pointer"
                                aria-label="Ukuran font Judul QR"
                              />
                            </div>
                          </div>

                          {/* Petunjuk Pemindaian */}
                          <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900 border border-emerald-200/80 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>
                              Format simpel &amp; presisi: Teks <strong>MENU &amp; ANALISIS GIZI</strong> di atas, dan QR Code di bawahnya.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Form Tipografi & Font Semua Tulisan */}
              {(editorMode === 'all' || editorTab === 'tipografi') && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                      <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Font &amp; Tipografi Semua Tulisan</span>
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-blue-200/80 mb-2">
                    Berlaku serentak untuk seluruh elemen teks pada Label Kiri &amp; Label Kanan.
                  </p>

                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-slate-950 border border-emerald-200 dark:border-slate-800 text-[11px] text-emerald-800 dark:text-emerald-300 mb-3">
                    <Info className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>
                      <strong>Rekomendasi Thermal:</strong> Gunakan font sans-serif bersudut tegas seperti <strong>Verdana</strong> atau <strong>Tahoma</strong> agar tulisan di ukuran 4–8pt tetap tajam dan tidak kabur pada printer thermal 203 DPI.
                    </span>
                  </div>

                  {/* Pilihan Font Kurasi */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    {FONT_OPTIONS.map((f) => {
                      const active = cfg.fontFamily === f.value
                      return (
                        <button
                          key={f.label}
                          type="button"
                          onClick={() => updateCfg({ fontFamily: f.value })}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                            active
                              ? 'bg-blue-50/90 dark:bg-slate-800 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500/80'
                              : 'border-slate-200 dark:border-slate-800 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between" style={{ fontFamily: f.value }}>
                            <span>Ag {f.label}</span>
                            {f.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-px rounded-full bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700">
                                {f.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-blue-200/80 truncate mt-0.5" style={{ fontFamily: f.value }}>
                            HARUS DIKONSUMSI 123
                          </div>
                          {f.desc && (
                            <div className="text-[9px] text-slate-500 dark:text-slate-300 mt-0.5">
                              {f.desc}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Ukuran Font per Bagian */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Ukuran Font Detail (pt)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const reset = {}
                          FONT_SIZE_FIELDS.forEach((f) => {
                            reset[f.key] = DEFAULT_CFG[f.key]
                          })
                          updateCfg(reset)
                          triggerToast('Ukuran font berhasil direset ke standar default')
                        }}
                        className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer flex items-center gap-1 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Ukuran</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {FONT_SIZE_FIELDS.map((f) => (
                        <div key={f.key}>
                          <div className="flex items-center justify-between text-[11px] mb-0.5">
                            <label htmlFor={`slider-font-${f.key}`} className="font-semibold text-slate-600 dark:text-slate-200">
                              {f.label}
                            </label>
                            <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                              {Number(cfg[f.key]).toFixed(1)} pt
                            </span>
                          </div>
                          <input
                            id={`slider-font-${f.key}`}
                            type="range"
                            min={f.min}
                            max={f.max}
                            step={f.step}
                            value={cfg[f.key]}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value)
                              if (f.key === 'fsIsiPengaduan') {
                                const all = { fsIsiPengaduan: v }
                                PENGADUAN_FONT_FIELDS.forEach((p) => {
                                  all[p.key] = v
                                })
                                updateCfg(all)
                              } else {
                                updateCfg({ [f.key]: v })
                              }
                            }}
                            className="w-full accent-blue-600 cursor-pointer"
                            aria-label={f.label}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </form>

            {/* Quick jump to preview on mobile */}
            <div className="lg:hidden mt-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileView('preview')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Hasil Pratinjau Langsung →</span>
              </button>
            </div>
          </section>

          {/* ─── PANEL PREVIEW KANAN (ARCHITECTURAL INSPECTION STUDIO) ─── */}
          <section className={`lg:col-span-7 flex-col gap-4 lg:sticky lg:top-[74px] lg:self-start ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
            
            {/* Quick jump back to editor on mobile */}
            <div className="lg:hidden mb-1">
              <button
                type="button"
                onClick={() => {
                  setMobileView('editor')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>← Kembali ke Pengaturan</span>
              </button>
            </div>

            {/* Tab Navigasi Preview & Zoom Controls */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <nav role="tablist" aria-label="Tampilan Format Preview" className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'kiri'}
                  onClick={() => setActiveTab('kiri')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    activeTab === 'kiri'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Label Kiri (7×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'kanan'}
                  onClick={() => setActiveTab('kanan')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    activeTab === 'kanan'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Label Kanan (7×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'sepasang'}
                  onClick={() => setActiveTab('sepasang')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                    activeTab === 'sepasang'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Sepasang (14×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'ompreng'}
                  onClick={() => setActiveTab('ompreng')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                    activeTab === 'ompreng'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Simulasi Ompreng</span>
                </button>
              </nav>

              {/* Zoom Controls & Quick Presets */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-500 dark:text-blue-200/90 font-semibold mr-0.5 text-[11px]">Zoom:</span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.7, Math.round((prev - 0.1) * 10) / 10))}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                  aria-label="Perkecil zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-[11px] font-mono tabular-nums text-slate-700 dark:text-slate-200">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(2.5, Math.round((prev + 0.1) * 10) / 10))}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                  aria-label="Perbesar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1 ml-1">
                  <button
                    type="button"
                    onClick={() => setZoomScale(1.0)}
                    title="Skala Nyata 100% (70x50 mm)"
                    className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-semibold cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      zoomScale === 1.0
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomScale(1.25)}
                    title="Skala Nyaman 125%"
                    className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-semibold cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      zoomScale === 1.25
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    125%
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Canvas Container (Architectural Light-Table) */}
            <div
              className={`rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center justify-start min-h-[460px] max-h-[74vh] overflow-auto overscroll-contain relative transition-colors ${
                previewBg === 'grid'
                  ? 'bg-slate-100/70 dark:bg-slate-950'
                  : previewBg === 'roll'
                  ? 'bg-slate-200/50 dark:bg-slate-900'
                  : 'bg-white dark:bg-slate-950'
              }`}
            >
              
              {/* Toolbar Atas Preview: Caliper Info & Mode Latar Belakang */}
              <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4">
                {activeTab !== 'ompreng' ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-blue-200/80 select-none">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                      <span>↔ Lebar:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{activeTab === 'sepasang' ? '14,0 cm' : '7,0 cm'}</strong>
                      <span className="text-slate-400 dark:text-blue-300/80">({activeTab === 'sepasang' ? '140 mm' : '70 mm'})</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                      <span>↕ Tinggi:</span>
                      <strong className="text-slate-800 dark:text-slate-200">5,0 cm</strong>
                      <span className="text-slate-400 dark:text-blue-300/80">(50 mm)</span>
                    </span>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-blue-600" />
                    <span>Simulasi Tutup Ompreng Segel Sesuai Gambar 2 Lampiran SE BGN</span>
                  </div>
                )}

                {/* Background Switcher */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-blue-200/80">
                  <span className="mr-0.5">Latar:</span>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('white')}
                    className={`px-2 py-0.5 rounded-lg border text-[11px] font-medium cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      previewBg === 'white'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Polos
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('grid')}
                    className={`px-2 py-0.5 rounded-lg border text-[11px] font-medium cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      previewBg === 'grid'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Grid Presisi
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('roll')}
                    className={`px-2 py-0.5 rounded-lg border text-[11px] font-medium cursor-pointer transition-all active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      previewBg === 'roll'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Roll Kertas
                  </button>
                </div>
              </div>

              {/* Architectural Canvas / Light Table Display */}
              <div
                className="w-full flex items-center justify-center py-4 my-auto overflow-x-auto overflow-y-visible"
                style={{ minHeight: '320px' }}
              >
                <div
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginBottom: `${Math.max(0, (zoomScale - 1) * 220)}px`,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Caliper Horizontal (Lebar) */}
                  {activeTab !== 'ompreng' && (
                    <div className="w-full flex items-center justify-between text-[10px] font-mono font-semibold text-slate-500 dark:text-cyan-300 mb-2 select-none px-1">
                      <div className="flex items-center gap-1.5 w-full">
                        <div className="h-2.5 w-[1px] bg-slate-400 dark:bg-slate-500"></div>
                        <div className="h-[1px] flex-1 bg-slate-300 dark:bg-slate-700"></div>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[9px] uppercase tracking-wider tabular-nums font-mono text-slate-700 dark:text-cyan-300">
                          {activeTab === 'sepasang' ? '140.0 mm (Lebar 2 Label)' : '70.0 mm (Lebar Standar)'}
                        </span>
                        <div className="h-[1px] flex-1 bg-slate-300 dark:bg-slate-700"></div>
                        <div className="h-2.5 w-[1px] bg-slate-400 dark:bg-slate-500"></div>
                      </div>
                    </div>
                  )}

                  {/* Label Surface with tactile elevation and side caliper */}
                  <div className="relative flex items-center justify-center">
                    {/* Caliper Vertikal (Tinggi) */}
                    {activeTab !== 'ompreng' && (
                      <div className="absolute -left-8 top-0 bottom-0 flex flex-col items-center justify-between text-[9px] font-mono font-semibold text-slate-500 dark:text-cyan-300 select-none py-0.5">
                        <div className="w-2.5 h-[1px] bg-slate-400 dark:bg-slate-500"></div>
                        <span className="[writing-mode:vertical-lr] rotate-180 px-0.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[8px] uppercase tracking-wider tabular-nums font-mono text-slate-700 dark:text-cyan-300">
                          50.0 mm
                        </span>
                        <div className="w-2.5 h-[1px] bg-slate-400 dark:bg-slate-500"></div>
                      </div>
                    )}

                    {activeTab === 'kiri' && (
                      <div className="shadow-xs rounded-[2px] ring-1 ring-slate-900/10 dark:ring-white/10 bg-white">
                        <LabelKiri
                          id="preview-node-kiri"
                          cfg={cfg}
                          isBW={isBW}
                          showCropMarks={showCropMarks}
                        />
                      </div>
                    )}

                    {activeTab === 'kanan' && (
                      <div className="shadow-xs rounded-[2px] ring-1 ring-slate-900/10 dark:ring-white/10 bg-white">
                        <LabelKanan
                          id="preview-node-kanan"
                          cfg={cfg}
                          isBW={isBW}
                          showCropMarks={showCropMarks}
                        />
                      </div>
                    )}

                    {activeTab === 'sepasang' && (
                      <div id="preview-node-sepasang" className="shadow-xs rounded-[2px] ring-1 ring-slate-900/10 dark:ring-white/10 bg-white p-0">
                        <LabelSepasang
                          cfg={cfg}
                          isBW={isBW}
                          showCropMarks={showCropMarks}
                          gapMm={2}
                        />
                      </div>
                    )}

                    {activeTab === 'ompreng' && (
                      <div className="w-full max-w-[560px]">
                        <OmprengMockup cfg={cfg} isBW={isBW} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Toolbar di Bawah Preview */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-300 font-semibold mr-1 text-[11px]">Unduh (300 DPI):</span>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('kiri', 'stiker-bgn-kiri-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none shadow-xs"
                  >
                    {isExporting ? <Loader2 className="w-3 h-3 animate-spin text-blue-600" /> : <Download className="w-3 h-3" />}
                    <span>PNG Kiri</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('kanan', 'stiker-bgn-kanan-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none shadow-xs"
                  >
                    {isExporting ? <Loader2 className="w-3 h-3 animate-spin text-blue-600" /> : <Download className="w-3 h-3" />}
                    <span>PNG Kanan</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('sepasang', 'stiker-bgn-sepasang-140x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none shadow-xs"
                  >
                    {isExporting ? <Loader2 className="w-3 h-3 animate-spin text-blue-600" /> : <Download className="w-3 h-3" />}
                    <span>PNG Sepasang</span>
                  </button>

                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleCopyPng()}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none shadow-xs"
                    title="Salin gambar aktif ke clipboard"
                  >
                    {isExporting ? <Loader2 className="w-3 h-3 animate-spin text-blue-600" /> : <Copy className="w-3 h-3" />}
                    <span>Salin Gambar</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCleanThermalPrint}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs hover:shadow-[0_14px_24px_-6px_rgba(37,99,235,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Sekarang ({printPages.length} Label)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Panduan Cetak Printer Thermal */}
            <div className="bg-amber-50/80 dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-amber-200/90 dark:border-slate-800 text-amber-900 dark:text-amber-200 text-xs shadow-xs">
              <div className="font-bold flex items-center gap-2 mb-2 text-sm tracking-tight text-amber-950 dark:text-amber-100">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Panduan Teknis Cetak Thermal Label Ompreng (70 × 50 mm)</span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed">
                <li>
                  Pada jendela dialog cetak printer, pastikan ukuran kertas diatur ke <strong>Paper Size: 70mm × 50mm</strong> (atau 140mm × 50mm bila memilih mode sepasang).
                </li>
                <li>
                  Atur <strong>Margins: None (0 mm)</strong> dan <strong>Scale: 100% (Actual Size)</strong> agar stiker pas dan batas tepi tidak terpotong.
                </li>
                <li>
                  Gunakan mode <strong>Hitam Putih (B&amp;W)</strong> untuk hasil paling pekat tanpa bintik dither abu-abu.
                </li>
                <li>
                  Jika menggunakan label gulungan (roll), pastikan sensor printer diatur ke <strong>Label Gap / Notch Detection</strong>.
                </li>
              </ul>
            </div>

          </section>

        </div>
      </div>

      {/* ─── MODAL BAGIKAN, CADANGKAN & PENYIMPANAN LOKAL ─── */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold m-0 text-slate-900 dark:text-white tracking-tight">
                  Penyimpanan &amp; Cadangan Konfigurasi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowConfigModal(false)
                  setConfigError(null)
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* KARTU 1: PENYIMPANAN LOKAL BROWSER (LOCAL STORAGE) */}
            <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 m-0">
                    <Save className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Penyimpanan Lokal Browser (Local Storage)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 m-0 mt-0.5 leading-relaxed">
                    Menyimpan nama SPPG, alamat, kontak, logo, dan preferensi cetak langsung di browser Anda secara offline tanpa server.
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${
                  hasSavedData
                    ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-slate-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-800'
                }`}>
                  {hasSavedData ? 'Tersimpan' : 'Belum Ada Data'}
                </span>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 dark:text-blue-200/80 block text-[10px]">Terakhir Disimpan:</span>
                  <strong className="text-slate-700 dark:text-slate-200 tabular-nums">
                    {lastSavedTime || (hasSavedData ? 'Tersimpan (Sesi ini)' : '—')}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-blue-200/80 block text-[10px]">Ukuran Tersimpan:</span>
                  <strong className="text-slate-700 dark:text-slate-200 tabular-nums">
                    {storageSizeBytes > 0 ? `${(storageSizeBytes / 1024).toFixed(1)} KB` : '0 KB'}
                  </strong>
                </div>
              </div>

              {/* Tombol Aksi Local Storage */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleSaveToLocalStorage}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Sekarang</span>
                </button>

                <button
                  type="button"
                  disabled={!hasSavedData}
                  onClick={handleRestoreFromLocalStorage}
                  className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  title="Pulihkan konfigurasi terakhir yang tersimpan di browser"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Pulihkan</span>
                </button>

                <button
                  type="button"
                  disabled={!hasSavedData}
                  onClick={handleClearLocalStorage}
                  className="py-2 px-3 rounded-lg border border-rose-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
                  title="Hapus data tersimpan dari browser ini"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>

            {/* KARTU 2: CADANGAN JSON EKSTERNAL (EKSPOR / IMPOR) */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 m-0">
                  <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Cadangan JSON (Bagi Antar-Perangkat)</span>
                </h4>
                <button
                  type="button"
                  onClick={handleExportConfig}
                  className="py-1 px-2.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
                >
                  <Copy className="w-3 h-3" />
                  <span>Salin JSON</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-300 m-0 leading-relaxed">
                Salin data konfigurasi label SPPG ini untuk digunakan di perangkat dapur lain, atau tempelkan JSON konfigurasi untuk memuat data secara instan.
              </p>

              {configError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-950 border border-rose-200 dark:border-slate-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-100">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{configError}</span>
                </div>
              )}

              <textarea
                id="importJsonTextarea"
                rows={3}
                value={configJsonInput}
                onChange={(e) => {
                  setConfigJsonInput(e.target.value)
                  if (configError) setConfigError(null)
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-[11px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                placeholder='Tempel JSON di sini: {"namaSppg": "...", ...}'
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowConfigModal(false)
                    setConfigError(null)
                  }}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  disabled={!configJsonInput.trim()}
                  onClick={handleApplyImportConfig}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer transition-all shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  Terapkan JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── HIDDEN EXPORT NODES FOR HIGH-RES 300 DPI DOWNLOAD (MOUNTED OFF-CANVAS) ─── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -9999,
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div id="export-node-kiri" style={{ width: '70mm', height: '50mm', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <LabelKiri cfg={cfg} isBW={isBW} />
        </div>
        <div id="export-node-kanan" style={{ width: '70mm', height: '50mm', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <LabelKanan cfg={cfg} isBW={isBW} />
        </div>
        <div id="export-node-sepasang" style={{ width: '142mm', height: '50mm', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <LabelSepasang cfg={cfg} isBW={isBW} gapMm={2} />
        </div>
      </div>

      {/* ─── PRINT BROWSER ROOT ELEMENT (@media print) ─── */}
      <div id="thermal-print-root">
        {printPages.map((page, idx) => (
          <div key={page.id || idx} className="thermal-label-page">
            {page.type === 'kiri' && (
              <LabelKiri cfg={cfg} isBW={isBW} />
            )}
            {page.type === 'kanan' && (
              <LabelKanan cfg={cfg} isBW={isBW} />
            )}
            {page.type === 'sepasang' && (
              <LabelSepasang cfg={cfg} isBW={isBW} gapMm={2} />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

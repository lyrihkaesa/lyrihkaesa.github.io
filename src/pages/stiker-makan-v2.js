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

// Dynamic loader html-to-image
const loadHtmlToImage = () => {
  if (typeof window !== 'undefined' && window.htmlToImage) {
    return Promise.resolve(window.htmlToImage)
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js'
    script.onload = () => resolve(window.htmlToImage)
    script.onerror = (err) => reject(new Error('Gagal memuat library html-to-image: ' + err))
    document.body.appendChild(script)
  })
}

const STORAGE_KEY = 'stiker_ompreng_v2_config'

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
  const fileInputRef = useRef(null)

  // Show auto-dismiss toast
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Load Saved Config from LocalStorage
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
        }
      } catch (e) {
        console.warn('Gagal membaca saved config:', e)
      }
    }
  }, [])

  // Save Config to LocalStorage
  const updateCfg = (newValues) => {
    setCfg((prev) => {
      const updated = { ...prev, ...newValues }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch (e) {}
      }
      return updated
    })
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
  const handleDownloadPng = async (targetId, filename) => {
    try {
      setIsExporting(true)
      const htmlToImage = await loadHtmlToImage()
      const node = document.getElementById(targetId)
      if (!node) throw new Error('Elemen tidak ditemukan pada canvas')

      // Pixel ratio 4 menghasilkan resolusi ~827x591 px (standar 300 DPI untuk 70x50mm)
      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 4,
        quality: 1,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
      triggerToast(`Berhasil mengunduh ${filename}.png (300 DPI)`)
    } catch (err) {
      alert('Gagal mengunduh gambar: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  // Handle Copy Image ke Clipboard
  const handleCopyPng = async (targetId) => {
    try {
      setIsExporting(true)
      const htmlToImage = await loadHtmlToImage()
      const node = document.getElementById(targetId)
      if (!node) throw new Error('Elemen tidak ditemukan pada canvas')

      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      })

      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error('Clipboard API gambar tidak didukung di browser ini.')
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      triggerToast('Gambar stiker berhasil disalin ke clipboard! Siap di-paste ke WA/Word.')
    } catch (err) {
      triggerToast('Gagal menyalin: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  // Handle Export Config to Clipboard
  const handleExportConfig = () => {
    try {
      const jsonStr = JSON.stringify(cfg, null, 2)
      navigator.clipboard.writeText(jsonStr)
      triggerToast('Konfigurasi berhasil disalin ke clipboard dalam format JSON!')
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
      triggerToast('Konfigurasi berhasil diimpor dan diterapkan!')
    } catch (e) {
      alert('Format JSON tidak valid: ' + e.message)
    }
  }

  const printPages = generatePrintLabels()
  const isPairMode = cetakTarget === 'sepasang'
  const estimasiPanjangMeter = ((printPages.length * 52) / 1000).toFixed(1)

  return (
    <main
      className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900"
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
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-2xl border border-slate-700 dark:border-slate-200 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* ─── HEADER / NAVIGATION BAR (NO PRINT) ─── */}
      <header className="no-print-area border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-sm ring-1 ring-white/20">
              7×5
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight m-0 text-slate-900 dark:text-white">
                  Stiker Makan V2 — Standar BGN 2026
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3" /> SE BGN 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Generator Label Thermal Roll 70 × 50 mm • Khusus Dapur SPPG &amp; Kotak Pengaduan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/stiker-makan"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Versi 1 (Menu &amp; Gizi)</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.confirm('Kembalikan semua konfigurasi ke standar awal SE BGN 2026?')) {
                  updateCfg(DEFAULT_CFG)
                  triggerToast('Konfigurasi dikembalikan ke default')
                }
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset semua pengaturan ke standar awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Salin atau Impor Konfigurasi"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan / Backup</span>
            </button>

            <button
              type="button"
              onClick={handleCleanThermalPrint}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Thermal ({printPages.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── WORKSPACE (NO PRINT) ─── */}
      <div className="no-print-area max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ─── PANEL KONTROL KIRI (EDITOR SETTINGS) ─── */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Navigasi Kategori Editor (Tabs / All) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2">
              <nav role="tablist" aria-label="Kategori Pengaturan Label" className="flex items-center gap-1 flex-1 overflow-x-auto text-xs font-semibold">
                <button
                  type="button"
                  role="tab"
                  aria-selected={editorTab === 'cetak'}
                  onClick={() => setEditorTab('cetak')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    editorTab === 'cetak' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    editorTab === 'identitas' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    editorTab === 'pengaduan' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    editorTab === 'tipografi' && editorMode === 'tabs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer shrink-0"
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
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
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
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer ${
                          cetakTarget === 'kiri'
                            ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-blue-600" />
                          <span>Label Kiri Saja</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">SPPG &amp; Batas Waktu (70×50)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('kanan'); setActiveTab('kanan'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer ${
                          cetakTarget === 'kanan'
                            ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Label Kanan Saja</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Larangan &amp; Pengaduan (70×50)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('alternating'); setActiveTab('sepasang'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer ${
                          cetakTarget === 'alternating'
                            ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Bergantian (Urut)</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">1 Kiri, lalu 1 Kanan urut</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('both_batch'); setActiveTab('sepasang'); }}
                        className={`p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer ${
                          cetakTarget === 'both_batch'
                            ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-purple-600" />
                          <span>Batch Terpisah</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">N Kiri dulu, lalu N Kanan</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setCetakTarget('sepasang'); setActiveTab('sepasang'); }}
                        className={`col-span-2 p-2.5 rounded-xl border font-semibold text-left transition-all cursor-pointer ${
                          cetakTarget === 'sepasang'
                            ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Sepasang Berjejer (Format 140 × 50 mm)</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                            Printer Lebar 14cm
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
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
                          className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
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
                          className="w-full text-center py-1.5 px-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setJumlahCetak((prev) => prev + 1)}
                          className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
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
                            className="text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
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
                      <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setColorMode('bw')}
                          className={`py-2 px-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 ${
                            isBW
                              ? 'bg-slate-900 text-white shadow-xs dark:bg-black dark:text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>Hitam Putih (B&amp;W)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setColorMode('color')}
                          className={`py-2 px-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 ${
                            !isBW
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>Warna Resmi</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                        {isBW ? '✓ Sangat direkomendasikan untuk printer thermal 203 DPI' : '🎨 Untuk printer inkjet / stiker chromo berwarna'}
                      </p>
                    </div>
                  </div>

                  {/* Crop Marks Toggle */}
                  <div className="flex items-center justify-between py-2 px-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                    <label htmlFor="cropMarksToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                      <Scissors className="w-3.5 h-3.5 text-slate-500" />
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
                  <div className="flex items-center justify-between py-2 px-3 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <label htmlFor="showOrnamentToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                        <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                        <span>Strip Ornamen Sayur &amp; Pangan</span>
                      </label>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 m-0">
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
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 mb-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-600 dark:text-slate-300">
                        Total Output: <strong className="font-black text-blue-600 dark:text-blue-400 text-sm">{printPages.length} label</strong>
                        <span className="text-[11px] text-slate-500 ml-1">(@ 70 × 50 mm)</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Estimasi panjang roll kertas: <strong>~{estimasiPanjangMeter} meter</strong>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3 h-3" /> Siap Roll Thermal
                      </span>
                    </div>
                  </div>

                  {/* Tombol Aksi Cetak */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCleanThermalPrint}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Thermal Presisi</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Cetak Dialog Browser</span>
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
                        <span className="text-[10px] text-slate-400">Tekan Enter untuk baris baru</span>
                      </div>
                      <textarea
                        id="namaSppgInput"
                        rows={2}
                        value={cfg.namaSppg}
                        onChange={(e) => updateCfg({ namaSppg: e.target.value })}
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold uppercase text-xs leading-relaxed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
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
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs leading-relaxed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                        placeholder="Alamat jalan, kelurahan, kecamatan, kota/kabupaten..."
                      />
                    </div>

                    {/* Logo SPPG / BGN dengan File Picker */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Logo SPPG / Badan Gizi Nasional:
                      </label>
                      <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
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
                              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
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
                                className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-400 cursor-pointer transition-colors"
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
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 m-0 mt-1 truncate">
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
                            className={`py-2 px-3 rounded-xl border text-left font-semibold cursor-pointer transition-all ${
                              cfg.waktuMode === 'direct'
                                ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span>Jam Tercetak</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Cetak jam langsung di stiker</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateCfg({ waktuMode: 'blank' })}
                            className={`py-2 px-3 rounded-xl border text-left font-semibold cursor-pointer transition-all ${
                              cfg.waktuMode === 'blank'
                                ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-slate-500" />
                              <span>Kolom Kosong</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">Untuk stempel / tulis spidol</div>
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
                              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-black text-sm tracking-wider focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                              placeholder="Contoh: 11:00 WIB"
                            />

                            {/* Tombol Cepat Pilihan Jam */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {JAM_PRESETS.map((jp) => (
                                <button
                                  key={jp}
                                  type="button"
                                  onClick={() => updateCfg({ jamKonsumsi: jp })}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border cursor-pointer transition-colors ${
                                    cfg.jamKonsumsi === jp
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
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
                            <div className="space-y-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
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
                                    className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => updateCfg({ tanggalKonsumsi: getTodayISO() })}
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                                  >
                                    Hari Ini
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateCfg({ tanggalKonsumsi: getTomorrowISO() })}
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
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
                                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold border cursor-pointer transition-colors ${
                                        (cfg.tanggalFormat || 'long') === tf.id
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
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
                    <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="slider-widthKolomLarangan" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Proporsi Lebar Kolom Label Kanan:</span>
                        </label>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold tabular-nums">
                            Larangan: {cfg.widthKolomLarangan || 27} mm
                          </span>
                          <span className="text-slate-400">vs</span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold tabular-nums">
                            Kontak &amp; QR: {(63 - (cfg.widthKolomLarangan || 27)).toFixed(0)} mm
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                        Lebar kolom larangan (kiri) dapat dipersempit agar kotak pengaduan dan QR Code di sisi kanan memiliki ruang horizontal lebih lebar dan tidak terpotong.
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 shrink-0 font-semibold">22 mm (Ramping)</span>
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
                        <span className="text-[10px] text-slate-400 shrink-0 font-semibold">36.5 mm (Standar Lama)</span>
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
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold border cursor-pointer transition-colors ${
                              (cfg.widthKolomLarangan || 27) === item.val
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
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
                        <span className="text-[10px] text-slate-400">Pilih mode ringkas agar tidak kepanjangan</span>
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
                          className="px-2 py-0.5 rounded-lg text-[10px] font-bold border border-blue-500 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 cursor-pointer shadow-2xs"
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
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
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
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          Lengkap (+ Medsos)
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="callCenterInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              Call Center BGN:
                            </label>
                            <input
                              id="callCenterInput"
                              type="tel"
                              value={cfg.pengaduanCallCenter}
                              onChange={(e) => updateCfg({ pengaduanCallCenter: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                              placeholder="157"
                            />
                          </div>
                          <div>
                            <label htmlFor="waInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              WhatsApp Hotline:
                            </label>
                            <input
                              id="waInput"
                              type="tel"
                              value={cfg.pengaduanWa}
                              onChange={(e) => updateCfg({ pengaduanWa: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                              placeholder="0811-1020-0157"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="webInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              Website Resmi:
                            </label>
                            <input
                              id="webInput"
                              type="text"
                              value={cfg.pengaduanWeb}
                              onChange={(e) => updateCfg({ pengaduanWeb: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                              placeholder="bgn.go.id"
                            />
                          </div>
                          <div>
                            <label htmlFor="emailInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              Email Pengaduan:
                            </label>
                            <input
                              id="emailInput"
                              type="email"
                              value={cfg.pengaduanEmail}
                              onChange={(e) => updateCfg({ pengaduanEmail: e.target.value })}
                              className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                              placeholder="pengaduan@bgn.go.id"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-0.5">
                          <div>
                            <label htmlFor="igInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              Instagram:
                            </label>
                            <input
                              id="igInput"
                              type="text"
                              value={cfg.pengaduanIg}
                              onChange={(e) => updateCfg({ pengaduanIg: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                              placeholder="@badangizinasional.ri"
                            />
                          </div>
                          <div>
                            <label htmlFor="fbInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              Facebook:
                            </label>
                            <input
                              id="fbInput"
                              type="text"
                              value={cfg.pengaduanFb}
                              onChange={(e) => updateCfg({ pengaduanFb: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                              placeholder="Badan Gizi Nasional RI"
                            />
                          </div>
                          <div>
                            <label htmlFor="tiktokInput" className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                              TikTok:
                            </label>
                            <input
                              id="tiktokInput"
                              type="text"
                              value={cfg.pengaduanTiktok}
                              onChange={(e) => updateCfg({ pengaduanTiktok: e.target.value })}
                              className="w-full py-1 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
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
                          className="text-[10px] font-semibold text-slate-500 hover:text-blue-600 cursor-pointer"
                        >
                          Reset font kontak
                        </button>
                      </div>

                      <div className="space-y-2">
                        {PENGADUAN_FONT_FIELDS.map((pf) => (
                          <div key={pf.key} className="flex items-center gap-2">
                            <label htmlFor={`slider-${pf.key}`} className="w-[75px] shrink-0 text-[10px] font-semibold text-slate-600 dark:text-slate-400 truncate">
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
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Di Bawah Kontak
                        </span>
                      </div>

                      {/* Toggle Tampilkan QR Code */}
                      <div className="flex items-center justify-between p-3 mb-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                        <div>
                          <label htmlFor="showQrMenuToggle" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                            <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tampilkan QR Code Menu &amp; Gizi</span>
                          </label>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 m-0">
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
                        <div className="space-y-3 p-3.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 animate-in fade-in duration-150">
                          {/* Input Tautan / URL */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label htmlFor="qrMenuUrlInput" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <Link2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>Tautan / Link Menu &amp; Gizi:</span>
                              </label>
                              <span className="text-[10px] text-slate-400">Generate otomatis</span>
                            </div>
                            <input
                              id="qrMenuUrlInput"
                              type="url"
                              value={cfg.qrMenuUrl || ''}
                              onChange={(e) => updateCfg({ qrMenuUrl: e.target.value })}
                              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
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
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border cursor-pointer transition-colors ${
                                    cfg.qrMenuUrl === preset.url
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                      : 'border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800'
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
                              <label htmlFor="qrMenuTextInput" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                Judul di Atas QR:
                              </label>
                              <input
                                id="qrMenuTextInput"
                                type="text"
                                value={cfg.qrMenuText || ''}
                                onChange={(e) => updateCfg({ qrMenuText: e.target.value })}
                                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold uppercase"
                                placeholder="MENU & ANALISIS GIZI"
                              />
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <label htmlFor="slider-fsQrJudul" className="font-semibold text-slate-600 dark:text-slate-400">
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
                          <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/40 text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
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
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    Berlaku serentak untuk seluruh elemen teks pada Label Kiri &amp; Label Kanan.
                  </p>

                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 mb-3">
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
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between" style={{ fontFamily: f.value }}>
                            <span>Ag {f.label}</span>
                            {f.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-px rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                                {f.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5" style={{ fontFamily: f.value }}>
                            HARUS DIKONSUMSI 123
                          </div>
                          {f.desc && (
                            <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
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
                        className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Ukuran</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {FONT_SIZE_FIELDS.map((f) => (
                        <div key={f.key}>
                          <div className="flex items-center justify-between text-[11px] mb-0.5">
                            <label htmlFor={`slider-font-${f.key}`} className="font-semibold text-slate-600 dark:text-slate-400">
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

          </section>

          {/* ─── PANEL PREVIEW KANAN (INTERACTIVE PREVIEW & SIMULATION) ─── */}
          <section className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-[68px] lg:self-start">
            
            {/* Tab Navigasi Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <nav role="tablist" aria-label="Tampilan Format Preview" className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'kiri'}
                  onClick={() => setActiveTab('kiri')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'kiri'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Label Kiri (7×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'kanan'}
                  onClick={() => setActiveTab('kanan')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'kanan'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Label Kanan (7×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'sepasang'}
                  onClick={() => setActiveTab('sepasang')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'sepasang'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Sepasang (14×5 cm)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'ompreng'}
                  onClick={() => setActiveTab('ompreng')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'ompreng'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Simulasi Ompreng</span>
                </button>
              </nav>

              {/* Zoom Controls & Viewport Modes */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-semibold mr-0.5">Zoom:</span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.7, prev - 0.1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  aria-label="Perkecil zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-[11px] tabular-nums">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                  aria-label="Perbesar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1.0)}
                  title="Skala Nyata 100% (70x50 mm)"
                  className={`px-2 py-1 rounded-lg border text-[10px] font-semibold ml-1 cursor-pointer transition-colors ${
                    zoomScale === 1.0
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  1:1
                </button>
              </div>
            </div>

            {/* Preview Canvas Container */}
            <div
              className={`rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center justify-start min-h-[460px] max-h-[72vh] overflow-auto overscroll-contain relative transition-colors ${
                previewBg === 'grid'
                  ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 dark:bg-slate-900/60'
                  : previewBg === 'roll'
                  ? 'bg-gradient-to-b from-amber-100/40 via-amber-50/20 to-amber-100/40 dark:from-slate-900 dark:to-slate-900'
                  : 'bg-white dark:bg-slate-900'
              }`}
            >
              
              {/* Toolbar Atas Preview: Dimensi & Mode Latar Belakang */}
              <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4">
                {activeTab !== 'ompreng' ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 select-none">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      ↔ Lebar: <strong className="text-slate-800 dark:text-slate-200">{activeTab === 'sepasang' ? '14,0 cm' : '7,0 cm'}</strong> (70 mm)
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      ↕ Tinggi: <strong className="text-slate-800 dark:text-slate-200">5,0 cm</strong> (50 mm)
                    </span>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    🍱 Simulasi Tutup Ompreng Segel Sesuai Gambar 2 Lampiran SE BGN
                  </div>
                )}

                {/* Background Switcher */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <span>Latar:</span>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('white')}
                    className={`px-2 py-0.5 rounded border cursor-pointer ${
                      previewBg === 'white'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Polos
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('grid')}
                    className={`px-2 py-0.5 rounded border cursor-pointer ${
                      previewBg === 'grid'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg('roll')}
                    className={`px-2 py-0.5 rounded border cursor-pointer ${
                      previewBg === 'roll'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Kertas Roll
                  </button>
                </div>
              </div>

              {/* Tampilan Visual Sesuai Tab Aktif */}
              <div
                style={{
                  zoom: zoomScale,
                }}
                className="py-4 my-auto flex items-center justify-center transition-transform"
              >
                {activeTab === 'kiri' && (
                  <div className="shadow-2xl rounded-sm border border-slate-300 bg-white">
                    <LabelKiri
                      id="preview-node-kiri"
                      cfg={cfg}
                      isBW={isBW}
                      showCropMarks={showCropMarks}
                    />
                  </div>
                )}

                {activeTab === 'kanan' && (
                  <div className="shadow-2xl rounded-sm border border-slate-300 bg-white">
                    <LabelKanan
                      id="preview-node-kanan"
                      cfg={cfg}
                      isBW={isBW}
                      showCropMarks={showCropMarks}
                    />
                  </div>
                )}

                {activeTab === 'sepasang' && (
                  <div id="preview-node-sepasang" className="shadow-2xl rounded-sm border border-slate-300 bg-white p-0">
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

              {/* Action Toolbar di Bawah Preview */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-500 font-semibold mr-1">Unduh (300 DPI):</span>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('preview-node-kiri', 'stiker-bgn-kiri-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG Kiri</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('preview-node-kanan', 'stiker-bgn-kanan-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG Kanan</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('preview-node-sepasang-dl', 'stiker-bgn-sepasang-140x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG Sepasang (14×5)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => {
                      const target = activeTab === 'kanan' ? 'preview-node-kanan' : activeTab === 'sepasang' ? 'preview-node-sepasang' : 'preview-node-kiri'
                      handleCopyPng(target)
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    title="Salin gambar aktif ke clipboard"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin Gambar</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCleanThermalPrint}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Sekarang ({printPages.length} Label)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Panduan Cetak Printer Thermal */}
            <div className="bg-amber-50/90 dark:bg-amber-950/40 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs">
              <div className="font-bold flex items-center gap-2 mb-2 text-sm">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Panduan Teknis Cetak Thermal Label Ompreng (70 × 50 mm):</span>
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

      {/* ─── MODAL BAGIKAN / BACKUP KONFIGURASI JSON ─── */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold m-0 text-slate-900 dark:text-white">
                  Bagikan &amp; Cadangkan Konfigurasi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              Salin data konfigurasi label SPPG ini untuk digunakan di komputer/perangkat dapur lain, atau tempelkan JSON konfigurasi untuk memuat data.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportConfig}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Konfigurasi Aktif (JSON)</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label htmlFor="importJsonTextarea" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tempel Konfigurasi JSON untuk Mengimpor:
              </label>
              <textarea
                id="importJsonTextarea"
                rows={4}
                value={configJsonInput}
                onChange={(e) => setConfigJsonInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-mono"
                placeholder='{"namaSppg": "SPPG JAKARTA PUSAT 1", ...}'
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!configJsonInput.trim()}
                  onClick={handleApplyImportConfig}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer transition-colors shadow-2xs"
                >
                  Terapkan Konfigurasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── HIDDEN PREVIEW NODES FOR DOWNLOAD (ALWAYS MOUNTED) ─── */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <LabelKiri id="preview-node-kiri-dl" cfg={cfg} isBW={isBW} />
        <LabelKanan id="preview-node-kanan-dl" cfg={cfg} isBW={isBW} />
        <div id="preview-node-sepasang-dl" className="bg-white">
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

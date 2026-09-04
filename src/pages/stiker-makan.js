import React, { useState, useEffect, useRef } from 'react'
import StikerLabel, { GIZI_CATEGORIES } from '../components/StikerLabel'

// Helper format tanggal Indonesia
const MONTH_NAMES_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const formatDateToPattern = (dateObj, pattern = 'slash') => {
  const d = String(dateObj.getDate()).padStart(2, '0')
  const m = String(dateObj.getMonth() + 1).padStart(2, '0')
  const y = dateObj.getFullYear()
  if (pattern === 'long') {
    return `${d} ${MONTH_NAMES_ID[dateObj.getMonth()]} ${y}`
  }
  if (pattern === 'dash') {
    return `${d}-${m}-${y}`
  }
  return `${d}/${m}/${y}`
}

const parseDateToIso = (str) => {
  if (!str) return ''
  const m = String(str).match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)
  if (m) {
    const d = String(m[1]).padStart(2, '0')
    const mo = String(m[2]).padStart(2, '0')
    const y = m[3]
    return `${y}-${mo}-${d}`
  }
  const parts = String(str).trim().split(/\s+/)
  if (parts.length >= 3) {
    const d = String(parseInt(parts[0], 10)).padStart(2, '0')
    const monthIdx = MONTH_NAMES_ID.findIndex((nm) => nm.toLowerCase() === parts[1].toLowerCase())
    const y = parts[2]
    if (monthIdx >= 0) {
      const mo = String(monthIdx + 1).padStart(2, '0')
      return `${y}-${mo}-${d}`
    }
  }
  const dt = new Date(str)
  if (!isNaN(dt.getTime())) {
    return dt.toISOString().split('T')[0]
  }
  return ''
}

const parseTimeToHhMm = (str) => {
  if (!str) return '08:00'
  const m = String(str).match(/(\d{1,2})[:.](\d{2})/)
  if (m) {
    return `${String(m[1]).padStart(2, '0')}:${m[2]}`
  }
  return '08:00'
}

// ─── Default Konfigurasi Standar BGN (Badan Gizi Nasional) ───────────────────
const DEFAULT_CONFIG = {
  // 1. Judul & Logo
  showJudul: true,
  judul: 'LABEL MAKANAN',
  judulArch: true,
  archCurvature: 55,
  logoOffsetPt: 14,
  showLogo: true,
  logoUrl: '/img/logo-bgn.png',

  // 2. SPPG Dapur & Yayasan Mitra
  showDapur: true,
  namaDapur: 'SPPG GROBOGAN GROBOGAN PURWODADI',
  showMitra: true,
  namaMitra: 'YAYASAN LEMAN GRIMAH LOHJINAWI',

  // 3. Menu Makanan
  showMenu: true,
  judulMenu: 'MENU',
  menuText: 'Nasi Putih\nAyam Goreng Mentega\nTumis Gambas Wortel\nSemur Tahu\nKelengkeng',

  // 4. Analisis Nilai Gizi
  showGizi: true,
  judulGizi: 'ANALISIS KANDUNGAN GIZI',
  giziActiveCategories: {
    besar: true,
    kecil: true,
    balita: false,
    ibuHamil: false,
    ibuMenyusui: false
  },
  giziBesar: {
    energi: '396,45',
    protein: '14,64',
    lemak: '20,27',
    karbohidrat: '41,02',
    serat: '1,5'
  },
  giziKecil: {
    energi: '388,17',
    protein: '14,56',
    lemak: '20,25',
    karbohidrat: '38,86',
    serat: '1,39'
  },
  giziBalita: {
    energi: '350,00',
    protein: '12,00',
    lemak: '15,00',
    karbohidrat: '35,00',
    serat: '1,20'
  },
  giziIbuHamil: {
    energi: '450,00',
    protein: '18,00',
    lemak: '22,00',
    karbohidrat: '48,00',
    serat: '2,00'
  },
  giziIbuMenyusui: {
    energi: '480,00',
    protein: '20,00',
    lemak: '24,00',
    karbohidrat: '50,00',
    serat: '2,20'
  },

  // 5. Batas Waktu Konsumsi
  showBatasAman: true,
  judulBatasAman: 'HARUS DIKONSUMSI\nSEBELUM PUKUL',
  durasiBatas: '08:00 WIB',
  showTanggalBatas: true,
  tanggalBatas: formatDateToPattern(new Date(), 'slash'),
  showSubteksBatas: false,
  subteksBatas: 'Setelah makanan diterima untuk menjaga kualitas dan keamanan makanan',

  // 6. Badges
  showBadges: true,
  badgeLayout: 'stacked', // 'sideBySide' atau 'stacked'
  badgeBorder: false,
  showBadgeSegera: true,
  judulBadgeSegera: 'SEGERA KONSUMSI',
  subBadgeSegera: 'SETELAH DITERIMA',
  showBadgeLarangan: true,
  iconLaranganUrl: '/img/larangan_dibawa_pulang.png',
  judulBadgeLarangan: 'TIDAK BOLEH',
  subBadgeLarangan: 'DIBAWA PULANG',

  // Peringatan Bar Teks Tambahan
  showPeringatan: false,
  teksPeringatan: 'DILARANG MEMBAWA PULANG MAKANAN',

  // 7. Footer Media Sosial
  showSosmed: true,
  igHandle: '@sppgdefault',
  fbHandle: '@sppgdefault',
  tiktokHandle: '@sppgdefault',

  // 8. Edukasi
  showEdukasi: false,
  judulEdukasi: 'Kenapa Harus Tepat Waktu?',
  edukasiItem1: 'MENJAGA MUTU MAKANAN',
  edukasiIcon1: '⏱️',
  edukasiItem2: 'MENGURANGI RESIKO KONTAMINASI',
  edukasiIcon2: '🛑',
  edukasiItem3: 'MENJAGA MAKANAN AMAN DI KONSUMSI PENERIMA MANFAAT',
  edukasiIcon3: '🍽️',

  // 9. Tipografi & Ornamen
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  primaryColor: '#071e48',
  giziIconType: 'emoji',
  tableRadius: 4,
  logoSizeMm: 50,
  showPattern: true,
  patternType: 'color',
  patternUrl: '/img/pattern4.png',
  patternPos: 'both',
  patternExtendGap: false, // Ikut tembus gap (true) atau pas di dalam stiker (false)
  patternHeightMm: 7.5,
  patternOpacity: 1,
  fontSizes: {
    judul: 29.5,
    namaDapur: 12,
    namaMitra: 10,
    judulGizi: 11,
    headerBox: 10,
    isiMenu: 8,
    isiGizi: 8,
    batasAman: 11,
    durasiBatas: 16,
    tanggalBatas: 10,
    subteksBatas: 9,
    larangan: 16,
    badgeTeks: 10,
    badgeSubteks: 10,
    badgeIconSizeMm: 12,
    sosmed: 8,
    edukasi: 7
  }
}

// Pilihan Ukuran Kertas
const PAPER_SIZES = {
  F4: {
    id: 'F4',
    label: 'F4 / Folio',
    subLabel: '210 × 330 mm',
    widthMm: 210,
    heightMm: 330,
    desc: 'Standar Percetakan / Folio (HVS Panjang)'
  },
  A4: {
    id: 'A4',
    label: 'A4',
    subLabel: '210 × 297 mm',
    widthMm: 210,
    heightMm: 297,
    desc: 'Standar Kertas Kantor Internasional'
  }
}

const DEFAULT_LAYOUT = {
  paperSize: 'F4',
  kolom: 3,
  marginAtas: 5,
  marginBawah: 5,
  marginKiri: 5,
  marginKanan: 5,
  gapAntarStiker: 10,
  paddingStiker: 0,
  borderStyle: 'none',
  susunanGizi: 'stacked',
  scaleFont: 'normal',
  colorMode: 'color',
  showGarisPotong: true,
  showIkonGunting: false
}

const FONT_OPTIONS = [
  {
    label: 'System UI (Standar Modern Clean)',
    value: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  { label: 'Arial (Standar Cetak Percetakan)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Segoe UI (Windows Clean)', value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { label: 'Roboto (Google Sans-Serif)', value: "Roboto, 'Segoe UI', sans-serif" },
  { label: 'Montserrat (Modern Bold)', value: 'Montserrat, sans-serif' },
  { label: 'Poppins (Geometric Clean)', value: 'Poppins, sans-serif' },
  {
    label: 'Trebuchet MS (Tegas & Jelas)',
    value: "'Trebuchet MS', 'Lucida Sans Unicode', sans-serif"
  },
  { label: 'Tahoma (Kompak & Rapi)', value: 'Tahoma, Verdana, sans-serif' },
  { label: 'Times New Roman (Klasik Formal)', value: "'Times New Roman', Times, serif" },
  { label: 'Georgia (Serif Elegan)', value: 'Georgia, serif' }
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
    script.onerror = (err) => reject(new Error('Gagal memuat html-to-image: ' + err))
    document.body.appendChild(script)
  })
}

// Storage Key untuk LocalStorage Browser
const STORAGE_KEY = 'sppg_bgn_stiker_config_v2'

export default function StikerMakanPage() {
  const [cfg, setCfg] = useState(DEFAULT_CONFIG)

  // Layout & Ukuran Kertas (F4 210 x 330 mm atau A4 210 x 297 mm)
  const [paperSize, setPaperSize] = useState(DEFAULT_LAYOUT.paperSize) // 'F4' | 'A4'
  const [kolom, setKolom] = useState(DEFAULT_LAYOUT.kolom)
  const [marginAtas, setMarginAtas] = useState(DEFAULT_LAYOUT.marginAtas)
  const [marginBawah, setMarginBawah] = useState(DEFAULT_LAYOUT.marginBawah)
  const [marginKiri, setMarginKiri] = useState(DEFAULT_LAYOUT.marginKiri)
  const [marginKanan, setMarginKanan] = useState(DEFAULT_LAYOUT.marginKanan)
  const [gapAntarStiker, setGapAntarStiker] = useState(DEFAULT_LAYOUT.gapAntarStiker)
  const [paddingStiker, setPaddingStiker] = useState(DEFAULT_LAYOUT.paddingStiker)

  // Opsi Tampilan & Export
  const [borderStyle, setBorderStyle] = useState(DEFAULT_LAYOUT.borderStyle)
  const [susunanGizi, setSusunanGizi] = useState(DEFAULT_LAYOUT.susunanGizi)
  const [scaleFont, setScaleFont] = useState(DEFAULT_LAYOUT.scaleFont)
  const [colorMode, setColorMode] = useState(DEFAULT_LAYOUT.colorMode)
  const [showGarisPotong, setShowGarisPotong] = useState(DEFAULT_LAYOUT.showGarisPotong)
  const [showIkonGunting, setShowIkonGunting] = useState(DEFAULT_LAYOUT.showIkonGunting ?? true)
  const [zoomPreview, setZoomPreview] = useState(0.42)

  // Status & Navigasi
  const [isExporting, setIsExporting] = useState(false)
  const [exportMsg, setExportMsg] = useState('')
  const [activeTab, setActiveTab] = useState('konten') // 'konten', 'font', 'layout', 'word-guide', 'json-backup'

  // LocalStorage State
  const [isInitialized, setIsInitialized] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState('')
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)

  const fileInputRef = useRef(null)
  const jsonInputRef = useRef(null)
  const [rawJsonText, setRawJsonText] = useState('')

  // Dimensi Fisik Kertas (mm)
  const currentPaper = PAPER_SIZES[paperSize] || PAPER_SIZES.F4
  const paperWidthMm = currentPaper.widthMm
  const paperHeightMm = currentPaper.heightMm

  // Perhitungan Ukuran Stiker
  const totalGapWidthMm = Math.max(0, (kolom - 1) * gapAntarStiker)
  const printableWidthMm = Math.max(10, paperWidthMm - marginKiri - marginKanan)
  const stickerWidthMm = Math.max(10, (printableWidthMm - totalGapWidthMm) / kolom)
  const stickerHeightMm = Math.max(10, paperHeightMm - marginAtas - marginBawah)

  let cardBorder = 'none'
  if (borderStyle === 'border-subtle') cardBorder = '1px solid #e2e8f0'
  if (borderStyle === 'border-black') cardBorder = `1.2px solid ${cfg.primaryColor || '#071e48'}`
  if (borderStyle === 'border-green') cardBorder = '1.2px solid #15803d'

  let fontMultiplier = 1
  if (scaleFont === 'compact') fontMultiplier = 0.88
  if (scaleFont === 'spacious') fontMultiplier = 1.08

  // Helper Config Object
  const getCurrentFullConfig = () => ({
    _meta: {
      app: 'StikerLabelBGN',
      version: '2.0',
      exportedAt: new Date().toISOString()
    },
    cfg,
    layout: {
      paperSize,
      kolom,
      marginAtas,
      marginBawah,
      marginKiri,
      marginKanan,
      gapAntarStiker,
      paddingStiker,
      borderStyle,
      susunanGizi,
      scaleFont,
      colorMode,
      showGarisPotong,
      showIkonGunting
    }
  })

  const notify = (msg) => {
    setExportMsg(msg)
    setTimeout(() => setExportMsg(''), 4000)
  }

  // 1. Muat otomatis konfigurasi dari LocalStorage saat pertama kali buka
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        handleApplyConfigObject(parsed)
        const timeStr = parsed._meta?.exportedAt
          ? new Date(parsed._meta.exportedAt).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })
          : ''
        setLastSavedTime(timeStr || 'sebelumnya')
        notify('Desain terakhir berhasil dimuat dari LocalStorage')
      }
    } catch (err) {
      console.error('Gagal memuat dari localStorage:', err)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // 2. Simpan otomatis ke LocalStorage setiap ada perubahan (Debounce 600ms)
  useEffect(() => {
    if (!isInitialized || !autoSaveEnabled || typeof window === 'undefined') return
    const timer = setTimeout(() => {
      try {
        const fullConfig = getCurrentFullConfig()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullConfig))
        const nowStr = new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        setLastSavedTime(nowStr)
      } catch (err) {
        console.error('Gagal menyimpan otomatis ke localStorage:', err)
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [
    cfg,
    paperSize,
    kolom,
    marginAtas,
    marginBawah,
    marginKiri,
    marginKanan,
    gapAntarStiker,
    paddingStiker,
    borderStyle,
    susunanGizi,
    scaleFont,
    colorMode,
    showGarisPotong,
    showIkonGunting,
    isInitialized,
    autoSaveEnabled
  ])

  // Handler Manual Save & Clear LocalStorage
  const handleManualSaveStorage = () => {
    try {
      const fullConfig = getCurrentFullConfig()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullConfig))
      const nowStr = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setLastSavedTime(nowStr)
      notify('💾 Seluruh konfigurasi berhasil disimpan ke LocalStorage browser!')
    } catch (err) {
      notify('❌ Gagal simpan ke LocalStorage: ' + err.message)
    }
  }

  const handleClearLocalStorage = () => {
    if (typeof window === 'undefined') return
    if (
      window.confirm(
        'Hapus data yang tersimpan di LocalStorage browser dan kembalikan ke standar awal BGN?'
      )
    ) {
      try {
        localStorage.removeItem(STORAGE_KEY)
        setCfg(DEFAULT_CONFIG)
        setPaperSize(DEFAULT_LAYOUT.paperSize)
        setKolom(DEFAULT_LAYOUT.kolom)
        setMarginAtas(DEFAULT_LAYOUT.marginAtas)
        setMarginBawah(DEFAULT_LAYOUT.marginBawah)
        setMarginKiri(DEFAULT_LAYOUT.marginKiri)
        setMarginKanan(DEFAULT_LAYOUT.marginKanan)
        setGapAntarStiker(DEFAULT_LAYOUT.gapAntarStiker)
        setPaddingStiker(DEFAULT_LAYOUT.paddingStiker)
        setBorderStyle(DEFAULT_LAYOUT.borderStyle)
        setSusunanGizi(DEFAULT_LAYOUT.susunanGizi)
        setScaleFont(DEFAULT_LAYOUT.scaleFont)
        setColorMode(DEFAULT_LAYOUT.colorMode)
        setShowGarisPotong(DEFAULT_LAYOUT.showGarisPotong)
        setShowIkonGunting(DEFAULT_LAYOUT.showIkonGunting)
        setLastSavedTime('')
        notify('🗑️ LocalStorage dihapus dan pengaturan direset ke default.')
      } catch (err) {
        notify('❌ Gagal menghapus LocalStorage: ' + err.message)
      }
    }
  }

  // Upload Logo
  const handleUploadLogo = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setCfg((prev) => ({ ...prev, logoUrl: ev.target.result }))
        notify('Logo berhasil diperbarui')
      }
      reader.readAsDataURL(file)
    }
  }

  // Download Config JSON
  const handleDownloadConfigJson = () => {
    try {
      const fullConfig = getCurrentFullConfig()
      const jsonStr = JSON.stringify(fullConfig, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const safeName = (cfg.namaDapur || 'BGN').replace(/[^a-zA-Z0-9]/g, '_')
      link.download = `stiker_config_${safeName}.json`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
      notify('Config JSON berhasil diunduh')
    } catch (err) {
      notify('Gagal unduh JSON: ' + err.message)
    }
  }

  const handleApplyConfigObject = (parsed) => {
    if (parsed.cfg) {
      setCfg((prev) => ({ ...prev, ...parsed.cfg }))
      if (parsed.layout) {
        if (parsed.layout.paperSize !== undefined) setPaperSize(parsed.layout.paperSize)
        if (parsed.layout.kolom !== undefined) setKolom(parsed.layout.kolom)
        if (parsed.layout.marginAtas !== undefined) setMarginAtas(parsed.layout.marginAtas)
        if (parsed.layout.marginBawah !== undefined) setMarginBawah(parsed.layout.marginBawah)
        if (parsed.layout.marginKiri !== undefined) setMarginKiri(parsed.layout.marginKiri)
        if (parsed.layout.marginKanan !== undefined) setMarginKanan(parsed.layout.marginKanan)
        if (parsed.layout.gapAntarStiker !== undefined)
          setGapAntarStiker(parsed.layout.gapAntarStiker)
        if (parsed.layout.paddingStiker !== undefined) setPaddingStiker(parsed.layout.paddingStiker)
        if (parsed.layout.borderStyle !== undefined) setBorderStyle(parsed.layout.borderStyle)
        if (parsed.layout.susunanGizi !== undefined) setSusunanGizi(parsed.layout.susunanGizi)
        if (parsed.layout.scaleFont !== undefined) setScaleFont(parsed.layout.scaleFont)
        if (parsed.layout.colorMode !== undefined) setColorMode(parsed.layout.colorMode)
        if (parsed.layout.showGarisPotong !== undefined)
          setShowGarisPotong(parsed.layout.showGarisPotong)
        if (parsed.layout.showIkonGunting !== undefined)
          setShowIkonGunting(parsed.layout.showIkonGunting)
      }
    } else {
      setCfg((prev) => ({ ...prev, ...parsed }))
    }
  }

  const handleImportConfigJson = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        handleApplyConfigObject(parsed)
        setRawJsonText(JSON.stringify(parsed, null, 2))
        notify('Config JSON berhasil dimuat')
      } catch (err) {
        notify('Format JSON tidak valid: ' + err.message)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleApplyRawJson = () => {
    try {
      if (!rawJsonText.trim()) throw new Error('Teks JSON kosong')
      const parsed = JSON.parse(rawJsonText)
      handleApplyConfigObject(parsed)
      notify('Konfigurasi JSON berhasil diterapkan')
    } catch (err) {
      notify('Gagal menerapkan JSON: ' + err.message)
    }
  }

  // Export 1 Stiker PNG HD
  const handleDownloadSinglePng = async () => {
    try {
      setIsExporting(true)
      notify('Merender stiker PNG resolusi tinggi...')
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-single-stiker')
      if (!el) throw new Error('Elemen render tidak ditemukan')

      const dataUrl = await htmlToImage.toPng(el, {
        quality: 1.0,
        pixelRatio: 4.0,
        backgroundColor: '#ffffff',
        cacheBust: true
      })

      const link = document.createElement('a')
      link.download = `Stiker_MBG_${(cfg.namaDapur || 'DAPUR').replace(/[^a-zA-Z0-9]/g, '_')}.png`
      link.href = dataUrl
      link.click()
      notify('1 Stiker PNG HD berhasil diunduh')
    } catch (err) {
      notify('Gagal export: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  // Copy 1 Stiker to Clipboard
  const handleCopySinglePng = async () => {
    try {
      setIsExporting(true)
      notify('Menyalin stiker ke clipboard...')
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-single-stiker')
      if (!el) throw new Error('Elemen render tidak ditemukan')

      const blob = await htmlToImage.toBlob(el, {
        quality: 1.0,
        pixelRatio: 3.5,
        backgroundColor: '#ffffff',
        cacheBust: true
      })

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        notify('Gambar disalin. Langsung CTRL+V di Ms Word')
      } else {
        throw new Error('Clipboard API tidak didukung browser ini')
      }
    } catch (err) {
      notify('Gagal salin: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  // Download Full Sheet PNG (F4 / A4)
  const handleDownloadFullSheetPng = async () => {
    try {
      setIsExporting(true)
      notify(`Merender lembar ${paperSize} utuh resolusi tinggi...`)
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-full-sheet')
      if (!el) throw new Error(`Elemen lembar ${paperSize} tidak ditemukan`)

      const dataUrl = await htmlToImage.toPng(el, {
        quality: 1.0,
        pixelRatio: 3.5,
        backgroundColor: '#ffffff',
        cacheBust: true
      })

      const link = document.createElement('a')
      link.download = `Lembar_${paperSize}_${kolom}Stiker_MBG.png`
      link.href = dataUrl
      link.click()
      notify(`Lembar ${paperSize} PNG berhasil diunduh`)
    } catch (err) {
      notify('Gagal export: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  // Render Sub-Komponen Stiker
  const renderStikerContent = (sheetOffsetX = 0, extendLeftMm = 0, extendRightMm = 0) => (
    <StikerLabel
      cfg={cfg}
      kolom={kolom}
      susunanGizi={susunanGizi}
      fontMultiplier={fontMultiplier}
      colorMode={colorMode}
      paddingStiker={paddingStiker}
      sheetOffsetX={sheetOffsetX}
      extendLeftMm={extendLeftMm}
      extendRightMm={extendRightMm}
    />
  )

  const renderStikerCard = (idx) => {
    const isExtendGap = cfg?.patternExtendGap ?? true
    const cardPhysicalX = marginKiri + idx * (stickerWidthMm + gapAntarStiker)
    const extendLeftMm = isExtendGap ? (idx === 0 ? marginKiri : 0) : 0
    const extendRightMm = isExtendGap ? (idx < kolom - 1 ? gapAntarStiker : marginKanan) : 0
    const sheetOffsetX = isExtendGap ? (idx === 0 ? 0 : cardPhysicalX) : 0

    return (
      <article
        key={`stiker-${idx}`}
        aria-label={`Stiker Label ${idx + 1}`}
        style={{
          width: `${stickerWidthMm}mm`,
          height: `${stickerHeightMm}mm`,
          boxSizing: 'border-box',
          padding: `${paddingStiker}mm`,
          border: cardBorder,
          borderRadius: borderStyle === 'none' ? '0' : '4px',
          background: '#ffffff',
          overflow: 'visible',
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {renderStikerContent(sheetOffsetX, extendLeftMm, extendRightMm)}
      </article>
    )
  }

  const renderGapAntarStiker = (idx) => {
    if (!showGarisPotong && gapAntarStiker <= 0) return null
    return (
      <div
        key={`gap-${idx}`}
        aria-hidden='true'
        style={{
          width: `${gapAntarStiker}mm`,
          height: `${stickerHeightMm}mm`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          pointerEvents: 'none'
        }}
      >
        {showGarisPotong && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',
              borderLeft: '1px dashed #94a3b8',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          />
        )}
        {showGarisPotong && showIkonGunting && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '2mm',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '7pt',
                color: '#64748b',
                background: '#ffffff',
                lineHeight: 1,
                zIndex: 11
              }}
            >
              ✂
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '2mm',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '7pt',
                color: '#64748b',
                background: '#ffffff',
                lineHeight: 1,
                zIndex: 11
              }}
            >
              ✂
            </div>
          </>
        )}
      </div>
    )
  }

  const renderSheetContent = () => {
    const list = []
    for (let i = 0; i < kolom; i++) {
      list.push(renderStikerCard(i))
      if (i < kolom - 1 && gapAntarStiker > 0) {
        list.push(renderGapAntarStiker(i))
      }
    }
    return list
  }

  return (
    <main className='min-h-screen bg-[#FBFBFA] text-[#111111] selection:bg-neutral-200 dark:bg-[#121212] dark:text-[#EAEAEA] dark:selection:bg-neutral-800'>
      {/* ─── PRINT CSS STYLES (STANDAR CETAK F4 / A4) ─── */}
      <style>{`
        @page {
          size: ${paperWidthMm}mm ${paperHeightMm}mm portrait;
          margin: 0mm !important;
        }
        @media screen {
          #stiker-print-root {
            display: none !important;
          }
        }
        @media print {
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            width: ${paperWidthMm}mm !important;
            min-width: ${paperWidthMm}mm !important;
            max-width: ${paperWidthMm}mm !important;
            height: ${paperHeightMm}mm !important;
            min-height: ${paperHeightMm}mm !important;
            max-height: ${paperHeightMm}mm !important;
            overflow: hidden !important;
          }
          .no-print-area, nav, footer, header, .navbar, .footer, .no-print,
          [class*="navbar"], [class*="footer"], .docusaurus-highlight-code-line, .theme-layout-navbar {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #stiker-print-root {
            display: block !important;
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: ${paperWidthMm}mm !important;
            height: ${paperHeightMm}mm !important;
            margin: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            overflow: hidden !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            z-index: 9999999 !important;
          }
          #stiker-print-root * {
            visibility: visible !important;
          }
          img, svg {
            image-rendering: -webkit-optimize-contrast !important;
            image-rendering: crisp-edges !important;
          }
        }
      `}</style>

      {/* ─── WORKSPACE CONTENT (NO PRINT) ─── */}
      <div className='no-print-area mx-auto max-w-[1400px] px-4 py-5 sm:px-6'>
        {/* Top Header & Utilitarian Action Bar */}
        <header className='mb-6 flex flex-col gap-4 border-b border-[#EAEAEA] pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#262626]'>
          <div>
            <div className='flex items-center gap-2'>
              {/* Paper Selector Switcher Pill */}
              <div className='inline-flex rounded-md border border-[#EAEAEA] bg-[#F7F6F3] p-0.5 dark:border-[#262626] dark:bg-[#181818]'>
                {Object.values(PAPER_SIZES).map((p) => {
                  const isSelected = paperSize === p.id
                  return (
                    <button
                      key={p.id}
                      type='button'
                      onClick={() => setPaperSize(p.id)}
                      className={`cursor-pointer rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider transition-all ${
                        isSelected
                          ? 'bg-[#111111] text-white shadow-xs dark:bg-[#EAEAEA] dark:text-[#111111]'
                          : 'text-[#787774] hover:text-[#111111] dark:text-[#888888] dark:hover:text-white'
                      }`}
                      title={`Ganti format kertas ke ${p.label} (${p.subLabel})`}
                    >
                      {p.id} {p.subLabel}
                    </button>
                  )
                })}
              </div>
              <span className='text-[11px] font-medium text-[#787774] dark:text-[#888888]'>
                SPPG Badan Gizi Nasional
              </span>
            </div>
            <h1 className='mt-1 text-xl font-bold tracking-tight text-[#111111] sm:text-2xl dark:text-white'>
              Editor Desain Label Stiker Makan
            </h1>
          </div>

          {/* Action Toolbar */}
          <div className='flex flex-wrap items-center gap-1.5'>
            {/* Auto-Save Status Badge */}
            {lastSavedTime && (
              <div
                className='inline-flex h-8 items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-2.5 font-mono text-[10px] text-[#787774] dark:border-[#262626] dark:bg-[#181818] dark:text-[#AAAAAA]'
                title='Desain tersimpan otomatis di LocalStorage browser ini'
              >
                <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500'></span>
                <span>Tersimpan {lastSavedTime}</span>
              </div>
            )}

            <button
              type='button'
              onClick={handleManualSaveStorage}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-2.5 text-xs font-medium text-[#111111] transition-transform hover:bg-[#F7F6F3] active:scale-[0.98] dark:border-[#262626] dark:bg-[#181818] dark:text-white dark:hover:bg-[#222222]'
              title='Simpan perubahan ke LocalStorage browser'
            >
              <span>💾 Simpan</span>
            </button>

            <button
              type='button'
              onClick={handlePrint}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-[#111111] px-3 text-xs font-semibold text-white transition-transform hover:bg-[#262626] active:scale-[0.98] dark:bg-[#EAEAEA] dark:text-[#111111] dark:hover:bg-white'
              title={`Cetak langsung ke printer (Kertas ${paperSize})`}
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='6 9 6 2 18 2 18 9'></polyline>
                <path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'></path>
                <rect x='6' y='14' width='12' height='8'></rect>
              </svg>
              <span>Cetak {paperSize}</span>
            </button>

            <button
              type='button'
              onClick={handleDownloadSinglePng}
              disabled={isExporting}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-3 text-xs font-medium text-[#111111] transition-transform hover:bg-[#F7F6F3] active:scale-[0.98] disabled:opacity-50 dark:border-[#262626] dark:bg-[#181818] dark:text-white dark:hover:bg-[#222222]'
              title='Unduh 1 stiker PNG HD (untuk disisipkan di Ms Word)'
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                <polyline points='7 10 12 15 17 10'></polyline>
                <line x1='12' y1='15' x2='12' y2='3'></line>
              </svg>
              <span>Unduh 1 PNG</span>
            </button>

            <button
              type='button'
              onClick={handleCopySinglePng}
              disabled={isExporting}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-3 text-xs font-medium text-[#111111] transition-transform hover:bg-[#F7F6F3] active:scale-[0.98] disabled:opacity-50 dark:border-[#262626] dark:bg-[#181818] dark:text-white dark:hover:bg-[#222222]'
              title='Salin stiker ke clipboard, langsung CTRL+V di Word'
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
                <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
              </svg>
              <span>Salin (Word)</span>
            </button>

            <button
              type='button'
              onClick={handleDownloadFullSheetPng}
              disabled={isExporting}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-3 text-xs font-medium text-[#787774] transition-transform hover:bg-[#F7F6F3] hover:text-[#111111] active:scale-[0.98] disabled:opacity-50 dark:border-[#262626] dark:bg-[#181818] dark:text-[#AAAAAA] dark:hover:bg-[#222222] dark:hover:text-white'
              title={`Unduh 1 lembar ${paperSize} utuh resolusi tinggi`}
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
                <line x1='9' y1='3' x2='9' y2='21'></line>
              </svg>
              <span>Lembar {paperSize}</span>
            </button>

            <button
              type='button'
              onClick={handleDownloadConfigJson}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-2.5 text-xs font-medium text-[#787774] transition-transform hover:bg-[#F7F6F3] hover:text-[#111111] active:scale-[0.98] dark:border-[#262626] dark:bg-[#181818] dark:text-[#AAAAAA] dark:hover:bg-[#222222] dark:hover:text-white'
              title='Unduh file konfigurasi JSON'
            >
              <span className='font-mono text-[10px]'>.json</span>
            </button>

            <button
              type='button'
              onClick={() => jsonInputRef.current?.click()}
              className='inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#EAEAEA] bg-white px-2.5 text-xs font-medium text-[#787774] transition-transform hover:bg-[#F7F6F3] hover:text-[#111111] active:scale-[0.98] dark:border-[#262626] dark:bg-[#181818] dark:text-[#AAAAAA] dark:hover:bg-[#222222] dark:hover:text-white'
              title='Impor file konfigurasi JSON'
            >
              <span className='font-mono text-[10px]'>+json</span>
            </button>

            {/* Hidden JSON File Input */}
            <input
              type='file'
              ref={jsonInputRef}
              accept='.json,application/json'
              onChange={handleImportConfigJson}
              className='hidden'
            />
          </div>
        </header>

        {/* Minimalist Status Toast */}
        {exportMsg && (
          <div className='mb-4 flex items-center justify-between rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#111111] dark:border-[#333333] dark:bg-[#1C1C1C] dark:text-[#EAEAEA]'>
            <span className='flex items-center gap-2'>
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500'></span>
              {exportMsg}
            </span>
            <button
              type='button'
              onClick={() => setExportMsg('')}
              className='cursor-pointer text-xs text-[#787774] hover:text-[#111111] dark:hover:text-white'
            >
              ✕
            </button>
          </div>
        )}

        {/* Segmented Tab Navigation */}
        <div className='mb-6 flex flex-wrap items-center gap-1.5 border-b border-[#EAEAEA] pb-2 dark:border-[#262626]'>
          {[
            { id: 'konten', label: 'Konten Stiker' },
            { id: 'font', label: 'Tipografi & Pita' },
            { id: 'layout', label: 'Tata Letak & Kertas' },
            { id: 'word-guide', label: 'Panduan Word' },
            { id: 'json-backup', label: 'JSON Config' }
          ].map((tab) => (
            <button
              key={tab.id}
              type='button'
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.id === 'json-backup') {
                  setRawJsonText(JSON.stringify(getCurrentFullConfig(), null, 2))
                }
              }}
              className={`inline-flex h-7 cursor-pointer items-center rounded-md px-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#111111] text-white dark:bg-[#EAEAEA] dark:text-[#111111]'
                  : 'text-[#787774] hover:bg-[#F7F6F3] hover:text-[#111111] dark:text-[#888888] dark:hover:bg-[#1E1E1E] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 2-Column Responsive Workspace Grid */}
        <div className='flex flex-col gap-8 lg:grid lg:grid-cols-[440px_1fr] lg:items-start xl:grid-cols-[480px_1fr]'>
          {/* ── LEFT PANEL: CONFIGURATION FORMS ── */}
          <div className='flex flex-col gap-4'>
            {/* ══════════════════════════════════════════════════════════════
                TAB 1: KONTEN TEKS & ELEMEN
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 'konten' && (
              <div className='space-y-4'>
                {/* 1. Judul & Logo */}
                <section className='rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      1. Judul Label &amp; Logo
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={cfg.showJudul}
                        onChange={(e) => setCfg({ ...cfg, showJudul: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showJudul && (
                    <div className='mt-3 space-y-2.5'>
                      <div>
                        <label className='mb-1 block text-[11px] font-medium text-[#787774] dark:text-[#888888]'>
                          Teks Judul:
                        </label>
                        <input
                          type='text'
                          value={cfg.judul}
                          onChange={(e) => setCfg({ ...cfg, judul: e.target.value })}
                          placeholder='LABEL MAKANAN'
                          className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 text-xs font-semibold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                        />
                      </div>

                      <div className='space-y-2 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] p-2.5 dark:border-[#262626] dark:bg-[#141414]'>
                        <label className='flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#111111] dark:text-white'>
                          <input
                            type='checkbox'
                            checked={cfg.judulArch}
                            onChange={(e) => setCfg({ ...cfg, judulArch: e.target.checked })}
                            className='rounded accent-neutral-900 dark:accent-neutral-100'
                          />
                          <span>Teks Melengkung (Arched) di Atas Logo</span>
                        </label>

                        {cfg.judulArch && (
                          <div className='space-y-2 border-t border-[#EAEAEA] pt-1 dark:border-[#262626]'>
                            <div className='flex items-center justify-between text-xs'>
                              <span className='text-[#787774] dark:text-[#888888]'>
                                Kelengkungan Busur:
                              </span>
                              <span className='font-mono font-bold'>
                                {cfg.archCurvature ?? 55}°
                              </span>
                            </div>
                            <input
                              type='range'
                              min='6'
                              max='75'
                              step='1'
                              value={cfg.archCurvature ?? 55}
                              onChange={(e) =>
                                setCfg({ ...cfg, archCurvature: Number(e.target.value) })
                              }
                              className='w-full cursor-pointer accent-neutral-900 dark:accent-neutral-100'
                            />
                            <div className='flex flex-wrap gap-1'>
                              {[
                                { label: 'Landai (18)', val: 18 },
                                { label: 'Sedang (35)', val: 35 },
                                { label: 'Standar (55)', val: 55 },
                                { label: 'Tinggi (65)', val: 65 }
                              ].map((p) => (
                                <button
                                  key={p.val}
                                  type='button'
                                  onClick={() => setCfg({ ...cfg, archCurvature: p.val })}
                                  className={`cursor-pointer rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                                    (cfg.archCurvature ?? 55) === p.val
                                      ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                      : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>

                            <div className='border-t border-[#EAEAEA] pt-2 dark:border-[#262626]'>
                              <div className='mb-1 flex items-center justify-between text-xs'>
                                <span className='text-[#787774] dark:text-[#888888]'>
                                  Jarak Vertikal Logo ke Judul:
                                </span>
                                <span className='font-mono font-bold'>
                                  {(cfg.logoOffsetPt ?? 0) > 0
                                    ? `+${cfg.logoOffsetPt} pt`
                                    : `${cfg.logoOffsetPt ?? 0} pt`}
                                </span>
                              </div>
                              <input
                                type='range'
                                min='-25'
                                max='20'
                                step='1'
                                value={cfg.logoOffsetPt ?? 0}
                                onChange={(e) =>
                                  setCfg({ ...cfg, logoOffsetPt: Number(e.target.value) })
                                }
                                className='w-full cursor-pointer accent-neutral-900 dark:accent-neutral-100'
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className='mt-3 flex items-center justify-between border-t border-[#EAEAEA] pt-2.5 dark:border-[#262626]'>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#111111] dark:text-white'>
                      <input
                        type='checkbox'
                        checked={cfg.showLogo}
                        onChange={(e) => setCfg({ ...cfg, showLogo: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Logo BGN</span>
                    </label>
                    <button
                      type='button'
                      onClick={() => fileInputRef.current?.click()}
                      className='cursor-pointer text-[11px] font-medium text-[#787774] underline hover:text-[#111111] dark:text-[#888888] dark:hover:text-white'
                    >
                      Unggah Logo Lain
                    </button>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      onChange={handleUploadLogo}
                      className='hidden'
                    />
                  </div>
                </section>

                {/* 2. Nama SPPG & Yayasan */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                    2. SPPG Dapur &amp; Yayasan Mitra
                  </h2>

                  <div>
                    <div className='mb-1 flex items-center justify-between text-xs'>
                      <label className='text-[11px] font-medium text-[#787774] dark:text-[#888888]'>
                        Nama SPPG:
                      </label>
                      <label className='flex cursor-pointer items-center gap-1 text-[11px] text-[#787774] dark:text-[#888888]'>
                        <input
                          type='checkbox'
                          checked={cfg.showDapur}
                          onChange={(e) => setCfg({ ...cfg, showDapur: e.target.checked })}
                          className='rounded accent-neutral-900 dark:accent-neutral-100'
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <input
                      type='text'
                      value={cfg.namaDapur}
                      onChange={(e) => setCfg({ ...cfg, namaDapur: e.target.value })}
                      placeholder='SPPG GROBOGAN GROBOGAN PURWODADI'
                      className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 text-xs font-semibold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                    />
                  </div>

                  <div>
                    <div className='mb-1 flex items-center justify-between text-xs'>
                      <label className='text-[11px] font-medium text-[#787774] dark:text-[#888888]'>
                        Nama Yayasan / Mitra:
                      </label>
                      <label className='flex cursor-pointer items-center gap-1 text-[11px] text-[#787774] dark:text-[#888888]'>
                        <input
                          type='checkbox'
                          checked={cfg.showMitra}
                          onChange={(e) => setCfg({ ...cfg, showMitra: e.target.checked })}
                          className='rounded accent-neutral-900 dark:accent-neutral-100'
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <input
                      type='text'
                      value={cfg.namaMitra}
                      onChange={(e) => setCfg({ ...cfg, namaMitra: e.target.value })}
                      placeholder='YAYASAN LEMAN GRIMAH LOHJINAWI'
                      className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 text-xs font-semibold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                    />
                  </div>
                </section>

                {/* 3. Box Menu Makanan */}
                <section className='rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      3. Box Menu Makanan
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={cfg.showMenu}
                        onChange={(e) => setCfg({ ...cfg, showMenu: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showMenu && (
                    <div className='mt-3 space-y-2.5'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div>
                          <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                            Judul Header Box:
                          </label>
                          <input
                            type='text'
                            value={cfg.judulMenu}
                            onChange={(e) => setCfg({ ...cfg, judulMenu: e.target.value })}
                            placeholder='MENU'
                            className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs font-bold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                          />
                        </div>
                        <div>
                          <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                            Sudut Kotak (Radius):
                          </label>
                          <select
                            value={cfg.tableRadius ?? 4}
                            onChange={(e) =>
                              setCfg({ ...cfg, tableRadius: Number(e.target.value) })
                            }
                            className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                          >
                            <option value={0}>Siku Tajam (0px)</option>
                            <option value={2}>Halus (2px)</option>
                            <option value={4}>Standar (4px)</option>
                            <option value={6}>Bulat (6px)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                          Daftar Menu (Ketik 1 baris per menu):
                        </label>
                        <textarea
                          rows={5}
                          value={cfg.menuText}
                          onChange={(e) => setCfg({ ...cfg, menuText: e.target.value })}
                          placeholder='Nasi Putih&#10;Ayam Goreng Mentega&#10;Tumis Gambas Wortel...'
                          className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 font-mono text-xs leading-relaxed text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                        />
                      </div>
                    </div>
                  )}
                </section>

                {/* 4. Analisis Nilai Gizi */}
                <section className='rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      4. Kandungan Gizi
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={cfg.showGizi}
                        onChange={(e) => setCfg({ ...cfg, showGizi: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showGizi && (
                    <div className='mt-3 space-y-3'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div>
                          <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                            Judul Seksi:
                          </label>
                          <input
                            type='text'
                            value={cfg.judulGizi}
                            onChange={(e) => setCfg({ ...cfg, judulGizi: e.target.value })}
                            placeholder='ANALISIS KANDUNGAN GIZI'
                            className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs font-bold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                          />
                        </div>
                        <div>
                          <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                            Ikon Baris Gizi:
                          </label>
                          <select
                            value={cfg.giziIconType || 'emoji'}
                            onChange={(e) => setCfg({ ...cfg, giziIconType: e.target.value })}
                            className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                          >
                            <option value='emoji'>Emoji (⚡🥩🥑🍚🥦)</option>
                            <option value='bullet'>Bullet Titik (•)</option>
                            <option value='none'>Tanpa Ikon</option>
                          </select>
                        </div>
                      </div>

                      {/* Filter Kategori Aktif */}
                      <div>
                        <label className='mb-1 block text-[10px] font-medium text-[#787774] dark:text-[#888888]'>
                          Kategori yang Ditampilkan di Stiker:
                        </label>
                        <div className='grid grid-cols-2 gap-1.5 sm:grid-cols-3'>
                          {GIZI_CATEGORIES.map((cat) => {
                            const isActive = cfg.giziActiveCategories
                              ? !!cfg.giziActiveCategories[cat.id]
                              : cat.defaultActive
                            return (
                              <button
                                key={cat.id}
                                type='button'
                                onClick={() => {
                                  const currentActive = cfg.giziActiveCategories || {
                                    besar: true,
                                    kecil: true,
                                    balita: false,
                                    ibuHamil: false,
                                    ibuMenyusui: false
                                  }
                                  setCfg({
                                    ...cfg,
                                    giziActiveCategories: {
                                      ...currentActive,
                                      [cat.id]: !isActive
                                    }
                                  })
                                }}
                                className={`flex cursor-pointer items-center justify-between rounded border px-2 py-1 text-xs font-medium transition-colors ${
                                  isActive
                                    ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                    : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                                }`}
                              >
                                <span className='truncate'>
                                  {cat.icon} {cat.title}
                                </span>
                                <span className='font-mono text-[9px] opacity-80'>
                                  {isActive ? 'ON' : 'OFF'}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Detail Input Gizi */}
                      <div className='grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2'>
                        {GIZI_CATEGORIES.filter((cat) =>
                          cfg.giziActiveCategories
                            ? !!cfg.giziActiveCategories[cat.id]
                            : cat.defaultActive
                        ).map((cat) => {
                          const data = cfg[cat.key] || DEFAULT_CONFIG[cat.key] || {}
                          return (
                            <div
                              key={cat.id}
                              className='rounded border border-[#EAEAEA] bg-[#F7F6F3] p-2 dark:border-[#262626] dark:bg-[#141414]'
                            >
                              <div className='mb-1.5 flex items-center justify-between text-[11px] font-bold text-[#111111] dark:text-white'>
                                <span>
                                  {cat.icon} {cat.title}
                                </span>
                                <span className='font-mono text-[9px] text-[#787774] dark:text-[#888888]'>
                                  Aktif
                                </span>
                              </div>
                              <div className='grid grid-cols-2 gap-1.5'>
                                {['energi', 'protein', 'lemak', 'karbohidrat', 'serat'].map((k) => (
                                  <div key={`${cat.id}-${k}`}>
                                    <label className='block text-[9px] text-[#787774] capitalize dark:text-[#888888]'>
                                      {k}
                                    </label>
                                    <input
                                      type='text'
                                      value={data[k] || ''}
                                      onChange={(e) =>
                                        setCfg({
                                          ...cfg,
                                          [cat.key]: {
                                            ...(cfg[cat.key] || DEFAULT_CONFIG[cat.key] || {}),
                                            [k]: e.target.value
                                          }
                                        })
                                      }
                                      className='w-full rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#1C1C1C] dark:text-white'
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </section>

                {/* 5. Batas Waktu Konsumsi & Larangan */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      5. Batas Waktu Konsumsi &amp; Larangan
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={cfg.showBatasAman}
                        onChange={(e) => setCfg({ ...cfg, showBatasAman: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showBatasAman && (
                    <div className='space-y-2.5'>
                      <div>
                        <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                          Teks Judul Batas Waktu (per baris):
                        </label>
                        <textarea
                          rows={2}
                          value={cfg.judulBatasAman}
                          onChange={(e) => setCfg({ ...cfg, judulBatasAman: e.target.value })}
                          className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1 text-xs font-bold text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                          placeholder='HARUS DIKONSUMSI&#10;SEBELUM PUKUL'
                        />
                      </div>

                      {/* Batas Jam / Waktu */}
                      <div>
                        <div className='mb-1 flex items-center justify-between text-xs'>
                          <label className='text-[10px] font-medium text-[#787774] dark:text-[#888888]'>
                            Batas Jam / Waktu:
                          </label>
                          <span className='font-mono text-[10px] font-bold text-[#111111] dark:text-white'>
                            {cfg.durasiBatas}
                          </span>
                        </div>
                        <div className='grid grid-cols-[110px_1fr] gap-1.5'>
                          {/* HTML5 Time Picker */}
                          <input
                            type='time'
                            value={parseTimeToHhMm(cfg.durasiBatas)}
                            onChange={(e) => {
                              const timeVal = e.target.value
                              if (!timeVal) return
                              // Preserve existing timezone suffix if any (e.g. WIB, WITA, WIT)
                              const tzMatch = (cfg.durasiBatas || '').match(/\b(WIB|WITA|WIT)\b/i)
                              const tz = tzMatch ? tzMatch[1].toUpperCase() : 'WIB'
                              setCfg({ ...cfg, durasiBatas: `${timeVal} ${tz}` })
                            }}
                            className='cursor-pointer rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                            title='Pilih jam dari picker'
                          />
                          {/* Text input for manual / timezone adjustment */}
                          <input
                            type='text'
                            value={cfg.durasiBatas}
                            onChange={(e) => setCfg({ ...cfg, durasiBatas: e.target.value })}
                            className='rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs font-bold text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                            placeholder='08:00 WIB'
                          />
                        </div>
                        {/* Preset Time Buttons */}
                        <div className='mt-1.5 flex flex-wrap gap-1'>
                          <button
                            type='button'
                            onClick={() => {
                              const now = new Date()
                              now.setHours(now.getHours() + 2)
                              const hh = String(now.getHours()).padStart(2, '0')
                              const mm = String(now.getMinutes()).padStart(2, '0')
                              setCfg({ ...cfg, durasiBatas: `${hh}:${mm} WIB` })
                            }}
                            className='cursor-pointer rounded border border-[#111111] bg-[#111111] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white hover:bg-[#262626] dark:border-white dark:bg-white dark:text-[#111111]'
                            title='Set waktu batas 2 jam dari sekarang'
                          >
                            +2 Jam Sekarang
                          </button>
                          {[
                            '08:00 WIB',
                            '09:00 WIB',
                            '09:30 WIB',
                            '10:00 WIB',
                            '11:00 WIB',
                            '12:00 WIB'
                          ].map((preset) => (
                            <button
                              key={preset}
                              type='button'
                              onClick={() => setCfg({ ...cfg, durasiBatas: preset })}
                              className={`cursor-pointer rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                                cfg.durasiBatas === preset
                                  ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                  : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888] dark:hover:bg-[#222222] dark:hover:text-white'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Opsi Tanggal Konsumsi */}
                      <div className='border-t border-[#EAEAEA] pt-2 dark:border-[#262626]'>
                        <div className='mb-1 flex items-center justify-between text-xs'>
                          <label className='text-[11px] font-medium text-[#111111] dark:text-white'>
                            Opsi Tanggal Konsumsi
                          </label>
                          <label className='flex cursor-pointer items-center gap-1 text-[11px] text-[#787774] dark:text-[#888888]'>
                            <input
                              type='checkbox'
                              checked={cfg.showTanggalBatas}
                              onChange={(e) =>
                                setCfg({ ...cfg, showTanggalBatas: e.target.checked })
                              }
                              className='rounded accent-neutral-900 dark:accent-neutral-100'
                            />
                            <span>Tampilkan</span>
                          </label>
                        </div>
                        {cfg.showTanggalBatas && (
                          <div className='space-y-2'>
                            <div className='grid grid-cols-[135px_1fr] gap-1.5'>
                              {/* HTML5 Date Picker */}
                              <input
                                type='date'
                                value={
                                  parseDateToIso(cfg.tanggalBatas) ||
                                  new Date().toISOString().split('T')[0]
                                }
                                onChange={(e) => {
                                  const isoDate = e.target.value
                                  if (!isoDate) return
                                  const [y, m, d] = isoDate.split('-').map(Number)
                                  const dateObj = new Date(y, m - 1, d)
                                  setCfg({
                                    ...cfg,
                                    tanggalBatas: formatDateToPattern(dateObj, 'slash')
                                  })
                                }}
                                className='cursor-pointer rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                                title='Pilih tanggal dari kalender picker'
                              />
                              {/* Text representation */}
                              <input
                                type='text'
                                value={cfg.tanggalBatas}
                                onChange={(e) => setCfg({ ...cfg, tanggalBatas: e.target.value })}
                                className='rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs font-bold text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                                placeholder='04/09/2026 atau 04 September 2026'
                              />
                            </div>

                            {/* Quick Date Presets & Format Switcher */}
                            <div className='flex flex-wrap items-center justify-between gap-1 text-xs'>
                              {/* Presets */}
                              <div className='flex flex-wrap gap-1'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    setCfg({
                                      ...cfg,
                                      tanggalBatas: formatDateToPattern(new Date(), 'slash')
                                    })
                                  }}
                                  className='cursor-pointer rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#787774] hover:bg-[#F7F6F3] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                                >
                                  Hari Ini
                                </button>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const d = new Date()
                                    d.setDate(d.getDate() + 1)
                                    setCfg({
                                      ...cfg,
                                      tanggalBatas: formatDateToPattern(d, 'slash')
                                    })
                                  }}
                                  className='cursor-pointer rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#787774] hover:bg-[#F7F6F3] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                                >
                                  Besok
                                </button>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const d = new Date()
                                    d.setDate(d.getDate() + 2)
                                    setCfg({
                                      ...cfg,
                                      tanggalBatas: formatDateToPattern(d, 'slash')
                                    })
                                  }}
                                  className='cursor-pointer rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#787774] hover:bg-[#F7F6F3] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                                >
                                  Lusa
                                </button>
                              </div>

                              {/* Formats */}
                              <div className='flex items-center gap-1'>
                                <span className='text-[10px] text-[#787774] dark:text-[#888888]'>
                                  Format:
                                </span>
                                {[
                                  { id: 'slash', label: 'DD/MM/YYYY' },
                                  { id: 'long', label: 'Teks Panjang' },
                                  { id: 'dash', label: 'DD-MM-YYYY' }
                                ].map((fmt) => (
                                  <button
                                    key={fmt.id}
                                    type='button'
                                    onClick={() => {
                                      const iso = parseDateToIso(cfg.tanggalBatas)
                                      const dateObj = iso ? new Date(iso) : new Date()
                                      setCfg({
                                        ...cfg,
                                        tanggalBatas: formatDateToPattern(dateObj, fmt.id)
                                      })
                                    }}
                                    className='cursor-pointer rounded border border-[#EAEAEA] bg-[#F7F6F3] px-1.5 py-0.5 font-mono text-[10px] text-[#787774] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                                  >
                                    {fmt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Badges Segera Konsumsi & Larangan */}
                  <div className='space-y-2 border-t border-[#EAEAEA] pt-2 dark:border-[#262626]'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='font-bold text-[#111111] dark:text-white'>
                        Badge Petunjuk &amp; Larangan
                      </span>
                      <label className='flex cursor-pointer items-center gap-1 text-[11px] text-[#787774] dark:text-[#888888]'>
                        <input
                          type='checkbox'
                          checked={cfg.showBadges}
                          onChange={(e) => setCfg({ ...cfg, showBadges: e.target.checked })}
                          className='rounded accent-neutral-900 dark:accent-neutral-100'
                        />
                        <span>Aktif</span>
                      </label>
                    </div>

                    {cfg.showBadges && (
                      <div className='space-y-2 text-xs'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div>
                            <label className='mb-0.5 block text-[10px] text-[#787774] dark:text-[#888888]'>
                              Susunan Badge:
                            </label>
                            <select
                              value={cfg.badgeLayout || 'stacked'}
                              onChange={(e) => setCfg({ ...cfg, badgeLayout: e.target.value })}
                              className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                            >
                              <option value='stacked'>Atas - Bawah (Standar)</option>
                              <option value='sideBySide'>Kiri - Kanan (Berdampingan)</option>
                            </select>
                          </div>
                          <div className='flex items-end pb-1'>
                            <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                              <input
                                type='checkbox'
                                checked={cfg.badgeBorder}
                                onChange={(e) => setCfg({ ...cfg, badgeBorder: e.target.checked })}
                                className='rounded accent-neutral-900 dark:accent-neutral-100'
                              />
                              <span>Border Kotak Badge</span>
                            </label>
                          </div>
                        </div>

                        {/* Badge 1 */}
                        <div className='space-y-1.5 rounded border border-[#EAEAEA] bg-[#F7F6F3] p-2 dark:border-[#262626] dark:bg-[#141414]'>
                          <div className='flex items-center justify-between text-[11px]'>
                            <span className='font-bold'>🍽️ Badge 1: Segera Konsumsi</span>
                            <input
                              type='checkbox'
                              checked={cfg.showBadgeSegera}
                              onChange={(e) =>
                                setCfg({ ...cfg, showBadgeSegera: e.target.checked })
                              }
                              className='rounded accent-neutral-900 dark:accent-neutral-100'
                            />
                          </div>
                          {cfg.showBadgeSegera && (
                            <div className='grid grid-cols-2 gap-1.5'>
                              <input
                                type='text'
                                value={cfg.judulBadgeSegera}
                                onChange={(e) =>
                                  setCfg({ ...cfg, judulBadgeSegera: e.target.value })
                                }
                                placeholder='SEGERA KONSUMSI'
                                className='w-full rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#1C1C1C] dark:text-white'
                              />
                              <input
                                type='text'
                                value={cfg.subBadgeSegera}
                                onChange={(e) => setCfg({ ...cfg, subBadgeSegera: e.target.value })}
                                placeholder='SETELAH DITERIMA'
                                className='w-full rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#1C1C1C] dark:text-white'
                              />
                            </div>
                          )}
                        </div>

                        {/* Badge 2 */}
                        <div className='space-y-1.5 rounded border border-[#EAEAEA] bg-[#F7F6F3] p-2 dark:border-[#262626] dark:bg-[#141414]'>
                          <div className='flex items-center justify-between text-[11px]'>
                            <span className='font-bold'>🚫 Badge 2: Larangan Bawa Pulang</span>
                            <input
                              type='checkbox'
                              checked={cfg.showBadgeLarangan}
                              onChange={(e) =>
                                setCfg({ ...cfg, showBadgeLarangan: e.target.checked })
                              }
                              className='rounded accent-neutral-900 dark:accent-neutral-100'
                            />
                          </div>
                          {cfg.showBadgeLarangan && (
                            <div className='grid grid-cols-2 gap-1.5'>
                              <input
                                type='text'
                                value={cfg.judulBadgeLarangan}
                                onChange={(e) =>
                                  setCfg({ ...cfg, judulBadgeLarangan: e.target.value })
                                }
                                placeholder='TIDAK BOLEH'
                                className='w-full rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#1C1C1C] dark:text-white'
                              />
                              <input
                                type='text'
                                value={cfg.subBadgeLarangan}
                                onChange={(e) =>
                                  setCfg({ ...cfg, subBadgeLarangan: e.target.value })
                                }
                                placeholder='DIBAWA PULANG'
                                className='w-full rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#1C1C1C] dark:text-white'
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* 6. Footer Sosmed & Edukasi */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      6. Media Sosial &amp; Edukasi
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={cfg.showSosmed}
                        onChange={(e) => setCfg({ ...cfg, showSosmed: e.target.checked })}
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Tampilkan Sosmed</span>
                    </label>
                  </div>

                  {cfg.showSosmed && (
                    <div className='space-y-1.5 text-xs'>
                      <div className='flex items-center gap-2'>
                        <span className='w-16 font-mono text-[10px] text-[#787774] dark:text-[#888888]'>
                          Instagram
                        </span>
                        <input
                          type='text'
                          value={cfg.igHandle}
                          onChange={(e) => setCfg({ ...cfg, igHandle: e.target.value })}
                          placeholder='@sppgdefault'
                          className='flex-1 rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                        />
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='w-16 font-mono text-[10px] text-[#787774] dark:text-[#888888]'>
                          Facebook
                        </span>
                        <input
                          type='text'
                          value={cfg.fbHandle}
                          onChange={(e) => setCfg({ ...cfg, fbHandle: e.target.value })}
                          placeholder='@sppgdefault'
                          className='flex-1 rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                        />
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='w-16 font-mono text-[10px] text-[#787774] dark:text-[#888888]'>
                          TikTok
                        </span>
                        <input
                          type='text'
                          value={cfg.tiktokHandle}
                          onChange={(e) => setCfg({ ...cfg, tiktokHandle: e.target.value })}
                          placeholder='@sppgdefault'
                          className='flex-1 rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                        />
                      </div>
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB 2: TIPOGRAFI & PITA ORNAMEN
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 'font' && (
              <div className='space-y-4'>
                {/* Font Family Selection */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                    Jenis Huruf (Font Family)
                  </h2>
                  <div>
                    <select
                      value={cfg.fontFamily || FONT_OPTIONS[0].value}
                      onChange={(e) => setCfg({ ...cfg, fontFamily: e.target.value })}
                      className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 text-xs text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='rounded border border-[#EAEAEA] bg-[#F7F6F3] p-2 text-center dark:border-[#262626] dark:bg-[#141414]'>
                    <span
                      style={{ fontFamily: cfg.fontFamily || FONT_OPTIONS[0].value }}
                      className='text-xs font-bold text-[#111111] dark:text-white'
                    >
                      SPPG BADAN GIZI NASIONAL — 0123456789
                    </span>
                  </div>
                </section>

                {/* Warna Utama Stiker (Color Picker & Hex) */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between border-b border-[#EAEAEA] pb-2 dark:border-[#262626]'>
                    <div>
                      <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                        Warna Utama Stiker (Primary Color)
                      </h2>
                      <p className='text-[10px] text-[#787774] dark:text-[#888888]'>
                        Warna teks judul, SPPG, border &amp; header tabel, jam, dan sosmed.
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() => setCfg({ ...cfg, primaryColor: '#071e48' })}
                      className='cursor-pointer font-mono text-[10px] text-[#787774] underline hover:text-[#111111] dark:text-[#888888] dark:hover:text-white'
                    >
                      Reset Default (#071e48)
                    </button>
                  </div>

                  <div className='flex flex-wrap items-center gap-3'>
                    {/* Native Color Picker Swatch */}
                    <div className='flex items-center gap-2'>
                      <label className='relative flex h-9 w-12 cursor-pointer items-center justify-center overflow-hidden rounded border border-[#EAEAEA] shadow-xs dark:border-[#2E2E2E]'>
                        <input
                          type='color'
                          value={
                            cfg.primaryColor && /^#[0-9A-Fa-f]{6}$/.test(cfg.primaryColor)
                              ? cfg.primaryColor
                              : '#071e48'
                          }
                          onChange={(e) => setCfg({ ...cfg, primaryColor: e.target.value })}
                          className='absolute -inset-2 h-14 w-16 cursor-pointer border-0 p-0'
                        />
                      </label>
                    </div>

                    {/* Hex Input Box */}
                    <div className='flex min-w-[130px] flex-1 items-center rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-1.5 font-mono text-xs dark:border-[#2E2E2E] dark:bg-[#121212]'>
                      <span className='font-bold text-[#787774] select-none dark:text-[#888888]'>
                        HEX:
                      </span>
                      <input
                        type='text'
                        value={cfg.primaryColor || '#071e48'}
                        onChange={(e) => {
                          let val = e.target.value.trim()
                          if (val && !val.startsWith('#')) {
                            val = '#' + val
                          }
                          setCfg({ ...cfg, primaryColor: val })
                        }}
                        placeholder='#071e48'
                        maxLength={7}
                        className='ml-1.5 w-full bg-transparent font-bold text-[#111111] uppercase focus:outline-hidden dark:text-white'
                      />
                    </div>

                    {/* Preview Badge Swatch */}
                    <div
                      style={{ backgroundColor: cfg.primaryColor || '#071e48' }}
                      className='flex h-9 items-center justify-center rounded px-3 text-xs font-bold text-white shadow-xs'
                    >
                      <span>CONTOH TEKS</span>
                    </div>
                  </div>

                  {/* Preset Colors */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-semibold text-[#787774] dark:text-[#888888]'>
                      Preset Warna Cepat:
                    </label>
                    <div className='grid grid-cols-3 gap-1.5 sm:grid-cols-6'>
                      {[
                        { label: 'BGN Navy (Default)', hex: '#071e48' },
                        { label: 'Hitam Pekat', hex: '#000000' },
                        { label: 'Hijau SPPG', hex: '#064e3b' },
                        { label: 'Biru Navy', hex: '#1e3a8a' },
                        { label: 'Marun Tua', hex: '#881337' },
                        { label: 'Slate Dark', hex: '#334155' }
                      ].map((preset) => {
                        const isSelected =
                          (cfg.primaryColor || '#071e48').toLowerCase() === preset.hex.toLowerCase()
                        return (
                          <button
                            key={preset.hex}
                            type='button'
                            onClick={() => setCfg({ ...cfg, primaryColor: preset.hex })}
                            className={`flex cursor-pointer items-center gap-1.5 rounded border p-1.5 text-left text-[10px] transition-all ${
                              isSelected
                                ? 'border-[#111111] bg-[#F7F6F3] font-bold text-[#111111] ring-1 ring-[#111111] dark:border-white dark:bg-[#1E1E1E] dark:text-white dark:ring-white'
                                : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                            }`}
                          >
                            <span
                              style={{ backgroundColor: preset.hex }}
                              className='h-3.5 w-3.5 shrink-0 rounded-full border border-black/10'
                            />
                            <span className='truncate'>{preset.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </section>

                {/* Pita Dekorasi Ornamen BGN */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      Pita Ornamen Dekorasi Label
                    </h2>
                    <label className='flex cursor-pointer items-center gap-1.5 text-xs text-[#787774] dark:text-[#888888]'>
                      <input
                        type='checkbox'
                        checked={(cfg.showPattern ?? true) && cfg.patternPos !== 'none'}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            showPattern: e.target.checked,
                            patternPos: e.target.checked ? 'both' : 'none'
                          })
                        }
                        className='rounded accent-neutral-900 dark:accent-neutral-100'
                      />
                      <span>Aktifkan</span>
                    </label>
                  </div>

                  {(cfg.showPattern ?? true) && cfg.patternPos !== 'none' && (
                    <div className='space-y-3 pt-1'>
                      <div>
                        <label className='mb-1 block text-[10px] text-[#787774] dark:text-[#888888]'>
                          Posisi Pita:
                        </label>
                        <div className='grid grid-cols-3 gap-1.5'>
                          {[
                            { id: 'both', label: 'Atas & Bawah' },
                            { id: 'top', label: 'Bawah Kop' },
                            { id: 'bottom', label: 'Atas Footer' }
                          ].map((pos) => (
                            <button
                              key={pos.id}
                              type='button'
                              onClick={() => setCfg({ ...cfg, patternPos: pos.id })}
                              className={`cursor-pointer rounded border px-1.5 py-1 text-xs font-medium ${
                                (cfg.patternPos || 'both') === pos.id
                                  ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                  : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                              }`}
                            >
                              {pos.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-2'>
                        <button
                          type='button'
                          onClick={() =>
                            setCfg({
                              ...cfg,
                              patternType: 'color',
                              patternUrl: '/img/pattern4.png'
                            })
                          }
                          className={`cursor-pointer rounded border p-2 text-left ${
                            (cfg.patternType || 'color') === 'color'
                              ? 'border-[#111111] bg-[#F7F6F3] text-[#111111] dark:border-white dark:bg-[#1F1F1F] dark:text-white'
                              : 'border-[#EAEAEA] bg-white text-[#787774] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                          }`}
                        >
                          <div className='text-xs font-bold'>Warna Asli BGN</div>
                          <div className='text-[10px] opacity-75'>Navy &amp; Emas</div>
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            setCfg({
                              ...cfg,
                              patternType: 'white',
                              patternUrl: '/img/pattern4-white.png'
                            })
                          }
                          className={`cursor-pointer rounded border p-2 text-left ${
                            cfg.patternType === 'white'
                              ? 'border-[#111111] bg-[#F7F6F3] text-[#111111] dark:border-white dark:bg-[#1F1F1F] dark:text-white'
                              : 'border-[#EAEAEA] bg-white text-[#787774] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                          }`}
                        >
                          <div className='text-xs font-bold'>Monokrom Putih</div>
                          <div className='text-[10px] opacity-75'>Minimalis</div>
                        </button>
                      </div>

                      {/* Bentang Pita Melintasi Celah Gap */}
                      <div>
                        <label className='mb-1 block text-[10px] text-[#787774] dark:text-[#888888]'>
                          Bentang Pita Terhadap Gap (Celah Potong):
                        </label>
                        <div className='grid grid-cols-2 gap-2'>
                          <button
                            type='button'
                            onClick={() => setCfg({ ...cfg, patternExtendGap: true })}
                            className={`cursor-pointer rounded border p-2 text-left ${
                              (cfg.patternExtendGap ?? true)
                                ? 'border-[#111111] bg-[#F7F6F3] text-[#111111] dark:border-white dark:bg-[#1F1F1F] dark:text-white'
                                : 'border-[#EAEAEA] bg-white text-[#787774] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                            }`}
                          >
                            <div className='text-xs font-bold'>✨ Ikut Menembus Gap</div>
                            <div className='text-[10px] opacity-75'>
                              Pita menyambung penuh melintasi celah potong &amp; margin
                            </div>
                          </button>
                          <button
                            type='button'
                            onClick={() => setCfg({ ...cfg, patternExtendGap: false })}
                            className={`cursor-pointer rounded border p-2 text-left ${
                              !(cfg.patternExtendGap ?? true)
                                ? 'border-[#111111] bg-[#F7F6F3] text-[#111111] dark:border-white dark:bg-[#1F1F1F] dark:text-white'
                                : 'border-[#EAEAEA] bg-white text-[#787774] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                            }`}
                          >
                            <div className='text-xs font-bold'>✂️ Pas di Dalam Stiker</div>
                            <div className='text-[10px] opacity-75'>
                              Pita terputus di celah / batas kartu stiker
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className='mb-1 flex justify-between text-xs'>
                          <span className='text-[#787774] dark:text-[#888888]'>
                            Tinggi Pita Dekorasi:
                          </span>
                          <span className='font-mono font-bold'>
                            {cfg.patternHeightMm || 7.5} mm
                          </span>
                        </div>
                        <input
                          type='range'
                          min='3'
                          max='14'
                          step='0.5'
                          value={cfg.patternHeightMm || 7.5}
                          onChange={(e) =>
                            setCfg({ ...cfg, patternHeightMm: parseFloat(e.target.value) })
                          }
                          className='w-full cursor-pointer accent-neutral-900 dark:accent-neutral-100'
                        />
                      </div>
                    </div>
                  )}
                </section>

                {/* Ukuran Font Per Bagian */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between border-b border-[#EAEAEA] pb-2 dark:border-[#262626]'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      Ukuran Font &amp; Logo (pt / mm)
                    </h2>
                    <button
                      type='button'
                      onClick={() =>
                        setCfg({
                          ...cfg,
                          fontSizes: DEFAULT_CONFIG.fontSizes,
                          logoSizeMm: DEFAULT_CONFIG.logoSizeMm
                        })
                      }
                      className='cursor-pointer font-mono text-[10px] text-[#787774] underline hover:text-[#111111] dark:text-[#888888] dark:hover:text-white'
                    >
                      Reset Default
                    </button>
                  </div>

                  <div className='grid grid-cols-2 gap-2.5 text-xs'>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Judul Atas (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='8'
                        max='40'
                        value={cfg.fontSizes?.judul ?? 29.5}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: { ...(cfg.fontSizes || {}), judul: Number(e.target.value) }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Ukuran Logo (mm)
                      </label>
                      <input
                        type='number'
                        step='1'
                        min='15'
                        max='80'
                        value={cfg.logoSizeMm ?? 50}
                        onChange={(e) => setCfg({ ...cfg, logoSizeMm: Number(e.target.value) })}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Nama SPPG (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='6'
                        max='24'
                        value={cfg.fontSizes?.namaDapur ?? 12}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: {
                              ...(cfg.fontSizes || {}),
                              namaDapur: Number(e.target.value)
                            }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Nama Yayasan (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='5'
                        max='18'
                        value={cfg.fontSizes?.namaMitra ?? 10}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: {
                              ...(cfg.fontSizes || {}),
                              namaMitra: Number(e.target.value)
                            }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Isi Menu (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='5'
                        max='16'
                        value={cfg.fontSizes?.isiMenu ?? 8}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: { ...(cfg.fontSizes || {}), isiMenu: Number(e.target.value) }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Isi Gizi (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='5'
                        max='16'
                        value={cfg.fontSizes?.isiGizi ?? 8}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: { ...(cfg.fontSizes || {}), isiGizi: Number(e.target.value) }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Jam Batas Waktu (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='8'
                        max='32'
                        value={cfg.fontSizes?.durasiBatas ?? 16}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: {
                              ...(cfg.fontSizes || {}),
                              durasiBatas: Number(e.target.value)
                            }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Badge Teks (pt)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        min='6'
                        max='20'
                        value={cfg.fontSizes?.badgeTeks ?? 10}
                        onChange={(e) =>
                          setCfg({
                            ...cfg,
                            fontSizes: {
                              ...(cfg.fontSizes || {}),
                              badgeTeks: Number(e.target.value)
                            }
                          })
                        }
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB 3: TATA LETAK & KERTAS
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 'layout' && (
              <div className='space-y-4'>
                {/* Pilihan Format Kertas Cetak */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                      Ukuran Kertas Cetak
                    </h2>
                    <span className='rounded bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'>
                      Aktif: {paperSize} ({paperWidthMm}×{paperHeightMm} mm)
                    </span>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    {Object.values(PAPER_SIZES).map((p) => {
                      const isSelected = paperSize === p.id
                      return (
                        <button
                          key={p.id}
                          type='button'
                          onClick={() => setPaperSize(p.id)}
                          className={`cursor-pointer rounded-lg border p-3 text-left transition-all ${
                            isSelected
                              ? 'border-[#111111] bg-[#F7F6F3] text-[#111111] ring-1 ring-[#111111] dark:border-white dark:bg-[#1E1E1E] dark:text-white dark:ring-white'
                              : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                          }`}
                        >
                          <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold'>{p.label}</span>
                            <span className='font-mono text-[10px] font-bold opacity-90'>
                              {p.subLabel}
                            </span>
                          </div>
                          <p className='mt-1 text-[10px] leading-snug opacity-75'>{p.desc}</p>
                          <div className='mt-2 border-t border-black/5 pt-1.5 font-mono text-[10px] font-medium dark:border-white/10'>
                            Tinggi Stiker: ~
                            {((p.heightMm - marginAtas - marginBawah) / 10).toFixed(1)} cm
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </section>

                {/* Kolom Stiker */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                    Jumlah Kolom di Lembar {paperSize} ({paperWidthMm} mm)
                  </h2>
                  <div className='grid grid-cols-2 gap-2'>
                    <button
                      type='button'
                      onClick={() => setKolom(2)}
                      className={`cursor-pointer rounded border p-2 text-center text-xs font-semibold ${
                        kolom === 2
                          ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                          : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                      }`}
                    >
                      <div className='font-bold'>2 Kolom</div>
                      <div className='font-mono text-[10px] opacity-80'>
                        Lebar ~{stickerWidthMm.toFixed(1)} mm
                      </div>
                    </button>
                    <button
                      type='button'
                      onClick={() => setKolom(3)}
                      className={`cursor-pointer rounded border p-2 text-center text-xs font-semibold ${
                        kolom === 3
                          ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                          : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                      }`}
                    >
                      <div className='font-bold'>3 Kolom</div>
                      <div className='font-mono text-[10px] opacity-80'>
                        Lebar ~{stickerWidthMm.toFixed(1)} mm
                      </div>
                    </button>
                  </div>
                </section>

                {/* Presisi Margin Lembar */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                    Margin Kertas &amp; Celah Potong ({paperSize})
                  </h2>
                  <div className='grid grid-cols-2 gap-2.5 text-xs'>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Margin Atas (mm)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        value={marginAtas}
                        onChange={(e) => setMarginAtas(Number(e.target.value))}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Margin Bawah (mm)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        value={marginBawah}
                        onChange={(e) => setMarginBawah(Number(e.target.value))}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Margin Kiri (mm)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        value={marginKiri}
                        onChange={(e) => setMarginKiri(Number(e.target.value))}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div>
                      <label className='block text-[#787774] dark:text-[#888888]'>
                        Margin Kanan (mm)
                      </label>
                      <input
                        type='number'
                        step='0.5'
                        value={marginKanan}
                        onChange={(e) => setMarginKanan(Number(e.target.value))}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 font-mono text-xs font-bold dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      />
                    </div>
                    <div className='col-span-2 border-t border-[#EAEAEA] pt-1 dark:border-[#262626]'>
                      <div className='mb-1 flex items-center justify-between'>
                        <label className='font-semibold text-[#111111] dark:text-white'>
                          Gap Celah Antar Stiker (mm):
                        </label>
                        <span className='font-mono text-xs font-bold'>{gapAntarStiker} mm</span>
                      </div>
                      <div className='flex gap-1.5'>
                        {[
                          { label: '0 mm (Rapat Full)', val: 0 },
                          { label: '5 mm (0.5 cm)', val: 5 },
                          { label: '10 mm (1.0 cm)', val: 10 }
                        ].map((g) => (
                          <button
                            key={g.val}
                            type='button'
                            onClick={() => setGapAntarStiker(g.val)}
                            className={`flex-1 cursor-pointer rounded border py-1 font-mono text-[11px] ${
                              gapAntarStiker === g.val
                                ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                            }`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>

                      {/* Panduan Garis Potong & Ikon Gunting */}
                      {gapAntarStiker > 0 && (
                        <div className='mt-2.5 space-y-1.5 rounded border border-[#EAEAEA] bg-[#FBFBFA] p-2.5 dark:border-[#262626] dark:bg-[#141414]'>
                          <label className='block text-[11px] font-bold text-[#111111] dark:text-white'>
                            Tanda Potong Celah (Garis &amp; Gunting):
                          </label>
                          <div className='grid grid-cols-3 gap-1'>
                            <button
                              type='button'
                              onClick={() => {
                                setShowGarisPotong(true)
                                setShowIkonGunting(true)
                              }}
                              className={`cursor-pointer rounded border p-1.5 text-center font-mono text-[10px] ${
                                showGarisPotong && showIkonGunting
                                  ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                  : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                              }`}
                            >
                              <div className='font-bold'>✂️ Garis + Gunting</div>
                              <div className='text-[9px] opacity-75'>Garis &amp; ✂</div>
                            </button>
                            <button
                              type='button'
                              onClick={() => {
                                setShowGarisPotong(true)
                                setShowIkonGunting(false)
                              }}
                              className={`cursor-pointer rounded border p-1.5 text-center font-mono text-[10px] ${
                                showGarisPotong && !showIkonGunting
                                  ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                  : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                              }`}
                            >
                              <div className='font-bold'>➖ Hanya Garis</div>
                              <div className='text-[9px] opacity-75'>Tanpa ✂</div>
                            </button>
                            <button
                              type='button'
                              onClick={() => {
                                setShowGarisPotong(false)
                                setShowIkonGunting(false)
                              }}
                              className={`cursor-pointer rounded border p-1.5 text-center font-mono text-[10px] ${
                                !showGarisPotong
                                  ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                                  : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                              }`}
                            >
                              <div className='font-bold'>🚫 Polos / Sembunyi</div>
                              <div className='text-[9px] opacity-75'>Tanpa tanda</div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Gaya Tepi & Skala Kepadatan */}
                <section className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 dark:border-[#262626] dark:bg-[#181818]'>
                  <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-[#EAEAEA]'>
                    Opsi Format Cetak
                  </h2>
                  <div className='grid grid-cols-2 gap-2 text-xs'>
                    <div>
                      <label className='mb-0.5 block text-[#787774] dark:text-[#888888]'>
                        Mode Warna:
                      </label>
                      <select
                        value={colorMode}
                        onChange={(e) => setColorMode(e.target.value)}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      >
                        <option value='color'>Full Color (Standar)</option>
                        <option value='bw'>Monokrom (Hitam Putih)</option>
                      </select>
                    </div>
                    <div>
                      <label className='mb-0.5 block text-[#787774] dark:text-[#888888]'>
                        Border Kartu Stiker:
                      </label>
                      <select
                        value={borderStyle}
                        onChange={(e) => setBorderStyle(e.target.value)}
                        className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] px-2 py-1 text-xs text-[#111111] dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-white'
                      >
                        <option value='none'>Tanpa Garis Luar (Polos)</option>
                        <option value='border-subtle'>Garis Tipis Abu-Abu</option>
                        <option value='border-black'>Garis Hitam Tegas</option>
                        <option value='border-green'>Garis Hijau SPPG</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB 4: PANDUAN MICROSOFT WORD
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 'word-guide' && (
              <div className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 text-xs dark:border-[#262626] dark:bg-[#181818]'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-bold text-[#111111] dark:text-white'>
                    Panduan Pasang Stiker di Microsoft Word
                  </div>
                  <span className='rounded bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'>
                    Ukuran Aktif: {paperSize} ({paperWidthMm}×{paperHeightMm} mm)
                  </span>
                </div>

                <div className='space-y-1 rounded border border-[#EAEAEA] bg-[#F7F6F3] p-3 dark:border-[#262626] dark:bg-[#141414]'>
                  <div className='font-bold text-[#111111] dark:text-white'>
                    1. Atur Ukuran Kertas {paperSize} di Word
                  </div>
                  <p className='leading-relaxed text-[#787774] dark:text-[#888888]'>
                    Buka Word &gt; <strong>Layout</strong> &gt; <strong>Size</strong> &gt;{' '}
                    {paperSize === 'A4' ? (
                      <>
                        Pilih <strong>A4</strong> (atau <strong>More Paper Sizes</strong>: Width:{' '}
                        <strong>21.0 cm</strong>, Height: <strong>29.7 cm</strong>).
                      </>
                    ) : (
                      <>
                        <strong>More Paper Sizes</strong>. Masukkan Width: <strong>21.0 cm</strong>,
                        Height: <strong>33.0 cm</strong> (F4/Folio).
                      </>
                    )}
                    {' '}Set Margin: Atas <strong>{(marginAtas / 10).toFixed(1)} cm</strong>, Bawah{' '}
                    <strong>{(marginBawah / 10).toFixed(1)} cm</strong>, Kiri{' '}
                    <strong>{(marginKiri / 10).toFixed(1)} cm</strong>, Kanan{' '}
                    <strong>{(marginKanan / 10).toFixed(1)} cm</strong>.
                  </p>
                </div>

                <div className='space-y-1 rounded border border-[#EAEAEA] bg-[#F7F6F3] p-3 dark:border-[#262626] dark:bg-[#141414]'>
                  <div className='font-bold text-[#111111] dark:text-white'>
                    2. Salin &amp; Tempel Gambar
                  </div>
                  <p className='leading-relaxed text-[#787774] dark:text-[#888888]'>
                    Klik tombol <strong>"Salin (Word)"</strong> di atas, lalu tekan{' '}
                    <strong>CTRL + V</strong> di Word. Atau klik <strong>"Unduh 1 PNG"</strong> &gt;
                    Insert Picture.
                  </p>
                </div>

                <div className='space-y-1 rounded border border-[#EAEAEA] bg-[#F7F6F3] p-3 dark:border-[#262626] dark:bg-[#141414]'>
                  <div className='font-bold text-[#111111] dark:text-white'>
                    3. Atur Ukuran Presisi Gambar
                  </div>
                  <p className='leading-relaxed text-[#787774] dark:text-[#888888]'>
                    Klik kanan gambar &gt; <strong>Wrap Text</strong> &gt;{' '}
                    <strong>In Front of Text</strong>. Di tab Picture Format, atur Tinggi:{' '}
                    <strong>{(stickerHeightMm / 10).toFixed(1)} cm</strong> dan Lebar:{' '}
                    <strong>{(stickerWidthMm / 10).toFixed(1)} cm</strong>. Copy paste stiker sesuai
                    jumlah {kolom} kolom.
                  </p>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                TAB 5: BACKUP & EDIT JSON
            ══════════════════════════════════════════════════════════════ */}
            {activeTab === 'json-backup' && (
              <div className='space-y-4'>
                {/* LocalStorage Browser Section */}
                <div className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 text-xs dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='flex items-center gap-1.5 font-bold text-[#111111] dark:text-white'>
                        <span>💾 Penyimpanan Browser (LocalStorage)</span>
                        {lastSavedTime && (
                          <span className='rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'>
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className='mt-0.5 text-[11px] text-[#787774] dark:text-[#888888]'>
                        Desain otomatis tersimpan di peramban (browser) ini sehingga tidak hilang
                        saat halaman dimuat ulang.
                      </p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <button
                      type='button'
                      onClick={handleManualSaveStorage}
                      className='flex cursor-pointer items-center justify-center gap-1.5 rounded border border-[#111111] bg-[#111111] py-1.5 text-xs font-semibold text-white transition-transform hover:bg-[#262626] active:scale-[0.98] dark:border-white dark:bg-white dark:text-[#111111]'
                    >
                      <span>Simpan ke Browser</span>
                    </button>
                    <button
                      type='button'
                      onClick={handleClearLocalStorage}
                      className='flex cursor-pointer items-center justify-center gap-1.5 rounded border border-rose-200 bg-rose-50 py-1.5 text-xs font-semibold text-rose-700 transition-transform hover:bg-rose-100 active:scale-[0.98] dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300'
                    >
                      <span>Hapus Penyimpanan</span>
                    </button>
                  </div>
                </div>

                {/* JSON File Backup & Editor Section */}
                <div className='space-y-3 rounded-lg border border-[#EAEAEA] bg-white p-4 text-xs dark:border-[#262626] dark:bg-[#181818]'>
                  <div className='flex items-center justify-between'>
                    <div className='font-bold text-[#111111] dark:text-white'>
                      Konfigurasi JSON (File / Teks)
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <button
                        type='button'
                        onClick={() => {
                          setRawJsonText(JSON.stringify(getCurrentFullConfig(), null, 2))
                          notify('Teks JSON dimuat ulang')
                        }}
                        className='cursor-pointer rounded border border-[#EAEAEA] bg-[#F7F6F3] px-2 py-0.5 font-mono text-[10px] text-[#787774] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                      >
                        Reload
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(
                              rawJsonText || JSON.stringify(getCurrentFullConfig(), null, 2)
                            )
                            notify('Teks JSON disalin')
                          }
                        }}
                        className='cursor-pointer rounded border border-[#EAEAEA] bg-[#F7F6F3] px-2 py-0.5 font-mono text-[10px] text-[#787774] hover:text-[#111111] dark:border-[#2E2E2E] dark:bg-[#141414] dark:text-[#888888]'
                      >
                        Salin
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={12}
                    value={rawJsonText}
                    onChange={(e) => setRawJsonText(e.target.value)}
                    placeholder='Paste JSON config...'
                    className='w-full rounded border border-[#EAEAEA] bg-[#FBFBFA] p-2.5 font-mono text-[11px] leading-relaxed text-[#111111] focus:border-neutral-900 focus:outline-hidden dark:border-[#2E2E2E] dark:bg-[#121212] dark:text-[#38ef7d]'
                    spellCheck={false}
                  />

                  <div className='flex flex-col gap-2'>
                    <button
                      type='button'
                      onClick={handleApplyRawJson}
                      className='w-full cursor-pointer rounded-md bg-[#111111] py-2 text-xs font-semibold text-white transition-transform hover:bg-[#262626] active:scale-[0.98] dark:bg-[#EAEAEA] dark:text-[#111111] dark:hover:bg-white'
                    >
                      Terapkan Perubahan JSON
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        if (
                          window.confirm(
                            'Kembalikan seluruh isi dan ukuran ke setelan bawaan standar BGN?'
                          )
                        ) {
                          setCfg(DEFAULT_CONFIG)
                          setPaperSize(DEFAULT_LAYOUT.paperSize)
                          setKolom(DEFAULT_LAYOUT.kolom)
                          setMarginAtas(DEFAULT_LAYOUT.marginAtas)
                          setMarginBawah(DEFAULT_LAYOUT.marginBawah)
                          setMarginKiri(DEFAULT_LAYOUT.marginKiri)
                          setMarginKanan(DEFAULT_LAYOUT.marginKanan)
                          setGapAntarStiker(DEFAULT_LAYOUT.gapAntarStiker)
                          setPaddingStiker(DEFAULT_LAYOUT.paddingStiker)
                          setBorderStyle(DEFAULT_LAYOUT.borderStyle)
                          setSusunanGizi(DEFAULT_LAYOUT.susunanGizi)
                          setScaleFont(DEFAULT_LAYOUT.scaleFont)
                          setColorMode(DEFAULT_LAYOUT.colorMode)
                          setShowGarisPotong(DEFAULT_LAYOUT.showGarisPotong)
                          setShowIkonGunting(DEFAULT_LAYOUT.showIkonGunting)
                          setRawJsonText(
                            JSON.stringify(
                              {
                                _meta: {
                                  app: 'StikerLabelBGN',
                                  version: '2.0',
                                  exportedAt: new Date().toISOString()
                                },
                                cfg: DEFAULT_CONFIG,
                                layout: DEFAULT_LAYOUT
                              },
                              null,
                              2
                            )
                          )
                          notify('Desain dikembalikan ke standar awal BGN')
                        }
                      }}
                      className='cursor-pointer py-1 text-center text-[11px] text-[#787774] hover:text-rose-600 dark:text-[#888888] dark:hover:text-rose-400'
                    >
                      Reset ke Standar Awal BGN
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT PANEL: INTERACTIVE LIVE PREVIEW ── */}
          <section
            aria-label={`Preview Lembar ${paperSize}`}
            className='flex flex-col gap-2 lg:sticky lg:top-4'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
                <h2 className='text-xs font-bold tracking-wider text-[#111111] uppercase dark:text-white'>
                  Live Preview {paperSize} ({paperWidthMm} × {paperHeightMm} mm)
                </h2>
              </div>

              {/* Zoom Controls */}
              <div className='flex items-center gap-1 text-xs'>
                {[0.38, 0.42, 0.5, 0.6].map((z) => (
                  <button
                    key={z}
                    type='button'
                    onClick={() => setZoomPreview(z)}
                    className={`cursor-pointer rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                      zoomPreview === z
                        ? 'border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-[#111111]'
                        : 'border-[#EAEAEA] bg-white text-[#787774] hover:bg-[#F7F6F3] dark:border-[#2E2E2E] dark:bg-[#181818] dark:text-[#888888]'
                    }`}
                  >
                    {Math.round(z * 100)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Sheet Container */}
            <div className='flex max-h-[82vh] justify-center overflow-auto rounded-lg border border-[#EAEAEA] bg-[#EFEFEF] p-4 dark:border-[#262626] dark:bg-[#161616]'>
              <div
                style={{
                  width: `${paperWidthMm}mm`,
                  height: `${paperHeightMm}mm`,
                  transform: `scale(${zoomPreview})`,
                  transformOrigin: 'top center',
                  background: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  marginBottom: `-${paperHeightMm * (1 - zoomPreview)}mm`,
                  paddingLeft: `${marginKiri}mm`,
                  paddingRight: `${marginKanan}mm`,
                  paddingTop: `${marginAtas}mm`,
                  paddingBottom: `${marginBawah}mm`,
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                {/* Visual Guides: Margins */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `${marginKiri}mm`,
                    background: 'rgba(239, 68, 68, 0.04)',
                    borderRight: '1px dashed rgba(239, 68, 68, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                  title='Margin Kiri Printer'
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: `${marginKanan}mm`,
                    background: 'rgba(239, 68, 68, 0.04)',
                    borderLeft: '1px dashed rgba(239, 68, 68, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                  title='Margin Kanan Printer'
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${marginAtas}mm`,
                    background: 'rgba(59, 130, 246, 0.04)',
                    borderBottom: '1px dashed rgba(59, 130, 246, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                  title='Margin Atas'
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${marginBawah}mm`,
                    background: 'rgba(59, 130, 246, 0.04)',
                    borderTop: '1px dashed rgba(59, 130, 246, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                  title='Margin Bawah'
                />

                {/* Stiker Cards */}
                {renderSheetContent()}
              </div>
            </div>

            {/* Footer Metrics */}
            <div className='flex items-center justify-between px-1 font-mono text-[11px] text-[#787774] dark:text-[#888888]'>
              <span>
                1 Stiker: {(stickerWidthMm / 10).toFixed(1)} × {(stickerHeightMm / 10).toFixed(1)}{' '}
                cm
              </span>
              <span>
                Gap: {(gapAntarStiker / 10).toFixed(1)} cm
                {gapAntarStiker > 0 && showGarisPotong && showIkonGunting
                  ? ' (Garis Potong ✂)'
                  : ''}
                {gapAntarStiker > 0 && showGarisPotong && !showIkonGunting ? ' (Garis Potong)' : ''}
                {gapAntarStiker > 0 && !showGarisPotong ? ' (Polos)' : ''}
                {gapAntarStiker === 0 ? ' (Rapat)' : ''}
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* ─── PRINT BROWSER ROOT ELEMENT (@media print) ─── */}
      <div
        id='stiker-print-root'
        style={{
          display: 'none',
          width: `${paperWidthMm}mm`,
          height: `${paperHeightMm}mm`,
          boxSizing: 'border-box',
          position: 'relative',
          background: '#ffffff',
          overflow: 'hidden',
          paddingLeft: `${marginKiri}mm`,
          paddingRight: `${marginKanan}mm`,
          paddingTop: `${marginAtas}mm`,
          paddingBottom: `${marginBawah}mm`
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box'
          }}
        >
          {renderSheetContent()}
        </div>
      </div>

      {/* ─── OFF-SCREEN 1:1 HD EXPORT RENDER TARGETS ─── */}
      <div
        style={{
          position: 'fixed',
          left: '-99999px',
          top: 0,
          pointerEvents: 'none',
          visibility: 'visible',
          zIndex: -100
        }}
        aria-hidden='true'
      >
        {/* Single Sticker Export */}
        <div
          id='export-single-stiker'
          style={{
            width: `${stickerWidthMm}mm`,
            height: `${stickerHeightMm}mm`,
            boxSizing: 'border-box',
            padding: `${paddingStiker}mm`,
            border: cardBorder,
            borderRadius: borderStyle === 'none' ? '0' : '4px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {renderStikerContent()}
        </div>

        {/* Full Sheet Export (F4 / A4) */}
        <div
          id='export-full-sheet'
          style={{
            width: `${paperWidthMm}mm`,
            height: `${paperHeightMm}mm`,
            boxSizing: 'border-box',
            background: '#ffffff',
            overflow: 'hidden',
            paddingLeft: `${marginKiri}mm`,
            paddingRight: `${marginKanan}mm`,
            paddingTop: `${marginAtas}mm`,
            paddingBottom: `${marginBawah}mm`,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {renderSheetContent()}
        </div>
      </div>
    </main>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import StikerLabel, { GIZI_CATEGORIES } from '../components/StikerLabel'

// ─── Default Data Spesifik Pengguna ───────────────────────────────────────────
const DEFAULT_CONFIG = {
  // 1. Judul Atas
  showJudul: true,
  judul: 'LABEL MAKANAN',
  judulArch: true, // Teks melengkung di atas logo
  archCurvature: 55, // Derajat kelengkungan busur lingkaran sejati (6 - 75)
  logoOffsetPt: 14, // Offset jarak vertikal logo ke judul (pt)
  
  // 2. Logo BGN
  showLogo: true,
  logoUrl: '/img/logo-bgn.png',
  
  // 3. Nama Dapur & Yayasan
  showDapur: true,
  namaDapur: 'SPPG GROBOGAN GROBOGAN PURWODADI',
  showMitra: true,
  namaMitra: 'YAYASAN LEMAN GRIMAH LOHJINAWI',
  
  // 4. Menu Makanan (Textarea per baris)
  showMenu: true,
  judulMenu: 'MENU',
  menuText: 'Nasi Putih\nAyam Goreng Mentega\nTumis Gambas Wortel\nSemur Tahu\nKelengkeng',
  
  // 5. Analisis Nilai Gizi
  showGizi: true,
  judulGizi: 'ANALISIS KANDUNGAN GIZI',
  giziActiveCategories: {
    besar: true,
    kecil: true,
    balita: false,
    ibuHamil: false,
    ibuMenyusui: false,
  },
  giziBesar: {
    energi: '396,45',
    protein: '14,64',
    lemak: '20,27',
    karbohidrat: '41,02',
    serat: '1,5',
  },
  giziKecil: {
    energi: '388,17',
    protein: '14,56',
    lemak: '20,25',
    karbohidrat: '38,86',
    serat: '1,39',
  },
  giziBalita: {
    energi: '350,00',
    protein: '12,00',
    lemak: '15,00',
    karbohidrat: '35,00',
    serat: '1,20',
  },
  giziIbuHamil: {
    energi: '450,00',
    protein: '18,00',
    lemak: '22,00',
    karbohidrat: '48,00',
    serat: '2,00',
  },
  giziIbuMenyusui: {
    energi: '480,00',
    protein: '20,00',
    lemak: '24,00',
    karbohidrat: '50,00',
    serat: '2,20',
  },
  
  // 6. Batas Waktu Konsumsi
  showBatasAman: true,
  judulBatasAman: 'HARUS DIKONSUMSI\nSEBELUM PUKUL',
  durasiBatas: '08:00 WIB',
  showTanggalBatas: true,
  tanggalBatas: '09/09/2026',
  showSubteksBatas: false,
  subteksBatas: 'Setelah makanan diterima untuk menjaga kualitas dan keamanan makanan',
  
  // 7. Badge Petunjuk Konsumsi & Larangan Bawa Pulang
  showBadges: true,
  badgeLayout: 'stacked', // 'sideBySide' (kiri-kanan) atau 'stacked' (atas-bawah)
  badgeBorder: false,
  showBadgeSegera: true,
  judulBadgeSegera: 'SEGERA KONSUMSI',
  subBadgeSegera: 'SETELAH DITERIMA',
  showBadgeLarangan: true,
  iconLaranganUrl: '/img/larangan_dibawa_pulang.png',
  judulBadgeLarangan: 'TIDAK BOLEH',
  subBadgeLarangan: 'DIBAWA PULANG',

  // Peringatan Bar Teks Tambahan (Opsional)
  showPeringatan: false,
  teksPeringatan: 'DILARANG MEMBAWA PULANG MAKANAN',
  
  // 8. Footer Media Sosial
  showSosmed: true,
  igHandle: '@sppgdefault',
  fbHandle: '@sppgdefault',
  tiktokHandle: '@sppgdefault',
  
  // 9. Edukasi: Kenapa Harus Tepat Waktu? (Opsional)
  showEdukasi: false,
  judulEdukasi: 'Kenapa Harus Tepat Waktu?',
  edukasiItem1: 'MENJAGA MUTU MAKANAN',
  edukasiIcon1: '⏱️',
  edukasiItem2: 'MENGURANGI RESIKO KONTAMINASI',
  edukasiIcon2: '🛑',
  edukasiItem3: 'MENJAGA MAKANAN AMAN DI KONSUMSI PENERIMA MANFAAT',
  edukasiIcon3: '🍽️',

  // 10. Pengaturan Font & Ukuran Teks (pt)
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  giziIconType: 'emoji', // 'emoji', 'bullet', 'none'
  tableRadius: 4, // Kelengkungan sudut kotak tabel menu & gizi (px)
  logoSizeMm: 50, // 5 cm x 5 cm
  showPattern: true, // Pita Ornamen Dekorasi BGN (PATTERN4)
  patternType: 'color', // 'color' (PATTERN4) atau 'white' (PATTERN4_WHITE)
  patternUrl: '/img/pattern4.png',
  patternPos: 'both', // 'both', 'top', 'bottom', 'none'
  patternHeightMm: 7.5, // Tinggi pita dekorasi (mm)
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
    edukasi: 7,
  },
}

const DEFAULT_LAYOUT = {
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
}

const FONT_OPTIONS = [
  { label: 'System UI (Standar Modern)', value: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { label: 'Arial (Standar Cetak Kantor)', value: "Arial, Helvetica, sans-serif" },
  { label: 'Segoe UI (Windows Clean)', value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  { label: 'Roboto (Google Clean)', value: "Roboto, 'Segoe UI', sans-serif" },
  { label: 'Montserrat (Modern Bold)', value: "Montserrat, sans-serif" },
  { label: 'Poppins (Bulat Modern)', value: "Poppins, sans-serif" },
  { label: 'Trebuchet MS (Tegas & Jelas)', value: "'Trebuchet MS', 'Lucida Sans Unicode', sans-serif" },
  { label: 'Tahoma (Kompak & Rapi)', value: "Tahoma, Verdana, sans-serif" },
  { label: 'Times New Roman (Klasik Formal)', value: "'Times New Roman', Times, serif" },
  { label: 'Georgia (Serif Elegan)', value: "Georgia, serif" },
  { label: 'Impact (Ekstra Tebal)', value: "Impact, Charcoal, sans-serif" },
]

// Dynamic loader untuk html-to-image
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

export default function StikerMakanPage() {
  const [cfg, setCfg] = useState(DEFAULT_CONFIG)
  
  // Layout & Margin Kertas F4 (210 x 330 mm)
  const [kolom, setKolom] = useState(DEFAULT_LAYOUT.kolom) // 2 atau 3 kolom
  const [marginAtas, setMarginAtas] = useState(DEFAULT_LAYOUT.marginAtas) // 0.5 cm
  const [marginBawah, setMarginBawah] = useState(DEFAULT_LAYOUT.marginBawah) // 0.5 cm
  const [marginKiri, setMarginKiri] = useState(DEFAULT_LAYOUT.marginKiri) // 0.5 cm
  const [marginKanan, setMarginKanan] = useState(DEFAULT_LAYOUT.marginKanan) // 0.5 cm
  const [gapAntarStiker, setGapAntarStiker] = useState(DEFAULT_LAYOUT.gapAntarStiker) // 1.0 cm gap
  const [paddingStiker, setPaddingStiker] = useState(DEFAULT_LAYOUT.paddingStiker) // padding dalam stiker (mm)
  
  // Opsi Tampilan
  const [borderStyle, setBorderStyle] = useState(DEFAULT_LAYOUT.borderStyle) // 'none', 'border-subtle', 'border-green'
  const [susunanGizi, setSusunanGizi] = useState(DEFAULT_LAYOUT.susunanGizi) // 'stacked' atau 'sideBySide'
  const [scaleFont, setScaleFont] = useState(DEFAULT_LAYOUT.scaleFont) // 'compact', 'normal', 'spacious'
  const [colorMode, setColorMode] = useState(DEFAULT_LAYOUT.colorMode)
  const [showGarisPotong, setShowGarisPotong] = useState(DEFAULT_LAYOUT.showGarisPotong)
  const [zoomPreview, setZoomPreview] = useState(0.45)
  
  // Status Export
  const [isExporting, setIsExporting] = useState(false)
  const [exportMsg, setExportMsg] = useState('')
  const [activeTab, setActiveTab] = useState('konten') // 'konten', 'font', 'layout', 'word-guide', 'json-backup'
  const fileInputRef = useRef(null)
  const jsonInputRef = useRef(null)
  const [rawJsonText, setRawJsonText] = useState('')

  // Ukuran Fisik F4 (mm)
  const paperWidthMm = 210
  const paperHeightMm = 330

  // Perhitungan Ukuran Stiker
  const totalGapWidthMm = Math.max(0, (kolom - 1) * gapAntarStiker)
  const printableWidthMm = Math.max(10, paperWidthMm - marginKiri - marginKanan)
  const stickerWidthMm = Math.max(10, (printableWidthMm - totalGapWidthMm) / kolom)
  const stickerHeightMm = Math.max(10, paperHeightMm - marginAtas - marginBawah)

  // Parsing baris menu
  const menuList = (cfg.menuText || '')
    .split('\n')
    .map((s) => s.trim().replace(/^[•*\-]\s*/, ''))
    .filter(Boolean)

  let cardBorder = 'none'
  if (borderStyle === 'border-subtle') cardBorder = '1px solid #cbd5e1'
  if (borderStyle === 'border-black') cardBorder = '1.2px solid #000000'
  if (borderStyle === 'border-green') cardBorder = '1.2px solid #16a34a'

  // Pengali Skala Font
  let fontMultiplier = 1
  if (scaleFont === 'compact') fontMultiplier = 0.88
  if (scaleFont === 'spacious') fontMultiplier = 1.08

  // Helper Full Config Object
  const getCurrentFullConfig = () => ({
    _meta: {
      app: 'StikerLabelBGN',
      version: '2.0',
      exportedAt: new Date().toISOString(),
    },
    cfg,
    layout: {
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
    },
  })

  // Handle Logo Upload
  const handleUploadLogo = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setCfg((prev) => ({ ...prev, logoUrl: ev.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // ─── Export / Import Config JSON ──────────────────────────────────────────
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

      setExportMsg('💾 File config JSON berhasil diunduh! Anda bisa mengeditnya dan membagikannya ke saya.')
      setTimeout(() => setExportMsg(''), 4500)
    } catch (err) {
      console.error(err)
      setExportMsg('❌ Gagal unduh JSON: ' + err.message)
    }
  }

  const handleApplyConfigObject = (parsed) => {
    if (parsed.cfg) {
      setCfg((prev) => ({ ...prev, ...parsed.cfg }))
      if (parsed.layout) {
        if (parsed.layout.kolom !== undefined) setKolom(parsed.layout.kolom)
        if (parsed.layout.marginAtas !== undefined) setMarginAtas(parsed.layout.marginAtas)
        if (parsed.layout.marginBawah !== undefined) setMarginBawah(parsed.layout.marginBawah)
        if (parsed.layout.marginKiri !== undefined) setMarginKiri(parsed.layout.marginKiri)
        if (parsed.layout.marginKanan !== undefined) setMarginKanan(parsed.layout.marginKanan)
        if (parsed.layout.gapAntarStiker !== undefined) setGapAntarStiker(parsed.layout.gapAntarStiker)
        if (parsed.layout.paddingStiker !== undefined) setPaddingStiker(parsed.layout.paddingStiker)
        if (parsed.layout.borderStyle !== undefined) setBorderStyle(parsed.layout.borderStyle)
        if (parsed.layout.susunanGizi !== undefined) setSusunanGizi(parsed.layout.susunanGizi)
        if (parsed.layout.scaleFont !== undefined) setScaleFont(parsed.layout.scaleFont)
        if (parsed.layout.colorMode !== undefined) setColorMode(parsed.layout.colorMode)
        if (parsed.layout.showGarisPotong !== undefined) setShowGarisPotong(parsed.layout.showGarisPotong)
      }
    } else {
      // Direct config format
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
        setExportMsg('✅ Config JSON berhasil dimuat & diterapkan ke stiker!')
        setTimeout(() => setExportMsg(''), 4500)
      } catch (err) {
        console.error(err)
        setExportMsg('❌ Format file JSON tidak valid: ' + err.message)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleApplyRawJson = () => {
    try {
      if (!rawJsonText.trim()) throw new Error('Teks JSON tidak boleh kosong')
      const parsed = JSON.parse(rawJsonText)
      handleApplyConfigObject(parsed)
      setExportMsg('✅ Teks JSON berhasil diterapkan ke seluruh stiker!')
      setTimeout(() => setExportMsg(''), 4500)
    } catch (err) {
      setExportMsg('❌ Gagal menerapkan JSON: ' + err.message)
    }
  }

  // ─── Export Handlers (Ultra-High Resolution ~400 DPI) ────────────────────────
  const handleDownloadSinglePng = async () => {
    try {
      setIsExporting(true)
      setExportMsg('⏳ Merender 1 stiker resolusi sangat tinggi (400 DPI)...')
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-single-stiker')
      if (!el) throw new Error('Elemen export tidak ditemukan')

      const dataUrl = await htmlToImage.toPng(el, {
        quality: 1.0,
        pixelRatio: 4.0,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = `Stiker_MBG_${(cfg.namaDapur || 'DAPUR').replace(/[^a-zA-Z0-9]/g, '_')}.png`
      link.href = dataUrl
      link.click()

      setExportMsg('✅ 1 Stiker PNG resolusi tinggi siap dicetak / dimasukkan ke Ms Word!')
      setTimeout(() => setExportMsg(''), 4500)
    } catch (err) {
      console.error(err)
      setExportMsg('❌ Error: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopySinglePng = async () => {
    try {
      setIsExporting(true)
      setExportMsg('⏳ Menyalin gambar stiker resolusi tinggi ke clipboard...')
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-single-stiker')
      if (!el) throw new Error('Elemen export tidak ditemukan')

      const blob = await htmlToImage.toBlob(el, {
        quality: 1.0,
        pixelRatio: 3.5,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setExportMsg('📋 Gambar stiker HD berhasil disalin! Langsung buka Word dan tekan CTRL + V.')
      } else {
        throw new Error('Clipboard API tidak didukung di browser ini.')
      }
      setTimeout(() => setExportMsg(''), 4500)
    } catch (err) {
      console.error(err)
      setExportMsg('❌ Gagal salin: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDownloadFullSheetPng = async () => {
    try {
      setIsExporting(true)
      setExportMsg('⏳ Merender lembar F4 utuh resolusi tinggi (400 DPI)...')
      const htmlToImage = await loadHtmlToImage()
      const el = document.getElementById('export-full-sheet')
      if (!el) throw new Error('Elemen lembar F4 tidak ditemukan')

      const dataUrl = await htmlToImage.toPng(el, {
        quality: 1.0,
        pixelRatio: 3.5,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = `Lembar_F4_${kolom}Stiker_MBG.png`
      link.href = dataUrl
      link.click()

      setExportMsg('✅ Lembar F4 utuh resolusi tinggi berhasil diunduh!')
      setTimeout(() => setExportMsg(''), 4500)
    } catch (err) {
      console.error(err)
      setExportMsg('❌ Error: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  // ─── RENDER KOMPONEN STIKER SATU PER SATU ──────────────────────────────────
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

  // Render 1 Stiker Card Box
  const renderStikerCard = (idx) => {
    // Posisi fisik X awal kartu dari tepi kiri kertas F4
    const cardPhysicalX = marginKiri + idx * (stickerWidthMm + gapAntarStiker)

    // Perpanjang ke pojok paling kiri lembar kertas jika kolom 0
    const extendLeftMm = idx === 0 ? marginKiri : 0
    // Perpanjang ke gap kanan, atau ke pojok paling kanan lembar kertas jika kolom terakhir
    const extendRightMm = idx < kolom - 1 ? gapAntarStiker : marginKanan
    // Offset background dari titik awal fisik (X=0) pita
    const sheetOffsetX = idx === 0 ? 0 : cardPhysicalX

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
          borderRadius: borderStyle === 'none' ? '0' : '5px',
          background: '#ffffff',
          overflow: 'visible',
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderStikerContent(sheetOffsetX, extendLeftMm, extendRightMm)}
      </article>
    )
  }

  // Render Celah Gap Antar Stiker (Garis Potong ✂️ di Tengah)
  const renderGapAntarStiker = (idx) => {
    if (!showGarisPotong && gapAntarStiker <= 0) return null
    return (
      <div
        key={`gap-${idx}`}
        aria-hidden="true"
        style={{
          width: `${gapAntarStiker}mm`,
          height: `${stickerHeightMm}mm`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          pointerEvents: 'none',
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
              borderLeft: '1px dashed #9ca3af',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          />
        )}
        {showGarisPotong && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '2mm',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '8pt',
                color: '#64748b',
                background: '#ffffff',
                lineHeight: 1,
                zIndex: 11,
              }}
            >
              ✂️
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '2mm',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '8pt',
                color: '#64748b',
                background: '#ffffff',
                lineHeight: 1,
                zIndex: 11,
              }}
            >
              ✂️
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
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* ─── PRINT CSS STYLES (STANDAR MODERN CETAK PRESISI F4) ─── */}
      <style>{`
        @page {
          size: 210mm 330mm portrait;
          margin: 0mm !important;
        }
        @page :first {
          margin: 0mm !important;
        }
        @page :left {
          margin: 0mm !important;
        }
        @page :right {
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
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            height: 330mm !important;
            min-height: 330mm !important;
            max-height: 330mm !important;
            overflow: hidden !important;
          }
          /* Sembunyikan elemen antarmuka website */
          .no-print-area, nav, footer, header, .navbar, .footer, .no-print,
          [class*="navbar"], [class*="footer"], .docusaurus-highlight-code-line, .theme-layout-navbar {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Tampilkan khusus kontainer cetak lembar F4 */
          #stiker-print-root {
            display: block !important;
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 330mm !important;
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

      {/* ─── INTERACTIVE EDITOR & CONTROLS (NO PRINT) ─── */}
      <div className="no-print-area mx-auto max-w-7xl px-4 py-6">
        
        {/* Header Bar */}
        <header className="mb-5 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                🏷️ Desain Label Stiker Makan (F4) — SPPG BGN
              </h1>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Pengaturan per komponen lengkap: Judul, Logo, Dapur, Mitra, Menu, Gizi, Batas Aman 2 Jam, dan Edukasi.
              </p>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadConfigJson}
                className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 active:scale-[0.98] transition-transform"
                title="Download seluruh konfigurasi stiker dalam format file .json untuk diedit / disimpan"
              >
                <span>💾 Unduh JSON</span>
              </button>

              <button
                type="button"
                onClick={() => jsonInputRef.current?.click()}
                className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 shadow-xs hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300 active:scale-[0.98] transition-transform"
                title="Buka file .json konfigurasi yang sudah diedit"
              >
                <span>📂 Impor JSON</span>
              </button>

              <input
                type="file"
                ref={jsonInputRef}
                accept=".json,application/json"
                onChange={handleImportConfigJson}
                style={{ display: 'none' }}
              />

              <button
                type="button"
                onClick={handleDownloadSinglePng}
                disabled={isExporting}
                className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 active:scale-[0.98] transition-transform"
                title="Download 1 strip gambar stiker resolusi tinggi untuk Word"
              >
                <span>🖼️ Unduh 1 Stiker PNG</span>
              </button>

              <button
                type="button"
                onClick={handleCopySinglePng}
                disabled={isExporting}
                className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transition-transform"
                title="Salin stiker ke clipboard, lalu paste (CTRL+V) langsung di Word"
              >
                <span>📋 Salin (CTRL+V di Word)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadFullSheetPng}
                disabled={isExporting}
                className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 active:scale-[0.98] transition-transform"
                title="Download 1 lembar F4 utuh resolusi tinggi berisi stiker berjajar"
              >
                <span>📄 Unduh Lembar F4 Utuh</span>
              </button>
            </div>
          </div>

          {exportMsg && (
            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-900 shadow-xs dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-200">
              {exportMsg}
            </div>
          )}
        </header>

        {/* Tab Navigasi Pengaturan */}
        <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('konten')}
            className={`border-b-2 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'konten'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            🧩 Konten Teks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('font')}
            className={`border-b-2 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'font'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            🔤 Font & Ukuran Teks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('layout')}
            className={`border-b-2 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'layout'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            📐 Margin Kertas & Gap
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('word-guide')}
            className={`border-b-2 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'word-guide'
                ? 'border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            💡 Cara Pakai di Ms Word
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('json-backup')
              setRawJsonText(JSON.stringify(getCurrentFullConfig(), null, 2))
            }}
            className={`border-b-2 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'json-backup'
                ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            💾 Backup / Edit JSON
          </button>
        </div>

        {/* Layout Grid: Editor Form (Kiri) & Preview F4 (Kanan) */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[430px_1fr] lg:items-start">
          
          {/* ── PANEL KIRI: TABS FORM ── */}
          <div className="flex flex-col gap-4">
            
            {/* TAB 1: PENGATURAN PER KOMPONEN */}
            {activeTab === 'konten' && (
              <div className="space-y-4">
                
                {/* 1. Judul & Logo */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      1. Judul Label & Logo
                    </span>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={cfg.showJudul}
                        onChange={(e) => setCfg({ ...cfg, showJudul: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showJudul && (
                    <div className="mt-2.5 space-y-2">
                      <input
                        type="text"
                        value={cfg.judul}
                        onChange={(e) => setCfg({ ...cfg, judul: e.target.value })}
                        placeholder="Judul Label (misal: LABEL MAKANAN)"
                        className="w-full rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <div className="space-y-2 pt-1">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={cfg.judulArch}
                            onChange={(e) => setCfg({ ...cfg, judulArch: e.target.checked })}
                            className="rounded accent-emerald-600"
                          />
                          <span>Teks Melengkung (Arched) di atas logo</span>
                        </label>

                        {cfg.judulArch && (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-2.5 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                              <span className="font-semibold">Tingkat Kelengkungan Busur:</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {cfg.archCurvature ?? 55}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="6"
                              max="75"
                              step="1"
                              value={cfg.archCurvature ?? 55}
                              onChange={(e) => setCfg({ ...cfg, archCurvature: Number(e.target.value) })}
                              className="w-full accent-emerald-600 cursor-pointer"
                            />
                            <div className="flex flex-wrap gap-1 text-xs">
                              {[
                                { label: 'Landai (18)', val: 18 },
                                { label: 'Sedang (35)', val: 35 },
                                { label: 'Standar (55)', val: 55 },
                                { label: 'Tinggi (65)', val: 65 },
                                { label: 'Ekstrem (75)', val: 75 },
                              ].map((p) => (
                                <button
                                  key={p.val}
                                  type="button"
                                  onClick={() => setCfg({ ...cfg, archCurvature: p.val })}
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer ${
                                    (cfg.archCurvature ?? 55) === p.val
                                      ? 'border-emerald-600 bg-emerald-600 text-white font-bold'
                                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>

                            {/* Slider Offset Jarak Vertikal Logo ke Judul */}
                            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 space-y-1">
                              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                                <span className="font-semibold">Jarak Vertikal Logo ke Judul:</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                  {(cfg.logoOffsetPt ?? 0) > 0 ? `+${cfg.logoOffsetPt} pt` : `${cfg.logoOffsetPt ?? 0} pt`}
                                </span>
                              </div>
                              <input
                                type="range"
                                min="-25"
                                max="20"
                                step="1"
                                value={cfg.logoOffsetPt ?? 0}
                                onChange={(e) => setCfg({ ...cfg, logoOffsetPt: Number(e.target.value) })}
                                className="w-full accent-emerald-600 cursor-pointer"
                              />
                              <div className="flex justify-between text-[10px] text-slate-500">
                                <span>Lebih Rapat (Ke Atas)</span>
                                <span>Bawaan (0)</span>
                                <span>Lebih Renggang (Ke Bawah)</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 border-t border-slate-100 pt-2 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={cfg.showLogo}
                          onChange={(e) => setCfg({ ...cfg, showLogo: e.target.checked })}
                          className="rounded accent-emerald-600"
                        />
                        <span>Logo BGN</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] font-semibold text-blue-600 underline hover:text-blue-700 cursor-pointer dark:text-blue-400"
                      >
                        📁 Upload Logo Lain
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleUploadLogo}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* 2. Dapur & Yayasan */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    2. Nama SPPG & Yayasan
                  </span>

                  {/* SPPG */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="cfg-dapur" className="font-semibold text-slate-700 dark:text-slate-300">
                        Nama SPPG
                      </label>
                      <label className="flex items-center gap-1 text-[11px] text-slate-500">
                        <input
                          type="checkbox"
                          checked={cfg.showDapur}
                          onChange={(e) => setCfg({ ...cfg, showDapur: e.target.checked })}
                          className="rounded accent-emerald-600"
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <input
                      id="cfg-dapur"
                      type="text"
                      value={cfg.namaDapur}
                      onChange={(e) => setCfg({ ...cfg, namaDapur: e.target.value })}
                      className="mt-1 w-full rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="SPPG GROBOGAN GROBOGAN PURWODADI"
                    />
                  </div>

                  {/* Yayasan */}
                  <div className="mt-3 border-t border-slate-100 pt-2.5 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="cfg-mitra" className="font-semibold text-slate-700 dark:text-slate-300">
                        Nama Yayasan / Mitra
                      </label>
                      <label className="flex items-center gap-1 text-[11px] text-slate-500">
                        <input
                          type="checkbox"
                          checked={cfg.showMitra}
                          onChange={(e) => setCfg({ ...cfg, showMitra: e.target.checked })}
                          className="rounded accent-emerald-600"
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <input
                      id="cfg-mitra"
                      type="text"
                      value={cfg.namaMitra}
                      onChange={(e) => setCfg({ ...cfg, namaMitra: e.target.value })}
                      className="mt-1 w-full rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="YAYASAN LEMAN GRIMAH LOHJINAWI"
                    />
                  </div>
                </div>

                {/* 3. Menu Makanan */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      3. Box Menu Makanan (Header Hitam)
                    </span>
                    <label className="flex items-center gap-1 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={cfg.showMenu}
                        onChange={(e) => setCfg({ ...cfg, showMenu: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>
                  {cfg.showMenu && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={cfg.judulMenu}
                        onChange={(e) => setCfg({ ...cfg, judulMenu: e.target.value })}
                        placeholder="Judul Box (misal: MENU)"
                        className="w-full rounded-md border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <textarea
                        rows={5}
                        value={cfg.menuText}
                        onChange={(e) => setCfg({ ...cfg, menuText: e.target.value })}
                        className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs leading-relaxed text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        placeholder="Ketik 1 menu per baris..."
                      />

                      {/* Rounded / Sudut Melengkung Tabel */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Sudut Melengkung Tabel (Menu &amp; Gizi):
                        </span>
                        <div className="flex items-center gap-1.5">
                          {[
                            { label: 'Siku (0)', val: 0 },
                            { label: '2px', val: 2 },
                            { label: '4px', val: 4 },
                            { label: '6px', val: 6 },
                            { label: '8px', val: 8 },
                          ].map((r) => (
                            <button
                              key={r.val}
                              type="button"
                              onClick={() => setCfg({ ...cfg, tableRadius: r.val })}
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold border cursor-pointer ${
                                (cfg.tableRadius ?? 3) === r.val
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Analisis Nilai Gizi */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      4. Kandungan Gizi (Pilihan Kategori)
                    </span>
                    <label className="flex items-center gap-1 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={cfg.showGizi}
                        onChange={(e) => setCfg({ ...cfg, showGizi: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showGizi && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={cfg.judulGizi}
                        onChange={(e) => setCfg({ ...cfg, judulGizi: e.target.value })}
                        placeholder="Judul Seksi (misal: KANDUNGAN GIZI)"
                        className="w-full rounded-md border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />

                      {/* Pilih Kategori Gizi yang Aktif */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Pilih Kategori yang Ditampilkan di Stiker:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {GIZI_CATEGORIES.map((cat) => {
                            const isActive = cfg.giziActiveCategories
                              ? !!cfg.giziActiveCategories[cat.id]
                              : cat.defaultActive
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  const currentActive = cfg.giziActiveCategories || {
                                    besar: true,
                                    kecil: true,
                                    balita: false,
                                    ibuHamil: false,
                                    ibuMenyusui: false,
                                  }
                                  setCfg({
                                    ...cfg,
                                    giziActiveCategories: {
                                      ...currentActive,
                                      [cat.id]: !isActive,
                                    },
                                  })
                                }}
                                className={`flex items-center justify-between gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                  isActive
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400'
                                }`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  <span>{cat.icon}</span>
                                  <span>{cat.title}</span>
                                </span>
                                <span
                                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                    isActive
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {isActive ? 'Aktif' : 'Off'}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Opsi Ikon / Emoji Nilai Gizi */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Tampilan Ikon List Gizi:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 text-xs">
                          {[
                            { id: 'emoji', label: '⚡ Emoji (⚡🥩🥑)' },
                            { id: 'bullet', label: '• Bullet (Titik)' },
                            { id: 'none', label: 'Tanpa Ikon' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setCfg({ ...cfg, giziIconType: opt.id })}
                              className={`py-1 px-1.5 rounded text-[11px] font-semibold border cursor-pointer ${
                                (cfg.giziIconType || 'emoji') === opt.id
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Kotak Input Nilai Gizi untuk Kategori yang Aktif */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {GIZI_CATEGORIES.filter((cat) =>
                          cfg.giziActiveCategories
                            ? !!cfg.giziActiveCategories[cat.id]
                            : cat.defaultActive
                        ).map((cat) => {
                          const data = cfg[cat.key] || DEFAULT_CONFIG[cat.key] || {}
                          return (
                            <div
                              key={cat.id}
                              className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850"
                            >
                              <div className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                                <span>{cat.icon} {cat.title}</span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                  ✓ Tampil di Label
                                </span>
                              </div>
                              {['energi', 'protein', 'lemak', 'karbohidrat', 'serat'].map((k) => (
                                <div key={`${cat.id}-${k}`} className="mt-1">
                                  <label className="block text-[10px] text-slate-500 capitalize">{k}</label>
                                  <input
                                    type="text"
                                    value={data[k] || ''}
                                    onChange={(e) =>
                                      setCfg({
                                        ...cfg,
                                        [cat.key]: {
                                          ...(cfg[cat.key] || DEFAULT_CONFIG[cat.key] || {}),
                                          [k]: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full rounded border border-slate-300 px-1.5 py-0.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                  />
                                </div>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Batas Aman 2 Jam & Peringatan */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    5. Batas Aman & Larangan Bawa Pulang
                  </span>

                  <div className="mt-2.5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-rose-700 dark:text-rose-400">
                        Batas Waktu Konsumsi
                      </label>
                      <label className="flex items-center gap-1 text-[11px] text-slate-500">
                        <input
                          type="checkbox"
                          checked={cfg.showBatasAman}
                          onChange={(e) => setCfg({ ...cfg, showBatasAman: e.target.checked })}
                          className="rounded accent-emerald-600"
                        />
                        <span>Aktif</span>
                      </label>
                    </div>

                    {cfg.showBatasAman && (
                      <div className="space-y-2">
                        {/* Judul Teks */}
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">Judul Teks Peringatan Waktu (per baris):</label>
                          <textarea
                            rows={2}
                            value={cfg.judulBatasAman}
                            onChange={(e) => setCfg({ ...cfg, judulBatasAman: e.target.value })}
                            className="w-full rounded border border-rose-300 bg-rose-50/50 px-2 py-1 text-xs font-bold leading-tight text-rose-900 dark:bg-rose-950/30 dark:text-rose-200"
                            placeholder="HARUS DIKONSUMSI&#10;SEBELUM PUKUL"
                          />
                        </div>

                        {/* Jam Konsumsi */}
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">Batas Jam / Waktu:</label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={cfg.durasiBatas}
                              onChange={(e) => setCfg({ ...cfg, durasiBatas: e.target.value })}
                              className="flex-1 rounded border border-rose-300 bg-white px-2 py-1 text-xs font-black text-rose-900 dark:bg-slate-800 dark:text-rose-200"
                              placeholder="08:00 WIB"
                            />
                          </div>
                          {/* Quick Preset Buttons */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {['08:00 WIB', '09:00 WIB', '09:30 WIB', '10:00 WIB', '11:00 WIB', '12:00 WIB'].map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setCfg({ ...cfg, durasiBatas: preset })}
                                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 cursor-pointer dark:bg-slate-800 dark:text-slate-300"
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Opsi Tanggal */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <label className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                              📅 Opsi Tanggal Konsumsi
                            </label>
                            <label className="flex items-center gap-1 text-[11px] text-slate-500">
                              <input
                                type="checkbox"
                                checked={cfg.showTanggalBatas}
                                onChange={(e) => setCfg({ ...cfg, showTanggalBatas: e.target.checked })}
                                className="rounded accent-emerald-600"
                              />
                              <span>Tampilkan</span>
                            </label>
                          </div>
                          {cfg.showTanggalBatas && (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={cfg.tanggalBatas}
                                onChange={(e) => setCfg({ ...cfg, tanggalBatas: e.target.value })}
                                className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                placeholder="misal: 09/09/2026 atau 04 September 2026"
                              />
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">Font (pt):</span>
                                <input
                                  type="number"
                                  step="0.5"
                                  min="6"
                                  max="24"
                                  value={cfg.fontSizes?.tanggalBatas ?? 10}
                                  onChange={(e) =>
                                    setCfg({
                                      ...cfg,
                                      fontSizes: { ...(cfg.fontSizes || {}), tanggalBatas: Number(e.target.value) },
                                    })
                                  }
                                  className="w-14 rounded border border-slate-300 px-1.5 py-1 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Subteks / Catatan Tambahan */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <label className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                              📝 Subteks / Catatan Tambahan
                            </label>
                            <label className="flex items-center gap-1 text-[11px] text-slate-500">
                              <input
                                type="checkbox"
                                checked={cfg.showSubteksBatas ?? true}
                                onChange={(e) => setCfg({ ...cfg, showSubteksBatas: e.target.checked })}
                                className="rounded accent-emerald-600"
                              />
                              <span>Tampilkan</span>
                            </label>
                          </div>
                          {(cfg.showSubteksBatas ?? true) && (
                            <input
                              type="text"
                              value={cfg.subteksBatas}
                              onChange={(e) => setCfg({ ...cfg, subteksBatas: e.target.value })}
                              className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                              placeholder="Setelah makanan diterima untuk menjaga kualitas..."
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-2.5 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-rose-800 dark:text-rose-300">
                        Peringatan Larangan (Bar Teks Standar)
                      </label>
                      <label className="flex items-center gap-1 text-[11px] text-slate-500">
                        <input
                          type="checkbox"
                          checked={cfg.showPeringatan}
                          onChange={(e) => setCfg({ ...cfg, showPeringatan: e.target.checked })}
                          className="rounded accent-emerald-600"
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                    {cfg.showPeringatan && (
                      <input
                        type="text"
                        value={cfg.teksPeringatan}
                        onChange={(e) => setCfg({ ...cfg, teksPeringatan: e.target.value })}
                        className="mt-1 w-full rounded border border-rose-300 bg-rose-50/50 px-2 py-1 text-xs font-bold text-rose-900 dark:bg-rose-950/30 dark:text-rose-200"
                      />
                    )}
                  </div>
                </div>

                {/* 6. Petunjuk Segera Konsumsi & Larangan Bawa Pulang (Badge Komponen) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      6. Badge Segera Konsumsi & Larangan Bawa Pulang
                    </span>
                    <label className="flex items-center gap-1 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={cfg.showBadges}
                        onChange={(e) => setCfg({ ...cfg, showBadges: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showBadges && (
                    <div className="space-y-3">
                      {/* Pengaturan Layout & Border */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Tata Letak:
                          </label>
                          <select
                            value={cfg.badgeLayout || 'sideBySide'}
                            onChange={(e) => setCfg({ ...cfg, badgeLayout: e.target.value })}
                            className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-medium"
                          >
                            <option value="sideBySide">Berdampingan (Kiri - Kanan)</option>
                            <option value="stacked">Atas - Bawah (Stacked)</option>
                          </select>
                        </div>
                        <div className="flex items-end pb-1.5">
                          <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                            <input
                              type="checkbox"
                              checked={cfg.badgeBorder}
                              onChange={(e) => setCfg({ ...cfg, badgeBorder: e.target.checked })}
                              className="rounded accent-emerald-600"
                            />
                            <span>Garis Tepi Kotak (Border)</span>
                          </label>
                        </div>
                      </div>

                      {/* Badge 1: Segera Konsumsi (Ikon Piring Sendok Garpu) */}
                      <div className="rounded-xl border border-slate-200 p-2.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-850 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            🍽️ Badge 1: Segera Konsumsi
                          </span>
                          <label className="flex items-center gap-1 text-[11px] text-slate-500">
                            <input
                              type="checkbox"
                              checked={cfg.showBadgeSegera}
                              onChange={(e) => setCfg({ ...cfg, showBadgeSegera: e.target.checked })}
                              className="rounded accent-emerald-600"
                            />
                            <span>Aktif</span>
                          </label>
                        </div>
                        {cfg.showBadgeSegera && (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="block text-[10px] text-slate-500 mb-0.5">Judul Baris 1:</label>
                              <input
                                type="text"
                                value={cfg.judulBadgeSegera}
                                onChange={(e) => setCfg({ ...cfg, judulBadgeSegera: e.target.value })}
                                className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                placeholder="SEGERA KONSUMSI"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-500 mb-0.5">Subteks Baris 2:</label>
                              <input
                                type="text"
                                value={cfg.subBadgeSegera}
                                onChange={(e) => setCfg({ ...cfg, subBadgeSegera: e.target.value })}
                                className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                placeholder="SETELAH DITERIMA"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Badge 2: Larangan Bawa Pulang */}
                      <div className="rounded-xl border border-rose-200 p-2.5 bg-rose-50/30 dark:border-rose-900/50 dark:bg-rose-950/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                            🚫 Badge 2: Larangan Bawa Pulang
                          </span>
                          <label className="flex items-center gap-1 text-[11px] text-slate-500">
                            <input
                              type="checkbox"
                              checked={cfg.showBadgeLarangan}
                              onChange={(e) => setCfg({ ...cfg, showBadgeLarangan: e.target.checked })}
                              className="rounded accent-emerald-600"
                            />
                            <span>Aktif</span>
                          </label>
                        </div>
                        {cfg.showBadgeLarangan && (
                          <div className="space-y-2 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] text-slate-500 mb-0.5">Judul Baris 1:</label>
                                <input
                                  type="text"
                                  value={cfg.judulBadgeLarangan}
                                  onChange={(e) => setCfg({ ...cfg, judulBadgeLarangan: e.target.value })}
                                  className="w-full rounded border border-rose-300 px-2 py-1 text-xs font-bold text-rose-900 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-200"
                                  placeholder="TIDAK BOLEH"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-slate-500 mb-0.5">Subteks Baris 2:</label>
                                <input
                                  type="text"
                                  value={cfg.subBadgeLarangan}
                                  onChange={(e) => setCfg({ ...cfg, subBadgeLarangan: e.target.value })}
                                  className="w-full rounded border border-rose-300 px-2 py-1 text-xs font-bold text-rose-900 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-200"
                                  placeholder="DIBAWA PULANG"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-500 mb-0.5">URL / File Ikon Larangan:</label>
                              <input
                                type="text"
                                value={cfg.iconLaranganUrl || '/img/larangan_dibawa_pulang.png'}
                                onChange={(e) => setCfg({ ...cfg, iconLaranganUrl: e.target.value })}
                                className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                placeholder="/img/larangan_dibawa_pulang.png"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. Footer Media Sosial */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      7. Footer Media Sosial
                    </span>
                    <label className="flex items-center gap-1 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={cfg.showSosmed}
                        onChange={(e) => setCfg({ ...cfg, showSosmed: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Tampilkan</span>
                    </label>
                  </div>

                  {cfg.showSosmed && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-pink-600">📸 Instagram:</span>
                        <input
                          type="text"
                          value={cfg.igHandle}
                          onChange={(e) => setCfg({ ...cfg, igHandle: e.target.value })}
                          placeholder="@sppg_jeketro_gnik_grobogan"
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-600">📘 Facebook:</span>
                        <input
                          type="text"
                          value={cfg.fbHandle}
                          onChange={(e) => setCfg({ ...cfg, fbHandle: e.target.value })}
                          placeholder="@sppg_facebook"
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">🎵 TikTok:</span>
                        <input
                          type="text"
                          value={cfg.tiktokHandle}
                          onChange={(e) => setCfg({ ...cfg, tiktokHandle: e.target.value })}
                          placeholder="@sppgjeketro"
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. Edukasi: Kenapa Harus Tepat Waktu? (Opsional) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      7. Edukasi: Kenapa Harus Tepat Waktu? (Opsional)
                    </span>
                    <label className="flex items-center gap-1 text-xs text-slate-500">
                      <input
                        type="checkbox"
                        checked={cfg.showEdukasi}
                        onChange={(e) => setCfg({ ...cfg, showEdukasi: e.target.checked })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Aktif</span>
                    </label>
                  </div>

                  {cfg.showEdukasi && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">⏱️</span>
                        <input
                          type="text"
                          value={cfg.edukasiItem1}
                          onChange={(e) => setCfg({ ...cfg, edukasiItem1: e.target.value })}
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">🛑</span>
                        <input
                          type="text"
                          value={cfg.edukasiItem2}
                          onChange={(e) => setCfg({ ...cfg, edukasiItem2: e.target.value })}
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">🍽️</span>
                        <input
                          type="text"
                          value={cfg.edukasiItem3}
                          onChange={(e) => setCfg({ ...cfg, edukasiItem3: e.target.value })}
                          className="flex-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: PENGATURAN FONT & UKURAN TEKS */}
            {activeTab === 'font' && (
              <div className="space-y-4">
                {/* 1. Pilihan Jenis Huruf (Font Family) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      🔤 Jenis Huruf (Font Family)
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                      Pilih Font untuk Seluruh Teks Stiker:
                    </label>
                    <select
                      value={cfg.fontFamily || FONT_OPTIONS[0].value}
                      onChange={(e) => setCfg({ ...cfg, fontFamily: e.target.value })}
                      className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-medium"
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60 text-center">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Pratinjau Font Terpilih:</span>
                    <span style={{ fontFamily: cfg.fontFamily || FONT_OPTIONS[0].value }} className="text-sm font-black text-slate-900 dark:text-white">
                      BADAN GIZI NASIONAL (BGN) — 1234567890
                    </span>
                  </div>
                </div>

                {/* 2. Pita Ornamen Dekorasi Label Resmi BGN */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      ✨ Pita Dekorasi Ornamen Label
                    </span>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={(cfg.showPattern ?? true) && cfg.patternPos !== 'none'}
                        onChange={(e) => setCfg({ ...cfg, showPattern: e.target.checked, patternPos: e.target.checked ? 'both' : 'none' })}
                        className="rounded accent-emerald-600"
                      />
                      <span>Aktifkan Dekorasi</span>
                    </label>
                  </div>

                  {(cfg.showPattern ?? true) && cfg.patternPos !== 'none' && (
                    <div className="space-y-3 pt-1">
                      {/* Posisi Pita Dekorasi */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Posisi Penempatan Pita Dekorasi:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 text-xs">
                          {[
                            { id: 'both', label: '✨ Atas & Bawah' },
                            { id: 'top', label: '⬆️ Bawah Kop' },
                            { id: 'bottom', label: '⬇️ Atas Footer' },
                          ].map((pos) => (
                            <button
                              key={pos.id}
                              type="button"
                              onClick={() => setCfg({ ...cfg, patternPos: pos.id })}
                              className={`py-1 px-1.5 rounded text-[11px] font-semibold border cursor-pointer ${
                                (cfg.patternPos || 'both') === pos.id
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {pos.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Varian Motif: Putih vs Warna BGN */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Pilihan Varian Motif:
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setCfg({ ...cfg, patternType: 'color', patternUrl: '/img/pattern4.png' })}
                            className={`py-1.5 px-2 rounded-lg text-left border cursor-pointer ${
                              (cfg.patternType || 'color') === 'color'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="text-[11px]">🎨 Warna Asli BGN</div>
                            <div className="text-[10px] text-slate-500 font-normal">Navy & Emas Resmi</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCfg({ ...cfg, patternType: 'white', patternUrl: '/img/pattern4-white.png' })}
                            className={`py-1.5 px-2 rounded-lg text-left border cursor-pointer ${
                              cfg.patternType === 'white'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="text-[11px]">⚪ Garis Putih</div>
                            <div className="text-[10px] text-slate-500 font-normal">Monokrom / Minimalis</div>
                          </button>
                        </div>
                      </div>

                      {/* Slider Tinggi Pita */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                          <span>Tinggi Pita Dekorasi:</span>
                          <span className="font-bold text-emerald-600">{cfg.patternHeightMm || 6} mm</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="14"
                          step="0.5"
                          value={cfg.patternHeightMm || 6}
                          onChange={(e) => setCfg({ ...cfg, patternHeightMm: parseFloat(e.target.value) })}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                      </div>

                      {/* Slider Opasitas */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                          <span>Opasitas Motif:</span>
                          <span className="font-bold text-emerald-600">
                            {Math.round((cfg.patternOpacity ?? 0.85) * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={cfg.patternOpacity ?? 0.85}
                          onChange={(e) => setCfg({ ...cfg, patternOpacity: parseFloat(e.target.value) })}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                      </div>

                      {/* Preview Box Pita Motif */}
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:bg-slate-800/60 dark:border-slate-700/60">
                        <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Pratinjau Pita Ornamen Label:</span>
                        <div
                          style={{
                            width: '100%',
                            height: `${cfg.patternHeightMm || 6}mm`,
                            backgroundImage: `url(${cfg.patternType === 'white' ? '/img/pattern4-white.png' : '/img/pattern4.png'})`,
                            backgroundRepeat: 'repeat-x',
                            backgroundPosition: 'center',
                            backgroundSize: `auto ${cfg.patternHeightMm || 6}mm`,
                            opacity: cfg.patternOpacity ?? 0.85,
                            borderRadius: '2px',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Pengaturan Ukuran Font per Bagian (pt) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      📏 Ukuran Font per Bagian (pt)
                    </span>
                    <button
                      type="button"
                      onClick={() => setCfg({
                        ...cfg,
                        fontSizes: {
                          judul: 18,
                          namaDapur: 12,
                          namaMitra: 8,
                          judulGizi: 12,
                          headerBox: 10,
                          isiMenu: 8,
                          isiGizi: 8,
                          batasAman: 16,
                          durasiBatas: 16,
                          subteksBatas: 9,
                          larangan: 16,
                          sosmed: 8,
                          edukasi: 7,
                        },
                        logoSizeMm: 50,
                      })}
                      className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer underline dark:text-emerald-400"
                    >
                      🔄 Reset Default BGN
                    </button>
                  </div>

                  {/* Section A: Kop Atas & Logo */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">A. Kop Atas & Logo</div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Judul Label (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="8"
                          max="36"
                          value={cfg.fontSizes?.judul ?? 18}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), judul: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Ukuran Logo (mm)</label>
                        <input
                          type="number"
                          step="1"
                          min="15"
                          max="80"
                          value={cfg.logoSizeMm ?? 50}
                          onChange={(e) => setCfg({ ...cfg, logoSizeMm: Number(e.target.value) })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                        <span className="text-[10px] text-slate-500">= {((cfg.logoSizeMm ?? 50) / 10).toFixed(1)} cm</span>
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Nama SPPG (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="6"
                          max="24"
                          value={cfg.fontSizes?.namaDapur ?? 12}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), namaDapur: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Nama Yayasan / Mitra (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="18"
                          value={cfg.fontSizes?.namaMitra ?? 8}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), namaMitra: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Box Menu & Kandungan Gizi */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">B. Box Menu & Kandungan Gizi</div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Header Box (Menu/Porsi) (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="6"
                          max="20"
                          value={cfg.fontSizes?.headerBox ?? 10}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), headerBox: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Judul Gizi (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="6"
                          max="20"
                          value={cfg.fontSizes?.judulGizi ?? 12}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), judulGizi: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Isi Daftar Menu (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="16"
                          value={cfg.fontSizes?.isiMenu ?? 8}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), isiMenu: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Isi Nilai Gizi (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="16"
                          value={cfg.fontSizes?.isiGizi ?? 8}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), isiGizi: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section C: Batas Waktu & Peringatan */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">C. Batas Waktu & Peringatan</div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Judul Batas Aman (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="8"
                          max="28"
                          value={cfg.fontSizes?.batasAman ?? 16}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), batasAman: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Durasi "2 JAM" (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="8"
                          max="32"
                          value={cfg.fontSizes?.durasiBatas ?? 16}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), durasiBatas: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Tanggal Konsumsi (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="6"
                          max="24"
                          value={cfg.fontSizes?.tanggalBatas ?? 10}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), tanggalBatas: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Subteks Batas Aman (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="16"
                          value={cfg.fontSizes?.subteksBatas ?? 9}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), subteksBatas: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Larangan Bawa Pulang (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="8"
                          max="28"
                          value={cfg.fontSizes?.larangan ?? 16}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), larangan: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section D: Badge Petunjuk & Larangan */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">D. Badge Petunjuk & Larangan</div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Judul Teks Badge (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="6"
                          max="20"
                          value={cfg.fontSizes?.badgeTeks ?? 10}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), badgeTeks: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Subteks Badge (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="16"
                          value={cfg.fontSizes?.badgeSubteks ?? 8}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), badgeSubteks: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Tinggi Ikon Badge (mm)</label>
                        <input
                          type="number"
                          step="1"
                          min="6"
                          max="28"
                          value={cfg.fontSizes?.badgeIconSizeMm ?? 12}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), badgeIconSizeMm: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section E: Media Sosial */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">E. Footer Media Sosial</div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400">Akun Sosial Media (pt)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="5"
                          max="16"
                          value={cfg.fontSizes?.sosmed ?? 8}
                          onChange={(e) => setCfg({ ...cfg, fontSizes: { ...(cfg.fontSizes || {}), sosmed: Number(e.target.value) } })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: MARGIN KERTAS & GAP */}
            {activeTab === 'layout' && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Jumlah Kolom di Lembar F4 (Lebar 210 mm)
                  </span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setKolom(2)}
                      className={`min-h-[42px] rounded-lg p-2 text-center text-xs font-bold cursor-pointer ${
                        kolom === 2
                          ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      ✂️ 2 Kolom (Lebar ~{stickerWidthMm.toFixed(1)} mm)
                    </button>
                    <button
                      type="button"
                      onClick={() => setKolom(3)}
                      className={`min-h-[42px] rounded-lg p-2 text-center text-xs font-bold cursor-pointer ${
                        kolom === 3
                          ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      ✂️ 3 Kolom (Lebar ~{stickerWidthMm.toFixed(1)} mm)
                    </button>
                  </div>
                </div>

                {/* Presisi Margin */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Margin Atas (mm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={marginAtas}
                      onChange={(e) => setMarginAtas(Number(e.target.value))}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <span className="text-[10px] text-emerald-600">= {(marginAtas / 10).toFixed(1)} cm</span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Margin Bawah (mm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={marginBawah}
                      onChange={(e) => setMarginBawah(Number(e.target.value))}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <span className="text-[10px] text-emerald-600">= {(marginBawah / 10).toFixed(1)} cm</span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Margin Kiri (mm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={marginKiri}
                      onChange={(e) => setMarginKiri(Number(e.target.value))}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <span className="text-[10px] text-emerald-600">= {(marginKiri / 10).toFixed(1)} cm</span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Margin Kanan (mm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={marginKanan}
                      onChange={(e) => setMarginKanan(Number(e.target.value))}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <span className="text-[10px] text-emerald-600">= {(marginKanan / 10).toFixed(1)} cm</span>
                  </div>
                  <div>
                    <label className="block font-bold text-emerald-700 dark:text-emerald-400">Gap Antar Stiker (mm)</label>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="30"
                        value={gapAntarStiker}
                        onChange={(e) => setGapAntarStiker(Number(e.target.value))}
                        className="w-20 rounded border border-emerald-500 bg-emerald-50/50 px-2 py-1 text-slate-900 dark:bg-emerald-950/30 dark:text-white font-semibold"
                      />
                      <span className="text-[10px] text-emerald-600 font-semibold">= {(gapAntarStiker / 10).toFixed(1)} cm</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {[
                        { label: '0 mm (Menyatu Full)', val: 0 },
                        { label: '5 mm', val: 5 },
                        { label: '10 mm (1 cm)', val: 10 },
                      ].map((g) => (
                        <button
                          key={g.val}
                          type="button"
                          onClick={() => setGapAntarStiker(g.val)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border cursor-pointer ${
                            gapAntarStiker === g.val
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Susunan Tabel Gizi</label>
                    <select
                      value={susunanGizi}
                      onChange={(e) => setSusunanGizi(e.target.value)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="stacked">Bertumpuk (Atas-Bawah — Standar BGN)</option>
                      <option value="sideBySide">Berdampingan (Kiri-Kanan)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400">Garis Tepi Kartu Luar</label>
                    <select
                      value={borderStyle}
                      onChange={(e) => setBorderStyle(e.target.value)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="none">Tanpa Garis Luar (Polos / Standar)</option>
                      <option value="border-subtle">Garis Tipis Abu-Abu</option>
                      <option value="border-black">Garis Hitam Tegas</option>
                      <option value="border-green">Garis Hijau SPPG</option>
                    </select>
                  </div>

                  <div className="col-span-2 pt-1">
                    <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      Kelengkungan Sudut Tabel (Menu &amp; Gizi):
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={cfg.tableRadius ?? 3}
                        onChange={(e) => setCfg({ ...cfg, tableRadius: Number(e.target.value) })}
                        className="w-16 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <span className="text-xs text-slate-500">px</span>
                      <div className="flex flex-wrap items-center gap-1">
                        {[
                          { label: 'Siku (0)', val: 0 },
                          { label: '2px (Halus)', val: 2 },
                          { label: '4px (Sedang)', val: 4 },
                          { label: '6px (Bulat)', val: 6 },
                          { label: '8px (Ekstra)', val: 8 },
                        ].map((r) => (
                          <button
                            key={r.val}
                            type="button"
                            onClick={() => setCfg({ ...cfg, tableRadius: r.val })}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border cursor-pointer ${
                              (cfg.tableRadius ?? 3) === r.val
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skala Kepadatan */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kepadatan Teks / Ukuran Font
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['compact', 'normal', 'spacious'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setScaleFont(s)}
                        className={`py-1.5 rounded border capitalize cursor-pointer ${
                          scaleFont === s
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PANDUAN MICROSOFT WORD */}
            {activeTab === 'word-guide' && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs dark:border-emerald-900/50 dark:bg-emerald-950/30 text-xs space-y-3">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  📄 Panduan Pasang Stiker di Microsoft Word
                </div>

                <div className="rounded-xl bg-white p-3 border border-emerald-100 dark:bg-slate-900 dark:border-emerald-900/40 space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Langkah 1: Set Kertas F4 di Word</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    1. Buka Ms Word &gt; Tab <strong>Layout</strong> &gt; <strong>Size</strong> &gt; <strong>More Paper Sizes</strong>.<br />
                    2. Masukkan <strong>Width: 21.0 cm</strong>, <strong>Height: 33.0 cm</strong>.<br />
                    3. Tab <strong>Margins</strong>: Atur Top: 0.5 cm, Bottom: 0.5 cm, Left: 1.0 cm, Right: 1.0 cm.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-emerald-100 dark:bg-slate-900 dark:border-emerald-900/40 space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Langkah 2: Tempel Gambar</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    • Klik tombol <strong>"Salin (CTRL+V di Word)"</strong> di web &gt; lalu tekan <strong>CTRL + V</strong> di Word.<br />
                    • Atau klik <strong>"Unduh 1 Stiker PNG"</strong> &gt; <strong>Insert Picture</strong> di Word.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-emerald-100 dark:bg-slate-900 dark:border-emerald-900/40 space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Langkah 3: Atur Ukuran Gambar</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    1. Klik kanan gambar &gt; <strong>Wrap Text</strong> &gt; pilih <strong>In Front of Text</strong>.<br />
                    2. Klik tab <strong>Picture Format</strong> &gt; atur:
                    <br />• Tinggi: <strong>{(stickerHeightMm / 10).toFixed(1)} cm</strong>
                    <br />• Lebar: <strong>{(stickerWidthMm / 10).toFixed(1)} cm</strong><br />
                    3. Copy paste stiker tersebut menjadi 2 atau 3 stiker berjajar ke samping dengan jarak 1 cm!
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: BACKUP / EDIT JSON */}
            {activeTab === 'json-backup' && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-xs dark:border-amber-900/50 dark:bg-amber-950/20 text-xs space-y-4">
                <div>
                  <div className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                    💾 Unduh, Edit, &amp; Impor Konfigurasi JSON
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Anda dapat mengunduh seluruh isi dan ukuran stiker ke file <code>.json</code>, mengeditnya sendiri atau meminta asisten AI memodifikasinya, lalu mengunggah / menempelkannya kembali ke sini.
                  </p>
                </div>

                {/* Tombol Aksi Cepat JSON */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadConfigJson}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 cursor-pointer active:scale-98 transition-transform"
                  >
                    <span>📥 Unduh File .JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => jsonInputRef.current?.click()}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-400 bg-white px-3 py-2 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-50 dark:bg-slate-900 dark:text-amber-300 dark:border-amber-700 cursor-pointer active:scale-98 transition-transform"
                  >
                    <span>📤 Unggah File .JSON</span>
                  </button>
                </div>

                {/* Editor Textarea JSON */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      Editor Teks JSON Langsung:
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRawJsonText(JSON.stringify(getCurrentFullConfig(), null, 2))
                          setExportMsg('🔄 Teks JSON diperbarui dari desain saat ini.')
                          setTimeout(() => setExportMsg(''), 3000)
                        }}
                        className="rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        title="Tarik kembali settingan stiker saat ini ke kotak JSON"
                      >
                        🔄 Muat Ulang
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(rawJsonText || JSON.stringify(getCurrentFullConfig(), null, 2))
                            setExportMsg('📋 Teks JSON berhasil disalin ke clipboard!')
                            setTimeout(() => setExportMsg(''), 3000)
                          }
                        }}
                        className="rounded px-2 py-0.5 text-[10px] font-semibold text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40 cursor-pointer"
                        title="Salin teks JSON ini"
                      >
                        📋 Salin Teks
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={14}
                    value={rawJsonText}
                    onChange={(e) => setRawJsonText(e.target.value)}
                    placeholder="Paste atau edit konfigurasi JSON di sini..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-[11px] leading-relaxed text-slate-900 shadow-inner focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-950 dark:text-emerald-400"
                    spellCheck={false}
                  />
                </div>

                {/* Tombol Terapkan JSON */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleApplyRawJson}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer active:scale-98 transition-transform"
                  >
                    <span>✨ Terapkan Perubahan JSON ke Desain Stiker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Kembalikan seluruh isi dan ukuran ke setelan bawaan standar BGN?')) {
                        setCfg(DEFAULT_CONFIG)
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
                        setRawJsonText(JSON.stringify({ _meta: { app: 'StikerLabelBGN', version: '2.0', exportedAt: new Date().toISOString() }, cfg: DEFAULT_CONFIG, layout: DEFAULT_LAYOUT }, null, 2))
                        setExportMsg('🔄 Desain dikembalikan ke standar awal!')
                        setTimeout(() => setExportMsg(''), 3000)
                      }
                    }}
                    className="text-[11px] text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 text-center py-1 cursor-pointer"
                  >
                    Kembalikan ke Setelan Standar Awal
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ── PANEL KANAN: PREVIEW INTERAKTIF LEMBAR F4 ── */}
          <section aria-label="Preview Lembar Kerja F4" className="lg:sticky lg:top-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                👁️ Preview Lembar F4 (210 × 330 mm)
              </h2>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Zoom:</span>
                {[0.4, 0.45, 0.55].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZoomPreview(z)}
                    className={`rounded px-2 py-0.5 text-xs font-semibold cursor-pointer ${
                      zoomPreview === z
                        ? 'border border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'border border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {Math.round(z * 100)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Container Preview Sheet */}
            <div className="flex max-h-[85vh] justify-center overflow-auto rounded-2xl bg-slate-200 p-6 shadow-inner dark:bg-slate-900/80">
              {/* Fisik Kertas F4 */}
              <div
                style={{
                  width: `${paperWidthMm}mm`,
                  height: `${paperHeightMm}mm`,
                  transform: `scale(${zoomPreview})`,
                  transformOrigin: 'top center',
                  background: '#ffffff',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
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
                  flexDirection: 'row',
                }}
              >
                {/* Zona Margin Printer Kiri & Kanan */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `${marginKiri}mm`,
                    background: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05) 5px, rgba(239, 68, 68, 0.15) 5px, rgba(239, 68, 68, 0.15) 10px)',
                    borderRight: '1px dashed #ef4444',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                  title="Margin Kiri Printer"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: `${marginKanan}mm`,
                    background: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05) 5px, rgba(239, 68, 68, 0.15) 5px, rgba(239, 68, 68, 0.15) 10px)',
                    borderLeft: '1px dashed #ef4444',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                  title="Margin Kanan Printer"
                />

                {/* Zona Margin Atas & Bawah */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${marginAtas}mm`,
                    background: 'rgba(59, 130, 246, 0.08)',
                    borderBottom: '1px dashed #3b82f6',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                  title="Margin Atas (0.5 cm)"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${marginBawah}mm`,
                    background: 'rgba(59, 130, 246, 0.08)',
                    borderTop: '1px dashed #3b82f6',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                  title="Margin Bawah (0.5 cm)"
                />

                {/* Stiker Cards & Gap */}
                {renderSheetContent()}
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Dimensi 1 Stiker: <strong>{(stickerWidthMm / 10).toFixed(1)} cm × {(stickerHeightMm / 10).toFixed(1)} cm</strong></span>
              <span>Gap Potong: <strong>{(gapAntarStiker / 10).toFixed(1)} cm</strong> (✂️ di tengah)</span>
            </div>
          </section>

        </div>
      </div>

      {/* ─── CETAK NYATA: ELEMEN KHUSUS PRINT BROWSER (@media print) ─── */}
      <div
        id="stiker-print-root"
        style={{
          display: 'none',
          width: '210mm',
          height: '330mm',
          boxSizing: 'border-box',
          position: 'relative',
          background: '#ffffff',
          overflow: 'hidden',
          paddingLeft: `${marginKiri}mm`,
          paddingRight: `${marginKanan}mm`,
          paddingTop: `${marginAtas}mm`,
          paddingBottom: `${marginBawah}mm`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
          }}
        >
          {renderSheetContent()}
        </div>
      </div>

      {/* ─── TARGET ELEMEN KHUSUS EXPORT GAMBAR (OFF-SCREEN SCALE 1:1 RESOLUSI PENUH) ─── */}
      <div
        style={{
          position: 'fixed',
          left: '-99999px',
          top: 0,
          pointerEvents: 'none',
          visibility: 'visible',
          zIndex: -100,
        }}
        aria-hidden="true"
      >
        {/* 1. Target Export 1 Stiker Tunggal */}
        <div
          id="export-single-stiker"
          style={{
            width: `${stickerWidthMm}mm`,
            height: `${stickerHeightMm}mm`,
            boxSizing: 'border-box',
            padding: `${paddingStiker}mm`,
            border: cardBorder,
            borderRadius: borderStyle === 'none' ? '0' : '5px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {renderStikerContent()}
        </div>

        {/* 2. Target Export Full Sheet F4 */}
        <div
          id="export-full-sheet"
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
            flexDirection: 'row',
          }}
        >
          {renderSheetContent()}
        </div>
      </div>

    </main>
  )
}

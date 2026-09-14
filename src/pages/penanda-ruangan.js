import React, { useState, useRef, useMemo } from 'react'
import Layout from '@theme/Layout'
import {
  Download,
  Printer,
  Copy,
  Check,
  Palette,
  Type,
  Layers,
  Grid,
  RefreshCw,
  DoorClosed,
  Info,
  Sliders,
  ZoomIn,
  ZoomOut
} from 'lucide-react'

// ─── PRESET WARNA STANDAR RAMBU & JALUR CEPAT ────────────────────────────────
const COLOR_PRESETS = [
  {
    name: 'Hijau Jalur Cepat (Default)',
    desc: 'Standar rambu hijau jalan tol / keselamatan',
    bg: '#007A3D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0'
  },
  {
    name: 'Hijau Daun Segar',
    desc: 'Nuansa hijau terang modern',
    bg: '#15803D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0'
  },
  {
    name: 'Biru Rambu Informasi',
    desc: 'Standar penunjuk arah umum',
    bg: '#005596',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0'
  },
  {
    name: 'Biru Navy Elegan',
    desc: 'Papan kantor korporat / eksekutif',
    bg: '#1E293B',
    border: '#E2E8F0',
    text: '#F8FAFC',
    subtext: '#94A3B8'
  },
  {
    name: 'Merah Bahaya / Larangan',
    desc: 'Untuk ruang darurat / panel listrik',
    bg: '#B91C1C',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#FEE2E2'
  },
  {
    name: 'Kuning Peringatan / Hazard',
    desc: 'Latar kuning teks hitam kontras tinggi',
    bg: '#EAB308',
    border: '#000000',
    text: '#000000',
    subtext: '#3F3F46'
  },
  {
    name: 'Hitam Matte Akrilik',
    desc: 'Kesan mewah minimalis modern',
    bg: '#18181B',
    border: '#F4F4F5',
    text: '#FFFFFF',
    subtext: '#A1A1AA'
  },
  {
    name: 'Putih Bersih (Clean White)',
    desc: 'Border dan teks hitam tegas',
    bg: '#FFFFFF',
    border: '#0F172A',
    text: '#0F172A',
    subtext: '#475569'
  },
  {
    name: 'Emas Mewah (Gold Brass)',
    desc: 'Plang kuningan hotel / ruang direksi',
    bg: '#92400E',
    border: '#FEF3C7',
    text: '#FFFBEB',
    subtext: '#FDE68A'
  }
]

// ─── PRESET UKURAN STANDAR PAPAN NAMA ───────────────────────────────────────
const SIZE_PRESETS = [
  { label: '25 × 10 cm (Default Permintaan)', width: 25, height: 10, padding: 1 },
  { label: '30 × 10 cm (Standar Pintu Kantor)', width: 30, height: 10, padding: 1 },
  { label: '30 × 15 cm (Besar / Terbaca Jauh)', width: 30, height: 15, padding: 1.2 },
  { label: '20 × 8 cm (Kompak / Minimalis)', width: 20, height: 8, padding: 0.8 },
  { label: '35 × 12 cm (Papan Dinding Lebar)', width: 35, height: 12, padding: 1.2 },
  { label: '40 × 15 cm (Papan Rapat / Aula)', width: 40, height: 15, padding: 1.5 }
]

// ─── PRESET NAMA RUANGAN UMUM ───────────────────────────────────────────────
const ROOM_NAME_PRESETS = [
  { title: 'RUANG KANTOR', sub: 'OFFICE ROOM' },
  { title: 'RUANG RAPAT', sub: 'MEETING ROOM' },
  { title: 'RUANG KEPALA', sub: 'HEAD OFFICE' },
  { title: 'RUANG GURU', sub: 'TEACHERS ROOM' },
  { title: 'RUANG DIREKSI', sub: 'BOARD ROOM' },
  { title: 'RUANG STAFF', sub: 'STAFF ROOM' },
  { title: 'LABORATORIUM', sub: 'LABORATORY' },
  { title: 'RUANG SERVER', sub: 'IT DATA CENTER' },
  { title: 'GUDANG', sub: 'STORAGE ROOM' },
  { title: 'RUANG TAMU', sub: 'GUEST ROOM' },
  { title: 'RUANG KESEHATAN', sub: 'FIRST AID / UKS' },
  { title: 'TOILET PRIA', sub: 'GENTS RESTROOM' },
  { title: 'TOILET WANITA', sub: 'LADIES RESTROOM' },
  { title: 'MUSHOLA', sub: 'PRAYER ROOM' },
  { title: 'PANTRY', sub: 'KITCHEN AREA' },
  { title: 'AREA BEBAS ROKOK', sub: 'NO SMOKING AREA' }
]

// ─── PILIHAN FONT ───────────────────────────────────────────────────────────
const FONT_OPTIONS = [
  { id: 'sans-inter', name: 'Sans-Serif Modern (Inter / Arial)', family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  { id: 'sans-bold', name: 'Impact / Highway Block (Tegas & Tebal)', family: 'Impact, "Arial Black", "Trebuchet MS", sans-serif' },
  { id: 'geometric', name: 'Montserrat / Geometrik (Rambu Resmi)', family: '"Montserrat", "Segoe UI", sans-serif' },
  { id: 'condensed', name: 'Condensed / Padat Rapi', family: '"Arial Narrow", "Helvetica Condensed", sans-serif' },
  { id: 'serif', name: 'Serif Klasik / Formal (Times / Georgia)', family: 'Georgia, "Times New Roman", Times, serif' },
  { id: 'monospace', name: 'Monospace / Industrial Tech', family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }
]

export default function PenandaRuanganPage() {
  // ─── STATE DIMENSI (dlm cm) ────────────────────────────────────────────────
  const [widthCm, setWidthCm] = useState(25) // Panjang / Lebar 25 cm
  const [heightCm, setHeightCm] = useState(10) // Tinggi 10 cm
  const [paddingCm, setPaddingCm] = useState(1) // Padding kotak dalam 1 cm
  const [boardCornerRadiusMm, setBoardCornerRadiusMm] = useState(6) // Kelengkungan sudut luar (mm)
  const [innerCornerRadiusMm, setInnerCornerRadiusMm] = useState(4) // Kelengkungan border kotak dalam (mm)
  const [borderThicknessMm, setBorderThicknessMm] = useState(3) // Tebal garis border putih (mm)

  // ─── STATE WARNA ───────────────────────────────────────────────────────────
  const [bgColor, setBgColor] = useState('#007A3D') // Hijau Jalur Cepat default
  const [borderColor, setBorderColor] = useState('#FFFFFF') // Garis border putih
  const [textColor, setTextColor] = useState('#FFFFFF') // Tulisan putih
  const [subtextColor, setSubtextColor] = useState('#E2E8F0')

  // ─── STATE TEKS & TIPOGRAFI ───────────────────────────────────────────────
  const [textTitle, setTextTitle] = useState('RUANG KANTOR')
  const [textSub, setTextSub] = useState('')
  const [forceUppercase, setForceUppercase] = useState(true)
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].family)
  const [fontWeight, setFontWeight] = useState('800') // Bold/Black
  const [fontSizeTitleMm, setFontSizeTitleMm] = useState(20) // Ukuran font judul (mm) - default 20mm (2cm)
  const [fontSizeSubMm, setFontSizeSubMm] = useState(7) // Ukuran font subteks (mm) - default 7mm
  const [letterSpacingMm, setLetterSpacingMm] = useState(1.2) // Spasi antar karakter (mm)
  const [autoFitText, setAutoFitText] = useState(true) // Otomatis sesuaikan teks agar selalu pas di dalam kotak

  // ─── STATE DETAIL REALISTIS / HARDWARE ─────────────────────────────────────
  const [showScrews, setShowScrews] = useState(false) // Baut/sekrup pemasangan di sudut
  const [screwInsetMm, setScrewInsetMm] = useState(5) // Jarak sekrup dari sudut luar (mm)
  const [showGlossEffect, setShowGlossEffect] = useState(true) // Efek kilau akrilik / plat
  const [borderStyle, setBorderStyle] = useState('solid') // 'solid' | 'double' | 'dashed'
  const [showInnerBorder, setShowInnerBorder] = useState(true)

  // ─── STATE UI & BATCH ──────────────────────────────────────────────────────
  const [zoomScale, setZoomScale] = useState(1) // Skala preview di layar
  const [activeTab, setActiveTab] = useState('konten') // 'konten' | 'ukuran' | 'warna' | 'batch'
  const [isExporting, setIsExporting] = useState(false)
  const [copiedStatus, setCopiedStatus] = useState(false)
  const [batchRoomsText, setBatchRoomsText] = useState('RUANG KANTOR\nRUANG RAPAT\nRUANG GURU\nLABORATORIUM\nGUDANG')

  // Referensi elemen SVG untuk ekspor
  const svgRef = useRef(null)

  // ─── KONVERSI SATUAN FISIK (cm & mm ke px SVG) ──────────────────────────────
  // 1 cm = 10 mm. Standar SVG viewBox kita gunakan unit mm agar presisi sempurna!
  const widthMm = widthCm * 10
  const heightMm = heightCm * 10
  const paddingMm = paddingCm * 10

  // Koordinat kotak border dalam
  const innerX = paddingMm
  const innerY = paddingMm
  const innerW = Math.max(0, widthMm - paddingMm * 2)
  const innerH = Math.max(0, heightMm - paddingMm * 2)

  // Judul yang ditampilkan (uppercase bila diaktifkan)
  const displayedTitle = forceUppercase ? (textTitle || '').toUpperCase() : textTitle

  // ─── PERHITUNGAN SAFE WIDTH & AUTO-FIT FONT AGAR TIDAK KELUAR BORDER ────────
  // safeW: Lebar aman di dalam border kotak (menyisakan margin 8mm kiri dan kanan dari garis putih)
  const safeW = Math.max(20, innerW - 16)
  // safeH: Tinggi aman di dalam border kotak
  const safeH = textSub ? Math.max(10, innerH * 0.42) : Math.max(10, innerH * 0.55)

  // Ukuran font yang benar-benar diterapkan ke SVG
  const appliedTitleFontSize = useMemo(() => {
    if (!autoFitText) {
      return fontSizeTitleMm
    }
    const len = Math.max(1, displayedTitle.length)
    // Rasio estimasi lebar font terhadap tinggi font: ~0.62
    const charWidthRatio = 0.62
    const maxHFromWidth = Math.max(6, (safeW - (len - 1) * letterSpacingMm) / (len * charWidthRatio))
    return Math.min(fontSizeTitleMm, safeH, maxHFromWidth)
  }, [autoFitText, fontSizeTitleMm, safeW, safeH, displayedTitle, letterSpacingMm])

  // Estimasi apakah teks masih membutuhkan kompresi SVG
  const estimatedTitleWidth = useMemo(() => {
    const len = displayedTitle.length
    return len * (appliedTitleFontSize * 0.62) + (len - 1) * letterSpacingMm
  }, [displayedTitle, appliedTitleFontSize, letterSpacingMm])

  const needsTitleCompression = estimatedTitleWidth > safeW

  // Update batch title bila user memilih dari list
  const handleSelectBatch = (roomTitle) => {
    setTextTitle(roomTitle)
  }

  // ─── FUNGSI EKSPOR PNG RESOLUSI TINGGI (300 DPI) ──────────────────────────
  const handleDownloadPng = async (dpi = 300) => {
    try {
      setIsExporting(true)
      const svgElement = svgRef.current
      if (!svgElement) return

      // Hitung dimensi pixel berdasarkan DPI fisik
      // 1 inch = 2.54 cm = 25.4 mm
      // pixel = (mm / 25.4) * DPI
      const targetWidthPx = Math.round((widthMm / 25.4) * dpi)
      const targetHeightPx = Math.round((heightMm / 25.4) * dpi)

      // Serialisasi SVG ke string XML
      const serializer = new XMLSerializer()
      let svgString = serializer.serializeToString(svgElement)

      // Pastikan atribut width & height terpasang eksplisit
      if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
      }

      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const URL = window.URL || window.webkitURL || window
      const blobURL = URL.createObjectURL(svgBlob)

      const image = new Image()
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = targetWidthPx
        canvas.height = targetHeightPx
        const ctx = canvas.getContext('2d')

        // Render gambar tajam
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(image, 0, 0, targetWidthPx, targetHeightPx)

        const pngUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        const cleanName = (textTitle || 'penanda-ruangan').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        downloadLink.download = `${cleanName}-${widthCm}x${heightCm}cm-${dpi}dpi.png`
        downloadLink.href = pngUrl
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        URL.revokeObjectURL(blobURL)
        setIsExporting(false)
      }

      image.onerror = (err) => {
        console.error('Gagal render canvas gambar:', err)
        alert('Gagal menghasilkan gambar PNG. Silakan coba kembali atau gunakan unduh SVG.')
        setIsExporting(false)
      }

      image.src = blobURL
    } catch (e) {
      console.error(e)
      alert('Terjadi kesalahan saat memproses ekspor: ' + e.message)
      setIsExporting(false)
    }
  }

  // ─── FUNGSI EKSPOR SVG VEKTOR MURNI ────────────────────────────────────────
  const handleDownloadSvg = () => {
    try {
      const svgElement = svgRef.current
      if (!svgElement) return

      const serializer = new XMLSerializer()
      let svgString = serializer.serializeToString(svgElement)

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const cleanName = (textTitle || 'penanda-ruangan').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      a.download = `${cleanName}-${widthCm}x${heightCm}cm.svg`
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('Gagal mengunduh SVG: ' + e.message)
    }
  }

  // ─── FUNGSI SALIN SVG KE CLIPBOARD ─────────────────────────────────────────
  const handleCopySvgCode = async () => {
    try {
      const svgElement = svgRef.current
      if (!svgElement) return
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)
      await navigator.clipboard.writeText(svgString)
      setCopiedStatus(true)
      setTimeout(() => setCopiedStatus(false), 2500)
    } catch {
      alert('Gagal menyalin ke clipboard.')
    }
  }

  // ─── FUNGSI CETAK SKALA FISIK (PRINT 1:1) ──────────────────────────────────
  const handlePrint = () => {
    window.print()
  }

  // Daftar ruangan dari batch textarea
  const batchList = useMemo(() => {
    return batchRoomsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [batchRoomsText])

  return (
    <Layout
      title='Generator Penanda Ruangan (Signage Maker)'
      description='Alat pembuat gambar penanda ruangan, plang pintu kantor, ruang rapat dengan warna hijau jalur cepat, border putih, dan kustomisasi ukuran cm presisi.'
    >
      <div className='min-h-screen bg-slate-900 text-slate-100 font-sans pb-16'>
        {/* ─── HEADER UTAMA ─── */}
        <header className='border-b border-slate-800 bg-slate-950/80 backdrop-blur px-4 py-4 sticky top-0 z-30 shadow-md no-print'>
          <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/40'>
                <DoorClosed className='w-5 h-5' />
              </div>
              <div>
                <h1 className='text-xl font-extrabold tracking-tight text-white flex items-center gap-2'>
                  Generator Penanda Ruangan
                  <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'>
                    25×10 cm Jalur Cepat
                  </span>
                </h1>
                <p className='text-xs text-slate-400'>
                  Desain plang ruangan presisi cm, ekspor 300 DPI cetak tajam, SVG vektor & print 1:1 fisik
                </p>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div className='flex items-center flex-wrap gap-2'>
              <button
                onClick={() => handleDownloadPng(300)}
                disabled={isExporting}
                className='inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/30 transition disabled:opacity-50 cursor-pointer'
                title='Unduh PNG Resolusi Tinggi 300 DPI siap cetak'
              >
                <Download className='w-4 h-4' />
                {isExporting ? 'Memproses...' : 'Download PNG (300 DPI)'}
              </button>

              <button
                onClick={handleDownloadSvg}
                className='inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer'
                title='Unduh format vektor SVG murni untuk cutting sticker / akrilik'
              >
                <Layers className='w-4 h-4 text-emerald-400' />
                SVG Vektor
              </button>

              <button
                onClick={handlePrint}
                className='inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer'
                title='Cetak langsung skala 1:1 di printer'
              >
                <Printer className='w-4 h-4 text-sky-400' />
                Cetak 1:1
              </button>
            </div>
          </div>
        </header>

        {/* ─── KONTEN UTAMA DUA KOLOM ─── */}
        <main className='max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* ═══════════════════════════════════════════════════════════════════
              KOLOM KIRI: PANEL PENGATURAN & KUSTOMISASI (5 cols)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className='lg:col-span-5 space-y-4 no-print'>
            {/* Navigasi Tab Pengaturan */}
            <div className='flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold'>
              <button
                onClick={() => setActiveTab('konten')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'konten'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Type className='w-3.5 h-3.5' />
                Teks & Tipografi
              </button>

              <button
                onClick={() => setActiveTab('ukuran')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'ukuran'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className='w-3.5 h-3.5' />
                Ukuran & Padding
              </button>

              <button
                onClick={() => setActiveTab('warna')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'warna'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className='w-3.5 h-3.5' />
                Warna & Gaya
              </button>

              <button
                onClick={() => setActiveTab('batch')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'batch'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className='w-3.5 h-3.5' />
                Daftar Ruangan
              </button>
            </div>

            {/* TAB 1: TEKS & KONTEN */}
            {activeTab === 'konten' && (
              <div className='bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                  <h2 className='text-sm font-bold text-white flex items-center gap-2'>
                    <Type className='w-4 h-4 text-emerald-400' />
                    Pengaturan Teks Plang
                  </h2>
                  <span className='text-xs text-slate-400'>
                    Default: "RUANG KANTOR"
                  </span>
                </div>

                {/* Teks Utama */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between items-center'>
                    <label className='text-xs font-semibold text-slate-300'>
                      Teks Ruangan Utama:
                    </label>
                    <label className='inline-flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={forceUppercase}
                        onChange={(e) => setForceUppercase(e.target.checked)}
                        className='rounded accent-emerald-500'
                      />
                      Otomatis Kapital
                    </label>
                  </div>
                  <input
                    type='text'
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                    placeholder='Contoh: RUANG KANTOR'
                    className='w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  />
                </div>

                {/* Preset Cepat Nama Ruangan */}
                <div className='space-y-1.5'>
                  <span className='text-[11px] font-medium text-slate-400'>
                    Pilih Cepat Nama Ruangan Populer:
                  </span>
                  <div className='flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1'>
                    {ROOM_NAME_PRESETS.map((item, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => {
                          setTextTitle(item.title)
                          if (item.sub) setTextSub(item.sub)
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition cursor-pointer ${
                          textTitle === item.title
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subteks / Terjemahan Bahasa Inggris / Keterangan Opsional */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between items-center'>
                    <label className='text-xs font-semibold text-slate-300'>
                      Subteks / Keterangan Tambahan (Opsional):
                    </label>
                    {textSub && (
                      <button
                        type='button'
                        onClick={() => setTextSub('')}
                        className='text-[10px] text-rose-400 hover:underline'
                      >
                        Hapus Subteks
                      </button>
                    )}
                  </div>
                  <input
                    type='text'
                    value={textSub}
                    onChange={(e) => setTextSub(e.target.value)}
                    placeholder='Contoh: OFFICE ROOM / LANTAI 2 (Kosongkan jika tidak perlu)'
                    className='w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  />

                  {textSub && (
                    <div className='flex items-center justify-between p-2 bg-slate-900/70 rounded-lg border border-slate-800 text-xs'>
                      <div className='flex items-center gap-2'>
                        <input
                          type='color'
                          value={subtextColor}
                          onChange={(e) => setSubtextColor(e.target.value)}
                          className='w-6 h-6 rounded border border-slate-700 cursor-pointer bg-transparent'
                          title='Ubah warna subteks'
                        />
                        <span className='text-[11px] text-slate-300'>Warna Subteks:</span>
                        <span className='text-[11px] font-mono text-emerald-400'>{subtextColor}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <button
                          type='button'
                          onClick={() => setSubtextColor(textColor)}
                          className='text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          title='Samakan dengan warna teks utama'
                        >
                          Sama Teks Utama
                        </button>
                        {bgColor.toLowerCase() === '#ffffff' && (
                          <button
                            type='button'
                            onClick={() => setSubtextColor('#475569')}
                            className='text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          >
                            Abu Gelap
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pilihan Font & Weight */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800'>
                  <div className='space-y-1'>
                    <label className='text-xs font-semibold text-slate-300'>Gaya Huruf (Font):</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className='w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white'
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f.id} value={f.family}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='space-y-1'>
                    <label className='text-xs font-semibold text-slate-300'>Ketebalan (Weight):</label>
                    <select
                      value={fontWeight}
                      onChange={(e) => setFontWeight(e.target.value)}
                      className='w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white'
                    >
                      <option value='900'>900 - Extra Black (Sangat Tebal)</option>
                      <option value='800'>800 - Extra Bold (Standar Rambu)</option>
                      <option value='700'>700 - Bold</option>
                      <option value='600'>600 - Semi Bold</option>
                      <option value='500'>500 - Medium</option>
                    </select>
                  </div>
                </div>

                {/* Fitur Auto-Fit & Slider Ukuran Font */}
                <div className='space-y-3 pt-2 border-t border-slate-800'>
                  {/* Toggle Auto-Fit */}
                  <div className='flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800'>
                    <div>
                      <span className='text-xs font-semibold text-slate-200 block'>
                        Auto-Fit ke Dalam Kotak
                      </span>
                      <span className='text-[10px] text-slate-400'>
                        Otomatis menyesuaikan ukuran font agar pas dan tidak keluar dari garis border
                      </span>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={autoFitText}
                        onChange={(e) => setAutoFitText(e.target.checked)}
                        className='sr-only peer'
                      />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Slider Font Utama */}
                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>
                        {autoFitText ? 'Target / Batas Maksimal Font:' : 'Ukuran Font Teks Utama:'}
                      </span>
                      <span className='text-emerald-400 font-mono font-bold'>
                        {appliedTitleFontSize.toFixed(1)} mm (~{Math.round(appliedTitleFontSize / 0.3528)} pt)
                      </span>
                    </div>
                    <input
                      type='range'
                      min='8'
                      max='38'
                      step='0.5'
                      value={fontSizeTitleMm}
                      onChange={(e) => setFontSizeTitleMm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                    {autoFitText && appliedTitleFontSize < fontSizeTitleMm && (
                      <div className='text-[10px] text-amber-400/90 flex items-center gap-1'>
                        <span>⚡ Font otomatis dikecilkan ke {appliedTitleFontSize.toFixed(1)} mm agar tidak menabrak border.</span>
                      </div>
                    )}
                  </div>

                  {/* Slider Subteks */}
                  {textSub && (
                    <div className='space-y-1'>
                      <div className='flex justify-between text-xs'>
                        <span className='text-slate-300 font-semibold'>Ukuran Font Subteks:</span>
                        <span className='text-emerald-400 font-mono font-bold'>
                          {fontSizeSubMm} mm (~{Math.round(fontSizeSubMm / 0.3528)} pt)
                        </span>
                      </div>
                      <input
                        type='range'
                        min='4'
                        max='16'
                        step='0.5'
                        value={fontSizeSubMm}
                        onChange={(e) => setFontSizeSubMm(Number(e.target.value))}
                        className='w-full accent-emerald-500'
                      />
                    </div>
                  )}

                  {/* Slider Tracking / Spasi Huruf */}
                  <div className='space-y-1'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>Jarak Antar Huruf (Tracking):</span>
                      <span className='text-emerald-400 font-mono font-bold'>{letterSpacingMm} mm</span>
                    </div>
                    <input
                      type='range'
                      min='0'
                      max='5'
                      step='0.2'
                      value={letterSpacingMm}
                      onChange={(e) => setLetterSpacingMm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: UKURAN & PADDING */}
            {activeTab === 'ukuran' && (
              <div className='bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                  <h2 className='text-sm font-bold text-white flex items-center gap-2'>
                    <Sliders className='w-4 h-4 text-emerald-400' />
                    Dimensi & Ukuran Fisik (cm)
                  </h2>
                  <span className='text-xs text-emerald-400 font-mono font-bold'>
                    {widthCm} × {heightCm} cm (Pad: {paddingCm} cm)
                  </span>
                </div>

                {/* Preset Ukuran Papan */}
                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-slate-300'>Pilih Preset Ukuran Cepat:</label>
                  <div className='grid grid-cols-2 gap-2'>
                    {SIZE_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => {
                          setWidthCm(p.width)
                          setHeightCm(p.height)
                          setPaddingCm(p.padding)
                        }}
                        className={`text-left p-2 rounded-xl border text-xs transition cursor-pointer ${
                          widthCm === p.width && heightCm === p.height
                            ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <div className='font-semibold'>{p.width} × {p.height} cm</div>
                        <div className='text-[10px] text-slate-400 truncate'>{p.label.split('(')[1]?.replace(')', '') || 'Preset'}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Manual Panjang & Tinggi (cm) */}
                <div className='grid grid-cols-2 gap-4 pt-2 border-t border-slate-800'>
                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>Panjang (Lebar):</span>
                      <span className='text-emerald-400 font-mono font-bold'>{widthCm} cm</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input
                        type='number'
                        min='10'
                        max='100'
                        step='1'
                        value={widthCm}
                        onChange={(e) => setWidthCm(Math.max(5, Number(e.target.value)))}
                        className='w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm font-mono'
                      />
                      <span className='text-xs text-slate-400 font-bold'>cm</span>
                    </div>
                    <input
                      type='range'
                      min='15'
                      max='60'
                      step='1'
                      value={widthCm}
                      onChange={(e) => setWidthCm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                  </div>

                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>Tinggi Papan:</span>
                      <span className='text-emerald-400 font-mono font-bold'>{heightCm} cm</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input
                        type='number'
                        min='5'
                        max='50'
                        step='0.5'
                        value={heightCm}
                        onChange={(e) => setHeightCm(Math.max(4, Number(e.target.value)))}
                        className='w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm font-mono'
                      />
                      <span className='text-xs text-slate-400 font-bold'>cm</span>
                    </div>
                    <input
                      type='range'
                      min='6'
                      max='30'
                      step='0.5'
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                  </div>
                </div>

                {/* Pengaturan Padding 1 cm */}
                <div className='space-y-2 pt-2 border-t border-slate-800'>
                  <div className='flex justify-between items-center text-xs'>
                    <div>
                      <span className='text-slate-200 font-semibold block'>
                        Padding Garis Border Putih:
                      </span>
                      <span className='text-[11px] text-slate-400'>
                        Jarak dari tepi luar papan ke kotak garis border
                      </span>
                    </div>
                    <span className='text-emerald-400 font-mono font-bold text-sm bg-slate-900 px-2.5 py-1 rounded border border-slate-800'>
                      {paddingCm} cm ({paddingCm * 10} mm)
                    </span>
                  </div>

                  <div className='flex items-center gap-3'>
                    <input
                      type='range'
                      min='0.2'
                      max='3.5'
                      step='0.1'
                      value={paddingCm}
                      onChange={(e) => setPaddingCm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                    <button
                      type='button'
                      onClick={() => setPaddingCm(1)}
                      className='text-[10px] px-2 py-1 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded text-slate-300 shrink-0'
                      title='Kembalikan ke standar 1 cm'
                    >
                      Reset 1 cm
                    </button>
                  </div>
                </div>

                {/* Detail Border: Tebal & Radius */}
                <div className='grid grid-cols-2 gap-4 pt-2 border-t border-slate-800'>
                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>Tebal Garis Border:</span>
                      <span className='text-emerald-400 font-mono font-bold'>{borderThicknessMm} mm</span>
                    </div>
                    <input
                      type='range'
                      min='1'
                      max='8'
                      step='0.5'
                      value={borderThicknessMm}
                      onChange={(e) => setBorderThicknessMm(Number(e.target.value))}
                      className='w-full accent-emerald-500'
                    />
                  </div>

                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-slate-300 font-semibold'>Sudut Melengkung Papan:</span>
                      <span className='text-emerald-400 font-mono font-bold'>{boardCornerRadiusMm} mm</span>
                    </div>
                    <input
                      type='range'
                      min='0'
                      max='20'
                      step='1'
                      value={boardCornerRadiusMm}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        setBoardCornerRadiusMm(val)
                        setInnerCornerRadiusMm(Math.max(0, val - 2))
                      }}
                      className='w-full accent-emerald-500'
                    />
                  </div>
                </div>

                {/* Detail Lubang Baut / Sekrup Fisik */}
                <div className='pt-2 border-t border-slate-800 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <label className='inline-flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={showScrews}
                        onChange={(e) => setShowScrews(e.target.checked)}
                        className='rounded accent-emerald-500'
                      />
                      Tampilkan Titik Lubang Sekrup / Baut Sudut
                    </label>
                    <span className='text-[10px] text-slate-400'>
                      (Untuk plang akrilik / plat)
                    </span>
                  </div>

                  {showScrews && (
                    <div className='p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2'>
                      <div className='flex justify-between text-xs'>
                        <span className='text-slate-400'>Jarak baut dari sudut (offset):</span>
                        <span className='text-emerald-400 font-mono font-bold'>{screwInsetMm} mm</span>
                      </div>
                      <input
                        type='range'
                        min='3'
                        max='15'
                        step='1'
                        value={screwInsetMm}
                        onChange={(e) => setScrewInsetMm(Number(e.target.value))}
                        className='w-full accent-emerald-500'
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: WARNA & TAMPILAN */}
            {activeTab === 'warna' && (
              <div className='bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                  <h2 className='text-sm font-bold text-white flex items-center gap-2'>
                    <Palette className='w-4 h-4 text-emerald-400' />
                    Kustomisasi Warna Plang
                  </h2>
                  <span className='text-xs text-slate-400'>
                    Default: Hijau Jalur Cepat
                  </span>
                </div>

                {/* Palette Preset Standar Rambu */}
                <div className='space-y-2'>
                  <label className='text-xs font-semibold text-slate-300'>Pilihan Tema Warna Cepat:</label>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    {COLOR_PRESETS.map((c, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => {
                          setBgColor(c.bg)
                          setBorderColor(c.border)
                          setTextColor(c.text)
                          setSubtextColor(c.subtext || (c.text === '#000000' || c.text === '#0F172A' ? '#475569' : '#E2E8F0'))
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition cursor-pointer ${
                          bgColor.toLowerCase() === c.bg.toLowerCase()
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-850'
                        }`}
                      >
                        <div
                          className='w-6 h-6 rounded-lg shrink-0 border border-white/20 shadow-inner'
                          style={{ backgroundColor: c.bg }}
                        />
                        <div className='overflow-hidden'>
                          <div className='text-xs font-semibold text-slate-200 truncate'>{c.name}</div>
                          <div className='text-[10px] text-slate-400 truncate'>{c.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kustomisasi Manual Hex Picker */}
                <div className='pt-2 border-t border-slate-800 space-y-3'>
                  <span className='text-xs font-semibold text-slate-300 block'>
                    Kustomisasi Warna Bebas (Color Picker):
                  </span>

                  {/* Background */}
                  <div className='flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='color'
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className='w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent'
                      />
                      <div>
                        <div className='text-xs font-semibold text-slate-200'>Warna Latar (Background)</div>
                        <div className='text-[10px] text-slate-400'>Default: #007A3D (Hijau Jalur Cepat)</div>
                      </div>
                    </div>
                    <input
                      type='text'
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className='w-24 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-center text-emerald-400'
                    />
                  </div>

                  {/* Border Kotak Dalam */}
                  <div className='flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='color'
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className='w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent'
                      />
                      <div>
                        <div className='text-xs font-semibold text-slate-200'>Warna Garis Border Kotak</div>
                        <div className='text-[10px] text-slate-400'>Default: #FFFFFF (Putih)</div>
                      </div>
                    </div>
                    <input
                      type='text'
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className='w-24 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-center text-white'
                    />
                  </div>

                  {/* Teks Utama */}
                  <div className='flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='color'
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className='w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent'
                      />
                      <div>
                        <div className='text-xs font-semibold text-slate-200'>Warna Tulisan Teks</div>
                        <div className='text-[10px] text-slate-400'>Default: #FFFFFF (Putih)</div>
                      </div>
                    </div>
                    <input
                      type='text'
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className='w-24 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-center text-white'
                    />
                  </div>

                  {/* Warna Subteks */}
                  <div className='flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='color'
                        value={subtextColor}
                        onChange={(e) => setSubtextColor(e.target.value)}
                        className='w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent'
                      />
                      <div>
                        <div className='text-xs font-semibold text-slate-200'>Warna Subteks / Keterangan</div>
                        <div className='text-[10px] text-slate-400'>
                          {bgColor.toLowerCase() === '#ffffff'
                            ? 'Latar putih: gunakan warna kontras (#475569 atau #0F172A)'
                            : 'Default: #E2E8F0'}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <button
                        type='button'
                        onClick={() => setSubtextColor(textColor)}
                        className='text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                        title='Samakan dengan warna teks utama'
                      >
                        Sama Teks Utama
                      </button>
                      <input
                        type='text'
                        value={subtextColor}
                        onChange={(e) => setSubtextColor(e.target.value)}
                        className='w-24 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-center text-slate-300'
                      />
                    </div>
                  </div>
                </div>

                {/* Gaya Efek Visual & Border Style */}
                <div className='pt-2 border-t border-slate-800 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <label className='inline-flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={showInnerBorder}
                        onChange={(e) => setShowInnerBorder(e.target.checked)}
                        className='rounded accent-emerald-500'
                      />
                      Aktifkan Garis Border Dalam
                    </label>
                  </div>

                  <div className='flex items-center justify-between'>
                    <label className='inline-flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={showGlossEffect}
                        onChange={(e) => setShowGlossEffect(e.target.checked)}
                        className='rounded accent-emerald-500'
                      />
                      Efek Kilau Plat / Refleksi Cahaya Halus
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BATCH & DAFTAR RUANGAN */}
            {activeTab === 'batch' && (
              <div className='bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                  <h2 className='text-sm font-bold text-white flex items-center gap-2'>
                    <Grid className='w-4 h-4 text-emerald-400' />
                    Daftar Nama Ruangan Sekaligus
                  </h2>
                  <span className='text-xs text-slate-400'>
                    {batchList.length} Ruangan
                  </span>
                </div>

                <p className='text-xs text-slate-300'>
                  Ketik nama-nama ruangan satu per baris di bawah ini. Anda bisa langsung mengklik salah satu nama untuk mengubah plang seketika, atau mencetak semuanya!
                </p>

                <textarea
                  rows={6}
                  value={batchRoomsText}
                  onChange={(e) => setBatchRoomsText(e.target.value)}
                  placeholder='Ketik 1 nama ruangan per baris...'
                  className='w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
                />

                <div className='space-y-1.5'>
                  <div className='text-xs font-semibold text-slate-400'>Klik untuk melihat / terapkan ke plang:</div>
                  <div className='flex flex-wrap gap-1.5 max-h-40 overflow-y-auto'>
                    {batchList.map((room, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => handleSelectBatch(room)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                          textTitle.toUpperCase() === room.toUpperCase()
                            ? 'bg-emerald-600 text-white font-bold border-emerald-400'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tombol Reset Default */}
            <div className='pt-2 flex justify-between items-center text-xs text-slate-500'>
              <span>Sesuai spesifikasi: 25×10 cm, pad 1cm, hijau jalur cepat.</span>
              <button
                type='button'
                onClick={() => {
                  setWidthCm(25)
                  setHeightCm(10)
                  setPaddingCm(1)
                  setBgColor('#007A3D')
                  setBorderColor('#FFFFFF')
                  setTextColor('#FFFFFF')
                  setTextTitle('RUANG KANTOR')
                  setTextSub('')
                  setBorderThicknessMm(3)
                  setBoardCornerRadiusMm(6)
                  setFontSizeTitleMm(20)
                  setFontSizeSubMm(7)
                  setLetterSpacingMm(1.2)
                  setAutoFitText(true)
                  setShowScrews(false)
                }}
                className='text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer'
              >
                <RefreshCw className='w-3 h-3' />
                Reset ke Spesifikasi Default
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              KOLOM KANAN: LIVE PREVIEW PLANG & DOWNLOAD AREA (7 cols)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className='lg:col-span-7 space-y-6'>
            {/* Kartu Preview */}
            <div className='bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden'>
              {/* Header Preview bar */}
              <div className='flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 no-print'>
                <div className='flex items-center gap-2'>
                  <div className='w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse' />
                  <h3 className='text-sm font-bold text-white'>
                    Live Signboard Preview
                  </h3>
                  <span className='text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800'>
                    {widthCm} × {heightCm} cm
                  </span>
                </div>

                {/* Kontrol Zoom Preview */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => setZoomScale((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
                    className='p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs'
                    title='Perkecil tampilan'
                  >
                    <ZoomOut className='w-3.5 h-3.5' />
                  </button>
                  <span className='text-xs font-mono text-slate-400 w-12 text-center'>
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomScale((z) => Math.min(2.0, Number((z + 0.1).toFixed(1))))}
                    className='p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs'
                    title='Perbesar tampilan'
                  >
                    <ZoomIn className='w-3.5 h-3.5' />
                  </button>
                  <button
                    onClick={() => setZoomScale(1)}
                    className='text-[11px] px-2 py-1 rounded bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* Area Tampilan Papan Penanda (Interactive Canvas/SVG Container) */}
              <div className='py-8 px-2 flex items-center justify-center min-h-[300px] overflow-x-auto bg-slate-900/50 rounded-xl border border-dashed border-slate-800/80 my-4'>
                <div
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className='drop-shadow-2xl'
                >
                  {/* ─────────────────────────────────────────────────────────────
                      KOMPONEN SVG MASTER PLANG RUANGAN (100% VECTOR & PHYSICAL UNITS)
                     ───────────────────────────────────────────────────────────── */}
                  <svg
                    ref={svgRef}
                    id='penanda-ruangan-svg'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox={`0 0 ${widthMm} ${heightMm}`}
                    width={`${widthMm}mm`}
                    height={`${heightMm}mm`}
                    style={{
                      display: 'block',
                      maxWidth: '100%',
                      height: 'auto',
                      filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45))'
                    }}
                  >
                    <defs>
                      {/* Gradient Refleksi Kilau Halus Papan Rambu */}
                      <linearGradient id='signGlossGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#FFFFFF' stopOpacity={showGlossEffect ? '0.18' : '0'} />
                        <stop offset='40%' stopColor='#FFFFFF' stopOpacity='0.0' />
                        <stop offset='100%' stopColor='#000000' stopOpacity={showGlossEffect ? '0.2' : '0'} />
                      </linearGradient>

                      {/* Baut Stainless Krom */}
                      <radialGradient id='screwGrad' cx='35%' cy='35%' r='65%'>
                        <stop offset='0%' stopColor='#FFFFFF' />
                        <stop offset='45%' stopColor='#CBD5E1' />
                        <stop offset='85%' stopColor='#475569' />
                        <stop offset='100%' stopColor='#1E293B' />
                      </radialGradient>
                    </defs>

                    {/* 1. LATAR BELAKANG PAPAN UTAMA (Warna Hijau Jalur Cepat / Kustom) */}
                    <rect
                      x='0'
                      y='0'
                      width={widthMm}
                      height={heightMm}
                      rx={boardCornerRadiusMm}
                      ry={boardCornerRadiusMm}
                      fill={bgColor}
                    />

                    {/* 2. OVERLAY KILAU CAHAYA ELEGAN */}
                    {showGlossEffect && (
                      <rect
                        x='0'
                        y='0'
                        width={widthMm}
                        height={heightMm}
                        rx={boardCornerRadiusMm}
                        ry={boardCornerRadiusMm}
                        fill='url(#signGlossGrad)'
                        pointerEvents='none'
                      />
                    )}

                    {/* 3. KOTAK BORDER DALAM WARNA PUTIH DENGAN PADDING 1 CM */}
                    {showInnerBorder && innerW > 0 && innerH > 0 && (
                      <rect
                        x={innerX}
                        y={innerY}
                        width={innerW}
                        height={innerH}
                        rx={innerCornerRadiusMm}
                        ry={innerCornerRadiusMm}
                        fill='none'
                        stroke={borderColor}
                        strokeWidth={borderThicknessMm}
                        strokeDasharray={borderStyle === 'dashed' ? '6,3' : 'none'}
                      />
                    )}

                    {/* 4. TEKS RUANGAN (Posisikan di Tengah Kotak Border) */}
                    <g>
                      {textSub ? (
                        // Jika ada Subteks (Judul agak ke atas, subteks di bawahnya)
                        <>
                          <text
                            x={widthMm / 2}
                            y={heightMm / 2 - (fontSizeSubMm * 0.7 + 2)}
                            textAnchor='middle'
                            dominantBaseline='central'
                            fill={textColor}
                            fontFamily={fontFamily}
                            fontWeight={fontWeight}
                            fontSize={appliedTitleFontSize}
                            letterSpacing={letterSpacingMm}
                            {...(needsTitleCompression ? { textLength: safeW, lengthAdjust: 'spacingAndGlyphs' } : {})}
                          >
                            {displayedTitle}
                          </text>

                          <text
                            x={widthMm / 2}
                            y={heightMm / 2 + (appliedTitleFontSize * 0.5 + 4)}
                            textAnchor='middle'
                            dominantBaseline='central'
                            fill={subtextColor}
                            fontFamily={fontFamily}
                            fontWeight='600'
                            fontSize={fontSizeSubMm}
                            letterSpacing={letterSpacingMm * 0.6}
                            opacity={0.95}
                          >
                            {textSub}
                          </text>
                        </>
                      ) : (
                        // Hanya Teks Utama di Persis Tengah Sumbu X dan Y
                        <text
                          x={widthMm / 2}
                          y={heightMm / 2}
                          textAnchor='middle'
                          dominantBaseline='central'
                          fill={textColor}
                          fontFamily={fontFamily}
                          fontWeight={fontWeight}
                          fontSize={appliedTitleFontSize}
                          letterSpacing={letterSpacingMm}
                          {...(needsTitleCompression ? { textLength: safeW, lengthAdjust: 'spacingAndGlyphs' } : {})}
                        >
                          {displayedTitle}
                        </text>
                      )}
                    </g>

                    {/* 5. TITIK BAUT / SEKRUP REALISTIS DI 4 SUDUT (OPSIONAL) */}
                    {showScrews && (
                      <g>
                        {/* Kiri Atas */}
                        <circle cx={screwInsetMm} cy={screwInsetMm} r='2.2' fill='url(#screwGrad)' stroke='#0F172A' strokeWidth='0.3' />
                        <line x1={screwInsetMm - 1.2} y1={screwInsetMm} x2={screwInsetMm + 1.2} y2={screwInsetMm} stroke='#1E293B' strokeWidth='0.4' />
                        
                        {/* Kanan Atas */}
                        <circle cx={widthMm - screwInsetMm} cy={screwInsetMm} r='2.2' fill='url(#screwGrad)' stroke='#0F172A' strokeWidth='0.3' />
                        <line x1={widthMm - screwInsetMm - 1.2} y1={screwInsetMm} x2={widthMm - screwInsetMm + 1.2} y2={screwInsetMm} stroke='#1E293B' strokeWidth='0.4' />
                        
                        {/* Kiri Bawah */}
                        <circle cx={screwInsetMm} cy={heightMm - screwInsetMm} r='2.2' fill='url(#screwGrad)' stroke='#0F172A' strokeWidth='0.3' />
                        <line x1={screwInsetMm - 1.2} y1={heightMm - screwInsetMm} x2={screwInsetMm + 1.2} y2={heightMm - screwInsetMm} stroke='#1E293B' strokeWidth='0.4' />
                        
                        {/* Kanan Bawah */}
                        <circle cx={widthMm - screwInsetMm} cy={heightMm - screwInsetMm} r='2.2' fill='url(#screwGrad)' stroke='#0F172A' strokeWidth='0.3' />
                        <line x1={widthMm - screwInsetMm - 1.2} y1={heightMm - screwInsetMm} x2={widthMm - screwInsetMm + 1.2} y2={heightMm - screwInsetMm} stroke='#1E293B' strokeWidth='0.4' />
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Rincian Spesifikasi & Dimensi Riil */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs no-print'>
                <div className='bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80'>
                  <span className='text-slate-400 block text-[10px]'>Dimensi Fisik</span>
                  <span className='text-white font-bold font-mono text-sm'>
                    {widthCm} × {heightCm} cm
                  </span>
                </div>

                <div className='bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80'>
                  <span className='text-slate-400 block text-[10px]'>Padding Kotak</span>
                  <span className='text-emerald-400 font-bold font-mono text-sm'>
                    {paddingCm} cm ({paddingMm} mm)
                  </span>
                </div>

                <div className='bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80'>
                  <span className='text-slate-400 block text-[10px]'>Pixel @ 300 DPI</span>
                  <span className='text-slate-300 font-bold font-mono text-sm'>
                    {Math.round((widthMm / 25.4) * 300)} × {Math.round((heightMm / 25.4) * 300)} px
                  </span>
                </div>

                <div className='bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80'>
                  <span className='text-slate-400 block text-[10px]'>Warna Latar</span>
                  <span className='text-emerald-400 font-bold font-mono text-sm flex items-center gap-1'>
                    <span className='w-3 h-3 rounded-full inline-block border border-white/20' style={{ backgroundColor: bgColor }} />
                    {bgColor.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Action Buttons Panel */}
              <div className='pt-5 flex flex-wrap gap-3 items-center justify-between no-print'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleDownloadPng(300)}
                    disabled={isExporting}
                    className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 transition disabled:opacity-50 cursor-pointer'
                  >
                    <Download className='w-4 h-4' />
                    {isExporting ? 'Membuat File HD...' : 'Download Gambar PNG (300 DPI)'}
                  </button>

                  <button
                    onClick={handleDownloadSvg}
                    className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition cursor-pointer'
                  >
                    <Layers className='w-4 h-4 text-emerald-400' />
                    SVG Vektor
                  </button>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={handleCopySvgCode}
                    className='inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition cursor-pointer'
                    title='Salin kode SVG langsung ke clipboard'
                  >
                    {copiedStatus ? <Check className='w-3.5 h-3.5 text-emerald-400' /> : <Copy className='w-3.5 h-3.5' />}
                    {copiedStatus ? 'Tersalin!' : 'Copy SVG'}
                  </button>

                  <button
                    onClick={handlePrint}
                    className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition cursor-pointer'
                  >
                    <Printer className='w-3.5 h-3.5 text-sky-400' />
                    Print 1:1 Kertas
                  </button>
                </div>
              </div>
            </div>

            {/* Panduan & Informasi Penggunaan */}
            <div className='bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-3 text-xs text-slate-400 no-print'>
              <h4 className='font-bold text-slate-200 flex items-center gap-2'>
                <Info className='w-4 h-4 text-sky-400' />
                Petunjuk Cetak & Pemasangan:
              </h4>
              <ul className='space-y-1.5 list-disc pl-4 text-slate-300 leading-relaxed'>
                <li>
                  <strong>Ukuran Presisi:</strong> Panjang 25 cm dan tinggi 10 cm dengan padding border 1 cm telah dihitung secara matematis tepat skala 1:1.
                </li>
                <li>
                  <strong>Bahan Rekomendasi:</strong>
                  <ul className='list-circle pl-4 mt-1 space-y-0.5 text-slate-400'>
                    <li>• Akrilik Bening/Hijau tebal 2mm - 3mm dengan stiker cutting oracal / print UV.</li>
                    <li>• Plat Alumunium composite panel (ACP) untuk ketahanan luar/dalam ruangan.</li>
                    <li>• Kertas Art Carton 260/310 gsm dilaminasi doff/glossy untuk penggunaan cepat di pintu.</li>
                  </ul>
                </li>
                <li>
                  <strong>Ekspor Vektor SVG:</strong> Format SVG murni dapat langsung dibuka di CorelDraw, Adobe Illustrator, atau software laser cutting / cutting sticker plotter tanpa pecah sedikitpun.
                </li>
                <li>
                  <strong>Ekspor PNG 300 DPI:</strong> Menggunakan resolusi percetakan 300 titik per inci ({Math.round((widthMm / 25.4) * 300)} × {Math.round((heightMm / 25.4) * 300)} px) sehingga hasil cetak tajam bebas pixelated.
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* ═══════════════════════════════════════════════════════════════════
            TARGET CETAK PRINTER KHUSUS (@media print)
           ═══════════════════════════════════════════════════════════════════ */}
        <div className='print-only' style={{ display: 'none' }}>
          <div
            style={{
              width: `${widthMm}mm`,
              height: `${heightMm}mm`,
              boxSizing: 'border-box',
              position: 'relative',
              backgroundColor: bgColor,
              borderRadius: `${boardCornerRadiusMm}mm`,
              overflow: 'hidden',
              margin: '10mm auto',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            {/* Border kotak dalam */}
            {showInnerBorder && (
              <div
                style={{
                  position: 'absolute',
                  left: `${innerX}mm`,
                  top: `${innerY}mm`,
                  width: `${innerW}mm`,
                  height: `${innerH}mm`,
                  boxSizing: 'border-box',
                  border: `${borderThicknessMm}mm solid ${borderColor}`,
                  borderRadius: `${innerCornerRadiusMm}mm`
                }}
              />
            )}

            {/* Tulisan Teks */}
            <div
              style={{
                position: 'absolute',
                left: `${innerX}mm`,
                top: `${innerY}mm`,
                width: `${innerW}mm`,
                height: `${innerH}mm`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor,
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                textAlign: 'center',
                boxSizing: 'border-box',
                padding: '2mm'
              }}
            >
              <div
                style={{
                  fontSize: `${appliedTitleFontSize}mm`,
                  letterSpacing: `${letterSpacingMm}mm`,
                  lineHeight: 1.1,
                  maxWidth: '100%',
                  wordBreak: 'break-word'
                }}
              >
                {displayedTitle}
              </div>
              {textSub && (
                <div
                  style={{
                    fontSize: `${fontSizeSubMm}mm`,
                    letterSpacing: `${letterSpacingMm * 0.6}mm`,
                    color: subtextColor,
                    marginTop: '2mm',
                    fontWeight: '600'
                  }}
                >
                  {textSub}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CSS Khusus Print 1:1 Fisik */}
        <style>{`
          @media print {
            body, html, main, #__docusaurus {
              background: #ffffff !important;
              color: #000000 !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            .no-print,
            header,
            footer,
            nav,
            .navbar,
            .footer {
              display: none !important;
            }

            .print-only {
              display: block !important;
            }

            @page {
              size: A4 portrait;
              margin: 10mm;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

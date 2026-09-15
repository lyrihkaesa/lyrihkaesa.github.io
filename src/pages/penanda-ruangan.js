import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import Head from '@docusaurus/Head'

// ─── PALET PRESET WARNA STANDAR RAMBU FISIK & KANTOR ─────────────────────────
const COLOR_PRESETS = [
  {
    id: 'jalur-cepat',
    name: 'Hijau Jalur Cepat',
    sub: 'Standar rambu keselamatan tol',
    bg: '#007A3D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0',
    tag: 'Standar'
  },
  {
    id: 'hijau-daun',
    name: 'Hijau Daun Segar',
    sub: 'Nuansa hijau kontemporer',
    bg: '#15803D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0',
    tag: 'Modern'
  },
  {
    id: 'biru-rambu',
    name: 'Biru Rambu Informasi',
    sub: 'Penunjuk arah fasilitas umum',
    bg: '#005596',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#E2E8F0',
    tag: 'Publik'
  },
  {
    id: 'biru-navy',
    name: 'Biru Navy Eksekutif',
    sub: 'Papan kantor korporat resmi',
    bg: '#1E293B',
    border: '#E2E8F0',
    text: '#F8FAFC',
    subtext: '#94A3B8',
    tag: 'Korporat'
  },
  {
    id: 'merah-bahaya',
    name: 'Merah Larangan / Darurat',
    sub: 'Panel listrik & tanggap darurat',
    bg: '#B91C1C',
    border: '#FFFFFF',
    text: '#FFFFFF',
    subtext: '#FEE2E2',
    tag: 'K3 / Kritis'
  },
  {
    id: 'kuning-hazard',
    name: 'Kuning Hazard Kontras',
    sub: 'Perhatian & kehati-hatian',
    bg: '#EAB308',
    border: '#000000',
    text: '#000000',
    subtext: '#3F3F46',
    tag: 'Peringatan'
  },
  {
    id: 'hitam-matte',
    name: 'Hitam Matte Akrilik',
    sub: 'Arsitektural minimalis modern',
    bg: '#18181B',
    border: '#F4F4F5',
    text: '#FFFFFF',
    subtext: '#A1A1AA',
    tag: 'Premium'
  },
  {
    id: 'putih-bersih',
    name: 'Putih Bersih (Monokrom)',
    sub: 'Teks & garis hitam tegas',
    bg: '#FFFFFF',
    border: '#0F172A',
    text: '#0F172A',
    subtext: '#475569',
    tag: 'Minimal'
  },
  {
    id: 'kuningan-gold',
    name: 'Kuningan / Gold Brass',
    sub: 'Plang hotel & ruang pimpinan',
    bg: '#92400E',
    border: '#FEF3C7',
    text: '#FFFBEB',
    subtext: '#FDE68A',
    tag: 'Klasik'
  }
]

// ─── PRESET DIMENSI STANDAR INDUSTRI & CETAK ────────────────────────────────
const SIZE_PRESETS = [
  { label: '25 × 10 cm', note: 'Standar Jalur Cepat', width: 25, height: 10, padding: 1 },
  { label: '30 × 10 cm', note: 'Pintu Kantor Standar', width: 30, height: 10, padding: 1 },
  { label: '30 × 15 cm', note: 'Jarak Pandang Jauh', width: 30, height: 15, padding: 1.2 },
  { label: '20 × 8 cm', note: 'Kompak Minimalis', width: 20, height: 8, padding: 0.8 },
  { label: '35 × 12 cm', note: 'Papan Koridor Lebar', width: 35, height: 12, padding: 1.2 },
  { label: '40 × 15 cm', note: 'Aula & Ruang Sidang', width: 40, height: 15, padding: 1.5 }
]

// ─── PRESET NAMA RUANGAN UMUM ───────────────────────────────────────────────
const ROOM_NAME_PRESETS = [
  { title: 'RUANG KANTOR', sub: 'OFFICE' },
  { title: 'RUANG RAPAT', sub: 'MEETING ROOM' },
  { title: 'RUANG DIREKSI', sub: 'BOARD ROOM' },
  { title: 'RUANG KEPALA', sub: 'DIRECTOR OFFICE' },
  { title: 'RUANG GURU', sub: 'FACULTY ROOM' },
  { title: 'RUANG STAFF', sub: 'STAFF ONLY' },
  { title: 'LABORATORIUM', sub: 'LABORATORY' },
  { title: 'RUANG SERVER', sub: 'DATA CENTER' },
  { title: 'GUDANG', sub: 'STORAGE' },
  { title: 'RUANG TAMU', sub: 'GUEST ROOM' },
  { title: 'RUANG KESEHATAN', sub: 'FIRST AID / UKS' },
  { title: 'TOILET PRIA', sub: 'MALE RESTROOM' },
  { title: 'TOILET WANITA', sub: 'FEMALE RESTROOM' },
  { title: 'MUSHOLA', sub: 'PRAYER ROOM' },
  { title: 'PANTRY', sub: 'PANTRY' },
  { title: 'AREA BEBAS ROKOK', sub: 'NO SMOKING' }
]

// ─── PILIHAN TIPOGRAFI RAMBU ────────────────────────────────────────────────
const FONT_OPTIONS = [
  {
    id: 'grotesk-sign',
    name: 'DIN / Transport Grotesk (Rekomendasi Rambu)',
    family: '"SF Pro Display", "Geist Sans", "Segoe UI", system-ui, sans-serif'
  },
  {
    id: 'block-heavy',
    name: 'Highway Gothic / Blok Tebal',
    family: '"Arial Black", Impact, "Trebuchet MS", sans-serif'
  },
  {
    id: 'clean-geometric',
    name: 'Geometric Modern / Netral',
    family: '"Trebuchet MS", "Helvetica Neue", Arial, sans-serif'
  },
  {
    id: 'condensed',
    name: 'Condensed / Efisien Horizontal',
    family: '"Arial Narrow", "Helvetica Condensed", sans-serif'
  },
  {
    id: 'serif-editorial',
    name: 'Klasik Formal / Serif Institusi',
    family: 'Georgia, "Times New Roman", Times, serif'
  },
  {
    id: 'mono-industrial',
    name: 'Monospace / Industrial Terminal',
    family: '"SF Mono", "Geist Mono", "JetBrains Mono", Menlo, Consolas, monospace'
  }
]

// ─── DEFAULT SPESIFIKASI AWAL (UNTUK RESET LOCALSTORAGE) ────────────────────
const DEFAULT_CONFIG = {
  widthCm: 25,
  heightCm: 10,
  paddingCm: 1,
  boardCornerRadiusMm: 6,
  innerCornerRadiusMm: 4,
  borderThicknessMm: 3,
  bgColor: '#007A3D',
  borderColor: '#FFFFFF',
  textColor: '#FFFFFF',
  subtextColor: '#E2E8F0',
  textTitle: 'RUANG KANTOR',
  textSub: '',
  forceUppercase: true,
  fontFamily: FONT_OPTIONS[0].family,
  fontWeight: '800',
  fontSizeTitleMm: 20,
  fontSizeSubMm: 7,
  letterSpacingMm: 1.2,
  autoFitText: true,
  showScrews: false,
  screwInsetMm: 5,
  showGlossEffect: true,
  showInnerBorder: true,
  borderStyle: 'solid',
  batchRoomsText: 'RUANG KANTOR\nRUANG RAPAT\nRUANG GURU\nLABORATORIUM\nRUANG SERVER\nGUDANG'
}

const STORAGE_KEY = 'penanda_ruangan_config_v1'

export default function PenandaRuanganPage() {
  // ─── STATE DIMENSI FISIK (cm & mm) ─────────────────────────────────────────
  const [widthCm, setWidthCm] = useState(DEFAULT_CONFIG.widthCm)
  const [heightCm, setHeightCm] = useState(DEFAULT_CONFIG.heightCm)
  const [paddingCm, setPaddingCm] = useState(DEFAULT_CONFIG.paddingCm)
  const [boardCornerRadiusMm, setBoardCornerRadiusMm] = useState(DEFAULT_CONFIG.boardCornerRadiusMm)
  const [innerCornerRadiusMm, setInnerCornerRadiusMm] = useState(DEFAULT_CONFIG.innerCornerRadiusMm)
  const [borderThicknessMm, setBorderThicknessMm] = useState(DEFAULT_CONFIG.borderThicknessMm)

  // ─── STATE WARNA ELEMEN FISIK ──────────────────────────────────────────────
  const [bgColor, setBgColor] = useState(DEFAULT_CONFIG.bgColor)
  const [borderColor, setBorderColor] = useState(DEFAULT_CONFIG.borderColor)
  const [textColor, setTextColor] = useState(DEFAULT_CONFIG.textColor)
  const [subtextColor, setSubtextColor] = useState(DEFAULT_CONFIG.subtextColor)

  // ─── STATE KONTEN TEKS & TIPOGRAFI ─────────────────────────────────────────
  const [textTitle, setTextTitle] = useState(DEFAULT_CONFIG.textTitle)
  const [textSub, setTextSub] = useState(DEFAULT_CONFIG.textSub)
  const [forceUppercase, setForceUppercase] = useState(DEFAULT_CONFIG.forceUppercase)
  const [fontFamily, setFontFamily] = useState(DEFAULT_CONFIG.fontFamily)
  const [fontWeight, setFontWeight] = useState(DEFAULT_CONFIG.fontWeight)
  const [fontSizeTitleMm, setFontSizeTitleMm] = useState(DEFAULT_CONFIG.fontSizeTitleMm)
  const [fontSizeSubMm, setFontSizeSubMm] = useState(DEFAULT_CONFIG.fontSizeSubMm)
  const [letterSpacingMm, setLetterSpacingMm] = useState(DEFAULT_CONFIG.letterSpacingMm)
  const [autoFitText, setAutoFitText] = useState(DEFAULT_CONFIG.autoFitText)

  // ─── STATE HARDWARE & FINISHING FISIK ──────────────────────────────────────
  const [showScrews, setShowScrews] = useState(DEFAULT_CONFIG.showScrews)
  const [screwInsetMm, setScrewInsetMm] = useState(DEFAULT_CONFIG.screwInsetMm)
  const [showGlossEffect, setShowGlossEffect] = useState(DEFAULT_CONFIG.showGlossEffect)
  const [showInnerBorder, setShowInnerBorder] = useState(DEFAULT_CONFIG.showInnerBorder)
  const [borderStyle, setBorderStyle] = useState(DEFAULT_CONFIG.borderStyle)

  // ─── STATE WORKBENCH & NAVIGASI ────────────────────────────────────────────
  const [inspectorTab, setInspectorTab] = useState('papan') // 'papan' | 'batch' | 'backup' | 'spesifikasi'
  const [zoomScale, setZoomScale] = useState(1)
  const [showRulers, setShowRulers] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [copiedStatus, setCopiedStatus] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [batchRoomsText, setBatchRoomsText] = useState(DEFAULT_CONFIG.batchRoomsText)

  // ─── STATE PERSISTENSI LOCALSTORAGE & CADANGAN JSON ────────────────────────
  const [isReady, setIsReady] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const [jsonInputText, setJsonInputText] = useState('')
  const [jsonError, setJsonError] = useState(null)

  const svgRef = useRef(null)
  const fileInputRef = useRef(null)

  // ─── MATEMATIKA SATUAN FISIK (cm -> mm) ───────────────────────────────────
  const widthMm = useMemo(() => Math.max(20, widthCm * 10), [widthCm])
  const heightMm = useMemo(() => Math.max(10, heightCm * 10), [heightCm])
  const paddingMm = useMemo(() => Math.max(0, paddingCm * 10), [paddingCm])

  const innerX = paddingMm
  const innerY = paddingMm
  const innerW = Math.max(0, widthMm - paddingMm * 2)
  const innerH = Math.max(0, heightMm - paddingMm * 2)

  const displayedTitle = forceUppercase ? (textTitle || '').toUpperCase() : textTitle

  // Batas aman penempatan tipografi di dalam kotak border
  const safeW = Math.max(15, innerW - 14)
  const safeH = textSub ? Math.max(8, innerH * 0.42) : Math.max(8, innerH * 0.58)

  // Perhitungan adaptif ukuran huruf agar tidak menabrak batas garis border
  const appliedTitleFontSize = useMemo(() => {
    if (!autoFitText) return fontSizeTitleMm
    const len = Math.max(1, displayedTitle.length)
    const charWidthRatio = 0.62
    const maxHFromWidth = Math.max(5, (safeW - (len - 1) * letterSpacingMm) / (len * charWidthRatio))
    return Math.min(fontSizeTitleMm, safeH, maxHFromWidth)
  }, [autoFitText, fontSizeTitleMm, safeW, safeH, displayedTitle, letterSpacingMm])

  const estimatedTitleWidth = useMemo(() => {
    const len = displayedTitle.length
    return len * (appliedTitleFontSize * 0.62) + (len - 1) * letterSpacingMm
  }, [displayedTitle, appliedTitleFontSize, letterSpacingMm])

  const needsTitleCompression = estimatedTitleWidth > safeW

  // Hitungan resolusi pixel pada 300 DPI fisik (1 in = 25.4 mm)
  const pxWidth300Dpi = Math.round((widthMm / 25.4) * 300)
  const pxHeight300Dpi = Math.round((heightMm / 25.4) * 300)

  // Daftar batch ruangan dari textarea
  const batchList = useMemo(() => {
    return batchRoomsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [batchRoomsText])

  // Shortcut Keyboard (Ctrl+P / Cmd+P -> Cetak, Ctrl+S / Cmd+S -> Download PNG)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        window.print()
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handleDownloadPng(300)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [widthMm, heightMm, displayedTitle])

  // ─── EKSPOR PNG 300 DPI (RESOLUSI FISIK PERCETAKAN) ───────────────────────
  const handleDownloadPng = async (dpi = 300) => {
    try {
      setIsExporting(true)
      const svgElement = svgRef.current
      if (!svgElement) return

      const targetWidthPx = Math.round((widthMm / 25.4) * dpi)
      const targetHeightPx = Math.round((heightMm / 25.4) * dpi)

      const serializer = new XMLSerializer()
      let svgString = serializer.serializeToString(svgElement)

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

      image.onerror = () => {
        alert('Gagal menghasilkan file PNG. Silakan gunakan format unduh SVG.')
        setIsExporting(false)
      }

      image.src = blobURL
    } catch (e) {
      alert('Terjadi kesalahan ekspor: ' + e.message)
      setIsExporting(false)
    }
  }

  // ─── EKSPOR SVG VEKTOR MURNI ──────────────────────────────────────────────
  const handleDownloadSvg = () => {
    try {
      const svgElement = svgRef.current
      if (!svgElement) return

      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)
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

  // ─── SALIN SVG KE PAPAN KLIP ──────────────────────────────────────────────
  const handleCopySvgCode = async () => {
    try {
      const svgElement = svgRef.current
      if (!svgElement) return
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)
      await navigator.clipboard.writeText(svgString)
      setCopiedStatus(true)
      setTimeout(() => setCopiedStatus(false), 2200)
    } catch {
      alert('Gagal menyalin kode SVG.')
    }
  }

  // ─── SISTEM NOTIFIKASI TOAST ──────────────────────────────────────────────
  const showNotification = (msg) => {
    setToastMsg(msg)
    if (typeof window !== 'undefined') {
      if (window._penandaToastTimer) clearTimeout(window._penandaToastTimer)
      window._penandaToastTimer = setTimeout(() => {
        setToastMsg(null)
      }, 2600)
    }
  }

  // ─── AMBIL OBJEK KONFIGURASI SAAT INI ─────────────────────────────────────
  const getCurrentConfig = useCallback(() => {
    return {
      widthCm,
      heightCm,
      paddingCm,
      boardCornerRadiusMm,
      innerCornerRadiusMm,
      borderThicknessMm,
      bgColor,
      borderColor,
      textColor,
      subtextColor,
      textTitle,
      textSub,
      forceUppercase,
      fontFamily,
      fontWeight,
      fontSizeTitleMm,
      fontSizeSubMm,
      letterSpacingMm,
      autoFitText,
      showScrews,
      screwInsetMm,
      showGlossEffect,
      showInnerBorder,
      borderStyle,
      batchRoomsText
    }
  }, [
    widthCm,
    heightCm,
    paddingCm,
    boardCornerRadiusMm,
    innerCornerRadiusMm,
    borderThicknessMm,
    bgColor,
    borderColor,
    textColor,
    subtextColor,
    textTitle,
    textSub,
    forceUppercase,
    fontFamily,
    fontWeight,
    fontSizeTitleMm,
    fontSizeSubMm,
    letterSpacingMm,
    autoFitText,
    showScrews,
    screwInsetMm,
    showGlossEffect,
    showInnerBorder,
    borderStyle,
    batchRoomsText
  ])

  // ─── TERAPKAN OBJEK KONFIGURASI KE STATE ───────────────────────────────────
  const applyConfigObject = useCallback((config, showToast = true) => {
    if (!config || typeof config !== 'object') return false
    try {
      if (typeof config.widthCm === 'number') setWidthCm(config.widthCm)
      if (typeof config.heightCm === 'number') setHeightCm(config.heightCm)
      if (typeof config.paddingCm === 'number') setPaddingCm(config.paddingCm)
      if (typeof config.boardCornerRadiusMm === 'number') setBoardCornerRadiusMm(config.boardCornerRadiusMm)
      if (typeof config.innerCornerRadiusMm === 'number') setInnerCornerRadiusMm(config.innerCornerRadiusMm)
      if (typeof config.borderThicknessMm === 'number') setBorderThicknessMm(config.borderThicknessMm)

      if (typeof config.bgColor === 'string') setBgColor(config.bgColor)
      if (typeof config.borderColor === 'string') setBorderColor(config.borderColor)
      if (typeof config.textColor === 'string') setTextColor(config.textColor)
      if (typeof config.subtextColor === 'string') setSubtextColor(config.subtextColor)

      if (typeof config.textTitle === 'string') setTextTitle(config.textTitle)
      if (typeof config.textSub === 'string') setTextSub(config.textSub)
      if (typeof config.forceUppercase === 'boolean') setForceUppercase(config.forceUppercase)
      if (typeof config.fontFamily === 'string') setFontFamily(config.fontFamily)
      if (typeof config.fontWeight === 'string' || typeof config.fontWeight === 'number') setFontWeight(String(config.fontWeight))
      if (typeof config.fontSizeTitleMm === 'number') setFontSizeTitleMm(config.fontSizeTitleMm)
      if (typeof config.fontSizeSubMm === 'number') setFontSizeSubMm(config.fontSizeSubMm)
      if (typeof config.letterSpacingMm === 'number') setLetterSpacingMm(config.letterSpacingMm)
      if (typeof config.autoFitText === 'boolean') setAutoFitText(config.autoFitText)

      if (typeof config.showScrews === 'boolean') setShowScrews(config.showScrews)
      if (typeof config.screwInsetMm === 'number') setScrewInsetMm(config.screwInsetMm)
      if (typeof config.showGlossEffect === 'boolean') setShowGlossEffect(config.showGlossEffect)
      if (typeof config.showInnerBorder === 'boolean') setShowInnerBorder(config.showInnerBorder)
      if (typeof config.borderStyle === 'string') setBorderStyle(config.borderStyle)
      if (typeof config.batchRoomsText === 'string') setBatchRoomsText(config.batchRoomsText)

      if (showToast) {
        showNotification('Konfigurasi berhasil diterapkan.')
      }
      return true
    } catch (e) {
      console.error('Gagal menerapkan konfigurasi:', e)
      return false
    }
  }, [])

  // ─── HYDRATION DARI LOCALSTORAGE PADA AWAL LOAD ───────────────────────────
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          applyConfigObject(parsed, false)
        }
      }
    } catch (err) {
      console.warn('Gagal membaca dari localStorage:', err)
    } finally {
      setIsReady(true)
    }
  }, [applyConfigObject])

  // ─── PENYIMPANAN OTOMATIS (AUTO-SAVE) KE LOCALSTORAGE ─────────────────────
  useEffect(() => {
    if (!isReady) return
    try {
      if (typeof window !== 'undefined') {
        const current = getCurrentConfig()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
      }
    } catch (err) {
      console.warn('Gagal menyimpan otomatis ke localStorage:', err)
    }
  }, [isReady, getCurrentConfig])

  // ─── RESET LOCALSTORAGE & KEMBALIKAN KE DEFAULT ───────────────────────────
  const handleResetLocalStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
      applyConfigObject(DEFAULT_CONFIG, false)
      setJsonInputText('')
      setJsonError(null)
      showNotification('LocalStorage dibersihkan & konfigurasi kembali ke default.')
    } catch (err) {
      alert('Gagal mereset localStorage: ' + err.message)
    }
  }

  // ─── EKSPOR BERKAS JSON ───────────────────────────────────────────────────
  const handleDownloadJsonFile = () => {
    try {
      const config = getCurrentConfig()
      const jsonString = JSON.stringify(config, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const cleanName = (textTitle || 'penanda-ruangan').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      a.download = `konfigurasi-${cleanName}-${widthCm}x${heightCm}cm.json`
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showNotification('Berkas JSON berhasil diunduh.')
    } catch (err) {
      alert('Gagal mengunduh berkas JSON: ' + err.message)
    }
  }

  // ─── SALIN JSON TEKS KE PAPAN KLIP ────────────────────────────────────────
  const handleCopyJsonString = async () => {
    try {
      const config = getCurrentConfig()
      const jsonString = JSON.stringify(config, null, 2)
      await navigator.clipboard.writeText(jsonString)
      showNotification('Teks konfigurasi JSON berhasil disalin.')
    } catch {
      alert('Gagal menyalin teks JSON ke papan klip.')
    }
  }

  // ─── IMPOR BERKAS JSON DARI KOMPUTER ──────────────────────────────────────
  const handleImportJsonFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result
        if (typeof text !== 'string') return
        const parsed = JSON.parse(text)
        const success = applyConfigObject(parsed, true)
        if (!success) {
          setJsonError('Format berkas JSON tidak sesuai struktur aplikasi.')
        } else {
          setJsonError(null)
          setJsonInputText('')
        }
      } catch (err) {
        setJsonError('Gagal memproses berkas JSON: ' + err.message)
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    }
    reader.onerror = () => {
      setJsonError('Gagal membaca berkas yang dipilih.')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.readAsText(file)
  }

  // ─── IMPOR DENGAN MENEMPELKAN TEKS JSON SECARA LANGSUNG ───────────────────
  const handleApplyJsonText = () => {
    if (!jsonInputText.trim()) {
      setJsonError('Harap tempelkan teks JSON konfigurasi terlebih dahulu.')
      return
    }
    try {
      const parsed = JSON.parse(jsonInputText)
      const success = applyConfigObject(parsed, true)
      if (!success) {
        setJsonError('Format JSON tidak sesuai spesifikasi aplikasi.')
      } else {
        setJsonError(null)
        setJsonInputText('')
      }
    } catch (err) {
      setJsonError('Format teks JSON salah: ' + err.message)
    }
  }

  return (
    <main className='min-h-screen bg-[#FBFBFA] dark:bg-[#111111] text-[#111111] dark:text-[#EAEAEA] font-sans transition-colors selection:bg-[#EAEAEA] selection:text-[#111111]'>
      <Head>
        <title>Studio Penanda Ruangan Presisi (25 × 10 cm)</title>
        <meta
          name='description'
          content='Studio penanda ruangan fisik presisi skala 1:1, ekspor resolusi cetak 300 DPI, vektor SVG laser-cut, dan cetak dokumen A4 langsung.'
        />
      </Head>

      {/* CSS untuk memastikan header & footer Docusaurus tidak muncul */}
      <style>{`
        .navbar, .footer, footer.footer, nav.navbar {
          display: none !important;
        }
      `}</style>

      {/* ─── DUA KOLOM UTAMA (DESKTOP WORKBENCH & INSPECTOR) ─── */}
      <div className='max-w-[1500px] mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>

          {/* ═══════════════════════════════════════════════════════════════════
              KOLOM KIRI: INSPECTOR PANEL (5 cols desktop)
             ═══════════════════════════════════════════════════════════════════ */}
          <section className='lg:col-span-5 space-y-4 no-print'>
            {/* Segmented Control Mode - 4 Kolom Grid Presisi & Anti-Wrap */}
            <div className='grid grid-cols-4 p-1 bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[8px] text-xs font-medium text-[#787774] dark:text-[#8E8D8A] gap-1'>
              <button
                type='button'
                onClick={() => setInspectorTab('papan')}
                title='Pengaturan Desain & Dimensi Papan'
                className={`py-1.5 px-1.5 sm:px-2 rounded-[6px] transition cursor-pointer text-center whitespace-nowrap truncate ${
                  inspectorTab === 'papan'
                    ? 'bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                    : 'hover:text-[#111111] dark:hover:text-[#FFFFFF]'
                }`}
              >
                Desain
              </button>
              <button
                type='button'
                onClick={() => setInspectorTab('batch')}
                title='Daftar Batch Nama Ruangan'
                className={`py-1.5 px-1.5 sm:px-2 rounded-[6px] transition cursor-pointer text-center flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                  inspectorTab === 'batch'
                    ? 'bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                    : 'hover:text-[#111111] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <span>Ruangan</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono leading-none ${
                    inspectorTab === 'batch'
                      ? 'bg-[#333333] text-[#FFFFFF] dark:bg-[#CCCCCC] dark:text-[#111111]'
                      : 'bg-[#EAEAEA] dark:bg-[#2C2C2C] text-[#111111] dark:text-[#EAEAEA]'
                  }`}
                >
                  {batchList.length}
                </span>
              </button>
              <button
                type='button'
                onClick={() => setInspectorTab('backup')}
                title='Cadangan & Ekspor Impor JSON'
                className={`py-1.5 px-1.5 sm:px-2 rounded-[6px] transition cursor-pointer text-center whitespace-nowrap truncate ${
                  inspectorTab === 'backup'
                    ? 'bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                    : 'hover:text-[#111111] dark:hover:text-[#FFFFFF]'
                }`}
              >
                JSON
              </button>
              <button
                type='button'
                onClick={() => setInspectorTab('spesifikasi')}
                title='Panduan Bahan & Percetakan'
                className={`py-1.5 px-1.5 sm:px-2 rounded-[6px] transition cursor-pointer text-center whitespace-nowrap truncate ${
                  inspectorTab === 'spesifikasi'
                    ? 'bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                    : 'hover:text-[#111111] dark:hover:text-[#FFFFFF]'
                }`}
              >
                Panduan
              </button>
            </div>

            {/* TAB 1: KONTROL PAPAN DESAIN */}
            {inspectorTab === 'papan' && (
              <div className='bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[10px] p-5 space-y-6'>

                {/* 1. SEKSI TEKS UTAMA */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <label className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                      Teks Ruangan
                    </label>
                    <label className='inline-flex items-center gap-1.5 text-xs text-[#787774] dark:text-[#8E8D8A] cursor-pointer select-none'>
                      <input
                        type='checkbox'
                        checked={forceUppercase}
                        onChange={(e) => setForceUppercase(e.target.checked)}
                        className='w-3.5 h-3.5 rounded border-[#EAEAEA] accent-[#111111] cursor-pointer'
                      />
                      <span>Kapital Otomatis</span>
                    </label>
                  </div>

                  <input
                    type='text'
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                    placeholder='Contoh: RUANG KANTOR'
                    className='w-full px-3.5 py-2.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-sm font-semibold tracking-wide text-[#111111] dark:text-[#FFFFFF] focus:outline-none focus:border-[#111111] dark:focus:border-[#EAEAEA] transition'
                  />

                  {/* Preset Nama Ruangan Populer */}
                  <div className='space-y-1.5'>
                    <div className='text-[11px] text-[#787774] dark:text-[#8E8D8A] flex justify-between'>
                      <span>Pilih Cepat Nama Ruangan:</span>
                      <span className='font-mono text-[10px]'>{ROOM_NAME_PRESETS.length} opsi</span>
                    </div>
                    <div className='flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1'>
                      {ROOM_NAME_PRESETS.map((item, idx) => (
                        <button
                          key={idx}
                          type='button'
                          onClick={() => {
                            setTextTitle(item.title)
                            if (item.sub) setTextSub(item.sub)
                          }}
                          className={`text-xs px-2.5 py-1 rounded-[4px] border transition cursor-pointer ${
                            textTitle === item.title
                              ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                              : 'bg-[#FBFBFA] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#D1D1D1] border-[#EAEAEA] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#EAEAEA]'
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subteks / Terjemahan Bahasa Inggris (Opsional) */}
                  <div className='space-y-1 pt-1'>
                    <div className='flex justify-between items-center text-xs'>
                      <span className='text-[#787774] dark:text-[#8E8D8A]'>Subteks / Bahasa Inggris:</span>
                      {textSub && (
                        <button
                          type='button'
                          onClick={() => setTextSub('')}
                          className='text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#FDEBEC] text-[#9F2F2D] dark:bg-[#3d1819] dark:text-[#fca5a5] border border-[#fca5a5]/40 hover:bg-[#fbd0d2] dark:hover:bg-[#522022] transition active:scale-[0.98] cursor-pointer'
                        >
                          Kosongkan
                        </button>
                      )}
                    </div>
                    <input
                      type='text'
                      value={textSub}
                      onChange={(e) => setTextSub(e.target.value)}
                      placeholder='Contoh: OFFICE / FLOOR 2 (Opsional)'
                      className='w-full px-3 py-1.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs text-[#111111] dark:text-[#FFFFFF] focus:outline-none focus:border-[#111111] transition'
                    />
                  </div>
                </div>

                <div className='h-[1px] bg-[#EAEAEA] dark:bg-[#262626]' />

                {/* 2. SEKSI DIMENSI FISIK (CM & MM) */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <label className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                      Format & Ukuran Fisik
                    </label>
                    <span className='font-mono text-xs text-[#787774] dark:text-[#8E8D8A]'>
                      {widthCm} × {heightCm} cm
                    </span>
                  </div>

                  {/* Presets Ukuran */}
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-1.5'>
                    {SIZE_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => {
                          setWidthCm(p.width)
                          setHeightCm(p.height)
                          setPaddingCm(p.padding)
                        }}
                        className={`text-left p-2 rounded-[6px] border text-xs transition cursor-pointer ${
                          widthCm === p.width && heightCm === p.height
                            ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] dark:bg-[#EAEAEA] dark:text-[#111111]'
                            : 'bg-[#FBFBFA] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#D1D1D1] border-[#EAEAEA] dark:border-[#2C2C2C] hover:border-[#111111] dark:hover:border-[#EAEAEA]'
                        }`}
                      >
                        <div className='font-mono font-semibold'>{p.label}</div>
                        <div className='text-[10px] opacity-70 truncate'>{p.note}</div>
                      </button>
                    ))}
                  </div>

                  {/* Input Manual Lebar & Tinggi */}
                  <div className='grid grid-cols-2 gap-3 pt-1'>
                    <div className='space-y-1'>
                      <div className='flex justify-between text-xs text-[#787774] dark:text-[#8E8D8A]'>
                        <span>Lebar (Panjang):</span>
                        <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>{widthCm} cm</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <input
                          type='number'
                          min='10'
                          max='100'
                          step='1'
                          value={widthCm}
                          onChange={(e) => setWidthCm(Math.max(5, Number(e.target.value)))}
                          className='w-full px-2.5 py-1.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs font-mono text-[#111111] dark:text-[#FFFFFF]'
                        />
                        <span className='text-[11px] font-mono text-[#787774]'>cm</span>
                      </div>
                      <input
                        type='range'
                        min='15'
                        max='50'
                        step='1'
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                      />
                    </div>

                    <div className='space-y-1'>
                      <div className='flex justify-between text-xs text-[#787774] dark:text-[#8E8D8A]'>
                        <span>Tinggi Papan:</span>
                        <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>{heightCm} cm</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <input
                          type='number'
                          min='5'
                          max='50'
                          step='0.5'
                          value={heightCm}
                          onChange={(e) => setHeightCm(Math.max(4, Number(e.target.value)))}
                          className='w-full px-2.5 py-1.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs font-mono text-[#111111] dark:text-[#FFFFFF]'
                        />
                        <span className='text-[11px] font-mono text-[#787774]'>cm</span>
                      </div>
                      <input
                        type='range'
                        min='6'
                        max='30'
                        step='0.5'
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                      />
                    </div>
                  </div>

                  {/* Padding Garis Border Putih */}
                  <div className='space-y-1 pt-1'>
                    <div className='flex justify-between items-center text-xs text-[#787774] dark:text-[#8E8D8A]'>
                      <span>Padding Garis Border:</span>
                      <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>
                        {paddingCm} cm ({paddingMm} mm)
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <input
                        type='range'
                        min='0.2'
                        max='3.0'
                        step='0.1'
                        value={paddingCm}
                        onChange={(e) => setPaddingCm(Number(e.target.value))}
                        className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                      />
                      <button
                        type='button'
                        onClick={() => setPaddingCm(1)}
                        className='text-[11px] font-semibold px-2.5 py-1 rounded-[4px] bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] hover:bg-[#2F3437] dark:hover:bg-[#FFFFFF] transition active:scale-[0.98] shrink-0 cursor-pointer shadow-none'
                      >
                        Reset 1 cm
                      </button>
                    </div>
                  </div>
                </div>

                <div className='h-[1px] bg-[#EAEAEA] dark:bg-[#262626]' />

                {/* 3. SEKSI WARNA & PALET RAMBU */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <label className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                      Warna & Bahan
                    </label>
                    <span className='font-mono text-xs text-[#787774] dark:text-[#8E8D8A]'>
                      {bgColor.toUpperCase()}
                    </span>
                  </div>

                  {/* Swatches Palet Populer */}
                  <div className='grid grid-cols-3 gap-2'>
                    {COLOR_PRESETS.map((c) => {
                      const isSelected = bgColor.toLowerCase() === c.bg.toLowerCase()
                      return (
                        <button
                          key={c.id}
                          type='button'
                          onClick={() => {
                            setBgColor(c.bg)
                            setBorderColor(c.border)
                            setTextColor(c.text)
                            setSubtextColor(c.subtext)
                          }}
                          className={`flex items-center gap-2 p-1.5 rounded-[6px] border text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-[#111111] dark:border-[#EAEAEA] bg-[#F7F6F3] dark:bg-[#222222]'
                              : 'border-[#EAEAEA] dark:border-[#2C2C2C] bg-[#FFFFFF] dark:bg-[#1A1A1A] hover:border-[#CCCCCC]'
                          }`}
                        >
                          <span
                            className='w-5 h-5 rounded-[4px] border border-black/15 dark:border-white/20 shrink-0'
                            style={{ backgroundColor: c.bg }}
                          />
                          <div className='overflow-hidden'>
                            <div className='text-[11px] font-medium leading-tight truncate text-[#111111] dark:text-[#EAEAEA]'>
                              {c.name.split(' ')[0]}
                            </div>
                            <div className='text-[9px] text-[#787774] font-mono leading-none truncate'>
                              {c.tag}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Custom Hex Color Pickers */}
                  <div className='grid grid-cols-3 gap-2 pt-1'>
                    <div className='space-y-1'>
                      <span className='text-[11px] text-[#787774] dark:text-[#8E8D8A] block'>Latar Plang:</span>
                      <div className='flex items-center gap-1.5 p-1 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px]'>
                        <input
                          type='color'
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className='w-5 h-5 rounded border-0 bg-transparent cursor-pointer'
                        />
                        <input
                          type='text'
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className='w-full bg-transparent text-[11px] font-mono text-[#111111] dark:text-[#EAEAEA] focus:outline-none'
                        />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <span className='text-[11px] text-[#787774] dark:text-[#8E8D8A] block'>Garis Border:</span>
                      <div className='flex items-center gap-1.5 p-1 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px]'>
                        <input
                          type='color'
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className='w-5 h-5 rounded border-0 bg-transparent cursor-pointer'
                        />
                        <input
                          type='text'
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className='w-full bg-transparent text-[11px] font-mono text-[#111111] dark:text-[#EAEAEA] focus:outline-none'
                        />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <span className='text-[11px] text-[#787774] dark:text-[#8E8D8A] block'>Teks Utama:</span>
                      <div className='flex items-center gap-1.5 p-1 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px]'>
                        <input
                          type='color'
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className='w-5 h-5 rounded border-0 bg-transparent cursor-pointer'
                        />
                        <input
                          type='text'
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className='w-full bg-transparent text-[11px] font-mono text-[#111111] dark:text-[#EAEAEA] focus:outline-none'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. DISCLOSURE: PENGATURAN PRESISI TINGKAT LANJUT */}
                <div className='pt-2 border-t border-[#EAEAEA] dark:border-[#262626]'>
                  <button
                    type='button'
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className='w-full py-1.5 flex items-center justify-between text-xs font-semibold text-[#111111] dark:text-[#EAEAEA] hover:text-[#787774] transition cursor-pointer'
                  >
                    <span>Pengaturan Tipografi & Hardware Presisi</span>
                    <span className='font-mono text-xs'>{showAdvanced ? '− Tutup' : '+ Buka'}</span>
                  </button>

                  {showAdvanced && (
                    <div className='space-y-4 pt-3 mt-2 border-t border-dashed border-[#EAEAEA] dark:border-[#2C2C2C]'>
                      {/* Pilihan Font */}
                      <div className='space-y-1'>
                        <label className='text-[11px] text-[#787774] dark:text-[#8E8D8A]'>Gaya Font Rambu:</label>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className='w-full px-2.5 py-1.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs text-[#111111] dark:text-[#EAEAEA]'
                        >
                          {FONT_OPTIONS.map((f) => (
                            <option key={f.id} value={f.family}>
                              {f.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Weight & Auto-Fit */}
                      <div className='grid grid-cols-2 gap-3'>
                        <div className='space-y-1'>
                          <label className='text-[11px] text-[#787774] dark:text-[#8E8D8A]'>Ketebalan Huruf:</label>
                          <select
                            value={fontWeight}
                            onChange={(e) => setFontWeight(e.target.value)}
                            className='w-full px-2.5 py-1.5 bg-[#FFFFFF] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs text-[#111111] dark:text-[#EAEAEA]'
                          >
                            <option value='900'>900 - Black</option>
                            <option value='800'>800 - Extra Bold (Rambu)</option>
                            <option value='700'>700 - Bold</option>
                            <option value='600'>600 - Semi Bold</option>
                            <option value='500'>500 - Medium</option>
                          </select>
                        </div>

                        <div className='space-y-1'>
                          <label className='text-[11px] text-[#787774] dark:text-[#8E8D8A]'>Auto-Fit Teks:</label>
                          <label className='flex items-center gap-2 p-1.5 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs cursor-pointer select-none'>
                            <input
                              type='checkbox'
                              checked={autoFitText}
                              onChange={(e) => setAutoFitText(e.target.checked)}
                              className='w-3.5 h-3.5 rounded accent-[#111111] cursor-pointer'
                            />
                            <span className='truncate'>{autoFitText ? 'Aktif (Pas)' : 'Manual'}</span>
                          </label>
                        </div>
                      </div>

                      {/* Slider Ukuran Huruf & Spasi */}
                      <div className='space-y-2'>
                        <div className='flex justify-between text-xs text-[#787774] dark:text-[#8E8D8A]'>
                          <span>Ukuran Font Huruf:</span>
                          <span className='font-mono font-semibold text-[#111111] dark:text-[#EAEAEA]'>
                            {appliedTitleFontSize.toFixed(1)} mm
                          </span>
                        </div>
                        <input
                          type='range'
                          min='8'
                          max='35'
                          step='0.5'
                          value={fontSizeTitleMm}
                          onChange={(e) => setFontSizeTitleMm(Number(e.target.value))}
                          className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                        />

                        <div className='flex justify-between text-xs text-[#787774] dark:text-[#8E8D8A] pt-1'>
                          <span>Jarak Antar Huruf (Tracking):</span>
                          <span className='font-mono font-semibold text-[#111111] dark:text-[#EAEAEA]'>
                            {letterSpacingMm} mm
                          </span>
                        </div>
                        <input
                          type='range'
                          min='0'
                          max='4'
                          step='0.2'
                          value={letterSpacingMm}
                          onChange={(e) => setLetterSpacingMm(Number(e.target.value))}
                          className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                        />
                      </div>

                      {/* Tebal Garis & Sudut Melengkung */}
                      <div className='grid grid-cols-2 gap-3 pt-1'>
                        <div className='space-y-1'>
                          <div className='flex justify-between text-[11px] text-[#787774]'>
                            <span>Tebal Garis:</span>
                            <span className='font-mono'>{borderThicknessMm} mm</span>
                          </div>
                          <input
                            type='range'
                            min='1'
                            max='6'
                            step='0.5'
                            value={borderThicknessMm}
                            onChange={(e) => setBorderThicknessMm(Number(e.target.value))}
                            className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                          />
                        </div>

                        <div className='space-y-1'>
                          <div className='flex justify-between text-[11px] text-[#787774]'>
                            <span>Sudut Papan:</span>
                            <span className='font-mono'>{boardCornerRadiusMm} mm</span>
                          </div>
                          <input
                            type='range'
                            min='0'
                            max='16'
                            step='1'
                            value={boardCornerRadiusMm}
                            onChange={(e) => {
                              const v = Number(e.target.value)
                              setBoardCornerRadiusMm(v)
                              setInnerCornerRadiusMm(Math.max(0, v - 2))
                            }}
                            className='w-full accent-[#111111] dark:accent-[#EAEAEA]'
                          />
                        </div>
                      </div>

                      {/* Hardware / Baut Sudut & Kilau */}
                      <div className='space-y-2 pt-1'>
                        <label className='flex items-center justify-between p-2 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs cursor-pointer select-none'>
                          <span>Titik Lubang Baut / Sekrup Sudut</span>
                          <input
                            type='checkbox'
                            checked={showScrews}
                            onChange={(e) => setShowScrews(e.target.checked)}
                            className='w-3.5 h-3.5 rounded accent-[#111111] cursor-pointer'
                          />
                        </label>

                        <label className='flex items-center justify-between p-2 bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs cursor-pointer select-none'>
                          <span>Efek Refleksi Kilau Permukaan</span>
                          <input
                            type='checkbox'
                            checked={showGlossEffect}
                            onChange={(e) => setShowGlossEffect(e.target.checked)}
                            className='w-3.5 h-3.5 rounded accent-[#111111] cursor-pointer'
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* LocalStorage Status & Reset Action */}
                <div className='pt-3 mt-2 border-t border-[#EAEAEA] dark:border-[#2C2C2C] flex flex-wrap items-center justify-between gap-2 text-xs'>
                  <div className='flex items-center gap-1.5 text-[11px] text-[#787774] dark:text-[#8E8D8A]'>
                    <span className='inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]' />
                    <span>Auto-save LocalStorage</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <button
                      type='button'
                      onClick={() => setInspectorTab('backup')}
                      className='text-[11px] font-mono font-medium px-2 py-1 rounded-[4px] bg-[#F4F4F2] dark:bg-[#262626] border border-[#D1D1D1] dark:border-[#404040] text-[#111111] dark:text-[#F0F0F0] hover:bg-[#EAEAEA] dark:hover:bg-[#333333] transition cursor-pointer'
                    >
                      JSON / Cadangan
                    </button>
                    <button
                      type='button'
                      onClick={handleResetLocalStorage}
                      className='text-[11px] font-mono font-semibold px-2 py-1 rounded-[4px] bg-[#FDEBEC] text-[#9F2F2D] border border-[#F87171]/40 dark:bg-[#3B1818] dark:text-[#FCA5A5] dark:border-[#991B1B] hover:opacity-90 transition cursor-pointer'
                      title='Bersihkan data di browser dan kembali ke spesifikasi default'
                    >
                      Reset LocalStorage
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DAFTAR RUANGAN (BATCH SWITCHER) */}
            {inspectorTab === 'batch' && (
              <div className='bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[10px] p-5 space-y-4'>
                <div>
                  <h2 className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                    Daftar Nama Banyak Ruangan
                  </h2>
                  <p className='text-xs text-[#787774] dark:text-[#8E8D8A] mt-1'>
                    Ketik satu nama per baris. Klik nama pada daftar di bawah untuk langsung menerapkan ke plang dan mengunduh.
                  </p>
                </div>

                <textarea
                  rows={6}
                  value={batchRoomsText}
                  onChange={(e) => setBatchRoomsText(e.target.value)}
                  placeholder='Ketik 1 nama ruangan per baris...'
                  className='w-full p-3 bg-[#FBFBFA] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs font-mono text-[#111111] dark:text-[#EAEAEA] focus:outline-none focus:border-[#111111]'
                />

                <div className='space-y-1.5'>
                  <div className='text-xs text-[#787774] dark:text-[#8E8D8A] flex justify-between'>
                    <span>Pilih Ruangan untuk Di-Pratinjau:</span>
                    <span className='font-mono text-[10px]'>{batchList.length} Ruangan</span>
                  </div>

                  <div className='flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1'>
                    {batchList.map((room, idx) => {
                      const isCurrent = textTitle.trim().toUpperCase() === room.trim().toUpperCase()
                      return (
                        <button
                          key={idx}
                          type='button'
                          onClick={() => setTextTitle(room)}
                          className={`text-xs px-2.5 py-1.5 rounded-[6px] border transition cursor-pointer ${
                            isCurrent
                              ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] dark:bg-[#EAEAEA] dark:text-[#111111] font-semibold'
                              : 'bg-[#FBFBFA] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#EAEAEA] border-[#EAEAEA] dark:border-[#2C2C2C] hover:border-[#111111]'
                          }`}
                        >
                          {room}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CADANGAN & PERSISTENSI JSON */}
            {inspectorTab === 'backup' && (
              <div className='bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[10px] p-5 space-y-6'>
                <div>
                  <h2 className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                    Penyimpanan & Cadangan Konfigurasi
                  </h2>
                  <p className='text-xs text-[#787774] dark:text-[#8E8D8A] mt-1 leading-relaxed'>
                    Setiap perubahan spesifikasi otomatis tersimpan ke peramban (localStorage) agar tidak hilang saat halaman disegarkan (F5).
                  </p>
                </div>

                {/* 1. STATUS PERSISTENSI & RESET LOCALSTORAGE */}
                <div className='p-3.5 bg-[#FBFBFA] dark:bg-[#151515] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[8px] space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='inline-block w-2 h-2 rounded-full bg-[#10B981]' />
                      <span className='text-xs font-medium text-[#111111] dark:text-[#EAEAEA]'>
                        LocalStorage Aktif
                      </span>
                    </div>
                    <span className='font-mono text-[10px] text-[#787774] dark:text-[#8E8D8A]'>
                      Kunci: penanda_ruangan_config_v1
                    </span>
                  </div>

                  <p className='text-[11px] text-[#787774] dark:text-[#8E8D8A] leading-relaxed'>
                    Gunakan tombol di bawah bila ingin menghapus seluruh data kustom yang tersimpan di browser dan kembali ke spesifikasi bawaan pabrik (25 × 10 cm, Hijau Jalur Cepat).
                  </p>

                  <div>
                    <button
                      type='button'
                      onClick={handleResetLocalStorage}
                      className='w-full py-2 px-3 text-xs font-semibold rounded-[6px] transition cursor-pointer bg-[#FDEBEC] text-[#9F2F2D] border border-[#F87171]/40 dark:bg-[#3B1818] dark:text-[#FCA5A5] dark:border-[#991B1B] hover:opacity-90'
                    >
                      Reset LocalStorage & Muat Ulang Standar Pabrik
                    </button>
                  </div>
                </div>

                {/* 2. EKSPOR KONFIGURASI JSON */}
                <div className='space-y-2.5'>
                  <label className='text-xs font-semibold uppercase tracking-tight text-[#111111] dark:text-[#EAEAEA] block'>
                    Ekspor Konfigurasi (Cadangkan)
                  </label>
                  <p className='text-xs text-[#787774] dark:text-[#8E8D8A]'>
                    Simpan konfigurasi ke berkas .json atau salin teks format data untuk diarsipkan.
                  </p>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1'>
                    <button
                      type='button'
                      onClick={handleDownloadJsonFile}
                      className='py-2 px-3 text-xs font-medium rounded-[6px] bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] hover:opacity-90 transition cursor-pointer text-center'
                    >
                      Unduh Berkas JSON (.json)
                    </button>
                    <button
                      type='button'
                      onClick={handleCopyJsonString}
                      className='py-2 px-3 text-xs font-medium rounded-[6px] bg-[#F4F4F2] dark:bg-[#262626] border border-[#D1D1D1] dark:border-[#404040] text-[#111111] dark:text-[#F0F0F0] hover:bg-[#EAEAEA] dark:hover:bg-[#333333] transition cursor-pointer text-center'
                    >
                      Salin Teks JSON
                    </button>
                  </div>
                </div>

                {/* 3. IMPOR KONFIGURASI JSON */}
                <div className='space-y-3 pt-3 border-t border-[#EAEAEA] dark:border-[#2C2C2C]'>
                  <div>
                    <label className='text-xs font-semibold uppercase tracking-tight text-[#111111] dark:text-[#EAEAEA] block'>
                      Impor Konfigurasi (Pulihkan)
                    </label>
                    <p className='text-xs text-[#787774] dark:text-[#8E8D8A] mt-0.5'>
                      Muat konfigurasi dari berkas JSON eksternal atau tempelkan langsung ke kolom teks.
                    </p>
                  </div>

                  {/* Unggah Berkas */}
                  <div>
                    <input
                      type='file'
                      ref={fileInputRef}
                      accept='.json,application/json'
                      onChange={handleImportJsonFile}
                      className='hidden'
                    />
                    <button
                      type='button'
                      onClick={() => fileInputRef.current?.click()}
                      className='w-full py-2 px-3 text-xs font-medium rounded-[6px] bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-dashed border-[#B0B0B0] dark:border-[#555555] text-[#111111] dark:text-[#EAEAEA] hover:border-[#111111] dark:hover:border-[#FFFFFF] transition cursor-pointer'
                    >
                      Pilih Berkas Cadangan JSON dari Komputer...
                    </button>
                  </div>

                  {/* Tempel Teks JSON */}
                  <div className='space-y-2 pt-1'>
                    <textarea
                      rows={4}
                      value={jsonInputText}
                      onChange={(e) => {
                        setJsonInputText(e.target.value)
                        if (jsonError) setJsonError(null)
                      }}
                      placeholder='Atau tempelkan kode JSON di sini: {"widthCm": 25, "textTitle": "RUANG RAPAT", ...}'
                      className='w-full p-2.5 bg-[#FBFBFA] dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-[6px] text-xs font-mono text-[#111111] dark:text-[#EAEAEA] focus:outline-none focus:border-[#111111]'
                    />

                    {jsonError && (
                      <div className='p-2.5 rounded-[6px] bg-[#FDEBEC] dark:bg-[#3B1818] border border-[#F87171] text-[#9F2F2D] dark:text-[#FCA5A5] text-xs leading-snug font-mono'>
                        {jsonError}
                      </div>
                    )}

                    <button
                      type='button'
                      onClick={handleApplyJsonText}
                      className='w-full py-2 px-3 text-xs font-semibold rounded-[6px] bg-[#111111] text-[#FFFFFF] dark:bg-[#EAEAEA] dark:text-[#111111] hover:opacity-90 transition cursor-pointer'
                    >
                      Terapkan Teks JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SPESIFIKASI & PANDUAN CETAK */}
            {inspectorTab === 'spesifikasi' && (
              <div className='bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[10px] p-5 space-y-4 text-xs text-[#787774] dark:text-[#8E8D8A]'>
                <div>
                  <h2 className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#F0F0F0] uppercase'>
                    Panduan Bahan & Cetak
                  </h2>
                  <p className='text-xs text-[#787774] dark:text-[#8E8D8A] mt-0.5'>
                    Rekomendasi teknis fabrikasi plang penanda ruangan presisi.
                  </p>
                </div>

                <div className='space-y-3 leading-relaxed text-[#111111] dark:text-[#D1D1D1]'>
                  <div className='p-3 bg-[#FBFBFA] dark:bg-[#1E1E1E] rounded-[6px] border border-[#EAEAEA] dark:border-[#2C2C2C]'>
                    <strong className='block font-semibold text-[#111111] dark:text-[#FFFFFF] mb-1'>
                      1. Akrilik Custom (Cutting Sticker / Flatbed UV)
                    </strong>
                    Gunakan akrilik tebal 2 mm – 3 mm (warna putih susu atau bening). Potong sesuai dimensi {widthCm} × {heightCm} cm. Gambar vektor SVG dapat langsung diproses dengan mesin laser CO2 atau mesin plotter cutting stiker Oracal 651.
                  </div>

                  <div className='p-3 bg-[#FBFBFA] dark:bg-[#1E1E1E] rounded-[6px] border border-[#EAEAEA] dark:border-[#2C2C2C]'>
                    <strong className='block font-semibold text-[#111111] dark:text-[#FFFFFF] mb-1'>
                      2. Cetak Kertas & Laminasi Cepat (A4 Standard)
                    </strong>
                    Cukup klik <em>Cetak 1:1</em> di pojok kanan atas. Sistem otomatis menyesuaikan skala fisik 100% tanpa distorsi pada kertas A4 potret. Gunakan kertas Art Paper / Brief Card 260 gsm lalu laminasi doff.
                  </div>

                  <div className='p-3 bg-[#FBFBFA] dark:bg-[#1E1E1E] rounded-[6px] border border-[#EAEAEA] dark:border-[#2C2C2C]'>
                    <strong className='block font-semibold text-[#111111] dark:text-[#FFFFFF] mb-1'>
                      3. Resolusi Percetakan 300 DPI
                    </strong>
                    Ekspor PNG menghasilkan {pxWidth300Dpi} × {pxHeight300Dpi} piksel. Standar titik raster 300 DPI memastikan tepi huruf dan garis lengkung tidak bergerigi saat dicetak di mesin digital printing skala komersial.
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              KOLOM KANAN: DRAFTING WORKBENCH & CANVASES (7 cols desktop)
             ═══════════════════════════════════════════════════════════════════ */}
          <section className='lg:col-span-7 space-y-4'>

            {/* ARTBOARD CARD UTAMA */}
            <div className='bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-[10px] p-5 sm:p-6 space-y-5'>

              {/* Toolbar Atas Artboard */}
              <div className='flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAEAEA] dark:border-[#262626] no-print'>
                <div className='flex items-center gap-2'>
                  <span className='inline-block w-2 h-2 rounded-full bg-[#346538]' />
                  <span className='text-xs font-semibold tracking-tight text-[#111111] dark:text-[#EAEAEA]'>
                    Pratinjau Papan Fisik
                  </span>
                  <span className='font-mono text-[11px] px-2 py-0.5 rounded-[4px] bg-[#FBFBFA] dark:bg-[#202020] border border-[#EAEAEA] dark:border-[#2C2C2C] text-[#787774] dark:text-[#8E8D8A]'>
                    {widthCm}0 × {heightCm}0 mm
                  </span>
                </div>

                {/* Kontrol Zoom & Ruler */}
                <div className='flex items-center gap-1.5'>
                  <button
                    type='button'
                    onClick={() => setShowRulers(!showRulers)}
                    className={`px-2 py-1 rounded-[4px] border text-[11px] font-mono transition cursor-pointer ${
                      showRulers
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] dark:bg-[#EAEAEA] dark:text-[#111111]'
                        : 'bg-[#FFFFFF] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#EAEAEA] border-[#D1D1D1] dark:border-[#383838]'
                    }`}
                    title='Tampilkan / Sembunyikan Penggaris Skala Fisik'
                  >
                    Penggaris
                  </button>

                  <button
                    type='button'
                    onClick={() => setZoomScale((z) => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
                    className='px-2 py-1 rounded-[4px] bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#D1D1D1] dark:border-[#383838] text-[#111111] dark:text-[#EAEAEA] text-xs hover:bg-[#EAEAEA] transition'
                    title='Perkecil tampilan'
                  >
                    −
                  </button>

                  <span className='text-xs font-mono text-[#111111] dark:text-[#EAEAEA] w-10 text-center font-medium'>
                    {Math.round(zoomScale * 100)}%
                  </span>

                  <button
                    type='button'
                    onClick={() => setZoomScale((z) => Math.min(2.0, Number((z + 0.1).toFixed(1))))}
                    className='px-2 py-1 rounded-[4px] bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#D1D1D1] dark:border-[#383838] text-[#111111] dark:text-[#EAEAEA] text-xs hover:bg-[#EAEAEA] transition'
                    title='Perbesar tampilan'
                  >
                    +
                  </button>

                  <button
                    type='button'
                    onClick={() => setZoomScale(1)}
                    className='px-2 py-1 rounded-[4px] bg-[#FBFBFA] dark:bg-[#1E1E1E] border border-[#D1D1D1] dark:border-[#383838] text-[#111111] dark:text-[#EAEAEA] text-[11px] font-medium hover:bg-[#EAEAEA] transition'
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* ─── AREA DRAFTING MAT / MEJA KERJA TEKNIS ─── */}
              <div className='relative p-6 sm:p-10 flex flex-col items-center justify-center min-h-[340px] bg-[#F7F6F3] dark:bg-[#141414] rounded-[8px] border border-[#EAEAEA] dark:border-[#262626] overflow-x-auto'>
                {/* Millimeter Measurement Guide (Top Ruler) */}
                {showRulers && (
                  <div
                    className='mb-3 flex items-center justify-between text-[10px] font-mono text-[#787774] dark:text-[#666666] select-none'
                    style={{
                      width: `min(100%, ${Math.min(600, widthMm * 2 * zoomScale)}px)`
                    }}
                  >
                    <span>0 mm</span>
                    <span className='hidden sm:inline'>100 mm</span>
                    <span className='hidden sm:inline'>200 mm</span>
                    <span>{widthMm} mm ({widthCm} cm)</span>
                  </div>
                )}

                {/* SVG Live Signboard Container */}
                <div
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className='relative shrink-0 max-w-full'
                >
                  {/* ─────────────────────────────────────────────────────────────
                      KOMPONEN SVG MASTER PLANG RUANGAN (100% PHYSICAL UNITS)
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
                      borderRadius: `${boardCornerRadiusMm}px`,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    <defs>
                      {/* Kilau Refleksi Permukaan Akrilik Halus */}
                      <linearGradient id='signGlossGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#FFFFFF' stopOpacity={showGlossEffect ? '0.16' : '0'} />
                        <stop offset='38%' stopColor='#FFFFFF' stopOpacity='0.0' />
                        <stop offset='100%' stopColor='#000000' stopOpacity={showGlossEffect ? '0.15' : '0'} />
                      </linearGradient>

                      {/* Kepala Baut Stainless Steel */}
                      <radialGradient id='screwGrad' cx='35%' cy='35%' r='65%'>
                        <stop offset='0%' stopColor='#FFFFFF' />
                        <stop offset='45%' stopColor='#CBD5E1' />
                        <stop offset='85%' stopColor='#475569' />
                        <stop offset='100%' stopColor='#1E293B' />
                      </radialGradient>
                    </defs>

                    {/* 1. Latar Belakang Papan Utama */}
                    <rect
                      x='0'
                      y='0'
                      width={widthMm}
                      height={heightMm}
                      rx={boardCornerRadiusMm}
                      ry={boardCornerRadiusMm}
                      fill={bgColor}
                    />

                    {/* 2. Overlay Kilau Halus */}
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

                    {/* 3. Kotak Border Dalam dengan Jarak Padding cm */}
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

                    {/* 4. Tipografi Judul & Subteks */}
                    <g>
                      {textSub ? (
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

                    {/* 5. Titik Lubang Sekrup / Baut Sudut */}
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

              {/* ─── ACTION BAR EKSPOR (TOMBOL UTAMA PERSIS DI BAWAH PREVIEW) ─── */}
              <div className='pt-2 flex flex-wrap items-center justify-between gap-3 no-print'>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => handleDownloadPng(300)}
                    disabled={isExporting}
                    className='inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#111111] hover:bg-[#2F3437] dark:bg-[#F0F0F0] dark:text-[#111111] dark:hover:bg-[#FFFFFF] text-[#FFFFFF] text-xs font-semibold transition active:scale-[0.98] disabled:opacity-50 cursor-pointer'
                  >
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                      <polyline points='7 10 12 15 17 10' />
                      <line x1='12' y1='15' x2='12' y2='3' />
                    </svg>
                    <span>{isExporting ? 'Memproses HD...' : 'Download PNG (300 DPI)'}</span>
                  </button>

                  <button
                    type='button'
                    onClick={handleDownloadSvg}
                    className='inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#EAEAEA] border border-[#EAEAEA] dark:border-[#2C2C2C] hover:bg-[#F7F6F3] text-xs font-medium transition cursor-pointer'
                  >
                    <svg className='w-4 h-4 text-[#787774]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <polygon points='12 2 2 7 12 12 22 7 12 2' />
                      <polyline points='2 17 12 22 22 17' />
                      <polyline points='2 12 12 17 22 12' />
                    </svg>
                    <span>SVG Vektor</span>
                  </button>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={handleCopySvgCode}
                    className='inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-[#FFFFFF] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#EAEAEA] hover:bg-[#F7F6F3] dark:hover:bg-[#2A2A2A] border border-[#EAEAEA] dark:border-[#2C2C2C] text-xs font-medium transition cursor-pointer'
                    title='Salin XML SVG ke clipboard'
                  >
                    {copiedStatus ? (
                      <>
                        <svg className='w-3.5 h-3.5 text-[#346538]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                        <span className='text-[#346538] font-medium'>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                          <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                          <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                        </svg>
                        <span>Salin SVG</span>
                      </>
                    )}
                  </button>

                  <button
                    type='button'
                    onClick={() => window.print()}
                    className='inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-[#FFFFFF] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#EAEAEA] border border-[#EAEAEA] dark:border-[#2C2C2C] text-xs font-medium hover:bg-[#F7F6F3] transition cursor-pointer'
                  >
                    <svg className='w-3.5 h-3.5 text-[#787774]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <polyline points='6 9 6 2 18 2 18 9' />
                      <path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' />
                      <rect x='6' y='14' width='12' height='8' />
                    </svg>
                    <span>Print 1:1</span>
                  </button>
                </div>
              </div>

              {/* ─── BENTO SPESIFIKASI METRIK FISIK ─── */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#EAEAEA] dark:border-[#262626] text-xs no-print'>
                <div className='p-2.5 rounded-[6px] bg-[#FBFBFA] dark:bg-[#1C1C1C] border border-[#EAEAEA] dark:border-[#2A2A2A]'>
                  <span className='text-[10px] text-[#787774] dark:text-[#8E8D8A] block'>Dimensi Fisik</span>
                  <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>
                    {widthCm} × {heightCm} cm
                  </span>
                </div>

                <div className='p-2.5 rounded-[6px] bg-[#FBFBFA] dark:bg-[#1C1C1C] border border-[#EAEAEA] dark:border-[#2A2A2A]'>
                  <span className='text-[10px] text-[#787774] dark:text-[#8E8D8A] block'>Margin Border</span>
                  <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>
                    {paddingCm} cm ({paddingMm} mm)
                  </span>
                </div>

                <div className='p-2.5 rounded-[6px] bg-[#FBFBFA] dark:bg-[#1C1C1C] border border-[#EAEAEA] dark:border-[#2A2A2A]'>
                  <span className='text-[10px] text-[#787774] dark:text-[#8E8D8A] block'>Raster Cetak</span>
                  <span className='font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>
                    {pxWidth300Dpi} × {pxHeight300Dpi} px
                  </span>
                </div>

                <div className='p-2.5 rounded-[6px] bg-[#FBFBFA] dark:bg-[#1C1C1C] border border-[#EAEAEA] dark:border-[#2A2A2A]'>
                  <span className='text-[10px] text-[#787774] dark:text-[#8E8D8A] block'>Warna Plang</span>
                  <div className='flex items-center gap-1.5 font-mono font-semibold text-[#111111] dark:text-[#FFFFFF]'>
                    <span className='w-2.5 h-2.5 rounded-full border border-black/20 shrink-0' style={{ backgroundColor: bgColor }} />
                    <span className='truncate'>{bgColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KOTAK INFORMASI TEKNIKAL MINIMALIS */}
            <div className='p-4 rounded-[10px] bg-[#FFFFFF] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] text-xs space-y-2 no-print'>
              <div className='flex items-center justify-between text-[#111111] dark:text-[#EAEAEA] font-semibold'>
                <span>Pintasan Keyboard & Panduan Singkat</span>
                <span className='font-mono text-[10px] text-[#787774]'>Studio Mode</span>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#787774] dark:text-[#8E8D8A]'>
                <div className='flex items-center gap-2'>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-mono bg-[#F7F6F3] dark:bg-[#262626] border border-[#EAEAEA] dark:border-[#333333] rounded-[4px] text-[#111111] dark:text-[#EAEAEA]'>
                    Ctrl + S
                  </kbd>
                  <span>Unduh PNG resolusi tinggi 300 DPI</span>
                </div>
                <div className='flex items-center gap-2'>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-mono bg-[#F7F6F3] dark:bg-[#262626] border border-[#EAEAEA] dark:border-[#333333] rounded-[4px] text-[#111111] dark:text-[#EAEAEA]'>
                    Ctrl + P
                  </kbd>
                  <span>Cetak langsung 100% skala fisik di printer</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            TARGET CETAK PRINTER FISIK 1:1 (@media print)
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
              margin: '15mm auto',
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
          >
            {/* Garis Border Dalam */}
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

            {/* Tipografi Plang */}
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

        {/* CSS Cetak Fisik Bersih */}
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

        {/* Toast Notifikasi Persistensi & Salin */}
        {toastMsg && (
          <div
            role='status'
            className='no-print fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-[8px] bg-[#111111] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#111111] text-xs font-mono shadow-xl border border-[#333333] dark:border-[#EAEAEA] flex items-center gap-2.5 pointer-events-none'
          >
            <span className='inline-block w-2 h-2 rounded-full bg-[#10B981]' />
            <span className='font-medium'>{toastMsg}</span>
          </div>
        )}
    </main>
  )
}

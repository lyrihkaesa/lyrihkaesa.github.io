import React, { useState, useEffect, useMemo } from 'react'
import LabelCard, { renderLabelHtml } from '@site/src/components/BatasMakan/LabelCard'

const STORAGE_KEY = 'batas_makan_config_v2'

const toSafeBase64 = (str) => {
  try {
    const encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
    return btoa(encoded)
  } catch {
    return ''
  }
}

const fromSafeBase64 = (str) => {
  try {
    const decoded = atob(str)
      .split('')
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join('')
    return decodeURIComponent(decoded)
  } catch {
    return ''
  }
}

// Presets for quick selection
const MENU_PRESETS = [
  'AYAM GORENG',
  'AYAM KECAP',
  'DAGING SAPI SEMUR',
  'IKAN GORENG TEPUNG',
  'SOP SAYURAN SAPI',
  'TELUR BALADO PEDAS MANIS',
  'NASI PUTIH',
  'BUAH POTONG',
  'SUSU UHT'
]

const PORSI_OPTIONS = ['PORSI BESAR', 'PORSI KECIL', 'PORSI SEDANG']

const NOTE_PRESETS = [
  'MAKAN DI TEMPAT OMPRENG\nTIDAK BOLEH DIBAWA PULANG',
  'MAKAN DITEMPAT. OMPRENG TIDAK BOLEH DIBAWA PULANG',
  'TIDAK UNTUK DIBAWA PULANG',
  'KONSUMSI SEBELUM JAM BATAS MAKAN',
  'SIMPAN DI TEMPAT SEJUK'
]

const HEADER_COLOR_PRESETS = [
  { label: 'Hijau BGN (Default)', value: '#16a34a' },
  { label: 'Putih (Latar Terang)', value: '#ffffff' },
  { label: 'Merah', value: '#dc2626' },
  { label: 'Biru', value: '#2563eb' },
  { label: 'Oranye', value: '#d97706' },
  { label: 'Ungu', value: '#7c3aed' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Hitam', value: '#000000' }
]

const JAM_PRESETS = ['10.00 - 12.00', '11.00 - 13.00', '12.00 - 14.00', '15.00 WIB']

const VERSION_OPTIONS = [
  { label: 'Versi 2 (Informasi Gizi & Fleksibel)', value: 'v2' },
  { label: 'Versi 1 (Standar BGN)', value: 'v1' }
]

const HEADER_PRESETS = [
  'MBG - MENU HARI INI',
  'INFORMASI GIZI',
  'BATAS MAKAN',
  'SPPG BGN',
  'KONSUMSI SEBELUM'
]

const SIZE_PRESETS = [
  { label: '60 × 40 mm (Standar Landsekap BGN)', width: 60, height: 40 },
  { label: '60 × 30 mm (Ringkas / Kecil)', width: 60, height: 30 },
  { label: '40 × 60 mm (Standar Potret)', width: 40, height: 60 },
  { label: '50 × 30 mm (Kecil)', width: 50, height: 30 }
]

const GAP_PRESETS = [
  { label: '0 mm (Rapat / 1x Gunting)', value: 0 },
  { label: '1 mm', value: 1 },
  { label: '2 mm', value: 2 },
  { label: '3 mm (Longgar)', value: 3 }
]

const SEPARATOR_OPTIONS = [
  { label: 'Strip ( - )', value: '-' },
  { label: 'Titik ( · )', value: '·' },
  { label: 'Bintang ( * )', value: '*' },
  { label: 'Tanpa Pemisah', value: 'none' }
]

const WRAP_OPTIONS = [
  { label: 'Auto Wrap (Bila Nama Panjang)', value: 'auto' },
  { label: 'Wrap 2 Baris (Porsi di Bawah)', value: 'wrap' },
  { label: '1 Baris (Sejajar)', value: 'single' }
]

const COLOR_MODE_OPTIONS = [
  { label: '🎨 Warna (Hijau BGN)', value: 'color' },
  { label: '🖤 Hitam-Putih / Polos (Thermal / Hemat Tinta)', value: 'bw' }
]

const formatGiziVal = (val, defaultUnit) => {
  if (!val || typeof val !== 'string' || !val.trim()) return ''
  const trimmed = val.trim()
  if (/[a-zA-Z]/.test(trimmed)) return trimmed
  return `${trimmed} ${defaultUnit}`
}

export default function BatasMakanPage() {
  const [isClient, setIsClient] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [downloadingPng, setDownloadingPng] = useState(false)
  const [resetMsg, setResetMsg] = useState('')

  // Current Form Inputs & Label Version
  const [labelVersion, setLabelVersion] = useState('v1') // 'v1' or 'v2'
  const [headerText, setHeaderText] = useState('MBG - MENU HARI INI')
  const [headerBgColor, setHeaderBgColor] = useState('#16a34a')
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('10.00 - 12.00')
  const [namaMenu, setNamaMenu] = useState('AYAM GORENG')
  const [porsiMenu, setPorsiMenu] = useState('PORSI BESAR')
  const [catatan, setCatatan] = useState('MAKAN DI TEMPAT OMPRENG\nTIDAK BOLEH DIBAWA PULANG')
  const [jumlah, setJumlah] = useState(21) // Default 21 label (1 lembar A4)

  // Icon Toggles for V2
  const [showGiziIcons, setShowGiziIcons] = useState(true)
  const [showNoteIcon, setShowNoteIcon] = useState(true)
  const [showTimeIcon, setShowTimeIcon] = useState(true)

  // Nutrition Analysis States (for V2)
  const [energi, setEnergi] = useState('512,14')
  const [protein, setProtein] = useState('20,17')
  const [lemak, setLemak] = useState('18,27')
  const [karbohidrat, setKarbohidrat] = useState('66,16')
  const [serat, setSerat] = useState('1,96')

  const [widthMm, setWidthMm] = useState(60)
  const [heightMm, setHeightMm] = useState(40)
  const [gridGapMm, setGridGapMm] = useState(0) // Default 0 mm (Rapat / Sekali gunting)

  // Formatting & Color Options
  const [separator, setSeparator] = useState('·')
  const [wrapMode, setWrapMode] = useState('auto')
  const [colorMode, setColorMode] = useState('color') // 'color' or 'bw'

  // Per-Input Custom Font Sizes (in pt)
  const [fontHeader, setFontHeader] = useState(10)
  const [fontTanggal, setFontTanggal] = useState(13)
  const [fontJam, setFontJam] = useState(14)
  const [fontMenu, setFontMenu] = useState(8.5)
  const [fontPorsi, setFontPorsi] = useState(8)
  const [fontCatatan, setFontCatatan] = useState(7.5)
  const [fontGizi, setFontGizi] = useState(7)

  // Advanced Layout Options: TRBL Padding per Field & Borders
  const [hdrPadT, setHdrPadT] = useState(2)
  const [hdrPadR, setHdrPadR] = useState(0)
  const [hdrPadB, setHdrPadB] = useState(2)
  const [hdrPadL, setHdrPadL] = useState(0)

  const [datePadT, setDatePadT] = useState(1)
  const [datePadR, setDatePadR] = useState(0)
  const [datePadB, setDatePadB] = useState(1)
  const [datePadL, setDatePadL] = useState(0)

  const [menuPadT, setMenuPadT] = useState(2)
  const [menuPadR, setMenuPadR] = useState(1)
  const [menuPadB, setMenuPadB] = useState(2)
  const [menuPadL, setMenuPadL] = useState(1)

  const [giziPadT, setGiziPadT] = useState(1.5)
  const [giziPadR, setGiziPadR] = useState(0)
  const [giziPadB, setGiziPadB] = useState(1.5)
  const [giziPadL, setGiziPadL] = useState(0)

  const [notePadT, setNotePadT] = useState(3)
  const [notePadR, setNotePadR] = useState(0)
  const [notePadB, setNotePadB] = useState(2)
  const [notePadL, setNotePadL] = useState(0)

  const [borderWidth, setBorderWidth] = useState(2) // Default 2px
  const [dividerWidth, setDividerWidth] = useState(1) // Default 1px
  const [showAdvanced, setShowAdvanced] = useState(false) // Hidden by default

  // Batch List for printing multiple different menus in one run
  const [items, setItems] = useState([])

  // Format Helper: DD/MM/YYYY
  const formatDateDDMMYYYY = (dateObj) => {
    const d = String(dateObj.getDate()).padStart(2, '0')
    const m = String(dateObj.getMonth() + 1).padStart(2, '0')
    const y = dateObj.getFullYear()
    return `${d}/${m}/${y}`
  }

  // Format Helper: HH.mm WIB
  const formatTimeWIB = (dateObj) => {
    const h = String(dateObj.getHours()).padStart(2, '0')
    const min = String(dateObj.getMinutes()).padStart(2, '0')
    return `${h}.${min} WIB`
  }

  // Reset Form to Default Values (V1 or V2)
  const handleResetDefault = (targetVer = labelVersion) => {
    const now = new Date()
    const defaultDate = formatDateDDMMYYYY(now)

    if (targetVer === 'v1') {
      setLabelVersion('v1')
      setHeaderText('BATAS MAKAN')
      setHeaderBgColor('#16a34a')
      setTanggal(defaultDate)
      setJam('10.00 - 12.00')
      setNamaMenu('AYAM GORENG')
      setPorsiMenu('PORSI BESAR')
      setCatatan('MAKAN DI TEMPAT OMPRENG\nTIDAK BOLEH DIBAWA PULANG')
      setJumlah(21)

      setShowGiziIcons(true)
      setShowNoteIcon(true)
      setShowTimeIcon(true)

      setSeparator('·')
      setWrapMode('auto')
      setColorMode('color')

      setFontHeader(10)
      setFontTanggal(13)
      setFontJam(14)
      setFontMenu(8.5)
      setFontPorsi(8)
      setFontCatatan(7.5)
      setFontGizi(7)

      setHdrPadT(2)
      setHdrPadR(0)
      setHdrPadB(2)
      setHdrPadL(0)

      setDatePadT(1)
      setDatePadR(0)
      setDatePadB(1)
      setDatePadL(0)

      setMenuPadT(2)
      setMenuPadR(1)
      setMenuPadB(2)
      setMenuPadL(1)

      setGiziPadT(1.5)
      setGiziPadR(0)
      setGiziPadB(1.5)
      setGiziPadL(0)

      setNotePadT(3)
      setNotePadR(0)
      setNotePadB(2)
      setNotePadL(0)

      setBorderWidth(2)
      setDividerWidth(1)
      setResetMsg('✓ Berhasil direset ke default Versi 1!')
    } else {
      setLabelVersion('v2')
      setHeaderText('MBG - MENU HARI INI')
      setHeaderBgColor('#ffffff')
      setTanggal('')
      setJam('10.00 - 12.00')
      setNamaMenu('AYAM KECAP')
      setPorsiMenu('PORSI BESAR')
      setCatatan('MAKAN DI TEMPAT OMPRENG\nTIDAK BOLEH DIBAWA PULANG')
      setJumlah(21)

      setShowGiziIcons(true)
      setShowNoteIcon(true)
      setShowTimeIcon(true)

      setEnergi('512,14')
      setProtein('20,17')
      setLemak('18,27')
      setKarbohidrat('66,16')
      setSerat('1,96')

      setSeparator('·')
      setWrapMode('auto')
      setColorMode('color')

      setFontHeader(7)
      setFontTanggal(6)
      setFontJam(6)
      setFontMenu(6)
      setFontPorsi(6)
      setFontCatatan(5)
      setFontGizi(6)

      setHdrPadT(2)
      setHdrPadR(0)
      setHdrPadB(2)
      setHdrPadL(0)

      setDatePadT(0)
      setDatePadR(0)
      setDatePadB(0)
      setDatePadL(0)

      setMenuPadT(2)
      setMenuPadR(1)
      setMenuPadB(2)
      setMenuPadL(1)

      setGiziPadT(0.5)
      setGiziPadR(0)
      setGiziPadB(0.5)
      setGiziPadL(0)

      setNotePadT(1)
      setNotePadR(0)
      setNotePadB(2)
      setNotePadL(0)

      setBorderWidth(2)
      setDividerWidth(1)
      setResetMsg('✓ Berhasil direset ke default Versi 2!')
    }

    setTimeout(() => setResetMsg(''), 2500)
  }

  // Reset Font Sizes helper
  const handleResetFontSizes = () => {
    if (labelVersion === 'v2') {
      setFontHeader(7)
      setFontTanggal(6)
      setFontJam(6)
      setFontMenu(6)
      setFontPorsi(6)
      setFontCatatan(5)
      setFontGizi(6)
    } else {
      setFontHeader(10)
      setFontTanggal(13)
      setFontJam(14)
      setFontMenu(8.5)
      setFontPorsi(8)
      setFontCatatan(7.5)
      setFontGizi(7)
    }
  }

  // Reset Advanced Layout TRBL helper
  const handleResetAdvancedLayout = () => {
    if (labelVersion === 'v2') {
      setHdrPadT(2)
      setHdrPadR(0)
      setHdrPadB(2)
      setHdrPadL(0)

      setDatePadT(0)
      setDatePadR(0)
      setDatePadB(0)
      setDatePadL(0)

      setMenuPadT(2)
      setMenuPadR(1)
      setMenuPadB(2)
      setMenuPadL(1)

      setGiziPadT(0.5)
      setGiziPadR(0)
      setGiziPadB(0.5)
      setGiziPadL(0)

      setNotePadT(1)
      setNotePadR(0)
      setNotePadB(2)
      setNotePadL(0)

      setBorderWidth(2)
      setDividerWidth(1)
    } else {
      setHdrPadT(2)
      setHdrPadR(0)
      setHdrPadB(2)
      setHdrPadL(0)

      setDatePadT(1)
      setDatePadR(0)
      setDatePadB(1)
      setDatePadL(0)

      setMenuPadT(2)
      setMenuPadR(1)
      setMenuPadB(2)
      setMenuPadL(1)

      setGiziPadT(1.5)
      setGiziPadR(0)
      setGiziPadB(1.5)
      setGiziPadL(0)

      setNotePadT(3)
      setNotePadR(0)
      setNotePadB(2)
      setNotePadL(0)

      setBorderWidth(2)
      setDividerWidth(1)
    }
  }

  // Set default date & time / Load from URL Query Params or LocalStorage on mount
  useEffect(() => {
    setIsClient(true)
    const now = new Date()
    const defaultDate = formatDateDDMMYYYY(now)
    const defaultTime = formatTimeWIB(new Date(now.getTime() + 4 * 60 * 60 * 1000))

    let loaded = null
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const shared = params.get('d')

      if (shared) {
        try {
          const decoded = fromSafeBase64(shared)
          if (decoded) loaded = JSON.parse(decoded)
        } catch {}
      }

      if (!loaded) {
        const saved = window.localStorage.getItem(STORAGE_KEY)
        if (saved) {
          try {
            loaded = JSON.parse(saved)
          } catch {}
        }
      }
    }

    if (loaded) {
      if (loaded.v) setLabelVersion(loaded.v)
      if (loaded.hdr !== undefined) setHeaderText(loaded.hdr)
      if (loaded.hbc !== undefined) setHeaderBgColor(loaded.hbc)
      if (typeof loaded.sgi === 'boolean') setShowGiziIcons(loaded.sgi)
      if (typeof loaded.sni === 'boolean') setShowNoteIcon(loaded.sni)
      if (typeof loaded.sti === 'boolean') setShowTimeIcon(loaded.sti)
      if (loaded.eg !== undefined) setEnergi(loaded.eg)
      if (loaded.pr !== undefined) setProtein(loaded.pr)
      if (loaded.lm !== undefined) setLemak(loaded.lm)
      if (loaded.kb !== undefined) setKarbohidrat(loaded.kb)
      if (loaded.sr !== undefined) setSerat(loaded.sr)
      setTanggal(loaded.t || defaultDate)
      setJam(loaded.j !== undefined ? loaded.j : '10.00 - 12.00')
      if (loaded.m) setNamaMenu(loaded.m)
      if (loaded.p) setPorsiMenu(loaded.p)
      if (loaded.c) setCatatan(loaded.c)
      if (loaded.n) setJumlah(loaded.n)
      if (loaded.w) setWidthMm(loaded.w)
      if (loaded.h) setHeightMm(loaded.h)
      if (typeof loaded.gap === 'number') setGridGapMm(loaded.gap)
      if (loaded.sep) setSeparator(loaded.sep)
      if (loaded.wrap) setWrapMode(loaded.wrap)
      if (loaded.col) setColorMode(loaded.col)
      if (loaded.fh) setFontHeader(loaded.fh)
      if (loaded.ft) setFontTanggal(loaded.ft)
      if (loaded.fj) setFontJam(loaded.fj)
      if (loaded.fm) setFontMenu(loaded.fm)
      if (loaded.fp) setFontPorsi(loaded.fp)
      if (loaded.fc) setFontCatatan(loaded.fc)
      if (loaded.fg) setFontGizi(loaded.fg)

      if (typeof loaded.hpt === 'number') setHdrPadT(loaded.hpt)
      if (typeof loaded.hpr === 'number') setHdrPadR(loaded.hpr)
      if (typeof loaded.hpb === 'number') setHdrPadB(loaded.hpb)
      if (typeof loaded.hpl === 'number') setHdrPadL(loaded.hpl)

      if (typeof loaded.dpt === 'number') setDatePadT(loaded.dpt)
      if (typeof loaded.dpr === 'number') setDatePadR(loaded.dpr)
      if (typeof loaded.dpb === 'number') setDatePadB(loaded.dpb)
      if (typeof loaded.dpl === 'number') setDatePadL(loaded.dpl)

      if (typeof loaded.mpt === 'number') setMenuPadT(loaded.mpt)
      if (typeof loaded.mpr === 'number') setMenuPadR(loaded.mpr)
      if (typeof loaded.mpb === 'number') setMenuPadB(loaded.mpb)
      if (typeof loaded.mpl === 'number') setMenuPadL(loaded.mpl)

      if (typeof loaded.gpt === 'number') setGiziPadT(loaded.gpt)
      if (typeof loaded.gpr === 'number') setGiziPadR(loaded.gpr)
      if (typeof loaded.gpb === 'number') setGiziPadB(loaded.gpb)
      if (typeof loaded.gpl === 'number') setGiziPadL(loaded.gpl)

      if (typeof loaded.npt === 'number') setNotePadT(loaded.npt)
      if (typeof loaded.npr === 'number') setNotePadR(loaded.npr)
      if (typeof loaded.npb === 'number') setNotePadB(loaded.npb)
      if (typeof loaded.npl === 'number') setNotePadL(loaded.npl)

      if (typeof loaded.bw === 'number') setBorderWidth(loaded.bw)
      if (typeof loaded.dw === 'number') setDividerWidth(loaded.dw)
      if (Array.isArray(loaded.items)) setItems(loaded.items)
    } else {
      setTanggal(defaultDate)
      setJam('10.00 - 12.00')
    }

    setIsReady(true)
  }, [])

  // Auto-sync state to LocalStorage and URL Query Param (?d=...)
  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return

    const payload = {
      v: labelVersion,
      hdr: headerText,
      hbc: headerBgColor,
      sgi: showGiziIcons,
      sni: showNoteIcon,
      sti: showTimeIcon,
      eg: energi,
      pr: protein,
      lm: lemak,
      kb: karbohidrat,
      sr: serat,
      fg: fontGizi,
      t: tanggal,
      j: jam,
      m: namaMenu,
      p: porsiMenu,
      c: catatan,
      n: jumlah,
      w: widthMm,
      h: heightMm,
      gap: gridGapMm,
      sep: separator,
      wrap: wrapMode,
      col: colorMode,
      fh: fontHeader,
      ft: fontTanggal,
      fj: fontJam,
      fm: fontMenu,
      fp: fontPorsi,
      fc: fontCatatan,
      hpt: hdrPadT,
      hpr: hdrPadR,
      hpb: hdrPadB,
      hpl: hdrPadL,
      dpt: datePadT,
      dpr: datePadR,
      dpb: datePadB,
      dpl: datePadL,
      mpt: menuPadT,
      mpr: menuPadR,
      mpb: menuPadB,
      mpl: menuPadL,
      gpt: giziPadT,
      gpr: giziPadR,
      gpb: giziPadB,
      gpl: giziPadL,
      npt: notePadT,
      npr: notePadR,
      npb: notePadB,
      npl: notePadL,
      bw: borderWidth,
      dw: dividerWidth,
      items
    }

    // 1. Save state to LocalStorage
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {}

    // 2. Update URL Query Param silently without page refresh
    try {
      const encoded = toSafeBase64(JSON.stringify(payload))
      const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      window.history.replaceState({}, '', `${baseUrl}?d=${encoded}`)
    } catch {}
  }, [
    isReady,
    labelVersion,
    headerText,
    headerBgColor,
    showGiziIcons,
    showNoteIcon,
    showTimeIcon,
    energi,
    protein,
    lemak,
    karbohidrat,
    serat,
    fontGizi,
    tanggal,
    jam,
    namaMenu,
    porsiMenu,
    catatan,
    jumlah,
    widthMm,
    heightMm,
    gridGapMm,
    separator,
    wrapMode,
    colorMode,
    fontHeader,
    fontTanggal,
    fontJam,
    fontMenu,
    fontPorsi,
    fontCatatan,
    hdrPadT,
    hdrPadR,
    hdrPadB,
    hdrPadL,
    datePadT,
    datePadR,
    datePadB,
    datePadL,
    menuPadT,
    menuPadR,
    menuPadB,
    menuPadL,
    notePadT,
    notePadR,
    notePadB,
    notePadL,
    borderWidth,
    dividerWidth,
    items
  ])

  // Share Link Handler
  const handleCopyShareLink = () => {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  // Load html-to-image dynamically for PNG export
  const loadHtmlToImage = () => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject('window is undefined')
      if (window.htmlToImage) {
        resolve(window.htmlToImage)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js'
      script.onload = () => resolve(window.htmlToImage)
      script.onerror = reject
      document.body.appendChild(script)
    })
  }

  // Download Single Label PNG
  const handleDownloadSinglePng = async () => {
    try {
      setDownloadingPng(true)
      const htmlToImage = await loadHtmlToImage()
      const element = document.getElementById('single-label-preview')
      if (!element) return

      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 4, // 4x high resolution for crisp print
        backgroundColor: '#ffffff'
      })

      const link = document.createElement('a')
      link.href = dataUrl
      const menuClean = (namaMenu || 'MENU').replace(/\s+/g, '_').toUpperCase()
      const dateClean = (tanggal || '').replace(/\//g, '-')
      link.download = `Label_${menuClean}_${dateClean}.png`
      link.click()
    } catch (err) {
      console.error('Download Single PNG error:', err)
    } finally {
      setDownloadingPng(false)
    }
  }

  // Quick Time Adder
  const addHoursToNow = (hours) => {
    const now = new Date()
    const target = new Date(now.getTime() + hours * 60 * 60 * 1000)
    setTanggal(formatDateDDMMYYYY(target))
    setJam(formatTimeWIB(target))
  }

  const setNowTime = () => {
    const now = new Date()
    setTanggal(formatDateDDMMYYYY(now))
    setJam(formatTimeWIB(now))
  }

  // Add item to batch
  const handleAddItem = (e) => {
    if (e) e.preventDefault()
    if (!namaMenu.trim()) return

    const newItem = {
      id: Date.now(),
      labelVersion,
      headerText: headerText.trim(),
      headerBgColor,
      showGiziIcons,
      showNoteIcon,
      showTimeIcon,
      energi,
      protein,
      lemak,
      karbohidrat,
      serat,
      fontGizi,
      tanggal: tanggal.trim(),
      jam: jam.trim(),
      namaMenu: namaMenu.toUpperCase().trim(),
      porsiMenu: porsiMenu.toUpperCase().trim(),
      catatan: catatan.toUpperCase().trim(),
      jumlah: Number(jumlah) || 1,
      separator,
      wrapMode,
      colorMode,
      fontHeader,
      fontTanggal,
      fontJam,
      fontMenu,
      fontPorsi,
      fontCatatan,
      hdrPadT,
      hdrPadR,
      hdrPadB,
      hdrPadL,
      datePadT,
      datePadR,
      datePadB,
      datePadL,
      menuPadT,
      menuPadR,
      menuPadB,
      menuPadL,
      giziPadT,
      giziPadR,
      giziPadB,
      giziPadL,
      notePadT,
      notePadR,
      notePadB,
      notePadL,
      borderWidth,
      dividerWidth
    }

    setItems((prev) => [...prev, newItem])
  }

  // Remove item from batch
  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Clear batch
  const handleClearItems = () => {
    setItems([])
  }

  // Calculate labels list to render
  const activeLabels = useMemo(() => {
    // If batch items exist, expand them
    if (items.length > 0) {
      const list = []
      items.forEach((item) => {
        for (let i = 0; i < item.jumlah; i++) {
          list.push(item)
        }
      })
      return list
    }

    // Otherwise render current single form item repeated by 'jumlah'
    const single = {
      id: 1,
      labelVersion,
      headerText: headerText.trim(),
      headerBgColor,
      showGiziIcons,
      showNoteIcon,
      showTimeIcon,
      energi,
      protein,
      lemak,
      karbohidrat,
      serat,
      fontGizi,
      tanggal: tanggal.trim(),
      jam: jam.trim(),
      namaMenu: namaMenu.toUpperCase().trim(),
      porsiMenu: porsiMenu.toUpperCase().trim(),
      catatan: catatan.toUpperCase().trim(),
      separator,
      wrapMode,
      colorMode,
      fontHeader,
      fontTanggal,
      fontJam,
      fontMenu,
      fontPorsi,
      fontCatatan,
      hdrPadT,
      hdrPadR,
      hdrPadB,
      hdrPadL,
      datePadT,
      datePadR,
      datePadB,
      datePadL,
      menuPadT,
      menuPadR,
      menuPadB,
      menuPadL,
      notePadT,
      notePadR,
      notePadB,
      notePadL,
      borderWidth,
      dividerWidth
    }

    const list = []
    const count = Number(jumlah) || 1
    for (let i = 0; i < count; i++) {
      list.push(single)
    }
    return list
  }, [
    items,
    labelVersion,
    headerText,
    headerBgColor,
    showGiziIcons,
    showNoteIcon,
    showTimeIcon,
    energi,
    protein,
    lemak,
    karbohidrat,
    serat,
    fontGizi,
    tanggal,
    jam,
    namaMenu,
    porsiMenu,
    catatan,
    jumlah,
    separator,
    wrapMode,
    colorMode,
    fontHeader,
    fontTanggal,
    fontJam,
    fontMenu,
    fontPorsi,
    fontCatatan,
    hdrPadT,
    hdrPadR,
    hdrPadB,
    hdrPadL,
    datePadT,
    datePadR,
    datePadB,
    datePadL,
    menuPadT,
    menuPadR,
    menuPadB,
    menuPadL,
    notePadT,
    notePadR,
    notePadB,
    notePadL,
    borderWidth,
    dividerWidth
  ])

  // Open Clean Window Printer (Pure white page without any UI, background colors or theme elements)
  const handleOpenCleanPrintWindow = () => {
    if (typeof window === 'undefined') return

    const printWindow = window.open('', '_blank', 'width=900,height=1000')
    if (!printWindow) {
      // Fallback if popup blocked
      window.print()
      return
    }

    const labelsHtml = activeLabels.map((lbl) => renderLabelHtml(lbl)).join('')

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cetak Batas Makan - Halaman Polos</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 5mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff !important;
              background-color: #ffffff !important;
              color: #000000 !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .grid-sheet {
              display: grid;
              grid-template-columns: repeat(auto-fill, ${widthMm}mm);
              gap: ${gridGapMm}mm;
              justify-content: center;
              align-content: start;
              width: 100%;
              padding: 0;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          <div class="grid-sheet">
            ${labelsHtml}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 200);
            };
          </script>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(fullHtml)
    printWindow.document.close()
  }

  // Quick print handler
  const handlePrint = () => {
    handleOpenCleanPrintWindow()
  }

  const isSmallHeight = heightMm <= 32

  return (
    <main className='min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 dark:bg-slate-900 dark:text-slate-100 print:bg-white print:p-0'>
      {/* Top Header Controls (Hidden on Print) */}
      <div className='no-print mx-auto max-w-6xl'>
        <div className='mb-6 flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between dark:border-slate-800'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='inline-block rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white'>
                BGN SPPG
              </span>
              <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                Cetak Label Batas Makan
              </h1>
            </div>
            <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
              Fitur generator cetak label batas makan wadah / ompreng gizi (Ukuran 40 × 60 mm / A4
              Grid).
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => handleResetDefault(labelVersion)}
              className='inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 shadow-xs hover:bg-amber-100 active:scale-95 transition dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
              title='Reset seluruh input & tata letak ke nilai awal default (V1 / V2)'
            >
              🔄 Reset Default
            </button>

            <button
              type='button'
              onClick={handleCopyShareLink}
              className='inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 shadow-xs hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              title='Salin URL link konfigurasi label ini untuk dibagikan'
            >
              {copiedLink ? '✓ Link Tersalin!' : '🔗 Salin Link Share'}
            </button>

            <button
              type='button'
              onClick={handleDownloadSinglePng}
              disabled={downloadingPng}
              className='inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-600 bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-xs hover:bg-emerald-50 dark:border-emerald-500 dark:bg-slate-800 dark:text-emerald-300'
              title='Unduh 1 Gambar Label Format PNG'
            >
              {downloadingPng ? '⏳ Memproses PNG...' : '🖼️ Unduh 1 PNG'}
            </button>

            <button
              type='button'
              onClick={handlePrint}
              className='inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95'
            >
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H7a2 2 0 00-2 2v4h10z'
                />
              </svg>
              🖨️ CETAK HALAMAN POLOS ({activeLabels.length} Label)
            </button>
          </div>
        </div>

        {/* Form & Config Panel */}
        <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Form Input Section */}
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7 dark:border-slate-800 dark:bg-slate-800'>
            <h2 className='mb-4 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'>
                1
              </span>
              Input Data Label
            </h2>

            <div className='space-y-4 text-sm'>
              {/* Mode Versi Label & Custom Header */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                    VERSI LAYOUT LABEL
                  </label>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    {VERSION_OPTIONS.map((v) => (
                      <button
                        key={v.value}
                        type='button'
                        onClick={() => handleResetDefault(v.value)}
                        className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                          labelVersion === v.value
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                    <button
                      type='button'
                      onClick={() => handleResetDefault(labelVersion)}
                      className='inline-flex cursor-pointer items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 active:scale-95 transition dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      title='Reset ke nilai default versi ini'
                    >
                      🔄 Reset Default
                    </button>
                    {resetMsg && (
                      <span className='ml-1 text-xs font-bold text-amber-700 dark:text-amber-400 animate-pulse'>
                        {resetMsg}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                    JUDUL HEADER (Kustom)
                  </label>
                  <input
                    type='text'
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    placeholder='Contoh: INFORMASI GIZI atau BATAS MAKAN'
                    className='w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold uppercase dark:border-slate-600 dark:bg-slate-900'
                  />
                  <div className='mt-1 flex flex-wrap gap-1'>
                    {HEADER_PRESETS.map((h) => (
                      <button
                        key={h}
                        type='button'
                        onClick={() => setHeaderText(h)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
                          headerText.toUpperCase() === h
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>

                  {/* WARNA HEADER */}
                  <div className='mt-2.5 border-t border-slate-200 pt-2 dark:border-slate-700'>
                    <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-300'>
                      🎨 WARNA HEADER (Kustom):
                    </label>
                    <div className='flex flex-wrap items-center gap-1.5'>
                      {HEADER_COLOR_PRESETS.map((c) => (
                        <button
                          key={c.value}
                          type='button'
                          onClick={() => setHeaderBgColor(c.value)}
                          className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold text-white transition ${
                            headerBgColor === c.value
                              ? 'scale-105 ring-2 ring-slate-800 ring-offset-1 dark:ring-white'
                              : 'opacity-85 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.value }}
                        >
                          <span>{c.label}</span>
                        </button>
                      ))}
                      <div className='flex items-center gap-1 rounded-md border border-slate-300 bg-white px-1.5 py-0.5 dark:border-slate-600 dark:bg-slate-900'>
                        <span className='text-[10px] font-bold text-slate-700 dark:text-slate-300'>
                          Kustom:
                        </span>
                        <input
                          type='color'
                          value={headerBgColor}
                          onChange={(e) => setHeaderBgColor(e.target.value)}
                          className='h-4 w-6 cursor-pointer rounded border-0 bg-transparent p-0'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Analisis Gizi (Khusus Versi 2) */}
              {labelVersion === 'v2' && (
                <div className='space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <label className='flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-emerald-900 uppercase dark:text-emerald-300'>
                      <span>🥗 Analisis Gizi (Versi 2)</span>
                    </label>
                    <div className='flex items-center gap-3'>
                      <label className='flex cursor-pointer items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300'>
                        <input
                          type='checkbox'
                          checked={showGiziIcons}
                          onChange={(e) => setShowGiziIcons(e.target.checked)}
                          className='rounded border-slate-300 text-emerald-600 focus:ring-emerald-500'
                        />
                        <span>Tampilkan Icon Gizi (⚡🥩🥑)</span>
                      </label>
                      <button
                        type='button'
                        onClick={() => {
                          setEnergi('512,14')
                          setProtein('20,17')
                          setLemak('18,27')
                          setKarbohidrat('66,16')
                          setSerat('1,96')
                        }}
                        className='cursor-pointer text-[11px] font-bold text-emerald-700 hover:underline dark:text-emerald-400'
                      >
                        ↺ Preset Contoh
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          setEnergi('')
                          setProtein('')
                          setLemak('')
                          setKarbohidrat('')
                          setSerat('')
                        }}
                        className='cursor-pointer text-[11px] font-bold text-red-600 hover:underline'
                      >
                        Kosongkan
                      </button>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                    <div>
                      <label className='mb-0.5 block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        ENERGI (kkal)
                      </label>
                      <input
                        type='text'
                        value={energi}
                        onChange={(e) => setEnergi(e.target.value)}
                        placeholder='Contoh: 512,14'
                        className='w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                      />
                    </div>
                    <div>
                      <label className='mb-0.5 block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        PROTEIN (gr)
                      </label>
                      <input
                        type='text'
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        placeholder='Contoh: 20,17'
                        className='w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                      />
                    </div>
                    <div>
                      <label className='mb-0.5 block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        LEMAK (gr)
                      </label>
                      <input
                        type='text'
                        value={lemak}
                        onChange={(e) => setLemak(e.target.value)}
                        placeholder='Contoh: 18,27'
                        className='w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                      />
                    </div>
                    <div>
                      <label className='mb-0.5 block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        KARBOHIDRAT (gr)
                      </label>
                      <input
                        type='text'
                        value={karbohidrat}
                        onChange={(e) => setKarbohidrat(e.target.value)}
                        placeholder='Contoh: 66,16'
                        className='w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                      />
                    </div>
                    <div>
                      <label className='mb-0.5 block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        SERAT (gr)
                      </label>
                      <input
                        type='text'
                        value={serat}
                        onChange={(e) => setSerat(e.target.value)}
                        placeholder='Contoh: 1,96'
                        className='w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tanggal & Jam */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                    TANGGAL (Batas Makan)
                  </label>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      placeholder='DD/MM/YYYY (contoh: 11/08/2026)'
                      className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-600 dark:bg-slate-900'
                    />
                    <button
                      type='button'
                      onClick={setNowTime}
                      className='shrink-0 rounded-lg border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-bold hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700'
                      title='Set tanggal & jam sekarang'
                    >
                      Hari Ini
                    </button>
                  </div>
                </div>

                <div>
                  <div className='mb-1 flex items-center justify-between'>
                    <label className='block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                      JAM (Batas Makan)
                    </label>
                    <label className='flex cursor-pointer items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300'>
                      <input
                        type='checkbox'
                        checked={showTimeIcon}
                        onChange={(e) => setShowTimeIcon(e.target.checked)}
                        className='rounded border-slate-300 text-emerald-600 focus:ring-emerald-500'
                      />
                      <span>Icon ⏱️</span>
                    </label>
                  </div>
                  <input
                    type='text'
                    value={jam}
                    onChange={(e) => setJam(e.target.value)}
                    placeholder='HH.mm - HH.mm atau HH.mm WIB (contoh: 10.00 - 12.00)'
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-600 dark:bg-slate-900'
                  />
                  {/* Quick Time Adders & Presets */}
                  <div className='mt-1.5 flex flex-wrap items-center gap-1'>
                    <span className='mr-0.5 self-center text-[10px] font-medium text-slate-400'>
                      +Durasi:
                    </span>
                    {[2, 3, 4, 5].map((h) => (
                      <button
                        key={h}
                        type='button'
                        onClick={() => addHoursToNow(h)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-emerald-900'
                      >
                        +{h} Jam
                      </button>
                    ))}
                    {JAM_PRESETS.map((jp) => (
                      <button
                        key={jp}
                        type='button'
                        onClick={() => setJam(jp)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition ${
                          jam === jp
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {jp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nama Menu */}
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                  NAMA MENU
                </label>
                <input
                  type='text'
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                  placeholder='Contoh: AYAM KECAP'
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold uppercase dark:border-slate-600 dark:bg-slate-900'
                />
                {/* Presets */}
                <div className='mt-1.5 flex flex-wrap gap-1.5'>
                  {MENU_PRESETS.map((m) => (
                    <button
                      key={m}
                      type='button'
                      onClick={() => setNamaMenu(m)}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${
                        namaMenu.toUpperCase() === m
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Porsi Menu */}
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                  PORSI MENU
                </label>
                <div className='flex flex-wrap gap-2'>
                  {PORSI_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type='button'
                      onClick={() => setPorsiMenu(p)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                        porsiMenu.toUpperCase() === p
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <input
                    type='text'
                    value={porsiMenu}
                    onChange={(e) => setPorsiMenu(e.target.value)}
                    placeholder='Atau ketik porsi...'
                    className='rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold uppercase dark:border-slate-600 dark:bg-slate-900'
                  />
                </div>
              </div>

              {/* Mode Warna & Formatting */}
              <div className='space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/60'>
                <div>
                  <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                    MODE CETAK / WARNA (Guna Menghemat Tinta Print):
                  </label>
                  <div className='flex flex-wrap gap-1.5'>
                    {COLOR_MODE_OPTIONS.map((c) => (
                      <button
                        key={c.value}
                        type='button'
                        onClick={() => setColorMode(c.value)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          colorMode === c.value
                            ? 'bg-slate-900 text-white dark:bg-emerald-600'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-3 border-t border-slate-200 pt-1 sm:grid-cols-2 dark:border-slate-800'>
                  <div>
                    <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                      PEMISAH PORSI MENU
                    </label>
                    <div className='flex flex-wrap gap-1'>
                      {SEPARATOR_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          type='button'
                          onClick={() => setSeparator(s.value)}
                          className={`rounded px-2 py-1 text-xs font-bold transition ${
                            separator === s.value
                              ? 'bg-emerald-600 text-white'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                      TAMPILAN BARIS (WRAP)
                    </label>
                    <div className='flex flex-wrap gap-1'>
                      {WRAP_OPTIONS.map((w) => (
                        <button
                          key={w.value}
                          type='button'
                          onClick={() => setWrapMode(w.value)}
                          className={`rounded px-2 py-1 text-xs font-bold transition ${
                            wrapMode === w.value
                              ? 'bg-emerald-600 text-white'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Font Size Per Input Section */}
              <div className='space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20'>
                <div className='flex items-center justify-between'>
                  <label className='flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-emerald-900 uppercase dark:text-emerald-300'>
                    <span>🔤 Pengaturan Font Size (Ukuran Font) Tiap Input (pt)</span>
                  </label>
                  <button
                    type='button'
                    onClick={() => handleResetFontSizes()}
                    className='cursor-pointer text-[11px] font-bold text-emerald-700 hover:underline dark:text-emerald-400'
                  >
                    ↺ Reset ke Standar
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  {/* Header (Batas Makan) */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE HEADER
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontHeader((prev) => Math.max(5, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontHeader}
                        onChange={(e) => setFontHeader(Number(e.target.value) || 10)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontHeader((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Tanggal */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE TANGGAL
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontTanggal((prev) => Math.max(5, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontTanggal}
                        onChange={(e) => setFontTanggal(Number(e.target.value) || 12)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontTanggal((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Jam */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE JAM
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontJam((prev) => Math.max(5, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontJam}
                        onChange={(e) => setFontJam(Number(e.target.value) || 13)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontJam((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Nama Menu */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE NAMA MENU
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontMenu((prev) => Math.max(4, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontMenu}
                        onChange={(e) => setFontMenu(Number(e.target.value) || 8)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontMenu((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Porsi */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE PORSI
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontPorsi((prev) => Math.max(4, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontPorsi}
                        onChange={(e) => setFontPorsi(Number(e.target.value) || 7.5)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontPorsi((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Catatan */}
                  <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                    <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                      FONT SIZE CATATAN
                    </span>
                    <div className='mt-1 flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => setFontCatatan((prev) => Math.max(4, prev - 0.5))}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        -
                      </button>
                      <input
                        type='number'
                        step='0.5'
                        value={fontCatatan}
                        onChange={(e) => setFontCatatan(Number(e.target.value) || 7)}
                        className='w-full border-0 bg-transparent text-center text-xs font-bold'
                      />
                      <button
                        type='button'
                        onClick={() => setFontCatatan((prev) => prev + 0.5)}
                        className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Font Gizi (Khusus Versi 2) */}
                  {labelVersion === 'v2' && (
                    <div className='rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900'>
                      <span className='block text-[10px] font-bold text-slate-600 dark:text-slate-400'>
                        FONT SIZE GIZI
                      </span>
                      <div className='mt-1 flex items-center gap-1'>
                        <button
                          type='button'
                          onClick={() => setFontGizi((prev) => Math.max(4, prev - 0.5))}
                          className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                        >
                          -
                        </button>
                        <input
                          type='number'
                          step='0.5'
                          value={fontGizi}
                          onChange={(e) => setFontGizi(Number(e.target.value) || 7)}
                          className='w-full border-0 bg-transparent text-center text-xs font-bold'
                        />
                        <button
                          type='button'
                          onClick={() => setFontGizi((prev) => prev + 0.5)}
                          className='rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Collapsible Advanced Layout Controls (TRBL Padding per Field & Border) - Hidden by default */}
              <div className='rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/40'>
                <button
                  type='button'
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className='flex w-full cursor-pointer items-center justify-between text-xs font-bold text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400'
                >
                  <span className='flex items-center gap-2'>
                    <span>⚙️ Pengaturan Lanjutan (Padding TRBL Tiap Field & Garis)</span>
                    <span className='rounded bg-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300'>
                      {showAdvanced ? 'Terbuka' : 'Disembunyikan'}
                    </span>
                  </span>
                  <span className='font-extrabold text-emerald-600 dark:text-emerald-400'>
                    {showAdvanced ? '▲ Sembunyikan' : '▼ Tampilkan'}
                  </span>
                </button>

                {showAdvanced && (
                  <div className='mt-3 space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-900'>
                    <div className='mb-1 flex items-center justify-between'>
                      <span className='text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                        📐 PADDING (SPASI SEGALA SISI T:Top, R:Right, B:Bottom, L:Left - px):
                      </span>
                      <button
                        type='button'
                        onClick={handleResetAdvancedLayout}
                        className='cursor-pointer text-[10px] font-bold text-emerald-700 hover:underline dark:text-emerald-400'
                      >
                        ↺ Reset Spasi
                      </button>
                    </div>

                    {/* TRBL Settings per Field Block */}
                    <div className='space-y-2 text-xs'>
                      {/* 1. HEADER (BATAS MAKAN) */}
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/80'>
                        <span className='mb-1.5 block text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                          HEADER (BATAS MAKAN)
                        </span>
                        <div className='grid grid-cols-4 gap-1.5 text-center'>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              T (Top)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={hdrPadT}
                              onChange={(e) => setHdrPadT(Math.max(0, Number(e.target.value) || 0))}
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              R (Right)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={hdrPadR}
                              onChange={(e) => setHdrPadR(Math.max(0, Number(e.target.value) || 0))}
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              B (Bottom)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={hdrPadB}
                              onChange={(e) => setHdrPadB(Math.max(0, Number(e.target.value) || 0))}
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              L (Left)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={hdrPadL}
                              onChange={(e) => setHdrPadL(Math.max(0, Number(e.target.value) || 0))}
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. TANGGAL & JAM */}
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/80'>
                        <span className='mb-1.5 block text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                          TANGGAL & JAM
                        </span>
                        <div className='grid grid-cols-4 gap-1.5 text-center'>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              T (Top)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={datePadT}
                              onChange={(e) =>
                                setDatePadT(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              R (Right)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={datePadR}
                              onChange={(e) =>
                                setDatePadR(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              B (Bottom)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={datePadB}
                              onChange={(e) =>
                                setDatePadB(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              L (Left)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={datePadL}
                              onChange={(e) =>
                                setDatePadL(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. NAMA MENU & PORSI */}
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/80'>
                        <span className='mb-1.5 block text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                          NAMA MENU & PORSI
                        </span>
                        <div className='grid grid-cols-4 gap-1.5 text-center'>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              T (Top)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={menuPadT}
                              onChange={(e) =>
                                setMenuPadT(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              R (Right)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={menuPadR}
                              onChange={(e) =>
                                setMenuPadR(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              B (Bottom)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={menuPadB}
                              onChange={(e) =>
                                setMenuPadB(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              L (Left)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={menuPadL}
                              onChange={(e) =>
                                setMenuPadL(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. INFORMASI GIZI (Khusus Versi 2) */}
                      {labelVersion === 'v2' && (
                        <div className='rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/80'>
                          <span className='mb-1.5 block text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                            INFORMASI GIZI
                          </span>
                          <div className='grid grid-cols-4 gap-1.5 text-center'>
                            <div>
                              <span className='block text-[9px] font-bold text-slate-500'>
                                T (Top)
                              </span>
                              <input
                                type='number'
                                step='0.5'
                                min='0'
                                value={giziPadT}
                                onChange={(e) =>
                                  setGiziPadT(Math.max(0, Number(e.target.value) || 0))
                                }
                                className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                              />
                            </div>
                            <div>
                              <span className='block text-[9px] font-bold text-slate-500'>
                                R (Right)
                              </span>
                              <input
                                type='number'
                                step='0.5'
                                min='0'
                                value={giziPadR}
                                onChange={(e) =>
                                  setGiziPadR(Math.max(0, Number(e.target.value) || 0))
                                }
                                className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                              />
                            </div>
                            <div>
                              <span className='block text-[9px] font-bold text-slate-500'>
                                B (Bottom)
                              </span>
                              <input
                                type='number'
                                step='0.5'
                                min='0'
                                value={giziPadB}
                                onChange={(e) =>
                                  setGiziPadB(Math.max(0, Number(e.target.value) || 0))
                                }
                                className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                              />
                            </div>
                            <div>
                              <span className='block text-[9px] font-bold text-slate-500'>
                                L (Left)
                              </span>
                              <input
                                type='number'
                                step='0.5'
                                min='0'
                                value={giziPadL}
                                onChange={(e) =>
                                  setGiziPadL(Math.max(0, Number(e.target.value) || 0))
                                }
                                className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. CATATAN PERINGATAN */}
                      <div className='rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/80'>
                        <span className='mb-1.5 block text-[11px] font-extrabold text-slate-800 uppercase dark:text-slate-200'>
                          CATATAN PERINGATAN
                        </span>
                        <div className='grid grid-cols-4 gap-1.5 text-center'>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              T (Top)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={notePadT}
                              onChange={(e) =>
                                setNotePadT(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              R (Right)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={notePadR}
                              onChange={(e) =>
                                setNotePadR(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              B (Bottom)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={notePadB}
                              onChange={(e) =>
                                setNotePadB(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                          <div>
                            <span className='block text-[9px] font-bold text-slate-500'>
                              L (Left)
                            </span>
                            <input
                              type='number'
                              step='0.5'
                              min='0'
                              value={notePadL}
                              onChange={(e) =>
                                setNotePadL(Math.max(0, Number(e.target.value) || 0))
                              }
                              className='w-full rounded border border-slate-300 bg-white py-0.5 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Border & Divider Controls */}
                    <div className='grid grid-cols-2 gap-3 border-t border-slate-100 pt-2 dark:border-slate-800'>
                      {/* Border Width */}
                      <div>
                        <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                          KETEBALAN BORDER LUAR (px):
                        </label>
                        <div className='flex items-center gap-1'>
                          <button
                            type='button'
                            onClick={() => setBorderWidth((prev) => Math.max(0.5, prev - 0.5))}
                            className='rounded bg-slate-100 px-2 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                          >
                            -
                          </button>
                          <input
                            type='number'
                            step='0.5'
                            min='0.5'
                            max='6'
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value) || 2)}
                            className='w-full rounded border border-slate-300 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                          />
                          <button
                            type='button'
                            onClick={() => setBorderWidth((prev) => prev + 0.5)}
                            className='rounded bg-slate-100 px-2 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Divider Width */}
                      <div>
                        <label className='mb-1 block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                          GARIS PEMISAH (px):
                        </label>
                        <div className='flex items-center gap-1'>
                          <button
                            type='button'
                            onClick={() => setDividerWidth((prev) => Math.max(0.5, prev - 0.5))}
                            className='rounded bg-slate-100 px-2 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                          >
                            -
                          </button>
                          <input
                            type='number'
                            step='0.5'
                            min='0.5'
                            max='5'
                            value={dividerWidth}
                            onChange={(e) => setDividerWidth(Number(e.target.value) || 1)}
                            className='w-full rounded border border-slate-300 text-center text-xs font-bold dark:border-slate-600 dark:bg-slate-900'
                          />
                          <button
                            type='button'
                            onClick={() => setDividerWidth((prev) => prev + 0.5)}
                            className='rounded bg-slate-100 px-2 py-0.5 text-xs font-bold hover:bg-slate-200 dark:bg-slate-800'
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Catatan / Warning */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <label className='block text-xs font-semibold text-slate-600 dark:text-slate-300'>
                    CATATAN PERINGATAN (Red Note)
                  </label>
                  <label className='flex cursor-pointer items-center gap-1 text-[11px] font-bold text-red-700 dark:text-red-300'>
                    <input
                      type='checkbox'
                      checked={showNoteIcon}
                      onChange={(e) => setShowNoteIcon(e.target.checked)}
                      className='rounded border-slate-300 text-red-600 focus:ring-red-500'
                    />
                    <span>Icon Larangan (🚫)</span>
                  </label>
                </div>
                <textarea
                  rows={2}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder={'Contoh:\nMAKAN DI TEMPAT OMPRENG\nTIDAK BOLEH DIBAWA PULANG'}
                  className='w-full resize-y rounded-lg border border-red-300 bg-red-50/50 px-3 py-2 text-sm font-bold text-red-700 uppercase dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300'
                />
                <div className='mt-1.5 flex flex-wrap gap-1.5'>
                  {NOTE_PRESETS.map((n) => (
                    <button
                      key={n}
                      type='button'
                      onClick={() => setCatatan(n)}
                      className='rounded bg-red-100/70 px-2 py-0.5 text-[10px] font-bold text-red-800 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-300'
                    >
                      {n.includes('\n') ? n.replace(/\n/g, ' ↵ ') : n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jumlah & Actions */}
              <div className='flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-700'>
                <div className='flex items-center gap-2'>
                  <label className='text-xs font-bold text-slate-700 dark:text-slate-300'>
                    JUMLAH LABEL:
                  </label>
                  <input
                    type='number'
                    min='1'
                    max='200'
                    value={jumlah}
                    onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
                    className='w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-bold dark:border-slate-600 dark:bg-slate-900'
                  />
                  <span className='text-xs text-slate-500'>(1 lembar A4 ≈ 21 label)</span>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={handleAddItem}
                    className='cursor-pointer rounded-xl border border-emerald-600 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
                  >
                    + Tambah ke Daftar Batch
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Config & Single Label Preview */}
          <div className='flex flex-col gap-6 lg:col-span-5'>
            {/* Size & Layout Config */}
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800'>
              <h2 className='mb-3 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white'>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'>
                  2
                </span>
                Ukuran & Jarak Grid Label
              </h2>

              <div className='space-y-4 text-xs'>
                <div>
                  <label className='mb-1 block font-semibold text-slate-600 dark:text-slate-300'>
                    PILIH UKURAN LABEL:
                  </label>
                  <div className='grid grid-cols-1 gap-2'>
                    {SIZE_PRESETS.map((s) => (
                      <button
                        key={s.label}
                        type='button'
                        onClick={() => {
                          setWidthMm(s.width)
                          setHeightMm(s.height)
                          handleResetFontSizes(s.height)
                        }}
                        className={`rounded-lg border p-2 text-left font-semibold transition ${
                          widthMm === s.width && heightMm === s.height
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex items-center gap-3 pt-1'>
                  <div>
                    <span className='block font-semibold text-slate-600 dark:text-slate-300'>
                      Lebar (mm):
                    </span>
                    <input
                      type='number'
                      value={widthMm}
                      onChange={(e) => setWidthMm(Number(e.target.value) || 60)}
                      className='w-16 rounded border border-slate-300 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-900'
                    />
                  </div>
                  <div>
                    <span className='block font-semibold text-slate-600 dark:text-slate-300'>
                      Tinggi (mm):
                    </span>
                    <input
                      type='number'
                      value={heightMm}
                      onChange={(e) => {
                        const h = Number(e.target.value) || 40
                        setHeightMm(h)
                        handleResetFontSizes(h)
                      }}
                      className='w-16 rounded border border-slate-300 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-900'
                    />
                  </div>
                </div>

                {/* Grid Gap / Jarak Antar Label */}
                <div className='border-t border-slate-200 pt-3 dark:border-slate-700'>
                  <label className='mb-1 block font-bold text-slate-700 dark:text-slate-200'>
                    JARAK ANTAR LABEL / GAP CETAK (mm):
                  </label>
                  <p className='mb-2 text-[10px] text-slate-500'>
                    Atur <strong className='text-emerald-700 dark:text-emerald-400'>0 mm</strong>{' '}
                    agar label rapat menempel sehingga <strong>1x potong/gunting</strong> langsung
                    memotong 2 sisi label sekaligus!
                  </p>
                  <div className='mb-2 flex flex-wrap gap-1.5'>
                    {GAP_PRESETS.map((g) => (
                      <button
                        key={g.value}
                        type='button'
                        onClick={() => setGridGapMm(g.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
                          gridGapMm === g.value
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[11px] text-slate-500'>Custom Jarak (mm):</span>
                    <input
                      type='number'
                      min='0'
                      max='20'
                      value={gridGapMm}
                      onChange={(e) => setGridGapMm(Math.max(0, Number(e.target.value) || 0))}
                      className='w-16 rounded border border-slate-300 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-900'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Single Label Preview (Card Display) */}
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800'>
              <div className='mb-3 flex items-center justify-between'>
                <h3 className='text-xs font-bold tracking-wider text-slate-500 uppercase'>
                  Preview 1 Label ({widthMm} × {heightMm} mm)
                </h3>
                <span className='rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300'>
                  {colorMode === 'bw' ? '🖤 Hitam-Putih' : '🎨 Warna BGN'}
                </span>
              </div>

              <div className='flex justify-center overflow-auto rounded-xl bg-slate-100 p-4 dark:bg-slate-950'>
                {/* Single Label Render */}
                <LabelCard
                  id='single-label-preview'
                  version={labelVersion}
                  lbl={{
                    labelVersion,
                    headerText,
                    headerBgColor,
                    tanggal,
                    jam,
                    namaMenu,
                    porsiMenu,
                    catatan,
                    energi,
                    protein,
                    lemak,
                    karbohidrat,
                    serat,
                    showGiziIcons,
                    showNoteIcon,
                    showTimeIcon,
                    colorMode,
                    separator,
                    wrapMode,
                    fontHeader,
                    fontTanggal,
                    fontJam,
                    fontMenu,
                    fontPorsi,
                    fontCatatan,
                    fontGizi,
                    hdrPadT,
                    hdrPadR,
                    hdrPadB,
                    hdrPadL,
                    datePadT,
                    datePadR,
                    datePadB,
                    datePadL,
                    menuPadT,
                    menuPadR,
                    menuPadB,
                    menuPadL,
                    giziPadT,
                    giziPadR,
                    giziPadB,
                    giziPadL,
                    notePadT,
                    notePadR,
                    notePadB,
                    notePadL,
                    borderWidth,
                    dividerWidth,
                    widthMm,
                    heightMm
                  }}
                />
              </div>

              {/* Single Label PNG Download Button */}
              <div className='mt-3 flex justify-center'>
                <button
                  type='button'
                  onClick={handleDownloadSinglePng}
                  disabled={downloadingPng}
                  className='inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300'
                >
                  {downloadingPng ? (
                    <span>⏳ Memproses Gambar PNG...</span>
                  ) : (
                    <>
                      <svg
                        className='h-4 w-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                        />
                      </svg>
                      <span>🖼️ Unduh 1 Label (PNG High-Res)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Item Batch List Table (If items added) */}
        {items.length > 0 && (
          <div className='no-print mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white'>
                <span>
                  📋 Daftar Batch Label ({items.length} jenis menu, Total {activeLabels.length}{' '}
                  label)
                </span>
              </h3>
              <button
                type='button'
                onClick={handleClearItems}
                className='cursor-pointer text-xs font-semibold text-red-600 hover:underline'
              >
                Hapus Semua Batch
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left text-xs'>
                <thead className='bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-200'>
                  <tr>
                    <th className='p-2'>#</th>
                    <th className='p-2'>Tanggal / Jam</th>
                    <th className='p-2'>Nama Menu</th>
                    <th className='p-2'>Porsi & Format</th>
                    <th className='p-2'>Ukuran Font (pt)</th>
                    <th className='p-2'>Catatan</th>
                    <th className='p-2 text-center'>Jumlah</th>
                    <th className='p-2 text-right'>Aksi</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className='p-2 font-bold'>{idx + 1}</td>
                      <td className='p-2 font-medium'>
                        {item.tanggal} - {item.jam}
                      </td>
                      <td className='p-2 font-bold uppercase'>{item.namaMenu}</td>
                      <td className='p-2 font-semibold text-emerald-700 dark:text-emerald-400'>
                        {item.porsiMenu}{' '}
                        <span className='text-slate-400'>
                          ({item.separator}, {item.wrapMode})
                        </span>
                      </td>
                      <td className='p-2 font-mono text-[11px] text-slate-500'>
                        Hdr:{item.fontHeader} | Tgl:{item.fontTanggal} | Jam:{item.fontJam} | Mnu:
                        {item.fontMenu}
                      </td>
                      <td className='p-2 font-semibold text-red-600'>{item.catatan}</td>
                      <td className='p-2 text-center text-sm font-bold'>{item.jumlah} pcs</td>
                      <td className='p-2 text-right'>
                        <button
                          type='button'
                          onClick={() => handleRemoveItem(item.id)}
                          className='cursor-pointer px-2 py-1 font-bold text-red-500 hover:text-red-700'
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* A4 PRINT SHEET PREVIEW (Visible on Screen & Print)        */}
      {/* ======================================================== */}
      <div className='mx-auto max-w-6xl'>
        <div className='no-print mb-3 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800'>
          <div>
            <h3 className='text-base font-bold text-slate-900 dark:text-white'>
              📄 Preview Lembar Kerja A4 ({activeLabels.length} Label - Jarak Gap: {gridGapMm} mm)
            </h3>
            <p className='text-xs text-slate-500'>
              Klik button di bawah untuk membuka halaman cetak polos tanpa background warna yang
              langsung otomatis siap di-print (CTRL+P).
            </p>
          </div>
          <button
            type='button'
            onClick={handlePrint}
            className='cursor-pointer rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700'
          >
            🖨️ Cetak Halaman Polos
          </button>
        </div>

        {/* Printed Page Box */}
        <div className='no-print-bg rounded-2xl bg-slate-200 p-2 sm:p-6 dark:bg-slate-950'>
          <div
            id='a4-sheet-preview'
            className='print-container mx-auto rounded-lg bg-white p-3 text-slate-900 shadow-xl sm:p-6'
            style={{
              width: '100%',
              maxWidth: '210mm',
              minHeight: '297mm'
            }}
          >
            {/* CSS Grid for Labels */}
            <div
              className='grid justify-center'
              style={{
                gridTemplateColumns: `repeat(auto-fill, ${widthMm}mm)`,
                rowGap: `${gridGapMm}mm`,
                columnGap: `${gridGapMm}mm`
              }}
            >
              {activeLabels.map((lbl, idx) => (
                <LabelCard key={idx} lbl={lbl} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strict Pure White Global Print Styles */}
      <style>{`
          @media print {
            /* Force pure white background on ALL layout elements */
            html,
            body,
            main,
            #__docusaurus,
            [class*='docItemContainer'],
            [class*='mainWrapper'],
            .theme-doc-markdown,
            div {
              background: #ffffff !important;
              background-color: #ffffff !important;
              color: #000000 !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            /* Hide UI controls, headers, navbars */
            .no-print,
            nav,
            footer,
            header,
            .navbar,
            .footer,
            [class*='navbar'],
            [class*='footer'] {
              display: none !important;
            }

            .print-container {
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              max-width: 100% !important;
              width: 100% !important;
              background: #ffffff !important;
            }

            .no-print-bg {
              background: #ffffff !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .label-box {
              border-color: #000000 !important;
              break-inside: avoid !important;
              page-break-inside: avoid !important;
              background: #ffffff !important;
            }

            @page {
              size: A4 portrait;
              margin: 5mm;
            }
          }
        `}</style>
    </main>
  )
}

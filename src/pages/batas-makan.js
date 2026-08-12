import React, { useState, useEffect, useMemo } from 'react'
import Layout from '@theme/Layout'

// Presets for quick selection
const MENU_PRESETS = [
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
  'TIDAK UNTUK DIBAWA PULANG',
  'KONSUMSI SEBELUM JAM BATAS MAKAN',
  'SIMPAN DI TEMPAT SEJUK'
]

const SIZE_PRESETS = [
  { label: '60 × 40 mm (Standar Landsekap BGN)', width: 60, height: 40 },
  { label: '60 × 30 mm (Ringkas / Kecil)', width: 60, height: 30 },
  { label: '40 × 60 mm (Standar Potret)', width: 40, height: 60 },
  { label: '50 × 30 mm (Kecil)', width: 50, height: 30 }
]

const SEPARATOR_OPTIONS = [
  { label: 'Titik ( · )', value: '·' },
  { label: 'Bintang ( * )', value: '*' },
  { label: 'Strip ( - )', value: '-' },
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

export default function BatasMakanPage() {
  const [isClient, setIsClient] = useState(false)

  // Current Form Inputs
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [namaMenu, setNamaMenu] = useState('AYAM KECAP')
  const [porsiMenu, setPorsiMenu] = useState('PORSI BESAR')
  const [catatan, setCatatan] = useState('TIDAK UNTUK DIBAWA PULANG')
  const [jumlah, setJumlah] = useState(18) // Default 18 label (1 lembar A4 @ 3x6)
  const [widthMm, setWidthMm] = useState(60)
  const [heightMm, setHeightMm] = useState(40)

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

  // Reset Font Sizes helper
  const handleResetFontSizes = (h = heightMm) => {
    if (h <= 32) {
      setFontHeader(8.5)
      setFontTanggal(10.5)
      setFontJam(11.5)
      setFontMenu(7.5)
      setFontPorsi(7)
      setFontCatatan(6.5)
    } else {
      setFontHeader(10)
      setFontTanggal(13)
      setFontJam(14)
      setFontMenu(8.5)
      setFontPorsi(8)
      setFontCatatan(7.5)
    }
  }

  // Set default date & time on mount
  useEffect(() => {
    setIsClient(true)
    const now = new Date()
    setTanggal(formatDateDDMMYYYY(now))

    // Default food expiry limit: +4 hours from now
    const expiryTime = new Date(now.getTime() + 4 * 60 * 60 * 1000)
    setJam(formatTimeWIB(expiryTime))
  }, [])

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
      tanggal: tanggal || formatDateDDMMYYYY(new Date()),
      jam: jam || formatTimeWIB(new Date()),
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
      fontCatatan
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
      tanggal: tanggal || '11/08/2026',
      jam: jam || '15.00 WIB',
      namaMenu: (namaMenu || 'AYAM KECAP').toUpperCase().trim(),
      porsiMenu: (porsiMenu || 'PORSI BESAR').toUpperCase().trim(),
      catatan: (catatan || 'TIDAK UNTUK DIBAWA PULANG').toUpperCase().trim(),
      separator,
      wrapMode,
      colorMode,
      fontHeader,
      fontTanggal,
      fontJam,
      fontMenu,
      fontPorsi,
      fontCatatan
    }

    const list = []
    const count = Number(jumlah) || 1
    for (let i = 0; i < count; i++) {
      list.push(single)
    }
    return list
  }, [
    items,
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
    fontCatatan
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

    const labelsHtml = activeLabels
      .map((lbl) => {
        const isBW = (lbl.colorMode || colorMode) === 'bw'
        const headerBg = isBW ? 'background: #000000; color: #ffffff;' : 'background: #16a34a; color: #ffffff;'
        const noteColor = isBW ? 'color: #000000;' : 'color: #dc2626;'

        const ftHeader = lbl.fontHeader || fontHeader
        const ftTanggal = lbl.fontTanggal || fontTanggal
        const ftJam = lbl.fontJam || fontJam
        const ftMenu = lbl.fontMenu || fontMenu
        const ftPorsi = lbl.fontPorsi || fontPorsi
        const ftCatatan = lbl.fontCatatan || fontCatatan

        const isSmallHeight = heightMm <= 32
        const headerPadding = isSmallHeight ? '1px 0' : '2px 0'
        const notePadding = isSmallHeight ? '1px 0' : '2px 0'

        let menuPorsiContent = ''
        if (lbl.wrapMode === 'wrap') {
          menuPorsiContent = `
            <div style="line-height:1.1;">
              <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#000;">${lbl.namaMenu}</div>
              <div style="font-size:${ftPorsi}pt; font-weight:700; text-transform:uppercase; color:#1e293b;">${lbl.separator !== 'none' ? lbl.separator + ' ' : ''}${lbl.porsiMenu}</div>
            </div>
          `
        } else if (lbl.wrapMode === 'single') {
          menuPorsiContent = `
            <div style="font-size:${ftMenu}pt; font-weight:700; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#000;">
              ${lbl.namaMenu} ${lbl.separator !== 'none' ? lbl.separator : ''} ${lbl.porsiMenu}
            </div>
          `
        } else {
          menuPorsiContent = `
            <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; word-break:break-word; line-height:1.1; color:#000;">
              ${lbl.namaMenu} ${lbl.separator !== 'none' ? lbl.separator : ''} ${lbl.porsiMenu}
            </div>
          `
        }

        return `
          <div class="label-card" style="width:${widthMm}mm; height:${heightMm}mm; border:2px solid #000000; border-radius:9px; background:#ffffff; color:#000000; box-sizing:border-box; padding:2.5px; display:flex; flex-direction:column; justify-content:space-between; page-break-inside:avoid; break-inside:avoid; margin:0; overflow:hidden;">
            <div style="${headerBg} text-align:center; font-weight:900; border-top-left-radius:6px; border-top-right-radius:6px; border-bottom-left-radius:2px; border-bottom-right-radius:2px; padding:${headerPadding}; font-size:${ftHeader}pt; letter-spacing:0.5px; flex-shrink:0;">
              BATAS MAKAN
            </div>
            <div style="text-align:center; margin:auto 0; padding:1px 0; flex-grow:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-size:${ftTanggal}pt; font-weight:800; line-height:1; color:#000000;">${lbl.tanggal}</div>
              <div style="font-size:${ftJam}pt; font-weight:900; line-height:1; color:#000000; margin-top:1px;">${lbl.jam}</div>
              <div style="border-top:1px solid #cbd5e1; margin-top:2px; padding-top:2px; text-align:center;">
                ${menuPorsiContent}
              </div>
            </div>
            <div style="border-top:1px solid ${isBW ? '#000000' : '#fca5a5'}; padding:${notePadding}; text-align:center; flex-shrink:0;">
              <div style="font-size:${ftCatatan}pt; font-weight:900; ${noteColor} text-transform:uppercase; line-height:1;">
                ${lbl.catatan}
              </div>
            </div>
          </div>
        `
      })
      .join('')

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
              gap: 3mm;
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
    <Layout
      title="Cetak Label Batas Makan"
      description="Generator & Cetak Label Batas Makan 40x60 mm SPPG BGN (Badan Gizi Nasional)"
    >
      <main className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 text-slate-800 dark:text-slate-100 sm:p-6 print:p-0 print:bg-white">
        {/* Top Header Controls (Hidden on Print) */}
        <div className="mx-auto max-w-6xl no-print">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  BGN SPPG
                </span>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Cetak Label Batas Makan
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Fitur generator cetak label batas makan wadah / ompreng gizi (Ukuran 40 × 60 mm / A4 Grid).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="/jkt"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                ← Kembali ke SPPG Jeketro
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H7a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                🖨️ CETAK HALAMAN POLOS ({activeLabels.length} Label)
              </button>
            </div>
          </div>

          {/* Form & Config Panel */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-8">
            {/* Form Input Section */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs">
                  1
                </span>
                Input Data Label
              </h2>

              <div className="space-y-4 text-sm">
                {/* Tanggal & Jam */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      TANGGAL (Batas Makan)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        placeholder="DD/MM/YYYY (contoh: 11/08/2026)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-600 dark:bg-slate-900"
                      />
                      <button
                        type="button"
                        onClick={setNowTime}
                        className="shrink-0 rounded-lg border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-bold hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700"
                        title="Set tanggal & jam sekarang"
                      >
                        Hari Ini
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      JAM (Batas Makan)
                    </label>
                    <input
                      type="text"
                      value={jam}
                      onChange={(e) => setJam(e.target.value)}
                      placeholder="HH.mm WIB (contoh: 15.00 WIB)"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-600 dark:bg-slate-900"
                    />
                    {/* Quick Time Adders */}
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="text-[10px] text-slate-400 font-medium self-center mr-1">
                        +Durasi:
                      </span>
                      {[2, 3, 4, 5].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => addHoursToNow(h)}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-emerald-900"
                        >
                          +{h} Jam
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nama Menu */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    NAMA MENU
                  </label>
                  <input
                    type="text"
                    value={namaMenu}
                    onChange={(e) => setNamaMenu(e.target.value)}
                    placeholder="Contoh: AYAM KECAP"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold uppercase dark:border-slate-600 dark:bg-slate-900"
                  />
                  {/* Presets */}
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {MENU_PRESETS.map((m) => (
                      <button
                        key={m}
                        type="button"
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
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    PORSI MENU
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PORSI_OPTIONS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPorsiMenu(p)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition border ${
                          porsiMenu.toUpperCase() === p
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <input
                      type="text"
                      value={porsiMenu}
                      onChange={(e) => setPorsiMenu(e.target.value)}
                      placeholder="Atau ketik porsi..."
                      className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold uppercase dark:border-slate-600 dark:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Mode Warna & Formatting */}
                <div className="space-y-3 bg-slate-50 p-3 rounded-xl dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                      MODE CETAK / WARNA (Guna Menghemat Tinta Print):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {COLOR_MODE_OPTIONS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setColorMode(c.value)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                            colorMode === c.value
                              ? 'bg-slate-900 text-white dark:bg-emerald-600'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                        PEMISAH PORSI MENU
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {SEPARATOR_OPTIONS.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setSeparator(s.value)}
                            className={`rounded px-2 py-1 text-xs font-bold transition ${
                              separator === s.value
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1">
                        TAMPILAN BARIS (WRAP)
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {WRAP_OPTIONS.map((w) => (
                          <button
                            key={w.value}
                            type="button"
                            onClick={() => setWrapMode(w.value)}
                            className={`rounded px-2 py-1 text-xs font-bold transition ${
                              wrapMode === w.value
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
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
                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                      <span>🔤 Pengaturan Font Size (Ukuran Font) Tiap Input (pt)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleResetFontSizes()}
                      className="text-[11px] font-bold text-emerald-700 hover:underline dark:text-emerald-400 cursor-pointer"
                    >
                      ↺ Reset ke Standar
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {/* Header (Batas Makan) */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE HEADER
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontHeader((prev) => Math.max(5, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontHeader}
                          onChange={(e) => setFontHeader(Number(e.target.value) || 10)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontHeader((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Tanggal */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE TANGGAL
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontTanggal((prev) => Math.max(5, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontTanggal}
                          onChange={(e) => setFontTanggal(Number(e.target.value) || 12)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontTanggal((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Jam */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE JAM
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontJam((prev) => Math.max(5, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontJam}
                          onChange={(e) => setFontJam(Number(e.target.value) || 13)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontJam((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Nama Menu */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE NAMA MENU
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontMenu((prev) => Math.max(4, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontMenu}
                          onChange={(e) => setFontMenu(Number(e.target.value) || 8)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontMenu((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Porsi */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE PORSI
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontPorsi((prev) => Math.max(4, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontPorsi}
                          onChange={(e) => setFontPorsi(Number(e.target.value) || 7.5)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontPorsi((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Catatan */}
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        FONT SIZE CATATAN
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => setFontCatatan((prev) => Math.max(4, prev - 0.5))}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          step="0.5"
                          value={fontCatatan}
                          onChange={(e) => setFontCatatan(Number(e.target.value) || 7)}
                          className="w-full text-center font-bold text-xs bg-transparent border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setFontCatatan((prev) => prev + 0.5)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 font-bold hover:bg-slate-200 dark:bg-slate-800 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Catatan / Warning */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    CATATAN PERINGATAN (Red Note)
                  </label>
                  <input
                    type="text"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Contoh: TIDAK UNTUK DIBAWA PULANG"
                    className="w-full rounded-lg border border-red-300 bg-red-50/50 px-3 py-2 text-sm font-bold text-red-700 uppercase dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300"
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {NOTE_PRESETS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setCatatan(n)}
                        className="rounded bg-red-100/70 px-2 py-0.5 text-[10px] font-bold text-red-800 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-300"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Jumlah & Actions */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      JUMLAH LABEL:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={jumlah}
                      onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-bold dark:border-slate-600 dark:bg-slate-900"
                    />
                    <span className="text-xs text-slate-500">
                      (1 lembar A4 ≈ 18 label)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="rounded-xl border border-emerald-600 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 cursor-pointer"
                    >
                      + Tambah ke Daftar Batch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Config & Single Label Preview */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Size & Layout Config */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs">
                    2
                  </span>
                  Ukuran & Orientation Label
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      PILIH UKURAN LABEL:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {SIZE_PRESETS.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => {
                            setWidthMm(s.width)
                            setHeightMm(s.height)
                            handleResetFontSizes(s.height)
                          }}
                          className={`rounded-lg border p-2 text-left transition font-semibold ${
                            widthMm === s.width && heightMm === s.height
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div>
                      <span className="block font-semibold text-slate-600 dark:text-slate-300">
                        Lebar (mm):
                      </span>
                      <input
                        type="number"
                        value={widthMm}
                        onChange={(e) => setWidthMm(Number(e.target.value) || 60)}
                        className="w-16 rounded border border-slate-300 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-600 dark:text-slate-300">
                        Tinggi (mm):
                      </span>
                      <input
                        type="number"
                        value={heightMm}
                        onChange={(e) => {
                          const h = Number(e.target.value) || 40
                          setHeightMm(h)
                          handleResetFontSizes(h)
                        }}
                        className="w-16 rounded border border-slate-300 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Single Label Preview (Card Display) */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Preview 1 Label ({widthMm} × {heightMm} mm)
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-300">
                    {colorMode === 'bw' ? '🖤 Hitam-Putih' : '🎨 Warna BGN'}
                  </span>
                </div>

                <div className="flex justify-center p-4 bg-slate-100 rounded-xl dark:bg-slate-950 overflow-auto">
                  {/* Single Label Render */}
                  <div
                    className="relative bg-white text-slate-900 border-2 border-black rounded-[12px] overflow-hidden flex flex-col justify-between shadow-md"
                    style={{
                      width: `${widthMm * 3.5}px`,
                      height: `${heightMm * 3.5}px`,
                      padding: '3px'
                    }}
                  >
                    {/* Header Pill */}
                    <div
                      className={`shrink-0 text-center font-black rounded-t-[8px] rounded-b-[3px] uppercase shadow-xs ${
                        colorMode === 'bw' ? 'bg-black text-white' : 'bg-[#16a34a] text-white'
                      }`}
                      style={{
                        fontSize: `${fontHeader * 1.05}pt`,
                        padding: isSmallHeight ? '1px 0' : '2px 0'
                      }}
                    >
                      BATAS MAKAN
                    </div>

                    {/* Date & Time */}
                    <div className="text-center my-auto py-0.5 overflow-hidden flex flex-col justify-center flex-grow">
                      <div
                        className="font-extrabold leading-none text-slate-950 tracking-tight"
                        style={{ fontSize: `${fontTanggal * 1.05}pt` }}
                      >
                        {tanggal || '11/08/2026'}
                      </div>
                      <div
                        className="font-black leading-none text-slate-950 tracking-tight mt-0.5"
                        style={{ fontSize: `${fontJam * 1.05}pt` }}
                      >
                        {jam || '15.00 WIB'}
                      </div>

                      {/* Menu & Porsi with Wrap & Separator options */}
                      <div className="border-t border-slate-200 pt-0.5 mt-0.5 text-center px-1">
                        {wrapMode === 'wrap' ? (
                          <div className="leading-tight">
                            <div
                              className="font-extrabold text-slate-900 tracking-wide uppercase truncate"
                              style={{ fontSize: `${fontMenu * 1.05}pt` }}
                            >
                              {namaMenu || 'AYAM KECAP'}
                            </div>
                            <div
                              className="font-bold text-slate-600 uppercase tracking-wide"
                              style={{ fontSize: `${fontPorsi * 1.05}pt` }}
                            >
                              {separator !== 'none' ? `${separator} ` : ''}{porsiMenu || 'PORSI BESAR'}
                            </div>
                          </div>
                        ) : wrapMode === 'single' ? (
                          <div
                            className="font-bold text-slate-600 tracking-wide uppercase truncate"
                            style={{ fontSize: `${fontMenu * 1.05}pt` }}
                          >
                            {(namaMenu || 'AYAM KECAP').toUpperCase()} {separator !== 'none' ? separator : ''} {(porsiMenu || 'PORSI BESAR').toUpperCase()}
                          </div>
                        ) : (
                          /* Auto wrap mode */
                          <div
                            className="font-bold text-slate-700 leading-tight tracking-tight uppercase break-words"
                            style={{ fontSize: `${fontMenu * 1.05}pt` }}
                          >
                            {(namaMenu || 'AYAM KECAP').toUpperCase()} {separator !== 'none' ? separator : ''} {(porsiMenu || 'PORSI BESAR').toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="shrink-0 border-t border-red-200 pt-0.5 pb-0.5 text-center">
                      <div
                        className={`font-black tracking-tight uppercase leading-none ${
                          colorMode === 'bw' ? 'text-black' : 'text-red-600'
                        }`}
                        style={{ fontSize: `${fontCatatan * 1.05}pt` }}
                      >
                        {(catatan || 'TIDAK UNTUK DIBAWA PULANG').toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Item Batch List Table (If items added) */}
          {items.length > 0 && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800 no-print">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>📋 Daftar Batch Label ({items.length} jenis menu, Total {activeLabels.length} label)</span>
                </h3>
                <button
                  type="button"
                  onClick={handleClearItems}
                  className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  Hapus Semua Batch
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Tanggal / Jam</th>
                      <th className="p-2">Nama Menu</th>
                      <th className="p-2">Porsi & Format</th>
                      <th className="p-2">Ukuran Font (pt)</th>
                      <th className="p-2">Catatan</th>
                      <th className="p-2 text-center">Jumlah</th>
                      <th className="p-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {items.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="p-2 font-bold">{idx + 1}</td>
                        <td className="p-2 font-medium">{item.tanggal} - {item.jam}</td>
                        <td className="p-2 font-bold uppercase">{item.namaMenu}</td>
                        <td className="p-2 font-semibold text-emerald-700 dark:text-emerald-400">
                          {item.porsiMenu} <span className="text-slate-400">({item.separator}, {item.wrapMode})</span>
                        </td>
                        <td className="p-2 font-mono text-[11px] text-slate-500">
                          Hdr:{item.fontHeader} | Tgl:{item.fontTanggal} | Jam:{item.fontJam} | Mnu:{item.fontMenu}
                        </td>
                        <td className="p-2 font-semibold text-red-600">{item.catatan}</td>
                        <td className="p-2 text-center font-bold text-sm">{item.jumlah} pcs</td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 font-bold px-2 py-1 cursor-pointer"
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
        <div className="mx-auto max-w-6xl">
          <div className="no-print flex items-center justify-between mb-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                📄 Preview Lembar Kerja A4 ({activeLabels.length} Label)
              </h3>
              <p className="text-xs text-slate-500">
                Klik button di bawah untuk membuka halaman cetak polos tanpa background warna yang langsung otomatis siap di-print (CTRL+P).
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer"
            >
              🖨️ Cetak Halaman Polos
            </button>
          </div>

          {/* Printed Page Box */}
          <div className="bg-slate-200 p-2 sm:p-6 rounded-2xl dark:bg-slate-950 no-print-bg">
            <div className="mx-auto bg-white text-slate-900 shadow-xl rounded-lg p-3 sm:p-6 print-container"
              style={{
                width: '100%',
                maxWidth: '210mm',
                minHeight: '297mm'
              }}
            >
              {/* CSS Grid for Labels */}
              <div
                className="grid gap-2 justify-center"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(${widthMm}mm, 1fr))`,
                  rowGap: '3mm',
                  columnGap: '3mm'
                }}
              >
                {activeLabels.map((lbl, idx) => {
                  const isBW = (lbl.colorMode || colorMode) === 'bw'
                  const ftHeader = lbl.fontHeader || fontHeader
                  const ftTanggal = lbl.fontTanggal || fontTanggal
                  const ftJam = lbl.fontJam || fontJam
                  const ftMenu = lbl.fontMenu || fontMenu
                  const ftPorsi = lbl.fontPorsi || fontPorsi
                  const ftCatatan = lbl.fontCatatan || fontCatatan

                  return (
                    <div
                      key={idx}
                      className="label-box relative bg-white text-slate-900 border-2 border-black rounded-[10px] overflow-hidden flex flex-col justify-between"
                      style={{
                        width: `${widthMm}mm`,
                        height: `${heightMm}mm`,
                        padding: '2.5px',
                        boxSizing: 'border-box',
                        pageBreakInside: 'avoid'
                      }}
                    >
                      {/* Header Pill */}
                      <div
                        className={`shrink-0 text-center font-black rounded-t-[6px] rounded-b-[2px] uppercase leading-tight shadow-xs ${
                          isBW ? 'bg-black text-white' : 'bg-[#16a34a] text-white'
                        }`}
                        style={{
                          fontSize: `${ftHeader}pt`,
                          padding: isSmallHeight ? '1px 0' : '2px 0'
                        }}
                      >
                        BATAS MAKAN
                      </div>

                      {/* Date & Time */}
                      <div className="text-center my-auto py-0.5 overflow-hidden flex flex-col justify-center flex-grow">
                        <div
                          className="font-extrabold leading-none text-slate-950 tracking-tight"
                          style={{ fontSize: `${ftTanggal}pt` }}
                        >
                          {lbl.tanggal}
                        </div>
                        <div
                          className="font-black leading-none text-slate-950 tracking-tight mt-0.5"
                          style={{ fontSize: `${ftJam}pt` }}
                        >
                          {lbl.jam}
                        </div>

                        {/* Menu & Porsi */}
                        <div className="border-t border-slate-200 pt-0.5 mt-0.5 text-center px-0.5">
                          {lbl.wrapMode === 'wrap' ? (
                            <div className="leading-tight">
                              <div
                                className="font-extrabold text-slate-950 tracking-tight uppercase truncate"
                                style={{ fontSize: `${ftMenu}pt` }}
                              >
                                {lbl.namaMenu}
                              </div>
                              <div
                                className="font-bold text-slate-700 uppercase tracking-tight"
                                style={{ fontSize: `${ftPorsi}pt` }}
                              >
                                {lbl.separator !== 'none' ? `${lbl.separator} ` : ''}{lbl.porsiMenu}
                              </div>
                            </div>
                          ) : lbl.wrapMode === 'single' ? (
                            <div
                              className="font-bold text-slate-700 tracking-wide uppercase truncate"
                              style={{ fontSize: `${ftMenu}pt` }}
                            >
                              {lbl.namaMenu} {lbl.separator !== 'none' ? lbl.separator : ''} {lbl.porsiMenu}
                            </div>
                          ) : (
                            /* Auto Wrap mode */
                            <div
                              className="font-extrabold text-slate-900 leading-tight tracking-tight uppercase break-words"
                              style={{ fontSize: `${ftMenu}pt` }}
                            >
                              {lbl.namaMenu} {lbl.separator !== 'none' ? lbl.separator : ''} {lbl.porsiMenu}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Warning */}
                      <div className="shrink-0 border-t border-red-200 pt-0.5 pb-0.5 text-center">
                        <div
                          className={`font-black tracking-tight uppercase leading-none ${
                            isBW ? 'text-black' : 'text-red-600'
                          }`}
                          style={{ fontSize: `${ftCatatan}pt` }}
                        >
                          {lbl.catatan}
                        </div>
                      </div>
                    </div>
                  )
                })}
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
    </Layout>
  )
}

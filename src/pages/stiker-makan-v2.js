import React, { useState, useEffect, useRef } from 'react'
import Link from '@docusaurus/Link'
import {
  LabelKiri,
  LabelKanan,
  LabelSepasang,
  OmprengMockup,
} from '../components/StikerOmprengV2/StikerOmprengV2'

// Helper format tanggal Indonesia
const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const getTodayFormatted = () => {
  const now = new Date()
  const d = now.getDate()
  const m = MONTH_NAMES_ID[now.getMonth()]
  const y = now.getFullYear()
  return `${d} ${m} ${y}`
}

// Konfigurasi Default Sesuai Surat Edaran BGN 2026
const DEFAULT_CFG = {
  // SPPG & Logo
  namaSppg: 'SPPG JAKARTA PUSAT 1',
  alamatSppg: 'Jl. Kramat Raya No. 123, RT 01/RW 02, Kel. Kwitang, Kec. Senen, Jakarta Pusat',
  logoUrl: '/img/logo-bgn.png',

  // Batas Waktu Konsumsi
  waktuMode: 'direct', // 'direct' (jam tercetak) atau 'blank' (kosong untuk stempel/spidol)
  jamKonsumsi: '11:00 WIB',
  showTanggal: false,
  tanggalKonsumsi: getTodayFormatted(),

  // Kotak Pengaduan Resmi BGN
  pengaduanWeb: 'bgn.go.id',
  pengaduanEmail: 'pengaduan@bgn.go.id',
  pengaduanCallCenter: '157',
  pengaduanWa: '0811-1020-0157',
  pengaduanIg: '@badangizinasional.ri',
  pengaduanFb: 'Badan Gizi Nasional RI',
  pengaduanTiktok: '@badangizinasional.ri',

  // Tipografi & Styling
  primaryColor: '#0b2545',
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
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
}

// Preset Jam Konsumsi Cepat
const JAM_PRESETS = [
  '08:00 WIB',
  '09:00 WIB',
  '09:30 WIB',
  '10:00 WIB',
  '10:30 WIB',
  '11:00 WIB',
  '11:30 WIB',
  '12:00 WIB',
  '12:30 WIB',
  '13:00 WIB',
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

const STORAGE_KEY = 'stiker_ompreng_v2_config'

export default function StikerMakanV2Page() {
  const [cfg, setCfg] = useState(DEFAULT_CFG)
  const [colorMode, setColorMode] = useState('bw') // Default 'bw' untuk printer thermal!
  const [cetakTarget, setCetakTarget] = useState('alternating') // 'kiri', 'kanan', 'alternating', 'both_batch', 'sepasang'
  const [jumlahCetak, setJumlahCetak] = useState(1)
  const [activeTab, setActiveTab] = useState('kiri') // 'kiri', 'kanan', 'sepasang', 'ompreng'
  const [zoomScale, setZoomScale] = useState(1.3)
  const [showCropMarks, setShowCropMarks] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Load Saved Config from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
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
      // 1 Kiri, 1 Kanan, bergantian sebanyak count pasang
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kiri', id: `print-alt-kiri-${i}` })
        pages.push({ type: 'kanan', id: `print-alt-kanan-${i}` })
      }
    } else if (cetakTarget === 'both_batch') {
      // Semua Kiri dulu sebanyak count, lalu semua Kanan sebanyak count
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kiri', id: `print-batch-kiri-${i}` })
      }
      for (let i = 0; i < count; i++) {
        pages.push({ type: 'kanan', id: `print-batch-kanan-${i}` })
      }
    } else if (cetakTarget === 'sepasang') {
      // Format 140x50mm sepasang berjejer
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

    const printWindow = window.open('', '_blank', 'width=450,height=400')
    if (!printWindow) {
      window.print()
      return
    }

    const printRoot = document.getElementById('thermal-print-root')
    if (!printRoot) {
      window.print()
      return
    }

    const innerHtml = printRoot.innerHTML
    const isPair = cetakTarget === 'sepasang'
    const pageWidthMm = isPair ? 140 : 70
    const pageHeightMm = 50

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cetak Stiker Thermal BGN (70x50 mm)</title>
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
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
      if (!node) throw new Error('Elemen tidak ditemukan')

      // Pixel ratio 4x menghasilkan resolusi tajam ~827x591 px (standar 300 DPI untuk 70x50mm)
      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 4,
        quality: 1,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      alert('Gagal mengunduh gambar: ' + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const printPages = generatePrintLabels()
  const isPairMode = cetakTarget === 'sepasang'

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-950">
      {/* ─── PRINT CSS STYLES (PRESISI THERMAL 70 × 50 mm) ─── */}
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

      {/* ─── HEADER / NAVIGATION BAR (NO PRINT) ─── */}
      <header className="no-print-area border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-black text-base shadow-sm">
              7×5
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight m-0 text-slate-900 dark:text-white">
                  Stiker Makan V2 (Label Ompreng 7×5 cm)
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  SE BGN 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Sesuai Lampiran Surat Edaran Badan Gizi Nasional • Khusus Printer Thermal 70×50 mm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/stiker-makan"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              ← Ke Versi 1 (Menu & Gizi)
            </Link>
            <button
              onClick={handleCleanThermalPrint}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>🖨️</span> Cetak Thermal (70×50 mm)
            </button>
          </div>
        </div>
      </header>

      {/* ─── WORKSPACE (NO PRINT) ─── */}
      <div className="no-print-area max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ─── PANEL KONTROL KIRI (EDITOR SETTINGS) ─── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* 1. Pengaturan Thermal & Cetak Cepat */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0 flex items-center gap-2">
                  <span>🖨️</span> Opsi Cetak Printer Thermal
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  Ukuran: 70 × 50 mm
                </span>
              </div>

              {/* Pilihan Target Cetak */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Label yang Dicetak:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { setCetakTarget('kiri'); setActiveTab('kiri'); }}
                    className={`py-2 px-3 rounded-lg border font-semibold text-left transition-all cursor-pointer ${
                      cetakTarget === 'kiri'
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-bold">🏷️ Label Kiri Saja</div>
                    <div className="text-[10px] text-slate-500">SPPG & Batas Waktu</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCetakTarget('kanan'); setActiveTab('kanan'); }}
                    className={`py-2 px-3 rounded-lg border font-semibold text-left transition-all cursor-pointer ${
                      cetakTarget === 'kanan'
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-bold">🏷️ Label Kanan Saja</div>
                    <div className="text-[10px] text-slate-500">Larangan & Pengaduan</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCetakTarget('alternating'); setActiveTab('sepasang'); }}
                    className={`py-2 px-3 rounded-lg border font-semibold text-left transition-all cursor-pointer ${
                      cetakTarget === 'alternating'
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-bold">🔄 Bergantian (Kiri & Kanan)</div>
                    <div className="text-[10px] text-slate-500">1 Kiri lalu 1 Kanan urut</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCetakTarget('both_batch'); setActiveTab('sepasang'); }}
                    className={`py-2 px-3 rounded-lg border font-semibold text-left transition-all cursor-pointer ${
                      cetakTarget === 'both_batch'
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-bold">📦 Batch Kiri Lalu Kanan</div>
                    <div className="text-[10px] text-slate-500">N Kiri, lalu N Kanan</div>
                  </button>
                </div>
              </div>

              {/* Jumlah Label & Mode Warna */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {cetakTarget === 'alternating' || cetakTarget === 'both_batch' ? 'Jumlah Pasang:' : 'Jumlah Stiker:'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setJumlahCetak((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={jumlahCetak}
                      onChange={(e) => setJumlahCetak(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full text-center py-1.5 px-2 text-xs font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setJumlahCetak((prev) => prev + 1)}
                      className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Warna Cetak:
                  </label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setColorMode('bw')}
                      className={`py-1.5 text-[11px] font-bold rounded cursor-pointer transition-all ${
                        isBW
                          ? 'bg-black text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      🖤 B&W (Thermal)
                    </button>
                    <button
                      type="button"
                      onClick={() => setColorMode('color')}
                      className={`py-1.5 text-[11px] font-bold rounded cursor-pointer transition-all ${
                        !isBW
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      🎨 Warna Resmi
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Output Info & Tombol Aksi */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Total lembar stiker: </span>
                  <span className="font-black text-blue-600 dark:text-blue-400 text-sm">
                    {printPages.length} label
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] ml-1">
                    (@ 70 × 50 mm)
                  </span>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  ✓ Siap Roll Thermal
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCleanThermalPrint}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🖨️</span> Cetak Thermal
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>📄</span> Cetak Browser
                </button>
              </div>
            </div>

            {/* 2. Form Identitas SPPG & Logo */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span>🏢</span> Identitas SPPG & Dapur
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama SPPG:
                  </label>
                  <input
                    type="text"
                    value={cfg.namaSppg}
                    onChange={(e) => updateCfg({ namaSppg: e.target.value })}
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold uppercase"
                    placeholder="Contoh: SPPG JAKARTA PUSAT 1"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Alamat Lengkap SPPG:
                  </label>
                  <textarea
                    rows={2}
                    value={cfg.alamatSppg}
                    onChange={(e) => updateCfg({ alamatSppg: e.target.value })}
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    placeholder="Alamat jalan, kelurahan, kecamatan, kota..."
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Logo Badan Gizi Nasional:
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={cfg.logoUrl}
                      alt="Preview Logo"
                      className="w-8 h-8 object-contain rounded border p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={cfg.logoUrl}
                      onChange={(e) => updateCfg({ logoUrl: e.target.value })}
                      className="flex-1 py-1 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                      placeholder="/img/logo-bgn.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Form Batas Waktu Konsumsi (Label Kiri) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span>⏰</span> Batas Waktu Konsumsi (Label Kiri)
              </h2>

              <div className="space-y-3 text-xs">
                {/* Mode Waktu: Cetak Langsung vs Kosong untuk Stempel */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mode Kolom Waktu:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateCfg({ waktuMode: 'direct' })}
                      className={`py-2 px-3 rounded-lg border text-left font-semibold cursor-pointer ${
                        cfg.waktuMode === 'direct'
                          ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="font-bold">⏱️ Jam Tercetak</div>
                      <div className="text-[10px] text-slate-500">Cetak jam langsung di label</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateCfg({ waktuMode: 'blank' })}
                      className={`py-2 px-3 rounded-lg border text-left font-semibold cursor-pointer ${
                        cfg.waktuMode === 'blank'
                          ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="font-bold">⬜ Kolom Kosong</div>
                      <div className="text-[10px] text-slate-500">Untuk stempel / tulis spidol</div>
                    </button>
                  </div>
                </div>

                {cfg.waktuMode === 'direct' && (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Jam Batas Konsumsi:
                      </label>
                      <input
                        type="text"
                        value={cfg.jamKonsumsi}
                        onChange={(e) => updateCfg({ jamKonsumsi: e.target.value })}
                        className="w-full py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-black text-sm"
                        placeholder="Contoh: 11:00 WIB"
                      />

                      {/* Tombol Cepat Pilihan Jam */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {JAM_PRESETS.map((jp) => (
                          <button
                            key={jp}
                            type="button"
                            onClick={() => updateCfg({ jamKonsumsi: jp })}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer ${
                              cfg.jamKonsumsi === jp
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {jp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="showTanggal"
                        checked={cfg.showTanggal}
                        onChange={(e) => updateCfg({ showTanggal: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="showTanggal" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Cantumkan Tanggal di Bawah Jam
                      </label>
                    </div>

                    {cfg.showTanggal && (
                      <div>
                        <input
                          type="text"
                          value={cfg.tanggalKonsumsi}
                          onChange={(e) => updateCfg({ tanggalKonsumsi: e.target.value })}
                          className="w-full py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                          placeholder="Contoh: 10 September 2026"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 4. Form Kotak Pengaduan BGN (Label Kanan) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span>📞</span> Saluran Kontak Pengaduan (Label Kanan)
              </h2>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      Call Center:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanCallCenter}
                      onChange={(e) => updateCfg({ pengaduanCallCenter: e.target.value })}
                      className="w-full py-1 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      WhatsApp Hotline:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanWa}
                      onChange={(e) => updateCfg({ pengaduanWa: e.target.value })}
                      className="w-full py-1 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      Website BGN:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanWeb}
                      onChange={(e) => updateCfg({ pengaduanWeb: e.target.value })}
                      className="w-full py-1 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      Email Pengaduan:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanEmail}
                      onChange={(e) => updateCfg({ pengaduanEmail: e.target.value })}
                      className="w-full py-1 px-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      Instagram:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanIg}
                      onChange={(e) => updateCfg({ pengaduanIg: e.target.value })}
                      className="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      Facebook:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanFb}
                      onChange={(e) => updateCfg({ pengaduanFb: e.target.value })}
                      className="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      TikTok:
                    </label>
                    <input
                      type="text"
                      value={cfg.pengaduanTiktok}
                      onChange={(e) => updateCfg({ pengaduanTiktok: e.target.value })}
                      className="w-full py-1 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ─── PANEL PREVIEW KANAN (INTERACTIVE PREVIEW & SIMULATION) ─── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Tab Navigasi Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                <button
                  type="button"
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
                  onClick={() => setActiveTab('sepasang')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'sepasang'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Sepasang Berjejer (14×5 cm)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ompreng')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'ompreng'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  🍱 Simulasi Ompreng (Gambar 2)
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-semibold mr-1">Zoom:</span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.8, prev - 0.1))}
                  className="w-7 h-7 rounded border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-[11px]">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.1))}
                  className="w-7 h-7 rounded border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1.0)}
                  title="Skala Nyata 100% (70x50 mm)"
                  className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-[10px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 ml-1"
                >
                  1:1
                </button>
              </div>
            </div>

            {/* Preview Box Container dengan Indikator Ukuran 7,0 cm x 5,0 cm */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center min-h-[460px] overflow-auto relative">
              
              {/* Indikator Dimensi Resmi di Layar */}
              {activeTab !== 'ompreng' && (
                <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 select-none">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    ↔ Lebar: <strong className="text-slate-800 dark:text-slate-200">{activeTab === 'sepasang' ? '14,0 cm' : '7,0 cm'}</strong> (70 mm)
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    ↕ Tinggi: <strong className="text-slate-800 dark:text-slate-200">5,0 cm</strong> (50 mm)
                  </span>
                </div>
              )}

              {/* Tampilan Sesuai Tab Aktif */}
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="py-4"
              >
                {activeTab === 'kiri' && (
                  <div className="shadow-2xl rounded-sm border border-slate-300">
                    <LabelKiri
                      id="preview-node-kiri"
                      cfg={cfg}
                      isBW={isBW}
                      showCropMarks={showCropMarks}
                    />
                  </div>
                )}

                {activeTab === 'kanan' && (
                  <div className="shadow-2xl rounded-sm border border-slate-300">
                    <LabelKanan
                      id="preview-node-kanan"
                      cfg={cfg}
                      isBW={isBW}
                      showCropMarks={showCropMarks}
                    />
                  </div>
                )}

                {activeTab === 'sepasang' && (
                  <div className="shadow-2xl rounded-sm border border-slate-300">
                    <LabelSepasang
                      id="preview-node-sepasang"
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
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Unduh Gambar (300 DPI):</span>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('preview-node-kiri', 'stiker-bgn-kiri-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    📥 PNG Kiri
                  </button>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadPng('preview-node-kanan', 'stiker-bgn-kanan-70x50mm')}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    📥 PNG Kanan
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCleanThermalPrint}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>🖨️</span> Cetak Sekarang ({printPages.length} Label)
                  </button>
                </div>
              </div>
            </div>

            {/* Panduan Cetak Printer Thermal */}
            <div className="bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl p-4 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                <span>💡</span> Tips Cetak Printer Thermal Stiker (Ukuran Kertas 70 × 50 mm):
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed">
                <li>
                  Pada jendela dialog cetak printer, pastikan memilih <strong>Paper Size: 70mm × 50mm</strong> (atau 70×50 mm pada driver label printer Anda).
                </li>
                <li>
                  Atur <strong>Margins: None</strong> (atau 0 mm) dan <strong>Scale: 100%</strong> (Fit to printable area atau Actual Size) agar stiker pas dan tidak bergeser.
                </li>
                <li>
                  Gunakan mode <strong>Hitam Putih (B&W)</strong> untuk hasil paling pekat dan tajam tanpa bintik dither abu-abu.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* ─── HIDDEN PREVIEW NODES FOR DOWNLOAD (ALWAYS MOUNTED) ─── */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}>
        <LabelKiri id="preview-node-kiri-dl" cfg={cfg} isBW={isBW} />
        <LabelKanan id="preview-node-kanan-dl" cfg={cfg} isBW={isBW} />
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

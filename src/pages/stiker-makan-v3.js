import React, { useEffect, useRef, useState } from 'react'
import Link from '@docusaurus/Link'
import {
  ArrowLeft,
  Building2,
  Check,
  Clock3,
  Copy,
  Download,
  FileJson,
  FileText,
  Info,
  Palette,
  Printer,
  QrCode,
  RotateCcw,
  Save,
  Share2,
  SlidersHorizontal,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { LabelTerpadu } from '../components/StikerOmprengV3/StikerOmprengV3'

const pad2 = (value) => String(value).padStart(2, '0')

const getTodayISO = () => {
  const today = new Date()
  return `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`
}

const DEFAULT_CFG = {
  namaSppg: 'SPPG JAKARTA PUSAT 1',
  alamatSppg:
    'Jl. Kramat Raya No. 123, RT 01/RW 02, Kel. Kwitang, Kec. Senen, Jakarta Pusat',
  logoUrl: '/img/logo-bgn.png',
  waktuMode: 'direct',
  jamKonsumsi: '11:00 WIB',
  showTanggal: false,
  tanggalKonsumsi: getTodayISO(),
  tanggalFormat: 'long',
  qrMenuUrl: 'https://bgn.go.id',
  qrMenuText: 'Menu & Analisis Gizi',
  qrMenuSub: 'Pindai barcode untuk rincian menu dan gizi',
  showPengaduan: true,
  pengaduanWa: '0811-1020-0157',
  pengaduanEmail: 'pengaduan@bgn.go.id',
  primaryColor: '#0b2545',
  fontFamily: "Verdana, Geneva, 'DejaVu Sans', sans-serif",
  fsNamaSppg: 7,
  fsAlamatSppg: 3.5,
  fsBatasAman: 5.8,
  fsJam: 16,
  fsTanggal: 4.3,
  fsPeringatan: 5.3,
  fsQrJudul: 5,
  fsQrSub: 3.2,
  fsPengaduan: 3.2,
}

const STORAGE_KEY = 'stiker_ompreng_v3_config'
const STORAGE_META_KEY = 'stiker_ompreng_v3_meta'
const CONFIG_KEYS = Object.keys(DEFAULT_CFG)

const FONT_OPTIONS = [
  { label: 'Verdana', value: "Verdana, Geneva, 'DejaVu Sans', sans-serif" },
  { label: 'Tahoma', value: 'Tahoma, Verdana, Geneva, sans-serif' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Segoe UI', value: "'Segoe UI', Tahoma, Verdana, sans-serif" },
]

const TIME_PRESETS = [
  '08:00 WIB',
  '09:00 WIB',
  '10:00 WIB',
  '11:00 WIB',
  '12:00 WIB',
  '13:00 WIB',
]

const DATE_FORMATS = [
  { value: 'long', label: '10 September 2026' },
  { value: 'full', label: 'Kamis, 10 September 2026' },
  { value: 'short', label: '10 Sep 2026' },
  { value: 'dmy-dash', label: '10-09-2026' },
  { value: 'dmy-slash', label: '10/09/2026' },
]

const FONT_FIELDS = [
  { key: 'fsNamaSppg', label: 'Nama SPPG', min: 4.8, max: 10, step: 0.1 },
  { key: 'fsAlamatSppg', label: 'Alamat SPPG', min: 2.7, max: 6, step: 0.1 },
  { key: 'fsBatasAman', label: 'Judul batas waktu', min: 4, max: 8, step: 0.1 },
  { key: 'fsJam', label: 'Jam konsumsi', min: 10, max: 21, step: 0.5 },
  { key: 'fsTanggal', label: 'Tanggal', min: 3.2, max: 6, step: 0.1 },
  { key: 'fsPeringatan', label: 'Dua instruksi keamanan', min: 4, max: 7, step: 0.1 },
  { key: 'fsQrJudul', label: 'Judul barcode', min: 3.8, max: 6.5, step: 0.1 },
  { key: 'fsQrSub', label: 'Keterangan barcode', min: 2.6, max: 4.5, step: 0.1 },
  { key: 'fsPengaduan', label: 'Kontak pengaduan', min: 2.6, max: 4.2, step: 0.1 },
]

const fieldClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'

const labelClass = 'mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200'

export default function StikerMakanV3Page() {
  const [cfg, setCfg] = useState(DEFAULT_CFG)
  const [editorTab, setEditorTab] = useState('isi')
  const [colorMode, setColorMode] = useState('bw')
  const [showCropMarks, setShowCropMarks] = useState(false)
  const [previewBg, setPreviewBg] = useState('grid')
  const [zoomScale, setZoomScale] = useState(1.35)
  const [jumlahCetak, setJumlahCetak] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const [toast, setToast] = useState(null)
  const [mobileView, setMobileView] = useState('editor')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [configJsonInput, setConfigJsonInput] = useState('')
  const [configError, setConfigError] = useState(null)
  const fileInputRef = useRef(null)
  const configFileInputRef = useRef(null)
  const toastTimerRef = useRef(null)

  const isBW = colorMode === 'bw'

  const notify = (message) => {
    setToast(message)
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      const meta = window.localStorage.getItem(STORAGE_META_KEY)
      if (saved) setCfg((current) => ({ ...current, ...JSON.parse(saved) }))
      if (meta) {
        const parsed = JSON.parse(meta)
        if (parsed.colorMode) setColorMode(parsed.colorMode)
        if (typeof parsed.showCropMarks === 'boolean') setShowCropMarks(parsed.showCropMarks)
        if (parsed.jumlahCetak) setJumlahCetak(parsed.jumlahCetak)
      }
    } catch (error) {
      console.warn('Konfigurasi v3 tidak dapat dibaca:', error)
    }

    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  const updateCfg = (values) => {
    setCfg((current) => {
      const updated = { ...current, ...values }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }

  const saveSettings = () => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
    window.localStorage.setItem(
      STORAGE_META_KEY,
      JSON.stringify({ colorMode, showCropMarks, jumlahCetak }),
    )
    notify('Pengaturan v3 tersimpan di browser')
  }

  const resetSettings = () => {
    if (typeof window === 'undefined') return
    if (!window.confirm('Kembalikan seluruh pengaturan Stiker Makan V3 ke nilai awal?')) return

    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(STORAGE_META_KEY)
    setCfg({ ...DEFAULT_CFG, tanggalKonsumsi: getTodayISO() })
    setColorMode('bw')
    setShowCropMarks(false)
    setJumlahCetak(1)
    notify('Pengaturan dikembalikan ke nilai awal')
  }

  const createConfigJson = () =>
    JSON.stringify(
      {
        format: 'stiker-makan-v3',
        version: 1,
        exportedAt: new Date().toISOString(),
        config: cfg,
        preferences: {
          colorMode,
          showCropMarks,
          jumlahCetak: Math.max(1, Math.min(500, Number.parseInt(jumlahCetak, 10) || 1)),
        },
      },
      null,
      2,
    )

  const openConfigModal = () => {
    setConfigJsonInput(createConfigJson())
    setConfigError(null)
    setShowConfigModal(true)
  }

  const closeConfigModal = () => {
    setShowConfigModal(false)
    setConfigError(null)
  }

  const copyConfigJson = async () => {
    const json = createConfigJson()
    setConfigJsonInput(json)

    try {
      await navigator.clipboard.writeText(json)
      notify('JSON konfigurasi disalin ke clipboard')
    } catch (error) {
      console.error(error)
      setConfigError('Clipboard tidak dapat diakses. Pilih seluruh teks JSON lalu salin manual.')
    }
  }

  const downloadConfigJson = () => {
    const json = createConfigJson()
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'stiker-makan-v3-config.json'
    link.click()
    URL.revokeObjectURL(url)
    setConfigJsonInput(json)
    notify('File konfigurasi JSON berhasil diunduh')
  }

  const handleConfigFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setConfigError('Ukuran file konfigurasi maksimal 5 MB.')
      return
    }

    try {
      const text = await file.text()
      JSON.parse(text)
      setConfigJsonInput(text)
      setConfigError(null)
    } catch (error) {
      console.error(error)
      setConfigError('File tidak berisi JSON yang valid.')
    }
  }

  const applyImportedConfig = () => {
    try {
      const parsed = JSON.parse(configJsonInput)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Struktur JSON harus berupa objek.')
      }

      const source =
        parsed.config && typeof parsed.config === 'object' && !Array.isArray(parsed.config)
          ? parsed.config
          : parsed
      const importedConfig = {}

      CONFIG_KEYS.forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(source, key)) return
        if (typeof source[key] !== typeof DEFAULT_CFG[key]) {
          throw new Error(`Tipe nilai untuk "${key}" tidak sesuai.`)
        }
        importedConfig[key] = source[key]
      })

      if (Object.keys(importedConfig).length === 0) {
        throw new Error('Tidak ditemukan pengaturan Stiker Makan V3 di dalam JSON.')
      }

      const nextConfig = { ...DEFAULT_CFG, ...importedConfig }
      const preferences =
        parsed.preferences && typeof parsed.preferences === 'object' ? parsed.preferences : {}
      const nextColorMode = ['bw', 'color'].includes(preferences.colorMode)
        ? preferences.colorMode
        : colorMode
      const nextCropMarks =
        typeof preferences.showCropMarks === 'boolean'
          ? preferences.showCropMarks
          : showCropMarks
      const nextPrintCount = Math.max(
        1,
        Math.min(500, Number.parseInt(preferences.jumlahCetak, 10) || jumlahCetak || 1),
      )

      setCfg(nextConfig)
      setColorMode(nextColorMode)
      setShowCropMarks(nextCropMarks)
      setJumlahCetak(nextPrintCount)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig))
      window.localStorage.setItem(
        STORAGE_META_KEY,
        JSON.stringify({
          colorMode: nextColorMode,
          showCropMarks: nextCropMarks,
          jumlahCetak: nextPrintCount,
        }),
      )
      closeConfigModal()
      notify('Konfigurasi berhasil diimpor dan diterapkan')
    } catch (error) {
      setConfigError(error.message || 'Konfigurasi tidak dapat diterapkan.')
    }
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      notify('Pilih file gambar PNG, JPG, SVG, atau WebP')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      notify('Ukuran logo maksimal 2 MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      updateCfg({ logoUrl: loadEvent.target.result })
      notify('Logo SPPG berhasil diperbarui')
    }
    reader.readAsDataURL(file)
  }

  const handleDownload = async () => {
    if (isExporting) return
    const node = document.getElementById('export-node-v3')
    if (!node) {
      notify('Target gambar belum siap')
      return
    }

    setIsExporting(true)
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        backgroundColor: '#ffffff',
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = 'stiker-makan-v3-70x50mm.png'
      link.href = dataUrl
      link.click()
      notify('PNG 70 x 50 mm berhasil dibuat')
    } catch (error) {
      console.error(error)
      notify('Gagal membuat PNG. Coba ulangi setelah logo selesai dimuat')
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    const source = document.getElementById('export-node-v3')
    if (!source) {
      notify('Label belum siap dicetak')
      return
    }

    const count = Math.max(1, Math.min(500, Number.parseInt(jumlahCetak, 10) || 1))
    const printWindow = window.open('', '_blank', 'width=620,height=640')
    if (!printWindow) {
      notify('Izinkan pop-up agar jendela cetak dapat dibuka')
      return
    }

    const pages = Array.from(
      { length: count },
      () => `<div class="print-page">${source.outerHTML}</div>`,
    ).join('')

    printWindow.document.write(`<!doctype html>
      <html lang="id">
        <head>
          <meta charset="utf-8">
          <title>Cetak Stiker Makan V3</title>
          <style>
            @page { size: 70mm 50mm; margin: 0; }
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; background: #fff; }
            .print-page { width: 70mm; height: 50mm; overflow: hidden; page-break-after: always; break-after: page; }
            .print-page:last-child { page-break-after: auto; break-after: auto; }
          </style>
        </head>
        <body>${pages}</body>
      </html>`)
    printWindow.document.close()
    printWindow.focus()
    window.setTimeout(() => {
      printWindow.print()
    }, 450)
  }

  return (
    <main className="min-h-[100dvh] bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <style>{`
        .stiker-v3-preview-grid {
          background-color: #e9eef4;
          background-image:
            linear-gradient(rgba(71, 85, 105, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 85, 105, 0.12) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        .stiker-v3-preview-roll {
          background-color: #dfe5eb;
          background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.55) 0, rgba(255,255,255,.55) 2px, transparent 2px, transparent 6px);
        }
        @media (prefers-color-scheme: dark) {
          .stiker-v3-preview-grid { background-color: #162033; }
          .stiker-v3-preview-roll { background-color: #1e293b; }
        }
      `}</style>

      {toast && (
        <div
          role="status"
          className="fixed left-1/2 top-4 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900 shadow-lg dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100"
        >
          <Check className="h-4 w-4" />
          {toast}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Link
              to="/stiker-makan-v2"
              aria-label="Kembali ke Stiker Makan V2"
              className="mt-0.5 rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h1 className="m-0 text-xl font-black tracking-tight sm:text-2xl">
                  Stiker Makan V3
                </h1>
                <span className="rounded-md bg-blue-100 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  1 label terpadu
                </span>
              </div>
              <p className="m-0 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Informasi SPPG, batas konsumsi, dua instruksi keamanan, serta barcode menu dan
                analisis gizi dalam satu stiker 70 x 50 mm.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openConfigModal}
              className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800 transition hover:bg-blue-100 active:scale-[0.98] dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 dark:hover:bg-blue-900"
            >
              <Share2 className="h-4 w-4" />
              Ekspor / Impor
            </button>
            <button
              type="button"
              onClick={saveSettings}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <Save className="h-4 w-4" />
              Simpan
            </button>
            <button
              type="button"
              onClick={resetSettings}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-40 grid grid-cols-2 border-b border-slate-200 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setMobileView('editor')}
          className={`py-3 text-xs font-bold ${
            mobileView === 'editor' ? 'border-b-2 border-blue-600 text-blue-700 dark:text-blue-300' : 'text-slate-500'
          }`}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`py-3 text-xs font-bold ${
            mobileView === 'preview' ? 'border-b-2 border-blue-600 text-blue-700 dark:text-blue-300' : 'text-slate-500'
          }`}
        >
          Pratinjau
        </button>
      </div>

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:grid-cols-12">
        <section
          className={`${mobileView === 'editor' ? 'block' : 'hidden'} lg:col-span-5 lg:block`}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800">
              {[
                { id: 'isi', label: 'Isi Label', icon: FileText },
                { id: 'barcode', label: 'Barcode', icon: QrCode },
                { id: 'tampilan', label: 'Tampilan', icon: SlidersHorizontal },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setEditorTab(id)}
                  className={`flex items-center justify-center gap-2 border-b-2 px-2 py-3 text-xs font-bold transition ${
                    editorTab === id
                      ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                      : 'border-transparent text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="max-h-[calc(100dvh-220px)] overflow-y-auto p-4 sm:p-5">
              {editorTab === 'isi' && (
                <div className="space-y-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <Building2 className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                      Informasi SPPG
                    </div>
                    <div className="space-y-3">
                      <label className="block">
                        <span className={labelClass}>Nama SPPG</span>
                        <input
                          value={cfg.namaSppg}
                          onChange={(event) => updateCfg({ namaSppg: event.target.value })}
                          className={fieldClass}
                          placeholder="Nama SPPG"
                        />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Alamat SPPG</span>
                        <textarea
                          rows={3}
                          value={cfg.alamatSppg}
                          onChange={(event) => updateCfg({ alamatSppg: event.target.value })}
                          className={fieldClass}
                          placeholder="Alamat lengkap SPPG"
                        />
                      </label>
                      <div>
                        <span className={labelClass}>Logo</span>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-slate-700">
                            <img src={cfg.logoUrl} alt="Pratinjau logo" className="h-full w-full object-contain" />
                          </div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                          >
                            <Upload className="h-4 w-4" />
                            Unggah Logo
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/svg+xml,image/webp"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <Clock3 className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                      Batas Waktu Konsumsi
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateCfg({ waktuMode: 'direct' })}
                        className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                          cfg.waktuMode === 'direct'
                            ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                            : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Cetak jam
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCfg({ waktuMode: 'blank' })}
                        className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                          cfg.waktuMode === 'blank'
                            ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                            : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Kosong untuk stempel
                      </button>
                    </div>

                    {cfg.waktuMode === 'direct' && (
                      <div className="space-y-3">
                        <label className="block">
                          <span className={labelClass}>Jam konsumsi</span>
                          <input
                            value={cfg.jamKonsumsi}
                            onChange={(event) => updateCfg({ jamKonsumsi: event.target.value })}
                            className={fieldClass}
                            placeholder="11:00 WIB"
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {TIME_PRESETS.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => updateCfg({ jamKonsumsi: time })}
                              className="rounded-md border border-slate-300 px-2 py-1 text-[10px] font-bold text-slate-600 transition hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                          <input
                            type="checkbox"
                            checked={cfg.showTanggal}
                            onChange={(event) => updateCfg({ showTanggal: event.target.checked })}
                            className="h-4 w-4 accent-blue-600"
                          />
                          Sertakan tanggal
                        </label>
                        {cfg.showTanggal && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <label className="block">
                              <span className={labelClass}>Tanggal</span>
                              <input
                                type="date"
                                value={cfg.tanggalKonsumsi}
                                onChange={(event) => updateCfg({ tanggalKonsumsi: event.target.value })}
                                className={fieldClass}
                              />
                            </label>
                            <label className="block">
                              <span className={labelClass}>Format</span>
                              <select
                                value={cfg.tanggalFormat}
                                onChange={(event) => updateCfg({ tanggalFormat: event.target.value })}
                                className={fieldClass}
                              >
                                {DATE_FORMATS.map((format) => (
                                  <option key={format.value} value={format.value}>
                                    {format.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs leading-relaxed text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
                    <strong>Instruksi tetap:</strong> TIDAK BOLEH DIBAWA PULANG dan SEGERA KONSUMSI
                    SETELAH DITERIMA selalu dicetak pada setiap label.
                  </div>
                </div>
              )}

              {editorTab === 'barcode' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-black">
                    <QrCode className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    Menu dan Analisis Gizi
                  </div>
                  <label className="block">
                    <span className={labelClass}>Tautan barcode</span>
                    <input
                      type="url"
                      value={cfg.qrMenuUrl}
                      onChange={(event) => updateCfg({ qrMenuUrl: event.target.value })}
                      className={fieldClass}
                      placeholder="https://contoh.go.id/menu"
                    />
                    <span className="mt-1 block text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      Gunakan tautan publik yang dapat dibuka tanpa login.
                    </span>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Judul</span>
                    <input
                      value={cfg.qrMenuText}
                      onChange={(event) => updateCfg({ qrMenuText: event.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Keterangan singkat</span>
                    <textarea
                      rows={2}
                      value={cfg.qrMenuSub}
                      onChange={(event) => updateCfg({ qrMenuSub: event.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                    <div className="mb-3 text-sm font-black">Kontak Pengaduan</div>
                    <label className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                      <input
                        type="checkbox"
                        checked={cfg.showPengaduan}
                        onChange={(event) => updateCfg({ showPengaduan: event.target.checked })}
                        className="h-4 w-4 accent-blue-600"
                      />
                      Tampilkan kontak pengaduan pada label
                    </label>
                    <div
                      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${
                        cfg.showPengaduan ? '' : 'opacity-50'
                      }`}
                    >
                      <label className="block">
                        <span className={labelClass}>WhatsApp</span>
                        <input
                          disabled={!cfg.showPengaduan}
                          value={cfg.pengaduanWa}
                          onChange={(event) => updateCfg({ pengaduanWa: event.target.value })}
                          className={fieldClass}
                          placeholder="0811-1020-0157"
                        />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Email</span>
                        <input
                          type="email"
                          disabled={!cfg.showPengaduan}
                          value={cfg.pengaduanEmail}
                          onChange={(event) => updateCfg({ pengaduanEmail: event.target.value })}
                          className={fieldClass}
                          placeholder="pengaduan@bgn.go.id"
                        />
                      </label>
                    </div>
                    <p className="mb-0 mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      Label menggunakan ikon WhatsApp dan email tanpa awalan teks.
                    </p>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
                    Uji pindai barcode dari hasil cetak fisik. Ketajaman printer, bahan label, dan panjang
                    tautan dapat memengaruhi keberhasilan pemindaian.
                  </div>
                </div>
              )}

              {editorTab === 'tampilan' && (
                <div className="space-y-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <Palette className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                      Warna dan Font
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className={labelClass}>Mode cetak</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setColorMode('bw')}
                            className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                              colorMode === 'bw'
                                ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                                : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                            }`}
                          >
                            Hitam Putih
                          </button>
                          <button
                            type="button"
                            onClick={() => setColorMode('color')}
                            className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                              colorMode === 'color'
                                ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                                : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                            }`}
                          >
                            Berwarna
                          </button>
                        </div>
                      </div>
                      {colorMode === 'color' && (
                        <label className="block">
                          <span className={labelClass}>Warna utama</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={cfg.primaryColor}
                              onChange={(event) => updateCfg({ primaryColor: event.target.value })}
                              className="h-10 w-14 rounded border border-slate-300 bg-white p-1 dark:border-slate-700"
                            />
                            <input
                              value={cfg.primaryColor}
                              onChange={(event) => updateCfg({ primaryColor: event.target.value })}
                              className={fieldClass}
                            />
                          </div>
                        </label>
                      )}
                      <label className="block">
                        <span className={labelClass}>Keluarga font</span>
                        <select
                          value={cfg.fontFamily}
                          onChange={(event) => updateCfg({ fontFamily: event.target.value })}
                          className={fieldClass}
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.label} value={font.value}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                    <div className="mb-3 text-sm font-black">Ukuran Teks</div>
                    <div className="space-y-3">
                      {FONT_FIELDS.map((field) => (
                        <label key={field.key} className="block">
                          <span className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                            <span>{field.label}</span>
                            <span className="font-mono text-blue-700 dark:text-blue-300">
                              {cfg[field.key]} pt
                            </span>
                          </span>
                          <input
                            type="range"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={cfg[field.key]}
                            onChange={(event) =>
                              updateCfg({ [field.key]: Number.parseFloat(event.target.value) })
                            }
                            className="w-full accent-blue-600"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          className={`${mobileView === 'preview' ? 'block' : 'hidden'} lg:sticky lg:top-5 lg:col-span-7 lg:block lg:self-start`}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div>
                <div className="text-sm font-black">Pratinjau 70 x 50 mm</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Satu stiker untuk seluruh informasi utama
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomScale((value) => Math.max(0.75, value - 0.1))}
                  aria-label="Perkecil pratinjau"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-12 text-center font-mono text-[11px] font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((value) => Math.min(2, value + 0.1))}
                  aria-label="Perbesar pratinjau"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-2.5 text-xs dark:border-slate-800">
              <label className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={(event) => setShowCropMarks(event.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                Garis potong
              </label>
              <label className="ml-auto flex items-center gap-2">
                <span className="font-bold text-slate-600 dark:text-slate-300">Latar</span>
                <select
                  value={previewBg}
                  onChange={(event) => setPreviewBg(event.target.value)}
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value="white">Putih</option>
                  <option value="grid">Grid</option>
                  <option value="roll">Gulungan</option>
                </select>
              </label>
            </div>

            <div
              className={`flex min-h-[430px] items-center justify-center overflow-auto p-8 sm:p-12 ${
                previewBg === 'grid'
                  ? 'stiker-v3-preview-grid'
                  : previewBg === 'roll'
                    ? 'stiker-v3-preview-roll'
                    : 'bg-white'
              }`}
            >
              <div
                style={{
                  width: `${70 * zoomScale}mm`,
                  height: `${50 * zoomScale}mm`,
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '70mm',
                    height: '50mm',
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top left',
                    boxShadow: '0 16px 36px rgba(15, 23, 42, 0.18)',
                  }}
                >
                  <LabelTerpadu cfg={cfg} isBW={isBW} showCropMarks={showCropMarks} />
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-200 p-4 dark:border-slate-800">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  Jumlah label
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={jumlahCetak}
                    onChange={(event) => setJumlahCetak(event.target.value)}
                    className="w-20 rounded-lg border border-slate-300 bg-white px-2 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-800 transition hover:bg-blue-100 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"
                  >
                    <Download className="h-4 w-4" />
                    {isExporting ? 'Membuat PNG...' : 'Unduh PNG'}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-black text-white transition hover:bg-blue-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    <Printer className="h-4 w-4" />
                    Cetak {Math.max(1, Number.parseInt(jumlahCetak, 10) || 1)} Label
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
            <div className="mb-1.5 flex items-center gap-2 font-black">
              <Info className="h-4 w-4" />
              Pengaturan printer thermal
            </div>
            Pilih kertas 70 x 50 mm, margin 0 mm, dan skala 100% atau Actual Size. Nonaktifkan opsi
            Fit to Page agar ukuran fisik label tetap akurat.
          </div>
        </section>
      </div>

      {showConfigModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="config-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeConfigModal()
          }}
        >
          <div className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <FileJson className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                  <h2 id="config-dialog-title" className="m-0 text-base font-black">
                    Bagikan Konfigurasi
                  </h2>
                </div>
                <p className="m-0 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Salin atau unduh JSON untuk dibagikan. Tempel JSON atau pilih file untuk memuat
                  pengaturan dari perangkat lain.
                </p>
              </div>
              <button
                type="button"
                onClick={closeConfigModal}
                aria-label="Tutup dialog konfigurasi"
                className="shrink-0 rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={copyConfigJson}
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2.5 text-xs font-black text-blue-800 transition hover:bg-blue-100 active:scale-[0.98] dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"
                >
                  <Copy className="h-4 w-4" />
                  Salin JSON
                </button>
                <button
                  type="button"
                  onClick={downloadConfigJson}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-black text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Unduh JSON
                </button>
                <button
                  type="button"
                  onClick={() => configFileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-black text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <Upload className="h-4 w-4" />
                  Pilih File JSON
                </button>
                <input
                  ref={configFileInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleConfigFile}
                  className="hidden"
                />
              </div>

              <label className="block">
                <span className={labelClass}>JSON konfigurasi</span>
                <textarea
                  rows={14}
                  value={configJsonInput}
                  onChange={(event) => {
                    setConfigJsonInput(event.target.value)
                    if (configError) setConfigError(null)
                  }}
                  spellCheck="false"
                  className={`${fieldClass} resize-y font-mono text-[11px] leading-relaxed`}
                  placeholder='Tempel JSON konfigurasi Stiker Makan V3 di sini'
                />
              </label>

              {configError && (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-semibold leading-relaxed text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100"
                >
                  {configError}
                </div>
              )}

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                File dapat menyertakan logo yang diunggah sebagai data gambar. Periksa kembali
                pratinjau sebelum mencetak konfigurasi dari sumber lain.
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 p-5 sm:flex-row sm:justify-end dark:border-slate-800">
              <button
                type="button"
                onClick={closeConfigModal}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!configJsonInput.trim()}
                onClick={applyImportedConfig}
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-black text-white transition hover:bg-blue-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Terapkan Konfigurasi
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: '-99999px', top: 0, pointerEvents: 'none' }}
      >
        <LabelTerpadu
          id="export-node-v3"
          cfg={cfg}
          isBW={isBW}
          showCropMarks={showCropMarks}
        />
      </div>
    </main>
  )
}

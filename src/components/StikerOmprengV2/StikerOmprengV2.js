import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { UtensilsCrossed } from 'lucide-react'

/**
 * Auto-fit helpers — memastikan tulisan TIDAK terpotong walaupun panjang.
 * Strategi:
 * - Teks satu baris (nama SPPG, jam): font mengecil otomatis sampai muat (tanpa ellipsis).
 * - Teks multi-baris (alamat, kontak): wrap anywhere + font mengecil sampai muat vertikal.
 */
function shrinkSingleLineEl(el, basePt, minPt) {
  if (!el) return basePt
  let cur = basePt
  el.style.fontSize = `${cur}pt`
  for (let i = 0; i < 40; i++) {
    const overW = el.scrollWidth - el.clientWidth > 1
    if (!overW) break
    if (cur <= minPt) break
    cur = Math.max(minPt, Math.round((cur - 0.4) * 10) / 10)
    el.style.fontSize = `${cur}pt`
  }
  return cur
}

function fitBoxByShrinkingFonts(boxEl, fontEls, minPts) {
  if (!boxEl) return
  for (let i = 0; i < 40; i++) {
    const overH = boxEl.scrollHeight - boxEl.clientHeight > 1
    const overW = boxEl.scrollWidth - boxEl.clientWidth > 1
    if (!overH && !overW) break
    let shrunk = false
    for (let j = 0; j < fontEls.length; j++) {
      const el = fontEls[j]
      if (!el) continue
      const cur = parseFloat(el.style.fontSize) || parseFloat(minPts[j]) || 5
      const min = minPts[j]
      if (cur > min) {
        const next = Math.max(min, Math.round((cur - 0.3) * 10) / 10)
        el.style.fontSize = `${next}pt`
        shrunk = true
      }
    }
    if (!shrunk) break
  }
}

// Format tanggal Indonesia: YYYY-MM-DD → "09 September 2026" / "09-09-2026" / dst.
// Nilai non-ISO (teks lama) dikembalikan apa adanya.
const TANGGAL_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const TANGGAL_MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
]
const TANGGAL_DAYS = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jumat", 'Sabtu'
]

function formatTanggalLabel(cfg = {}) {
  const raw = cfg.tanggalKonsumsi || ''
  const fmt = cfg.tanggalFormat || 'long'
  const m = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return raw
  const dt = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (isNaN(dt.getTime())) return raw
  const pad2 = (n) => String(n).padStart(2, '0')
  const dd = pad2(dt.getDate())
  const mm = pad2(dt.getMonth() + 1)
  const yyyy = dt.getFullYear()
  switch (fmt) {
    case 'dmy-dash':
      return `${dd}-${mm}-${yyyy}`
    case 'dmy-slash':
      return `${dd}/${mm}/${yyyy}`
    case 'full':
      return `${TANGGAL_DAYS[dt.getDay()]}, ${dd} ${TANGGAL_MONTHS[dt.getMonth()]} ${yyyy}`
    case 'short':
      return `${dd} ${TANGGAL_MONTHS_SHORT[dt.getMonth()]} ${yyyy}`
    case 'long':
    default:
      return `${dt.getDate()} ${TANGGAL_MONTHS[dt.getMonth()]} ${yyyy}`
  }
}

/**
 * 🏷️ STIKER OMPRENG V2 (STANDAR SURAT EDARAN BADAN GIZI NASIONAL 2026)
 * Ukuran Resmi: 7,0 cm × 5,0 cm (70 mm × 50 mm)
 */

// Ikon Sayur & Pangan untuk Strip Ornamen Kiri
export const FoodPatternStrip = ({ isBW = false, widthMm = 11.5, heightMm = 50 }) => {
  return (
    <div
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: isBW ? '#ffffff' : '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <img
        src="/img/ornament.png"
        alt="Ornamen Pangan"
        crossOrigin="anonymous"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          filter: 'none',
          opacity: 1,
        }}
      />
    </div>
  )
}

// Ikon Larangan Ompreng Dibawa Pulang
export const IconDilarangBawaPulang = ({ isBW = false, sizeMm = 13 }) => {
  return (
    <img
      src="/img/larangan_bawa_pulang.png"
      alt="Tidak Boleh Dibawa Pulang"
      crossOrigin="anonymous"
      style={{
        width: `${sizeMm}mm`,
        height: `${sizeMm}mm`,
        flexShrink: 0,
        objectFit: 'contain',
        display: 'block',
        filter: isBW ? 'grayscale(100%) contrast(130%)' : 'none',
      }}
    />
  )
}

// Ikon Sendok Garpu (Segera Konsumsi)
export const IconSegeraKonsumsi = ({ isBW = false, sizeMm = 13 }) => {
  return (
    <img
      src="/img/sendok_garpu.png"
      alt="Segera Konsumsi Setelah Diterima"
      crossOrigin="anonymous"
      style={{
        width: `${sizeMm}mm`,
        height: `${sizeMm}mm`,
        flexShrink: 0,
        objectFit: 'contain',
        display: 'block',
        filter: isBW ? 'grayscale(100%) contrast(130%)' : 'none',
      }}
    />
  )
}

// Ikon-Ikon Kotak Pengaduan
export const SocialIcons = {
  Web: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Mail: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  WhatsApp: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Instagram: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  TikTok: ({ color = '#000000', size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
}

/**
 * 🏷️ LABEL KIRI (Ukuran 70 mm × 50 mm)
 * Sesuai Gambar 1 Lampiran Surat Edaran BGN 2026:
 * - Strip Ornamen Pangan di sisi kiri
 * - Logo BGN + SPPG [NAMA SPPG] + Alamat
 * - Kotak rounded bertuliskan "HARUS DIKONSUMSI SEBELUM PUKUL" + area jam / kosong
 */
export function LabelKiri({
  cfg = {},
  isBW = false,
  showCropMarks = false,
  id,
  className = '',
  style = {},
}) {
  const primaryColor = isBW ? '#000000' : (cfg.primaryColor || '#0b2545')
  const fontFamily = cfg.fontFamily || "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

  const namaSppg = (cfg.namaSppg || 'SPPG JAKARTA PUSAT 1').toUpperCase()
  const alamatSppg = cfg.alamatSppg || 'Jl. Kramat Raya No. 123, RT 01/RW 02, Kel. Kwitang, Kec. Senen, Jakarta Pusat'
  const logoUrl = cfg.logoUrl || '/img/logo-bgn.png'

  // Waktu Konsumsi
  const waktuMode = cfg.waktuMode || 'direct' // 'direct' (tercetak) atau 'blank' (kosong / stempel)
  const jamKonsumsi = cfg.jamKonsumsi || '11:00 WIB'
  const tanggalKonsumsi = formatTanggalLabel(cfg)
  const tanggalFormat = cfg.tanggalFormat || 'long'
  const showTanggal = cfg.showTanggal ?? false
  const showOrnament = cfg.showOrnament ?? true

  const borderThickness = cfg.borderThickness || '1.6pt'
  const borderRadius = cfg.borderRadius || '2.8mm'

  const namaBase = cfg.fsNamaSppg || 8.5
  const alamatBase = cfg.fsAlamatSppg || 4.8
  const jamBase = cfg.fsJam || 22
  const tanggalBase = cfg.fsTanggal || 6.8

  const headerBoxRef = React.useRef(null)
  const namaRef = React.useRef(null)
  const alamatRef = React.useRef(null)
  const jamRef = React.useRef(null)
  const tanggalRef = React.useRef(null)
  const jamBoxRef = React.useRef(null)

  // Auto-fit: nama (wrap 2-3 baris, mengecil) + alamat (wrap, mengecil) agar muat di header
  React.useEffect(() => {
    const box = headerBoxRef.current
    const namaEl = namaRef.current
    const alamatEl = alamatRef.current
    if (!box || !namaEl || !alamatEl || typeof window === 'undefined') return
    namaEl.style.fontSize = `${namaBase}pt`
    alamatEl.style.fontSize = `${alamatBase}pt`
    let nFs = namaBase
    let aFs = alamatBase
    for (let i = 0; i < 60; i++) {
      const overH = box.scrollHeight - box.clientHeight > 1
      const overWBox = box.scrollWidth - box.clientWidth > 1
      const overWNama = namaEl.scrollWidth - namaEl.clientWidth > 1
      const overHNama = namaEl.scrollHeight - namaEl.clientHeight > 1
      if (!overH && !overWBox && !overWNama && !overHNama) break
      let shrunk = false
      // Prioritas: kecilkan nama dulu bila nama sendiri overflow / box kepenuhan
      if ((overWNama || overHNama || overH) && nFs > 5) {
        nFs = Math.max(5, Math.round((nFs - 0.4) * 10) / 10)
        namaEl.style.fontSize = `${nFs}pt`
        shrunk = true
      } else if ((overH || overWBox) && aFs > 3) {
        aFs = Math.max(3, Math.round((aFs - 0.3) * 10) / 10)
        alamatEl.style.fontSize = `${aFs}pt`
        shrunk = true
      } else if (nFs > 4) {
        nFs = Math.max(4, Math.round((nFs - 0.4) * 10) / 10)
        namaEl.style.fontSize = `${nFs}pt`
        shrunk = true
      } else if (aFs > 2.8) {
        aFs = Math.max(2.8, Math.round((aFs - 0.2) * 10) / 10)
        alamatEl.style.fontSize = `${aFs}pt`
        shrunk = true
      }
      if (!shrunk) break
    }
  }, [namaSppg, alamatSppg, namaBase, alamatBase])

  // Auto-fit: jam + tanggal mengecil sampai muat di kotak (tidak terpotong)
  React.useEffect(() => {
    if (waktuMode !== 'direct' || typeof window === 'undefined') return
    if (jamRef.current) shrinkSingleLineEl(jamRef.current, jamBase, 8)
    if (tanggalRef.current) shrinkSingleLineEl(tanggalRef.current, tanggalBase, 4)
    const box = jamBoxRef.current
    if (box) {
      const els = [jamRef.current, tanggalRef.current].filter(Boolean)
      const mins = [8, 4]
      fitBoxByShrinkingFonts(box, els, mins)
    }
  }, [jamKonsumsi, tanggalKonsumsi, tanggalFormat, showTanggal, jamBase, tanggalBase, waktuMode])

  return (
    <div
      id={id}
      className={`label-ompreng-kiri relative bg-white text-slate-900 overflow-hidden select-none ${className}`}
      style={{
        width: '70mm',
        height: '50mm',
        maxWidth: '70mm',
        maxHeight: '50mm',
        minWidth: '70mm',
        minHeight: '50mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        fontFamily,
        position: 'relative',
        backgroundColor: '#ffffff',
        border: showCropMarks ? '0.5pt dashed #94a3b8' : 'none',
        ...style,
      }}
    >
      {/* 1. SISI KIRI: Strip Ornamen Pangan (Opsional, bawaan diabaikan/nonaktif) */}
      {showOrnament && (
        <FoodPatternStrip isBW={isBW} widthMm={11.5} heightMm={50} />
      )}

      {/* 2. SISI KANAN: Konten Utama */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: '50mm',
          maxHeight: '50mm',
          padding: showOrnament ? '2mm 2.5mm 2.2mm 2.2mm' : '2.2mm 3.5mm 2.2mm 3.5mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        {/* Header SPPG & Logo — tinggi fleksibel agar nama panjang bisa wrap */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2mm',
            height: 'auto',
            minHeight: '11mm',
            maxHeight: '17mm',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {/* Logo BGN */}
          <div
            style={{
              width: '9.5mm',
              height: '9.5mm',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoUrl}
              alt="Logo BGN"
              crossOrigin="anonymous"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: isBW ? 'grayscale(100%) contrast(150%)' : 'none',
              }}
            />
          </div>

          {/* Identitas SPPG — auto-fit, tidak terpotong */}
          <div
            ref={headerBoxRef}
            style={{
              flex: 1,
              minWidth: 0,
              height: 'auto',
              minHeight: '11mm',
              maxHeight: '17mm',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              lineHeight: 1.15,
              overflow: 'hidden',
            }}
          >
            <div
              ref={namaRef}
              style={{
                fontSize: `${namaBase}pt`,
                fontWeight: '900',
                color: primaryColor,
                letterSpacing: '0.02em',
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
                maxWidth: '100%',
                lineHeight: 1.1,
              }}
              title={namaSppg}
            >
              {namaSppg}
            </div>
            <div
              ref={alamatRef}
              style={{
                fontSize: `${alamatBase}pt`,
                fontWeight: '500',
                color: isBW ? '#000000' : '#1e293b',
                marginTop: '0.8pt',
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
                lineHeight: 1.2,
                maxWidth: '100%',
              }}
              title={alamatSppg}
            >
              {alamatSppg}
            </div>
          </div>
        </div>

        {/* Kotak Utama: HARUS DIKONSUMSI SEBELUM PUKUL */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            marginTop: '1.5mm',
            border: `${borderThickness} solid ${primaryColor}`,
            borderRadius,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Header Box */}
          <div
            style={{
              padding: '1.8mm 1mm 1.4mm 1mm',
              textAlign: 'center',
              borderBottom: waktuMode === 'direct' ? `1pt dashed ${isBW ? '#888888' : '#cbd5e1'}` : 'none',
            }}
          >
            <div
              style={{
                fontSize: `${cfg.fsBatasAman || 8.8}pt`,
                fontWeight: '900',
                color: primaryColor,
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                textTransform: 'uppercase',
              }}
            >
              HARUS DIKONSUMSI<br />SEBELUM PUKUL
            </div>
          </div>

          {/* Body Box: Tampilan Waktu (atau Kosong untuk Stempel / Spidol) */}
          <div
            ref={jamBoxRef}
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1mm',
              backgroundColor: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {waktuMode === 'direct' ? (
              <div style={{ textAlign: 'center', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                <div
                  ref={jamRef}
                  style={{
                    fontSize: `${jamBase}pt`,
                    fontWeight: '900',
                    color: primaryColor,
                    lineHeight: 1,
                    letterSpacing: '0.03em',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '100%',
                  }}
                  title={jamKonsumsi}
                >
                  {jamKonsumsi}
                </div>
                {showTanggal && tanggalKonsumsi && (
                  <div
                    ref={tanggalRef}
                    style={{
                      fontSize: `${tanggalBase}pt`,
                      fontWeight: '700',
                      color: isBW ? '#000000' : '#0f172a',
                      marginTop: '1.2mm',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'clip',
                      textAlign: 'center',
                      width: '100%',
                      maxWidth: '100%',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                    title={tanggalKonsumsi}
                  >
                    {tanggalKonsumsi}
                  </div>
                )}
              </div>
            ) : (
              /* Mode Kosong untuk Tulis Tangan / Stempel Jam */
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isBW ? '#aaaaaa' : '#cbd5e1',
                }}
              >
                {/* Garis halus panduan stempel jika diinginkan */}
                <div
                  style={{
                    fontSize: '6pt',
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                    opacity: 0.7,
                  }}
                >
                  [ Kolom Stempel / Tulis Jam ]
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 🏷️ LABEL KANAN (Ukuran 70 mm × 50 mm)
 * Sesuai Gambar 1 Lampiran Surat Edaran BGN 2026:
 * - Sisi Kiri: 2 Kotak Bertumpuk
 *   1. TIDAK BOLEH DIBAWA PULANG. (Ikon Larangan Ompreng)
 *   2. SEGERA KONSUMSI SETELAH DITERIMA (Ikon Sendok Garpu)
 * - Sisi Kanan: 1 Kotak Vertikal "Kotak Pengaduan"
 *   (bgn.go.id, email, 157, WA, IG, FB, TikTok)
 */
export function LabelKanan({
  cfg = {},
  isBW = false,
  showCropMarks = false,
  id,
  className = '',
  style = {},
}) {
  const primaryColor = isBW ? '#000000' : (cfg.primaryColor || '#0b2545')
  const fontFamily = cfg.fontFamily || "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

  const borderThickness = cfg.borderThickness || '1.6pt'
  const borderRadius = cfg.borderRadius || '2.8mm'

  // Lebar Kolom Larangan vs Pengaduan & Pengaturan QR Menu
  const widthKolomLarangan = cfg.widthKolomLarangan || 27
  const showQrMenu = cfg.showQrMenu ?? true
  const qrMenuUrl = cfg.qrMenuUrl || 'https://bgn.go.id'
  const qrMenuText = cfg.qrMenuText || 'MENU & ANALISIS GIZI'
  const qrMenuSub = cfg.qrMenuSub ?? 'Scan rincian menu & gizi'

  // Pengaturan Kotak Pengaduan
  const pengaduan = {
    web: cfg.pengaduanWeb ?? 'bgn.go.id',
    email: cfg.pengaduanEmail ?? 'pengaduan@bgn.go.id',
    callCenter: cfg.pengaduanCallCenter ?? '157',
    wa: cfg.pengaduanWa ?? '0811-1020-0157',
    ig: cfg.pengaduanIg ?? '@badangizinasional.ri',
    fb: cfg.pengaduanFb ?? 'Badan Gizi Nasional RI',
    tiktok: cfg.pengaduanTiktok ?? '@badangizinasional.ri',
  }

  const iconColor = isBW ? '#000000' : '#1e293b'

  const isiBase = cfg.fsIsiPengaduan || 5.1
  // Ukuran font per kontak (satu-satu, fallback ke ukuran global)
  const fsWeb = cfg.fsPengaduanWeb ?? isiBase
  const fsEmail = cfg.fsPengaduanEmail ?? isiBase
  const fsCall = cfg.fsPengaduanCallCenter ?? isiBase
  const fsWa = cfg.fsPengaduanWa ?? isiBase
  const fsIg = cfg.fsPengaduanIg ?? isiBase
  const fsFb = cfg.fsPengaduanFb ?? isiBase
  const fsTiktok = cfg.fsPengaduanTiktok ?? isiBase
  const laranganBase = cfg.fsLarangan || 6.8
  const konsumsiBase = cfg.fsSegeraKonsumsi || 6.8
  const pengaduanBoxRef = React.useRef(null)
  const pengaduanListRef = React.useRef(null)
  const laranganRef = React.useRef(null)
  const konsumsiRef = React.useRef(null)

  const pengaduanKey = [pengaduan.web, pengaduan.email, pengaduan.callCenter, pengaduan.wa, pengaduan.ig, pengaduan.fb, pengaduan.tiktok].join('|')

  // Auto-fit: tiap baris wrap + font per-kontak mengecil proporsional sampai muat
  React.useEffect(() => {
    const box = pengaduanBoxRef.current
    const list = pengaduanListRef.current
    if (!box || !list || typeof window === 'undefined') return
    const spans = Array.from(list.querySelectorAll('[data-pfs]'))
    const bases = spans.map((el) => parseFloat(el.getAttribute('data-pfs')) || isiBase)
    spans.forEach((el, i) => {
      el.style.fontSize = `${bases[i]}pt`
    })
    for (let i = 0; i < 40; i++) {
      const overH = box.scrollHeight - box.clientHeight > 1
      const overW = box.scrollWidth - box.clientWidth > 1
      const listOverW = list.scrollWidth - list.clientWidth > 1
      if (!overH && !overW && !listOverW) break
      let shrunk = false
      spans.forEach((el, j) => {
        const cur = parseFloat(el.style.fontSize) || bases[j]
        if (cur > 2.8) {
          el.style.fontSize = `${Math.max(2.8, Math.round((cur - 0.2) * 10) / 10)}pt`
          shrunk = true
        }
      })
      if (!shrunk) break
    }
  }, [pengaduanKey, isiBase, fsWeb, fsEmail, fsCall, fsWa, fsIg, fsFb, fsTiktok])

  // Auto-fit: teks larangan (statis, tapi aman bila fs diperbesar user)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (laranganRef.current) {
      const el = laranganRef.current
      el.style.fontSize = `${laranganBase}pt`
      for (let i = 0; i < 20; i++) {
        if (el.scrollHeight - el.clientHeight <= 1 && el.scrollWidth - el.clientWidth <= 1) break
        const cur = parseFloat(el.style.fontSize) || laranganBase
        if (cur <= 4) break
        el.style.fontSize = `${Math.max(4, Math.round((cur - 0.3) * 10) / 10)}pt`
      }
    }
    if (konsumsiRef.current) {
      const el = konsumsiRef.current
      el.style.fontSize = `${konsumsiBase}pt`
      for (let i = 0; i < 20; i++) {
        if (el.scrollHeight - el.clientHeight <= 1 && el.scrollWidth - el.clientWidth <= 1) break
        const cur = parseFloat(el.style.fontSize) || konsumsiBase
        if (cur <= 4) break
        el.style.fontSize = `${Math.max(4, Math.round((cur - 0.3) * 10) / 10)}pt`
      }
    }
  }, [laranganBase, konsumsiBase])

  return (
    <div
      id={id}
      className={`label-ompreng-kanan relative bg-white text-slate-900 overflow-hidden select-none ${className}`}
      style={{
        width: '70mm',
        height: '50mm',
        maxWidth: '70mm',
        maxHeight: '50mm',
        minWidth: '70mm',
        minHeight: '50mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        padding: '2.5mm',
        gap: '2mm',
        fontFamily,
        position: 'relative',
        backgroundColor: '#ffffff',
        border: showCropMarks ? '0.5pt dashed #94a3b8' : 'none',
        ...style,
      }}
    >
      {/* 1. KOLOM KIRI (Larangan & Segera Konsumsi) - Lebar diperkecil agar Kotak Pengaduan lebih luas */}
      <div
        style={{
          width: `${widthKolomLarangan}mm`,
          height: '45mm',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '2mm',
          flexShrink: 0,
        }}
      >
        {/* Kotak 1: TIDAK BOLEH DIBAWA PULANG */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            border: `${borderThickness} solid ${primaryColor}`,
            borderRadius,
            padding: '1.2mm 1.5mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div style={{ marginBottom: '1mm', flexShrink: 0 }}>
            <IconDilarangBawaPulang isBW={isBW} sizeMm={cfg.sizeIconLarangan || 10.5} />
          </div>
          <div
            ref={laranganRef}
            style={{
              fontSize: `${laranganBase}pt`,
              fontWeight: '900',
              color: primaryColor,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              whiteSpace: 'normal',
              overflow: 'hidden',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
          >
            TIDAK BOLEH<br />DIBAWA PULANG.
          </div>
        </div>

        {/* Kotak 2: SEGERA KONSUMSI SETELAH DITERIMA */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            border: `${borderThickness} solid ${primaryColor}`,
            borderRadius,
            padding: '1.2mm 1.5mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div style={{ marginBottom: '1mm', flexShrink: 0 }}>
            <IconSegeraKonsumsi isBW={isBW} sizeMm={cfg.sizeIconKonsumsi || 10.5} />
          </div>
          <div
            ref={konsumsiRef}
            style={{
              fontSize: `${konsumsiBase}pt`,
              fontWeight: '900',
              color: primaryColor,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              whiteSpace: 'normal',
              overflow: 'hidden',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
          >
            SEGERA KONSUMSI<br />SETELAH DITERIMA
          </div>
        </div>
      </div>

      {/* 2. KOLOM KANAN: Kotak Pengaduan + QR Code Menu & Analisis Gizi */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: '45mm',
          maxHeight: '45mm',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1.5mm',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Kotak Pengaduan */}
        <div
          ref={pengaduanBoxRef}
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            border: `${borderThickness} solid ${primaryColor}`,
            borderRadius,
            padding: showQrMenu ? '1.2mm 1.6mm' : '1.8mm 1.6mm',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Header: Kotak Pengaduan */}
          {/* Header: Kotak Pengaduan */}
          <div
            style={{
              textAlign: 'center',
              fontSize: `${showQrMenu ? (cfg.fsHeaderPengaduan || 6.2) : (cfg.fsHeaderPengaduan || 7.5)}pt`,
              fontWeight: '900',
              color: primaryColor,
              lineHeight: 1.1,
              paddingBottom: showQrMenu ? '0.6mm' : '1.2mm',
              borderBottom: `0.8pt solid ${isBW ? '#444444' : '#cbd5e1'}`,
              marginBottom: showQrMenu ? '0.8mm' : '1.2mm',
              flexShrink: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Kotak Pengaduan
          </div>

          {/* List Kontak Resmi BGN — wrap + auto-shrink, ringkas & tidak kepanjangan */}
          <div
            ref={pengaduanListRef}
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: showQrMenu ? '0.7mm' : '0.9mm',
              fontSize: `${isiBase}pt`,
              lineHeight: 1.15,
              color: isBW ? '#000000' : '#1e293b',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            {/* Call Center 157 */}
            {pengaduan.callCenter && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.Phone color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.callCenter} data-pfs={fsCall} style={{ fontWeight: '800', flex: 1, minWidth: 0, fontSize: `${fsCall}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.callCenter}
                </span>
              </div>
            )}

            {/* WhatsApp */}
            {pengaduan.wa && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.WhatsApp color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.wa} data-pfs={fsWa} style={{ fontWeight: '600', flex: 1, minWidth: 0, fontSize: `${fsWa}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.wa}
                </span>
              </div>
            )}

            {/* Website */}
            {pengaduan.web && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.Web color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.web} data-pfs={fsWeb} style={{ fontWeight: '600', flex: 1, minWidth: 0, fontSize: `${fsWeb}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.web}
                </span>
              </div>
            )}

            {/* Email */}
            {pengaduan.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.Mail color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.email} data-pfs={fsEmail} style={{ fontWeight: '500', flex: 1, minWidth: 0, fontSize: `${fsEmail}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.email}
                </span>
              </div>
            )}

            {/* Instagram */}
            {pengaduan.ig && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.Instagram color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.ig} data-pfs={fsIg} style={{ fontWeight: '500', flex: 1, minWidth: 0, fontSize: `${fsIg}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.ig}
                </span>
              </div>
            )}

            {/* Facebook */}
            {pengaduan.fb && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.Facebook color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.fb} data-pfs={fsFb} style={{ fontWeight: '500', flex: 1, minWidth: 0, fontSize: `${fsFb}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.fb}
                </span>
              </div>
            )}

            {/* TikTok */}
            {pengaduan.tiktok && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2mm', minWidth: 0 }}>
                <span style={{ flexShrink: 0, lineHeight: 1.15, display: 'inline-flex' }}>
                  <SocialIcons.TikTok color={iconColor} size={9.5} />
                </span>
                <span title={pengaduan.tiktok} data-pfs={fsTiktok} style={{ fontWeight: '500', flex: 1, minWidth: 0, fontSize: `${fsTiktok}pt`, whiteSpace: 'normal', overflow: 'hidden', overflowWrap: 'anywhere', wordBreak: 'break-word', lineHeight: 1.15 }}>
                  {pengaduan.tiktok}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Kotak QR Code MENU & ANALISIS GIZI (Vertikal: Judul di Atas, QR Code di Bawah) */}
        {showQrMenu && (
          <div
            style={{
              height: '21mm',
              minHeight: '21mm',
              maxHeight: '21mm',
              border: `${borderThickness} solid ${primaryColor}`,
              borderRadius,
              padding: '1mm 1.2mm',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: `${cfg.fsQrJudul || 5.6}pt`,
                fontWeight: '900',
                color: primaryColor,
                letterSpacing: '0.02em',
                textAlign: 'center',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                marginBottom: '0.8mm',
                width: '100%',
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}
            >
              {qrMenuText || 'MENU & ANALISIS GIZI'}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flex: 1,
                minHeight: 0,
              }}
            >
              <QRCodeSVG
                value={qrMenuUrl || 'https://bgn.go.id'}
                size={56}
                level="M"
                fgColor={isBW ? '#000000' : primaryColor}
                bgColor="#ffffff"
                style={{
                  width: '14.5mm',
                  height: '14.5mm',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 🏷️ LABEL SEPASANG BERJEJER (Ukuran 140 mm × 50 mm)
 * Menampilkan Label Kiri & Kanan berdampingan
 */
export function LabelSepasang({ cfg = {}, isBW = false, showCropMarks = false, gapMm = 4, className = '', style = {} }) {
  return (
    <div
      className={`label-sepasang-container flex flex-row items-center select-none ${className}`}
      style={{
        gap: `${gapMm}mm`,
        ...style,
      }}
    >
      <LabelKiri cfg={cfg} isBW={isBW} showCropMarks={showCropMarks} />
      <LabelKanan cfg={cfg} isBW={isBW} showCropMarks={showCropMarks} />
    </div>
  )
}


/**
 * SIMULASI TUTUP OMPRENG STAINLESS STEEL - SEGEL (SURAT EDARAN BGN 2026)
 * Stiker kiri & kanan berfungsi sebagai segel yang melipat dari permukaan atas ke sisi depan tutup ompreng.
 */
export function OmprengMockup({ cfg = {}, isBW = false }) {
  const containerRef = React.useRef(null)
  const [containerWidth, setContainerWidth] = React.useState(680)

  React.useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const labelNatW = 264.567
  const labelNatH = 188.976
  const stickerW = containerWidth * 0.38
  const stickerH = stickerW * (5 / 7)
  const scale = stickerW / labelNatW
  const lidThicknessPx = stickerH * 0.28
  const totalH = stickerH + lidThicknessPx + 8

  return (
    <div ref={containerRef} className="relative w-full max-w-[760px] mx-auto select-none">
      <div className="flex items-center gap-2 mb-4 px-1">
        <UtensilsCrossed className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Gambar 2: Label Segel pada Tutup Ompreng Program Makan Bergizi Gratis
        </span>
      </div>

      <div style={{ position: 'relative', perspective: '900px', perspectiveOrigin: '50% -10%', width: '100%' }}>
        <div
          style={{
            transform: 'rotateX(38deg)',
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: '100%',
            height: `${totalH}px`,
          }}
        >
          {/* PERMUKAAN ATAS TUTUP */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: `${stickerH}px`,
              borderRadius: '8px 8px 0 0',
              background: 'linear-gradient(162deg, #f0f6fa 0%, #dae6f0 25%, #bed1e3 55%, #a4bdd0 75%, #c6d6e2 90%, #edf3f7 100%)',
              border: '2.5px solid #7a9ab5', borderBottom: 'none',
              boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.8), inset 0 -3px 8px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(94deg, transparent 0px, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 5px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.65) 0%, transparent 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '7px', borderRadius: '5px', border: '1.5px solid rgba(120,155,180,0.38)', pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${containerWidth * 0.03}px` }}>
              {/* TOP: Label Kiri */}
              <div style={{ position: 'relative', width: `${stickerW}px`, height: `${stickerH}px`, flexShrink: 0, overflow: 'hidden', borderRadius: '2px 2px 0 0', boxShadow: '2px 2px 8px rgba(0,0,0,0.22)', transform: 'rotate(-0.3deg)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: `${labelNatW}px`, height: `${labelNatH}px`, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <LabelKiri cfg={cfg} isBW={isBW} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 55%)', pointerEvents: 'none' }} />
              </div>

              {/* TOP: Label Kanan */}
              <div style={{ position: 'relative', width: `${stickerW}px`, height: `${stickerH}px`, flexShrink: 0, overflow: 'hidden', borderRadius: '2px 2px 0 0', boxShadow: '-2px 2px 8px rgba(0,0,0,0.22)', transform: 'rotate(0.3deg)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: `${labelNatW}px`, height: `${labelNatH}px`, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  <LabelKanan cfg={cfg} isBW={isBW} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 55%)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          {/* SISI DEPAN TUTUP — lipatan segel stiker */}
          <div
            style={{
              position: 'absolute', top: `${stickerH}px`, left: 0, right: 0,
              height: `${lidThicknessPx}px`,
              background: 'linear-gradient(to bottom, #7898ae 0%, #567a90 100%)',
              borderTop: '1.5px solid #4a6f87',
              boxShadow: '0 6px 14px rgba(0,0,0,0.28)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', padding: `0 ${containerWidth * 0.03}px`, overflow: 'hidden' }}>
              {/* SIDE: Lipatan Kiri */}
              <div style={{ width: `${stickerW}px`, height: '100%', flexShrink: 0, overflow: 'hidden', backgroundColor: '#fff', position: 'relative', transform: 'rotate(-0.3deg)', boxShadow: '2px 0 4px rgba(0,0,0,0.15)' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${labelNatW}px`, height: `${labelNatH}px`, transform: `scale(${scale})`, transformOrigin: 'bottom left', filter: 'brightness(0.75)' }}>
                  <LabelKiri cfg={cfg} isBW={isBW} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 100%)', pointerEvents: 'none' }} />
              </div>

              {/* SIDE: Lipatan Kanan */}
              <div style={{ width: `${stickerW}px`, height: '100%', flexShrink: 0, overflow: 'hidden', backgroundColor: '#fff', position: 'relative', transform: 'rotate(0.3deg)', boxShadow: '-2px 0 4px rgba(0,0,0,0.15)' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${labelNatW}px`, height: `${labelNatH}px`, transform: `scale(${scale})`, transformOrigin: 'bottom left', filter: 'brightness(0.75)' }}>
                  <LabelKanan cfg={cfg} isBW={isBW} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 100%)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-center">
        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-1 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Label Kiri — SPPG &amp; Batas Waktu</div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px]">Ditempel &amp; dilipat di sisi kiri tutup ompreng</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-1 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Label Kanan — Larangan &amp; Pengaduan</div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px]">Ditempel &amp; dilipat di sisi kanan tutup ompreng</div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 flex-wrap">
        <span className="font-bold text-slate-800 dark:text-slate-200">Surat Edaran BGN 2026:</span>
        <span>Label Kiri (7x5 cm) + Label Kanan (7x5 cm) - segel tutup ompreng stainless steel</span>
      </div>
    </div>
  )
}

export default {
  LabelKiri,
  LabelKanan,
  LabelSepasang,
  OmprengMockup,
  FoodPatternStrip,
  IconDilarangBawaPulang,
  IconSegeraKonsumsi,
}

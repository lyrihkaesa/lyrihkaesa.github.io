import React from 'react'

/**
 * 🏷️ KOMPONEN TEMPLATE STIKER LABEL MAKANAN
 * 
 * Anda bisa mengedit tampilan, ukuran font, border, warna, susunan, 
 * dan tata letak stiker langsung di file komponen ini.
 */
// Kategori Kandungan Gizi BGN
export const GIZI_CATEGORIES = [
  { id: 'besar', key: 'giziBesar', title: 'PORSI BESAR', icon: '🍱', defaultActive: true },
  { id: 'kecil', key: 'giziKecil', title: 'PORSI KECIL', icon: '🍱', defaultActive: true },
  { id: 'balita', key: 'giziBalita', title: 'BALITA', icon: '👶', defaultActive: false },
  { id: 'ibuHamil', key: 'giziIbuHamil', title: 'IBU HAMIL', icon: '🤰', defaultActive: false },
  { id: 'ibuMenyusui', key: 'giziIbuMenyusui', title: 'IBU MENYUSUI', icon: '🤱', defaultActive: false },
]

export default function StikerLabel({
  cfg,
  kolom = 2,
  susunanGizi = 'stacked', // 'stacked' (atas-bawah) atau 'sideBySide' (kiri-kanan)
  fontMultiplier = 1,
  colorMode = 'color',
  fontFamily,
  paddingStiker = 0,
  sheetOffsetX = 0,
  extendLeftMm = 0,
  extendRightMm = 0,
}) {
  // Parsing daftar menu per baris
  const menuList = (cfg.menuText || '')
    .split('\n')
    .map((s) => s.trim().replace(/^[•*\-]\s*/, ''))
    .filter(Boolean)

  const isBW = colorMode === 'bw'
  const redColor = isBW ? '#000000' : '#dc2626'
  const blackColor = '#000000'

  // Pengaturan Ukuran Font Dinamis
  const fs = {
    judul: 18,
    namaDapur: 12,
    namaMitra: 10,
    judulGizi: 12,
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
    ...(cfg?.fontSizes || {}),
  }

  const logoSize = cfg?.logoSizeMm || 50
  const activeFontFamily = cfg?.fontFamily || fontFamily || "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  const giziIconType = cfg?.giziIconType || 'emoji' // 'emoji', 'bullet', 'none'
  const tableRadius = cfg?.tableRadius !== undefined ? cfg.tableRadius : 3

  // Pengaturan Pola Ornamen Dekorasi Label (Bukan di dalam header tabel)
  const showPattern = cfg?.showPattern ?? true
  const patternType = cfg?.patternType || 'color' // 'color' (PATTERN4) atau 'white' (PATTERN4_WHITE)
  const patternUrl = patternType === 'white'
    ? '/img/pattern4-white.png'
    : (cfg?.patternUrl || '/img/pattern4.png')
  const patternHeightMm = cfg?.patternHeightMm || 6
  const patternOpacity = cfg?.patternOpacity ?? 0.85
  const patternPos = cfg?.patternPos || 'both' // 'both', 'top', 'bottom', 'none'

  // Kategori Gizi yang Aktif
  const activeGiziCategories = GIZI_CATEGORIES.filter((cat) =>
    cfg?.giziActiveCategories ? !!cfg.giziActiveCategories[cat.id] : cat.defaultActive
  )

  // Helper Baris Nilai Gizi
  const getGiziRows = (giziData) => [
    { l: 'Energi', v: giziData?.energi, u: 'kkal', icon: '⚡' },
    { l: 'Protein', v: giziData?.protein, u: 'gr', icon: '🥩' },
    { l: 'Lemak', v: giziData?.lemak, u: 'gr', icon: '🥑' },
    { l: 'Karbohidrat', v: giziData?.karbohidrat, u: 'gr', icon: '🍚' },
    { l: 'Serat', v: giziData?.serat, u: 'gr', icon: '🥦' },
  ]

  // Helper Renderer Pita Ornamen Dekorasi Label (Full Bleed ke ujung kertas kiri & kanan)
  const renderDecorationRibbon = (key) => {
    if (!showPattern || patternPos === 'none') return null
    const totalExtraWidth = paddingStiker * 2 + (extendLeftMm || 0) + (extendRightMm || 0)
    const totalLeftOffset = paddingStiker + (extendLeftMm || 0)

    return (
      <div
        key={key}
        style={{
          width: totalExtraWidth > 0 ? `calc(100% + ${totalExtraWidth}mm)` : '100%',
          marginLeft: totalLeftOffset > 0 ? `-${totalLeftOffset}mm` : '0',
          marginTop: '2pt',
          marginBottom: '2pt',
          height: `${patternHeightMm}mm`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          padding: 0,
          boxSizing: 'border-box',
          flexShrink: 0,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${patternUrl})`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: `${-sheetOffsetX}mm center`,
            backgroundSize: `auto ${patternHeightMm}mm`,
            opacity: patternOpacity,
            filter: isBW ? 'grayscale(100%) brightness(0)' : 'none',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        height: '100%',
        justifyContent: 'space-between',
        fontFamily: activeFontFamily,
        position: 'relative',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          1. KOP ATAS: JUDUL, LOGO, SPPG, MITRA
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          paddingTop: '4pt',
        }}
      >
        
        {/* Judul Atas (Melengkung Arched / Teks Biasa) */}
        {cfg.showJudul && cfg.judul && (
          cfg.judulArch ? (
            (() => {
              const h = Math.max(5, Math.min(60, Number(cfg.archCurvature ?? 25)))
              const userOffset = Number(cfg.logoOffsetPt ?? 0)
              const spanHalfWidth = 120 // Setengah bentang (X=20 ke X=260)
              const R = Number(((spanHalfWidth * spanHalfWidth + h * h) / (2 * h)).toFixed(2)) // Jari-jari lingkaran sejati
              const topY = 10
              const startY = topY + h
              const endY = topY + h
              const svgHeight = Math.max(30, startY + 14)

              // Margin negatif dinamis proporsional terhadap kedalaman busur h
              const autoMarginBottomPt = (cfg.showLogo && cfg.logoUrl)
                ? -Math.round(h * 0.65 + 6)
                : 0
              const totalMarginBottomPt = autoMarginBottomPt + userOffset

              return (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '2pt',
                    marginBottom: `${totalMarginBottomPt}pt`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <svg
                    viewBox={`0 0 280 ${svgHeight}`}
                    style={{ width: '96%', overflow: 'visible', display: 'block' }}
                  >
                    <path
                      id="curve-path"
                      d={`M 20 ${startY} A ${R} ${R} 0 0 1 260 ${endY}`}
                      fill="transparent"
                    />
                    <text
                      fill={blackColor}
                      fontSize={`${fs.judul * fontMultiplier}`}
                      fontWeight="900"
                      fontFamily={activeFontFamily}
                      letterSpacing="2"
                      textAnchor="middle"
                    >
                      <textPath href="#curve-path" startOffset="50%" textAnchor="middle">
                        {cfg.judul}
                      </textPath>
                    </text>
                  </svg>
                </div>
              )
            })()
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontWeight: '900',
                fontSize: `${fs.judul * fontMultiplier}pt`,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '2pt 2pt 1pt 2pt',
                lineHeight: 1.15,
                color: blackColor,
                width: '100%',
              }}
            >
              {cfg.judul}
            </div>
          )
        )}

        {/* Logo Badan Gizi Nasional */}
        {cfg.showLogo && cfg.logoUrl && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0' }}>
            <img
              src={cfg.logoUrl}
              alt="Logo BGN"
              crossOrigin="anonymous"
              loading="eager"
              fetchpriority="high"
              style={{
                width: `${logoSize}mm`,
                height: `${logoSize}mm`,
                maxWidth: `${logoSize}mm`,
                maxHeight: `${logoSize}mm`,
                objectFit: 'contain',
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </div>
        )}

        {/* SPPG & Mitra */}
        {(cfg.showDapur || cfg.showMitra) && (
          <div style={{ textAlign: 'center', padding: '2pt 0', width: '100%' }}>
            {cfg.showDapur && cfg.namaDapur && (
              <div
                style={{
                  fontSize: `${fs.namaDapur * fontMultiplier}pt`,
                  fontWeight: '900',
                  color: blackColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}
              >
                {cfg.namaDapur}
              </div>
            )}
            {cfg.showMitra && cfg.namaMitra && (
              <div
                style={{
                  fontSize: `${fs.namaMitra * fontMultiplier}pt`,
                  fontWeight: '800',
                  color: blackColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.25,
                  marginTop: '2pt',
                }}
              >
                {cfg.namaMitra}
              </div>
            )}
          </div>
        )}

      </div>

      {/* 🌟 PITA DEKORASI BGN ATAS (DI BAWAH KOP) 🌟 */}
      {(patternPos === 'top' || patternPos === 'both') && renderDecorationRibbon('ribbon-top')}

      {/* ═══════════════════════════════════════════════════════════════════════
          2. BOX MENU MAKANAN (HEADER SOLID HITAM + ISI MENU)
      ═══════════════════════════════════════════════════════════════════════ */}
      {cfg.showMenu && menuList.length > 0 && (
        <div
          style={{
            border: `1.5pt solid ${blackColor}`,
            borderRadius: `${tableRadius}px`,
            overflow: 'hidden',
            background: '#ffffff',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              background: blackColor,
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: '900',
              fontSize: `${fs.headerBox * fontMultiplier}pt`,
              letterSpacing: '0.06em',
              padding: '3pt 4pt',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              margin: '-1px -1px 0 -1px',
              width: 'calc(100% + 2px)',
              boxSizing: 'border-box',
            }}
          >
            {cfg.judulMenu || 'MENU'}
          </div>
          <div style={{ padding: '4pt 7pt' }}>
            {menuList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4.5pt',
                  fontSize: `${fs.isiMenu * fontMultiplier}pt`,
                  lineHeight: 1.4,
                  fontWeight: '700',
                  color: blackColor,
                }}
              >
                <span style={{ fontSize: `${(fs.isiMenu + 0.5) * fontMultiplier}pt`, lineHeight: 1, flexShrink: 0 }}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          3. BOX KANDUNGAN GIZI (HEADER SOLID HITAM + RATA KIRI-KANAN)
      ═══════════════════════════════════════════════════════════════════════ */}
      {cfg.showGizi && activeGiziCategories.length > 0 && (
        <div style={{ width: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: '900',
              fontSize: `${fs.judulGizi * fontMultiplier}pt`,
              color: blackColor,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '3pt',
            }}
          >
            {cfg.judulGizi || 'KANDUNGAN GIZI'}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: susunanGizi === 'sideBySide' ? 'row' : 'column',
              gap: '3.5pt',
            }}
          >
            {activeGiziCategories.map((cat) => {
              const giziData = cfg[cat.key] || {}
              const rows = getGiziRows(giziData)

              return (
                <div
                  key={cat.id}
                  style={{
                    flex: 1,
                    border: `1.5pt solid ${blackColor}`,
                    borderRadius: `${tableRadius}px`,
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      background: blackColor,
                      color: '#ffffff',
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: `${fs.headerBox * fontMultiplier}pt`,
                      letterSpacing: '0.05em',
                      padding: '2.5pt 4pt',
                      textTransform: 'uppercase',
                      margin: '-1px -1px 0 -1px',
                      width: 'calc(100% + 2px)',
                      boxSizing: 'border-box',
                    }}
                  >
                    {cat.title}
                  </div>
                  <div style={{ padding: '3.5pt 6pt' }}>
                    {rows.map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          fontSize: `${fs.isiGizi * fontMultiplier}pt`,
                          lineHeight: 1.42,
                          fontWeight: '700',
                          color: blackColor,
                          padding: '0.5pt 0',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3pt', minWidth: 0 }}>
                          {giziIconType === 'emoji' && (
                            <span style={{ fontSize: `${fs.isiGizi * fontMultiplier}pt`, lineHeight: 1, flexShrink: 0 }}>
                              {row.icon}
                            </span>
                          )}
                          {giziIconType === 'bullet' && (
                            <span style={{ fontSize: `${(fs.isiGizi + 0.5) * fontMultiplier}pt`, lineHeight: 1, flexShrink: 0 }}>
                              •
                            </span>
                          )}
                          <span style={{ whiteSpace: 'nowrap' }}>{row.l}</span>
                        </div>
                        <div style={{ fontWeight: '800', textAlign: 'right', whiteSpace: 'nowrap', marginLeft: '4pt' }}>
                          {row.v || '-'} {row.u}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          4. BATAS WAKTU KONSUMSI, JAM, TANGGAL, SUBTEKS, LARANGAN
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2pt' }}>
        
        {/* Batas Waktu Konsumsi */}
        {cfg.showBatasAman && (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div
              style={{
                fontSize: `${fs.batasAman * fontMultiplier}pt`,
                fontWeight: '900',
                color: redColor,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {(cfg.judulBatasAman || 'HARUS DIKONSUMSI\nSEBELUM PUKUL')
                .split('\n')
                .map((line, idx) => (
                  <span
                    key={idx}
                    style={{
                      whiteSpace: 'nowrap',
                      display: 'block',
                      maxWidth: '100%',
                    }}
                  >
                    {line}
                  </span>
                ))}
            </div>
            
            {/* Jam Batas Konsumsi + Ikon Jam */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6pt',
                margin: '2pt 0',
              }}
            >
              {/* Ikon Jam Analog SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={blackColor} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 13.5" />
              </svg>
              <span
                style={{
                  fontSize: `${fs.durasiBatas * fontMultiplier}pt`,
                  fontWeight: '900',
                  color: redColor,
                  lineHeight: 1,
                  letterSpacing: '0.03em',
                }}
              >
                {cfg.durasiBatas || '08:00 WIB'}
              </span>
            </div>

            {/* Opsi Tanggal */}
            {cfg.showTanggalBatas && cfg.tanggalBatas && (
              <div
                style={{
                  fontSize: `${(fs.tanggalBatas || 10) * fontMultiplier}pt`,
                  fontWeight: '900',
                  color: blackColor,
                  letterSpacing: '0.04em',
                  marginTop: '1pt',
                  marginBottom: '1pt',
                }}
              >
                {cfg.tanggalBatas}
              </div>
            )}

            {/* Subteks Batas Aman / Catatan Tambahan */}
            {(cfg.showSubteksBatas ?? true) && cfg.subteksBatas && (
              <div
                style={{
                  fontSize: `${fs.subteksBatas * fontMultiplier}pt`,
                  fontWeight: '700',
                  color: blackColor,
                  lineHeight: 1.25,
                  maxWidth: '96%',
                  margin: '1.5pt auto 0 auto',
                }}
              >
                {cfg.subteksBatas}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            BADGE PETUNJUK KONSUMSI & LARANGAN BAWA PULANG (IKON + TEKS 2 BARIS)
        ═══════════════════════════════════════════════════════════════════════ */}
        {cfg.showBadges && (cfg.showBadgeSegera || cfg.showBadgeLarangan) && (
          <div
            style={{
              display: 'flex',
              flexDirection: cfg.badgeLayout === 'stacked' ? 'column' : 'row',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: '4pt',
              width: '100%',
              margin: '3pt 0 1pt 0',
            }}
          >
            {/* BADGE 1: IKON PIRING SENDOK GARPU + SEGERA KONSUMSI */}
            {cfg.showBadgeSegera && (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '3.5pt 2.5pt',
                  border: cfg.badgeBorder ? `1.4pt solid ${blackColor}` : 'none',
                  borderRadius: '2px',
                  background: '#ffffff',
                }}
              >
                {/* Gambar / Ikon Piring Sendok Garpu SVG Crisp */}
                <div
                  style={{
                    height: `${(fs.badgeIconSizeMm || 12)}mm`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2pt',
                  }}
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke={blackColor}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      height: `${(fs.badgeIconSizeMm || 12)}mm`,
                      width: 'auto',
                      maxHeight: `${(fs.badgeIconSizeMm || 12)}mm`,
                    }}
                  >
                    {/* Piring Bulat Luar & Dalam */}
                    <circle cx="24" cy="24" r="13.5" strokeWidth="2.2" />
                    <circle cx="24" cy="24" r="8.5" strokeWidth="1.3" />
                    {/* Garpu Kiri */}
                    <path d="M4.5 13v5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-5" strokeWidth="2" />
                    <path d="M6.5 13v7" strokeWidth="2" />
                    <path d="M6.5 20v15" strokeWidth="2.4" />
                    {/* Sendok Kanan */}
                    <path d="M41.5 13c-2.2 0-3.5 1.8-3.5 4.2 0 2.2 1.3 3.8 3.5 3.8s3.5-1.6 3.5-3.8c0-2.4-1.3-4.2-3.5-4.2z" strokeWidth="2" fill="none" />
                    <path d="M41.5 21v14" strokeWidth="2.4" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: `${(fs.badgeTeks || 10) * fontMultiplier}pt`,
                    fontWeight: '900',
                    color: blackColor,
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {cfg.judulBadgeSegera || 'SEGERA KONSUMSI'}
                </div>
                {cfg.subBadgeSegera && (
                  <div
                    style={{
                      fontSize: `${(fs.badgeSubteks || 8) * fontMultiplier}pt`,
                      fontWeight: '800',
                      color: blackColor,
                      lineHeight: 1.15,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginTop: '1.5pt',
                    }}
                  >
                    {cfg.subBadgeSegera}
                  </div>
                )}
              </div>
            )}

            {/* BADGE 2: IKON LARANGAN + TIDAK BOLEH DIBAWA PULANG */}
            {cfg.showBadgeLarangan && (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '3.5pt 2.5pt',
                  border: cfg.badgeBorder ? `1.4pt solid ${redColor}` : 'none',
                  borderRadius: '2px',
                  background: '#ffffff',
                }}
              >
                {/* Ikon Larangan Dibawa Pulang */}
                <div
                  style={{
                    height: `${(fs.badgeIconSizeMm || 12)}mm`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2pt',
                  }}
                >
                  <img
                    src={cfg.iconLaranganUrl || '/img/larangan_dibawa_pulang.png'}
                    alt="Larangan Dibawa Pulang"
                    crossOrigin="anonymous"
                    loading="eager"
                    style={{
                      height: `${(fs.badgeIconSizeMm || 12)}mm`,
                      maxHeight: `${(fs.badgeIconSizeMm || 12)}mm`,
                      width: 'auto',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: `${(fs.badgeTeks || 10) * fontMultiplier}pt`,
                    fontWeight: '900',
                    color: redColor,
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {cfg.judulBadgeLarangan || 'TIDAK BOLEH'}
                </div>
                {cfg.subBadgeLarangan && (
                  <div
                    style={{
                      fontSize: `${(fs.badgeSubteks || 8) * fontMultiplier}pt`,
                      fontWeight: '800',
                      color: redColor,
                      lineHeight: 1.15,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginTop: '1.5pt',
                    }}
                  >
                    {cfg.subBadgeLarangan}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Peringatan Larangan Bawa Pulang (Bar Teks Standar) */}
        {cfg.showPeringatan && cfg.teksPeringatan && (
          <div
            style={{
              color: redColor,
              textAlign: 'center',
              fontSize: `${fs.larangan * fontMultiplier}pt`,
              fontWeight: '900',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              marginTop: '3pt',
              width: '100%',
            }}
          >
            {cfg.teksPeringatan}
          </div>
        )}

        {/* Edukasi (Opsional) */}
        {cfg.showEdukasi && (
          <div
            style={{
              background: '#f8fafc',
              border: '0.8pt solid #cbd5e1',
              borderRadius: '3px',
              padding: '2.5pt 3pt',
              width: '100%',
              marginTop: '2pt',
            }}
          >
            <div
              style={{
                fontSize: `${fs.edukasi * fontMultiplier}pt`,
                fontWeight: '800',
                color: '#1e293b',
                textAlign: 'center',
                marginBottom: '2pt',
                borderBottom: '0.5pt solid #e2e8f0',
                paddingBottom: '1pt',
              }}
            >
              ❓ {cfg.judulEdukasi}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5pt' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5pt', fontSize: `${(fs.edukasi - 0.5) * fontMultiplier}pt`, lineHeight: 1.15 }}>
                <span>{cfg.edukasiIcon1}</span>
                <span style={{ fontWeight: '700', color: '#334155' }}>{cfg.edukasiItem1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5pt', fontSize: `${(fs.edukasi - 0.5) * fontMultiplier}pt`, lineHeight: 1.15 }}>
                <span>{cfg.edukasiIcon2}</span>
                <span style={{ fontWeight: '700', color: '#334155' }}>{cfg.edukasiItem2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5pt', fontSize: `${(fs.edukasi - 0.5) * fontMultiplier}pt`, lineHeight: 1.15 }}>
                <span>{cfg.edukasiIcon3}</span>
                <span style={{ fontWeight: '700', color: '#334155' }}>{cfg.edukasiItem3}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 🌟 PITA DEKORASI BGN BAWAH (DI ATAS FOOTER SOSMED) 🌟 */}
      {(patternPos === 'bottom' || patternPos === 'both') && renderDecorationRibbon('ribbon-bottom')}

      {/* ═══════════════════════════════════════════════════════════════════════
          5. FOOTER SOSIAL MEDIA (NO WRAP)
      ═══════════════════════════════════════════════════════════════════════ */}
      {cfg.showSosmed && (cfg.igHandle || cfg.fbHandle || cfg.tiktokHandle) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2pt',
            paddingTop: '2pt',
            paddingBottom: '1pt',
            width: '100%',
          }}
        >
          {cfg.igHandle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4pt',
                fontSize: `${fs.sosmed * fontMultiplier}pt`,
                fontWeight: '800',
                color: blackColor,
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>{cfg.igHandle}</span>
            </div>
          )}
          {cfg.fbHandle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4pt',
                fontSize: `${fs.sosmed * fontMultiplier}pt`,
                fontWeight: '800',
                color: blackColor,
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{cfg.fbHandle}</span>
            </div>
          )}
          {cfg.tiktokHandle && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4pt',
                fontSize: `${fs.sosmed * fontMultiplier}pt`,
                fontWeight: '800',
                color: blackColor,
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.83c0 1.93-.65 3.86-1.91 5.31-1.57 1.83-3.92 2.87-6.33 2.84-2.8-.02-5.4-1.44-6.86-3.83-1.68-2.65-1.51-6.19.43-8.66 1.82-2.37 4.8-3.62 7.78-3.23v4.19c-1.57-.31-3.26.15-4.27 1.34-1.04 1.17-1.18 2.92-.37 4.25.79 1.33 2.37 2.05 3.91 1.78 1.48-.22 2.67-1.4 2.86-2.89.07-.63.07-1.27.07-1.9V.02h.36z"/>
              </svg>
              <span>{cfg.tiktokHandle}</span>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

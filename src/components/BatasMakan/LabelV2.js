import React from 'react'

const formatGiziVal = (val, defaultUnit) => {
  if (!val || typeof val !== 'string' || !val.trim()) return ''
  const trimmed = val.trim()
  if (/[a-zA-Z]/.test(trimmed)) return trimmed
  return `${trimmed} ${defaultUnit}`
}

/**
 * LabelV2 - React Component untuk Render Label Versi 2 (Informasi Gizi & Fleksibel)
 */
export function LabelV2({ lbl = {}, id }) {
  const isBW = lbl.colorMode === 'bw'
  const hBgColor = isBW ? '#000000' : lbl.headerBgColor || '#16a34a'

  const cleanHbc = (hBgColor || '').toLowerCase().trim()
  const isHeaderWhite = cleanHbc === '#ffffff' || cleanHbc === '#fff' || cleanHbc === 'white'
  const headerTextColor = isHeaderWhite ? '#000000' : '#ffffff'

  const hdrText = (lbl.headerText || 'MBG - MENU HARI INI').trim()
  const hasHeader = Boolean(hdrText)

  const ftGizi = lbl.fontGizi || 6
  const ftHeader = lbl.fontHeader || 7
  const ftMenu = lbl.fontMenu || 6
  const ftPorsi = lbl.fontPorsi || 6
  const ftTanggal = lbl.fontTanggal || 6
  const ftJam = lbl.fontJam || 6
  const ftCatatan = lbl.fontCatatan || 5

  const hT = lbl.hdrPadT ?? 2
  const hR = lbl.hdrPadR ?? 0
  const hB = lbl.hdrPadB ?? 2
  const hL = lbl.hdrPadL ?? 0

  const dT = lbl.datePadT ?? 0
  const dR = lbl.datePadR ?? 0
  const dB = lbl.datePadB ?? 0
  const dL = lbl.datePadL ?? 0

  const gT = lbl.giziPadT ?? 0.5
  const gR = lbl.giziPadR ?? 0
  const gB = lbl.giziPadB ?? 0.5
  const gL = lbl.giziPadL ?? 0

  const mT = lbl.menuPadT ?? 2
  const mR = lbl.menuPadR ?? 1
  const mB = lbl.menuPadB ?? 2
  const mL = lbl.menuPadL ?? 1

  const nT = lbl.notePadT ?? 1
  const nR = lbl.notePadR ?? 0
  const nB = lbl.notePadB ?? 2
  const nL = lbl.notePadL ?? 0

  const bWidth = lbl.borderWidth ?? 2
  const dWidth = lbl.dividerWidth ?? 1

  const mnuVal = (lbl.namaMenu || '').trim()
  const prsVal = (lbl.porsiMenu || '').trim()
  const hasMenuPorsi = Boolean(mnuVal || prsVal)

  const catVal = (lbl.catatan || '').trim()
  const hasCatatan = Boolean(catVal)

  const sGiziIcon = lbl.showGiziIcons ?? true
  const sTimeIcon = lbl.showTimeIcon ?? true
  const sNoteIcon = lbl.showNoteIcon ?? true
  const hasWarningEmoji = catVal.includes('🚫') || catVal.includes('🛑') || catVal.includes('⚠️')
  const noteIconStr = sNoteIcon && !hasWarningEmoji ? '🚫 ' : ''

  const widthMm = lbl.widthMm || 60
  const heightMm = lbl.heightMm || 40

  const eg = formatGiziVal(lbl.energi, 'kkal')
  const pr = formatGiziVal(lbl.protein, 'g')
  const lm = formatGiziVal(lbl.lemak, 'g')
  const kb = formatGiziVal(lbl.karbohidrat, 'g')
  const sr = formatGiziVal(lbl.serat, 'g')

  const cleanJam = (lbl.jam || '').replace(/^(waktu\s*makan|jam)\s*:\s*/i, '').trim()
  const cleanTgl = (lbl.tanggal || '').replace(/^(tanggal|tgl)\s*:\s*/i, '').trim()

  const giziItems = [
    eg && { icon: sGiziIcon ? '⚡' : '', label: 'Energi', val: eg, fontPt: ftGizi },
    pr && { icon: sGiziIcon ? '🥩' : '', label: 'Protein', val: pr, fontPt: ftGizi },
    lm && { icon: sGiziIcon ? '🥑' : '', label: 'Lemak', val: lm, fontPt: ftGizi },
    kb && { icon: sGiziIcon ? '🌾' : '', label: 'Karbohidrat', val: kb, fontPt: ftGizi },
    sr && { icon: sGiziIcon ? '🥗' : '', label: 'Serat', val: sr, fontPt: ftGizi }
  ].filter(Boolean)

  const timeDateItems = [
    cleanJam && {
      icon: sTimeIcon ? '⏱️' : '',
      label: 'Waktu Makan',
      val: cleanJam,
      fontPt: ftJam,
      isBold: true
    },
    cleanTgl && { icon: '📅', label: 'Tanggal', val: cleanTgl, fontPt: ftTanggal }
  ].filter(Boolean)

  const noteBoxBg = isBW ? '#000000' : '#dc2626'

  return (
    <div
      id={id}
      className='label-box relative flex flex-col justify-between overflow-hidden rounded-[8px] bg-white text-slate-900 shadow-xs'
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        padding: '2px',
        border: `${bWidth}px solid #000000`,
        boxSizing: 'border-box'
      }}
    >
      {/* Header Pill */}
      {hasHeader && (
        <div
          className='shrink-0 rounded-t-[5px] rounded-b-[2px] text-center font-black uppercase shadow-xs'
          style={{
            fontSize: `${ftHeader}pt`,
            padding: `${hT}px ${hR}px ${hB}px ${hL}px`,
            backgroundColor: hBgColor,
            color: headerTextColor,
            borderBottom: isHeaderWhite ? `${dWidth}px solid #000000` : 'none'
          }}
        >
          {hdrText}
        </div>
      )}

      {/* Main Content Container */}
      <div className='my-auto flex flex-grow flex-col justify-center overflow-hidden text-center'>
        {/* Menu & Porsi */}
        {hasMenuPorsi && (
          <div
            className='text-center'
            style={{
              padding: `${mT}px ${mR}px ${mB}px ${mL}px`,
              borderBottom: `${dWidth}px solid #cbd5e1`
            }}
          >
            {Boolean(mnuVal) && Boolean(prsVal) ? (
              lbl.wrapMode === 'wrap' ? (
                <div className='leading-tight'>
                  <div
                    className='truncate font-extrabold tracking-wide text-slate-900 uppercase'
                    style={{ fontSize: `${ftMenu}pt` }}
                  >
                    {mnuVal.toUpperCase()}
                  </div>
                  <div
                    className='font-bold tracking-wide text-slate-600 uppercase'
                    style={{ fontSize: `${ftPorsi}pt` }}
                  >
                    {lbl.separator !== 'none' ? `${lbl.separator || '·'} ` : ''}
                    {prsVal.toUpperCase()}
                  </div>
                </div>
              ) : lbl.wrapMode === 'single' ? (
                <div
                  className='truncate font-bold tracking-wide text-slate-900 uppercase'
                  style={{ fontSize: `${ftMenu}pt` }}
                >
                  {mnuVal.toUpperCase()} {lbl.separator !== 'none' ? lbl.separator || '-' : ''}{' '}
                  {prsVal.toUpperCase()}
                </div>
              ) : (
                /* Auto Wrap mode */
                <div
                  className='leading-tight font-bold tracking-tight break-words text-slate-900 uppercase'
                  style={{ fontSize: `${ftMenu}pt` }}
                >
                  {mnuVal.toUpperCase()} {lbl.separator !== 'none' ? lbl.separator || '-' : ''}{' '}
                  {prsVal.toUpperCase()}
                </div>
              )
            ) : Boolean(mnuVal) ? (
              <div
                className='font-extrabold tracking-wide text-slate-900 uppercase'
                style={{ fontSize: `${ftMenu}pt` }}
              >
                {mnuVal.toUpperCase()}
              </div>
            ) : (
              <div
                className='font-bold tracking-wide text-slate-600 uppercase'
                style={{ fontSize: `${ftPorsi}pt` }}
              >
                {prsVal.toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Nutrition Analysis Grid */}
        {giziItems.length > 0 && (
          <div
            style={{
              paddingTop: `${gT}px`,
              paddingRight: `${gR}px`,
              paddingBottom: `${gB}px`,
              paddingLeft: `${gL}px`
            }}
          >
            <div
              className='mx-auto grid grid-cols-[auto_auto_1fr] items-center gap-x-1.5 gap-y-0.5 text-left leading-tight'
              style={{ fontSize: `${ftGizi}pt`, maxWidth: '98%' }}
            >
              {giziItems.map((item, i) => (
                <React.Fragment key={i}>
                  <div
                    className='truncate text-left font-semibold text-slate-700'
                    style={{ fontSize: `${item.fontPt || ftGizi}pt` }}
                  >
                    {item.icon ? `${item.icon} ` : ''}
                    {item.label}
                  </div>
                  <div
                    className='font-bold text-slate-900'
                    style={{ fontSize: `${item.fontPt || ftGizi}pt` }}
                  >
                    :
                  </div>
                  <div
                    className='truncate text-left font-extrabold text-slate-900'
                    style={{ fontSize: `${item.fontPt || ftGizi}pt` }}
                  >
                    {item.val}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Time & Date Grid - Section Divider Line Directly ABOVE Waktu Makan */}
        {timeDateItems.length > 0 && (
          <div
            style={{
              borderTop: `${dWidth}px solid #cbd5e1`,
              paddingTop: `${dT}px`,
              paddingRight: `${dR}px`,
              paddingBottom: `${dB}px`,
              paddingLeft: `${dL}px`
            }}
          >
            <div
              className='mx-auto grid grid-cols-[auto_auto_1fr] items-center gap-x-1.5 gap-y-0.5 text-left leading-tight'
              style={{ fontSize: `${ftJam}pt`, maxWidth: '98%' }}
            >
              {timeDateItems.map((item, i) => (
                <React.Fragment key={i}>
                  <div
                    className='truncate text-left font-semibold text-slate-700'
                    style={{ fontSize: `${item.fontPt || ftJam}pt` }}
                  >
                    {item.icon ? `${item.icon} ` : ''}
                    {item.label}
                  </div>
                  <div
                    className='font-bold text-slate-900'
                    style={{ fontSize: `${item.fontPt || ftJam}pt` }}
                  >
                    :
                  </div>
                  <div
                    className={`truncate text-left ${item.isBold ? 'font-black text-slate-950' : 'font-extrabold text-slate-900'}`}
                    style={{ fontSize: `${item.fontPt || ftJam}pt` }}
                  >
                    {item.val}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Warning Box (Icon 🚫 aligned left, Red Box for text on right) */}
      {hasCatatan && (
        <div
          className='shrink-0'
          style={{
            marginTop: `${nT}px`,
            paddingTop: `${nT}px`,
            paddingRight: `${nR}px`,
            paddingBottom: `${nB}px`,
            paddingLeft: `${nL}px`
          }}
        >
          <div
            className='mx-auto grid items-center gap-x-1.5 text-left leading-tight'
            style={{
              gridTemplateColumns: sNoteIcon ? 'auto 1fr' : '1fr',
              maxWidth: '98%'
            }}
          >
            {sNoteIcon && (
              <div
                className='shrink-0 text-left font-bold text-slate-900'
                style={{ fontSize: `${ftCatatan}pt` }}
              >
                🚫
              </div>
            )}
            <div
              className='rounded-[3px] text-left font-black uppercase shadow-xs'
              style={{
                backgroundColor: noteBoxBg,
                color: '#ffffff',
                padding: '1.5px 3.5px'
              }}
            >
              <div
                className='text-left leading-tight font-black tracking-tight whitespace-pre-line uppercase'
                style={{ fontSize: `${ftCatatan}pt`, color: '#ffffff' }}
              >
                {catVal.replace(/^🚫\s*/, '').toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Generator HTML String untuk Cetak Polos Window (Label V2)
 */
export function renderLabelV2Html(lbl) {
  const isBW = lbl.colorMode === 'bw'
  const hBgColor = isBW ? '#000000' : lbl.headerBgColor || '#16a34a'

  const cleanHbc = (hBgColor || '').toLowerCase().trim()
  const isHeaderWhite = cleanHbc === '#ffffff' || cleanHbc === '#fff' || cleanHbc === 'white'
  const headerTextColor = isHeaderWhite ? '#000000' : '#ffffff'
  const bWidth = lbl.borderWidth ?? 2
  const dWidth = lbl.dividerWidth ?? 1

  const headerBg = `background: ${hBgColor}; color: ${headerTextColor};${isHeaderWhite ? ` border-bottom: ${dWidth}px solid #000000;` : ''}`
  const noteBoxBg = isBW ? '#000000' : '#dc2626'

  const hdrText = (lbl.headerText || 'MBG - MENU HARI INI').trim()
  const hasHeader = Boolean(hdrText)

  const ftGizi = lbl.fontGizi || 6
  const ftHeader = lbl.fontHeader || 7
  const ftMenu = lbl.fontMenu || 6
  const ftPorsi = lbl.fontPorsi || 6
  const ftTanggal = lbl.fontTanggal || 6
  const ftJam = lbl.fontJam || 6
  const ftCatatan = lbl.fontCatatan || 5

  const hT = lbl.hdrPadT ?? 2
  const hR = lbl.hdrPadR ?? 0
  const hB = lbl.hdrPadB ?? 2
  const hL = lbl.hdrPadL ?? 0

  const dT = lbl.datePadT ?? 0
  const dR = lbl.datePadR ?? 0
  const dB = lbl.datePadB ?? 0
  const dL = lbl.datePadL ?? 0

  const gT = lbl.giziPadT ?? 0.5
  const gR = lbl.giziPadR ?? 0
  const gB = lbl.giziPadB ?? 0.5
  const gL = lbl.giziPadL ?? 0

  const mT = lbl.menuPadT ?? 2
  const mR = lbl.menuPadR ?? 1
  const mB = lbl.menuPadB ?? 2
  const mL = lbl.menuPadL ?? 1

  const nT = lbl.notePadT ?? 1
  const nR = lbl.notePadR ?? 0
  const nB = lbl.notePadB ?? 2
  const nL = lbl.notePadL ?? 0

  const mnuVal = (lbl.namaMenu || '').trim()
  const prsVal = (lbl.porsiMenu || '').trim()
  const hasMenuPorsi = Boolean(mnuVal || prsVal)

  const catVal = (lbl.catatan || '').trim()
  const hasCatatan = Boolean(catVal)

  const sGiziIcon = lbl.showGiziIcons ?? true
  const sTimeIcon = lbl.showTimeIcon ?? true
  const sNoteIcon = lbl.showNoteIcon ?? true
  const hasWarningEmoji = catVal.includes('🚫') || catVal.includes('🛑') || catVal.includes('⚠️')
  const noteIconStr = sNoteIcon && !hasWarningEmoji ? '🚫 ' : ''

  const widthMm = lbl.widthMm || 60
  const heightMm = lbl.heightMm || 40

  let menuPorsiContent = ''
  if (hasMenuPorsi) {
    if (mnuVal && prsVal) {
      if (lbl.wrapMode === 'wrap') {
        menuPorsiContent = `
          <div style="line-height:1.1;">
            <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#000;">${mnuVal}</div>
            <div style="font-size:${ftPorsi}pt; font-weight:700; text-transform:uppercase; color:#1e293b;">${lbl.separator !== 'none' ? (lbl.separator || '-') + ' ' : ''}${prsVal}</div>
          </div>
        `
      } else if (lbl.wrapMode === 'single') {
        menuPorsiContent = `
          <div style="font-size:${ftMenu}pt; font-weight:700; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#000;">
            ${mnuVal} ${lbl.separator !== 'none' ? lbl.separator || '-' : ''} ${prsVal}
          </div>
        `
      } else {
        menuPorsiContent = `
          <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; word-break:break-word; line-height:1.1; color:#000;">
            ${mnuVal} ${lbl.separator !== 'none' ? lbl.separator || '-' : ''} ${prsVal}
          </div>
        `
      }
    } else if (mnuVal) {
      menuPorsiContent = `<div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; color:#000;">${mnuVal}</div>`
    } else {
      menuPorsiContent = `<div style="font-size:${ftPorsi}pt; font-weight:700; text-transform:uppercase; color:#000;">${prsVal}</div>`
    }
  }

  const eg = formatGiziVal(lbl.energi, 'kkal')
  const pr = formatGiziVal(lbl.protein, 'g')
  const lm = formatGiziVal(lbl.lemak, 'g')
  const kb = formatGiziVal(lbl.karbohidrat, 'g')
  const sr = formatGiziVal(lbl.serat, 'g')

  const cleanJam = (lbl.jam || '').replace(/^(waktu\s*makan|jam)\s*:\s*/i, '').trim()
  const cleanTgl = (lbl.tanggal || '').replace(/^(tanggal|tgl)\s*:\s*/i, '').trim()

  const giziItems = [
    eg && { icon: sGiziIcon ? '⚡' : '', label: 'Energi', val: eg, fontPt: ftGizi },
    pr && { icon: sGiziIcon ? '🥩' : '', label: 'Protein', val: pr, fontPt: ftGizi },
    lm && { icon: sGiziIcon ? '🥑' : '', label: 'Lemak', val: lm, fontPt: ftGizi },
    kb && { icon: sGiziIcon ? '🌾' : '', label: 'Karbohidrat', val: kb, fontPt: ftGizi },
    sr && { icon: sGiziIcon ? '🥗' : '', label: 'Serat', val: sr, fontPt: ftGizi }
  ].filter(Boolean)

  const timeDateItems = [
    cleanJam && {
      icon: sTimeIcon ? '⏱️' : '',
      label: 'Waktu Makan',
      val: cleanJam,
      fontPt: ftJam,
      isBold: true
    },
    cleanTgl && { icon: '📅', label: 'Tanggal', val: cleanTgl, fontPt: ftTanggal }
  ].filter(Boolean)

  const headerHtml = hasHeader
    ? `<div style="${headerBg} text-align:center; font-weight:900; border-top-left-radius:5px; border-top-right-radius:5px; border-bottom-left-radius:2px; border-bottom-right-radius:2px; padding:${hT}px ${hR}px ${hB}px ${hL}px; font-size:${ftHeader}pt; letter-spacing:0.3px; flex-shrink:0;">${hdrText}</div>`
    : ''

  const menuPorsiHtml = hasMenuPorsi
    ? `
      <div style="border-bottom:${dWidth}px solid #cbd5e1; padding:${mT}px ${mR}px ${mB}px ${mL}px; text-align:center;">
        ${menuPorsiContent}
      </div>
    `
    : ''

  const giziGridHtml =
    giziItems.length > 0
      ? `
      <div style="padding:${gT}px ${gR}px ${gB}px ${gL}px;">
        <div style="display:grid; grid-template-columns:auto auto 1fr; gap:0px 6px; font-size:${ftGizi}pt; line-height:1.15; text-align:left; max-width:98%; margin:0 auto;">
          ${giziItems
            .map(
              (item) => `
            <div style="white-space:nowrap; font-weight:600; color:#334155; font-size:${item.fontPt || ftGizi}pt;">${item.icon ? item.icon + ' ' : ''}${item.label}</div>
            <div style="font-weight:700; color:#000000; font-size:${item.fontPt || ftGizi}pt;">:</div>
            <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:800; color:#000000; font-size:${item.fontPt || ftGizi}pt;">${item.val}</div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      : ''

  const timeDateGridHtml =
    timeDateItems.length > 0
      ? `
      <div style="border-top:${dWidth}px solid #cbd5e1; padding:${dT}px ${dR}px ${dB}px ${dL}px;">
        <div style="display:grid; grid-template-columns:auto auto 1fr; gap:0px 6px; font-size:${ftJam}pt; line-height:1.15; text-align:left; max-width:98%; margin:0 auto;">
          ${timeDateItems
            .map(
              (item) => `
            <div style="white-space:nowrap; font-weight:600; color:#334155; font-size:${item.fontPt || ftJam}pt;">${item.icon ? item.icon + ' ' : ''}${item.label}</div>
            <div style="font-weight:700; color:#000000; font-size:${item.fontPt || ftJam}pt;">:</div>
            <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:${item.isBold ? '900' : '800'}; color:#000000; font-size:${item.fontPt || ftJam}pt;">${item.val}</div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      : ''

  const noteHtml = hasCatatan
    ? `
      <div style="margin-top:${nT}px; padding:${nT}px ${nR}px ${nB}px ${nL}px; flex-shrink:0;">
        <div style="display:grid; grid-template-columns:${sNoteIcon ? 'auto 1fr' : '1fr'}; gap:0px 6px; align-items:center; max-width:98%; margin:0 auto; text-align:left;">
          ${sNoteIcon ? `<div style="font-weight:700; color:#000000; font-size:${ftCatatan}pt; text-align:left;">🚫</div>` : ''}
          <div style="background:${noteBoxBg}; color:#ffffff; border-radius:3px; padding:1.5px 3.5px; text-align:left;">
            <div style="font-size:${ftCatatan}pt; font-weight:900; color:#ffffff; text-transform:uppercase; line-height:1.1; white-space:pre-line; text-align:left;">
              ${catVal.replace(/^🚫\s*/, '').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    `
    : ''

  return `
    <div class="label-card" style="width:${widthMm}mm; height:${heightMm}mm; border:${bWidth}px solid #000000; border-radius:8px; background:#ffffff; color:#000000; box-sizing:border-box; padding:2px; display:flex; flex-direction:column; justify-content:space-between; page-break-inside:avoid; break-inside:avoid; margin:0; overflow:hidden;">
      ${headerHtml}
      <div style="text-align:center; margin:auto 0; flex-grow:1; display:flex; flex-direction:column; justify-content:center; overflow:hidden;">
        ${menuPorsiHtml}
        ${giziGridHtml}
        ${timeDateGridHtml}
      </div>
      ${noteHtml}
    </div>
  `
}

export default LabelV2

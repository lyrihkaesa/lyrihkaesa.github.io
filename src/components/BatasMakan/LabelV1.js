import React from 'react'

/**
 * LabelV1 - React Component untuk Render Label Versi 1 (Standar BGN)
 */
export function LabelV1({ lbl = {}, id }) {
  const isBW = lbl.colorMode === 'bw'
  const hBgColor = isBW ? '#000000' : (lbl.headerBgColor || '#16a34a')
  const noteColorClass = isBW ? 'text-black' : 'text-red-600'

  const hdrText = (lbl.headerText || 'BATAS MAKAN').trim()
  const hasHeader = Boolean(hdrText)

  const ftHeader = lbl.fontHeader || 10
  const ftTanggal = lbl.fontTanggal || 13
  const ftJam = lbl.fontJam || 14
  const ftMenu = lbl.fontMenu || 8.5
  const ftPorsi = lbl.fontPorsi || 8
  const ftCatatan = lbl.fontCatatan || 7.5

  const hT = lbl.hdrPadT ?? 2
  const hR = lbl.hdrPadR ?? 0
  const hB = lbl.hdrPadB ?? 2
  const hL = lbl.hdrPadL ?? 0

  const dT = lbl.datePadT ?? 1
  const dR = lbl.datePadR ?? 0
  const dB = lbl.datePadB ?? 1
  const dL = lbl.datePadL ?? 0

  const mT = lbl.menuPadT ?? 2
  const mR = lbl.menuPadR ?? 1
  const mB = lbl.menuPadB ?? 2
  const mL = lbl.menuPadL ?? 1

  const nT = lbl.notePadT ?? 3
  const nR = lbl.notePadR ?? 0
  const nB = lbl.notePadB ?? 2
  const nL = lbl.notePadL ?? 0

  const bWidth = lbl.borderWidth ?? 2
  const dWidth = lbl.dividerWidth ?? 1

  const tglVal = (lbl.tanggal || '').trim()
  const jamVal = (lbl.jam || '').trim()
  const hasDate = Boolean(tglVal || jamVal)

  const mnuVal = (lbl.namaMenu || '').trim()
  const prsVal = (lbl.porsiMenu || '').trim()
  const hasMenuPorsi = Boolean(mnuVal || prsVal)

  const catVal = (lbl.catatan || '').trim()
  const hasCatatan = Boolean(catVal)

  const sTimeIcon = lbl.showTimeIcon ?? false
  const sNoteIcon = lbl.showNoteIcon ?? false
  const hasWarningEmoji = catVal.includes('🚫') || catVal.includes('🛑') || catVal.includes('⚠️')
  const noteIconStr = sNoteIcon && !hasWarningEmoji ? '🚫 ' : ''

  const widthMm = lbl.widthMm || 60
  const heightMm = lbl.heightMm || 40

  return (
    <div
      id={id}
      className='label-box relative flex flex-col justify-between overflow-hidden rounded-[9px] bg-white text-slate-900 shadow-xs'
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        padding: '2.5px',
        border: `${bWidth}px solid #000000`,
        boxSizing: 'border-box'
      }}
    >
      {/* Header Pill */}
      {hasHeader && (
        <div
          className='shrink-0 rounded-t-[6px] rounded-b-[2px] text-center font-black uppercase text-white shadow-xs'
          style={{
            fontSize: `${ftHeader}pt`,
            padding: `${hT}px ${hR}px ${hB}px ${hL}px`,
            backgroundColor: hBgColor
          }}
        >
          {hdrText}
        </div>
      )}

      {/* Main Content Container */}
      <div
        className='my-auto flex flex-grow flex-col justify-center overflow-hidden text-center'
        style={{ padding: `${dT}px ${dR}px ${dB}px ${dL}px` }}
      >
        {/* Date & Time */}
        {hasDate && (
          <div>
            {Boolean(tglVal) && (
              <div
                className='leading-none font-extrabold tracking-tight text-slate-950'
                style={{ fontSize: `${ftTanggal}pt` }}
              >
                {tglVal}
              </div>
            )}
            {Boolean(jamVal) && (
              <div
                className='mt-0.5 leading-none font-black tracking-tight text-slate-950'
                style={{ fontSize: `${ftJam}pt` }}
              >
                {sTimeIcon ? '⏱️ ' : ''}
                {jamVal}
              </div>
            )}
          </div>
        )}

        {/* Menu & Porsi */}
        {hasMenuPorsi && (
          <div
            className='px-1 text-center'
            style={{
              marginTop: `${mT}px`,
              padding: `${mT}px ${mR}px ${mB}px ${mL}px`,
              borderTop: `${dWidth}px solid #cbd5e1`
            }}
          >
            {Boolean(mnuVal) && Boolean(prsVal) ? (
              lbl.wrapMode === 'wrap' ? (
                <div className='leading-tight'>
                  <div
                    className='leading-tight font-extrabold tracking-tight break-words text-slate-900 uppercase'
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
                  className='truncate font-bold tracking-wide text-slate-600 uppercase'
                  style={{ fontSize: `${ftMenu}pt` }}
                >
                  {mnuVal.toUpperCase()} {lbl.separator !== 'none' ? lbl.separator || '·' : ''}{' '}
                  {prsVal.toUpperCase()}
                </div>
              ) : (
                /* Auto Wrap mode */
                <div
                  className='leading-tight font-bold tracking-tight break-words text-slate-700 uppercase'
                  style={{ fontSize: `${ftMenu}pt` }}
                >
                  {mnuVal.toUpperCase()} {lbl.separator !== 'none' ? lbl.separator || '·' : ''}{' '}
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
      </div>

      {/* Footer Warning */}
      {hasCatatan && (
        <div
          className='shrink-0 text-center'
          style={{
            marginTop: `${nT}px`,
            padding: `${nT}px ${nR}px ${nB}px ${nL}px`,
            borderTop: `${dWidth}px solid ${isBW ? '#000000' : '#fca5a5'}`
          }}
        >
          <div
            className={`leading-tight font-black tracking-tight uppercase whitespace-pre-line ${noteColorClass}`}
            style={{ fontSize: `${ftCatatan}pt` }}
          >
            {noteIconStr}
            {catVal.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Generator HTML String untuk Cetak Polos Window (Label V1)
 */
export function renderLabelV1Html(lbl) {
  const isBW = lbl.colorMode === 'bw'
  const hBgColor = isBW ? '#000000' : (lbl.headerBgColor || '#16a34a')
  const headerBg = `background: ${hBgColor}; color: #ffffff;`
  const noteColor = isBW ? 'color: #000000;' : 'color: #dc2626;'

  const hdrText = (lbl.headerText || 'BATAS MAKAN').trim()
  const hasHeader = Boolean(hdrText)

  const ftHeader = lbl.fontHeader || 10
  const ftTanggal = lbl.fontTanggal || 13
  const ftJam = lbl.fontJam || 14
  const ftMenu = lbl.fontMenu || 8.5
  const ftPorsi = lbl.fontPorsi || 8
  const ftCatatan = lbl.fontCatatan || 7.5

  const hT = lbl.hdrPadT ?? 2
  const hR = lbl.hdrPadR ?? 0
  const hB = lbl.hdrPadB ?? 2
  const hL = lbl.hdrPadL ?? 0

  const dT = lbl.datePadT ?? 1
  const dR = lbl.datePadR ?? 0
  const dB = lbl.datePadB ?? 1
  const dL = lbl.datePadL ?? 0

  const mT = lbl.menuPadT ?? 2
  const mR = lbl.menuPadR ?? 1
  const mB = lbl.menuPadB ?? 2
  const mL = lbl.menuPadL ?? 1

  const nT = lbl.notePadT ?? 3
  const nR = lbl.notePadR ?? 0
  const nB = lbl.notePadB ?? 2
  const nL = lbl.notePadL ?? 0

  const bWidth = lbl.borderWidth ?? 2
  const dWidth = lbl.dividerWidth ?? 1

  const tglVal = (lbl.tanggal || '').trim()
  const jamVal = (lbl.jam || '').trim()
  const hasDate = Boolean(tglVal || jamVal)

  const mnuVal = (lbl.namaMenu || '').trim()
  const prsVal = (lbl.porsiMenu || '').trim()
  const hasMenuPorsi = Boolean(mnuVal || prsVal)

  const catVal = (lbl.catatan || '').trim()
  const hasCatatan = Boolean(catVal)

  const sTimeIcon = lbl.showTimeIcon ?? false
  const sNoteIcon = lbl.showNoteIcon ?? false
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
            <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; word-break:break-word; line-height:1.1; color:#000;">${mnuVal}</div>
            <div style="font-size:${ftPorsi}pt; font-weight:700; text-transform:uppercase; color:#1e293b;">${lbl.separator !== 'none' ? (lbl.separator || '·') + ' ' : ''}${prsVal}</div>
          </div>
        `
      } else if (lbl.wrapMode === 'single') {
        menuPorsiContent = `
          <div style="font-size:${ftMenu}pt; font-weight:700; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#000;">
            ${mnuVal} ${lbl.separator !== 'none' ? lbl.separator || '·' : ''} ${prsVal}
          </div>
        `
      } else {
        menuPorsiContent = `
          <div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; word-break:break-word; line-height:1.1; color:#000;">
            ${mnuVal} ${lbl.separator !== 'none' ? lbl.separator || '·' : ''} ${prsVal}
          </div>
        `
      }
    } else if (mnuVal) {
      menuPorsiContent = `<div style="font-size:${ftMenu}pt; font-weight:800; text-transform:uppercase; color:#000;">${mnuVal}</div>`
    } else {
      menuPorsiContent = `<div style="font-size:${ftPorsi}pt; font-weight:700; text-transform:uppercase; color:#000;">${prsVal}</div>`
    }
  }

  const headerHtml = hasHeader
    ? `<div style="${headerBg} text-align:center; font-weight:900; border-top-left-radius:6px; border-top-right-radius:6px; border-bottom-left-radius:2px; border-bottom-right-radius:2px; padding:${hT}px ${hR}px ${hB}px ${hL}px; font-size:${ftHeader}pt; letter-spacing:0.5px; flex-shrink:0;">${hdrText}</div>`
    : ''

  const timeIconStr = sTimeIcon ? '⏱️ ' : ''
  const dateHtml = hasDate
    ? `
      <div style="text-align:center; padding:${dT}px ${dR}px ${dB}px ${dL}px;">
        ${tglVal ? `<div style="font-size:${ftTanggal}pt; font-weight:800; line-height:1; color:#000000;">${tglVal}</div>` : ''}
        ${jamVal ? `<div style="font-size:${ftJam}pt; font-weight:900; line-height:1; color:#000000; margin-top:${tglVal ? '1px' : '0'};">${timeIconStr}${jamVal}</div>` : ''}
      </div>
    `
    : ''

  const menuPorsiHtml = hasMenuPorsi
    ? `
      <div style="border-top:${dWidth}px solid #cbd5e1; margin-top:${mT}px; padding:${mT}px ${mR}px ${mB}px ${mL}px; text-align:center;">
        ${menuPorsiContent}
      </div>
    `
    : ''

  const noteHtml = hasCatatan
    ? `
      <div style="border-top:${dWidth}px solid ${isBW ? '#000000' : '#fca5a5'}; padding:${nT}px ${nR}px ${nB}px ${nL}px; text-align:center; flex-shrink:0;">
        <div style="font-size:${ftCatatan}pt; font-weight:900; ${noteColor} text-transform:uppercase; line-height:1.1; white-space:pre-line;">
          ${noteIconStr}${catVal}
        </div>
      </div>
    `
    : ''

  return `
    <div class="label-card" style="width:${widthMm}mm; height:${heightMm}mm; border:${bWidth}px solid #000000; border-radius:9px; background:#ffffff; color:#000000; box-sizing:border-box; padding:2.5px; display:flex; flex-direction:column; justify-content:space-between; page-break-inside:avoid; break-inside:avoid; margin:0; overflow:hidden;">
      ${headerHtml}
      <div style="text-align:center; margin:auto 0; flex-grow:1; display:flex; flex-direction:column; justify-content:center; overflow:hidden;">
        ${dateHtml}
        ${menuPorsiHtml}
      </div>
      ${noteHtml}
    </div>
  `
}

export default LabelV1

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp'
import { MdEmail } from '@react-icons/all-files/md/MdEmail'

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const pad2 = (value) => String(value).padStart(2, '0')

function formatTanggalLabel(cfg) {
  const raw = cfg.tanggalKonsumsi || ''
  const match = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return raw

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  if (Number.isNaN(date.getTime())) return raw

  const day = pad2(date.getDate())
  const month = pad2(date.getMonth() + 1)
  const year = date.getFullYear()

  switch (cfg.tanggalFormat) {
    case 'full':
      return `${DAYS[date.getDay()]}, ${day} ${MONTHS[date.getMonth()]} ${year}`
    case 'short':
      return `${day} ${SHORT_MONTHS[date.getMonth()]} ${year}`
    case 'dmy-dash':
      return `${day}-${month}-${year}`
    case 'dmy-slash':
      return `${day}/${month}/${year}`
    default:
      return `${date.getDate()} ${MONTHS[date.getMonth()]} ${year}`
  }
}

function fitTextBox(box, items) {
  if (!box) return

  items.forEach(({ ref, base }) => {
    if (ref.current) ref.current.style.fontSize = `${base}pt`
  })

  for (let pass = 0; pass < 60; pass += 1) {
    if (box.scrollHeight <= box.clientHeight + 1 && box.scrollWidth <= box.clientWidth + 1) break

    let changed = false
    items.forEach(({ ref, min, step = 0.2 }) => {
      if (!ref.current) return
      const current = Number.parseFloat(ref.current.style.fontSize)
      if (current > min) {
        ref.current.style.fontSize = `${Math.max(min, current - step).toFixed(1)}pt`
        changed = true
      }
    })

    if (!changed) break
  }
}

export function LabelTerpadu({
  cfg = {},
  isBW = false,
  showCropMarks = false,
  id,
  className = '',
  style = {},
}) {
  const primaryColor = isBW ? '#000000' : cfg.primaryColor || '#0b2545'
  const secondaryText = isBW ? '#000000' : '#26364a'
  const softBackground = isBW ? '#ffffff' : '#f4f7fa'
  const fontFamily = cfg.fontFamily || "Verdana, Geneva, 'DejaVu Sans', sans-serif"
  const nameRef = React.useRef(null)
  const addressRef = React.useRef(null)
  const identityRef = React.useRef(null)
  const timeRef = React.useRef(null)
  const timeBoxRef = React.useRef(null)
  const dateRef = React.useRef(null)
  const complaintBoxRef = React.useRef(null)
  const whatsappRef = React.useRef(null)
  const emailRef = React.useRef(null)

  const name = (cfg.namaSppg || 'SPPG JAKARTA PUSAT 1').toUpperCase()
  const address = cfg.alamatSppg || 'Jl. Kramat Raya No. 123, Jakarta Pusat'
  const time = cfg.jamKonsumsi || '11:00 WIB'
  const date = formatTanggalLabel(cfg)
  const qrValue = cfg.qrMenuUrl || 'https://bgn.go.id'
  const showComplaint = cfg.showPengaduan ?? true
  const complaintWhatsapp = cfg.pengaduanWa || '0811-1020-0157'
  const complaintEmail = cfg.pengaduanEmail || 'pengaduan@bgn.go.id'

  const nameSize = Number(cfg.fsNamaSppg) || 7
  const addressSize = Number(cfg.fsAlamatSppg) || 3.5
  const timeSize = Number(cfg.fsJam) || 16
  const dateSize = Number(cfg.fsTanggal) || 4.3
  const complaintSize = Number(cfg.fsPengaduan) || 3.2

  React.useEffect(() => {
    fitTextBox(identityRef.current, [
      { ref: nameRef, base: nameSize, min: 4.8, step: 0.2 },
      { ref: addressRef, base: addressSize, min: 2.7, step: 0.1 },
    ])
  }, [name, address, nameSize, addressSize])

  React.useEffect(() => {
    if (cfg.waktuMode === 'blank') return
    fitTextBox(timeBoxRef.current, [
      { ref: timeRef, base: timeSize, min: 10, step: 0.4 },
      { ref: dateRef, base: dateSize, min: 3.2, step: 0.1 },
    ])
  }, [time, date, timeSize, dateSize, cfg.showTanggal, cfg.waktuMode])

  React.useEffect(() => {
    if (!showComplaint) return
    fitTextBox(complaintBoxRef.current, [
      { ref: whatsappRef, base: complaintSize, min: 2.5, step: 0.1 },
      { ref: emailRef, base: complaintSize, min: 2.5, step: 0.1 },
    ])
  }, [complaintWhatsapp, complaintEmail, complaintSize, showComplaint])

  const warningStyle = {
    minHeight: 0,
    display: 'grid',
    gridTemplateColumns: '7.2mm minmax(0, 1fr)',
    alignItems: 'center',
    gap: '1mm',
    padding: '0.55mm 1mm',
    border: `0.8pt solid ${primaryColor}`,
    borderRadius: '1.5mm',
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  }

  const warningTextStyle = {
    margin: 0,
    color: primaryColor,
    fontSize: `${Number(cfg.fsPeringatan) || 5.3}pt`,
    fontWeight: 900,
    lineHeight: 1.08,
    letterSpacing: '0.015em',
    textTransform: 'uppercase',
  }

  return (
    <div
      id={id}
      className={`label-ompreng-v3 ${className}`}
      style={{
        width: '70mm',
        height: '50mm',
        minWidth: '70mm',
        minHeight: '50mm',
        maxWidth: '70mm',
        maxHeight: '50mm',
        padding: '1.3mm',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1mm',
        color: secondaryText,
        backgroundColor: '#ffffff',
        border: showCropMarks ? '0.5pt dashed #64748b' : 'none',
        fontFamily,
        userSelect: 'none',
        ...style,
      }}
    >
      <header
        style={{
          height: '10.4mm',
          minHeight: '10.4mm',
          display: 'grid',
          gridTemplateColumns: '8.7mm minmax(0, 1fr)',
          alignItems: 'center',
          gap: '1.2mm',
          paddingBottom: '0.8mm',
          borderBottom: `1pt solid ${primaryColor}`,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <img
          src={cfg.logoUrl || '/img/logo-bgn.png'}
          alt="Logo BGN"
          crossOrigin="anonymous"
          style={{
            width: '8.2mm',
            height: '8.2mm',
            objectFit: 'contain',
            filter: isBW ? 'grayscale(100%) contrast(150%)' : 'none',
          }}
        />
        <div
          ref={identityRef}
          style={{
            minWidth: 0,
            maxHeight: '9.2mm',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            ref={nameRef}
            style={{
              color: primaryColor,
              fontSize: `${nameSize}pt`,
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '0.015em',
              overflowWrap: 'anywhere',
            }}
          >
            {name}
          </div>
          <div
            ref={addressRef}
            style={{
              marginTop: '0.4mm',
              color: secondaryText,
              fontSize: `${addressSize}pt`,
              fontWeight: 600,
              lineHeight: 1.12,
              overflowWrap: 'anywhere',
              whiteSpace: 'pre-line',
            }}
          >
            {address}
          </div>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 22.5mm',
          gap: '1mm',
        }}
      >
        <div
          style={{
            minWidth: 0,
            minHeight: 0,
            display: 'grid',
            gridTemplateRows: '15.6mm minmax(0, 1fr) minmax(0, 1fr)',
            gap: '0.7mm',
          }}
        >
          <section
            style={{
              minHeight: 0,
              border: `1.2pt solid ${primaryColor}`,
              borderRadius: '1.5mm',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateRows: '5.2mm minmax(0, 1fr)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4mm 1mm',
                color: '#ffffff',
                backgroundColor: primaryColor,
                textAlign: 'center',
                fontSize: `${Number(cfg.fsBatasAman) || 5.8}pt`,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '0.025em',
                textTransform: 'uppercase',
              }}
            >
              Harus Dikonsumsi Sebelum Pukul
            </div>
            <div
              ref={timeBoxRef}
              style={{
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4mm 1mm',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                textAlign: 'center',
              }}
            >
              {cfg.waktuMode === 'blank' ? (
                <div
                  style={{
                    width: '85%',
                    height: '0.5pt',
                    marginTop: '3mm',
                    borderBottom: `0.8pt dashed ${primaryColor}`,
                  }}
                />
              ) : (
                <>
                  <div
                    ref={timeRef}
                    style={{
                      width: '100%',
                      color: primaryColor,
                      fontFamily: "'Courier New', ui-monospace, monospace",
                      fontSize: `${timeSize}pt`,
                      fontWeight: 900,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '-0.035em',
                      lineHeight: 0.92,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {time}
                  </div>
                  {cfg.showTanggal && (
                    <div
                      ref={dateRef}
                      style={{
                        width: '100%',
                        marginTop: '0.4mm',
                        color: secondaryText,
                        fontSize: `${dateSize}pt`,
                        fontWeight: 700,
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {date}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <section style={warningStyle}>
            <img
              src="/img/larangan_bawa_pulang.png"
              alt="Simbol tidak boleh dibawa pulang"
              crossOrigin="anonymous"
              style={{
                width: '6.8mm',
                height: '6.8mm',
                objectFit: 'contain',
                filter: isBW ? 'grayscale(100%) contrast(140%)' : 'none',
              }}
            />
            <p style={warningTextStyle}>Tidak Boleh Dibawa Pulang</p>
          </section>

          <section style={warningStyle}>
            <img
              src="/img/sendok_garpu.png"
              alt="Simbol segera konsumsi"
              crossOrigin="anonymous"
              style={{
                width: '6.8mm',
                height: '6.8mm',
                objectFit: 'contain',
                filter: isBW ? 'grayscale(100%) contrast(140%)' : 'none',
              }}
            />
            <p style={warningTextStyle}>Segera Konsumsi Setelah Diterima</p>
          </section>
        </div>

        <aside
          style={{
            minWidth: 0,
            minHeight: 0,
            padding: '0.8mm',
            border: `1.2pt solid ${primaryColor}`,
            borderRadius: '1.5mm',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: showComplaint ? 'flex-start' : 'center',
            gap: '0.5mm',
            backgroundColor: softBackground,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: primaryColor,
              fontSize: `${Number(cfg.fsQrJudul) || 5}pt`,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '0.015em',
              textTransform: 'uppercase',
            }}
          >
            {cfg.qrMenuText || 'Menu & Analisis Gizi'}
          </div>

          <div
            style={{
              width: showComplaint ? '16.2mm' : '20.5mm',
              height: showComplaint ? '16.2mm' : '20.5mm',
              padding: '0.7mm',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
              border: `0.7pt solid ${primaryColor}`,
            }}
          >
            <QRCodeSVG
              value={qrValue}
              size={120}
              level="M"
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#000000"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          <div
            style={{
              color: secondaryText,
              fontSize: `${Number(cfg.fsQrSub) || 3.2}pt`,
              fontWeight: 700,
              lineHeight: 1.12,
              overflowWrap: 'anywhere',
            }}
          >
            {cfg.qrMenuSub || 'Pindai barcode untuk rincian menu dan gizi'}
          </div>

          {showComplaint && (
            <div
              ref={complaintBoxRef}
              style={{
                width: '100%',
                height: '7.2mm',
                minHeight: '7.2mm',
                marginTop: 'auto',
                padding: '0.55mm 0.7mm',
                borderTop: `0.8pt solid ${primaryColor}`,
                boxSizing: 'border-box',
                overflow: 'hidden',
                color: secondaryText,
                backgroundColor: '#ffffff',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  marginBottom: '0.25mm',
                  color: primaryColor,
                  fontSize: '3.2pt',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Kontak Pengaduan
              </div>
              <div
                ref={whatsappRef}
                aria-label={`WhatsApp ${complaintWhatsapp}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.8mm minmax(0, 1fr)',
                  alignItems: 'center',
                  gap: '0.45mm',
                  fontSize: `${complaintSize}pt`,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  whiteSpace: 'nowrap',
                }}
              >
                <FaWhatsapp
                  aria-hidden="true"
                  style={{ width: '2.35mm', height: '2.35mm', color: primaryColor }}
                />
                <span>{complaintWhatsapp}</span>
              </div>
              <div
                ref={emailRef}
                aria-label={`Email ${complaintEmail}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.8mm minmax(0, 1fr)',
                  alignItems: 'center',
                  gap: '0.45mm',
                  fontSize: `${complaintSize}pt`,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  overflowWrap: 'anywhere',
                }}
              >
                <MdEmail
                  aria-hidden="true"
                  style={{ width: '2.35mm', height: '2.35mm', color: primaryColor }}
                />
                <span>{complaintEmail}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default LabelTerpadu

import React, { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'gizi_url_v1'

const baseData = [
  { id: 1, nama: 'PAUD PERTIWI GINGGANGTANI', pk: 28, pb: 2, cat: 'TK' },
  { id: 2, nama: 'TK PERTIWI GINGGANGTANI', pk: 25, pb: 3, cat: 'TK' },
  { id: 3, nama: 'TK PERTIWI 2 GINGGANGTANI', pk: 26, pb: 3, cat: 'TK' },
  { id: 4, nama: 'RA YAFALLAH GINGGANGTANI', pk: 62, pb: 6, cat: 'RA' },
  { id: 5, nama: 'MI YAFALLAH GINGGANGTANI', pk: 46, pb: 56, cat: 'MI' },
  { id: 6, nama: 'SDN 1 GINGGANGTANI', pk: 33, pb: 44, cat: 'SD' },
  { id: 7, nama: 'SDN 2 GINGGANGTANI', pk: 48, pb: 73, cat: 'SD' },
  { id: 8, nama: 'SDN 3 GINGGANGTANI', pk: 97, pb: 90, cat: 'SD' },
  { id: 9, nama: 'MTS YAFALAH GINGGANGTANI', pk: 0, pb: 408, cat: 'MTS' },
  { id: 10, nama: 'MA YAFALAH GINGGANGTANI', pk: 0, pb: 249, cat: 'MA' },
  { id: 11, nama: 'PAUD BINTANG JEKETRO', pk: 25, pb: 2, cat: 'PAUD' },
  { id: 12, nama: 'TK PERTIWI SABAN', pk: 23, pb: 2, cat: 'TK' },
  { id: 13, nama: 'SDN 1 JEKETRO', pk: 91, pb: 102, cat: 'SD' },
  { id: 14, nama: 'SDN 2 JEKETRO', pk: 73, pb: 85, cat: 'SD' },
  { id: 15, nama: 'SDN 1 SABAN', pk: 78, pb: 107, cat: 'SD' },
  { id: 16, nama: 'TK PERTIWI JEKETRO', pk: 35, pb: 2, cat: 'TK' },
  { id: 17, nama: 'PAUD KB DAHLIA SABAN', pk: 30, pb: 2, cat: 'PAUD' },
  { id: 18, nama: 'SMPN 2 GUBUG', pk: 0, pb: 953, cat: 'SMP' },
  { id: 19, nama: 'SMK YAFALAH GINGGANGTANI', pk: 0, pb: 174, cat: 'SMK' },
  { id: 20, nama: 'MA FUTUHIYAH JEKETRO', pk: 0, pb: 304, cat: 'MA' },
  { id: 21, nama: 'BUMIL, BUSUI, BALITA, KADER', pk: 191, pb: 95, cat: '3B' }
]

const getDefaultState = () =>
  [...baseData]
    .sort((a, b) => a.id - b.id)
    .map((item) => ({ ...item, active: true, split: false, dr: '1', v1: 0, v2: 0, ket: '' }))

const fromSafeBase64 = (value) => {
  const decoded = atob(value)
    .split('')
    .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
    .join('')
  return decodeURIComponent(decoded)
}

const clampSplitValue = (value, max) => {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) return 0
  return Math.min(Math.max(0, parsed), max)
}

const fromCompactPayload = (payload) => {
  const defaults = getDefaultState()
  if (!Array.isArray(payload)) return defaults

  return defaults.map((base, index) => {
    const row = payload[index]
    if (!Array.isArray(row)) return base

    const [active, split, driver, v1, v2, ket] = row
    const total = base.pk + base.pb
    const safeV1 = clampSplitValue(v1, total)
    const safeV2 = clampSplitValue(v2, total)
    const useSplit = Boolean(split)

    return {
      ...base,
      active: Boolean(active),
      split: useSplit,
      dr: driver === 2 ? '2' : '1',
      v1: useSplit ? safeV1 : 0,
      v2: useSplit ? Math.min(total - safeV1, safeV2) : 0,
      ket: typeof ket === 'string' ? ket : ''
    }
  })
}

const decodeSharedState = (sharedValue) => {
  const parsed = JSON.parse(fromSafeBase64(sharedValue))
  if (!Array.isArray(parsed)) return getDefaultState()
  if (parsed.length > 0 && parsed[0] && typeof parsed[0] === 'object' && 'nama' in parsed[0]) {
    return parsed
  }
  return fromCompactPayload(parsed)
}

const categoryTheme = (cat) => {
  if (cat === '3B') {
    return {
      badge: 'bg-pink-100 text-pink-900 border-pink-300',
      row: 'bg-pink-50/60'
    }
  }

  if (['TK', 'PAUD', 'RA'].includes(cat)) {
    return {
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      row: 'bg-amber-50/60'
    }
  }

  if (['SD', 'MI'].includes(cat)) {
    return {
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      row: 'bg-sky-50/60'
    }
  }

  if (['SMP', 'MTS'].includes(cat)) {
    return {
      badge: 'bg-violet-100 text-violet-900 border-violet-300',
      row: 'bg-violet-50/60'
    }
  }

  return {
    badge: 'bg-slate-100 text-slate-800 border-slate-300',
    row: 'bg-slate-50/60'
  }
}

const buildDriverRow = (item, driver) => {
  if (!item.active) return null

  if (!item.split) {
    if (item.dr !== driver) return null
    return {
      id: item.id,
      penerima: item.nama,
      cat: item.cat,
      pk: item.pk,
      pb: item.pb,
      total: item.pk + item.pb,
      ket: item.ket
    }
  }

  const assignedTotal = driver === '1' ? item.v1 : item.v2
  if (assignedTotal <= 0) return null

  const baseTotal = item.pk + item.pb
  if (baseTotal <= 0) {
    return {
      id: item.id,
      penerima: item.nama,
      cat: item.cat,
      pk: 0,
      pb: assignedTotal,
      total: assignedTotal,
      ket: item.ket
    }
  }

  const pk = Math.round((assignedTotal * item.pk) / baseTotal)
  return {
    id: item.id,
    penerima: item.nama,
    cat: item.cat,
    pk,
    pb: assignedTotal - pk,
    total: assignedTotal,
    ket: item.ket
  }
}

const DriverTable = ({ title, data }) => {
  const totals = data.reduce(
    (acc, row) => ({
      pk: acc.pk + row.pk,
      pb: acc.pb + row.pb,
      total: acc.total + row.total
    }),
    { pk: 0, pb: 0, total: 0 }
  )

  return (
    <section className='mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
      <h2 className='mb-3 text-lg font-extrabold tracking-tight text-slate-900'>{title}</h2>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[720px] border-collapse text-sm'>
          <thead>
            <tr className='bg-slate-900 text-left text-xs font-bold tracking-wide text-white uppercase'>
              <th className='px-3 py-2'>No</th>
              <th className='px-3 py-2'>Penerima</th>
              <th className='px-3 py-2'>Kategori</th>
              <th className='px-3 py-2 text-right'>Kecil</th>
              <th className='px-3 py-2 text-right'>Besar</th>
              <th className='px-3 py-2 text-right'>Total</th>
              <th className='px-3 py-2'>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const theme = categoryTheme(row.cat)
              return (
                <tr key={`${row.id}-${index}`} className={`border-t border-slate-200 ${theme.row}`}>
                  <td className='px-3 py-2 align-top text-slate-700'>{index + 1}</td>
                  <td className='px-3 py-2 font-semibold text-slate-900'>{row.penerima}</td>
                  <td className='px-3 py-2'>
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide ${theme.badge}`}
                    >
                      {row.cat}
                    </span>
                  </td>
                  <td className='px-3 py-2 text-right'>{row.pk}</td>
                  <td className='px-3 py-2 text-right'>{row.pb}</td>
                  <td className='px-3 py-2 text-right font-semibold'>{row.total}</td>
                  <td className='px-3 py-2 text-slate-700'>{row.ket || '-'}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className='border-t-2 border-slate-900 bg-slate-100 text-sm font-extrabold text-slate-900'>
              <td className='px-3 py-2' colSpan={3}>
                TOTAL
              </td>
              <td className='px-3 py-2 text-right'>{totals.pk}</td>
              <td className='px-3 py-2 text-right'>{totals.pb}</td>
              <td className='px-3 py-2 text-right'>{totals.total}</td>
              <td className='px-3 py-2'>{data.length} lokasi</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default function JktCompactPage() {
  const [state, setState] = useState([])
  const [sourceUrl, setSourceUrl] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const shared = params.get('d')

    let initial = getDefaultState()
    if (shared) {
      try {
        initial = decodeSharedState(shared)
      } catch {
        initial = getDefaultState()
      }
    } else {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          initial = JSON.parse(saved)
        } catch {
          initial = getDefaultState()
        }
      }
    }

    setState(initial)
    setSourceUrl(window.location.href)
  }, [])

  const driver1 = useMemo(
    () => state.map((item) => buildDriverRow(item, '1')).filter(Boolean),
    [state]
  )
  const driver2 = useMemo(
    () => state.map((item) => buildDriverRow(item, '2')).filter(Boolean),
    [state]
  )

  const summaryStats = useMemo(() => {
    const driver1Total = driver1.reduce((sum, row) => sum + row.total, 0)
    const driver2Total = driver2.reduce((sum, row) => sum + row.total, 0)
    const activeCount = state.filter((item) => item.active).length
    const nonActiveRows = state.filter((item) => !item.active)
    const nonActiveCount = nonActiveRows.length
    const nonActiveTotal = nonActiveRows.reduce((sum, item) => sum + item.pk + item.pb, 0)

    return {
      driver1Total,
      driver2Total,
      activeCount,
      nonActiveCount,
      activeGrandTotal: driver1Total + driver2Total,
      nonActiveTotal,
      totalAll: driver1Total + driver2Total + nonActiveTotal,
      diff: Math.abs(driver1Total - driver2Total)
    }
  }, [driver1, driver2, state])

  const nonActiveList = useMemo(
    () =>
      state
        .filter((item) => !item.active)
        .map((item) => ({
          id: item.id,
          nama: item.nama,
          cat: item.cat,
          total: item.pk + item.pb
        })),
    [state]
  )

  return (
    <main className='mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-6 text-slate-900'>
      <style>{`
          .navbar,
          .footer {
            display: none !important;
          }

          @media print {
            .no-print { display: none !important; }
            main { background: #fff !important; padding: 0 !important; }
            section { box-shadow: none !important; break-inside: avoid; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
          }
        `}</style>

      <header className='mb-6 rounded-2xl border border-slate-300 bg-white p-4'>
        <h1 className='text-2xl font-black tracking-tight'>Rekap Distribusi</h1>
        <p className='mt-1 text-sm text-slate-700'>
          Format ringkas untuk review cepat dan siap print.
        </p>
        <div className='no-print mt-3 flex flex-wrap gap-2'>
          <a
            href={sourceUrl ? sourceUrl.replace('/jkt-compact', '/jkt') : '/jkt'}
            className='rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-200'
          >
            Kembali ke Editor
          </a>
          <button
            type='button'
            onClick={() => window.print()}
            className='rounded-lg border border-sky-300 bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-900 hover:bg-sky-200'
          >
            Print
          </button>
        </div>
      </header>

        <DriverTable title='Driver 1' data={driver1} />
        <DriverTable title='Driver 2' data={driver2} />

        <section className='mb-6 grid gap-2 md:grid-cols-5'>
          <article className='rounded-xl border border-sky-300 bg-sky-100 p-3 text-sky-900'>
            <p className='text-xs font-bold uppercase'>Driver 1</p>
            <p className='text-2xl font-black'>{summaryStats.driver1Total}</p>
          </article>
          <article className='rounded-xl border border-emerald-300 bg-emerald-100 p-3 text-emerald-900'>
            <p className='text-xs font-bold uppercase'>Driver 2</p>
            <p className='text-2xl font-black'>{summaryStats.driver2Total}</p>
          </article>
          <article className='rounded-xl border border-rose-300 bg-rose-100 p-3 text-rose-900'>
            <p className='text-xs font-bold uppercase'>Tidak Aktif ({summaryStats.nonActiveCount})</p>
            <p className='text-2xl font-black'>{summaryStats.nonActiveTotal}</p>
          </article>
          <article className='rounded-xl border border-indigo-300 bg-indigo-100 p-3 text-indigo-900'>
            <p className='text-xs font-bold uppercase'>Grand Total Aktif ({summaryStats.activeCount})</p>
            <p className='text-2xl font-black'>{summaryStats.activeGrandTotal}</p>
          </article>
          <article className='rounded-xl border border-slate-400 bg-slate-100 p-3 text-slate-900'>
            <p className='text-xs font-bold uppercase'>Grand Total Aktif + Tidak Aktif</p>
            <p className='text-2xl font-black'>
              {summaryStats.activeGrandTotal + summaryStats.nonActiveTotal}
            </p>
          </article>
        </section>

        {nonActiveList.length > 0 ? (
          <section className='mb-6 rounded-2xl border border-rose-300 bg-rose-50 p-4'>
            <h3 className='mb-2 text-base font-extrabold text-rose-900'>
              Daftar Yang Tidak Aktif (Tidak Masuk Driver)
            </h3>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[520px] border-collapse text-sm'>
                <thead>
                  <tr className='bg-rose-200 text-left text-xs font-bold tracking-wide text-rose-900 uppercase'>
                    <th className='px-3 py-2'>No</th>
                    <th className='px-3 py-2'>Penerima</th>
                    <th className='px-3 py-2'>Kategori</th>
                    <th className='px-3 py-2 text-right'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {nonActiveList.map((row, index) => (
                    <tr key={row.id} className='border-t border-rose-200'>
                      <td className='px-3 py-2'>{index + 1}</td>
                      <td className='px-3 py-2 font-semibold'>{row.nama}</td>
                      <td className='px-3 py-2'>{row.cat}</td>
                      <td className='px-3 py-2 text-right font-semibold'>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <footer className='rounded-2xl border-2 border-slate-900 bg-white p-4 text-right text-lg font-black'>
          TOTAL: {summaryStats.totalAll} | AKTIF ({summaryStats.activeCount}):{' '}
          {summaryStats.activeGrandTotal} | NON-AKTIF ({summaryStats.nonActiveCount}):{' '}
          {summaryStats.nonActiveTotal} | SELISIH: {summaryStats.diff}
        </footer>
    </main>
  )
}

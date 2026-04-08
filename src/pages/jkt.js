import React, { useEffect, useMemo, useState } from 'react'
import Layout from '@theme/Layout'

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

const toSafeBase64 = (value) => {
  const encoded = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(Number.parseInt(p1, 16))
  )
  return btoa(encoded)
}

const fromSafeBase64 = (value) => {
  const decoded = atob(value)
    .split('')
    .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
    .join('')
  return decodeURIComponent(decoded)
}

const categoryTheme = (cat) => {
  if (cat === '3B')
    return {
      badge: 'bg-pink-500/90 text-white dark:bg-pink-500/80',
      text: 'text-pink-700 dark:text-pink-300'
    }
  if (['TK', 'PAUD', 'RA'].includes(cat))
    return {
      badge: 'bg-amber-500/90 text-white dark:bg-amber-500/80',
      text: 'text-amber-700 dark:text-amber-300'
    }
  if (['SD', 'MI'].includes(cat))
    return {
      badge: 'bg-sky-500/90 text-white dark:bg-sky-500/80',
      text: 'text-sky-700 dark:text-sky-300'
    }
  if (['SMP', 'MTS'].includes(cat))
    return {
      badge: 'bg-violet-500/90 text-white dark:bg-violet-500/80',
      text: 'text-violet-700 dark:text-violet-300'
    }
  return {
    badge: 'bg-slate-500/90 text-white dark:bg-slate-500/80',
    text: 'text-slate-700 dark:text-slate-200'
  }
}

export default function JktGiziPage() {
  const [state, setState] = useState([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const shared = params.get('d')
    let initial = getDefaultState()

    if (shared) {
      try {
        initial = JSON.parse(fromSafeBase64(shared))
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
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

    const encoded = toSafeBase64(JSON.stringify(state))
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    window.history.replaceState({}, '', `${baseUrl}?d=${encoded}`)
  }, [isReady, state])

  const summary = useMemo(() => {
    let t1 = 0
    let t2 = 0
    let pk1 = 0
    let pb1 = 0
    let pk2 = 0
    let pb2 = 0
    let l1 = 0
    let l2 = 0

    for (const item of state) {
      if (!item.active) continue

      if (item.split) {
        t1 += item.v1
        t2 += item.v2
        if (item.v1 > 0) l1 += 1
        if (item.v2 > 0) l2 += 1
      } else {
        const total = item.pk + item.pb
        if (item.dr === '1') {
          t1 += total
          pk1 += item.pk
          pb1 += item.pb
          l1 += 1
        } else {
          t2 += total
          pk2 += item.pk
          pb2 += item.pb
          l2 += 1
        }
      }
    }

    return {
      t1,
      t2,
      pk1,
      pb1,
      pk2,
      pb2,
      l1,
      l2,
      diff: Math.abs(t1 - t2)
    }
  }, [state])

  const updateRow = (index, updater) => {
    setState((prev) => prev.map((item, i) => (i === index ? updater(item) : item)))
  }

  const toggleActive = (index) => {
    updateRow(index, (row) => ({ ...row, active: !row.active }))
  }

  const toggleSplit = (index) => {
    updateRow(index, (row) => {
      const nextSplit = !row.split
      if (!nextSplit) return { ...row, split: false }

      const total = row.pk + row.pb
      const v1 = Math.floor(total / 2)
      return { ...row, split: true, v1, v2: total - v1 }
    })
  }

  const setDriver = (index, driver) => {
    updateRow(index, (row) => ({ ...row, dr: driver }))
  }

  const setSplitValue = (index, key, value) => {
    const parsed = Number.parseInt(value, 10)
    updateRow(index, (row) => {
      const total = row.pk + row.pb
      const safeValue = Number.isNaN(parsed) ? 0 : Math.max(0, parsed)

      if (key === 'v1') {
        const v1 = Math.min(safeValue, total)
        return { ...row, v1, v2: total - v1 }
      }

      const v2 = Math.min(safeValue, total)
      return { ...row, v2, v1: total - v2 }
    })
  }

  const setKeterangan = (index, value) => {
    updateRow(index, (row) => ({ ...row, ket: value }))
  }

  const copyUrl = async () => {
    if (typeof window === 'undefined') return
    try {
      await navigator.clipboard.writeText(window.location.href)
      window.alert('Link berhasil disalin.')
    } catch {
      window.alert('Gagal menyalin link. Coba salin manual dari address bar.')
    }
  }

  const getDriverRow = (item, driver) => {
    if (!item.active) return null

    if (!item.split) {
      if (item.dr !== driver) return null
      const total = item.pk + item.pb
      return { penerima: item.nama, pk: item.pk, pb: item.pb, total }
    }

    const assignedTotal = driver === '1' ? item.v1 : item.v2
    if (assignedTotal <= 0) return null

    const baseTotal = item.pk + item.pb
    if (baseTotal <= 0)
      return { penerima: item.nama, pk: 0, pb: assignedTotal, total: assignedTotal }

    const pk = Math.round((assignedTotal * item.pk) / baseTotal)
    return { penerima: item.nama, pk, pb: assignedTotal - pk, total: assignedTotal }
  }

  const buildDriverTableText = (driver) => {
    const dataRows = state.map((item) => getDriverRow(item, driver)).filter(Boolean)
    const rows = dataRows.map((row) => `| ${row.penerima} | ${row.pk} | ${row.pb} | ${row.total} |`)
    const totalPk = dataRows.reduce((sum, row) => sum + row.pk, 0)
    const totalPb = dataRows.reduce((sum, row) => sum + row.pb, 0)
    const totalAll = dataRows.reduce((sum, row) => sum + row.total, 0)

    return [
      '| Penerima | Porsi Kecil | Porsi Besar | Total |',
      '|---|---:|---:|---:|',
      ...rows,
      `| TOTAL | ${totalPk} | ${totalPb} | ${totalAll} |`
    ].join('\n')
  }

  const buildAllDriversTableText = () => {
    const rows = []
    let totalPk = 0
    let totalPb = 0
    let totalAll = 0

    for (const item of state) {
      const d1 = getDriverRow(item, '1')
      const d2 = getDriverRow(item, '2')
      if (d1) {
        rows.push(`| Driver 1 | ${d1.penerima} | ${d1.pk} | ${d1.pb} | ${d1.total} |`)
        totalPk += d1.pk
        totalPb += d1.pb
        totalAll += d1.total
      }
      if (d2) {
        rows.push(`| Driver 2 | ${d2.penerima} | ${d2.pk} | ${d2.pb} | ${d2.total} |`)
        totalPk += d2.pk
        totalPb += d2.pb
        totalAll += d2.total
      }
    }

    return [
      '| Driver | Penerima | Porsi Kecil | Porsi Besar | Total |',
      '|---|---|---:|---:|---:|',
      ...rows,
      `| TOTAL | - | ${totalPk} | ${totalPb} | ${totalAll} |`
    ].join('\n')
  }

  const copyText = async (text, successMessage) => {
    if (typeof window === 'undefined') return
    try {
      await navigator.clipboard.writeText(text)
      window.alert(successMessage)
    } catch {
      window.alert('Gagal menyalin data. Coba ulangi lagi.')
    }
  }

  const resetAll = () => {
    if (typeof window === 'undefined') return
    if (!window.confirm('Hapus semua data pembagian?')) return
    window.localStorage.removeItem(STORAGE_KEY)
    window.location.href = window.location.pathname
  }

  return (
    <Layout title='Dashboard Porsi Gizi'>
      <main className='relative min-h-screen overflow-x-hidden bg-slate-100 py-10 dark:bg-slate-950'>
        <div className='pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_10%_20%,rgba(14,165,233,.20),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,.20),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,.15),transparent_35%)] dark:opacity-60' />

        <div className='relative mx-auto max-w-7xl px-4'>
          <section className='rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70'>
            <div className='mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
              <div>
                <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                  Sistem Distribusi Porsi
                </h1>
                <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
                  Link URL otomatis sinkron dengan data pembagian saat ini.
                </p>
              </div>

              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={copyUrl}
                  className='rounded-xl border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-200 dark:border-amber-500/40 dark:bg-amber-400/10 dark:text-amber-200 dark:hover:bg-amber-400/20'
                >
                  Salin Link Share
                </button>
                <button
                  type='button'
                  onClick={resetAll}
                  className='rounded-xl border border-rose-300 bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-900 transition hover:bg-rose-200 dark:border-rose-500/40 dark:bg-rose-400/10 dark:text-rose-200 dark:hover:bg-rose-400/20'
                >
                  Reset Sistem
                </button>
              </div>
            </div>

            <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6'>
              <div className='space-y-2 lg:hidden'>
                {state.map((item, index) => {
                  const theme = categoryTheme(item.cat)
                  return (
                    <article
                      key={item.id}
                      className={`rounded-xl border p-3 ${
                        item.active
                          ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                          : 'border-rose-200 bg-rose-50/70 opacity-80 dark:border-rose-900/50 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <p className='text-xs font-semibold text-slate-500 dark:text-slate-400'>
                            ID #{item.id}
                          </p>
                          <p className={`mt-0.5 text-xs font-semibold ${theme.text}`}>
                            {item.nama}
                          </p>
                          <span
                            className={`mt-1.5 inline-flex rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${theme.badge}`}
                          >
                            {item.cat}
                          </span>
                        </div>
                        <label className='inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200'>
                          <input
                            type='checkbox'
                            checked={item.active}
                            onChange={() => toggleActive(index)}
                            className='h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500'
                          />
                          Aktif
                        </label>
                      </div>

                      <div className='mt-2 grid grid-cols-3 gap-1.5 text-[11px] text-slate-700 dark:text-slate-200'>
                        <p>Kecil: {item.pk}</p>
                        <p>Besar: {item.pb}</p>
                        <p className='font-semibold'>Total: {item.pk + item.pb}</p>
                      </div>

                      <div className='mt-2 flex flex-wrap items-center gap-2'>
                        <label className='inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200'>
                          <input
                            type='checkbox'
                            checked={item.split}
                            disabled={!item.active}
                            onChange={() => toggleSplit(index)}
                            className='h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40'
                          />
                          Split
                        </label>

                        {item.active && !item.split ? (
                          <div className='flex gap-2 text-xs text-slate-700 dark:text-slate-200'>
                            <label className='inline-flex items-center gap-1'>
                              <input
                                type='radio'
                                name={`driver-mobile-${index}`}
                                checked={item.dr === '1'}
                                onChange={() => setDriver(index, '1')}
                              />
                              D1
                            </label>
                            <label className='inline-flex items-center gap-1'>
                              <input
                                type='radio'
                                name={`driver-mobile-${index}`}
                                checked={item.dr === '2'}
                                onChange={() => setDriver(index, '2')}
                              />
                              D2
                            </label>
                          </div>
                        ) : null}
                      </div>

                      {item.active && item.split ? (
                        <div className='mt-2 grid grid-cols-2 gap-1.5'>
                          <input
                            type='number'
                            min='0'
                            value={item.v1}
                            onChange={(event) => setSplitValue(index, 'v1', event.target.value)}
                            className='w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-cyan-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800'
                            aria-label={`Split Driver 1 ${item.nama}`}
                          />
                          <input
                            type='number'
                            min='0'
                            value={item.v2}
                            onChange={(event) => setSplitValue(index, 'v2', event.target.value)}
                            className='w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs ring-cyan-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800'
                            aria-label={`Split Driver 2 ${item.nama}`}
                          />
                        </div>
                      ) : null}

                      <input
                        type='text'
                        value={item.ket}
                        onChange={(event) => setKeterangan(index, event.target.value)}
                        placeholder='Catatan...'
                        className='mt-2 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs ring-slate-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                      />
                    </article>
                  )
                })}
              </div>

              <div className='hidden rounded-2xl border border-slate-200 bg-white lg:block dark:border-slate-700 dark:bg-slate-900'>
                <div className='max-h-[calc(100vh-12rem)] overflow-auto'>
                  <table className='min-w-[980px] text-sm'>
                    <thead className='sticky top-0 z-10'>
                      <tr className='bg-slate-900 text-left text-xs tracking-wide text-slate-100 uppercase dark:bg-slate-800'>
                        <th className='px-3 py-3'>ID</th>
                        <th className='px-3 py-3'>Aktif</th>
                        <th className='px-3 py-3'>Penerima</th>
                        <th className='px-3 py-3'>Porsi</th>
                        <th className='px-3 py-3'>Split</th>
                        <th className='px-3 py-3'>Driver</th>
                        <th className='px-3 py-3'>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item, index) => {
                        const theme = categoryTheme(item.cat)
                        return (
                          <tr
                            key={item.id}
                            className={`border-t border-slate-200 dark:border-slate-800 ${
                              item.active
                                ? 'bg-white dark:bg-slate-900'
                                : 'bg-rose-50/70 opacity-65 dark:bg-rose-950/20'
                            }`}
                          >
                            <td className='px-3 py-3 font-semibold text-slate-700 dark:text-slate-200'>
                              {item.id}
                            </td>
                            <td className='px-3 py-3'>
                              <input
                                type='checkbox'
                                checked={item.active}
                                onChange={() => toggleActive(index)}
                                className='h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500'
                              />
                            </td>
                            <td className='px-3 py-3'>
                              <div className='space-y-1'>
                                <p className={`font-semibold ${theme.text}`}>{item.nama}</p>
                                <span
                                  className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${theme.badge}`}
                                >
                                  {item.cat}
                                </span>
                              </div>
                            </td>
                            <td className='px-5 py-3 text-xs text-slate-600 dark:text-slate-300'>
                              Kecil: {item.pk} | Besar: {item.pb}
                              <p className='mt-1 font-semibold text-slate-800 dark:text-slate-100'>
                                Total: {item.pk + item.pb}
                              </p>
                            </td>
                            <td className='px-3 py-3'>
                              <input
                                type='checkbox'
                                checked={item.split}
                                disabled={!item.active}
                                onChange={() => toggleSplit(index)}
                                className='h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40'
                              />
                            </td>
                            <td className='px-3 py-3'>
                              {item.active && !item.split ? (
                                <div className='flex gap-3 text-xs text-slate-700 dark:text-slate-200'>
                                  <label className='inline-flex items-center gap-1'>
                                    <input
                                      type='radio'
                                      name={`driver-${index}`}
                                      checked={item.dr === '1'}
                                      onChange={() => setDriver(index, '1')}
                                    />
                                    D1
                                  </label>
                                  <label className='inline-flex items-center gap-1'>
                                    <input
                                      type='radio'
                                      name={`driver-${index}`}
                                      checked={item.dr === '2'}
                                      onChange={() => setDriver(index, '2')}
                                    />
                                    D2
                                  </label>
                                </div>
                              ) : null}

                              {item.active && item.split ? (
                                <div className='flex gap-2'>
                                  <input
                                    type='number'
                                    min='0'
                                    value={item.v1}
                                    onChange={(event) =>
                                      setSplitValue(index, 'v1', event.target.value)
                                    }
                                    className='w-20 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs ring-cyan-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800'
                                    aria-label={`Split Driver 1 ${item.nama}`}
                                  />
                                  <input
                                    type='number'
                                    min='0'
                                    value={item.v2}
                                    onChange={(event) =>
                                      setSplitValue(index, 'v2', event.target.value)
                                    }
                                    className='w-20 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs ring-cyan-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800'
                                    aria-label={`Split Driver 2 ${item.nama}`}
                                  />
                                </div>
                              ) : null}
                            </td>
                            <td className='px-3 py-3'>
                              <input
                                type='text'
                                value={item.ket}
                                onChange={(event) => setKeterangan(index, event.target.value)}
                                placeholder='Catatan...'
                                className='w-full min-w-48 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs ring-slate-300 outline-none focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className='mt-6 space-y-4 lg:sticky lg:top-24 lg:mt-0 lg:self-start'>
                <article className='rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-4 text-white shadow-lg shadow-blue-900/20'>
                  <h2 className='text-sm font-semibold tracking-wider text-blue-100 uppercase'>
                    Driver 1
                  </h2>
                  <p className='text-4xl font-bold'>{summary.t1}</p>
                  <div className='flex items-center justify-between border-t border-white/20 text-sm text-blue-100'>
                    <span>Kecil/Besar</span>
                    <span className='font-semibold'>
                      {summary.pk1}/{summary.pb1}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm text-blue-100'>
                    <span>Lokasi</span>
                    <span className='font-semibold'>{summary.l1}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() =>
                      copyText(buildDriverTableText('1'), 'Data Driver 1 berhasil disalin.')
                    }
                    className='mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20'
                  >
                    Copy Driver 1
                  </button>
                </article>

                <article className='rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 p-4 text-white shadow-lg shadow-green-900/20'>
                  <h2 className='text-sm font-semibold tracking-wider text-emerald-100 uppercase'>
                    Driver 2
                  </h2>
                  <p className='text-4xl font-bold'>{summary.t2}</p>

                  <div className='flex items-center justify-between border-t border-white/20 text-sm text-emerald-100'>
                    <span>Kecil/Besar</span>
                    <span className='font-semibold'>
                      {summary.pk2}/{summary.pb2}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm text-emerald-100'>
                    <span>Lokasi</span>
                    <span className='font-semibold'>{summary.l2}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() =>
                      copyText(buildDriverTableText('2'), 'Data Driver 2 berhasil disalin.')
                    }
                    className='mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20'
                  >
                    Copy Driver 2
                  </button>
                </article>

                <div className='rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'>
                  Selisih: {summary.diff} {summary.diff === 0 ? '(Sempurna)' : ''}
                </div>

                <button
                  type='button'
                  onClick={() =>
                    copyText(buildAllDriversTableText(), 'Semua data driver berhasil disalin.')
                  }
                  className='inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                >
                  Copy Semua Driver
                </button>

                {!isReady ? (
                  <p className='text-sm text-slate-500 dark:text-slate-400'>Memuat data...</p>
                ) : null}
              </aside>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}

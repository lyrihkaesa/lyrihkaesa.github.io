import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'

export default function BirthdayPage() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const surprise = () => {
    setOpen(true)

    if (window.confetti) {
      window.confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      })
    }
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-20 text-center'>
      <h1 className='text-4xl font-bold'>🎉 Happy Birthday Lia Maulida 🎉</h1>

      <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
        Selamat ulang tahun yang ke-24 🎂
      </p>

      {!open && (
        <button
          onClick={surprise}
          className='mt-8 rounded-lg bg-pink-500 px-6 py-3 text-white hover:bg-pink-600'
        >
          Buka Kejutan 🎁
        </button>
      )}

      {open && (
        <div className='mt-10 space-y-6'>
          <p className='text-lg'>
            Terima kasih selama ini sudah menjadi ketua yang luar biasa dalam memimpin
            <strong> Dapur SPPG Jeketro</strong>.
          </p>

          <p>
            Terima kasih juga karena sering berbagi makanan dan selalu menjaga suasana dapur tetap
            hangat dan menyenangkan. Semoga semua kebaikan yang telah diberikan kembali menjadi
            kebahagiaan yang berlipat. ✨
          </p>

          {/* Durian image */}
          <div className='flex justify-center'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0v1oa5QP0ivsgqlEg7Rui_5r4WbpKch5Rw&s'
              alt='Durian'
              className='mt-4 w-48 rounded-xl shadow-lg'
            />
          </div>

          {/* Durian Joke */}
          <div className='rounded-xl border bg-yellow-50 p-4 dark:bg-yellow-900/20'>
            <p className='font-semibold'>Durian Fact 🍈</p>
            <p className='mt-2 text-sm'>
              Tidak semua orang suka durian… tapi semua orang pasti suka ketua yang baik seperti
              Lia.
            </p>

            <p className='mt-2 text-sm italic'>
              Jadi kalau hidup terasa berat, ingat saja: "Durian saja berduri tapi isinya manis." 😄
            </p>
          </div>

          {/* Wish */}
          <div className='mt-6 text-lg'>
            Semoga di usia yang ke-24 ini selalu diberikan kesehatan, kebahagiaan, dan kesuksesan
            dalam setiap langkah. 🌟
          </div>

          <div className='mt-4 text-sm text-gray-500'>
            — Dari tim yang selalu menghargai kepemimpinanmu —
          </div>
        </div>
      )}
    </div>
  )
}

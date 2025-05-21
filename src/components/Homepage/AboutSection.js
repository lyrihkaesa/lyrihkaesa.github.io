export default function AboutSection() {
  return (
    <section className='mb-20 text-center'>
      <div className='mx-auto'>
        <div className='mb-8 flex justify-center'>
          <img
            src='/img/ksa-logo-gradient-blue.png'
            alt='Profil Kaesa'
            className='h-48 w-48 rounded-full object-cover shadow-lg'
          />
        </div>
        <h1 className='mb-6 text-4xl font-bold text-indigo-600 dark:text-indigo-400'>
          Kaesa Lyrih
        </h1>
        <p className='mb-6 text-lg text-slate-600 dark:text-slate-300'>
          Suka Memberikan Informasi yang Manusiawi 💜.
        </p>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
            <h3 className='mb-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400'>
              🌐 Fullstack Web Developer
            </h3>
            <p>Menggunakan Framework Laravel, Filament, Livewire, Tailwind CSS, AlpineJS.</p>
          </div>

          <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
            <h3 className='mb-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400'>
              📱 Mobile Flutter Developer
            </h3>
            <p>Menggunakan Framework Flutter untuk intregasi web dengan android dan ios.</p>
          </div>

          <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
            <h3 className='mb-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400'>
              🕸 DevOps & Network Engginer
            </h3>
            <p>
              Hobi ngulik server linux ubuntu, proxmox, docker serta jaringan Mirkotik, Fiber Optic,
              dsb.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

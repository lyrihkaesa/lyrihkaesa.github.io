export default function TechStack({ items }) {
  return (
    <section className='mb-20'>
      <h2 className='mb-8 text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400'>
        🛠 Stack Teknologi
      </h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
        {items.map((tech) => (
          <a
            key={tech.name}
            href={tech.link}
            target='_blank'
            rel='noopener noreferrer'
            className='flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:bg-slate-800'
          >
            {tech.icon}
            <h3 className='mt-3 text-lg font-medium'>{tech.name}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}

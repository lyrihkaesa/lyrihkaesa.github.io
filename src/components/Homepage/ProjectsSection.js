import ProjectCard from './ProjectCard'

export default function ProjectsSection({ projects }) {
  return (
    <section className='mb-20'>
      <h2 className='mb-8 text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400'>
        🏆 Projek Terkini
      </h2>
      <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  )
}

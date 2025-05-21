import ProjectCard from './ProjectCard'

export default function ProjectsSection({ projects }) {
  return (
    <section className='mb-20'>
      <h2 className='mb-8 text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400'>
        🏆 Projek Terkini
      </h2>
      <div className='flex snap-x snap-mandatory gap-6 overflow-x-auto p-4'>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  )
}

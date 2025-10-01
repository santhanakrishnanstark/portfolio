import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { FaGithub, FaExternalLinkAlt, FaCode, FaFilter } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import portfolioData from '../data/portfolio.json'

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const { projects, personal } = portfolioData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Get unique categories and statuses
  const categories = ['all', ...new Set(projects.map(project => project.category))]
  const statuses = ['all', ...new Set(projects.map(project => project.status))]

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'planned':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Layout
      title={`Projects - ${personal.name}`}
      description={`Explore the portfolio of ${personal.name}. View web development projects, applications, and technical achievements.`}
    >
      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-max">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collection of web applications, tools, and experiments that showcase my skills 
              in modern web development. Each project represents a unique challenge and learning experience.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCode className="h-5 w-5" />
                <span>{projects.length} Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding py-8 bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter Projects:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <FaCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more projects.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`card hover:shadow-lg transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaCode className="h-12 w-12 text-primary-600" />
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.longDescription || project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tech-badge">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="text-xs text-gray-500">
                      {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                          aria-label="View source code"
                        >
                          <FaGithub className="h-5 w-5" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                            aria-label="View live demo"
                          >
                            <FaExternalLinkAlt className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Interested in Working Together?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Start a Project
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <FaGithub className="mr-2 h-4 w-4" />
                View All Code
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
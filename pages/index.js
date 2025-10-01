import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import { HiArrowRight, HiDownload } from 'react-icons/hi'
import portfolioData from '../data/portfolio.json'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { personal, projects, skills, blog } = portfolioData

  useEffect(() => {
    setMounted(true)
  }, [])


  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)
  const featuredBlogPosts = blog.filter(post => post.featured).slice(0, 2)

  const socialLinks = [
    { name: 'GitHub', href: personal.social.github, icon: FaGithub },
    { name: 'LinkedIn', href: personal.social.linkedin, icon: FaLinkedin },
    { name: 'Twitter', href: personal.social.twitter, icon: FaTwitter },
    { name: 'Email', href: `mailto:${personal.email}`, icon: FaEnvelope },
  ]

  if (!mounted) return null

  return (
    <Layout
      title={`${personal.name} - ${personal.title}`}
      description={personal.bio}
    >
      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm{' '}
                  <span className="text-gradient">{personal.name}</span>
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
                  {personal.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {personal.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href="/contact" className="btn-primary">
                  Get In Touch
                  <HiArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <HiDownload className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </div>

              <div className="flex space-x-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full overflow-hidden border-4 border-white shadow-2xl" style={{ borderRadius: '110% 100% 30% 100%' }}>
                  {personal.avatar ? (
                    <Image
                      src={personal.avatar}
                      alt={personal.name}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
                      <FaCode className="h-32 w-32 text-white" />
                    </div>
                  )}
                  
                  {/* Small code icon in corner */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <FaCode className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`card-gradient animate-slide-up group`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-3xl"></div>
                
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-600/10"></div>
                  <FaCode className="h-12 w-12 text-primary-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-badge">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary-600 hover:scale-110 transition-all duration-200"
                        aria-label="View source code"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 hover:scale-110 transition-all duration-200"
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
                        className="text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors duration-200 flex items-center"
                      >
                        View Live
                        <HiArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/projects" className="btn-outline">
              View All Projects
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={category}
                className={`card-skill animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-transparent rounded-bl-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-primary-400/10 to-transparent rounded-tr-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize group-hover:text-primary-700 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {skillList.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className="group relative"
                        style={{ animationDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                      >
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:border-gray-300/50 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          <div className="flex items-center space-x-4">
                            {/* Hybrid Icon System - Devicon or Custom SVG */}
                            <div className="flex-shrink-0">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                  backgroundColor: `${skill.color}15`,
                                  border: `1px solid ${skill.color}30`
                                }}
                              >
                                {skill.iconType === 'devicon' ? (
                                  // Devicon Font Icon
                                  <i
                                    className={`${skill.icon} text-xl transition-all duration-300 group-hover:scale-110`}
                                    style={{ color: skill.color }}
                                    title={skill.name}
                                  ></i>
                                ) : skill.iconType === 'svg' && skill.icon ? (
                                  // Custom SVG Icon
                                  <img
                                    src={skill.icon}
                                    alt={`${skill.name} icon`}
                                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                                    style={{
                                      filter: `brightness(0) saturate(100%)`,
                                      color: skill.color
                                    }}
                                  />
                                ) : (
                                  // Fallback Icon
                                  <FaCode
                                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                                    style={{ color: skill.color }}
                                  />
                                )}
                              </div>
                            </div>
                            
                            {/* Skill Info */}
                            <div className="flex-1 min-w-0">
                              <div className="text-gray-800 font-semibold text-sm group-hover:text-gray-900 transition-colors duration-300 truncate">
                                {skill.name}
                              </div>
                              <div className="text-xs text-gray-400 font-medium mt-1">
                                {skill.years} year{skill.years !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover glow effect with skill color */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                          style={{
                            background: `radial-gradient(circle, ${skill.color}20 0%, transparent 70%)`
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {featuredBlogPosts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Thoughts and insights on web development and technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBlogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`card-blog group animate-slide-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Decorative header */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-400/10 to-transparent rounded-bl-3xl"></div>
                  
                  <div className="space-y-5 relative z-10">
                    {/* Featured badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                        ⭐ Featured
                      </span>
                      <time className="text-sm text-gray-500 font-medium" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tech-badge">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read more button */}
                    <div className="pt-4 border-t border-gray-100">
                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-all duration-200 group-hover:translate-x-1"
                      >
                        Read Full Article
                        <FaExternalLinkAlt className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/blog" className="btn-outline">
                View All Articles
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-max text-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Let's Work Together
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center">
                Start a Conversation
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={`mailto:${personal.email}`}
                className="btn-glass"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import { FaDownload, FaCode, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import portfolioData from '../data/portfolio.json'

export default function About() {
  const [mounted, setMounted] = useState(false)
  const { personal, experience, skills } = portfolioData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const values = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'I believe in writing clean, maintainable, and well-documented code that stands the test of time.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve problems more efficiently.'
    },
    {
      icon: FaUsers,
      title: 'Collaboration',
      description: 'Great products are built by great teams. I thrive in collaborative environments.'
    },
    {
      icon: FaRocket,
      title: 'Performance',
      description: 'Optimizing for speed, accessibility, and user experience in every project I work on.'
    }
  ]

  return (
    <Layout
      title={`About - ${personal.name}`}
      description={`Learn more about ${personal.name}, ${personal.title}. Background, experience, and what drives my passion for web development.`}
    >
      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  About <span className="text-gradient">Me</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {personal.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaDownload className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="btn-outline"
                >
                  Get In Touch
                  <HiArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  {personal.avatar ? (
                    <Image
                      src={personal.avatar}
                      alt={personal.name}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
                      <FaCode className="h-32 w-32 text-white" />
                    </div>
                  )}
                  
                  {/* Small code icon in corner */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <FaCode className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Interactive Timeline */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-max relative">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
              <span>My Professional Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Experience <span className="text-gradient">Timeline</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From intern to professional developer - here's my growth story
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 h-full rounded-full hidden md:block">
              <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-primary-400 to-transparent rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-8 md:space-y-12">
              {experience.map((job, index) => {
                const isEven = index % 2 === 0
                const isLast = index === experience.length - 1
                
                return (
                  <div
                    key={job.id}
                    className={`relative group animate-slide-up`}
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 hidden md:block z-10">
                      <div className="relative">
                        {/* Outer Ring */}
                        <div className="w-10 h-10 bg-white rounded-full border-3 border-primary-400 shadow-md group-hover:border-primary-600 transition-all duration-500 group-hover:scale-110">
                          {/* Inner Dot */}
                          <div className="absolute inset-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-500">
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-75 group-hover:opacity-100"></div>
                          </div>
                        </div>
                        
                        {/* Current Job Indicator */}
                        {job.current && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-bounce">
                            <div className="absolute inset-0.5 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      {/* Empty Space for Timeline (Desktop) */}
                      <div className={`hidden md:block ${isEven ? 'order-2' : 'order-1'}`}></div>
                      
                      {/* Job Content */}
                      <div className={`${isEven ? 'order-1 md:text-right' : 'order-2'} space-y-3`}>
                        {/* Job Header */}
                        <div className="relative">
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-200/50 group-hover:shadow-xl group-hover:border-primary-200 transition-all duration-500 group-hover:scale-102">
                            {/* Company Badge */}
                            <div className={`inline-flex items-center space-x-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-md`}>
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                              <span>{job.company}</span>
                            </div>

                            {/* Job Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                              {job.position}
                            </h3>

                            {/* Location & Duration */}
                            <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-4 text-sm">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                                <span className="font-medium">{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                <span className="font-medium">
                                  {new Date(job.startDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short'
                                  })} - {job.current ? 'Present' : new Date(job.endDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                              {job.description}
                            </p>

                            {/* Achievements */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center">
                                <span className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2 flex items-center justify-center">
                                  <span className="text-white text-xs">★</span>
                                </span>
                                Key Achievements
                              </h4>
                              <div className="grid gap-2">
                                {job.achievements.map((achievement, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start space-x-2 group/achievement hover:bg-primary-50/50 p-2 rounded-lg transition-all duration-300"
                                  >
                                    <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mt-0.5 group-hover/achievement:scale-110 transition-transform duration-300">
                                      <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed group-hover/achievement:text-gray-900 transition-colors duration-300 text-sm">
                                      {achievement}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                                <FaCode className="mr-1.5 text-primary-600 text-sm" />
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {job.technologies.map((tech, i) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 rounded-full text-xs font-medium hover:from-primary-200 hover:to-primary-300 transition-all duration-300 hover:scale-105 cursor-default"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Timeline Connector */}
                    {!isLast && (
                      <div className="md:hidden flex justify-center mt-4">
                        <div className="w-px h-8 bg-gradient-to-b from-primary-400 to-primary-200"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Timeline End Marker */}
            <div className="flex justify-center mt-8">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-md flex items-center justify-center">
                  <FaRocket className="text-white text-sm" />
                </div>
                <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Drives Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles and values that guide my approach to development and collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className={`text-center space-y-4 animate-slide-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={category}
                className={`card animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
                  {category}
                </h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-max text-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              I'm always excited to work on new projects and collaborate with talented people.
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Start a Project
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
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
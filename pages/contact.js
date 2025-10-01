import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import portfolioData from '../data/portfolio.json'

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const { personal } = portfolioData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (replace with actual form handling)
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio')
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:${personal.email}?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      description: 'Send me an email anytime'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      description: 'Call for urgent matters'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: personal.location,
      href: null,
      description: 'Based in'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: personal.social.github,
      icon: FaGithub,
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      href: personal.social.linkedin,
      icon: FaLinkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      href: personal.social.twitter,
      icon: FaTwitter,
      color: 'hover:text-blue-400'
    }
  ]

  return (
    <Layout
      title={`Contact - ${personal.name}`}
      description={`Get in touch with ${personal.name}. Available for freelance projects, collaborations, and full-time opportunities.`}
    >
      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-max">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm always interested in new opportunities, exciting projects, and meaningful collaborations. 
              Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div
                  key={method.title}
                  className={`text-center space-y-4 animate-slide-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {method.description}
                    </p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {method.value}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="animate-slide-up">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Send a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-green-800">
                        Your email client should have opened. If not, please email me directly at {personal.email}
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800">
                        There was an error. Please email me directly at {personal.email}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
                        placeholder="Tell me about your project, idea, or just say hello..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Info Panel */}
              <div className="animate-slide-up animation-delay-200">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Let's Work Together
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      I'm currently available for freelance projects and full-time opportunities. 
                      I specialize in frontend development with React and Next.js, but I'm always 
                      excited to learn new technologies and take on interesting challenges.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      What I Can Help With:
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        Web application development
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        Frontend architecture and optimization
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        UI/UX implementation
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        Code reviews and mentoring
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        Technical consulting
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Response Time
                    </h4>
                    <p className="text-gray-600">
                      I typically respond to emails within 24 hours. For urgent matters, 
                      feel free to mention it in your subject line.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Follow Me
                    </h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-600 ${social.color} transition-colors duration-200`}
                            aria-label={social.name}
                          >
                            <Icon className="h-6 w-6" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions about working together
              </p>
            </div>

            <div className="space-y-8">
              <div className="animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's your typical project timeline?
                </h3>
                <p className="text-gray-600">
                  Project timelines vary depending on scope and complexity. Small projects typically 
                  take 1-2 weeks, while larger applications can take 1-3 months. I'll provide a 
                  detailed timeline estimate after discussing your requirements.
                </p>
              </div>

              <div className="animate-slide-up animation-delay-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you work with teams or just solo projects?
                </h3>
                <p className="text-gray-600">
                  I work both independently and as part of development teams. I'm comfortable 
                  collaborating with designers, backend developers, and project managers using 
                  modern development workflows and communication tools.
                </p>
              </div>

              <div className="animate-slide-up animation-delay-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What technologies do you specialize in?
                </h3>
                <p className="text-gray-600">
                  I specialize in React, Next.js, TypeScript, and modern CSS frameworks like 
                  Tailwind CSS. I also have experience with Node.js, various databases, and 
                  cloud deployment platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
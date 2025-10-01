import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { FaExternalLinkAlt, FaClock, FaTag, FaSearch, FaRss } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import portfolioData from '../data/portfolio.json'

export default function Blog() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const { blog, personal } = portfolioData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Get all unique tags
  const allTags = blog.reduce((tags, post) => {
    post.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
    return tags
  }, [])
  const tags = ['all', ...allTags]

  // Filter posts based on search and tag
  const filteredPosts = blog.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // Sort posts by date (newest first)
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

  const featuredPosts = sortedPosts.filter(post => post.featured)
  const regularPosts = sortedPosts.filter(post => !post.featured)

  return (
    <Layout
      title={`Blog - ${personal.name}`}
      description={`Read articles and insights by ${personal.name} on web development, technology, and programming best practices.`}
    >
      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-max">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Blog & <span className="text-gradient">Articles</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights on web development, technology trends, 
              and lessons learned from building modern applications.
            </p>
            <div className="flex justify-center items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <FaRss className="h-4 w-4" />
                <span className="text-sm">{blog.length} Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTag className="h-4 w-4" />
                <span className="text-sm">{allTags.length} Topics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding py-8 bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter by topic:</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All Topics' : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-gray-600">
                Highlighted posts covering important topics and popular tutorials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`card hover:shadow-lg transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                      <time className="text-sm text-gray-500" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
                        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaClock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tech-badge">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      Read Full Article
                      <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {regularPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                All Articles
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length === blog.length 
                  ? `Browse all ${blog.length} articles` 
                  : `Showing ${filteredPosts.length} of ${blog.length} articles`}
              </p>
            </div>
          )}

          {sortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <FaSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedTag !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No articles have been published yet.'}
              </p>
              {(searchTerm || selectedTag !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTag('all')
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {sortedPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`card hover:shadow-lg transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <time className="text-sm text-gray-500" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                        <FaClock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      {post.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-3 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200">
                          <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                            {post.title}
                          </a>
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="tech-badge hover:bg-primary-100 hover:text-primary-800 transition-colors duration-200 cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        Read Full Article
                        <FaExternalLinkAlt className="ml-2 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-max text-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Get notified when I publish new articles about web development, 
              technology trends, and programming insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${personal.email}?subject=Blog Updates Subscription`}
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Subscribe to Updates
              </a>
              <Link href="/contact" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Get In Touch
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
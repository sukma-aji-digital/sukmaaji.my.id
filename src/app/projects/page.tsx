import Link from "next/link";
import Image from "next/image";
import { getSortedProjectsData, getProjectCategories } from "@/lib/projects";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects - Sukma Aji Digital",
  description:
    "Portfolio proyek-proyek digital yang telah kami kerjakan mulai dari website development, mobile apps, hingga sistem enterprise.",
  openGraph: {
    title: "Projects - Sukma Aji Digital",
    description:
      "Portfolio proyek-proyek digital yang telah kami kerjakan mulai dari website development, mobile apps, hingga sistem enterprise.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Sukma Aji Digital",
    description:
      "Portfolio proyek-proyek digital yang telah kami kerjakan mulai dari website development, mobile apps, hingga sistem enterprise.",
  },
};

export default async function ProjectsPage() {
  const allProjects = await getSortedProjectsData();
  const categories = await getProjectCategories();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-400">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent via-accent-dark to-indigo-700 text-white py-20 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 section-title">
              Our <span className="text-yellow-300">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Discover our portfolio of digital solutions - from web development to enterprise
              systems, each project crafted with precision and innovation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-dark-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-dark-200 rounded-xl shadow-sm border border-dark-100">
                <div className="text-3xl font-bold text-accent">{allProjects.length}</div>
                <div className="text-sm text-slate-dark mt-1">Total Projects</div>
              </div>
              <div className="text-center p-6 bg-dark-200 rounded-xl shadow-sm border border-dark-100">
                <div className="text-3xl font-bold text-green-400">
                  {allProjects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-sm text-slate-dark mt-1">Completed</div>
              </div>
              <div className="text-center p-6 bg-dark-200 rounded-xl shadow-sm border border-dark-100">
                <div className="text-3xl font-bold text-blue-400">{categories.length}</div>
                <div className="text-sm text-slate-dark mt-1">Categories</div>
              </div>
              <div className="text-center p-6 bg-dark-200 rounded-xl shadow-sm border border-dark-100">
                <div className="text-3xl font-bold text-purple-400">
                  {allProjects.filter((p) => p.featured).length}
                </div>
                <div className="text-sm text-slate-dark mt-1">Featured</div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center section-title">
                Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {allProjects
                  .filter((project) => project.featured)
                  .map((project) => (
                    <div
                      key={project.slug}
                      className="bg-dark-200 rounded-2xl shadow-lg overflow-hidden border border-dark-100 card-hover hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/images/project-placeholder.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === "completed"
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              }`}
                            >
                              {project.status === "completed" ? "Completed" : "In Progress"}
                            </span>
                            <span className="px-3 py-1 bg-accent/20 text-accent-light border border-accent/30 rounded-full text-xs font-medium">
                              {project.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                          <p className="text-gray-200 text-sm line-clamp-2">
                            {project.shortDescription || project.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-dark-100 text-slate-light border border-dark-100 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-dark-100 text-slate-light border border-dark-100 rounded text-xs font-medium">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-dark">
                            {project.client && `Client: ${project.client}`}
                            {project.year && ` • ${project.year}`}
                          </div>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors font-medium text-sm"
                          >
                            View Details
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* All Projects */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center section-title">
                All Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                  <div
                    key={project.slug}
                    className="bg-dark-200 rounded-xl shadow-sm overflow-hidden border border-dark-100 card-hover hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/images/project-placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            project.status === "completed"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}
                        >
                          {project.status === "completed" ? "Completed" : "In Progress"}
                        </span>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded text-xs font-medium">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-accent/20 text-accent-light border border-accent/30 rounded text-xs font-medium">
                          {project.category}
                        </span>
                        {project.year && (
                          <span className="text-xs text-slate-dark">{project.year}</span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-slate-dark text-sm line-clamp-2 mb-4">
                        {project.shortDescription || project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-dark-100 text-slate-light border border-dark-100 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-dark-100 text-slate-light border border-dark-100 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {project.client && (
                          <div className="text-xs text-slate-dark">{project.client}</div>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center text-accent hover:text-accent-light font-medium text-sm transition-colors"
                        >
                          View Details
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-accent to-accent-dark text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Let's discuss how we can help bring your digital vision to life with our expertise and
              proven track record.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-semibold transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-accent rounded-lg font-semibold transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

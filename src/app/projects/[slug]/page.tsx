import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectData, getAllProjectSlugs, getSortedProjectsData } from "@/lib/projects";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectData(params.slug);

  if (!project) {
    return {
      title: "Project Not Found - Sukma Aji Digital",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";
  const projectUrl = `${siteUrl}/projects/${project.slug}`;

  return {
    title: `${project.title} - Projects | Sukma Aji Digital`,
    description: project.description,
    keywords: project.technologies.join(", "),
    authors: [{ name: "Sukma Aji Digital" }],
    openGraph: {
      title: `${project.title} - Projects | Sukma Aji Digital`,
      description: project.description,
      type: "article",
      url: projectUrl,
      siteName: "Sukma Aji Digital",
      locale: "id_ID",
      images: project.image 
        ? [
            {
              url: project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`,
              width: 1200,
              height: 630,
              alt: project.title,
              type: "image/jpeg",
            }
          ] 
        : [
            {
              url: `${siteUrl}/images/ajipro.jpg`,
              width: 1200,
              height: 630,
              alt: "Sukma Aji Digital - Projects",
              type: "image/jpeg",
            }
          ],
      publishedTime: project.createdAt,
      modifiedTime: project.createdAt,
      section: project.category,
      tags: project.technologies,
    },
    twitter: {
      card: "summary_large_image",
      site: "@sukmaaji",
      creator: "@sukmaaji",
      title: `${project.title} - Sukma Aji Digital`,
      description: project.description,
      images: project.image 
        ? [project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`] 
        : [`${siteUrl}/images/ajipro.jpg`],
    },
    alternates: {
      canonical: projectUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectData(params.slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";
  const projectUrl = `${siteUrl}/projects/${project.slug}`;

  // Get related projects (same category, excluding current)
  const allProjects = await getSortedProjectsData();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  // Structured data for better SEO and social media sharing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": projectUrl,
    "url": projectUrl,
    "name": project.title,
    "headline": project.title,
    "description": project.description,
    "image": project.image 
      ? (project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`)
      : `${siteUrl}/images/ajipro.jpg`,
    "dateCreated": project.createdAt,
    "datePublished": project.createdAt,
    "dateModified": project.createdAt,
    "author": {
      "@type": "Person",
      "name": "Muhammad Aji Sukma",
      "url": siteUrl
    },
    "creator": {
      "@type": "Person", 
      "name": "Muhammad Aji Sukma",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sukma Aji Digital",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": projectUrl
    },
    "genre": project.category,
    "keywords": project.technologies.join(", "),
    "programmingLanguage": project.technologies,
    "about": {
      "@type": "Thing",
      "name": project.category
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <article className="min-h-screen bg-dark-400">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-accent via-accent-dark to-indigo-700 text-white overflow-hidden pt-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <div className="flex items-center space-x-2 text-indigo-200">
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                    <span>/</span>
                    <Link href="/projects" className="hover:text-white transition-colors">
                      Projects
                    </Link>
                    <span>/</span>
                    <span className="text-white">{project.title}</span>
                  </div>
                </nav>

                {/* Project Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === "completed"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                  <span className="px-3 py-1 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {project.year}
                    </span>
                  )}
                  {project.featured && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {project.title}
                </h1>

                <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                    >
                      <svg
                        className="mr-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-indigo-600 rounded-lg font-semibold transition-colors"
                    >
                      <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative">
                {project.image && (
                  <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-dark-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content - Dynamic from Markdown */}
              <div className="lg:col-span-2">
                {project.contentHtml && (
                  <div
                    dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                    className="project-content space-y-8"
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info Card */}
                <div className="bg-dark-200 rounded-xl p-6 shadow-sm border border-dark-100">
                  <h3 className="text-xl font-bold text-white mb-4 section-title">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    {project.client && (
                      <div>
                        <dt className="text-sm font-medium text-slate-dark">Client</dt>
                        <dd className="text-lg font-semibold text-white">{project.client}</dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-sm font-medium text-slate-dark">Category</dt>
                      <dd className="text-lg font-semibold text-white">{project.category}</dd>
                    </div>

                    {project.year && (
                      <div>
                        <dt className="text-sm font-medium text-slate-dark">Year</dt>
                        <dd className="text-lg font-semibold text-white">{project.year}</dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-sm font-medium text-slate-dark">Status</dt>
                      <dd
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === "completed"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {project.status === "completed" ? "Completed" : "In Progress"}
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Technologies Used */}
                <div className="bg-dark-200 rounded-xl p-6 shadow-sm border border-dark-100">
                  <h3 className="text-xl font-bold text-white mb-4 section-title">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/20 text-accent-light border border-accent/30 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Project */}
                <div className="bg-dark-200 rounded-xl p-6 shadow-sm border border-dark-100">
                  <h3 className="text-xl font-bold text-white mb-4 section-title">
                    Share This Project
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        project.title
                      )}&url=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="bg-dark-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center section-title">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <div
                    key={relatedProject.slug}
                    className="bg-dark-300 rounded-xl shadow-sm overflow-hidden border border-dark-100 card-hover hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProject.image || "/images/project-placeholder.jpg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-accent/20 text-accent-light border border-accent/30 rounded text-xs font-medium">
                          {relatedProject.category}
                        </span>
                        {relatedProject.year && (
                          <span className="text-xs text-slate-dark">{relatedProject.year}</span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {relatedProject.title}
                      </h3>

                      <p className="text-slate-dark text-sm line-clamp-2 mb-4">
                        {relatedProject.shortDescription || relatedProject.description}
                      </p>

                      <Link
                        href={`/projects/${relatedProject.slug}`}
                        className="inline-flex items-center text-accent hover:text-accent-light font-medium text-sm transition-colors"
                      >
                        View Project
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
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-accent to-accent-dark text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Let's discuss how we can create something amazing for your business with our proven
              expertise and innovative approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-semibold transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-accent rounded-lg font-semibold transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
}

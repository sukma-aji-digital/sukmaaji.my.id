"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSortedProjectsData, getFeaturedProjects, type Project } from "@/lib/projects";

interface PortfolioSectionProps {
  projects?: Project[];
  featuredProjects?: Project[];
}

export default function PortfolioSection({
  projects: initialProjects,
  featuredProjects: initialFeaturedProjects,
}: PortfolioSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Use provided data or fallback to empty arrays
  const projects = initialProjects || [];
  const featuredProjects = initialFeaturedProjects || [];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects.length, isAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000); // Resume autoplay after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  return (
    <section id="portfolio" className="py-20 bg-dark-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white section-title inline-block">
            Project Portfolio
          </h2>
          <p className="text-slate-dark mt-4 max-w-2xl mx-auto">
            Showcase project terpilih yang telah saya kerjakan dengan berbagai teknologi modern
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Carousel Wrapper */}
          <div className="relative overflow-hidden rounded-2xl bg-dark-200 border border-dark-100">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProjects.map((project, index) => (
                <div key={project.slug} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-400/50 md:to-transparent"></div>

                      {/* Project Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-xs font-medium">
                          {project.status === "completed"
                            ? "Completed"
                            : project.status === "ongoing"
                            ? "In Progress"
                            : "Maintenance"}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="text-accent text-sm font-medium">
                          {project.client || "Personal"} • {project.year}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-slate-dark mb-6 leading-relaxed">
                        {project.shortDescription || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-dark-100 text-slate-light border border-dark-100 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs bg-dark-100 text-slate-light border border-dark-100 px-3 py-1 rounded-full">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          <i className="fas fa-eye mr-2"></i>
                          Lihat Detail
                        </Link>

                        <div className="flex gap-3">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center border border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-colors"
                              title="Live Demo"
                            >
                              <i className="fas fa-external-link-alt mr-2"></i>
                              Live Demo
                            </a>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center border border-slate-dark text-slate-dark hover:text-white hover:border-white px-4 py-3 rounded-lg transition-colors"
                              title="GitHub"
                            >
                              <i className="fab fa-github text-lg"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-300/80 hover:bg-dark-200 text-white p-3 rounded-full transition-colors border border-dark-100"
            aria-label="Previous project"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-300/80 hover:bg-dark-200 text-white p-3 rounded-full transition-colors border border-dark-100"
            aria-label="Next project"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-accent" : "bg-slate-dark hover:bg-slate-light"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Indicator */}
          <div className="flex justify-center items-center mt-4 gap-2 text-xs text-slate-dark">
            <div
              className={`w-2 h-2 rounded-full ${isAutoplay ? "bg-green-400" : "bg-slate-dark"}`}
            ></div>
            <span>{isAutoplay ? "Auto-playing" : "Paused"}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-dark-200 rounded-xl border border-dark-100">
            <div className="text-2xl font-bold text-accent mb-1">{projects.length}</div>
            <div className="text-sm text-slate-dark">Total Projects</div>
          </div>
          <div className="text-center p-4 bg-dark-200 rounded-xl border border-dark-100">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {projects.filter((p) => p.status === "completed").length}
            </div>
            <div className="text-sm text-slate-dark">Completed</div>
          </div>
          <div className="text-center p-4 bg-dark-200 rounded-xl border border-dark-100">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {Array.from(new Set(projects.map((p) => p.category))).length}
            </div>
            <div className="text-sm text-slate-dark">Categories</div>
          </div>
          <div className="text-center p-4 bg-dark-200 rounded-xl border border-dark-100">
            <div className="text-2xl font-bold text-purple-400 mb-1">{featuredProjects.length}</div>
            <div className="text-sm text-slate-dark">Featured</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center border border-accent text-accent px-8 py-4 rounded-lg font-medium hover:bg-accent/10 transition-colors group"
          >
            <i className="fas fa-folder-open mr-3 group-hover:scale-110 transition-transform"></i>
            Show All Projects
            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

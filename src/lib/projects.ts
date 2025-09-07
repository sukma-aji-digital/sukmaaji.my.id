import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "projects-data");

export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: string;
  status: "completed" | "ongoing" | "maintenance";
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  year: string;
  client?: string;
  content: string;
  contentHtml?: string;
  createdAt: string;
}

export function getSortedProjectsData(): Project[] {
  // Get file names under /projects-data
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        content: matterResult.content,
        title: matterResult.data.title || "",
        description: matterResult.data.description || "",
        shortDescription: matterResult.data.shortDescription || matterResult.data.description || "",
        technologies: matterResult.data.technologies || [],
        category: matterResult.data.category || "Web Development",
        status: matterResult.data.status || "completed",
        featured: matterResult.data.featured || false,
        demoUrl: matterResult.data.demoUrl || "",
        githubUrl: matterResult.data.githubUrl || "https://github.com/sukmaajidigital",
        image: matterResult.data.image || "/images/project/default.jpg",
        year: matterResult.data.year || new Date().getFullYear().toString(),
        client: matterResult.data.client || "",
        createdAt:
          matterResult.data.createdAt ||
          matterResult.data.year ||
          new Date().getFullYear().toString(),
      } as Project;
    });

  // Sort projects by year and featured status
  return allProjectsData.sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then by year (newest first)
    if (a.year > b.year) return -1;
    if (a.year < b.year) return 1;

    return 0;
  });
}

export function getFeaturedProjects(): Project[] {
  const allProjects = getSortedProjectsData();
  return allProjects.filter((project) => project.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getSortedProjectsData();
  return allProjects.filter((project) => project.category.toLowerCase() === category.toLowerCase());
}

export function getAllProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getProjectData(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and html
    return {
      slug,
      content: matterResult.content,
      contentHtml,
      title: matterResult.data.title || "",
      description: matterResult.data.description || "",
      shortDescription: matterResult.data.shortDescription || matterResult.data.description || "",
      technologies: matterResult.data.technologies || [],
      category: matterResult.data.category || "Web Development",
      status: matterResult.data.status || "completed",
      featured: matterResult.data.featured || false,
      demoUrl: matterResult.data.demoUrl || "",
      githubUrl: matterResult.data.githubUrl || "https://github.com/sukmaajidigital",
      image: matterResult.data.image || "/images/project/default.jpg",
      year: matterResult.data.year || new Date().getFullYear().toString(),
      client: matterResult.data.client || "",
      createdAt:
        matterResult.data.createdAt ||
        matterResult.data.year ||
        new Date().getFullYear().toString(),
    };
  } catch (error) {
    console.error("Error reading project:", error);
    return null;
  }
}

export function getProjectCategories(): string[] {
  const allProjects = getSortedProjectsData();
  const categorySet = new Set(allProjects.map((project) => project.category));
  const categories = Array.from(categorySet);
  return categories.sort();
}

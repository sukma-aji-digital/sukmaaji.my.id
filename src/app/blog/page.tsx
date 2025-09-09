import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSortedPostsData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Sukma Aji Digital",
  description:
    "Artikel dan tulisan tentang teknologi, programming, dan dunia digital dari Muhammad Aji Sukma",
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-slate-dark text-lg max-w-2xl mx-auto">
              Artikel dan tulisan tentang teknologi, programming, dan dunia digital
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-file-alt text-slate-dark text-6xl mb-6"></i>
              <h3 className="text-2xl text-white mb-4">Belum ada artikel</h3>
              <p className="text-slate-dark">
                Artikel blog sedang dalam proses penulisan. Silakan kembali lagi nanti!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-dark-200 rounded-2xl overflow-hidden border border-dark-100 card-hover"
                >
                  <div className="h-48 bg-dark-100 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-file-alt text-slate-dark text-3xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-accent transition">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-slate-dark text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-dark">
                        {new Date(post.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-accent hover:text-accent-light text-sm font-medium"
                      >
                        Baca selengkapnya <i className="fas fa-arrow-right ml-1 text-xs"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

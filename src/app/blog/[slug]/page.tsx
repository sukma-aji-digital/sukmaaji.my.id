import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CopyLinkButton, CopyLinkCard } from "@/components/ShareButtons";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { getPostData, getAllPostSlugs, getSortedPostsData } from "@/lib/blog";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ params }) => ({
    slug: params.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Sukma Aji Digital",
    };
  }

  return {
    title: `${post.title} - Blog Sukma Aji Digital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  // Get other blog posts for sidebar
  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts.filter((p) => p.slug !== params.slug).slice(0, 5);

  const currentUrl = `https://sukmaaji.my.id/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-dark-400">
        <div className="container mx-auto px-6 py-16">
          {/* Back to blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-accent hover:text-accent-light mb-8 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Blog
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-dark-300 rounded-2xl p-8 border border-dark-100">
                {/* Article header */}
                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex items-center text-slate-dark text-sm">
                    <div className="flex items-center mr-4">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-user text-white text-xs"></i>
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <span className="mx-3">•</span>
                    <time dateTime={post.date} className="flex items-center">
                      <i className="far fa-calendar mr-2"></i>
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </header>

                {/* Article content */}
                <div
                  className="blog-content prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article footer */}
                <footer className="mt-12 pt-8 border-t border-dark-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-accent hover:text-accent-light transition group"
                    >
                      <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
                      Artikel Lainnya
                    </Link>

                    <div className="flex items-center space-x-4">
                      <span className="text-slate-dark text-sm">Bagikan:</span>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-dark hover:text-blue-400 transition p-2 hover:bg-blue-400/10 rounded-lg"
                        title="Bagikan ke Twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-dark hover:text-blue-600 transition p-2 hover:bg-blue-600/10 rounded-lg"
                        title="Bagikan ke LinkedIn"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-dark hover:text-blue-500 transition p-2 hover:bg-blue-500/10 rounded-lg"
                        title="Bagikan ke Facebook"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                      <CopyLinkButton url={currentUrl} title="Salin Link" />
                    </div>
                  </div>
                </footer>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Share Card */}
              <div className="bg-dark-300 rounded-2xl p-6 border border-dark-100 top-24">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <i className="fas fa-share-alt mr-2 text-accent"></i>
                  Bagikan Artikel
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition p-3 rounded-lg group"
                  >
                    <i className="fab fa-twitter mr-2 group-hover:scale-110 transition-transform"></i>
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition p-3 rounded-lg group"
                  >
                    <i className="fab fa-linkedin mr-2 group-hover:scale-110 transition-transform"></i>
                    LinkedIn
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition p-3 rounded-lg group"
                  >
                    <i className="fab fa-facebook mr-2 group-hover:scale-110 transition-transform"></i>
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-500/10 text-green-500 hover:bg-green-500/20 transition p-3 rounded-lg group"
                  >
                    <i className="fab fa-whatsapp mr-2 group-hover:scale-110 transition-transform"></i>
                    WhatsApp
                  </a>
                </div>
                <CopyLinkCard url={currentUrl} title="Salin Link" />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-dark-300 rounded-2xl p-6 border border-dark-100">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <i className="fas fa-newspaper mr-2 text-accent"></i>
                    Artikel Terkait
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost, index) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group hover:bg-dark-200 transition p-4 rounded-xl border border-transparent hover:border-dark-100"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-accent/20 text-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium group-hover:text-accent transition line-clamp-2 text-sm">
                              {relatedPost.title}
                            </h4>
                            <p className="text-slate-dark text-xs mt-1 flex items-center">
                              <i className="far fa-calendar mr-1"></i>
                              {new Date(relatedPost.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-accent hover:text-accent-light mt-4 text-sm group"
                  >
                    Lihat Semua Artikel
                    <i className="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              )}

              {/* Author Info */}
              <div className="bg-dark-300 rounded-2xl p-6 border border-dark-100">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <i className="fas fa-user-circle mr-2 text-accent"></i>
                  Tentang Penulis
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{post.author}</h4>
                    <p className="text-slate-dark text-sm">Full Stack Developer</p>
                  </div>
                </div>
                <p className="text-slate-dark text-sm mb-4">
                  Passionate full-stack developer dengan pengalaman dalam mengembangkan aplikasi web
                  modern menggunakan Laravel, Next.js, dan teknologi terkini lainnya.
                </p>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/sukmaajidigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-dark hover:text-white transition"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/sukmaaji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-dark hover:text-blue-600 transition"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="mailto:hello@sukmaaji.my.id"
                    className="text-slate-dark hover:text-accent transition"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <NewsletterSubscription />

              {/* Tags */}
              <div className="bg-dark-300 rounded-2xl p-6 border border-dark-100">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <i className="fas fa-tags mr-2 text-accent"></i>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-accent/10 text-accent border border-accent/20 px-3 py-2 rounded-full hover:bg-accent/20 transition cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

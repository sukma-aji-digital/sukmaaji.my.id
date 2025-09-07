import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostData, getAllPostSlugs } from "@/lib/blog";

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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <article className="container mx-auto px-6 py-16 max-w-4xl">
          {/* Back to blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-accent hover:text-accent-light mb-8 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Blog
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-slate-dark text-sm">
              <span>Oleh {post.author}</span>
              <span className="mx-3">•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {/* Article content */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100">
            <div
              className="prose prose-invert prose-accent max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-accent prose-strong:text-white prose-code:text-accent prose-pre:bg-dark-300 prose-pre:border prose-pre:border-dark-100"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Article footer */}
          <footer className="mt-12 pt-8 border-t border-dark-100">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center text-accent hover:text-accent-light transition"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Artikel Lainnya
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-slate-dark text-sm">Bagikan:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(`https://sukmaaji.my.id/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-dark hover:text-accent transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://sukmaaji.my.id/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-dark hover:text-accent transition"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}

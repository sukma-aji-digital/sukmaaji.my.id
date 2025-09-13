import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MathGame from "./MathGame";

export const metadata: Metadata = {
  title: "Math Games - Sukmaaji Digital",
  description:
    "Temukan berbagai permainan edukasi matematika yang menyenangkan dan menantang di Sukmaaji Digital.",
  keywords: [
    "Math Games",
    "Educational Games",
    "Sukmaaji Digital",
    "Fun Learning",
    "Sukmaaji Digital",
    "Web Developer Indonesia",
    "API Development",
    "MySQL",
    "Tech Enthusiast",
    "Freelance Developer",
  ],
  authors: [{ name: "Muhammad Aji Sukma" }],
  creator: "Muhammad Aji Sukma",
  publisher: "Sukmaaji Digital",
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
  openGraph: {
    title: "Math Games - Sukmaaji Digital",
    description:
      "Temukan berbagai permainan edukasi matematika yang menyenangkan dan menantang di Sukmaaji Digital.",
    url: "https://sukmaaji.my.id/games/math",
    siteName: "Sukmaaji Digital",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        width: 800,
        height: 800,
        alt: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Games - Sukmaaji Digital",
    description:
      "Temukan berbagai permainan edukasi matematika yang menyenangkan dan menantang di Sukmaaji Digital.",
    images: [
      {
        url: "https://sukmaaji.my.id/images/ajipro.jpg",
        alt: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
      },
    ],
    creator: "@sukmaajidigital",
  },
  alternates: {
    canonical: "https://sukmaaji.my.id/me",
  },
  other: {
    "profile:first_name": "Muhammad Aji",
    "profile:last_name": "Sukma",
    "profile:username": "sukmaajidigital",
    "article:author": "Muhammad Aji Sukma",
    "og:profile:first_name": "Muhammad Aji",
    "og:profile:last_name": "Sukma",
    "og:profile:username": "sukmaajidigital",
  },
};

export default function GamesPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Muhammad Aji Sukma",
            alternateName: ["Aji Sukma", "Sukma Aji"],
            description: "Backend Developer & Tech Enthusiast, Founder of Sukmaaji Digital",
            url: "https://sukmaaji.my.id/me",
            image: {
              "@type": "ImageObject",
              url: "https://sukmaaji.my.id/images/ajipro.jpg",
              width: 800,
              height: 800,
              caption: "Muhammad Aji Sukma - Backend Developer & Tech Enthusiast",
            },
            sameAs: [
              "https://www.linkedin.com/in/sukmaaji/",
              "https://github.com/sukmaajidigital",
              "https://wa.me/6285179742322",
            ],
            email: "sukmaajidigital@gmail.com",
            telephone: "+62-851-7974-2322",
            jobTitle: "Backend Developer & Founder",
            worksFor: {
              "@type": "Organization",
              name: "Sukmaaji Digital",
              url: "https://sukmaaji.my.id",
            },
            knowsAbout: [
              "Laravel",
              "PHP",
              "MySQL",
              "API Development",
              "Backend Development",
              "Web Development",
              "JavaScript",
              "Tailwind CSS",
              "Git",
              "Docker",
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Backend Developer",
              description:
                "Developing web applications and information systems using Laravel and PHP",
              skills: "Laravel, PHP, MySQL, API Development, JavaScript",
            },
            foundedOrganization: {
              "@type": "Organization",
              name: "Sukmaaji Digital",
              description:
                "Digital services company focusing on web development and information systems",
              foundingDate: "2022",
              url: "https://sukmaaji.my.id",
            },
          }),
        }}
      />


      {/* <Footer /> */}
    </>
  );
}

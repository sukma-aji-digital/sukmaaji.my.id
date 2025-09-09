import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  const humansContent = `/* TEAM */
Developer: Muhammad Aji Sukma
Contact: sukmaajidigital@gmail.com
Twitter: @sukmaaji
From: Kudus, Central Java, Indonesia

/* THANKS */
Design inspiration: Modern web design trends
Technologies: Next.js, Tailwind CSS, TypeScript
Icons: Font Awesome, Heroicons
Fonts: Inter (Google Fonts)

/* SITE */
Last update: ${new Date().toLocaleDateString("id-ID")}
Language: Indonesian / English
Doctype: HTML5
IDE: Visual Studio Code
Standards: HTML5, CSS3, JavaScript ES6+
Components: React, Next.js, Tailwind CSS
Software: Git, Node.js, npm

/* CONTACT */
Website: ${baseUrl}
Email: sukmaajidigital@gmail.com
Location: Kudus, Central Java, Indonesia
LinkedIn: linkedin.com/in/sukma-aji-08b470286
GitHub: github.com/sukmaajidigital

/* SPECIALTIES */
Backend Development: Laravel, PHP, MySQL
Frontend Development: React, Vue.js, JavaScript
API Development: RESTful APIs, GraphQL
Database Design: MySQL, PostgreSQL
Server Management: Linux, Nginx, Apache
Version Control: Git, GitHub

/* VALUES */
- Clean, maintainable code
- User-centered design
- Performance optimization
- Security best practices
- Continuous learning
- Open source contribution

                              __
                            .d$$b
                          .' TO$;\\
                         /  : TP._;
                        / _.;  :Tb|
                       /   /   ;j$j
                   _.-"       d$$$$
                 .' ..       d$$$$;
                /  /P'      d$$$$P. |\\
               /   "      .d$$$P' |\\^"l
             .'           \`T$P^"""""  :
         ._.'      _.'                ;
      \`-.-".-'-' ._.       _.-"    .-"
    \`.-" _____  ._              .-"
   -(.g$$$$$$$b.              .'
     ""^^T$$$P^)            .(:
       _/  -"  /.'         /:/;
    ._.'-'\`-'  ")/         /;/;
 \`-.-"..--""   " /         /  ;
.-" ..--""        -'          :
..--""--.-"         (\\      .-(\\
  ..--""              \`-\\(\\/;-"
    _.                      :
                            ;`;

  return new NextResponse(humansContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

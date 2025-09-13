import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sukmaaji.my.id";

  const securityContent = `Contact: mailto:sukmaajidigital@gmail.com
Contact: ${baseUrl}/#contact
Expires: 2025-12-31T23:59:59.000Z
Encryption: https://keys.openpgp.org/search?q=sukmaajidigital%40gmail.com
Preferred-Languages: id, en
Canonical: ${baseUrl}/.well-known/security.txt
Policy: ${baseUrl}/security-policy
Acknowledgments: ${baseUrl}/security-acknowledgments
Hiring: ${baseUrl}/#contact

# Security contact information for Sukma Aji Digital
# If you discover a security vulnerability, please report it responsibly.
# We appreciate your help in making our website more secure.`;

  return new NextResponse(securityContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

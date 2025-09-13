import { NextResponse } from "next/server";

export async function GET() {
  // Ads.txt content for advertising networks
  const adsContent = `# Ads.txt file for sukmaaji.my.id
# This file helps prevent advertising fraud and ensures transparency

# Google AdSense (replace pub-XXXXXXXXX with your actual publisher ID)
# google.com, pub-XXXXXXXXX, DIRECT, f08c47fec0942fa0

# Add other advertising networks here as needed
# Example formats:
# facebook.com, 12345, DIRECT
# amazon-adsystem.com, 12345, DIRECT

# Variables section
# CONTACT=sukmaajidigital@gmail.com
# SUBDOMAIN=sukmaaji.my.id

# Note: This file is currently configured for future use
# Uncomment and modify the entries above when you have advertising partnerships`;

  return new NextResponse(adsContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

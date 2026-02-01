"use client";

import { useEffect, useRef, useState } from "react";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all pre > code elements
    const codeBlocks = contentRef.current.querySelectorAll("pre");

    codeBlocks.forEach((pre, index) => {
      // Check if copy button already exists
      if (pre.querySelector(".copy-code-btn")) return;

      // Create wrapper for positioning
      pre.style.position = "relative";

      // Get the language from code element class (if any)
      const codeElement = pre.querySelector("code");
      const langClass = codeElement?.className || "";
      const langMatch = langClass.match(/language-(\w+)/);
      const language = langMatch ? langMatch[1] : "";

      // Create header container
      const headerContainer = document.createElement("div");
      headerContainer.className =
        "code-block-header flex items-center justify-between bg-dark-100 px-4 py-2 rounded-t-lg border-b border-dark-50 -mx-4 -mt-4 mb-4";

      // Language label
      const langLabel = document.createElement("span");
      langLabel.className = "text-xs text-slate-dark font-mono uppercase";
      langLabel.textContent = language || "code";

      // Copy button
      const copyBtn = document.createElement("button");
      copyBtn.className =
        "copy-code-btn flex items-center gap-2 text-xs text-slate-dark hover:text-accent transition-colors px-2 py-1 rounded hover:bg-dark-200";
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="copy-text">Copy</span>
      `;

      copyBtn.addEventListener("click", async () => {
        const code = codeElement?.textContent || pre.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          const copyText = copyBtn.querySelector(".copy-text");
          if (copyText) {
            copyText.textContent = "Copied!";
            copyBtn.classList.add("text-green-400");
            setTimeout(() => {
              copyText.textContent = "Copy";
              copyBtn.classList.remove("text-green-400");
            }, 2000);
          }
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      headerContainer.appendChild(langLabel);
      headerContainer.appendChild(copyBtn);

      // Insert header at the beginning of pre
      pre.insertBefore(headerContainer, pre.firstChild);
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="blog-content max-w-none prose-invert break-words"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

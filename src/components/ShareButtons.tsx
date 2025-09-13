"use client";

interface ShareButtonProps {
  url: string;
  title: string;
}

export function CopyLinkButton({ url, title }: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add toast notification here
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="text-slate-dark hover:text-green-400 transition p-2 hover:bg-green-400/10 rounded-lg"
      title={title}
    >
      <i className="fas fa-copy"></i>
    </button>
  );
}

export function CopyLinkCard({ url, title }: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add toast notification here
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="w-full mt-3 flex items-center justify-center bg-accent/10 text-accent hover:bg-accent/20 transition p-3 rounded-lg group"
    >
      <i className="fas fa-copy mr-2 group-hover:scale-110 transition-transform"></i>
      Salin Link
    </button>
  );
}

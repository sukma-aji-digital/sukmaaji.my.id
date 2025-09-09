"use client";

import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Here you can integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      // For now, we'll just simulate the subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("Terima kasih! Anda telah berhasil berlangganan.");
      setEmail("");
    } catch (error) {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-accent/10 to-accent-dark/10 border border-accent/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <i className="fas fa-bell mr-2 text-accent"></i>
        Stay Updated
      </h3>
      <p className="text-slate-dark text-sm mb-4">
        Dapatkan notifikasi artikel terbaru dan update project langsung ke email Anda.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email Anda"
          className="w-full bg-dark-200 border border-dark-100 text-white placeholder-slate-dark px-4 py-3 rounded-lg focus:outline-none focus:border-accent transition"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-paper-plane mr-2"></i>
          )}
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.includes("Terima kasih") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

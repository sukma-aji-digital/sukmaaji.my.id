"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cv-print-btn"
      aria-label="Cetak CV"
    >
      <i className="fas fa-print"></i>
      Cetak / Download PDF
    </button>
  );
}

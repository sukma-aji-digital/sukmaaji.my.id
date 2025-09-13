import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-dark-300 rounded-xl border border-dark-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                  <i
                    className={`fas fa-chevron-down text-accent transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </button>
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "pb-6 opacity-100"
                    : "pb-0 opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-slate-dark leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

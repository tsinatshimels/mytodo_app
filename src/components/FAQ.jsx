import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What services does Smart Hyperion provide?",
      answer:
        "We offer professional web design and development services to help businesses establish a strong online presence.",
    },
    {
      question: "Do you build custom websites?",
      answer:
        "Yes, we create fully customized websites tailored to meet the unique needs of our clients.",
    },
    {
      question: "How long does it take to develop a website?",
      answer:
        "The timeline depends on the project's complexity, but typically, a standard website takes 4-6 weeks.",
    },
    {
      question: "Do you provide website maintenance?",
      answer:
        "Yes, we offer ongoing maintenance and support to ensure your website stays updated and secure.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Frequently Asked Questions
      </h1>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              {faq.question}
            </h2>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

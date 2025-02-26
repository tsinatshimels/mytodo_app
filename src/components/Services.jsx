import React from "react";

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
      <p className="mt-4 text-gray-600">
        At Smart Hyperion, we specialize in professional web design and
        development, helping businesses create high-performing, visually
        stunning websites tailored to their needs.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Web Design</h2>
          <p className="mt-2 text-gray-600">
            We craft stunning and user-friendly website designs that align with
            your brand identity and business goals.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">
            Web Development
          </h2>
          <p className="mt-2 text-gray-600">
            Our expert developers build responsive, high-performance websites
            using modern technologies to ensure scalability and efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}

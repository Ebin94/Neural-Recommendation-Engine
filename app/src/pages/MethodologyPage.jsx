import React from 'react';

export default function MethodologyPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Methodology & Architecture</h1>
      
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 block">Overall Architecture</h2>
          <p>
            This demo showcases an offline-trained recommendation system with a fully static, frontend-only inference architecture. 
            It is designed to be extremely fast and run entirely on Vercel without backend dependencies.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 block">1. Offline Pipeline</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Preprocessing:</strong> Raw interaction logs are cleaned to extract feature matrices and item metadata.</li>
            <li><strong>Model Training:</strong> A machine learning model learns user and item representations.</li>
            <li><strong>Candidate Generation:</strong> The model scores all possible user-item pairs and generates a Top-N ranking per user segment.</li>
            <li><strong>Artifact Export:</strong> These precomputed rankings, alongside detailed explanations, are serialized into lightweight JSON.</li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 block">2. Frontend Pipeline</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Loading:</strong> React dynamically loads the JSON artifacts at runtime.</li>
            <li><strong>Explanation Engine:</strong> Reasons for recommendation are rendered transparently using deterministic rules from the output metadata.</li>
            <li><strong>Re-ranking:</strong> Simple UI toggles allow adjusting the precomputed ranking to account for diversity, novelty, or specific business goals.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

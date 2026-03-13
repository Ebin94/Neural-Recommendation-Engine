# Neural Recommendation Engine

A portfolio-ready, frontend-heavy recommendation web app that demonstrates segment-aware recommendations, lightweight explainability, and business-focused re-ranking—all running entirely in the browser without a backend.

![Screenshot Placeholder](https://via.placeholder.com/800x400?text=App+Screenshot)

## 📌 Features

- **Segment-Aware Ranking:** Recommender logic tailored to specific user personas (Budget, Premium, Gaming, Smart Home).
- **Explainable AI:** Deterministic reason-generation showing users exactly *why* a product was recommended.
- **Business Insights Dashboard:** Aggregated data visualizations of recommendation performance and item exposure.
- **Serverless Architecture:** 100% static JSON inference payload exported from an offline Python training pipeline, deployable on Vercel for free.
- **Modern UI/UX:** Responsive layouts, micro-interactions, Recharts, and Lucide Icons built with React and Tailwind CSS.

## 🏗️ Architecture

```mermaid
graph TD
    subgraph Offline_Pipeline_Python
        A[Data Generator] --> B[Feature Engineering]
        B --> C[Candidate Generation]
        C --> D[Rank and Explain Engine]
        D --> E[Export JSON]
    end

    subgraph Frontend_Client_React
        E --> F[Vite Runtime]
        F --> G[Static JSON Loader]
        G --> H[Recommendation UI]
        G --> I[Insights Dashboard]
        G --> J[Methodology Page]
    end

## 🚀 Quick Setup & Local Development

### 1. The React App
```bash
cd app
npm install
npm run dev
```

### 2. The Machine Learning Pipeline
If you would like to regenerate the synthetic dataset or modify the recommendation logic:
```bash
cd model/scripts
pip install pandas numpy scikit-learn
python pipeline.py
```
This script will recreate the mocked dataset, score the candidates, and auto-export the necessary `users.json`, `items.json`, `recommendations.json`, `insights.json`, `segments.json`, and `prompts.json` back directly into the `app/public/data` directory.

## ☁️ Deployment

This project is perfectly scaled to deploy as a **static site on Vercel**.

1. Commit and push this repo to GitHub.
2. Sign in to Vercel and import this repository.
3. Configure the Root Directory as `app`.
4. Framework Preset: **Vite**.
5. Build and Deploy. All JSON files in `public/data` will automatically be served over Vercel's global CDN!

## Resume / Portfolio Bullets

- **Architected a serverless recommendation engine prototype** achieving sub-10ms response times by precomputing top-N candidates and inference features in Python and exporting payloads dynamically into a React static site.
- **Designed explainability logic** mapping latent recommendation scores to human-readable metadata, matching persona affinity and price-sensitivity models.
- **Built an interactive analytics dashboard** using Recharts to visualize segment performance, top exposure metrics, and pricing distribution across deployed inference payloads.

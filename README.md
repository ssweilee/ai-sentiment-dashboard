# Audience Sentiment & Trend Dashboard

AI-powered dashboard for audience sentiment, trend analysis & engagement insights (films & TV series).


---

## 💡 Use Case
* Monitor audience reactions during releases.
* Identify trending topics & sentiment shifts.
* Make data-driven decisions for content producers.

---

## 🧩 Key Features

* **AI Insights:** NLP & sentiment analysis via AWS Bedrock.
* **Interactive Dashboard:** Recharts & TailwindCSS for engagement trends.
* **Serverless Backend:** AWS Lambda + SQS for scalable, asynchronous processing.
* **Reliable Storage & Deployment:** S3/DynamoDB + AWS Amplify.

---

## 🏗️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Next.js, TypeScript, TailwindCSS, Recharts |
| **Backend** | AWS Lambda (Python), API Gateway, SQS, S3, DynamoDB |
| **AI/NLP** | AWS Bedrock (Claude 3 Sonnet), LLM, Sentiment Analysis |
| **Infrastructure** | Serverless Architecture, Event-Driven Processing, Amplify Deployment |
| **Version Control / DevOps** | Git, AWS Amplify (CI/CD) |

---

## 🧠 System Architecture

<pre>
Frontend (Next.js)
       ↓
API Routes (Next.js)
       ↓
AWS API Gateway
       ↓
Lambda fetch
    ↓
SQS (async queue)
    ↓
Lambda analyze → AWS Bedrock → S3
    ↓ (S3 trigger)
Lambda aggregate → generate insights → S3
       ↓
Frontend renders insights
</pre>

---

## 📈 Key Results
* Reduced data processing latency by **75%** via asynchronous processing.
* Delivered **visualizations** for actionable audience insights.
* Demonstrated a **production-ready serverless AI pipeline** for scalable cloud deployment.

---

## 💼 Business Impact
* Social media sentiment monitoring for content producers.
* Audience engagement & content performance tracking.
* Supports data-driven decisions.

---

## 🤖 Future Improvements
* Complete NLP preprocessing pipeline.
* Microservice architecture for sentiment analysis & data fetching
* Enhanced interactive charts with drill-down & real-time updates
* Historical trend filtering (weekly/monthly/yearly)

---

🧑‍💻 Author
Developed independently by **Sandy Lee**, demonstrating applied AI, cloud computing, and full-stack development.



# Audience Sentiment & Trend Dashboard

_AI-powered dashboard for audience sentiment, trend analysis & engagement insights (films & TV series)._
<br></br>
![Dashboard Demo](./dashboard-screenshot.svg)

---

## Use Case
* Monitor audience reactions during releases.
* Identify trending topics & sentiment shifts.
* Support data-driven decisions for content producers and marketing teams
  
---

## Key Features

* **AI Insights:** NLP & sentiment analysis via AWS Bedrock.
* **Interactive Dashboard:** Recharts & TailwindCSS for engagement trends.
* **Serverless Backend:** AWS Lambda + SQS for scalable, asynchronous processing.
* **Reliable Storage & Deployment:** S3/DynamoDB + AWS Amplify.
* **Automated Deployment:** AWS Amplify with CI/CD pipeline deployment.


---

## Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Next.js, TypeScript, TailwindCSS, Recharts |
| **Backend** | AWS Lambda (Python), API Gateway, SQS, S3, DynamoDB |
| **AI/NLP** | AWS Bedrock (Claude 3 Sonnet), LLM Integration, Sentiment Analysis |
| **Infrastructure** | Serverless Architecture, Event-Driven Processing, Amplify Deployment |
| **Version Control / DevOps** | Git, AWS Amplify (CI/CD) |

---

## System Architecture

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

## Key Results
* Reduced data processing latency by **~83% (from ~3 minutes to <30 seconds)** via asynchronous processing.
* Delivered **user-friendly visual** dashboards for actionable audience insights.
* Demonstrated a **production-ready serverless AI pipeline** for scalable cloud deployment.

---

## Business Impact
* Social media sentiment monitoring for content producers.
* Facilitates data-driven decision making for marketing and release strategies. 
* Supports scalable deployment for future series/film monitoring across global markets.

---

## Getting Started
The live demo is private due to usage limits, feel free to contact me for access :)

## Future Improvements
* Complete NLP preprocessing pipeline.
* Microservice architecture for sentiment analysis & data fetching
* Enhance charts with drill-down, filters (weekly / monthly / yearly) and live streaming updates
* Expand dataset to cover multiple languages and media markets  

---

🧑‍💻 Author
Developed independently by **Sandy Lee**, demonstrating applied AI, cloud computing, and full-stack development.








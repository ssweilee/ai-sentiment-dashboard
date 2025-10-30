# Audience Sentiment & Trend Dashboard

An AI-powered analytics dashboard providing audience sentiment and engagement insights for films and TV series.  
Built for media and entertainment companies to monitor perception, engagement, and emerging topics using **serverless cloud architecture** and **AI-powered NLP**.

---

## 💡 Use Case
Marketing and content teams can use this dashboard to:
* Monitor audience reactions during releases.
* Identify trending topics and sentiment shifts.
* Make data-driven marketing and content decisions.

---

## 🧩 Key Features

**AI-Powered Insights**
* Performs NLP and sentiment analysis using **AWS Bedrock (Claude 3 Sonnet LLM)**.
* Generates concise trend summaries and engagement metrics.

**Interactive Dashboard**
* Visualizes sentiment and engagement trends with **Recharts** and **TailwindCSS**.

**Scalable Serverless Backend**
* Built with **AWS Lambda (Python)** and orchestrated via **API Gateway**.
* **SQS** handles asynchronous task processing to reduce latency and improve throughput.

**Reliable Cloud Storage**
* Stores processed insights and metadata in **S3** and **DynamoDB**.

**Continuous Deployment**
* Automated serverless deployment via **AWS Amplify**.

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

## 📈 Key Results
* Reduced data processing latency by **75%** via asynchronous processing.
* Delivered **visualizations** for actionable audience insights.
* Demonstrated a **production-ready serverless AI pipeline** for scalable cloud deployment.

---

## 💼 Business Impact
* Social media sentiment monitoring for **content producers**.
* Audience engagement and content performance tracking.
* Supports **data-driven decisions for content producers**.

---

## 🤖 Future Improvements
* Build a **complete NLP preprocessing pipeline**.  
* Decouple sentiment analysis and data fetching into **microservices**.  
* Enhance charts with **drill-down, interactive filters, and real-time updates**.  
* Add **historical trend filtering** (weekly, monthly, yearly) for flexible insights.  
* Suggest **recent popular keywords** in the input box.  
* Improve **token handling** for security.  
---

🧑‍💻 Author
Developed independently by **Sandy Lee**, demonstrating applied AI, cloud computing, and full-stack development.

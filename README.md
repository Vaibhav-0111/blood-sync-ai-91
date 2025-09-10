# 🌿 Sanjeevani AI – About the Project(backend coming soon)

## 💡 Inspiration

Thalassemia patients require lifelong blood transfusions, regular medical attention, and emotional support. In India, many of these patients—especially children—suffer due to:

- Difficulty finding timely blood donors  
- Lack of awareness about Thalassemia care  
- Poor healthcare connectivity in remote areas  

Our inspiration came from the idea of **"Sanjeevani Booti"** — the mythological life-saving herb from the Indian epic *Ramayana*. We wanted to recreate that concept using modern tools — **AI and technology** — to bring hope and support to **real-life warriors battling Thalassemia**.

---

## 🔧 How We Built It

We created **Sanjeevani AI** as a full-stack, AI-powered mobile-first platform with the following major components:

### 🔹 AI Donor Prediction Engine
We used time-series donation data and user behavior patterns to build a machine learning model that predicts donor availability:
- Model: `XGBoost` and `Random Forest`
- Input Features: Previous donation dates, location, health status, frequency
- Output: Probability of availability within next 7/14 days

\\[
P(\text{available}) = f(\text{donation\_history}, \text{location}, \text{blood\_group}, \text{health\_status})
\\]

### 🔹 Real-Time Matching & Notifications
- Firebase and GeoFire for live donor-patient matching
- Google Maps API for routing
- WhatsApp Cloud API for instant communication

### 🔹 AI Health Assistant
We fine-tuned a lightweight transformer model for multilingual support to guide patients on:
- Symptoms tracking
- Medication reminders
- Education about Thalassemia

Vector search (FAISS) powers contextual memory for personalized chats.

### 🔹 Unified Care Dashboard
Built using **Flutter** and **React** for:
- Patients to manage transfusions and care logs
- Donors to track impact and rewards
- Blood Warriors to monitor demand and analytics

---

## 📚 What We Learned

- **AI works best when paired with human empathy** — designing a solution for sensitive medical use taught us the importance of ethical design and privacy.
- Building **region-aware, multilingual systems** is critical for inclusivity.
- Real-world healthcare solutions need strong **interoperability** with national systems like **e-RaktKosh**.

---

## ⚠️ Challenges We Faced

- 🔐 Ensuring **data privacy** while handling sensitive health information
- 📶 Making the platform **usable offline or in low-connectivity regions**
- 🧠 Training AI on **limited medical data** while maintaining accuracy
- 🌐 Integrating APIs from **government systems** with authentication barriers
- 🌍 Designing for **diverse user needs** — patients, donors, doctors, NGOs

---

## 🌈 What Keeps Us Going

The vision that **one click, one donor, or one reminder** from Sanjeevani AI could **save a life** — and that technology can truly become today’s *Sanjeevani Booti*.

> _"Technology should not just be smart. It should be humane."_ 💚


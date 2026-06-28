# WatcherAI – AI-Powered Flood Prediction & Landslide Risk Assessment Platform

## Overview

Natural disasters such as floods and landslides cause extensive damage to lives, infrastructure, and the environment every year. Traditional monitoring methods often require manual intervention and are often unable to provide rapid analysis for disaster management.

WatcherAI is a full-stack disaster monitoring platform that combines Deep Learning, Computer Vision, Weather APIs, and Interactive Mapping to assist users in identifying flood-prone regions and evaluating landslide risks in real time.

The platform enables users to:

* Predict whether an uploaded satellite or aerial image contains flood conditions.
* Analyze landslide risk using real-time weather parameters.
* Explore satellite imagery of major Indian cities.
* Visualize disaster-prone regions through interactive maps.
* Understand flood prediction confidence using AI.

---

## Features

### AI Flood Prediction

* Upload satellite or aerial images.
* MobileNet-based CNN classifies images into:

  * Flood
  * No Flood
* Displays prediction confidence.

### Landslide Risk Assessment

Uses live weather information from OpenWeather API including:

* Humidity
* Rainfall
* Weather conditions

Automatically classifies cities into:

* Low Risk
* Moderate Risk
* High Risk

### Satellite Monitoring

Interactive satellite map built using Leaflet.

Features include:

* Satellite imagery
* City markers
* Risk indicators
* Search functionality
* Interactive popups

### Interactive Visualizations

Includes:

* Flood Monitoring Dashboard
* Heatmaps
* Satellite View
* Accuracy Visualization
* Disaster Analytics

---

## Machine Learning Model

WatcherAI uses a Convolutional Neural Network trained for binary flood classification.

Model Characteristics:

* MobileNet Architecture
* TensorFlow / Keras
* Image Size: 224 × 224
* RGB Images
* Binary Classification

Output:

* FLOOD
* NO FLOOD

Prediction confidence is displayed alongside every inference.

---

## System Architecture

```text
              User
                │
                ▼
        React + TypeScript
                │
                ▼
          FastAPI Backend
          ├───────────────┐
          │               │
          ▼               ▼
 TensorFlow Model   OpenWeather API
          │               │
          └───────┬───────┘
                  ▼
          Prediction Results
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Leaflet
* Leaflet

### Backend

* FastAPI
* TensorFlow
* NumPy
* Pillow
* Python
* Requests

### APIs

* OpenWeather API

### Deployment

Frontend

* Vercel

Backend

* Render

---

## Project Structure

```text
WatcherAI/

├── backend/
│   ├── app.py
│   ├── models/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       └── vite.config.ts
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/WatcherAI.git
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload
```

### Frontend

```bash
cd frontend/vite-project

npm install

npm run dev
```

---

## API Endpoints

### Flood Prediction

**POST** `/predict`

Returns:

```json
{
  "prediction": "FLOOD",
  "confidence": 97.42
}
```

### Landslide Risk

**GET** `/landslide-risk/{city}`

Returns:

```json
{
  "city": "Delhi",
  "humidity": 76,
  "rainfall_mm": 12,
  "risk": "MODERATE"
}
```

---

## Future Enhancements

* Live satellite feeds
* Rainfall forecasting
* Historical flood analytics
* SMS and Email alerts
* IoT sensor integration
* Mobile application
* Multi-language support
* Disaster reporting portal

---

## Applications

WatcherAI can assist:

* Disaster Management Authorities
* Environmental Agencies
* Researchers
* NGOs
* Smart Cities
* Educational Institutions

---

## Contributing

Contributions are welcome.

Potential contribution areas include:

* UI/UX improvements
* Model optimization
* Dataset expansion
* API enhancements
* Bug fixes
* Documentation improvements

---

## Author

**Srajal Tripathi**

Bachelor of Technology – Computer Science & Engineering (Data Science)

GitHub: *Add your GitHub profile*

LinkedIn: *Add your LinkedIn profile*

---

## License

This project is developed for educational, research, and demonstration purposes.

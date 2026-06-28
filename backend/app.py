from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import requests
from dotenv import load_dotenv
load_dotenv()

# =========================
# CONFIG
# =========================

import os

API_KEY = os.getenv("OPENWEATHER_API_KEY")

# =========================
# FASTAPI
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD FLOOD MODEL
# =========================

print("===================================")
print("Loading WatcherAI model...")
print("===================================")

model = tf.keras.models.load_model(
    "models/floodnet_mobilenet.keras"
)

print("===================================")
print("Model loaded successfully!")
print("===================================")

# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "WatcherAI API Running"
    }

# =========================
# FLOOD PREDICTION
# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    img = Image.open(io.BytesIO(contents))
    img = img.convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = float(model.predict(img_array, verbose=0)[0][0])

    if prediction > 0.5:
        result = "NO FLOOD"
        confidence = prediction
    else:
        result = "FLOOD"
        confidence = 1 - prediction

    return {
        "prediction": result,
        "confidence": round(confidence * 100, 2)
    }

# =========================
# LANDSLIDE RISK
# =========================

@app.get("/landslide-risk/{city}")
def landslide_risk(city: str):

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}"
        f"&appid={API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return {
            "error": "City not found"
        }

    humidity = data["main"]["humidity"]

    rainfall = 0

    if "rain" in data:
        rainfall = data["rain"].get("1h", 0)

    if rainfall > 50 or humidity > 85:
        risk = "HIGH"

    elif rainfall > 20 or humidity > 70:
        risk = "MODERATE"

    else:
        risk = "LOW"

    return {
        "city": city,
        "humidity": humidity,
        "rainfall_mm": rainfall,
        "risk": risk
    }
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("===================================")
print("Loading WatcherAI model...")
print("===================================")

model = tf.keras.models.load_model(
    "backend/models/floodnet_mobilenet.keras"
)

print("===================================")
print("Model loaded successfully!")
print("===================================")

@app.get("/")
def home():
    return {
        "message": "WatcherAI API Running"
    }

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
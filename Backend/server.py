
from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    rainfall = data["rainfall"]
    temperature = data["temperature"]
    humidity = data["humidity"]
    river_level = data["river_level"]
    slope = data["slope"]

    input_data = np.array([[rainfall, temperature, humidity, river_level]])


    if rainfall >= 120 or river_level >= 8:
        flood = "High"
    elif rainfall >= 70 or river_level >= 5:
        flood = "Medium"
    else:
        flood = "Low"

   
    soil_moisture = humidity + (rainfall / 10)

    if rainfall > 100 and slope > 30 and soil_moisture > 80:
        landslide = "High"
    elif rainfall > 60 and slope > 20:
        landslide = "Medium"
    else:
        landslide = "Low"

    return jsonify({
        "flood": flood,
        "landslide": landslide
    })

if __name__ == "__main__":
    app.run(debug=True)

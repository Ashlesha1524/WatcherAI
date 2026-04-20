import streamlit as st
import requests
import numpy as np
import joblib

# ---------------- CONFIG ----------------
st.set_page_config(page_title="Watcher AI", layout="centered")

# ---------------- GLASS UI CSS ----------------
st.markdown("""
<style>

/* FULL BACKGROUND IMAGE */
.stApp {
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
                url("https://images.unsplash.com/photo-1500375592092-40eb2168fd21");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* TITLE */
.title {
    font-size: 66px;
    font-weight: 600;
    color: white;
}

/* INPUT */
.stTextInput input, .stNumberInput input {
    border-radius: 10px !important;
    background: grey !important;
    color: white !important;
}

/* BUTTON */
.stButton>button {
    background: #ff9800;
    color: white;
    border-radius: 10px;
    padding: 10px 20px;
    border: none;
}

/* TEXT COLOR */
label, .stMarkdown, .stTextInput label {
    color: white !important;
}

</style>
""", unsafe_allow_html=True)

# ---------------- LOAD MODEL ----------------
model = joblib.load("model.pkl")

# ---------------- WEATHER FUNCTION ----------------
API_KEY = "1343383f430e4c58427d584117ab9695"  
def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url)
    data = res.json()

    if data.get("cod") != 200:
        return None

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"]
    }

# ---------------- SIDEBAR ----------------
st.sidebar.title("Settings")
mode = st.sidebar.radio("Choose Mode", ["Live Weather", "Manual Input"])

# ---------------- UI START ----------------
st.markdown('<div class="glass">', unsafe_allow_html=True)
st.markdown('<div class="title">Multi-Hazard Predictor</div>', unsafe_allow_html=True)

rainfall = temperature = humidity = river = slope = None

# -------- LIVE WEATHER MODE --------
if mode == "Live Weather":
    city = st.text_input("Enter City", key="city_input")

    if city:
        weather = get_weather(city)

        if weather:
            temperature = weather["temperature"]
            humidity = weather["humidity"]

            rainfall = humidity * 1.2
            river = rainfall / 20
            slope = 30

            st.markdown(f"Temperature: {temperature} °C")
            st.markdown(f"Humidity: {humidity} %")
        else:
            st.error("Invalid city or API issue")

# -------- MANUAL MODE --------
else:
    rainfall = st.number_input("Rainfall (mm)", key="rainfall_input")
    temperature = st.number_input("Temperature (°C)", key="temp_input")
    humidity = st.number_input("Humidity (%)", key="humidity_input")
    river = st.number_input("River Level", key="river_input")
    slope = st.number_input("Slope", key="slope_input")

# ---------------- PREDICT ----------------
st.markdown("---")

if st.button("Predict", key="predict_button"):

    if None in [rainfall, temperature, humidity, river, slope]:
        st.warning("Enter all input values")
        st.stop()

    input_data = np.array([[rainfall, temperature, humidity, river]])

    # -------- FLOOD --------
    st.subheader("Flood Risk")

    if rainfall >= 120 or river >= 8:
        st.error("High Flood Risk")
    elif rainfall >= 70 or river >= 5:
        st.warning("Medium Flood Risk")
    else:
        st.success("Low Flood Risk")

    # ML Prediction
    pred = model.predict(input_data)[0]
    st.info(f"ML Prediction: {pred}")

    # -------- LANDSLIDE --------
    st.subheader("Landslide Risk")

    soil = humidity + (rainfall / 10)

    if rainfall > 100 and slope > 30 and soil > 80:
        st.error("High Landslide Risk")
    elif rainfall > 60 and slope > 20:
        st.warning("Medium Landslide Risk")
    else:
        st.success("Low Landslide Risk")

st.markdown('</div>', unsafe_allow_html=True)

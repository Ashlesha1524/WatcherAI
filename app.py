import streamlit as st
import requests
import numpy as np
import pickle

st.set_page_config(page_title="Watcher AI", layout="centered")

st.title("Watcher AI")
st.write("Predict Flood & Landslide Risk using Manual Input or Live Weather Data")

model = pickle.load(open("model.pkl", "rb"))


API_KEY = "1343383f430e4c58427d584117ab9695"

def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if data.get("cod") != 200:
        return None

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "wind_direction": data["wind"]["deg"]
    }


def get_wind_direction(deg):
    directions = ["North", "North-East", "East", "South-East",
                  "South", "South-West", "West", "North-West"]
    return directions[int((deg + 22.5) / 45) % 8]

st.sidebar.title("Settings")
mode = st.sidebar.radio(
    "Choose Input Mode",
    [" Live City Weather", " Manual Input"]
)


st.header(" Input Data")

rainfall = temperature = humidity = river_level = slope = None


if mode == " Live City Weather":
    city = st.text_input("Enter City Name")

    if city:
        weather = get_weather(city)

        if weather:
            temperature = weather["temperature"]
            humidity = weather["humidity"]
            wind_speed = weather["wind_speed"]
            wind_direction = weather["wind_direction"]

            # Estimated values
            rainfall = humidity * 1.2
            river_level = rainfall / 20
            slope = 30  # default assumption

            st.subheader("Weather Data")
            st.write(f" Temperature: {temperature} °C")
            st.write(f" Humidity: {humidity} %")
            st.write(f" Wind Speed: {wind_speed} m/s")
            st.write(f" Wind Direction: {get_wind_direction(wind_direction)}")

        else:
            st.error(" Invalid city or API issue")


else:
    rainfall = st.number_input("Rainfall (mm)")
    temperature = st.number_input("Temperature (°C)")
    humidity = st.number_input("Humidity (%)")
    river_level = st.number_input("River Level")
    slope = st.number_input("Slope (°)", min_value=0.0, max_value=90.0)


st.header("Prediction")

if st.button("Predict"):


    if None in [rainfall, temperature, humidity, river_level, slope]:
        st.warning(" Please enter all input values")
        st.stop()

    input_data = np.array([[rainfall, temperature, humidity, river_level]])

    
    st.subheader(" Flood Risk")

    if rainfall >= 120 or river_level >= 8:
        st.error(" High Flood Risk")
    elif rainfall >= 70 or river_level >= 5:
        st.warning(" Medium Flood Risk")
    else:
        st.success(" Low Flood Risk")

    
    prediction = model.predict(input_data)[0]
    st.info(f" ML Prediction: {prediction}")

    probs = model.predict_proba(input_data)
    confidence = max(probs[0]) * 100
    st.write(f" Confidence: {confidence:.2f}%")

    
    st.subheader(" Landslide Risk")

    soil_moisture = humidity + (rainfall / 10)

    if rainfall > 100 and slope > 30 and soil_moisture > 80:
        st.error(" High Landslide Risk")
    elif rainfall > 60 and slope > 20:
        st.warning(" Medium Landslide Risk")
    else:
        st.success(" Low Landslide Risk")

    # Explanation
    st.write("###  Factors Considered")
    st.write(f"- Rainfall: {rainfall}")
    st.write(f"- Slope: {slope}")
    st.write(f"- Soil Moisture: {soil_moisture:.2f}")

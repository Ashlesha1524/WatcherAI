import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

model = tf.keras.models.load_model(
    "backend/models/floodnet_mobilenet.keras"
)

img_path = input("Enter image path: ")

img = image.load_img(
    img_path,
    target_size=(224, 224)
)

img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

prediction = model.predict(img_array)[0][0]

print("\nPrediction Score:", prediction)

if prediction > 0.5:
    print("NO FLOOD")
else:
    print("FLOOD")
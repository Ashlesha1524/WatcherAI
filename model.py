import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

data = pd.read_csv("flood_data.csv")
x=data.drop("flood_risk",axis=1)
y= data['flood_risk']

x_train, x_test, y_train, y_test= train_test_split(x,y,test_size=0.2,random_state=42)
model=RandomForestClassifier(random_state=42)
model.fit(x_train,y_train)
y_pred=model.predict(x_test)
accuracy=accuracy_score(y_test,y_pred)
pickle.dump(model,open("model.pkl","wb"))
print("Model is trained and saved Successfully")

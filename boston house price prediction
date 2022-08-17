#import modules
import streamlit as st
import pandas as pd
import shap
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.ensemble import RandomForestRegressor

#title
st.write("""
# Boston House Price Prediction App

This app predicts the **Boston House Price**!

""")

# loads dataset for Boston House Price
boston_house_price = datasets.load_boston()

# set data to X
X = pd.DataFrame(boston_house_price.data, columns=boston_house_price.feature_names)

# set target(house price) to Y
Y = pd.DataFrame(boston_house_price.target,columns=["MEDV"])

## sidebar ##
# header of sidebar
st.sidebar.header('User Input Parameters')	

def user_input_features():
	## sidebar sliders ##
	# per capita crime rate
	CRIM = st.sidebar.slider('CRIM',float(X.CRIM.min()),float(X.CRIM.max()),float(X.CRIM.mean()))
	# proportion of residential land zoned for lots over 25,000 sq.ft.
	ZN = st.sidebar.slider('ZN',float(X.ZN.min()),float(X.ZN.max()),float(X.ZN.mean()))
	# proportion of non-retail business acres per town
	INDUS = st.sidebar.slider('INDUS',float(X.INDUS.min()),float(X.INDUS.max()),float(X.INDUS.mean()))
	# Charles River dummy variable
	CHAS = st.sidebar.slider('CHAS',float(X.CHAS.min()),float(X.CHAS.max()),float(X.CHAS.mean()))
	# nitric oxide concentration 
	NOX = st.sidebar.slider('NOX',float(X.NOX.min()),float(X.NOX.max()),float(X.NOX.mean()))
	# average number of rooms per dwelling
	RM = st.sidebar.slider('RM',float(X.RM.min()),float(X.RM.max()),float(X.RM.mean()))
	# proportion of owner-occupied units built prior to 1940
	AGE = st.sidebar.slider('AGE',float(X.AGE.min()),float(X.AGE.max()),float(X.AGE.mean()))
	# weighted distances to 5 Boston employment centres
	DIS =  st.sidebar.slider('DIS',float(X.DIS.min()),float(X.DIS.max()),float(X.DIS.mean()))
	# Index of accessibility to radial highways
	RAD = st.sidebar.slider('RAD',float(X.RAD.min()),float(X.RAD.max()),float(X.RAD.mean()))
	# full value property tax rate per $10000
	TAX = st.sidebar.slider('TAX',float(X.TAX.min()),float(X.TAX.max()),float(X.TAX.mean()))
	# pupil teacher ratio
	PTRATIO  = st.sidebar.slider('PTRATIO',float(X.PTRATIO.min()),float(X.PTRATIO.max()),float(X.PTRATIO.mean()))
	# 1000(proportions of black - 0.63)^2
	B = st.sidebar.slider('B',float(X.B.min()),float(X.B.max()),float(X.B.mean()))
	# lower status percentage of the population
	LSTAT = st.sidebar.slider('LSTAT',float(X.LSTAT.min()),float(X.LSTAT.max()),float(X.LSTAT.mean()))

	# set value of slider inside a dictionary
	data = {
	'CRIM':CRIM,
	'ZN':ZN,
	'INDUS':INDUS,
	'CHAS':CHAS,
	'NOX':NOX,
	'RM':RM,
	'AGE':AGE,
	'DIS':DIS,
	'RAD':RAD,
	'TAX':TAX,
	'PTRATIO':PTRATIO,
	'B':B,
	'LSTAT':LSTAT
	}
	
	# set into dataframe
	features = pd.DataFrame(data,index=[0])
	return features

# call function
df = user_input_features()

## MAIN PANEL ##

# header
st.header('Specified Input Parameters')
# dataframe of input by user
st.write(df)

# build regression model
model = RandomForestRegressor()
model.fit(X,Y)
# Apply model to make prediction
prediction = model.predict(df)

## PREDICTION ##
# header
st.header("Prediction of MEDV")
# output prediction
st.write(prediction)

# Explaning model's prediction using SHAP values
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)

# header
st.header("Feature importance")
# plot title
plt.title("Feature importance based on SHAP values")

# plot
shap.summary_plot(shap_values, X)
st.set_option('deprecation.showPyplotGlobalUse', False)
st.pyplot(bbox_inches='tight')

# bar
plt.title('Feature importance based on SHAP values (Bar)')
shap.summary_plot(shap_values, X, plot_type="bar")
st.set_option('deprecation.showPyplotGlobalUse', False)
st.pyplot(bbox_inches='tight')

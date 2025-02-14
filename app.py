import joblib
from flask import Flask, request, jsonify

# Load the models
sentiment_model = joblib.load('sentiment_analysis_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

app = Flask(__name__)

@app.route('/')
def home():
    return "Sentiment Analysis API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the text from the POST request
        data = request.get_json()
        text = data['text']

        # Transform the text using the vectorizer
        vectorized_text = vectorizer.transform([text])

        # Get the prediction from the sentiment model
        sentiment = sentiment_model.predict(vectorized_text)

        # Return the result as JSON
        return jsonify({'sentiment': sentiment[0]})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

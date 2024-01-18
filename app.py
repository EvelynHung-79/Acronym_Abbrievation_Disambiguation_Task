from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if data is None:
            raise ValueError('Error parsing JSON data')
        
        results = make_prediction(data)
        return jsonify({'results': results})

    except Exception as e:
        return jsonify({'error': str(e)})

def make_prediction(data):
    resBody = {
        "sentence": data,
        "position": 2,
        "shortened form": "SVM",
        "answer": [
            {
                "word": "state vector machine",
                "percentage": 0.13
            },
            {
                "word": "support vector machine",
                "percentage": 0.87
            }
        ]
    }
    return resBody

if __name__ == '__main__':
    app.run(debug=True)

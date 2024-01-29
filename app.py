from flask import Flask, request, jsonify
from flask_cors import CORS
import model_usage

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
    result = model_usage.get_result(data)
    return result

if __name__ == '__main__':
    # result = model_usage.get_result("AR and VR technologies are revolutionizing the way we experience digital content.")
    # print(result)
    app.run(debug=True)
    

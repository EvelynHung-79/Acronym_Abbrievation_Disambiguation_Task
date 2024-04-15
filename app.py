from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import model_usage

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if data is None:
            raise ValueError('Error parsing JSON data')
        
        results = model_usage.get_result(data)
        return jsonify({'results': results})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    # result = model_usage.get_result("AR and VR technologies are revolutionizing the way we experience digital content.")
    # In machine learning, there are some popular models, like LR, DT, RF, SVM... etc.
    # print(result)
    app.run(host="0.0.0.0", debug=True)
    

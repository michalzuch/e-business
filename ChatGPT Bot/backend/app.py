from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")


@app.route('/api/llama', methods=['POST'])
def process_text():
    data = request.json
    prompt = data.get('prompt')
    print('Request received')

    response = ollama.chat(model='llama2', messages=[
        {
            'role': 'user',
            'content': prompt
        }
    ])

    response = {'message': response['message']['content']}
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)

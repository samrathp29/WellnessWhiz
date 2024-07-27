from flask import Flask, request, jsonify
from nlp_model.py import analyze_symptoms
import json

app = Flask(__name__)

with open('conditions.json') as f:
    conditions = json.load(f)

@app.route('/api/check_symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    symptoms = data.get('symptoms')
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    possible_conditions = analyze_symptoms(symptoms, conditions)
    return jsonify({"conditions": possible_conditions})

if __name__ == '__main__':
    app.run(debug=True)

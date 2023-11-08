from flask import Flask, jsonify, render_template
from pymongo import MongoClient
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env
load_dotenv()

# Get the NASA API key from the environment variable
nasa_api_key = os.getenv("NASA_API_KEY")
if not nasa_api_key:
    raise ValueError("NASA_API_KEY is not set in the environment.")

# Connect to MongoDB
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['solar']
    collection = db['solarflare']
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/sync-solarflare', methods=['GET'])
def sync_solarflare_data():
    try:
        # Define the API URL with the NASA API key
        api_url = f"https://api.nasa.gov/DONKI/FLR?startDate=2018-01-01&endDate=2023-10-03&api_key={nasa_api_key}"
        
        # Fetch data from the NASA API
        response = requests.get(api_url)
        response.raise_for_status()  # Check for HTTP errors
        data = response.json()

        # Insert data into the MongoDB collection
        insertion_result = collection.insert_many(data)
        
        return jsonify({"message": f"{len(data)} records inserted into the 'solarflare' collection."})
    except Exception as e:
        return jsonify({"error": f"Failed to sync solarflare data: {e}"}, 500)

@app.route('/api/solarflare', methods=['GET'])
def get_solarflare_data():
    try:
        # Fetch data from MongoDB
        data = list(collection.find({}, {'_id': 0}))
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve solarflare data: {e}"}, 500)

if __name__ == '__main__':
    app.run(debug=False)

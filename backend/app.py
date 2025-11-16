from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

OMDB_API_KEY = os.environ.get('OMDB_API_KEY', 'your_api_key_here')
OMDB_URL = 'http://www.omdbapi.com/'

@app.route('/api/movie')
def get_movie():
    title = request.args.get('title')
    if not title:
        return jsonify({'error': 'Missing title parameter'}), 400
    params = {'t': title, 'apikey': OMDB_API_KEY}
    response = requests.get(OMDB_URL, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

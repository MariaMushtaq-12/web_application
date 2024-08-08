from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import psycopg2

app = Flask(__name__, static_folder='../buffer-tool/build', static_url_path='/')
CORS(app)

# Serve React app
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files like GIFs
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# Serve icons from the 'icons' directory in the public folder
@app.route('/icons/<path:filename>')
def serve_icon(filename):
    return send_from_directory(os.path.join(app.static_folder, 'icons'), filename)

# Buffer endpoint to handle GET request for buffer creation
@app.route('/buffer', methods=['GET'])
def buffer():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius = float(request.args.get('radius'))
    poi_type = request.args.get('type')

    # Connect to PostgreSQL database
    conn = psycopg2.connect(dbname="pois", user="postgres", password="#btsarmy123", host="localhost", port="5432")
    cur = conn.cursor()

    # Query to fetch POIs within the buffer
    query = f"""
    SELECT name, ST_X(geom) AS lng, ST_Y(geom) AS lat, icon_url
    FROM {poi_type}
    WHERE ST_DWithin(geom, ST_MakePoint(%s, %s)::geography, %s);
    """
    cur.execute(query, (lng, lat, radius))
    rows = cur.fetchall()
    conn.close()

    points = [{'name': row[0], 'lng': row[1], 'lat': row[2], 'iconUrl': row[3]} for row in rows]

    return jsonify({'points': points})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

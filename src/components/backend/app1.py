from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import psycopg2
from shapely import wkt

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/search', methods=['GET'])
def search():
    city_name = request.args.get('city_name')

    try:
        conn = psycopg2.connect(dbname="place_search", user="postgres", password="#btsarmy123", host="localhost", port="5432")
        cur = conn.cursor()

        # First query: gis_osm_pois_free_1
        query1 = """
        SELECT name_3 , ST_AsText(geom) AS geom_wkt
        FROM public.pak_adm3
        WHERE name_3 ILIKE %s;
        """
        cur.execute(query1, (f'%{city_name}%',))
        results1 = cur.fetchall()

        # Second query: pak_adm3
        query2 = """
        SELECT name, ST_AsText(geom) AS geom_wkt 
        FROM public.gis_osm_buildings_a_free_1
        WHERE name ILIKE %s;
        """
        cur.execute(query2, (f'%{city_name}%',))
        results2 = cur.fetchall()

        query3 = """
        SELECT name, ST_AsText(geom) AS geom_wkt
        FROM public.gis_osm_landuse_a_free_1
        WHERE name ILIKE %s;
        """
        cur.execute(query3, (f'%{city_name}%',))
        results3 = cur.fetchall()

        query4 = """
        SELECT name, ST_AsText(geom) AS geom_wkt
        FROM public.gis_osm_natural_a_free_1
        WHERE name ILIKE %s;
        """
        cur.execute(query4, (f'%{city_name}%',))
        results4 = cur.fetchall()

        query5 = """
        SELECT name, ST_AsText(geom) AS geom_wkt
        FROM public.gis_osm_pois_a_free_1
        WHERE name ILIKE %s;
        """
        cur.execute(query5, (f'%{city_name}%',))
        results5 = cur.fetchall()

        cur.close()
        conn.close()

        places = []

        # Process results from first query
        for r in results1:
            geom = wkt.loads(r[1])
            centroid = geom.centroid  # Calculate the centroid of the geometry
            places.append({'name': r[0], 'lng': centroid.x, 'lat': centroid.y})

        # Process results from second query
        for r in results2:
            geom = wkt.loads(r[1])
            centroid = geom.centroid  # Calculate the centroid of the geometry
            places.append({'name': r[0], 'lng': centroid.x, 'lat': centroid.y})

        for r in results3:
            geom = wkt.loads(r[1])
            centroid = geom.centroid  # Calculate the centroid of the geometry
            places.append({'name': r[0], 'lng': centroid.x, 'lat': centroid.y})

        for r in results4:
            geom = wkt.loads(r[1])
            centroid = geom.centroid  # Calculate the centroid of the geometry
            places.append({'name': r[0], 'lng': centroid.x, 'lat': centroid.y})

        for r in results5:
            geom = wkt.loads(r[1])
            centroid = geom.centroid  # Calculate the centroid of the geometry
            places.append({'name': r[0], 'lng': centroid.x, 'lat': centroid.y})

        if not places:
            return jsonify({'places': [], 'error': 'No results found for the specified city name'})

        return jsonify({'places': places})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True , host= '0.0.0.0', port=5003)

# -*- coding: utf-8 -*-

import requests
from flask import Flask, request, Response, redirect, url_for, session
import sqlite3
import json
from db_location import path

app = Flask(__name__)

@app.route("/")
def root():
	return redirect(url_for('static', filename = 'index.html'))

@app.route("/login", methods=['GET'])
def login():
    return redirect(url_for('static', filename = 'index.html'))

@app.route("/logout")
def logout():
    return redirect(url_for('static', filename = 'main.html'))

@app.route("/getWeather")
def get_weather():
    r = requests.get("http://api.wunderground.com/api/a107c32b97757b21/conditions/lang:BR/q/Portugal/Porto.json")

    if r.status_code == 200:
        response = r.json()   
        message =  {'temperature':response['current_observation']['temp_c'],
                'icon_url' : response['current_observation']['icon_url'],
                'wind_speed' : response['current_observation']['wind_kph'],
                'rel_humidity' : response['current_observation']['relative_humidity']}
        return Response(response=json.dumps(message),
	                    status=200,
	                    mimetype="application/json")

@app.route("/saveData", methods=['POST'])
def saveData():
    data = request.json
    mail = data['mail']
    tmax = float(data['tmax'])
    tmin = float(data['tmin'])
    cost = float(data['price'])

    data2insert = (mail, tmin, tmax, cost)

    connection = sqlite3.connect(path)

    cur = connection.cursor()
    cur.execute('INSERT INTO users (mail, tmin, tmax, cost) VALUES (?, ?, ?, ?)', data2insert)
    connection.commit()
    connection.close()
    
    message = {"message": "Data inserted on the database",
                "data": {
                        "mail": mail,
                        "tmax": tmax,
                        "tmin": tmin,
                        "price": cost,
                }}
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")

@app.route("/getData")
def getData():

    connection = sqlite3.connect(path)

    cur = connection.cursor()
    cur.execute('SELECT * FROM users')
    info = cur.fetchall()[-1]
    connection.close()

    mail = info[0]
    tmin = info[1]
    tmax = info[2]
    cost = info[3]

    message = {"mail": mail,
                "tmax": tmax,
                "tmin": tmin,
                "price": cost}
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True)
# -*- coding: utf-8 -*-

import requests
from flask import Flask, request, Response, redirect, url_for, session
#import sqlite3
import json
#from db_location import path
from test import *

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

@app.route("/register", methods=['POST'])
def register():
    data = request.json
    print data
    mail = data['mail']
    username = data['username']
    password = data['password']
    name = data["name"]
    surname = data["surname"]
    tmax = 40.0
    tmin = 20.0
    cost = 0.1

    data2insert = (mail, username, password, name, surname, tmin, tmax, cost)

    insertUser(data2insert)
    
    message = {"message": "Successful registration",
                "data": {
                        "mail": mail,
                        "username": username,
                        "name": name,
                        "surname": surname,
                        "tmax": tmax,
                        "tmin": tmin,
                        "price": cost,
                }}
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")


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

@app.route("/updateSettings", methods=['POST'])
def updateSettings():
    data     = request.json
    tmax     = float(data['tmax'])
    tmin     = float(data['tmin'])
    cost     = float(data['price'])
    username = data['username']

    data2insert = (tmin, tmax, cost, username)

    updateValues(data2insert)
    
    message = {"message": "Data updated on the database",
                "data": {
                        "tmax": tmax,
                        "tmin": tmin,
                        "price": cost,
                        "username": username
                }}
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")


@app.route("/updateAccount", methods=['POST'])
def updateAccount():
    data        = request.json
    mail        = data['mail']
    newUsername = data['newUsername']
    password    = data['password']
    name        = data['name']
    surname     = data['surname']
    oldUsername = data['oldUsername']

    data2insert = (mail, newUsername, password, name, surname, oldUsername)

    message = {"message": "Data updated on the database",
                "data": {
                        "mail": mail,
                        "newUsername": newUsername,
                        "name": name,
                        "surname": surname,
                        "oldUsername": oldUsername,
                }}
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")


@app.route("/getUserData")
def getUserData():
    username = request.args.get("username")
    info = getUser(username)

    mail        = info[0]
    username    = info[1]
    name        = info[3]
    surname     = info[4]
    tmax        = info[5]
    tmin        = info[6]
    cost        = info[7]

    message = {"message": "Data from user",
                "data": {"mail": mail,
                        "username": username,
                        "name": name,
                        "surname": surname,
                        "tmax": tmax,
                        "tmin": tmin,
                        "price": cost}
                }
        
    return Response(response=json.dumps(message),
                        status=200,
                        mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True)
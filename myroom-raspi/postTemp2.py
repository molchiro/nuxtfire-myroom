#!/usr/bin/python3

import dht11
import datetime
from pytz import timezone
import RPi.GPIO as GPIO
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Get sensor data
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()
mydht11 = dht11.DHT11(pin=14)
dht11_read_data = mydht11.read()

# Add data on firestore
cred = credentials.Certificate('/home/pi/nuxtfire/myroom-8924e-firebase-adminsdk-q189k-2a864458d0.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection(u'temp-humid-sensor')
doc_ref.add({
    u'timestamp': datetime.datetime.now(timezone('Asia/Tokyo')),
    u'tmp': dht11_read_data.temperature,
    u'hmd': dht11_read_data.humidity
    })
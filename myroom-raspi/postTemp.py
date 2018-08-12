import dht11
import datetime
import RPi.GPIO as GPIO
import requests
import json

# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

# get data
now = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S')
mydht11 = dht11.DHT11(pin=14)
dht11_read_data = mydht11.read()

# preparing POST request
JSONPayload = json.dumps({
    "timestamp": now,
    "tmp": dht11_read_data.temperature,
    "hmd": dht11_read_data.humidity
    })
url = 'https://myroom-8924e.firebaseio.com/temp-humid-sensor.json'

# POST request
requests.post(url, JSONPayload, headers={'Content-Type': 'application/json'})

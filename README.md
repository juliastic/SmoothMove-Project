# SmoothMove

## Prerequisites
* *npm* installation
* Arduino Nano with relevant sensors (MQ-Sensor-Series)
* Installation of *Arduino IDE*
## Setup Arduino
* Connect Arduino Nano to computer with relevant sensors
* Within *Arduino IDE*:
    * Install library MQUnifiedsensor to allow the arduino to read MQ Sensor references
    * Install library DHT sensor library if DHT11, DHT22, etc. sensors get used to measure Temperature & Humidity
    * ***Optional***: Install according library for displays if one is used, depending on the display
* `cd AirQualitySensorProject`
* Uncomment calibration code (AirQualitySensorProject.ino lines 63-104) & calibrate sensors for 30min
* Comment calibration code again
## Setup Website
* `cd SmoothMoveWebsite`
* `npm install`
* Change ip address based on your local ip address in `js/measurementsHandler.js` & `server/server.py` (see also comments)
## Run Project
***Please note that the Arduino needs to be started first, the `server/app.js` needs to be started within 15s of starting the Arduino in order for the initial data to arrive!***
* *ARDUINO*
    * Run code within IDE
* *Website* 
    * Execute:
        * `node run server/app.js`
        * `python3 server/server/py`
    * Visit IP_ADDRESS:8000
## Testing Project with Dummy Data (does not require Arduino)
To test the website with dummy data:
* All the relevant parsing code should be commented in `server/app.js`
* ***Optional***: Variable `lastData` can be modified
* Execute:
    * `node run server/app.js`
    * `python3 server/server/py`

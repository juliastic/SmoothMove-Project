# SmoothMove
This README.md serves as an additional technical documentation of the project implemented in the course *Design Thinking: Explorative Prototyping*. The project revolved around displaying air quality data - measured with MQ Sensors - on a website.

Main communication workflow: *Arduino*->*node.js server*->*Website*

## Prerequisites
* [*npm* installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [*python3* installation](https://www.python.org/downloads/)
* Arduino Nano with relevant sensors (MQ-Sensor-Series) - provided
* [Installation of *Arduino IDE*](https://www.arduino.cc/en/software)
* `git clone https://github.com/juliastic/SmoothMove-Project.git`
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
* Change ip address based on your local ip address in `js/measurementsHandler.js`, `server/server.py` & `server/app.js` (see also comments)
## Run Project
***Please note that the Arduino needs to be started first, the `server/app.js` needs to be started within 15s of starting the Arduino in order for the initial data to arrive!***
* *ARDUINO*
    * Run code within IDE
* *Website* 
    * Execute:
        * `node run server/app.js`
        * `python3 server/server.py`
    * Visit IP_ADDRESS:8000
## Testing Project with Dummy Data
***This does not require the Arduino setup!***

To test the website with dummy data:
* All the relevant parsing code should be commented in `server/app.js`
* ***Optional***: Variable `lastData` can be modified
* Execute:
    * `node run server/app.js`
    * `python3 server/server.py`

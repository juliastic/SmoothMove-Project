const measurements = {
    "CO2": {
        name: "CO2",
        threshold: 1100,
        id: "co2"
    },
    "CH4": {
        name: "METHAN",
        threshold: 1000,
        id: "methane"
    },
    "SMOKE": {
        name: "RAUCH",
        threshold: 25,
        id: "smoke"
    },
    "TOLUENE": {
        name: "TOLUENE",
        threshold: 1000,
        id: "toluene"
    },
    "NH4": {
        name: "NH4",
        threshold: 25,
        id: "nh4"
    },
    "ACETONE": {
        name: "ACETONE",
        threshold: 500,
        id: "acetone"
    },
    "CO": {
        name: "CO",
        threshold: 800,
        id: "co"
    },
    "H2": {
        name: "H2",
        threshold: 450,
        id: "h2"
    },
    "FG": {
        name: "BRENNBARE GASE",
        threshold: 20,
        id: "fg"
    },
};

let anyLimitExceeded = false;

// for measurments.html
function listenToMeasurements() {
    window.onload = () => {
        for (const [_, value] of Object.entries(measurements)) {
            document.getElementById(value.id.concat("-limit")).innerHTML = "(< ".concat(value.threshold).concat("ppm)");
        }
    };

    var socket = io("http://10.0.0.36:3000", { 'transports': ['websocket', 'polling'] }); // change ip address based on your local ip address
    // trigger update from server when opening site
    socket.emit('triggerUpdate', {});
    // parse measurements: set all relevant elements (text, displayed svg)
    // type of data -> JSON
    socket.on('data', (data) => {
        Object.keys(data).forEach(function (key) {
            const measurement = measurements[key];
            const value = data[key];
            const limitExceeded = value > measurement.threshold;
            if (limitExceeded) {
                anyLimitExceeded = true;
            }
            document.getElementById(measurement.id).innerHTML = value.toString().concat("PPM");

            document.getElementById("questionmark-".concat(measurement.id)).style.display = "none";
            document.getElementById("checkmark-".concat(measurement.id)).style.display = limitExceeded ? "none" : "block";
            document.getElementById("cross-".concat(measurement.id)).style.display = limitExceeded ? "block" : "none";
        });
        document.getElementById("measurements-info").innerHTML = "Um mehr &uuml;ber die gemessenen Daten zu erfahren, &ouml;ffnen Sie <a href='sensordata.html'>Sensordaten</a>!";
    });

    socket.on("updateTime", (lastUpdateTime) => {
        let today = lastUpdateTime;
        document.getElementById('last-update-label').innerHTML = today;
    });
}

// for index.html
function listenToMainData() {
    var socket = io("http://10.0.0.36:3000", { 'transports': ['websocket', 'polling'] }); // change ip address based on your local ip address
    // trigger update from server when opening site
    socket.emit('triggerUpdate', {});
    // parse measurements: set all relevant elements (text, tree, animations)
    // type of data -> JSON
    socket.on('data', (data) => {
        anyLimitExceeded = false; // reset limit exeeding

        Object.keys(data).forEach(function (key) {
            const measurement = measurements[key];
            const value = data[key];
            const limitExceeded = value > measurement.threshold;
            if (limitExceeded) {
                anyLimitExceeded = true;
                return;
            }
        });

        let airQuality = document.getElementById("air-quality");
        airQuality.innerHTML = anyLimitExceeded ? "SCHLECHT" : "GUT";
        airQuality.style.color = anyLimitExceeded ? "red" : "green";

        document.getElementById("questionmark-big").style.display = "none";
        document.getElementById("tree").style.display = "block";
        document.getElementById("grass").setAttribute("id", anyLimitExceeded ? "dead-grass" : "alive-grass");
        document.getElementsByClassName("bees")[0].style.display = anyLimitExceeded ? "none" : "block";
        document.getElementsByClassName("flowers")[0].style.display = anyLimitExceeded ? "none" : "block";

        let treeMouth = document.getElementById("tree-mouth");
        let classToRemove = anyLimitExceeded ? "tree_mouth" : "sad-tree__mouth";
        if (treeMouth.classList.contains(classToRemove)) {
            treeMouth.classList.remove(classToRemove);
        }
        let classToAdd = anyLimitExceeded ? "sad-tree__mouth" : "tree_mouth";
        if (!treeMouth.classList.contains(classToAdd)) {
            treeMouth.classList.add(classToAdd);
        }

        document.getElementById("more-information").innerHTML = "F&#220;R MEHR INFORMATIONEN, RUFEN SIE <a href='measurements.html'>MESSUNGEN</a> AUF!"

        if (!anyLimitExceeded) {
            triggerTreeAnimation();
        }
    });
}

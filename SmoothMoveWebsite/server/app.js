var http = require("http");
var fs = require("fs");
var index = fs.readFileSync("index.html");
var app = http.createServer(function (_, res) {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.end(index);
});
const io = require("socket.io")(app, {
	cors: {
		origin: "http://10.0.0.36:3000", // replace with your ip address
		credentials: true
	}
});

var SerialPort = require("serialport");

const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
	delimiter: "\r\n"
});

var port = new SerialPort("/COM6", {
	baudRate: 9600,
	dataBits: 8,
	parity: "none",
	stopBits: 1,
	flowControl: false
});

port.pipe(parser);

let lastData = {"CO2":10,"CH4":1500.58,"SMOKE":10,"TOLUENE":10,"NH4":10,"ACETONE":10,"CO":10,"H2":10, "FG":10}; // for debugging only
let lastUpdateTime = new Date().toLocaleString("de-DE", { timeZone: "Europe/Vienna" });

io.on("connection", function (socket) {
	// send updates on site refresh
	socket.on("triggerUpdate", () => {
		socket.emit("data", lastData);
		socket.emit("updateTime", lastUpdateTime);
	});
	console.log("Node.js is listening");
});

parser.on("data", function (data) {
	console.log("Received data from port: " + data);
	// start implies sending of measurements
	if (data.startsWith("{\"CO2\"")) {
		try {
			lastData = JSON.parse(data);
			lastUpdateTime = new Date().toLocaleString("de-DE", { timeZone: "Europe/Vienna" });
			io.emit("data", lastData);
			io.emit("updateTime", lastUpdateTime);
		} catch(e) {
			// invalid json
		}
	}
});

app.listen(3000);

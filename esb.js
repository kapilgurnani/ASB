/* 
 * esb.js, Main cluster manager for the ESB
 * 
 * (C) 2018 TekMonks. All rights reserved.
 */
global.CONSTANTS = require(__dirname + "/lib/constants.js");

var cluster = require("cluster");

if (cluster.isMaster) {
	var conf = require(CONSTANTS.CONFDIR + "/cluster.json");
	
	// Figure out number of workers.
	var numWorkers = conf.workers;
	if (numWorkers == 0) {
		var numCPUs = require("os").cpus().length;
		if (numCPUs < conf.min_workers) numWorkers = conf.min_workers;	
		else numWorkers = numCPUs;
	}
	
	// Fork workers.
	console.log("Starting " + numWorkers + " workers.");
	for (var i = 0; i < numWorkers; i++) cluster.fork();
	
	cluster.on("exit", function(server, _, _) {
		console.log("Worker server with PID: " + server.process.pid + " died.");
		console.log("Forking a new process to compensate.");
		cluster.fork();
	});
} else require(CONSTANTS.LIBDIR + "/main.js").bootstrap();

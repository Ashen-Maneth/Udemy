const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(message) {
        this.emit("message" , {message});
    }
}


const logger = new Logger();
const logFile = './eventLog.txt';

const logToFle = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
    fs.appendFileSync(logFile , logMessage);
}


logger.on('message' , logToFle);

setInterval(() => {
    const memoryUsage = os.freemem() / os.totalmem() * 100;
    logger.log(`Remaining memory: ${memoryUsage.toFixed(2)}%`);
    
}, 3000)

logger.log("Application started");

logger.log("Application stopped"); 

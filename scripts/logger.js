// Modules
const replaceAll = require('./replaceAll');

// Export
module.exports = new create();

function create() {
    this.defaultPrefix = null;

    this.log = function(message = null, prefix = this.defaultPrefix) { return make(message, prefix, 0); };
    this.warn = function(message = null, prefix = this.defaultPrefix) { return make(message, prefix, 1); };
    this.error = function(message = null, prefix = this.defaultPrefix) { return make(message, prefix, 2); };
}

// Functions
function logger(message, prefix = null, level = 0) {
    if(level < 0 || level > 2) throw new Error("Invalid level number");

    prefix = prefix != null ? "[%prefix% - " + prefix + "] " : "[%prefix%]";
    var levelName = 'INFO';

    switch(true) {
        case (level == 0):
            if(typeof message == 'string') { 
                console.log(replacePrefix(prefix, levelName) + ' ' + message);
            } else {
                console.log(replacePrefix(prefix, levelName));
                console.log(message);
            }
            break;
        case (level == 1):
            levelName = 'WARN';
            if(typeof message == 'string') { 
                console.warn('\x1b[33m%s\x1b[0m', replacePrefix(prefix, levelName) + ' ' + message);
            } else {
                console.warn('\x1b[33m%s\x1b[0m', replacePrefix(prefix, levelName));
                console.log(message);
            }
            break;
        case (level == 2):
            levelName = 'ERROR';
            if(typeof message == 'string') { 
                console.error('\x1b[31m%s\x1b[0m', replacePrefix(prefix, levelName) + ' ' + message);
            } else {
                console.error('\x1b[31m%s\x1b[0m', replacePrefix(prefix, levelName));
                console.log(message);
            }
            break;
        default:
            throw new Error("Invalid console level: " + level);
    }

    function replacePrefix (string, prefixName) {
        return replaceAll(string, '%prefix%', prefixName);
    }
}
function make(message, prefix = null, level = 0){
    if(typeof message == 'string') { 
        message = message.split('\n');

        for (let value of message) {
            logger(value.trim(), prefix, level);
        }

        return message;
    }
    logger(message, prefix, level);
}
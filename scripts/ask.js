const Prompt = require('prompt-sync')();

module.exports = (message, enableStop = true) => {
    let ask = Prompt(message);
    while (true) {
        if(ask == 'exit' && enableStop || ask == 'stop' && enableStop) process.exit(0);
        if(ask && ask != null || !enableStop) {
            break;
        }
        ask = Prompt(message);
    }
    return ask;
}

// Get user input with or without loop
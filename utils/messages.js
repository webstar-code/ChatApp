const moment = require('moment');

const formatmessage = (username, message) => {
    return  {
        username,
        message,
        time: moment().format('hh:mm:a')
    }
    
}

module.exports = formatmessage;
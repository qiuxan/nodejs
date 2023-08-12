const EventEmitter = require("events");
const emmiter = new EventEmitter();

//listenter
emmiter.on('messageLogged', function (arg) {
    console.log('listener called', { arg });
})

//raise event
const data = { id: 1, url: 'http//' }
emmiter.emit('messageLogged', data);

// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAPC895ivFYA4LH2FVFS7S1X_OmvPFFRRs",
    authDomain: "vactionbot.firebaseapp.com",
    databaseURL: "https://vactionbot.firebaseio.com",
    projectId: "vactionbot",
    storageBucket: "",
    messagingSenderId: "435889459228"
  };
var app = firebase.initializeApp(config);

// Get a database reference to our blog
var database = firebase.database();

function writeUserData(userId, date) {
  firebase.database().ref('outusers/' + userId).set({
    userId: userId,
    returnDate: date
  });
}
writeUserData("andy", new Date());




var outUsers = {};
client.on('ready', () => {
    client.user.setActivity('https://git.io/d.js-heroku', {
        type: 'WATCHING'
    });
});
client.on('message', msg => {
    var message = msg.content;
    if (message.substring(0, 2) == 'vb' || message.substring(0, 2) == 'VB') {
        var args = message.substring(3).split(' ');
        var cmd = args[0];
        console.log(args);
        switch (cmd) {
        case 'hi':
            msg.channel.send('hello');
            break;
        case 'out':
            var user = msg.author.username;
            var daysOut = args[1];
            msg.channel.send(user + " is out for " + daysOut + " days");
            console.log(user + " is out for " + daysOut + " days");
            var returnDate = new Date();
            outUsers[user] = returnDate.addDays(daysOut);
            break;
        case 'back':
                console.log(outUsers);
            var user = msg.author.username;
                console.log("deleting: " +user);
            delete outUsers[user];
                console.log(outUsers);
            break;
            
        case 'who':
            var outStr = 'The following are out: ';
            for (var key in outUsers) {
                if (outUsers.hasOwnProperty(key)) {
                    outStr += key + " -> " + formatDate(outUsers[key] );
                    console.log(key + " -> " + outUsers[key]);
                }
            }
            msg.channel.send(outStr);
        }
    }
});

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    var someFormattedDate = mm + '/' + dd + '/' + y;
    return someFormattedDate;
}
console.log("test");
console.log(process.env.TOKEN);
client.login(process.env.TOKEN);
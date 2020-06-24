console.log("Welcome To Logan's Bots")

// Varibles

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var members = ""
var id = ""

// Server ID
var serverID = "515582535573700627"

// Roles

var roleOwner = "516759746519367711"
var roleCoOwner = "516888239408152577"
var roleAdmin = "516888708356636674"
var roleMod = "522748999090962434"
var roleTraniee = "522749162912088077"
var roleManager = "552524650530471938"
var roleMuted = "526708851865550848"
var highestRole = "526612045819543562"

// Arrays
let modRoles = [roleOwner, roleCoOwner, roleAdmin, roleMod, roleTraniee, roleManager]

// Sleep Funtion
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function playingLoop() {
    bot.setPresence( {game: {name:"LoyaltyMC"}} );
    sleep(5000).then(() => {
        // This will execute 10 seconds from now
        bot.setPresence( {game: {name:"play.loyaltymc.net"}} );
        sleep(5000).then(() => {
            // This will execute 10 seconds from now
            bot.setPresence( {game: {name:"Prefix is ?"}} );
            sleep(5000).then(() => {
                // This will execute 10 seconds from now
                bot.setPresence( {game: {name:"\"The Bedrock Effect\""}} );
                sleep(5000).then(() => {
                    // This will execute 10 seconds from now
                    playingLoop();
                });
            });
        });
    });
};

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    playingLoop();
    console.log("Bot Initialized")
});
bot.on('message', function (user, userID, channelID, message, evt, member) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `?`
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var args1 = args[1];
       
        args = args.splice(1);
        switch(cmd) {
            // ?ping
            case 'ping':
                console.log(user + " Ran ?ping")
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // ?ip
            case 'ip':
                console.log(user + " Ran ?ip")
                bot.sendMessage({
                    to: channelID,
                    message: 'Java: `play.loyaltymc.net`\nBedrock: `play.loyaltymc.net`\nBedrock Port: `19132`'
                });
            break;
            // ?istheserverdead
            case 'istheserverdead':
                console.log(user + " Ran ?istheserverdead")
                bot.sendMessage({
                    to: channelID,
                    message: 'No.'
                });
            break;
            // ?help
            case 'help':
                console.log(user + " Ran ?help")
                bot.sendMessage({
                    to: channelID,
                    message: 'Here\'s some commands i know...\n`?help` - The Command You Are Using Right Now\n`?ip` - The ip for the server\n`?istheserverdead` - Tells You The Answer to Is The Server Dead\n`?geysermc` - Tells You About GeyserMC\n`?website` - Tells You The Address to the website\n`?whyistheserversobuggyonbedrock` - Tells You Why The Server is so buggy on bedrock\n`?author` - Tells You The Author of this Amazing Bot'
                });
            // Just add any case commands if you want to..
            break;
            case 'mute':
                console.log(user + " Ran ?mute")
                if (bot.servers[serverID].members[userID].roles.includes(roleOwner) || bot.servers[serverID].members[userID].roles.includes(roleCoOwner) || bot.servers[serverID].members[userID].roles.includes(roleAdmin) || bot.servers[serverID].members[userID].roles.includes(roleMod) || bot.servers[serverID].members[userID].roles.includes(roleTraniee) || bot.servers[serverID].members[userID].roles.includes(roleManager)) {
                    id = args1.match(/(\d+)/)
                    id = id[0]
                    bot.addToRole({
	                serverID: serverID,
	                roleID: roleMuted,
	                userID: id,
                    });
                    bot.sendMessage({
                        to: channelID,
                        message: "You Have Muted <@!" + id + ">"
                    });
                 } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "You do not have perms to do ```?mute```"
                    });
                    bot.sendMessage({
                        to: "526701768416165918",
                        message: "The User <@!" + userID + "> attempted to run ?mute"
                    });
                  }
                console.log(id);
            // Just add any case commands if you want to..
            break;
            case 'ban':
                console.log(user + " Ran ?ban")
                if (bot.servers[serverID].members[userID].roles.includes(roleOwner) || bot.servers[serverID].members[userID].roles.includes(roleCoOwner) || bot.servers[serverID].members[userID].roles.includes(roleAdmin) || bot.servers[serverID].members[userID].roles.includes(roleMod) || bot.servers[serverID].members[userID].roles.includes(roleTraniee) || bot.servers[serverID].members[userID].roles.includes(roleManager)) {
                    id = args1.match(/(\d+)/)
                    id = id[0]
                    bot.ban({
	                serverID: serverID,
	                userID: id
                    });
                    bot.sendMessage({
                        to: channelID,
                        message: "You Have Banned <@!" + id + ">"
//                        message: 'Sorry But the Ban Command is a Work In Progress :frowning:'
                    });
                 } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "You do not have perms to do ```?ban```"
                    });
                    bot.sendMessage({
                        to: "526701768416165918",
                        message: "The User <@!" + userID + "> attempted to run ?ban"
                    });
                  }
                console.log(id);
            // Just add any case commands if you want to..
            break;
            case 'geysermc':
                console.log(user + " Ran ?geysermc")
                bot.sendMessage({
                    to: channelID,
                    message: 'Loyalty Uses it and so should you for your java server\nhttps://discordapp.com/invite/7ZDSKa5'
                });
            // Just add any case commands if you want to..
            break;
            case 'website':
                bot.sendMessage({
                    to: channelID,
                    message: 'www.loyaltymc.net'
                });
            // Just add any case commands if you want to..
            break;
            case 'author':
                console.log(user + " Ran ?author")
                bot.sendMessage({
                    to: channelID,
                    message: 'Bot Made By @LH4005 <3'
                });
            // Just add any case commands if you want to..
            break;
            console.log(user + " Ran ?whyistheserversobuggyonbedrock")
            case 'whyistheserversobuggyonbedrock':
                bot.sendMessage({
                    to: channelID,
                    message: 'Well, GeyserMC that we use for the bedrock part so we don\'t have to make another bedrock server and fragment the server'
                });
            break;
         }
     }
     if (message.substring(0, 1) == '\<\@') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // Pinging Me
            case 'Test':
                bot.sendMessage({
                    to: channelID,
                    message: 'Test'
                });
            break;
         }
     }
});

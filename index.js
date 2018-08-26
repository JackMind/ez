const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;

require('http').createServer().listen(3000)

client.on('ready',() => { 
	console.log('I\'m Online\nI\'m Online');
});

var prefix = "$"
var tardsList = [];
var roles = ["Carry", "Support", "Jungler", "Roamer", "Nuker", "Initiator", "Pusher"];

client.on('message', message => {
	let args = message.content.split(' ').slice(1);
	var result = args.join(' ');

	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;

	if (message.content.startsWith(prefix + 'ez')) {
    if(tardsList.includes(message.author.username)){
      message.channel.send("You are already in queue fatard @" + message.author.username)
      return;
    }
    tardsList.push(message.author.username);
    message.channel.send("Fatard @" + message.author.username + " joinned the queue " + tardsList.length +"/5")
	}else if (message.content.startsWith(prefix + 'gg') || tardsList.length === 5){
    if(tardsList.length === 0){
      message.channel.send("No one in queue")
      return;
    }
		while (tardsList.length > 0) {
      var tardRoleNum = Math.floor((Math.random() * roles.length) + 0);
				var tard = tardsList.pop();
	      message.channel.send(tard+ " is " +roles[tardRoleNum])
	      roles.splice(tardRoleNum, 1);
				roles.sort();
    }
    roles = ["Carry", "Support", "Jungler", "Roamer", "Nuker", "Initiator", "Pusher"];
    tardsList = [];
  }else if (message.content.startsWith(prefix + 'call')){
    message.channel.send(":feelsamazingman: :mega:  D O T O  C A L L  @everyone")
  }else if(message.content.startsWith(prefix + 'dotoislife')){
		message.channel.send("!play https://www.youtube.com/watch?v=12vh55_1ul8")
  }else{
    message.channel.send("ez to join\ngg to pick roles\ncall to doto calling\ndotoislife for motivation")
  }

});
//process.env.TOKEN
client.login(token);

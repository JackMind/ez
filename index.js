const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;

require('http').createServer().listen(3000)

client.on('ready',() => { 
	console.log('I\'m Online\n');
});

var prefix = "$"
var tardsList = ["a","b","c","d"];
var roles = ["Pos1", "Pos2", "Pos3", "Pos4", "Pos5"];
let frases = [["Pelo menos não é jackmind a dar carry", "Spectre, Luna, AM, PL, Juggernaut"],
["May the odds be with you","Tinker, QOP, Storm Spirit, Zeus, Inv"],
["Enchantress, Bristleback, Centaur, Dark Seer, Undying, Phoenix"],
["Se eu vir wards em stock és banido do discord", "Bara, Bounty, Tusk, Pudge"],
["É para comprar wards", "Glimer Cape faz bem á saude", "e Sentries", "CM, WW, IO, Rubick, Pugna"]];

client.on('message', message => {

	let pos = message.content.split(' ').slice(1, 2);
	let args = message.content.split(' ').slice(2);
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
		let ggEz = new Discord.RichEmbed()
		.setTitle("This is the match:")
		.setColor(0x00AE86)
		while (tardsList.length > 0) {
      var tardRoleNum = Math.floor((Math.random() * roles.length) + 0);
				var tard = tardsList.pop();
				//FIX: Getting index from string Pos1-5
				ggEz.addField(tard + " is " + roles[tardRoleNum], frases[roles[tardRoleNum].substring(3)-1][Math.floor(Math.random(0, frases[frases[tardRoleNum].length]))])
				roles.splice(tardRoleNum, 1);
				roles.sort();
    }
		message.channel.send(ggEz)
    roles = ["Pos1", "Pos2", "Pos3", "Pos4", "Pos5"];
    tardsList = [];
  }else if (message.content.startsWith(prefix + 'call')){
    message.channel.send("<:feelsamazingman:448445382599507969> :mega:  D O T O  C A L L  @everyone")
  }else if(message.content.startsWith(prefix + 'dotoislife')){
		message.channel.send("!play https://www.youtube.com/watch?v=12vh55_1ul8")
  }else if(message.content.startsWith(prefix + 'add')){
		if(!roles.includes(pos.toString())){
			message.channel.send("Usage: add {Pos} message")
			return message.channel.send("Try on of these: " + roles)
		}else if(!result){
			return message.channel.send("Try to write something")
		}else{
			frases[roles.indexOf(pos.toString())].push(result.toString())
			let added = new Discord.RichEmbed()
			.setTitle("Message added")
			.addField(pos.toString(), result.toString())
			message.channel.send(added)
		}
		console.log(pos + " " + result)
		console.log(roles.indexOf(pos.toString()))
	}else if(message.content.startsWith(prefix + 'ls')){
		let embed = new Discord.RichEmbed()
		.setTitle("List of all messages")
		.addField(roles[0],frases[0])
		.addField(roles[1],frases[1])
		.addField(roles[2],frases[2])
		.addField(roles[3],frases[3])
		.addField(roles[4],frases[4])
		message.channel.send(embed)
	}else if(message.content.startsWith(prefix + 'rm')){
		if(!roles.includes(pos.toString())){
			message.channel.send("Usage: $rm {Pos} {indexOf}")
			return message.channel.send("Try on of these: " + roles)
		}else if(args[0] > frases[roles.indexOf(pos.toString())].length && pos){
			console.log(roles.indexOf(pos.toString()) + " only have: " + frases[roles.indexOf(pos.toString())].length)
			return message.channel.send(roles.indexOf(pos.toString()) + ":" + frases[frases[roles.indexOf(pos.toString())].length])
		}else{
			let removed = new Discord.RichEmbed()
			.setTitle("Message removed")
			.addField(pos.toString(), frases[roles.indexOf(pos.toString())][args[0]])
			message.channel.send(removed)
			frases[roles.indexOf(pos.toString())].splice(args[0].toString(), 1)
		}
	}else{
		let embed = new Discord.RichEmbed()
		.setTitle("Usage")
		.addField("Joining queue", "$ez")
		.addField("To pick roles", "$gg")
		.addField("Doto call", "$call")
		.addField("Motivation", "$dotoislife")
		.addField("Add new message", "$add {Pos} message")
		.addField("Remove messages", "$rm {Pos} {indexOf}")
		.addField("List messages", "$ls")
		message.channel.send(embed)
  }
});

//process.env.TOKEN
client.login(token);

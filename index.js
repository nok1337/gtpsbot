/*
* Coded by nok#1337
* Helped by GuckTubeYT#5000 & Clayne#1000
*/
const Discord = require('discord.js')
const exec = require('child_process').exec;
var fs = require('fs')
const client = new Discord.Client()
const config = require('./config.json');
const lineReader = require('line-reader');
const role = ("GTPS_PERMS")
var randomColor = require('randomcolor');

function isRunning(cb) {
    exec("tasklist", (err, stdout, stderr) => {
        cb(stdout.includes("server.exe"))
    })
}

client.on('ready', () => {
	  console.log(`GTPS Bot Running.`)
	  console.log(`Logged in as ${client.user.tag}`)
client.user.setActivity('GTPS Discord Bot by nok#1337', { type: 'LISTENING' });

client.on("message", async message => {
	if(message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
  
	if(command === "help") {
		message.channel.send({embed: {
			color: 3447003,
			author: {
			  name: client.user.username,
			  icon_url: client.user.avatarURL
			},
			title: "Bot by nok#1337 & GuckTubeYT#5000",
			url: "https://github.com/nok1337/",
			description: "Prefix is `n!`",
			fields: [{
				name: "Run",
				value: "Start your server.exe"
			  },
			  {
				name: "Stop",
				value: "Stop your server.exe"
			  },
			  {
				name: "Setup",
				value: "To setup your server status & GTPS_PERMS"
			  },
			  {
				name: "start",
				value: "Start your server status"
			  }
			],
			timestamp: new Date(),
			footer: {
			  icon_url: client.user.avatarURL,
			  text: "© nok#1337 & GuckTubeYT#5000"
			}
		  }
		});
	}
  
	if(command === "run") {
	  if(!message.member.roles.cache.some(r=>[role].includes(r.name)) )
		return message.reply("Sorry, you don't have permissions to use this!");
		const m = await message.channel.send("Starting server.exe");
		try {
		  if (fs.existsSync("server.exe")) {
			exec("start server.exe")
			m.edit("Server is Running")
		  }
		} catch(err) {
		  m.edit("server.exe Not Found! change your enet.exe to server.exe")
		}
	}

	if(command === "start") {
		if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`${message.author}, hold up! This commands needed some Role!\n**Reason**: Missing Administrator Perms`)
		const channel = client.channels.cache.find(c => c.name === "『📊』server-status")
    channel.send("Server Status by nok#1337").then((message) => {
		console.log("Server Status by nok#1337")
        setInterval(() => {
			var color = randomColor();
            isRunning((running) => {
				const embed = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle("GTPS Server Status")
				.setURL("https://github.com/nok#1337/gtpsbot")
				.setTimestamp()
                .setFooter("Last updated")
                .addField("**Server Status:**", running ? "**UP**" : "**DOWN**")
                .addField("**Players online**", running ? "**" + fs.readFileSync("onlineplayer.txt") + "**": "**0**")
                
                message.edit(embed)
            })
        }, 3000)
	});
	}
  
	if(command === "stop") {
	  if(!message.member.roles.cache.some(r=>[role].includes(r.name)) )
		return message.reply("Sorry, you don't have permissions to use this!");
		exec("taskkill /f /im server.exe")
		message.channel.send("Server stopped.");
	}

	if(command === "setup") {
		if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`${message.author}, hold up! This commands needed some Role!\n**Reason**: Missing Administrator Perms`)
		if(message.guild.channels.cache.find(ch => ch.name === '『📊』server-status')) return message.channel.send(`${message.author}, hold up! i think this command already in used!\n**If Has Problem Contact** nok#1337`).then(m => m.delete({ timeout: 14000 }))
		message.guild.channels.create('『📊』server-status', { 
			type: 'text', 
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['SEND_MESSAGES'],
				},
			],
		});
		message.guild.roles.create({
			data: {
			  name: 'GTPS_PERMS',
			  color: '#00FF00',
			}
		});
		return message.reply("Setup ready. now type `n!run` to start your server.exe and `n!start` to start the server status. enjoy.");
	  }
  })
  });

client.login(config.token);

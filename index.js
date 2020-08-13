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
const role = ("yournamerole")
var randomColor = require('randomcolor');

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

client.on('ready', () => {
	  console.log(`GTPS Bot Running.`)
	  console.log(`Logged in as ${client.user.tag}`)
client.user.setActivity('github.com/nok1337/', { type: 'STREAMING' });
  	const statusz = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setAuthor('GTPS Status', 'https://cdn.discordapp.com/avatars/701004167040335883/b77b30753409aab9d937247f67a0817b.png', '')
	.addField('**Server Status:**', '**DOWN**')
	.addField('Players online:', '0')
	.setTimestamp()
	.setFooter('Last updated', '');
    client.channels.cache.get('743263512687673427').send(statusz).then((msg)=> {
  setInterval(function(){
  	var color = randomColor();
isRunning('server.exe', (status) => {
    if (status == true) {
    	lineReader.eachLine('onlineplayer.txt', function(line) {
        	const statuszz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor('GTPS Status', 'https://cdn.discordapp.com/avatars/624835981283033095/30327a234aa2f6d6697b4af27d277354.png', '')
	.addField('**Server Status:**', '**UP**')
	.addField('**Players online:**', line)
	.setTimestamp()
	.setFooter('Last updated', '');
	    msg.edit(statuszz);
});
    }
    else
    {
    		const statusz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor('GTPS Status', 'https://cdn.discordapp.com/avatars/624835981283033095/30327a234aa2f6d6697b4af27d277354.png', '')
	.addField('**Server Status:**', '**DOWN**')
	.addField('**Players online:**', '0')
	.setTimestamp()
	.setFooter('Last updated', '');
	    msg.edit(statusz);
    }
})
  }, 3000)
}); 
})

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
			title: "GTPS Discord Bot Commands",
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
				name: "Note",
				value: "Please change your **.exe** name to **server.exe**"
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
		const m = await message.channel.send("Please Wait...");
		try {
		  if (fs.existsSync("server.exe")) {
			exec("start server.exe")
			m.edit("Server is Running")
		  }
		} catch(err) {
		  m.edit("server.exe Not Found! change your enet.exe to server.exe")
		}
	}
  
	if(command === "stop") {
	  if(!message.member.roles.cache.some(r=>[role].includes(r.name)) )
		return message.reply("Sorry, you don't have permissions to use this!");
		exec("taskkill /f /im server.exe")
		message.channel.send("Server stopped.");
	}
  });

client.login(config.token);
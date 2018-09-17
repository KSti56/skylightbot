const Discord = require("discord.js");
const fs = require("fs");
const User = require("../models/user.js");  

module.exports.run = async(bot,message,args) => {
    message.delete();
    message.channel.send("✅Sent a dm").then(msg => {msg.delete(2000)});

    
    
    let member = message.member;
    let guild = message.guild;
    let user = await User.findOrCreate(message.guild, message.author);
    let {coins, 
         xp,
         coinmultiplier
       } = user


    const embed = new Discord.RichEmbed() 

     
    .setColor("#ff4b4b")
    .setAuthor(`${message.member.user.tag}, Welcome to the SkyLight Shop`, message.author.displayAvatarURL)
    .addField(`**2.00x xp boost**`, "500 coins")
    .addField(`**2.00x coin boost**`, "500 coins")
    .addField("**5** credits", "250 coins")
    .addField("**1 Advertisement**", "250 coins")
    .addField(`**Your coins**`, coins)
message.author.send(embed);
    message.author.send("Say the name of item you would like to buy").then(ms =>{
      const collector = new Discord.MessageCollector(ms.channel, m => message.author.id === message.author.id, { time: 180000});
      collector.on('collect', message => {
        if(message.content.toLowerCase() == "2.00x xp boost") {
          if(xpmultiplier == 2) return message.reply("You already have that boost!");
          if(coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x xp boost")
          coins -= 500;
          xpmultiplier = 2;
          user.save();
          collector.stop();
        }
        if(message.content.toLowerCase() == "2.00x coin boost") {
          if(coinmultiplier == 2) return message.reply("You already have that boost!");
          if(coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x coin boost")
          
          coins -= 500;
          coinmultiplier = 2;
          user.save();
          collector.stop()
        }
        if(message.content.toLowerCase() == "5 credits") {
          if(coins < 250) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 5 credits")
          
          coins -= 250;
          user.credits += 5;
          user.save();
          collector.stop()
        }
        if(message.content.toLowerCase() == "1 advertisement") {
          if(coins < 250) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 1 Advertisement")
          
          coins -= 250;
          user.save();
          let guild = bot.guilds.get("485897985960443936")
          let msgs = guild.channels.get("491032995646668820").fetchMessages().then(msg => msg.array().length);
          guild.channels.get("491032995646668820").send("Advertisement " + msgs + "\nOwner: " + guild.member(message.author.id) + "\n\n```\nNo content yet! Use ``-ad " + msgs + " content here`` to set the content!\n```");
          collector.stop()
        }
        
    
          
  })
})
}
                                                    
module.exports.help = {
    name: "shop"
}
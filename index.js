const Discord = require('discord.js');
const {RichEmbed} = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = process.env.Prefix;
const channelID = process.env.ChannelID
// const prefix = "!";
const userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));

client.on("ready", function(){
    console.log("Bot is Live!");
});


client.on("message", (message) => {
    //Channel by ID 
    if(message.channel.id === channelID ){
        // make sure their username is there before writing to the file
        if(!userData[message.author.id]) userData[message.author.id] = {
            messagesSent: 0
        }
        if(message.content != 1){// If it isn't the number one
            message.delete()//Delete it
            // Direct message them
            message.author.send('Please only post the number "1", and not anything other then that number. Thank you!');
        } else {
            userData[message.author.id].messagesSent++;//adds one to the "messagesSent", under the user id
        }
        fs.writeFile('storage/userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);//log if there is an error
        })
    }
})

//Calling the score/stats
client.on("message", (message) => {
if(message.content.includes(prefix + "Userstats")) {
    message.author.send('You have touched the Booty ' + userData[message.author.id].messagesSent + " times!")
}
})
const token = process.env.token;
client.login(token).catch(err => console.log(err));
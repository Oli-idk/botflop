const Discord = require('discord.js');
const node = require('nodeactyl');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
const pclient = node.Client;

client.on("ready", () => {
    client.user.setActivity(`Birdflop.com`, { type: 'WATCHING' });
    console.log('I am online')
})

client.on("message", async message => {

    if(message.channel.type === 'dm'){
        try {
            await pclient.login(config.panelURL, message.content, (logged_in, err) => {
            console.log(`logged_in to nodeactyl client`);
        });
        }catch(e){
            message.reply(e)
        }
        try {
            pclient.getAllServers().then(servers => {
                console.log(servers)
                // fs.appendFile('pp.json', `${servers}`, (err) => {
                //     if (err) throw err;
                // });
                servers.forEach(s => {
                    console.log(s.attributes.server_owner)
                    if(s.attributes.server_owner == 'true'){
                        // const BirdFlop = client.guilds.cache.get('746125698644705524');
                        // const member = BirdFlop.members.cache.get(message.author.id)
                        // member.roles.add('748407123179995177').catch(console.error);
                        console.log('im doing something')
                    }else if(s.attributes.server_owner == "false"){
                        console.log('I AM FASLE OOGA BOOGA')
                    }
                });
             }).catch(err => {
                 console.log(err);
             })
        }catch(e){
            message.reply(e)
        }

        if(message.content == 'Gimmie Client'){
            const BirdFlop = client.guilds.cache.get('746125698644705524');
            const member = BirdFlop.members.cache.get(message.author.id)
            member.roles.add('748407123179995177').catch(console.error);
        }

    }
})



client.login(config.token)
var mysql = require('mysql');
const Discord = require("discord.js");
const bot = new Discord.Client();



// funcion sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// token del bot
bot.login("");

//conexion mysql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "targetas_discord"
});



bot.on('ready', () => {

      // mesaje por consola de que está activado
  
      console.log(`\n\nBot ${bot.user.tag} listo!!\n\n`);

      // actividad

      bot.user.setActivity(
        'soy la novia de ismi',
        { type: 'WATCHING' }
      );
});


const prefix = '>'; // just an example, change to whatever you want

bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

  if (cmd === 'help') {
    if (args[1]) {
      if (args[1] == "register") {
        message.reply('Uso: `>register <ID de steam> <ID de epic> <ID de minecraft> <RIOT_id> <CoC> <Clash_Royale> <Telefono> <Insta>`. Si no tienes cuenta de algo, escribe `no_tengo`. Es importante que en todos los usuarios que se introduzcan se cambien los espacios por _ y si tu nombre de discord los tiene, contacta a un administrador del sistema. Si se quiere cambiar algun dato, hacer lo mismo.');
        
      }
      if (args[1] == "describe") {
        message.reply('Uso: `>custom <usuario de discord con tag>`')
        
      }
       
    }
    else message.reply("Uso: `>help <command>`. Los comandos que hay son `register` y `describe`")
  }

  if (cmd === 'register') {
    if (args[3]) {
      var steam_id = args[1]
      var epic_id = args[2]
      var mc_id = args[3]
      var riot_id = args[4]
      var coc = args[5]
      var cr = args[6]
      var tlf = args[7]
      var ig = args[8]

      var username = message.author.tag
      var avatar = message.author.displayAvatarURL()
	    
      var query = "INSERT INTO `users` (`id`, `avatar`, `discord`, `steam`, `mc`, `epic`, `riot`, `cr`, `coc`, `tlf`, `ig`) VALUES (0, '" + avatar + "', '" + username +  "', '" + steam_id + "',  '" + mc_id + "', '" + epic_id + "', '" + riot_id + "', '" + cr + "', '" + coc + "', '" + tlf + "', '" + ig + "');"
      message.channel.send(exampleEmbed)
      con.connect(function(err) {
        if (err) message.reply("Error");
        console.log("Connected!");
        con.query(query, function (err, result) {
          if (err) message.reply("Error");
          console.log(result);
        });
      });
    }
    else message.reply("Argumentos no validos. Escribe >help")
  }
  if (cmd === 'describe')  {
    if (args[1]) {
      var username = args[1]
      var query = "SELECT * FROM `users` WHERE `discord` = '" + username + "' "

      con.connect(function(err) {
        if (err) console.log("Error");
        console.log("Connected!");
        con.query(query, function (err, result) {
          if (err) console.log("Error");
          
          let steam_id = result[0].steam
          let avatar = result[0].avatar
          let mc_id = result[0].mc
          let epic_id = result[0].epic
          let riot_id = result[0].riot
          let cr = result[0].cr
          let coc = result[0].coc
          let tlf = result[0].tlf
          let ig = result[0].ig

          const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('DATOS')
          .setAuthor(username, avatar, 'https://teamopaula.xyz')
          .setDescription('Estos son los datos que el usuario ' + username + ' ha introducido')
          .setThumbnail(avatar)
          .addFields(
            { name: 'ID de steam', value: steam_id },
            { name: 'ID de minecraft', value: mc_id },
            { name: 'ID de epic', value: epic_id },
            { name: 'Riot (Valorant) ', value: riot_id },
            { name: 'Clash Royale ', value: cr },
            { name: 'Clash of Clans ', value: coc },
            { name: 'Telefono ', value: tlf },
            { name: 'Instagram ', value: ig },
            { name: '\u200B', value: '\u200B' }
          )
          .setTimestamp()

          message.channel.send(exampleEmbed)
          
        });
      });

    }
    else message.reply("Argumentos no validos. Mira su uso con `>help describe`")


  }
});
const { RichEmbed } = require('discord.js')
const { formatDate, getMember } = require('../../utils/functions')
const { stripIndents } = require('common-tags')

module.exports = {
	name: 'who',
	aliases: ['user', 'who'],
	category: 'info',
	description: 'Return user information',
	usage: '[username | id, | mention]',
	run: (client, message, args) => {
		const member = getMember(message, args.join(' '))

		// Member variables
		const joined = formatDate(member.joinedAt)
		const roles = member.roles.filter(r => r.id !== message.guild.id).map(r => r).join(', ' || 'None')

		// User variables
		const created = formatDate(member.user.createdAt)
		const embed = new RichEmbed()
			.setFooter(member.displayName, member.user.displayAvatarURL)
			.setThumbnail(member.user.displayAvatarURL)
			.setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
			.addField('Member information', stripIndents`**Display Name: ** ${member.displayName}
			**Joined at:** ${joined}
			**Roles:** ${roles}`, true)
			.addField('User information', stripIndents`**ID:** ${member.user.id}
			**Username:** ${member.user.username}
			**Discord Tag:** ${member.user.tag}
			**Created at:** ${created}`, true)
			.setTimestamp()

		if (member.user.presence.game) embed.addField('Currently playing', `**Name:** ${member.user.presence.game.type !== 0 ? member.user.presence.game.state : member.user.presence.game.name}`)
		
		message.channel.send(embed)
	}
}

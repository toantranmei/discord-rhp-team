// Mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongodb-discord', {
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true
})

// Models
const Quote = require('../../models/Quote')

module.exports = {
	name: 'quote',
	category: 'management',
	description: 'Says your input via the bot',
	usage: '<input>',
	run: async (client, message, args) => {
		if (message.deletable) message.delete()

		// No args
		if (!args[0]) {
			return message.reply('Please provide a method.').then(m => m.delete(5000))
		}

		// No args
		if (!args[1]) {
			return message.reply('Please provide a url.').then(m => m.delete(5000))
		}

		// No author permissions
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message
				.reply(
					'❌ You do not have permissions to ban members. Please contact a staff member'
				)
				.then(m => m.delete(5000))
		}

		// switch case
		if (args[0] === 'add') {
			// Create new model quote
			const newQuote = new Quote({
				quoteUrl: args[1]
			})

			// save to database
			await newQuote.save()
		}
		// response to discord
		return message.reply('Add quote successfully.').then(m => m.delete(5000))
	}
}

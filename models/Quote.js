const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
	quoteUrl: {
		type: String,
		default: true,
		unique: true
	}
}, {
	timestamps: true
})

const Quote = mongoose.model( 'quote', QuoteSchema )

module.exports = Quote

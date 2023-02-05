const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
	title: {
		type: String,
		required: [true, "Please write a title for your event"]
	},
	description: {
		type: String
	},
	start: {
		type: Date,
		required: [true, "Please insert the start of your event"],
		min: [new Date(), "Can't be before now"]
	},
	end: {
		type: Date,
		min: [function () {
			const date = new Date(this.start)
			const validDate = new Date(date.setHours(date.getHours() + 1))
			return validDate;
		}, "Event End must be at least one hour a head of event time"],
		default: function () {
			const date = new Date(this.start);
			return date.setDate(date.getDate() + 1)
		}
	},
})

module.exports = mongoose.model('events', EventSchema)

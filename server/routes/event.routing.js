const express = require('express');
const handleEventErrors = require('../helpers/errorHandler.helper');
const router = express.Router()

const eventModel = require('../models/event.model')

/**  
 * @route GET api/event
 * @desc Get event
 * @access Private
*/

router.get('/', async (req, res) => {
	try {
		const events = await eventModel.find({});
		res.json({ success: true, events })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

/** 
 * @route Get api/event
 * @desc Get event by id
 * @access Public
*/
router.get('/:id', async (req, res) => {
	try {
		const event = await eventModel.findById(req.params.id);
		if (!event)
			return res.status(400).json({ msg: "Event not found" });

		res.json({ success: true, event })
	} catch (err) {
		console.log(err);
		req.status(500).json({ msg: err.message });
	}
})


/** 
 * @route Post api/event
 * @desc Create new event
 * @access Public
*/
router.post('/', async (req, res) => {
	const { title, description, start } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newEvent = new eventModel({
			title,
			description,
			start: start || new Date(),
			...req.body
		})

		await newEvent.save()

		res.json({ success: true, message: 'Happy eventing!', event: newEvent })
	} catch (err) {
		console.log(err)
		handleEventErrors(err, res)
	}
})

/** 
 * @route PUT api/event
 * @desc Update event by id
 * @access Public
*/

router.put('/:id', async (req, res) => {
	const { title, description, start } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedEvent = {
			title,
			description: description || '',
			start: start || new Date(),
			...req.body
		}

		const eventUpdateCondition = { _id: req.params.id }

		updatedEvent = await eventModel.findOneAndUpdate(
			eventUpdateCondition,
			updatedEvent,
			{ new: true, runValidators: true }
		)

		// User not authorised to update event or event not found
		if (!updatedEvent)
			return res.status(401).json({
				success: false,
				message: 'Event not found or something wrong'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			event: updatedEvent
		})
	} catch (err) {
		console.log(err)
		handleEventErrors(err, res)
	}
})

/**
 * @route DELETE api/event
 * @desc Delete event by id
 * @access Public
*/

router.delete('/:id', async (req, res) => {
	try {
		const eventDeleteCondition = { _id: req.params.id }
		const deletedEvent = await eventModel.findOneAndDelete(eventDeleteCondition)

		// User not authorised or eventModel not found
		if (!deletedEvent)
			return res.status(401).json({
				success: false,
				message: 'Event not found'
			})

		res.json({ success: true, event: deletedEvent })
	} catch (err) {
		console.log(err)
		handleEventErrors(err, res)
	}
})

module.exports = router

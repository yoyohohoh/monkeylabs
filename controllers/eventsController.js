const Events = require('../models/Event');

const getAllEvents = async (req, res) => {
  var keyword = req.query.name;

  if (keyword == null) {
    try {
      const events = await Events.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    try {
      keyword = keyword.replace('[', '').replace(']', '').trim();
      const events = await Events.find({
        name: { $regex: keyword, $options: 'i' }
      });

      res.status(200).json(events);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching events.' });
    }
  }
};

const getEventById = async (req, res) => {
  const eventsId = req.params.id;

    try {
        const events = await Events.findById(eventsId);
        
        if (!events) {
            return res.status(404).json({ message: 'Events not found.' });
        }

        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
};

const createEvent = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newEvents = new Events({
          category_name
        });

        const savedEvents = await newEvents.save();

        res.status(201).json(savedEvents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding events.' });
    }
};

const updateEvent = async (req, res) => {
  const eventsId = req.params.id;

  try {
      const updatedEvents = await Events.findByIdAndUpdate(eventsId, req.body, { new: true, runValidators: true });
      
      if (!updatedEvents) {
          return res.status(404).json({ message: 'Events not found.' });
      }

      res.status(200).json(updatedEvents);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating events.' });
  }
};

const deleteEventById = async (req, res) => {
  const eventsId = req.params.id;

  try {
      const events = await Events.findByIdAndDelete(eventsId);
      
      if (!events) {
          return res.status(404).json({ message: 'Events not found.' });
      }

      res.status(200).json({ message: 'Events successfully deleted.', deletedEvents: events });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting events.' });
  }
};

const deleteAllEvents = async (req, res) => {
  try {
      const events = await Events.deleteMany({});
      res.status(200).json({ message: 'All events successfully deleted.', deletedEvents: events });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting events.' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEventById,
  deleteAllEvents
}
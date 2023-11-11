const express = require('express');
const eventCategoryController = require('../controllers/eventCategoriesController');

const router = express.Router();

router.get('/api/eventCategories', eventCategoryController.getAllEventCategories);
router.get('/api/eventCategories/published', eventCategoryController.getPublishedEventCategories);
router.get('/api/eventCategories/:id', eventCategoryController.getEventCategoryById);

router.post('/api/eventCategories', eventCategoryController.createEventCategory);

router.put('/api/eventCategories/:id', eventCategoryController.updateEventCategory);

router.delete('/api/eventCategories/:id', eventCategoryController.deleteEventCategoryById);
router.delete('/api/eventCategories', eventCategoryController.deleteAllEventCategories);

module.exports = router;
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  getUserEvents,
  createEvent,

  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.use(authMiddleware);


router.post('/users/:userId/events', createEvent);

router.get('/users/:userId/events', getUserEvents);

router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);

export default router;

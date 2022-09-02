import express from 'express';
import BookingApi from './bookingsApi.js';

const router = express.Router();

const api = new BookingApi();

// get
router.get('/:id', (req, res) => {
    api.get(req, res)
})
// getAll 
router.get('/', (req, res) => {
    api.getAll(req, res)
}) 
// post
router.post('/', (req, res) => {
    api.post(req, res)
})
// update
router.put('/:id', (req, res) => {
    api.update(req, res)
})
// delete
router.delete('/:id', (req, res) => {
    api.delete(req, res)
})
 
export default router;
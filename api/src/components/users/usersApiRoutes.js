import express from 'express';
import UserApi from './usersApi.js';
// import UserDb from './usersService.js';
const router = express.Router();

const userApi = new UserApi();

// get
router.get('/:id', (req, res) => {
    userApi.getUser(req, res)
})
// getAll  
router.get('/', (req, res) => {
    userApi.getAllUsers(req, res)
})
// post
router.post('/', (req, res) => {
    userApi.postUser(req, res)
})
// update
router.put('/:id', (req, res) => {
    userApi.updateUser(req, res)
})
// delete
router.delete('/:id', (req, res) => {
    userApi.deleteUser(req, res)
})
 
export default router;
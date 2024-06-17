import express from 'express';
import * as friendsController from '../controllers/groupsController.js';
const router = express.Router();

//group routes to create group
router.post('/createGroup', friendsController.createGroup);


export default router;
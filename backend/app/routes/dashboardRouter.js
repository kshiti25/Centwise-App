import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
const router = express.Router();

//all routes for the for the dashboard 
router.get('/', dashboardController.fetchAllData);
router.get('/userDetails', dashboardController.userDetails);
router.patch('/updateProfile/:userId', dashboardController.updateUserProfile);
//router.delete('/deleteProfile/:userId', dashboardController.deleteUserProfile);

export default router;
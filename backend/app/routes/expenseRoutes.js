import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
const router = express.Router();

//All expense t=routes to fetch, create, update
router.get('/allData', expenseController.fetchAll);
router.post('/addExpense', expenseController.addExpense);
router.get('/FriendData', expenseController.fetchFriend);
router.get('/GroupData', expenseController.fetchGroup);


export default router; 
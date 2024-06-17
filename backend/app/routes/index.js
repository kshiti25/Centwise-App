import express from 'express';                //Initial index file to have root paths
import userRouter from './userRoutes.js';
import dashboardRouter from './dashboardRouter.js';
import friendsRoutes from './friendsRoutes.js';
import groupsRoutes from './groupsRoutes.js';
import expenseRoutes from './expenseRoutes.js';

const router = express.Router();
    
//Root paths. /api to set proxy server
export default (app) => {
      app.use('/api/user', userRouter);
      app.use('/api/dashboard', dashboardRouter);
      app.use('/api/friends', friendsRoutes);
      app.use('/api/groups', groupsRoutes);
      app.use('/api/expense', expenseRoutes);
}
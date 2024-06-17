
//users routes

import express from 'express';
import passport from 'passport';
import multer from 'multer';
import * as userController from '../controllers/userControllers.js';

const router = express.Router();
const upload = multer(); 

router.get('/settleup', userController.settleup);
router.get('/signin', userController.signin);
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/user/signin'}, 
), userController.createSession);     //session creation on login through local strategy

router.post('/localLogin', passport.authenticate(
  'local',
  {failureRedirect: '/user/signin'}, 
), userController.localLogin);    //login through local strategy

router.post('/create', userController.create);    //account creation path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ProfilePicture');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});

// Set up Multer with the configured storage
const fileUpload = multer({ storage: storage });

// Route for uploading a file
router.post('/uploadfile', upload.single('file'), userController.create); //upload file path in DB 
router.get('/checkAuth', userController.checkAuth); //check if user is authenticated
router.get('/signout', userController.sessionDestroy); //destroy session on logout

router.post('/forgotpassword', userController.forgotPassword); //forget password path
router.post('/inviteFriend', userController.inviteFriend); //invite friends modal path

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']})); //login through google oauth
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/api/user/signin'}), userController.createSession); //google oauth callback

export default router;

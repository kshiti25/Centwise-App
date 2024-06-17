// Importing necessary modules and models
import User from '../models/UserSchema.js';
import multer from 'multer';
import nodemailer from 'nodemailer';

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create user account
export const create = async function(request, response) {
  try {
    const uploadedFile = request.file;
    let user = await User.findOne({ email: request.body.email }); // Check if user already exists
    if (!user) {
      // Create user if not exists
      let createUser = await User.create({
        email: request.body.email,
        password: request.body.password,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        ph_no: request.body.ph_no,
      });

      if (uploadedFile) {
        // Upload profile picture if provided
        createUser.profilePicture = {
          data: uploadedFile.buffer,
          contentType: uploadedFile.mimetype,
        };
        await createUser.save(); // Save created user with profile picture
      }

      return response.status(200).json({ message: 'User Created' });
    } else {
      return response.status(400).json({ message: 'User Already exists!' });
    }
  } catch (err) {
    console.log('Error occurred while finding/creating the user');
    return response.status(404).json({ message: 'Error occurred' });
  }
};

// Forgot password method
export const forgotPassword = async function(request, response) {
  const AUTH_EMAIL = 'your-email@gmail.com'; // Replace with your email
  const AUTH_PASS = 'your-email-password';    // Replace with your email password

  try {
    const { email } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ message: 'User not found with this email address.' });
    }

    // Nodemailer code to send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
      },
    });

    const resetLink = `http://your-domain.com/user/reset-password`;
    const emailContent = `Click the following link to reset your password: ${resetLink}`;

    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject: 'Reset Centwise Password',
      text: emailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ message: 'Error sending password reset email.' });
      } else {
        console.log('Password reset email sent: ' + info.response);
        return response.status(200).json({ message: 'Password reset email sent. Check your inbox.' });
      }
    });
  } catch (error) {
    console.error('Error occurred during forgot password:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

// Signin route
export const signin = function(request, response) {
  try {
    if (request.isAuthenticated()) {
      return response.redirect('/dashboard');
    }
    response.redirect('/user/signin');
  } catch (err) {
    console.error(err);
    response.status(500).send('Internal Server Error');
  }
};

// Local strategy login
export const localLogin = function(request, response) {
  request.flash('success', 'Logged In Successfully');
  return response.status(200).send('User logged in');
};

// Create session post login
export const createSession = function(request, response) {
  request.flash('success', 'Logged In Successfully');
  return response.redirect('/dashboard');
};

// Destroy session post logout
export const sessionDestroy = function(request, response) {
  console.log("I'm in session destroy");
  request.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      response.sendStatus(500);
    } else {
      return response.status(200).send('Logged Out Successfully');
    }
  });
};

// Check if user is authenticated
export const checkAuth = function(request, response) {
  try {
    if (request.isAuthenticated()) {
      return response.status(200).send('User Authenticated');
    }
    return response.status(404).send('User not Authenticated');
  } catch (err) {
    console.error(err);
    response.status(500).send('Internal Server Error');
  }
};

// Invite friend method to send mail through nodemailer
export const inviteFriend = async function(request, response) {
  const AUTH_EMAIL = 'your-email@gmail.com'; // Replace with your email
  const AUTH_PASS = 'your-email-password';    // Replace with your email password

  try {
    const { email } = request.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
      },
    });

    const resetLink = `http://your-domain.com/user/reset-password`;
    const emailContent = `Click the following link to join CentWise: ${resetLink}. `;

    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject: 'Invitation to join Centwise',
      text: emailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ message: 'Error sending invitation email.' });
      } else {
        console.log('Invitation email sent: ' + info.response);
        return response.status(200).json({ message: 'Invitation email sent. Check your inbox.' });
      }
    });
  } catch (error) {
    console.error('Error occurred during Invitation:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};


export const settleup = async function(request, response) {
  try{
    // console.log("settle up");

    // console.log(request.query);

    // console.log(request.user.first_name);

    const { payer, recipient, amount } = request.query;
    let payerUser;
    if(payer === 'You'){
      payerUser = await User.findOne({ first_name: request.user.first_name });
    }else{
      payerUser = await User.findOne({ first_name: payer });
    }
    const recipientUser = await User.findOne({ first_name: recipient });

    if(payerUser){
      if(payerUser.totalOweAmount-amount >= 0){
        payerUser.totalOweAmount -= amount;
        payerUser.totalBalance += amount;
      }else{
        let diff = Math.abs(payerUser.totalOweAmount-amount);
        payerUser.totalOweToSelf += diff;
        payerUser.totalOweAmount = 0;
        payerUser.totalBalance += diff;
      }

      console.log(payerUser);

      await payerUser.save();
    }

    if(recipientUser){
      if(recipientUser.totalOweToSelf-amount >= 0){
        recipientUser.totalOweToSelf -= amount;
        recipientUser.totalBalance -= amount;
      }else{
        let diff = Math.abs(recipientUser.totalOweToSelf-amount);
        recipientUser.totalOweAmount += diff;
        recipientUser.totalOweToSelf = 0;
        recipientUser.totalBalance -= diff;
      }

      console.log(payerUser);

      await recipientUser.save();
    }
    
    return response.status(200).send("Settled up");

  }catch(error){
    console.log("Error in settling up " + error);
    return response.status(500).send(": error in settling up");
  }
}



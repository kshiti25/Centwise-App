/**
 * SignInForm Component
 * 
 * The SignInForm component represents the sign-in form for user authentication.
 * It includes input fields for email and password, a sign-in button, and an option to sign in with Google.
 * Additionally, it provides a "Forgot Password?" link that opens a modal for password recovery.
 * 
 * @component
 * @returns {JSX.Element} - The JSX representation of the SignInForm component.
 * @example
 * // Import the SignInForm component
 * import SignInForm from './path/to/SignInForm';
 * 
 * // Render the SignInForm component
 * <SignInForm />
 */

import React, { useState, ChangeEvent, FormEvent } from "react";
import googleLogoPath from "../../../../public/images/GoogleLogo.png";
import centwiseLogo from "../../../../public/images/CentwiseLogo.png";
import styles from "../FormStyles.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPassModal from './forgotPassModal'; 

/**
 * SignInForm Functional Component
 * 
 * @returns {JSX.Element} - The JSX representation of the SignInForm component.
 */
const SignInForm = () => {
  // State variables for email, password, and modal visibility
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);

  // Hook for navigation in React Router
  const navigate = useNavigate();

  /**
   * Handle form submission for local sign-in.
   * @param {FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await handleLocalSignin(email, password);
    // You can perform additional actions after the login if needed
  };

  /**
   * Handle local sign-in using email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  const handleLocalSignin = async (email: string, password: string) => {
    try {
      // Make a POST request to authenticate the user
      const response = await axios.post('/api/user/localLogin', {
        email: email,
        password: password,
      });

      // Check the response status and navigate accordingly
      if(response.status === 200){
        navigate('/dashboard');
      } else if(response.status === 400){
        alert('User does not exist');
        navigate('/user/signin');
      } else {
        alert('Cannot process your request at this time');
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error); 
    }
  };

  /**
   * Handle Google OAuth sign-in.
   */
  const handleGoogleOauth = () => {
    window.location.href = '/api/user/auth/google';
  };

  /**
   * Handle click on "Forgot Password?" link to open the modal.
   */
  const handleForgotPasswordClick = async () => {
    // Open the modal when the "Forgot Password?" link is clicked
    setShowForgotPasswordModal(true);
  };

  /**
   * Handle modal closure.
   */
  const handleModalClose = () => {
    // Close the modal when needed
    setShowForgotPasswordModal(false);
  };

  // Rendering JSX
  return (
    <div className={styles.container}>
      <div className={styles.centwiseLogo}>
        <img src={centwiseLogo} alt="Centwise Logo" height="40" width="190"/>
      </div>

      <div className={styles.mainFormContainer}>
        <h2 className={styles.formHeading}>Sign in to account</h2>

        <button className={styles.googleButton} onClick={handleGoogleOauth}>
          <img className={styles.googleLogo} src={googleLogoPath} alt="Google Logo" />
          <p className={styles.googleText}><b>Sign in with Google</b></p>
        </button>

        <div className={styles.Or}>OR</div>

        <form onSubmit={handleSubmit} method='POST'>
          <input
            className={styles.inputs}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email id"
            required
            id="email"
            name="email"
          />
          <br /><br />
          <input
            className={styles.inputs}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            id="password"
            name="password"
          />
          <br /><br />
          <div className={styles.forgotPassword} onClick={handleForgotPasswordClick}>Forgot Password?</div>
          <button className={styles.submitBtn} type="submit">Sign in</button>
        </form>
      </div>

      {/* Render the ForgotPassModal component when the modal is open */}
      {showForgotPasswordModal && (
        <ForgotPassModal closeModal={handleModalClose} />
      )}
    </div>
  );
};

// Export the SignInForm component as the default export
export default SignInForm;
